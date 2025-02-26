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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { NicheSelection } from './pages/NicheSelection';
import { Results } from './pages/Results';
function App() {
    return (_jsx(Router, { children: _jsx(AuthProvider, { children: _jsxs("div", __assign({ style: {
                    minHeight: '100vh',
                    backgroundColor: '#f9f9f9',
                    fontFamily: 'Roboto, Arial, sans-serif'
                } }, { children: [_jsx(Header, {}), _jsx("main", __assign({ style: {
                            paddingTop: '56px',
                            minHeight: 'calc(100vh - 56px)',
                            width: '100%'
                        } }, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(NicheSelection, {}) }) }), _jsx(Route, { path: "/results", element: _jsx(ProtectedRoute, { children: _jsx(Results, {}) }) })] }) }))] })) }) }));
}
export default App;
