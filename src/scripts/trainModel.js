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
import * as tfn from '@tensorflow/tfjs-node';
import { TrainingDataGenerator } from '../services/TrainingDataGenerator';
import * as path from 'path';
import * as fs from 'fs';
var ModelTrainer = /** @class */ (function () {
    function ModelTrainer() {
        this.MODEL_PATH = './models/virality-predictor-model';
        this.STATS_PATH = './models/feature_stats.json';
        this.featureNames = [
            'viewVelocity',
            'engagementRate',
            'likeCount',
            'commentCount'
        ];
    }
    ModelTrainer.prototype.calculateFeatureStats = function (data) {
        var features = data.map(function (td) { return [
            td.viewVelocity,
            td.engagementRate,
            td.likeCount,
            td.commentCount
        ]; });
        var means = features.reduce(function (acc, curr) {
            return acc.map(function (val, idx) { return val + curr[idx]; });
        }, new Array(this.featureNames.length).fill(0))
            .map(function (sum) { return sum / features.length; });
        var stds = features.reduce(function (acc, curr) {
            return acc.map(function (val, idx) { return val + Math.pow(curr[idx] - means[idx], 2); });
        }, new Array(this.featureNames.length).fill(0))
            .map(function (sum) { return Math.sqrt(sum / features.length); });
        return { means: means, stds: stds };
    };
    ModelTrainer.prototype.normalizeFeatures = function (features, stats) {
        return features.map(function (feature) {
            return feature.map(function (value, index) {
                return (value - stats.means[index]) / (stats.stds[index] + 1e-8);
            });
        });
    };
    ModelTrainer.prototype.createModel = function () {
        var model = tf.sequential({
            layers: [
                tf.layers.dense({
                    inputShape: [this.featureNames.length],
                    units: 32,
                    activation: 'relu',
                    kernelInitializer: 'glorotNormal'
                }),
                tf.layers.batchNormalization(),
                tf.layers.dropout({ rate: 0.2 }),
                tf.layers.dense({
                    units: 16,
                    activation: 'relu',
                    kernelInitializer: 'glorotNormal'
                }),
                tf.layers.batchNormalization(),
                tf.layers.dropout({ rate: 0.1 }),
                tf.layers.dense({
                    units: 1,
                    activation: 'sigmoid',
                    kernelInitializer: 'glorotNormal'
                })
            ]
        });
        model.compile({
            optimizer: tf.train.adam(0.001),
            loss: tf.losses.sigmoidCrossEntropy,
            metrics: ['accuracy']
        });
        return model;
    };
    ModelTrainer.prototype.train = function () {
        return __awaiter(this, void 0, void 0, function () {
            var generator, trainingData, stats, features, normalizedFeatures, labels, xTrain, yTrain, model, modelsDir, handler;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Starting model training...');
                        generator = new TrainingDataGenerator();
                        return [4 /*yield*/, generator.getStoredTrainingData()];
                    case 1:
                        trainingData = _a.sent();
                        if (trainingData.length === 0) {
                            throw new Error('No training data available');
                        }
                        console.log("Loaded ".concat(trainingData.length, " training samples"));
                        stats = this.calculateFeatureStats(trainingData);
                        console.log('Feature statistics:', stats);
                        features = trainingData.map(function (td) { return [
                            td.viewVelocity,
                            td.engagementRate,
                            td.likeCount,
                            td.commentCount
                        ]; });
                        normalizedFeatures = this.normalizeFeatures(features, stats);
                        labels = trainingData.map(function (td) { return [td.isViral ? 1 : 0]; });
                        xTrain = tf.tensor2d(normalizedFeatures);
                        yTrain = tf.tensor2d(labels);
                        model = this.createModel();
                        console.log('Training model...');
                        return [4 /*yield*/, model.fit(xTrain, yTrain, {
                                epochs: 100,
                                batchSize: 32,
                                validationSplit: 0.2,
                                shuffle: true,
                                callbacks: {
                                    onEpochEnd: function (epoch, logs) {
                                        var _a, _b, _c, _d;
                                        console.log("Epoch ".concat(epoch + 1, ": loss = ").concat((_a = logs === null || logs === void 0 ? void 0 : logs.loss) === null || _a === void 0 ? void 0 : _a.toFixed(4), ", ") +
                                            "accuracy = ".concat((_b = logs === null || logs === void 0 ? void 0 : logs.acc) === null || _b === void 0 ? void 0 : _b.toFixed(4), ", ") +
                                            "val_loss = ".concat((_c = logs === null || logs === void 0 ? void 0 : logs.val_loss) === null || _c === void 0 ? void 0 : _c.toFixed(4), ", ") +
                                            "val_accuracy = ".concat((_d = logs === null || logs === void 0 ? void 0 : logs.val_acc) === null || _d === void 0 ? void 0 : _d.toFixed(4)));
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        modelsDir = path.dirname(this.MODEL_PATH);
                        if (!fs.existsSync(modelsDir)) {
                            fs.mkdirSync(modelsDir, { recursive: true });
                        }
                        handler = tfn.io.fileSystem(this.MODEL_PATH);
                        return [4 /*yield*/, model.save(handler)];
                    case 3:
                        _a.sent();
                        // Save feature statistics
                        fs.writeFileSync(this.STATS_PATH, JSON.stringify({ means: stats.means, stds: stats.stds }, null, 2));
                        console.log('Model and feature statistics saved successfully!');
                        // Cleanup
                        xTrain.dispose();
                        yTrain.dispose();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ModelTrainer;
}());
export { ModelTrainer };
// Execute training
var trainer = new ModelTrainer();
trainer.train().catch(console.error);
