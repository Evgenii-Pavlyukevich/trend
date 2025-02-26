import { ViralityPredictor } from './ViralityPredictor';
import { DataCollector } from './DataCollector';
import { ShortData, TimeWindow, PredictionResult } from './types';

export class PredictionService {
  private predictor: ViralityPredictor;
  private dataCollector: DataCollector;
  private isInitialized: boolean = false;

  constructor() {
    this.predictor = new ViralityPredictor();
    this.dataCollector = new DataCollector();
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.predictor.initialize();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize predictor:', error);
      throw error;
    }
  }

  async predictTrends(
    timeWindow: TimeWindow,
    niche: string,
    subNiche: string
  ): Promise<Array<ShortData & { prediction: PredictionResult }>> {
    if (!this.isInitialized) {
      console.log('[PredictionService] service_created:', { isInitialized: false });
      await this.initialize();
    }

    try {
      console.log('[PredictionService] predict_trends_start:', {
        timeWindow,
        niche,  // This is already the ID
        subNiche  // This is already the ID
      });

      // Fetch recent shorts directly from YouTube API
      const shorts = await this.dataCollector.getRecentTrends(timeWindow, niche, subNiche);
      
      console.log('[PredictionService] recent_trends_fetched:', {
        shortsCount: shorts.length,
        sampleShort: shorts.length > 0 ? {
          id: shorts[0].videoId,
          metrics: {
            views: shorts[0].viewCount,
            velocity: shorts[0].viewVelocity,
            engagement: shorts[0].engagementRate
          }
        } : null
      });

      // Make predictions
      const predictions = await this.predictor.predict(shorts);
      
      // Combine shorts with their predictions and sort by virality score
      return shorts
        .map((short, index) => ({
          ...short,
          prediction: predictions[index]
        }))
        .sort((a, b) => b.prediction.viralityScore - a.prediction.viralityScore);
    } catch (error) {
      console.error('[PredictionService] predict_trends_error:', {
        timeWindow,
        niche,  // This is already the ID
        subNiche,  // This is already the ID
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }
} 