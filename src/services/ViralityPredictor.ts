import * as tf from '@tensorflow/tfjs';
import { ShortData, TrainingData, PredictionResult } from './types';
import { logAnalyticsEvent } from '../firebase';

export class ViralityPredictor {
  private model: tf.Sequential | null = null;
  private readonly MODEL_PATH = '/models/virality-predictor-model/model.json';
  private readonly STATS_PATH = '/models/feature_stats.json';
  private readonly featureNames = [
    'viewVelocity',
    'engagementRate',
    'likeCount',
    'commentCount'
  ];

  private featureStats: { means: number[]; stds: number[] } | null = null;

  private logDebug(event: string, data: any) {
    console.log(`[ViralityPredictor] ${event}:`, data);
    logAnalyticsEvent(`debug_${event}`, {
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  private async loadFeatureStats(): Promise<void> {
    try {
      const response = await fetch(this.STATS_PATH);
      if (!response.ok) {
        switch (response.status) {
          case 404:
            throw new Error('Feature statistics file not found');
          case 403:
            throw new Error('Access denied to feature statistics');
          default:
            throw new Error(`Failed to load feature statistics: ${response.statusText}`);
        }
      }
      this.featureStats = await response.json();
      this.logDebug('feature_stats_loaded', this.featureStats);
    } catch (error) {
      this.logDebug('feature_stats_load_error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  private extractFeatures(shorts: ShortData[]): tf.Tensor2D {
    if (!this.featureStats) {
      throw new Error('Feature statistics not loaded');
    }

    this.logDebug('extract_features_start', {
      shortsCount: shorts.length,
      sampleShort: shorts.length > 0 ? shorts[0] : null
    });

    const features = shorts.map(short => [
      short.viewVelocity,
      short.engagementRate,
      short.likeCount,
      short.commentCount
    ]);

    // Normalize features using loaded statistics
    const normalizedFeatures = features.map(feature => {
      return feature.map((value, index) => {
        const mean = this.featureStats!.means[index];
        const std = this.featureStats!.stds[index];
        return (value - mean) / (std + 1e-8);
      });
    });

    this.logDebug('extract_features_tensor', {
      featuresShape: [normalizedFeatures.length, normalizedFeatures[0]?.length],
      sampleFeatures: normalizedFeatures.length > 0 ? normalizedFeatures[0] : null
    });

    return tf.tensor2d(normalizedFeatures, [normalizedFeatures.length, this.featureNames.length]);
  }

  async predict(shorts: ShortData[]): Promise<PredictionResult[]> {
    try {
      logAnalyticsEvent('prediction_start', {
        shortsCount: shorts.length,
        timestamp: new Date().toISOString()
      });

      if (!this.model || !this.featureStats) {
        await this.initialize();
      }

      if (!this.model) {
        throw new Error('Model not available');
      }

      const features = this.extractFeatures(shorts);
      const predictions = await this.model.predict(features) as tf.Tensor;
      const scores = Array.from(predictions.dataSync());

      // Cleanup tensors
      features.dispose();
      predictions.dispose();

      const results = scores.map((score, index) => ({
        viralityScore: score,
        confidence: this.calculateConfidence(score),
        factors: this.calculateFactors(shorts[index])
      }));

      logAnalyticsEvent('prediction_complete', {
        shortsCount: shorts.length,
        timestamp: new Date().toISOString()
      });

      return results;
    } catch (error) {
      logAnalyticsEvent('prediction_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }

  private calculateConfidence(score: number): number {
    return 1 - 2 * Math.abs(0.5 - score);
  }

  private calculateFactors(short: ShortData): { name: string; weight: number }[] {
    const factors = [
      { name: 'View Velocity', weight: short.viewVelocity / 1000 },
      { name: 'Engagement', weight: short.engagementRate },
      { name: 'Likes', weight: short.likeCount / 10000 },
      { name: 'Comments', weight: short.commentCount / 1000 }
    ];

    return factors
      .sort((a, b) => b.weight - a.weight)
      .map(f => ({ ...f, weight: Math.min(f.weight, 1) }));
  }

  public async initialize(): Promise<void> {
    try {
      this.logDebug('initialization_start', {});

      // Load feature statistics first
      await this.loadFeatureStats();

      // Load the model
      this.logDebug('model_load_start', {});
      const loadedModel = await tf.loadLayersModel(this.MODEL_PATH);
      
      if (loadedModel instanceof tf.Sequential) {
        this.model = loadedModel;
        this.logDebug('model_load_success', {});
      } else {
        throw new Error('Failed to load model: Invalid model type');
      }

      this.logDebug('initialization_complete', {
        hasModel: !!this.model,
        hasFeatureStats: !!this.featureStats
      });
    } catch (error) {
      this.logDebug('initialization_error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }
} 