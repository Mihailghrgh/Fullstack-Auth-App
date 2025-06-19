"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHandler = void 0;
const db_1 = __importDefault(require("../lib/db"));
const schema_1 = require("../schema/schema");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const catchError_1 = __importDefault(require("../utils/catchError"));
const httpStatusCode_1 = require("../utils/httpStatusCode");
const drizzle_orm_1 = require("drizzle-orm");
exports.getUserHandler = (0, catchError_1.default)(async (req, res) => {
    const user = await db_1.default
        .select()
        .from(schema_1.AuthUsers)
        .where((0, drizzle_orm_1.eq)(schema_1.AuthUsers.id, req.userId));
    (0, appAssert_1.default)(user[0], httpStatusCode_1.NOT_FOUND, "User not found");
    const foundUser = {
        email: user[0].email,
        created_at: user[0].created_at,
        userId: user[0].id,
    };
    return res.status(httpStatusCode_1.OK).json({ message: "User found", foundUser });
});
