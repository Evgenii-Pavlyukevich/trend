import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db, logAnalyticsEvent } from '../firebaseNode';
import { ShortData, TrainingData, TimeWindow } from './types';
import { DataCollector } from './DataCollector';

export class TrainingDataGenerator {
  private dataCollector: DataCollector;
  private readonly VIRAL_THRESHOLDS = {
    viewVelocity: 1000, // 1000 views per hour
    engagementRate: 0.05, // 5% engagement rate
    minViews: 5000, // Minimum views to be considered
    minLikes: 100 // Minimum likes to be considered
  };

  constructor() {
    this.dataCollector = new DataCollector();
  }

  private isViral(short: ShortData): boolean {
    // Increase minimum thresholds for viral classification
    const minViewVelocity = 5000; // At least 5000 views per hour
    const minEngagementRate = 0.10; // At least 10% engagement rate
    const minViews = 50000; // At least 50k total views
    const minLikes = 5000; // At least 5000 likes

    return (
      short.viewVelocity >= minViewVelocity &&
      short.engagementRate >= minEngagementRate &&
      short.viewCount >= minViews &&
      short.likeCount >= minLikes
    );
  }

  async collectTrainingData(niches: string[]): Promise<void> {
    const timeWindows: TimeWindow[] = ['24h', '48h', '72h'];
    
    for (const niche of niches) {
      console.log(`Collecting data for niche: ${niche}`);
      
      for (const timeWindow of timeWindows) {
        console.log(`Processing time window: ${timeWindow}`);
        
        try {
          const shorts = await this.dataCollector.getRecentTrends(timeWindow, niche, '');
          
          const trainingData: TrainingData[] = shorts.map(short => ({
            viewVelocity: short.viewVelocity,
            engagementRate: short.engagementRate,
            likeCount: short.likeCount,
            commentCount: short.commentCount,
            isViral: this.isViral(short)
          }));

          await this.storeTrainingData(trainingData);
          console.log(`Stored ${trainingData.length} training samples for ${niche} - ${timeWindow}`);
        } catch (error) {
          console.error(`Error collecting data for ${niche} - ${timeWindow}:`, error);
        }
      }
    }
  }

  private async storeTrainingData(data: TrainingData[]): Promise<void> {
    const trainingCollection = collection(db, 'training_data');
    
    const batch = data.map(item => {
      return addDoc(trainingCollection, {
        ...item,
        timestamp: Timestamp.now()
      });
    });

    await Promise.all(batch);
  }

  async getStoredTrainingData(): Promise<TrainingData[]> {
    const trainingCollection = collection(db, 'training_data');
    const snapshot = await getDocs(trainingCollection);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        viewVelocity: data.viewVelocity,
        engagementRate: data.engagementRate,
        likeCount: data.likeCount,
        commentCount: data.commentCount,
        isViral: data.isViral
      };
    });
  }

  async clearOldTrainingData(daysOld: number): Promise<void> {
    const trainingCollection = collection(db, 'training_data');
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    const oldDataQuery = query(
      trainingCollection,
      where('timestamp', '<', Timestamp.fromDate(cutoffDate))
    );
    
    const snapshot = await getDocs(oldDataQuery);
    console.log(`Found ${snapshot.size} old training records to delete`);
  }
} 