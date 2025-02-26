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
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseNode';
var SyntheticDataGenerator = /** @class */ (function () {
    function SyntheticDataGenerator() {
        this.NICHES = [
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
        this.VIRAL_PATTERNS = {
            'музыка': { viewMultiplier: 2.5, engagementMultiplier: 1.8 },
            'развлечения': { viewMultiplier: 2.0, engagementMultiplier: 1.5 },
            'технологии': { viewMultiplier: 1.8, engagementMultiplier: 1.3 },
            default: { viewMultiplier: 1.5, engagementMultiplier: 1.2 }
        };
        this.BASE_METRICS = {
            minViews: 1000,
            maxViews: 1000000,
            minEngagement: 0.01,
            maxEngagement: 0.30,
            minVelocity: 10,
            maxVelocity: 10000
        };
    }
    SyntheticDataGenerator.prototype.generateRandomTitle = function (niche) {
        var prefixes = ['Как', 'Почему', 'Топ', 'Лучшие', 'Секрет', 'Новый'];
        var suffixes = ['2024', 'тренд', 'лайфхак', 'совет', 'фишка', 'способ'];
        var prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        var suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        return "".concat(prefix, " ").concat(niche, " ").concat(suffix);
    };
    SyntheticDataGenerator.prototype.generateRandomId = function () {
        return Math.random().toString(36).substring(2, 15);
    };
    SyntheticDataGenerator.prototype.normalDistribution = function (mean, stdDev) {
        var u1 = 1 - Math.random();
        var u2 = 1 - Math.random();
        var randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return mean + stdDev * randStdNormal;
    };
    SyntheticDataGenerator.prototype.generateMetrics = function (niche, isViral) {
        var pattern = this.VIRAL_PATTERNS[niche.toLowerCase()] || this.VIRAL_PATTERNS.default;
        var multiplier = isViral ? pattern.viewMultiplier : 1;
        var engagementMultiplier = isViral ? pattern.engagementMultiplier : 1;
        // Generate base metrics with normal distribution
        var viewVelocity = Math.abs(this.normalDistribution(isViral ? 2000 : 500, isViral ? 1000 : 200)) * multiplier;
        var engagementRate = Math.abs(this.normalDistribution(isViral ? 0.15 : 0.05, isViral ? 0.05 : 0.02)) * engagementMultiplier;
        // Calculate derived metrics
        var hoursActive = Math.floor(Math.random() * 72) + 1; // 1-72 hours
        var viewCount = Math.floor(viewVelocity * hoursActive);
        var totalEngagement = Math.floor(viewCount * engagementRate);
        // Split engagement between likes, comments, and shares (75-15-10 ratio typically)
        var likeCount = Math.floor(totalEngagement * 0.75);
        var commentCount = Math.floor(totalEngagement * 0.15);
        var shareCount = Math.floor(totalEngagement * 0.10);
        return {
            viewCount: Math.min(viewCount, this.BASE_METRICS.maxViews),
            likeCount: likeCount,
            commentCount: commentCount,
            shareCount: shareCount,
            viewVelocity: viewVelocity,
            engagementRate: engagementRate
        };
    };
    SyntheticDataGenerator.prototype.generateShort = function (niche, isViral) {
        var metrics = this.generateMetrics(niche, isViral);
        var hoursAgo = Math.floor(Math.random() * 72); // 0-72 hours ago
        var publishedAt = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
        return __assign({ videoId: this.generateRandomId(), title: this.generateRandomTitle(niche), publishedAt: publishedAt, niche: niche, subNiche: niche, thumbnailUrl: "https://img.youtube.com/vi/".concat(this.generateRandomId(), "/maxresdefault.jpg"), channelId: this.generateRandomId(), channelTitle: "".concat(niche, " Channel ").concat(Math.floor(Math.random() * 1000)) }, metrics);
    };
    SyntheticDataGenerator.prototype.storeTrainingData = function (data) {
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
                        console.log("Stored ".concat(data.length, " training samples"));
                        return [2 /*return*/];
                }
            });
        });
    };
    SyntheticDataGenerator.prototype.isViralByMetrics = function (metrics) {
        return (metrics.viewVelocity >= 1000 && // At least 1000 views per hour
            metrics.engagementRate >= 0.10 && // At least 10% engagement
            metrics.viewCount >= 10000 && // At least 10k views
            metrics.likeCount >= 1000 // At least 1000 likes
        );
    };
    SyntheticDataGenerator.prototype.generateDataset = function (samplesPerNiche) {
        return __awaiter(this, void 0, void 0, function () {
            var allTrainingData, _i, _a, niche, viralSamples, i, short, nonViralSamples, i, short, i, j, viralCount;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('Starting synthetic data generation...');
                        allTrainingData = [];
                        for (_i = 0, _a = this.NICHES; _i < _a.length; _i++) {
                            niche = _a[_i];
                            console.log("Generating data for niche: ".concat(niche));
                            viralSamples = Math.floor(samplesPerNiche * 0.3);
                            for (i = 0; i < viralSamples; i++) {
                                short = this.generateShort(niche, true);
                                allTrainingData.push({
                                    viewVelocity: short.viewVelocity,
                                    engagementRate: short.engagementRate,
                                    likeCount: short.likeCount,
                                    commentCount: short.commentCount,
                                    isViral: true
                                });
                            }
                            nonViralSamples = samplesPerNiche - viralSamples;
                            for (i = 0; i < nonViralSamples; i++) {
                                short = this.generateShort(niche, false);
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
                        for (i = allTrainingData.length - 1; i > 0; i--) {
                            j = Math.floor(Math.random() * (i + 1));
                            _b = [allTrainingData[j], allTrainingData[i]], allTrainingData[i] = _b[0], allTrainingData[j] = _b[1];
                        }
                        // Store the data
                        return [4 /*yield*/, this.storeTrainingData(allTrainingData)];
                    case 1:
                        // Store the data
                        _c.sent();
                        viralCount = allTrainingData.filter(function (d) { return d.isViral; }).length;
                        console.log("\nDataset Statistics:\n- Total samples: ".concat(allTrainingData.length, "\n- Viral samples: ").concat(viralCount, "\n- Non-viral samples: ").concat(allTrainingData.length - viralCount, "\n- Viral ratio: ").concat((viralCount / allTrainingData.length * 100).toFixed(2), "%\n\nAverage Metrics:\n").concat(this.calculateAverageMetrics(allTrainingData), "\n"));
                        return [2 /*return*/];
                }
            });
        });
    };
    SyntheticDataGenerator.prototype.calculateAverageMetrics = function (data) {
        var viral = data.filter(function (d) { return d.isViral; });
        var nonViral = data.filter(function (d) { return !d.isViral; });
        var calcAvg = function (arr) { return arr.reduce(function (a, b) { return a + b; }, 0) / arr.length; };
        var viralMetrics = {
            viewVelocity: calcAvg(viral.map(function (d) { return d.viewVelocity; })),
            engagementRate: calcAvg(viral.map(function (d) { return d.engagementRate; })),
            likeCount: calcAvg(viral.map(function (d) { return d.likeCount; })),
            commentCount: calcAvg(viral.map(function (d) { return d.commentCount; }))
        };
        var nonViralMetrics = {
            viewVelocity: calcAvg(nonViral.map(function (d) { return d.viewVelocity; })),
            engagementRate: calcAvg(nonViral.map(function (d) { return d.engagementRate; })),
            likeCount: calcAvg(nonViral.map(function (d) { return d.likeCount; })),
            commentCount: calcAvg(nonViral.map(function (d) { return d.commentCount; }))
        };
        return "\nViral Content Averages:\n- View Velocity: ".concat(viralMetrics.viewVelocity.toFixed(2), " views/hour\n- Engagement Rate: ").concat((viralMetrics.engagementRate * 100).toFixed(2), "%\n- Likes: ").concat(viralMetrics.likeCount.toFixed(0), "\n- Comments: ").concat(viralMetrics.commentCount.toFixed(0), "\n\nNon-Viral Content Averages:\n- View Velocity: ").concat(nonViralMetrics.viewVelocity.toFixed(2), " views/hour\n- Engagement Rate: ").concat((nonViralMetrics.engagementRate * 100).toFixed(2), "%\n- Likes: ").concat(nonViralMetrics.likeCount.toFixed(0), "\n- Comments: ").concat(nonViralMetrics.commentCount.toFixed(0));
    };
    return SyntheticDataGenerator;
}());
// Execute generation
var generator = new SyntheticDataGenerator();
var SAMPLES_PER_NICHE = 200; // This will generate 2000 total samples (200 * 10 niches)
generator.generateDataset(SAMPLES_PER_NICHE).catch(console.error);
