"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessTokenSchema = void 0;
const zod_1 = require("zod");
exports.verifyAccessTokenSchema = zod_1.z
    .string()
    .min(280, { message: "Access token not a valid type" })
    .max(280, { message: "Access token not a valid type" });
