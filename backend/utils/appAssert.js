"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("./appError"));
const assert_1 = __importDefault(require("assert"));
const appAssert = (condition, HttpStatusCode, message, appErrorCode) => {
    (0, assert_1.default)(condition, new appError_1.default(HttpStatusCode, message, appErrorCode));
};
exports.default = appAssert;
