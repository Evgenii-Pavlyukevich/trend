import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export var ProtectedRoute = function (_a) {
    var children = _a.children;
    var currentUser = useAuth().currentUser;
    if (!currentUser) {
        return _jsx(Navigate, { to: "/login" });
    }
    return _jsx(_Fragment, { children: children });
};
