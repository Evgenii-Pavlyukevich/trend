export interface ShortData {
  videoId: string;
  title: string;
  publishedAt: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  viewVelocity: number;
  engagementRate: number;
  niche: string;
  subNiche: string;
  thumbnailUrl: string;
  channelId: string;
  channelTitle: string;
}

export interface TrainingData {
  viewVelocity: number;
  engagementRate: number;
  likeCount: number;
  commentCount: number;
  isViral: boolean;
}

export type TimeWindow = '24h' | '48h' | '72h' | '7d';

export interface PredictionResult {
  viralityScore: number;
  confidence: number;
  factors: {
    name: string;
    weight: number;
  }[];
} 