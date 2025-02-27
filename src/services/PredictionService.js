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
import { ViralityPredictor } from './ViralityPredictor';
import { DataCollector } from './DataCollector';
import { logAnalyticsEvent } from '../firebase';
var PredictionService = /** @class */ (function () {
    function PredictionService() {
        this.isInitialized = false;
        this.predictor = new ViralityPredictor();
        this.dataCollector = new DataCollector();
        this.logDebug('service_created', {
            isInitialized: this.isInitialized
        });
    }
    PredictionService.prototype.logDebug = function (event, data) {
        console.log("[PredictionService] ".concat(event, ":"), data);
        logAnalyticsEvent("debug_".concat(event), __assign(__assign({}, data), { timestamp: new Date().toISOString() }));
    };
    PredictionService.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isInitialized) {
                            this.logDebug('initialize_skipped', {
                                reason: 'already_initialized'
                            });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.logDebug('initialize_start', {});
                        // Initialize the predictor
                        return [4 /*yield*/, this.predictor.initialize()];
                    case 2:
                        // Initialize the predictor
                        _a.sent();
                        this.logDebug('predictor_initialized', {});
                        this.isInitialized = true;
                        this.logDebug('initialize_complete', {
                            isInitialized: this.isInitialized
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.logDebug('initialize_error', {
                            error: error_1 instanceof Error ? error_1.message : 'Unknown error'
                        });
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PredictionService.prototype.predictTrends = function (timeWindow, niche, subNiche) {
        return __awaiter(this, void 0, void 0, function () {
            var shorts, predictions_1, results, sortedResults, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isInitialized) return [3 /*break*/, 2];
                        this.logDebug('predict_trends_init', {
                            reason: 'not_initialized'
                        });
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        this.logDebug('predict_trends_start', {
                            timeWindow: timeWindow,
                            niche: niche,
                            subNiche: subNiche
                        });
                        return [4 /*yield*/, this.dataCollector.getRecentTrends(timeWindow, niche, subNiche)];
                    case 3:
                        shorts = _a.sent();
                        this.logDebug('recent_trends_fetched', {
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
                        return [4 /*yield*/, this.predictor.predict(shorts)];
                    case 4:
                        predictions_1 = _a.sent();
                        this.logDebug('predictions_made', {
                            predictionsCount: predictions_1.length,
                            samplePrediction: predictions_1.length > 0 ? predictions_1[0] : null
                        });
                        results = shorts.map(function (short, index) { return (__assign(__assign({}, short), { prediction: predictions_1[index] })); });
                        sortedResults = results.sort(function (a, b) { return b.prediction.viralityScore - a.prediction.viralityScore; });
                        this.logDebug('results_sorted', {
                            resultsCount: sortedResults.length,
                            topScore: sortedResults.length > 0 ? sortedResults[0].prediction.viralityScore : null,
                            bottomScore: sortedResults.length > 0 ? sortedResults[sortedResults.length - 1].prediction.viralityScore : null
                        });
                        return [2 /*return*/, sortedResults];
                    case 5:
                        error_2 = _a.sent();
                        this.logDebug('predict_trends_error', {
                            timeWindow: timeWindow,
                            niche: niche,
                            subNiche: subNiche,
                            error: error_2 instanceof Error ? error_2.message : 'Unknown error'
                        });
                        throw error_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return PredictionService;
}());
export { PredictionService };
