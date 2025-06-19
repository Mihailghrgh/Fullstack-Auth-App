"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const zod_1 = require("zod");
const auth_verifyEmailCodeSchema_1 = require("./auth.verifyEmailCodeSchema");
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(1).max(50),
    verificationCode: auth_verifyEmailCodeSchema_1.verificationCodeSchema,
});
