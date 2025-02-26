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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export var Header = function () {
    var _a = useAuth(), currentUser = _a.currentUser, logout = _a.logout;
    var navigate = useNavigate();
    var _b = useState(window.innerWidth <= 600), isMobile = _b[0], setIsMobile = _b[1];
    useEffect(function () {
        var handleResize = function () {
            setIsMobile(window.innerWidth <= 600);
        };
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, [setIsMobile]);
    var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, logout()];
                case 1:
                    _a.sent();
                    navigate('/login');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to log out:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var buttonStyles = {
        base: {
            padding: isMobile ? '8px 12px' : '10px 16px',
            fontSize: isMobile ? '14px' : '14px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
        },
        login: {
            backgroundColor: 'transparent',
            color: '#FF0000',
            border: '1px solid #FF0000',
        },
        register: {
            backgroundColor: '#FF0000',
            color: 'white',
            border: 'none',
        },
        logout: {
            backgroundColor: '#f2f2f2',
            color: '#606060',
            border: 'none',
        }
    };
    return (_jsxs("header", __assign({ style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.8rem 1.5rem',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            height: '56px',
        } }, { children: [_jsx("div", __assign({ style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                } }, { children: _jsx("div", __assign({ style: {
                        width: '90px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#FF0000',
                    } }, { children: "TREND" })) })), _jsx("div", __assign({ style: {
                    display: 'flex',
                    gap: isMobile ? '0.5rem' : '0.75rem',
                } }, { children: !currentUser ? (_jsxs(_Fragment, { children: [_jsx("button", __assign({ onClick: function () { return navigate('/login'); }, style: __assign(__assign({}, buttonStyles.base), buttonStyles.login), onMouseEnter: function (e) {
                                e.currentTarget.style.backgroundColor = '#fff2f2';
                            }, onMouseLeave: function (e) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            } }, { children: "\u0412\u043E\u0439\u0442\u0438" })), _jsx("button", __assign({ onClick: function () {
                                navigate('/login');
                            }, style: __assign(__assign({}, buttonStyles.base), buttonStyles.register), onMouseEnter: function (e) {
                                e.currentTarget.style.backgroundColor = '#cc0000';
                            }, onMouseLeave: function (e) {
                                e.currentTarget.style.backgroundColor = '#FF0000';
                            } }, { children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }))] })) : (_jsx("button", __assign({ onClick: handleLogout, style: __assign(__assign({}, buttonStyles.base), buttonStyles.logout), onMouseEnter: function (e) {
                        e.currentTarget.style.backgroundColor = '#e5e5e5';
                    }, onMouseLeave: function (e) {
                        e.currentTarget.style.backgroundColor = '#f2f2f2';
                    } }, { children: "\u0412\u044B\u0439\u0442\u0438" }))) }))] })));
};
