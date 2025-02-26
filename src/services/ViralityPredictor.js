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
import * as tf from '@tensorflow/tfjs';
import { logAnalyticsEvent } from '../firebase';
var ViralityPredictor = /** @class */ (function () {
    function ViralityPredictor() {
        this.model = null;
        this.MODEL_PATH = '/models/virality-predictor-model/model.json';
        this.STATS_PATH = '/models/feature_stats.json';
        this.featureNames = [
            'viewVelocity',
            'engagementRate',
            'likeCount',
            'commentCount'
        ];
        this.featureStats = null;
    }
    ViralityPredictor.prototype.logDebug = function (event, data) {
        console.log("[ViralityPredictor] ".concat(event, ":"), data);
        logAnalyticsEvent("debug_".concat(event), __assign(__assign({}, data), { timestamp: new Date().toISOString() }));
    };
    ViralityPredictor.prototype.loadFeatureStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.STATS_PATH)];
                    case 1:
                        response = _b.sent();
                        if (!response.ok) {
                            switch (response.status) {
                                case 404:
                                    throw new Error('Feature statistics file not found');
                                case 403:
                                    throw new Error('Access denied to feature statistics');
                                default:
                            throw new Error("Failed to load feature statistics: ".concat(response.statusText));
                            }
                        }
                        _a = this;
                        return [4 /*yield*/, response.json()];
                    case 2:
                        _a.featureStats = _b.sent();
                        this.logDebug('feature_stats_loaded', this.featureStats);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        this.logDebug('feature_stats_load_error', {
                            error: error_1 instanceof Error ? error_1.message : 'Unknown error'
                        });
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ViralityPredictor.prototype.extractFeatures = function (shorts) {
        var _this = this;
        var _a;
        if (!this.featureStats) {
            throw new Error('Feature statistics not loaded');
        }
        this.logDebug('extract_features_start', {
            shortsCount: shorts.length,
            sampleShort: shorts.length > 0 ? shorts[0] : null
        });
        var features = shorts.map(function (short) { return [
            short.viewVelocity,
            short.engagementRate,
            short.likeCount,
            short.commentCount
        ]; });
        // Normalize features using loaded statistics
        var normalizedFeatures = features.map(function (feature) {
            return feature.map(function (value, index) {
                var mean = _this.featureStats.means[index];
                var std = _this.featureStats.stds[index];
                return (value - mean) / (std + 1e-8);
            });
        });
        this.logDebug('extract_features_tensor', {
            featuresShape: [normalizedFeatures.length, (_a = normalizedFeatures[0]) === null || _a === void 0 ? void 0 : _a.length],
            sampleFeatures: normalizedFeatures.length > 0 ? normalizedFeatures[0] : null
        });
        return tf.tensor2d(normalizedFeatures, [normalizedFeatures.length, this.featureNames.length]);
    };
    ViralityPredictor.prototype.predict = function (shorts) {
        return __awaiter(this, void 0, void 0, function () {
            var features, predictions, scores, results, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        logAnalyticsEvent('prediction_start', {
                            shortsCount: shorts.length,
                            timestamp: new Date().toISOString()
                        });
                        if (!(!this.model || !this.featureStats)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.model) {
                            throw new Error('Model not available');
                        }
                        features = this.extractFeatures(shorts);
                        return [4 /*yield*/, this.model.predict(features)];
                    case 3:
                        predictions = _a.sent();
                        scores = Array.from(predictions.dataSync());
                        // Cleanup tensors
                        features.dispose();
                        predictions.dispose();
                        results = scores.map(function (score, index) { return ({
                            viralityScore: score,
                            confidence: _this.calculateConfidence(score),
                            factors: _this.calculateFactors(shorts[index])
                        }); });
                        logAnalyticsEvent('prediction_complete', {
                            shortsCount: shorts.length,
                            timestamp: new Date().toISOString()
                        });
                        return [2 /*return*/, results];
                    case 4:
                        error_2 = _a.sent();
                        logAnalyticsEvent('prediction_error', {
                            error: error_2 instanceof Error ? error_2.message : 'Unknown error',
                            timestamp: new Date().toISOString()
                        });
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ViralityPredictor.prototype.calculateConfidence = function (score) {
        return 1 - 2 * Math.abs(0.5 - score);
    };
    ViralityPredictor.prototype.calculateFactors = function (short) {
        var factors = [
            { name: 'View Velocity', weight: short.viewVelocity / 1000 },
            { name: 'Engagement', weight: short.engagementRate },
            { name: 'Likes', weight: short.likeCount / 10000 },
            { name: 'Comments', weight: short.commentCount / 1000 }
        ];
        return factors
            .sort(function (a, b) { return b.weight - a.weight; })
            .map(function (f) { return (__assign(__assign({}, f), { weight: Math.min(f.weight, 1) })); });
    };
    ViralityPredictor.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadedModel, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.logDebug('initialization_start', {});
                        // Load feature statistics first
                        return [4 /*yield*/, this.loadFeatureStats()];
                    case 1:
                        // Load feature statistics first
                        _a.sent();
                        // Load the model
                        this.logDebug('model_load_start', {});
                        return [4 /*yield*/, tf.loadLayersModel(this.MODEL_PATH)];
                    case 2:
                        loadedModel = _a.sent();
                        if (loadedModel instanceof tf.Sequential) {
                            this.model = loadedModel;
                            this.logDebug('model_load_success', {});
                        }
                        else {
                            throw new Error('Failed to load model: Invalid model type');
                        }
                        this.logDebug('initialization_complete', {
                            hasModel: !!this.model,
                            hasFeatureStats: !!this.featureStats
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        this.logDebug('initialization_error', {
                            error: error_3 instanceof Error ? error_3.message : 'Unknown error'
                        });
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ViralityPredictor;
}());
export { ViralityPredictor };
