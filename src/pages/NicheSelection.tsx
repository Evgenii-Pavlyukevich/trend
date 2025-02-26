import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NicheData {
  id: string;
  name: string;
  icon: string;
  primaryNiches: {
    id: string;
    name: string;
    description: string;
  }[];
}

interface TimeFrameOption {
  value: '6h' | '12h' | '24h' | '48h';
  label: string;
  description: string;
}

const TIME_FRAMES: TimeFrameOption[] = [
  {
    value: '6h',
    label: 'Последние 6 часов',
    description: 'Самые свежие тренды за последние 6 часов'
  },
  {
    value: '12h',
    label: 'Последние 12 часов',
    description: 'Тренды за последние 12 часов'
  },
  {
    value: '24h',
    label: 'Последние 24 часа',
    description: 'Тренды за последние сутки'
  },
  {
    value: '48h',
    label: 'Последние 48 часов',
    description: 'Тренды за последние двое суток'
  }
];

export const NICHES: NicheData[] = [
  {
    id: 'entertainment',
    name: 'Развлечения и Юмор',
    icon: '🎭',
    primaryNiches: [
      { id: 'comedy', name: 'Комедийные скетчи', description: 'Юмористические короткие видео' },
      { id: 'pranks', name: 'Пранки и реакции', description: 'Розыгрыши и реакции на них' },
      { id: 'parodies', name: 'Пародии', description: 'Пародии на популярный контент' },
      { id: 'animals', name: 'Забавные животные', description: 'Смешные видео с животными' },
      { id: 'memes', name: 'Мемы', description: 'Вирусный развлекательный контент' },
    ]
  },
  {
    id: 'lifestyle',
    name: 'Лайфстайл и Мода',
    icon: '👗',
    primaryNiches: [
      { id: 'fashion', name: 'Модные советы', description: 'Советы по стилю и моде' },
      { id: 'beauty', name: 'Красота и макияж', description: 'Уроки макияжа и бьюти-советы' },
      { id: 'skincare', name: 'Уход за кожей', description: 'Советы по уходу за кожей' },
      { id: 'hair', name: 'Прически', description: 'Уроки по укладке волос' },
    ]
  },
  {
    id: 'education',
    name: 'Образование',
    icon: '📚',
    primaryNiches: [
      { id: 'quicktips', name: 'Быстрые советы', description: 'Полезные лайфхаки' },
      { id: 'language', name: 'Изучение языков', description: 'Уроки иностранных языков' },
      { id: 'science', name: 'Научные факты', description: 'Интересные факты из науки' },
      { id: 'history', name: 'История', description: 'Исторические факты' },
    ]
  },
  {
    id: 'food',
    name: 'Еда и Кулинария',
    icon: '🍳',
    primaryNiches: [
      { id: 'recipes', name: 'Быстрые рецепты', description: 'Простые рецепты блюд' },
      { id: 'cooking', name: 'Кулинарные советы', description: 'Советы по приготовлению' },
      { id: 'healthy', name: 'Здоровое питание', description: 'Полезные блюда' },
      { id: 'desserts', name: 'Десерты', description: 'Сладкие рецепты' },
    ]
  },
  {
    id: 'sports',
    name: 'Спорт и Фитнес',
    icon: '💪',
    primaryNiches: [
      { id: 'workout', name: 'Тренировки', description: 'Упражнения и тренировки' },
      { id: 'sports', name: 'Спортивные моменты', description: 'Лучшие моменты из спорта' },
      { id: 'fitness', name: 'Фитнес советы', description: 'Советы по фитнесу' },
      { id: 'nutrition', name: 'Спортивное питание', description: 'Советы по питанию' },
    ]
  },
  {
    id: 'tech',
    name: 'Технологии и Игры',
    icon: '🎮',
    primaryNiches: [
      { id: 'tech_tips', name: 'Технические советы', description: 'Советы по технике' },
      { id: 'gaming', name: 'Игровые моменты', description: 'Лучшие моменты из игр' },
      { id: 'reviews', name: 'Обзоры', description: 'Обзоры техники и игр' },
      { id: 'apps', name: 'Приложения', description: 'Обзоры приложений' },
    ]
  },
  {
    id: 'arts',
    name: 'Искусство и Творчество',
    icon: '🎨',
    primaryNiches: [
      { id: 'art_tips', name: 'Советы по рисованию', description: 'Уроки рисования' },
      { id: 'diy', name: 'Самоделки', description: 'Креативные проекты' },
      { id: 'music', name: 'Музыка', description: 'Музыкальный контент' },
      { id: 'dance', name: 'Танцы', description: 'Танцевальные видео' },
    ]
  },
  {
    id: 'business',
    name: 'Бизнес и Финансы',
    icon: '💼',
    primaryNiches: [
      { id: 'money', name: 'Советы по финансам', description: 'Финансовые советы' },
      { id: 'investment', name: 'Инвестиции', description: 'Советы по инвестициям' },
      { id: 'business', name: 'Бизнес идеи', description: 'Идеи для бизнеса' },
      { id: 'career', name: 'Карьера', description: 'Советы по карьере' },
    ]
  },
];

export const NicheSelection: React.FC = () => {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [selectedSubNiche, setSelectedSubNiche] = useState<string | null>(null);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<'6h' | '12h' | '24h' | '48h' | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNicheClick = (nicheId: string) => {
    setSelectedNiche(nicheId);
    setSelectedSubNiche(null);
    setShowPopup(true);
    setCurrentStep(1);
  };

  const handleSubNicheClick = (subNicheId: string) => {
    setSelectedSubNiche(subNicheId);
  };

  const handleTimeFrameClick = (timeFrame: '6h' | '12h' | '24h' | '48h') => {
    setSelectedTimeFrame(timeFrame);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedSubNiche(null);
    setSelectedTimeFrame(null);
    setCurrentStep(1);
  };

  const handleBackClick = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedTimeFrame(null);
    }
  };

  const handleNextClick = () => {
    if (currentStep === 1 && selectedSubNiche) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedTimeFrame && selectedNicheData) {
      navigate('/results', {
        state: {
          niche: selectedNiche,
          subNiche: selectedSubNiche,
          timeWindow: selectedTimeFrame
        }
      });
    }
  };

  const selectedNicheData = NICHES.find(niche => niche.id === selectedNiche);

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <h2 style={{
            marginBottom: '1.5rem',
            color: '#282828',
            fontSize: '20px',
            fontWeight: '500'
          }}>
            <span style={{ marginRight: '8px' }}>{selectedNicheData?.icon}</span>
            {selectedNicheData?.name}
          </h2>

          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {selectedNicheData?.primaryNiches.map((subNiche) => (
              <button
                key={subNiche.id}
                onClick={() => handleSubNicheClick(subNiche.id)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: selectedSubNiche === subNiche.id ? '#f2f2f2' : 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  paddingRight: '2.5rem'
                }}
                onMouseEnter={(e) => {
                  if (selectedSubNiche !== subNiche.id) {
                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSubNiche !== subNiche.id) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                <div style={{ marginBottom: '0.25rem' }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#282828'
                  }}>
                    {subNiche.name}
                  </span>
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#606060'
                }}>
                  {subNiche.description}
                </div>
                {selectedSubNiche === subNiche.id && (
                  <div style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#FF0000',
                    fontSize: '20px'
                  }}>
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <h2 style={{
            marginBottom: '1.5rem',
            color: '#282828',
            fontSize: '20px',
            fontWeight: '500'
          }}>
            Выберите временной период
          </h2>

          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {TIME_FRAMES.map((timeFrame) => (
              <button
                key={timeFrame.value}
                onClick={() => handleTimeFrameClick(timeFrame.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: selectedTimeFrame === timeFrame.value ? '#f2f2f2' : 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  paddingRight: '2.5rem'
                }}
                onMouseEnter={(e) => {
                  if (selectedTimeFrame !== timeFrame.value) {
                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTimeFrame !== timeFrame.value) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                <div style={{ marginBottom: '0.25rem' }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#282828'
                  }}>
                    {timeFrame.label}
                  </span>
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#606060'
                }}>
                  {timeFrame.description}
                </div>
                {selectedTimeFrame === timeFrame.value && (
                  <div style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#FF0000',
                    fontSize: '20px'
                  }}>
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 72px)',
      padding: '2rem',
      backgroundColor: '#f9f9f9',
      position: 'relative'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#282828',
        fontSize: '24px',
        fontWeight: '500'
      }}>
        Выберите нишу, в которой хотите найти тренды
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {NICHES.map((niche) => (
          <button
            key={niche.id}
            onClick={() => handleNicheClick(niche.id)}
            style={{
              width: '100%',
              padding: '1.5rem',
              backgroundColor: selectedNiche === niche.id ? '#f2f2f2' : 'white',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (selectedNiche !== niche.id) {
                e.currentTarget.style.backgroundColor = '#f9f9f9';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedNiche !== niche.id) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <span style={{ fontSize: '24px' }}>{niche.icon}</span>
              <span style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#282828'
              }}>
                {niche.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {showPopup && selectedNicheData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {currentStep === 2 && (
                  <button
                    onClick={handleBackClick}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#606060',
                      fontSize: '16px',
                      padding: '8px',
                      borderRadius: '50%',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f2f2f2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    ←
                  </button>
                )}
                <span style={{
                  color: '#606060',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Шаг {currentStep} из 2
                </span>
              </div>
              <button
                onClick={handleClosePopup}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#606060',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f2f2f2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                ×
              </button>
            </div>

            {renderStepContent()}

            <button
              onClick={handleNextClick}
              disabled={currentStep === 1 ? !selectedSubNiche : !selectedTimeFrame}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: (currentStep === 1 ? selectedSubNiche : selectedTimeFrame) ? '#FF0000' : '#f2f2f2',
                color: (currentStep === 1 ? selectedSubNiche : selectedTimeFrame) ? 'white' : '#606060',
                border: 'none',
                borderRadius: '8px',
                cursor: (currentStep === 1 ? selectedSubNiche : selectedTimeFrame) ? 'pointer' : 'not-allowed',
                fontSize: '16px',
                fontWeight: '500',
                marginTop: '1.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentStep === 1 ? selectedSubNiche : selectedTimeFrame) {
                  e.currentTarget.style.backgroundColor = '#cc0000';
                }
              }}
              onMouseLeave={(e) => {
                if (currentStep === 1 ? selectedSubNiche : selectedTimeFrame) {
                  e.currentTarget.style.backgroundColor = '#FF0000';
                }
              }}
            >
              Далее
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 