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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export var Login = function () {
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var _c = useState(true), isLogin = _c[0], setIsLogin = _c[1];
    var _d = useState(''), error = _d[0], setError = _d[1];
    var _e = useAuth(), login = _e.login, signup = _e.signup, currentUser = _e.currentUser;
    var navigate = useNavigate();
    React.useEffect(function () {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!isLogin) return [3 /*break*/, 3];
                    return [4 /*yield*/, login(email, password)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, signup(email, password)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    navigate('/');
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    setError(error_1 instanceof Error ? error_1.message : 'An error occurred');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx("div", __assign({ style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 72px)',
            padding: '1rem',
            backgroundColor: '#f9f9f9'
        } }, { children: _jsxs("div", __assign({ style: {
                backgroundColor: 'white',
                padding: '3rem 2.5rem',
                borderRadius: '4px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '450px'
            } }, { children: [_jsx("h1", __assign({ style: {
                        textAlign: 'center',
                        marginBottom: '2rem',
                        fontSize: '24px',
                        color: '#282828',
                        fontWeight: '400'
                    } }, { children: isLogin ? 'Войти' : 'Создать аккаунт' })), error && _jsx("p", __assign({ style: {
                        color: '#FF0000',
                        textAlign: 'center',
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#fff2f2',
                        borderRadius: '4px',
                        fontSize: '14px'
                    } }, { children: error })), _jsxs("form", __assign({ onSubmit: handleSubmit, style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem'
                    } }, { children: [_jsx("input", { type: "email", placeholder: "Email", value: email, onChange: function (e) { return setEmail(e.target.value); }, style: {
                                padding: '12px',
                                fontSize: '15px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                backgroundColor: '#f9f9f9',
                                transition: 'all 0.2s ease',
                                outline: 'none',
                            } }), _jsx("input", { type: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", value: password, onChange: function (e) { return setPassword(e.target.value); }, style: {
                                padding: '12px',
                                fontSize: '15px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                backgroundColor: '#f9f9f9',
                                transition: 'all 0.2s ease',
                                outline: 'none',
                            } }), _jsx("button", __assign({ type: "submit", style: {
                                padding: '12px',
                                fontSize: '15px',
                                cursor: 'pointer',
                                backgroundColor: '#FF0000',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                marginTop: '0.5rem',
                                fontWeight: '500',
                                transition: 'background-color 0.2s ease'
                            }, onMouseEnter: function (e) {
                                e.currentTarget.style.backgroundColor = '#cc0000';
                            }, onMouseLeave: function (e) {
                                e.currentTarget.style.backgroundColor = '#FF0000';
                            } }, { children: isLogin ? 'Войти' : 'Создать' }))] })), _jsx("button", __assign({ onClick: function () { return setIsLogin(!isLogin); }, style: {
                        background: 'none',
                        border: 'none',
                        color: '#FF0000',
                        cursor: 'pointer',
                        width: '100%',
                        marginTop: '1.5rem',
                        fontSize: '14px',
                        fontWeight: '500'
                    } }, { children: isLogin ? 'Нет аккаунта? Создать' : 'Уже есть аккаунт? Войти' }))] })) })));
};
