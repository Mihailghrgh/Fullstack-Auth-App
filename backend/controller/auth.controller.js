"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPasswordCodeHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.verifyEmailHandler = exports.refreshHandler = exports.logoutHandler = exports.loginHandler = exports.registerHandler = void 0;
const catchError_1 = __importDefault(require("../utils/catchError"));
const auth_service_1 = require("../services/auth.service");
const cookies_1 = require("../utils/cookies");
const auth_registerSchema_1 = require("./auth.registerSchema");
const auth_loginSchema_1 = require("./auth.loginSchema");
const auth_service_2 = require("../services/auth.service");
const httpStatusCode_1 = require("../utils/httpStatusCode");
const auth_JWTtoke_1 = require("../services/auth.JWTtoke");
const db_1 = __importDefault(require("../lib/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema/schema");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const auth_service_3 = require("../services/auth.service");
const cookies_2 = require("../utils/cookies");
const auth_verifyEmailCodeSchema_1 = require("./auth.verifyEmailCodeSchema");
const auth_service_4 = require("../services/auth.service");
const auth_verifyEmailSchema_1 = require("./auth.verifyEmailSchema");
const auth_resetPasswordSchema_1 = require("./auth.resetPasswordSchema");
const auth_service_5 = require("../services/auth.service");
exports.registerHandler = (0, catchError_1.default)(async (req, res) => {
    const request = auth_registerSchema_1.registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { newUser, accessToken, refreshToken } = await (0, auth_service_1.createAccount)(request);
    return (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken })
        .status(httpStatusCode_1.CREATED)
        .json({ newUser, message: "Login successful!" });
});
exports.loginHandler = (0, catchError_1.default)(async (req, res) => {
    const request = auth_loginSchema_1.loginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    const { newUser, refreshToken, accessToken } = await (0, auth_service_2.loginUser)(request);
    return (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken })
        .status(httpStatusCode_1.OK)
        .json({ message: "Login successful!", newUser });
});
exports.logoutHandler = (0, catchError_1.default)(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const { payload } = (0, auth_JWTtoke_1.verifyToken)(accessToken || "");
    console.log("executed>>>>>>>>>>>>>>>>");
    if (payload) {
        await db_1.default
            .delete(schema_1.SessionDocument)
            .where((0, drizzle_orm_1.eq)(schema_1.SessionDocument.id, payload.sessionId));
    }
    return (0, cookies_1.clearOutCookies)(res)
        .status(httpStatusCode_1.OK)
        .json({ message: "Logout successFull" });
});
exports.refreshHandler = (0, catchError_1.default)(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const origin = req.get("Origin");
    const host = req.get("Host");
    console.log("Origin>>>>>>>", origin, "Host>>>>>>", host);
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log("Request>>>>>>>>>>", fullUrl);
    (0, appAssert_1.default)(refreshToken, httpStatusCode_1.UNAUTHORIZED, "Missing refresh token");
    const { accessToken, newRefreshToken } = await (0, auth_service_3.refreshUserAccessToken)(refreshToken);
    if (newRefreshToken) {
        res.cookie("refreshToken", newRefreshToken, (0, cookies_1.getRefreshTokenCookieOptions)());
    }
    return res
        .status(httpStatusCode_1.OK)
        .cookie("accessToken", accessToken, (0, cookies_2.getAccessTokenCookieOptions)())
        .json({ message: "Access token refreshed" });
});
exports.verifyEmailHandler = (0, catchError_1.default)(async (req, res) => {
    //verify email code
    const verificationCode = auth_verifyEmailCodeSchema_1.verificationCodeSchema.parse(req.params.code);
    const { newUser } = await (0, auth_service_4.verifyEmailServices)(verificationCode);
    return res.status(httpStatusCode_1.OK).json({ message: "Email has been verified!", newUser });
});
exports.forgotPasswordHandler = (0, catchError_1.default)(async (req, res) => {
    const email = auth_verifyEmailSchema_1.emailSchema.parse(req.body.email);
    await (0, auth_service_1.sendPasswordResetEmail)(email);
    return res.status(httpStatusCode_1.OK).json({ message: "Password reset email sent" });
});
exports.resetPasswordHandler = (0, catchError_1.default)(async (req, res) => {
    const request = auth_resetPasswordSchema_1.resetPasswordSchema.parse(req.body);
    await (0, auth_service_1.resetPassword)(request);
    return (0, cookies_1.clearOutCookies)(res)
        .status(httpStatusCode_1.OK)
        .json({ message: "Password has been reset" });
});
exports.checkPasswordCodeHandler = (0, catchError_1.default)(async (req, res) => {
    const { code, exp } = req.query;
    const verifyCode = auth_verifyEmailCodeSchema_1.verificationCodeSchema.parse(code);
    const { availableCode } = await (0, auth_service_5.checkPasswordCode)(verifyCode);
    return res.status(httpStatusCode_1.OK).json({ message: "Code has been verified" });
});
