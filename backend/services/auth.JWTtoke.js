"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = exports.refreshTokenSignOptions = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signDefaults = {
    audience: "user",
};
const verifyDefaults = {
    audience: "user",
};
const accessTokenSignOptions = {
    expiresIn: "15m",
    secret: process.env.JWT_SECRET,
};
exports.refreshTokenSignOptions = {
    expiresIn: "30d",
    secret: process.env.JWT_REFRESH_SECRET,
};
const signToken = (payload, options) => {
    const { secret, ...signOpts } = options || accessTokenSignOptions;
    return jsonwebtoken_1.default.sign(payload, secret, { ...signDefaults, ...signOpts });
};
exports.signToken = signToken;
const verifyToken = (token, options) => {
    const { secret = process.env.JWT_SECRET, ...verifyOpts } = options || {};
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret, {
            ...verifyDefaults,
            ...verifyOpts,
        });
        if (typeof decoded === "string") {
            return { error: "Invalid token format" };
        }
        const payload = decoded;
        return { payload };
    }
    catch (error) {
        return { error: error.message };
    }
};
exports.verifyToken = verifyToken;
