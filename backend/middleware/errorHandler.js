"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const appError_1 = __importDefault(require("../utils/appError"));
const cookies_1 = require("../utils/cookies");
const handleZodError = (res, error) => {
    const errors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
    }));
    return res.status(400).json({ message: error.message, errors });
};
const handleAppError = (res, error) => {
    return res
        .status(error.statusCode)
        .json({ message: error.message, errorCode: error.errorCode });
};
const errorHandler = (error, req, res, next) => {
    if (req.path === "/auth/refresh") {
        (0, cookies_1.clearOutCookies)(res);
    }
    if (error instanceof zod_1.z.ZodError) {
        handleZodError(res, error);
        return;
    }
    if (error instanceof appError_1.default) {
        handleAppError(res, error);
        return;
    }
    res
        .status(error.status || 500)
        .send(error.message || "Internal Server Error");
};
exports.default = errorHandler;
