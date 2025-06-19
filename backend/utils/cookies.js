"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearOutCookies = exports.setAuthCookies = exports.getRefreshTokenCookieOptions = exports.getAccessTokenCookieOptions = exports.clearCookiesOptions = exports.refreshPATH = void 0;
const date_1 = require("./date");
exports.refreshPATH = "/auth/refresh";
const secure = process.env.NODE_ENV !== "development";
const defaultToken = {
    sameSite: "lax",
    httpOnly: true,
    secure: false,
};
const clearCookiesOptions = () => ({
    ...defaultToken,
});
exports.clearCookiesOptions = clearCookiesOptions;
const getAccessTokenCookieOptions = () => ({
    ...defaultToken,
    expires: (0, date_1.fifteenMinutesFromNow)(),
});
exports.getAccessTokenCookieOptions = getAccessTokenCookieOptions;
const getRefreshTokenCookieOptions = () => ({
    ...defaultToken,
    expires: (0, date_1.thirtyDaysFromNow)(),
    path: exports.refreshPATH,
});
exports.getRefreshTokenCookieOptions = getRefreshTokenCookieOptions;
const setAuthCookies = ({ res, accessToken, refreshToken }) => {
    return res
        .cookie("accessToken", accessToken, (0, exports.getAccessTokenCookieOptions)())
        .cookie("refreshToken", refreshToken, (0, exports.getRefreshTokenCookieOptions)());
};
exports.setAuthCookies = setAuthCookies;
const clearOutCookies = (res) => {
    return res
        .clearCookie("accessToken", { path: "/" })
        .clearCookie("refreshToken", { path: exports.refreshPATH });
};
exports.clearOutCookies = clearOutCookies;
