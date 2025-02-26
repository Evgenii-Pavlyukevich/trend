import * as tf from '@tensorflow/tfjs';
import * as tfn from '@tensorflow/tfjs-node';
import { TrainingDataGenerator } from '../services/TrainingDataGenerator';
import { TrainingData } from '../services/types';
import * as path from 'path';
import * as fs from 'fs';

export class ModelTrainer {
  private readonly MODEL_PATH = './models/virality-predictor-model';
  private readonly STATS_PATH = './models/feature_stats.json';
  private readonly featureNames = [
    'viewVelocity',
    'engagementRate',
    'likeCount',
    'commentCount'
  ];

  private calculateFeatureStats(data: TrainingData[]) {
    const features = data.map(td => [
      td.viewVelocity,
      td.engagementRate,
      td.likeCount,
      td.commentCount
    ]);

    const means = features.reduce((acc, curr) => {
      return acc.map((val, idx) => val + curr[idx]);
    }, new Array(this.featureNames.length).fill(0))
      .map(sum => sum / features.length);

    const stds = features.reduce((acc, curr) => {
      return acc.map((val, idx) => val + Math.pow(curr[idx] - means[idx], 2));
    }, new Array(this.featureNames.length).fill(0))
      .map(sum => Math.sqrt(sum / features.length));

    return { means, stds };
  }

  private normalizeFeatures(features: number[][], stats: { means: number[], stds: number[] }) {
    return features.map(feature => {
      return feature.map((value, index) => {
        return (value - stats.means[index]) / (stats.stds[index] + 1e-8);
      });
    });
  }

  private createModel(): tf.Sequential {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({
          inputShape: [this.featureNames.length],
          units: 32,
          activation: 'relu',
          kernelInitializer: 'glorotNormal'
        }),
        tf.layers.batchNormalization(),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({
          units: 16,
          activation: 'relu',
          kernelInitializer: 'glorotNormal'
        }),
        tf.layers.batchNormalization(),
        tf.layers.dropout({ rate: 0.1 }),
        tf.layers.dense({
          units: 1,
          activation: 'sigmoid',
          kernelInitializer: 'glorotNormal'
        })
      ]
    });

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: tf.losses.sigmoidCrossEntropy,
      metrics: ['accuracy']
    });

    return model;
  }

  async train() {
    console.log('Starting model training...');

    // Get training data
    const generator = new TrainingDataGenerator();
    const trainingData = await generator.getStoredTrainingData();

    if (trainingData.length === 0) {
      throw new Error('No training data available');
    }

    console.log(`Loaded ${trainingData.length} training samples`);

    // Calculate feature statistics
    const stats = this.calculateFeatureStats(trainingData);
    console.log('Feature statistics:', stats);

    // Prepare features and labels
    const features = trainingData.map(td => [
      td.viewVelocity,
      td.engagementRate,
      td.likeCount,
      td.commentCount
    ]);
    const normalizedFeatures = this.normalizeFeatures(features, stats);
    const labels = trainingData.map(td => [td.isViral ? 1 : 0]);

    // Create tensors
    const xTrain = tf.tensor2d(normalizedFeatures);
    const yTrain = tf.tensor2d(labels);

    // Create and train model
    const model = this.createModel();
    
    console.log('Training model...');
    await model.fit(xTrain, yTrain, {
      epochs: 100,
      batchSize: 32,
      validationSplit: 0.2,
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(
            `Epoch ${epoch + 1}: loss = ${logs?.loss?.toFixed(4)}, ` +
            `accuracy = ${logs?.acc?.toFixed(4)}, ` +
            `val_loss = ${logs?.val_loss?.toFixed(4)}, ` +
            `val_accuracy = ${logs?.val_acc?.toFixed(4)}`
          );
        }
      }
    });

    // Create models directory if it doesn't exist
    const modelsDir = path.dirname(this.MODEL_PATH);
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
    }

    // Save model using tfjs-node handler
    const handler = tfn.io.fileSystem(this.MODEL_PATH);
    await model.save(handler);
    
    // Save feature statistics
    fs.writeFileSync(
      this.STATS_PATH,
      JSON.stringify({ means: stats.means, stds: stats.stds }, null, 2)
    );
    
    console.log('Model and feature statistics saved successfully!');

    // Cleanup
    xTrain.dispose();
    yTrain.dispose();
  }
}

// Execute training
const trainer = new ModelTrainer();
trainer.train().catch(console.error); 