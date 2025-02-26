import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseNode';
import { ShortData, TrainingData } from '../services/types';

type ViralPattern = {
  viewMultiplier: number;
  engagementMultiplier: number;
};

type ViralPatterns = {
  [key: string]: ViralPattern;
};

class SyntheticDataGenerator {
  private readonly NICHES = [
    'Музыка',
    'Развлечения',
    'Технологии',
    'Спорт',
    'Образование',
    'Бизнес',
    'Мода',
    'Еда',
    'Путешествия',
    'Искусство'
  ];

  private readonly VIRAL_PATTERNS: ViralPatterns = {
    'музыка': { viewMultiplier: 2.5, engagementMultiplier: 1.8 },
    'развлечения': { viewMultiplier: 2.0, engagementMultiplier: 1.5 },
    'технологии': { viewMultiplier: 1.8, engagementMultiplier: 1.3 },
    default: { viewMultiplier: 1.5, engagementMultiplier: 1.2 }
  };

  private readonly BASE_METRICS = {
    minViews: 1000,
    maxViews: 1000000,
    minEngagement: 0.01, // 1%
    maxEngagement: 0.30, // 30%
    minVelocity: 10,
    maxVelocity: 10000
  };

  private generateRandomTitle(niche: string): string {
    const prefixes = ['Как', 'Почему', 'Топ', 'Лучшие', 'Секрет', 'Новый'];
    const suffixes = ['2024', 'тренд', 'лайфхак', 'совет', 'фишка', 'способ'];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return `${prefix} ${niche} ${suffix}`;
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private normalDistribution(mean: number, stdDev: number): number {
    const u1 = 1 - Math.random();
    const u2 = 1 - Math.random();
    const randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return mean + stdDev * randStdNormal;
  }

  private generateMetrics(niche: string, isViral: boolean): {
    viewCount: number;
    likeCount: number;
    commentCount: number;
    shareCount: number;
    viewVelocity: number;
    engagementRate: number;
  } {
    const pattern = this.VIRAL_PATTERNS[niche.toLowerCase()] || this.VIRAL_PATTERNS.default;
    const multiplier = isViral ? pattern.viewMultiplier : 1;
    const engagementMultiplier = isViral ? pattern.engagementMultiplier : 1;

    // Generate base metrics with normal distribution
    const viewVelocity = Math.abs(this.normalDistribution(
      isViral ? 2000 : 500,
      isViral ? 1000 : 200
    )) * multiplier;

    const engagementRate = Math.abs(this.normalDistribution(
      isViral ? 0.15 : 0.05,
      isViral ? 0.05 : 0.02
    )) * engagementMultiplier;

    // Calculate derived metrics
    const hoursActive = Math.floor(Math.random() * 72) + 1; // 1-72 hours
    const viewCount = Math.floor(viewVelocity * hoursActive);
    const totalEngagement = Math.floor(viewCount * engagementRate);
    
    // Split engagement between likes, comments, and shares (75-15-10 ratio typically)
    const likeCount = Math.floor(totalEngagement * 0.75);
    const commentCount = Math.floor(totalEngagement * 0.15);
    const shareCount = Math.floor(totalEngagement * 0.10);

    return {
      viewCount: Math.min(viewCount, this.BASE_METRICS.maxViews),
      likeCount,
      commentCount,
      shareCount,
      viewVelocity,
      engagementRate
    };
  }

  private generateShort(niche: string, isViral: boolean): ShortData {
    const metrics = this.generateMetrics(niche, isViral);
    const hoursAgo = Math.floor(Math.random() * 72); // 0-72 hours ago
    const publishedAt = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);

    return {
      videoId: this.generateRandomId(),
      title: this.generateRandomTitle(niche),
      publishedAt,
      niche,
      subNiche: niche,
      thumbnailUrl: `https://img.youtube.com/vi/${this.generateRandomId()}/maxresdefault.jpg`,
      channelId: this.generateRandomId(),
      channelTitle: `${niche} Channel ${Math.floor(Math.random() * 1000)}`,
      ...metrics
    };
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
    console.log(`Stored ${data.length} training samples`);
  }

  private isViralByMetrics(metrics: {
    viewVelocity: number;
    engagementRate: number;
    viewCount: number;
    likeCount: number;
  }): boolean {
    return (
      metrics.viewVelocity >= 1000 && // At least 1000 views per hour
      metrics.engagementRate >= 0.10 && // At least 10% engagement
      metrics.viewCount >= 10000 && // At least 10k views
      metrics.likeCount >= 1000 // At least 1000 likes
    );
  }

  async generateDataset(samplesPerNiche: number): Promise<void> {
    console.log('Starting synthetic data generation...');
    const allTrainingData: TrainingData[] = [];

    for (const niche of this.NICHES) {
      console.log(`Generating data for niche: ${niche}`);
      
      // Generate viral content (30% of samples)
      const viralSamples = Math.floor(samplesPerNiche * 0.3);
      for (let i = 0; i < viralSamples; i++) {
        const short = this.generateShort(niche, true);
        allTrainingData.push({
          viewVelocity: short.viewVelocity,
          engagementRate: short.engagementRate,
          likeCount: short.likeCount,
          commentCount: short.commentCount,
          isViral: true
        });
      }

      // Generate non-viral content (70% of samples)
      const nonViralSamples = samplesPerNiche - viralSamples;
      for (let i = 0; i < nonViralSamples; i++) {
        const short = this.generateShort(niche, false);
        allTrainingData.push({
          viewVelocity: short.viewVelocity,
          engagementRate: short.engagementRate,
          likeCount: short.likeCount,
          commentCount: short.commentCount,
          isViral: false
        });
      }
    }

    // Shuffle the data
    for (let i = allTrainingData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allTrainingData[i], allTrainingData[j]] = [allTrainingData[j], allTrainingData[i]];
    }

    // Store the data
    await this.storeTrainingData(allTrainingData);

    // Print statistics
    const viralCount = allTrainingData.filter(d => d.isViral).length;
    console.log(`
Dataset Statistics:
- Total samples: ${allTrainingData.length}
- Viral samples: ${viralCount}
- Non-viral samples: ${allTrainingData.length - viralCount}
- Viral ratio: ${(viralCount / allTrainingData.length * 100).toFixed(2)}%

Average Metrics:
${this.calculateAverageMetrics(allTrainingData)}
`);
  }

  private calculateAverageMetrics(data: TrainingData[]): string {
    const viral = data.filter(d => d.isViral);
    const nonViral = data.filter(d => !d.isViral);

    const calcAvg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

    const viralMetrics = {
      viewVelocity: calcAvg(viral.map(d => d.viewVelocity)),
      engagementRate: calcAvg(viral.map(d => d.engagementRate)),
      likeCount: calcAvg(viral.map(d => d.likeCount)),
      commentCount: calcAvg(viral.map(d => d.commentCount))
    };

    const nonViralMetrics = {
      viewVelocity: calcAvg(nonViral.map(d => d.viewVelocity)),
      engagementRate: calcAvg(nonViral.map(d => d.engagementRate)),
      likeCount: calcAvg(nonViral.map(d => d.likeCount)),
      commentCount: calcAvg(nonViral.map(d => d.commentCount))
    };

    return `
Viral Content Averages:
- View Velocity: ${viralMetrics.viewVelocity.toFixed(2)} views/hour
- Engagement Rate: ${(viralMetrics.engagementRate * 100).toFixed(2)}%
- Likes: ${viralMetrics.likeCount.toFixed(0)}
- Comments: ${viralMetrics.commentCount.toFixed(0)}

Non-Viral Content Averages:
- View Velocity: ${nonViralMetrics.viewVelocity.toFixed(2)} views/hour
- Engagement Rate: ${(nonViralMetrics.engagementRate * 100).toFixed(2)}%
- Likes: ${nonViralMetrics.likeCount.toFixed(0)}
- Comments: ${nonViralMetrics.commentCount.toFixed(0)}`;
  }
}

// Execute generation
const generator = new SyntheticDataGenerator();
const SAMPLES_PER_NICHE = 200; // This will generate 2000 total samples (200 * 10 niches)
generator.generateDataset(SAMPLES_PER_NICHE).catch(console.error); 