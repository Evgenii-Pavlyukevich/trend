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
export var PrivateContent = function () {
    return (_jsx("div", __assign({ style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 72px)',
            padding: '2rem',
            backgroundColor: '#f9f9f9'
        } }, { children: _jsxs("div", __assign({ style: {
                backgroundColor: 'white',
                padding: '2.5rem',
                borderRadius: '8px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                textAlign: 'center',
                maxWidth: '600px',
                width: '100%'
            } }, { children: [_jsx("h1", __assign({ style: {
                        marginBottom: '1.5rem',
                        color: '#282828',
                        fontSize: '24px',
                        fontWeight: '400'
                    } }, { children: "Private Content" })), _jsx("p", __assign({ style: {
                        color: '#606060',
                        fontSize: '16px',
                        lineHeight: '1.5'
                    } }, { children: "This content is only visible to authenticated users." }))] })) })));
};
