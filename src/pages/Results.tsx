import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PredictionService } from '../services/PredictionService';
import { ShortData, TimeWindow, PredictionResult } from '../services/types';

// Import NICHES constant for looking up display names
import { NICHES } from './NicheSelection';

interface LocationState {
  niche: string;  // This is the niche ID
  subNiche: string;  // This is the subNiche ID
  timeWindow: TimeWindow;
}

interface SortOption {
  value: 'viralityScore' | 'viewCount' | 'engagementRate';
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'viralityScore', label: 'По вирусности' },
  { value: 'viewCount', label: 'По просмотрам' },
  { value: 'engagementRate', label: 'По вовлеченности' }
];

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the raw state first
  const locationState = location.state as LocationState;
  console.log('[Results] raw_location_state:', locationState);

  // Validate and process the state
  const state = React.useMemo(() => {
    if (!locationState?.niche || !locationState?.subNiche) {
      console.warn('[Results] missing_state:', { niche: locationState?.niche, subNiche: locationState?.subNiche });
      navigate('/');
      return null;
    }

    return {
      niche: locationState.niche,  // Keep the ID
      subNiche: locationState.subNiche,  // Keep the ID
      timeWindow: locationState.timeWindow || '24h' as TimeWindow
    };
  }, [locationState, navigate]);

  // Get display data separately
  const displayData = React.useMemo(() => {
    if (!state?.niche || !state?.subNiche) return null;

    const selectedNiche = NICHES.find(n => n.id === state.niche);
    if (!selectedNiche) {
      console.warn('[Results] invalid_niche_id:', { nicheId: state.niche });
      return null;
    }

    const selectedSubNiche = selectedNiche.primaryNiches.find(sn => sn.id === state.subNiche);
    if (!selectedSubNiche) {
      console.warn('[Results] invalid_subniche_id:', { 
        nicheId: state.niche,
        subNicheId: state.subNiche
      });
      return null;
    }

    return {
      nicheName: selectedNiche.name,
      subNicheName: selectedSubNiche.name
    };
  }, [state?.niche, state?.subNiche]);

  const [results, setResults] = useState<Array<ShortData & { prediction: PredictionResult }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption['value']>('viralityScore');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>(state?.timeWindow || '24h');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    if (!state) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const predictionService = new PredictionService();
        console.log('[Results] fetching_trends:', {
          timeWindow,
          niche: state.niche,
          subNiche: state.subNiche
        });
        const predictions = await predictionService.predictTrends(
          timeWindow,
          state.niche,  // Pass the ID
          state.subNiche  // Pass the ID
        );
        setResults(predictions);
        setLastUpdated(new Date());
      } catch (err) {
        console.error('[Results] fetch_error:', {
          error: err instanceof Error ? err.message : 'Unknown error'
        });
        setError(err instanceof Error ? err.message : 'Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [state, timeWindow]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) return `${hours} ч назад`;
    const days = Math.floor(hours / 24);
    return `${days} д назад`;
  };

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'viralityScore':
        return b.prediction.viralityScore - a.prediction.viralityScore;
      case 'viewCount':
        return b.viewCount - a.viewCount;
      case 'engagementRate':
        return b.engagementRate - a.engagementRate;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 72px)',
        backgroundColor: '#f9f9f9'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #FF0000',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
          <p style={{ color: '#606060', fontSize: '16px' }}>
            Анализируем тренды...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 72px)',
        backgroundColor: '#f9f9f9',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <p style={{ color: '#FF0000', marginBottom: '1rem' }}>
            {error}
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#FF0000',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Вернуться к выбору ниши
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 72px)',
      backgroundColor: '#f9f9f9',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h1 style={{
            fontSize: '24px',
            color: '#282828',
            fontWeight: '500'
          }}>
            Тренды: {displayData?.nicheName || ''} / {displayData?.subNicheName || ''}
          </h1>
          <span style={{
            color: '#606060',
            fontSize: '14px'
          }}>
            Обновлено: {formatDate(lastUpdated)}
          </span>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <select
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e5e5',
              borderRadius: '4px',
              backgroundColor: 'white',
              fontSize: '14px',
              color: '#282828'
            }}
          >
            <option value="6h">Последние 6 часов</option>
            <option value="12h">Последние 12 часов</option>
            <option value="24h">Последние 24 часа</option>
            <option value="48h">Последние 48 часов</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption['value'])}
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e5e5',
              borderRadius: '4px',
              backgroundColor: 'white',
              fontSize: '14px',
              color: '#282828'
            }}
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Results Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {sortedResults.map((result) => (
            <div
              key={result.videoId}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => window.open(`https://youtube.com/shorts/${result.videoId}`, '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Thumbnail */}
              <div style={{
                position: 'relative',
                paddingTop: '177.77%', // 16:9 aspect ratio
                backgroundColor: '#f2f2f2'
              }}>
                <img
                  src={result.thumbnailUrl}
                  alt={result.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {(result.prediction.viralityScore * 100).toFixed(0)}% вирусность
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1rem' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#282828',
                  marginBottom: '0.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {result.title}
                </h3>

                <div style={{
                  fontSize: '14px',
                  color: '#606060',
                  marginBottom: '0.75rem'
                }}>
                  {result.channelTitle}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem',
                  fontSize: '12px',
                  color: '#606060'
                }}>
                  <div>👁 {formatNumber(result.viewCount)}</div>
                  <div>👍 {formatNumber(result.likeCount)}</div>
                  <div>💬 {formatNumber(result.commentCount)}</div>
                  <div>⚡ {formatNumber(result.viewVelocity)}/час</div>
                </div>

                {/* Factors */}
                <div style={{
                  marginTop: '1rem',
                  borderTop: '1px solid #f2f2f2',
                  paddingTop: '0.75rem'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#606060',
                    marginBottom: '0.5rem'
                  }}>
                    Ключевые факторы:
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.25rem'
                  }}>
                    {result.prediction.factors.slice(0, 2).map((factor) => (
                      <span
                        key={factor.name}
                        style={{
                          fontSize: '12px',
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#f2f2f2',
                          borderRadius: '4px',
                          color: '#606060'
                        }}
                      >
                        {factor.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 