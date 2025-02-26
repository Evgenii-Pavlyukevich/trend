var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
var TIME_FRAMES = [
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
var NICHES = [
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
export var NicheSelection = function () {
    var _a = useState(null), selectedNiche = _a[0], setSelectedNiche = _a[1];
    var _b = useState(null), selectedSubNiche = _b[0], setSelectedSubNiche = _b[1];
    var _c = useState(null), selectedTimeFrame = _c[0], setSelectedTimeFrame = _c[1];
    var _d = useState(false), showPopup = _d[0], setShowPopup = _d[1];
    var _e = useState(1), currentStep = _e[0], setCurrentStep = _e[1];
    var navigate = useNavigate();
    var handleNicheClick = function (nicheId) {
        setSelectedNiche(nicheId);
        setSelectedSubNiche(null);
        setShowPopup(true);
        setCurrentStep(1);
    };
    var handleSubNicheClick = function (subNicheId) {
        setSelectedSubNiche(subNicheId);
    };
    var handleTimeFrameClick = function (timeFrame) {
        setSelectedTimeFrame(timeFrame);
    };
    var handleClosePopup = function () {
        setShowPopup(false);
        setSelectedSubNiche(null);
        setSelectedTimeFrame(null);
        setCurrentStep(1);
    };
    var handleBackClick = function () {
        if (currentStep === 2) {
            setCurrentStep(1);
            setSelectedTimeFrame(null);
        }
    };
    var handleNextClick = function () {
        if (currentStep === 1 && selectedSubNiche) {
            setCurrentStep(2);
        }
        else if (currentStep === 2 && selectedTimeFrame && selectedNicheData) {
            // Navigate to results with selected parameters
            navigate('/results', {
                state: {
                    niche: selectedNiche,
                    subNiche: selectedSubNiche,
                    timeWindow: selectedTimeFrame
                }
            });
        }
    };
    var selectedNicheData = NICHES.find(function (niche) { return niche.id === selectedNiche; });
    var renderStepContent = function () {
        if (currentStep === 1) {
            return (_jsxs(_Fragment, { children: [_jsxs("h2", __assign({ style: {
                            marginBottom: '1.5rem',
                            color: '#282828',
                            fontSize: '20px',
                            fontWeight: '500'
                        } }, { children: [_jsx("span", __assign({ style: { marginRight: '8px' } }, { children: selectedNicheData === null || selectedNicheData === void 0 ? void 0 : selectedNicheData.icon })), selectedNicheData === null || selectedNicheData === void 0 ? void 0 : selectedNicheData.name] })), _jsx("div", __assign({ style: {
                            display: 'grid',
                            gap: '1rem'
                        } }, { children: selectedNicheData === null || selectedNicheData === void 0 ? void 0 : selectedNicheData.primaryNiches.map(function (subNiche) { return (_jsxs("button", __assign({ onClick: function () { return handleSubNicheClick(subNiche.id); }, style: {
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
                            }, onMouseEnter: function (e) {
                                if (selectedSubNiche !== subNiche.id) {
                                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                                }
                            }, onMouseLeave: function (e) {
                                if (selectedSubNiche !== subNiche.id) {
                                    e.currentTarget.style.backgroundColor = 'white';
                                }
                            } }, { children: [_jsx("div", __assign({ style: { marginBottom: '0.25rem' } }, { children: _jsx("span", __assign({ style: {
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#282828'
                                        } }, { children: subNiche.name })) })), _jsx("div", __assign({ style: {
                                        fontSize: '14px',
                                        color: '#606060'
                                    } }, { children: subNiche.description })), selectedSubNiche === subNiche.id && (_jsx("div", __assign({ style: {
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#FF0000',
                                        fontSize: '20px'
                                    } }, { children: "\u2713" })))] }), subNiche.id)); }) }))] }));
        }
        if (currentStep === 2) {
            return (_jsxs(_Fragment, { children: [_jsx("h2", __assign({ style: {
                            marginBottom: '1.5rem',
                            color: '#282828',
                            fontSize: '20px',
                            fontWeight: '500'
                        } }, { children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0439 \u043F\u0435\u0440\u0438\u043E\u0434" })), _jsx("div", __assign({ style: {
                            display: 'grid',
                            gap: '1rem'
                        } }, { children: TIME_FRAMES.map(function (timeFrame) { return (_jsxs("button", __assign({ onClick: function () { return handleTimeFrameClick(timeFrame.value); }, style: {
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
                            }, onMouseEnter: function (e) {
                                if (selectedTimeFrame !== timeFrame.value) {
                                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                                }
                            }, onMouseLeave: function (e) {
                                if (selectedTimeFrame !== timeFrame.value) {
                                    e.currentTarget.style.backgroundColor = 'white';
                                }
                            } }, { children: [_jsx("div", __assign({ style: { marginBottom: '0.25rem' } }, { children: _jsx("span", __assign({ style: {
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#282828'
                                        } }, { children: timeFrame.label })) })), _jsx("div", __assign({ style: {
                                        fontSize: '14px',
                                        color: '#606060'
                                    } }, { children: timeFrame.description })), selectedTimeFrame === timeFrame.value && (_jsx("div", __assign({ style: {
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#FF0000',
                                        fontSize: '20px'
                                    } }, { children: "\u2713" })))] }), timeFrame.value)); }) }))] }));
        }
        return null;
    };
    return (_jsxs("div", __assign({ style: {
            minHeight: 'calc(100vh - 72px)',
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            position: 'relative'
        } }, { children: [_jsx("h1", __assign({ style: {
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#282828',
                    fontSize: '24px',
                    fontWeight: '500'
                } }, { children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0438\u0448\u0443, \u0432 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0445\u043E\u0442\u0438\u0442\u0435 \u043D\u0430\u0439\u0442\u0438 \u0442\u0440\u0435\u043D\u0434\u044B" })), _jsx("div", __assign({ style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 1rem'
                } }, { children: NICHES.map(function (niche) { return (_jsx("button", __assign({ onClick: function () { return handleNicheClick(niche.id); }, style: {
                        width: '100%',
                        padding: '1.5rem',
                        backgroundColor: selectedNiche === niche.id ? '#f2f2f2' : 'white',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                    }, onMouseEnter: function (e) {
                        if (selectedNiche !== niche.id) {
                            e.currentTarget.style.backgroundColor = '#f9f9f9';
                        }
                    }, onMouseLeave: function (e) {
                        if (selectedNiche !== niche.id) {
                            e.currentTarget.style.backgroundColor = 'white';
                        }
                    } }, { children: _jsxs("div", __assign({ style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        } }, { children: [_jsx("span", __assign({ style: { fontSize: '24px' } }, { children: niche.icon })), _jsx("span", __assign({ style: {
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    color: '#282828'
                                } }, { children: niche.name }))] })) }), niche.id)); }) })), showPopup && selectedNicheData && (_jsx("div", __assign({ style: {
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
                } }, { children: _jsxs("div", __assign({ style: {
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '2rem',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        position: 'relative',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    } }, { children: [_jsxs("div", __assign({ style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '2rem'
                            } }, { children: [_jsxs("div", __assign({ style: { display: 'flex', alignItems: 'center', gap: '1rem' } }, { children: [currentStep === 2 && (_jsx("button", __assign({ onClick: handleBackClick, style: {
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
                                            }, onMouseEnter: function (e) {
                                                e.currentTarget.style.backgroundColor = '#f2f2f2';
                                            }, onMouseLeave: function (e) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            } }, { children: "\u2190" }))), _jsxs("span", __assign({ style: {
                                                color: '#606060',
                                                fontSize: '14px',
                                                fontWeight: '500'
                                            } }, { children: ["\u0428\u0430\u0433 ", currentStep, " \u0438\u0437 2"] }))] })), _jsx("button", __assign({ onClick: handleClosePopup, style: {
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
                                    }, onMouseEnter: function (e) {
                                        e.currentTarget.style.backgroundColor = '#f2f2f2';
                                    }, onMouseLeave: function (e) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    } }, { children: "\u00D7" }))] })), renderStepContent(), _jsx("button", __assign({ onClick: handleNextClick, disabled: currentStep === 1 ? !selectedSubNiche : !selectedTimeFrame, style: {
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
                            }, onMouseEnter: function (e) {
                                if (currentStep === 1 ? selectedSubNiche : selectedTimeFrame) {
                                    e.currentTarget.style.backgroundColor = '#cc0000';
                                }
                            }, onMouseLeave: function (e) {
                                if (currentStep === 1 ? selectedSubNiche : selectedTimeFrame) {
                                    e.currentTarget.style.backgroundColor = '#FF0000';
                                }
                            } }, { children: "\u0414\u0430\u043B\u0435\u0435" }))] })) })))] })));
};
