"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_JWTtoke_1 = require("../services/auth.JWTtoke");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const httpStatusCode_1 = require("../utils/httpStatusCode");
const authenticate = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    (0, appAssert_1.default)(accessToken, httpStatusCode_1.UNAUTHORIZED, "Not authorized", "InvalidAccessToken" /* AppErrorCode.InvalidAccessToken */);
    const { error, payload } = (0, auth_JWTtoke_1.verifyToken)(accessToken);
    (0, appAssert_1.default)(payload, httpStatusCode_1.UNAUTHORIZED, error === "jwt expired" ? "Token expired" : "Invalid Token", "InvalidAccessToken" /* AppErrorCode.InvalidAccessToken */);
    req.userId = payload.userId;
    req.sessionId = payload.sessionId;
    next();
};
exports.default = authenticate;
