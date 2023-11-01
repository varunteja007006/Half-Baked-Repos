"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
function processUser(user) {
    return __assign({}, user);
}
var userData = {
    username: "test_user",
    paymentID: 435343,
    email: "test_user@dummy.com",
    test: "test_user@dummy.com",
};
processUser(userData); // This does not throw an error even though we are passing the email which is
