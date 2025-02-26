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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PredictionService } from '../services/PredictionService';
var SORT_OPTIONS = [
    { value: 'viralityScore', label: 'По вирусности' },
    { value: 'viewCount', label: 'По просмотрам' },
    { value: 'engagementRate', label: 'По вовлеченности' }
];
export var Results = function () {
    var navigate = useNavigate();
    var location = useLocation();
    var state = location.state;
    var _a = useState([]), results = _a[0], setResults = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    var _d = useState('viralityScore'), sortBy = _d[0], setSortBy = _d[1];
    var _e = useState((state === null || state === void 0 ? void 0 : state.timeWindow) || '24h'), timeWindow = _e[0], setTimeWindow = _e[1];
    var _f = useState(new Date()), lastUpdated = _f[0], setLastUpdated = _f[1];
    useEffect(function () {
        if (!(state === null || state === void 0 ? void 0 : state.niche) || !(state === null || state === void 0 ? void 0 : state.subNiche)) {
            navigate('/');
            return;
        }
        var fetchResults = function () { return __awaiter(void 0, void 0, void 0, function () {
            var predictionService, predictions, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        predictionService = new PredictionService();
                        return [4 /*yield*/, predictionService.predictTrends(timeWindow, state.niche, state.subNiche)];
                    case 2:
                        predictions = _a.sent();
                        setResults(predictions);
                        setLastUpdated(new Date());
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        setError(err_1 instanceof Error ? err_1.message : 'Failed to fetch results');
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchResults();
    }, [state === null || state === void 0 ? void 0 : state.niche, state === null || state === void 0 ? void 0 : state.subNiche, timeWindow, navigate, setError, setLastUpdated, setResults, setLoading]);
    var formatNumber = function (num) {
        if (num >= 1000000)
            return "".concat((num / 1000000).toFixed(1), "M");
        if (num >= 1000)
            return "".concat((num / 1000).toFixed(1), "K");
        return num.toString();
    };
    var formatDate = function (date) {
        var now = new Date();
        var diff = now.getTime() - date.getTime();
        var hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 24)
            return "".concat(hours, " \u0447 \u043D\u0430\u0437\u0430\u0434");
        var days = Math.floor(hours / 24);
        return "".concat(days, " \u0434 \u043D\u0430\u0437\u0430\u0434");
    };
    var sortedResults = __spreadArray([], results, true).sort(function (a, b) {
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
        return (_jsx("div", __assign({ style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 72px)',
                backgroundColor: '#f9f9f9'
            } }, { children: _jsxs("div", __assign({ style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                } }, { children: [_jsx("div", { style: {
                            width: '48px',
                            height: '48px',
                            border: '4px solid #f3f3f3',
                            borderTop: '4px solid #FF0000',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                        } }), _jsx("style", { children: "\n              @keyframes spin {\n                0% { transform: rotate(0deg); }\n                100% { transform: rotate(360deg); }\n              }\n            " }), _jsx("p", __assign({ style: { color: '#606060', fontSize: '16px' } }, { children: "\u0410\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u043C \u0442\u0440\u0435\u043D\u0434\u044B..." }))] })) })));
    }
    if (error) {
        return (_jsx("div", __assign({ style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 72px)',
                backgroundColor: '#f9f9f9',
                padding: '2rem'
            } }, { children: _jsxs("div", __assign({ style: {
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    maxWidth: '400px'
                } }, { children: [_jsx("p", __assign({ style: { color: '#FF0000', marginBottom: '1rem' } }, { children: error })), _jsx("button", __assign({ onClick: function () { return navigate('/'); }, style: {
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#FF0000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        } }, { children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0432\u044B\u0431\u043E\u0440\u0443 \u043D\u0438\u0448\u0438" }))] })) })));
    }
    return (_jsx("div", __assign({ style: {
            minHeight: 'calc(100vh - 72px)',
            backgroundColor: '#f9f9f9',
            padding: '2rem'
        } }, { children: _jsxs("div", __assign({ style: {
                maxWidth: '1200px',
                margin: '0 auto',
                marginBottom: '2rem'
            } }, { children: [_jsxs("div", __assign({ style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    } }, { children: [_jsxs("h1", __assign({ style: {
                                fontSize: '24px',
                                color: '#282828',
                                fontWeight: '500'
                            } }, { children: ["\u0422\u0440\u0435\u043D\u0434\u044B: ", state.niche, " / ", state.subNiche] })), _jsxs("span", __assign({ style: {
                                color: '#606060',
                                fontSize: '14px'
                            } }, { children: ["\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E: ", formatDate(lastUpdated)] }))] })), _jsxs("div", __assign({ style: {
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '2rem'
                    } }, { children: [_jsxs("select", __assign({ value: timeWindow, onChange: function (e) { return setTimeWindow(e.target.value); }, style: {
                                padding: '0.5rem',
                                border: '1px solid #e5e5e5',
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                fontSize: '14px',
                                color: '#282828'
                            } }, { children: [_jsx("option", __assign({ value: "6h" }, { children: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 6 \u0447\u0430\u0441\u043E\u0432" })), _jsx("option", __assign({ value: "12h" }, { children: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 12 \u0447\u0430\u0441\u043E\u0432" })), _jsx("option", __assign({ value: "24h" }, { children: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 24 \u0447\u0430\u0441\u0430" })), _jsx("option", __assign({ value: "48h" }, { children: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 48 \u0447\u0430\u0441\u043E\u0432" }))] })), _jsx("select", __assign({ value: sortBy, onChange: function (e) { return setSortBy(e.target.value); }, style: {
                                padding: '0.5rem',
                                border: '1px solid #e5e5e5',
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                fontSize: '14px',
                                color: '#282828'
                            } }, { children: SORT_OPTIONS.map(function (option) { return (_jsx("option", __assign({ value: option.value }, { children: option.label }), option.value)); }) }))] })), _jsx("div", __assign({ style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    } }, { children: sortedResults.map(function (result) { return (_jsxs("div", __assign({ style: {
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s ease',
                            cursor: 'pointer'
                        }, onClick: function () { return window.open("https://youtube.com/shorts/".concat(result.videoId), '_blank'); }, onMouseEnter: function (e) {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                        }, onMouseLeave: function (e) {
                            e.currentTarget.style.transform = 'translateY(0)';
                        } }, { children: [_jsxs("div", __assign({ style: {
                                    position: 'relative',
                                    paddingTop: '177.77%',
                                    backgroundColor: '#f2f2f2'
                                } }, { children: [_jsx("img", { src: result.thumbnailUrl, alt: result.title, style: {
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        } }), _jsxs("div", __assign({ style: {
                                            position: 'absolute',
                                            top: '0.5rem',
                                            right: '0.5rem',
                                            backgroundColor: 'rgba(0,0,0,0.8)',
                                            color: 'white',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            fontWeight: '500'
                                        } }, { children: [(result.prediction.viralityScore * 100).toFixed(0), "% \u0432\u0438\u0440\u0443\u0441\u043D\u043E\u0441\u0442\u044C"] }))] })), _jsxs("div", __assign({ style: { padding: '1rem' } }, { children: [_jsx("h3", __assign({ style: {
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            color: '#282828',
                                            marginBottom: '0.5rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        } }, { children: result.title })), _jsx("div", __assign({ style: {
                                            fontSize: '14px',
                                            color: '#606060',
                                            marginBottom: '0.75rem'
                                        } }, { children: result.channelTitle })), _jsxs("div", __assign({ style: {
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                            gap: '0.5rem',
                                            fontSize: '12px',
                                            color: '#606060'
                                        } }, { children: [_jsxs("div", { children: ["\uD83D\uDC41 ", formatNumber(result.viewCount)] }), _jsxs("div", { children: ["\uD83D\uDC4D ", formatNumber(result.likeCount)] }), _jsxs("div", { children: ["\uD83D\uDCAC ", formatNumber(result.commentCount)] }), _jsxs("div", { children: ["\u26A1 ", formatNumber(result.viewVelocity), "/\u0447\u0430\u0441"] })] })), _jsxs("div", __assign({ style: {
                                            marginTop: '1rem',
                                            borderTop: '1px solid #f2f2f2',
                                            paddingTop: '0.75rem'
                                        } }, { children: [_jsx("div", __assign({ style: {
                                                    fontSize: '12px',
                                                    color: '#606060',
                                                    marginBottom: '0.5rem'
                                                } }, { children: "\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0444\u0430\u043A\u0442\u043E\u0440\u044B:" })), _jsx("div", __assign({ style: {
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '0.25rem'
                                                } }, { children: result.prediction.factors.slice(0, 2).map(function (factor) { return (_jsx("span", __assign({ style: {
                                                        fontSize: '12px',
                                                        padding: '0.25rem 0.5rem',
                                                        backgroundColor: '#f2f2f2',
                                                        borderRadius: '4px',
                                                        color: '#606060'
                                                    } }, { children: factor.name }), factor.name)); }) }))] }))] }))] }), result.videoId)); }) }))] })) })));
};
