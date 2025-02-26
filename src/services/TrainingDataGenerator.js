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
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseNode';
import { DataCollector } from './DataCollector';
var TrainingDataGenerator = /** @class */ (function () {
    function TrainingDataGenerator() {
        this.VIRAL_THRESHOLDS = {
            viewVelocity: 1000,
            engagementRate: 0.05,
            minViews: 5000,
            minLikes: 100 // Minimum likes to be considered
        };
        this.dataCollector = new DataCollector();
    }
    TrainingDataGenerator.prototype.isViral = function (short) {
        // Increase minimum thresholds for viral classification
        var minViewVelocity = 5000; // At least 5000 views per hour
        var minEngagementRate = 0.10; // At least 10% engagement rate
        var minViews = 50000; // At least 50k total views
        var minLikes = 5000; // At least 5000 likes
        return (short.viewVelocity >= minViewVelocity &&
            short.engagementRate >= minEngagementRate &&
            short.viewCount >= minViews &&
            short.likeCount >= minLikes);
    };
    TrainingDataGenerator.prototype.collectTrainingData = function (niches) {
        return __awaiter(this, void 0, void 0, function () {
            var timeWindows, _i, niches_1, niche, _a, timeWindows_1, timeWindow, shorts, trainingData, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        timeWindows = ['24h', '48h', '72h'];
                        _i = 0, niches_1 = niches;
                        _b.label = 1;
                    case 1:
                        if (!(_i < niches_1.length)) return [3 /*break*/, 9];
                        niche = niches_1[_i];
                        console.log("Collecting data for niche: ".concat(niche));
                        _a = 0, timeWindows_1 = timeWindows;
                        _b.label = 2;
                    case 2:
                        if (!(_a < timeWindows_1.length)) return [3 /*break*/, 8];
                        timeWindow = timeWindows_1[_a];
                        console.log("Processing time window: ".concat(timeWindow));
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, this.dataCollector.getRecentTrends(timeWindow, niche, '')];
                    case 4:
                        shorts = _b.sent();
                        trainingData = shorts.map(function (short) { return ({
                            viewVelocity: short.viewVelocity,
                            engagementRate: short.engagementRate,
                            likeCount: short.likeCount,
                            commentCount: short.commentCount,
                            isViral: _this.isViral(short)
                        }); });
                        return [4 /*yield*/, this.storeTrainingData(trainingData)];
                    case 5:
                        _b.sent();
                        console.log("Stored ".concat(trainingData.length, " training samples for ").concat(niche, " - ").concat(timeWindow));
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        console.error("Error collecting data for ".concat(niche, " - ").concat(timeWindow, ":"), error_1);
                        return [3 /*break*/, 7];
                    case 7:
                        _a++;
                        return [3 /*break*/, 2];
                    case 8:
                        _i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    TrainingDataGenerator.prototype.storeTrainingData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var trainingCollection, batch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trainingCollection = collection(db, 'training_data');
                        batch = data.map(function (item) {
                            return addDoc(trainingCollection, __assign(__assign({}, item), { timestamp: Timestamp.now() }));
                        });
                        return [4 /*yield*/, Promise.all(batch)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TrainingDataGenerator.prototype.getStoredTrainingData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var trainingCollection, snapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trainingCollection = collection(db, 'training_data');
                        return [4 /*yield*/, getDocs(trainingCollection)];
                    case 1:
                        snapshot = _a.sent();
                        return [2 /*return*/, snapshot.docs.map(function (doc) {
                                var data = doc.data();
                                return {
                                    viewVelocity: data.viewVelocity,
                                    engagementRate: data.engagementRate,
                                    likeCount: data.likeCount,
                                    commentCount: data.commentCount,
                                    isViral: data.isViral
                                };
                            })];
                }
            });
        });
    };
    TrainingDataGenerator.prototype.clearOldTrainingData = function (daysOld) {
        return __awaiter(this, void 0, void 0, function () {
            var trainingCollection, cutoffDate, oldDataQuery, snapshot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trainingCollection = collection(db, 'training_data');
                        cutoffDate = new Date();
                        cutoffDate.setDate(cutoffDate.getDate() - daysOld);
                        oldDataQuery = query(trainingCollection, where('timestamp', '<', Timestamp.fromDate(cutoffDate)));
                        return [4 /*yield*/, getDocs(oldDataQuery)];
                    case 1:
                        snapshot = _a.sent();
                        console.log("Found ".concat(snapshot.size, " old training records to delete"));
                        return [2 /*return*/];
                }
            });
        });
    };
    return TrainingDataGenerator;
}());
export { TrainingDataGenerator };
