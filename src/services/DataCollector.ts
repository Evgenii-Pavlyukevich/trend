import axios from 'axios';
import { ShortData, TimeWindow } from './types';

interface CategoryMapping {
  [key: string]: {
    en: string;
    subCategories: { [key: string]: string };
  };
}

export class DataCollector {
  private readonly YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
  private readonly YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || '';
  private readonly MAX_INITIAL_RESULTS = 100;
  private readonly TOP_VIDEOS_LIMIT = 20;

  private readonly categoryMapping: CategoryMapping = {
    'entertainment': {
      en: 'entertainment comedy',
      subCategories: {
        'comedy': 'funny comedy sketch',
        'pranks': 'prank reaction video',
        'parodies': 'parody comedy',
        'animals': 'funny pets animals',
        'memes': 'viral memes funny'
      }
    },
    'lifestyle': {
      en: 'lifestyle fashion',
      subCategories: {
        'fashion': 'fashion style tips',
        'beauty': 'beauty makeup tutorial',
        'skincare': 'skincare routine tips',
        'hair': 'hairstyle tutorial tips'
      }
    },
    'education': {
      en: 'education learning',
      subCategories: {
        'quicktips': 'quick educational tips',
        'language': 'language learning tutorial',
        'science': 'science facts education',
        'history': 'history facts education'
      }
    },
    'food': {
      en: 'cooking food recipe',
      subCategories: {
        'recipes': 'quick easy recipe',
        'cooking': 'cooking tips tricks',
        'healthy': 'healthy food recipe',
        'desserts': 'dessert recipe baking'
      }
    },
    'sports': {
      en: 'fitness workout',
      subCategories: {
        'workout': 'gym training exercise',
        'sports': 'sports highlights',
        'fitness': 'fitness tips workout',
        'nutrition': 'sports nutrition diet'
      }
    },
    'tech': {
      en: 'tech gaming',
      subCategories: {
        'tech_tips': 'tech tips tutorial',
        'gaming': 'gaming highlights',
        'reviews': 'tech review gadget',
        'apps': 'app review tutorial'
      }
    },
    'arts': {
      en: 'art creative',
      subCategories: {
        'art_tips': 'drawing art tutorial',
        'diy': 'diy craft tutorial',
        'music': 'music performance cover',
        'dance': 'dance choreography tutorial'
      }
    },
    'business': {
      en: 'business finance',
      subCategories: {
        'money': 'finance money tips',
        'investment': 'investment strategy tips',
        'business': 'business startup ideas',
        'career': 'career advice tips'
      }
    }
  };

  private getTimeRange(timeWindow: TimeWindow): { start: Date; end: Date } {
    const now = new Date();
    const hours = parseInt(timeWindow.replace('h', ''));
    return {
      end: now,
      start: new Date(now.getTime() - (hours * 60 * 60 * 1000))
    };
  }

  private getSearchQuery(niche: string, subNiche: string): string {
    console.log('[DataCollector] get_search_query:', { niche, subNiche });
    console.log('[DataCollector] available_mappings:', Object.keys(this.categoryMapping));
    
    const nicheMapping = this.categoryMapping[niche];
    if (!nicheMapping) {
      console.warn('[DataCollector] no_mapping_found:', { niche });
      return 'trending shorts';
    }

    const nicheTerms = nicheMapping.en;
    const subNicheTerms = nicheMapping.subCategories[subNiche];

    if (!subNicheTerms) {
      console.warn('[DataCollector] no_subniche_mapping:', { niche, subNiche });
      return `${nicheTerms} shorts`;
    }

    // Combine terms and add 'shorts' to target short-form content
    const combinedTerms = new Set([...nicheTerms.split(' '), ...subNicheTerms.split(' ')]);
    const searchQuery = Array.from(combinedTerms).join(' ') + ' shorts';
    
    console.log('[DataCollector] generated_query:', { searchQuery });
    return searchQuery;
  }

  async getRecentTrends(
    timeWindow: TimeWindow,
    niche: string,
    subNiche: string
  ): Promise<ShortData[]> {
    try {
      const { start, end } = this.getTimeRange(timeWindow);
      const searchQuery = this.getSearchQuery(niche, subNiche);

      // Ensure these parameters are explicitly set and won't be overridden
      const searchParams = Object.freeze({
        part: 'snippet',
        q: searchQuery,
        maxResults: 50,
        key: this.YOUTUBE_API_KEY,
        publishedAfter: start.toISOString(),
        publishedBefore: end.toISOString(),
        order: 'relevance',
        type: 'video',
        videoDuration: 'short',
        relevanceLanguage: 'en',  // Force English
        safeSearch: 'none',
        videoType: 'any',
        videoDimension: '2d'
      });

      console.log('[DataCollector] search_config:', {
        query: searchQuery,
        timeRange: { start: start.toISOString(), end: end.toISOString() }
      });

      console.log('[DataCollector] search_params:', { 
        ...searchParams, 
        timeWindow,
        niche,
        subNiche
      });

      // Use a new object for axios to prevent parameter injection
      const response = await axios.get(`${this.YOUTUBE_API_BASE}/search`, {
        params: { ...searchParams }
      });

      if (!response.data.items?.length) return [];

      const videoIds = response.data.items.map((item: any) => item.id.videoId);
      const statsResponse = await axios.get(`${this.YOUTUBE_API_BASE}/videos`, {
        params: {
          part: 'statistics,snippet',
          id: videoIds.join(','),
          key: this.YOUTUBE_API_KEY
        }
      });

      if (!statsResponse.data.items?.length) return [];

      return statsResponse.data.items
        .map((item: any) => {
          const publishedAt = new Date(item.snippet.publishedAt);
          const viewCount = parseInt(item.statistics.viewCount) || 0;
          const likeCount = parseInt(item.statistics.likeCount) || 0;
          const commentCount = parseInt(item.statistics.commentCount) || 0;
          
          const hoursSincePublished = (Date.now() - publishedAt.getTime()) / (60 * 60 * 1000);
          const viewVelocity = viewCount / hoursSincePublished;
          const engagementRate = viewCount > 0 ? (likeCount + commentCount) / viewCount : 0;

          return {
            videoId: item.id,
            title: item.snippet.title,
            publishedAt,
            viewCount,
            likeCount,
            commentCount,
            shareCount: 0,
            viewVelocity,
            engagementRate,
            niche,  // Pass through the ID
            subNiche,  // Pass through the ID
            thumbnailUrl: item.snippet.thumbnails.high?.url || '',
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle
          };
        })
        .filter(video => this.isQualityContent(video))
        .sort((a, b) => b.viewVelocity - a.viewVelocity)
        .slice(0, this.TOP_VIDEOS_LIMIT);
    } catch (error) {
      console.error('[DataCollector] get_trends_error:', {
        timeWindow,
        niche,
        subNiche,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  private isQualityContent(video: ShortData): boolean {
    // Stricter quality thresholds
    if (video.viewVelocity < 0.1 || video.engagementRate < 0.001) {
      return false;
    }

    const title = video.title.toLowerCase();
    const niche = this.categoryMapping[video.niche];
    
    if (!niche) {
      console.warn('[DataCollector] no_mapping_found:', { niche: video.niche });
      return false;
    }

    const nicheTerms = niche.en.toLowerCase().split(' ');
    const subNicheTerms = niche.subCategories[video.subNiche]?.toLowerCase().split(' ');

    if (!subNicheTerms) {
      console.warn('[DataCollector] no_subniche_mapping:', { 
        niche: video.niche,
        subNiche: video.subNiche
      });
      return false;
    }

    // Get all relevant English terms without duplicates
    const allTerms = Array.from(new Set([...nicheTerms, ...subNicheTerms]));

    // More strict relevance check - require at least one exact match from each category
    const hasNicheTerm = nicheTerms.some(term => title.includes(term));
    const hasSubNicheTerm = subNicheTerms.some(term => title.includes(term));

    if (!hasNicheTerm || !hasSubNicheTerm) {
      console.log('[DataCollector] content_filtered:', {
        title,
        nicheTerms: nicheTerms.join(', '),
        subNicheTerms: subNicheTerms.join(', ')
      });
      return false;
    }

    // Additional spam filtering
    const spamTerms = ['spam', 'sub4sub', 'follow4follow', 'like4like'];
    const hasSpamTerm = spamTerms.some(term => title.includes(term));

    return !hasSpamTerm && title.length >= 10;
  }
} 