"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionDocument = exports.VerificationCode = exports.AuthUsers = exports.verificationCodeTypeEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.verificationCodeTypeEnum = (0, pg_core_1.pgEnum)("VerificationCodeType", [
    "email_verification",
    "password_reset",
]);
exports.AuthUsers = (0, pg_core_1.pgTable)("AuthUsers", {
    name: (0, pg_core_1.text)("name").notNull(),
    id: (0, pg_core_1.uuid)("id").defaultRandom().notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    password: (0, pg_core_1.text)("password").notNull(),
    verified: (0, pg_core_1.boolean)("verified").notNull().default(false),
});
exports.VerificationCode = (0, pg_core_1.pgTable)("VerificationCode", {
    id: (0, pg_core_1.uuid)("id").defaultRandom(),
    userId: (0, pg_core_1.text)("userId").notNull(),
    type: (0, exports.verificationCodeTypeEnum)().notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    expires_at: (0, pg_core_1.timestamp)("expires_at").notNull(),
});
exports.SessionDocument = (0, pg_core_1.pgTable)("SessionDocument", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().notNull(),
    userId: (0, pg_core_1.text)("userId").notNull(),
    userAgent: (0, pg_core_1.text)("userAgent"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    expires_at: (0, pg_core_1.timestamp)("expires_at").notNull(),
});
