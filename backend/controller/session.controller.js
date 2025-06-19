"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionHandler = exports.findSessionHandler = void 0;
const db_1 = __importDefault(require("../lib/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema/schema");
const catchError_1 = __importDefault(require("../utils/catchError"));
const httpStatusCode_1 = require("../utils/httpStatusCode");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const zod_1 = __importDefault(require("zod"));
exports.findSessionHandler = (0, catchError_1.default)(async (req, res) => {
    const sessions = await db_1.default
        .select()
        .from(schema_1.SessionDocument)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.SessionDocument.userId, req.userId), (0, drizzle_orm_1.gt)(schema_1.SessionDocument.expires_at, new Date(Date.now()))));
    (0, appAssert_1.default)(sessions, httpStatusCode_1.NOT_FOUND, "No session found for this user");
    const allSessions = sessions.map((session) => {
        let currentSession;
        if (session.id === req.sessionId) {
            currentSession = { ...session, isCurrent: true };
            return currentSession;
        }
        else {
            return session;
        }
    });
    return res.status(httpStatusCode_1.OK).json({ allSessions });
});
exports.deleteSessionHandler = (0, catchError_1.default)(async (req, res) => {
    const sessionId = zod_1.default.string().parse(req.params.id);
    const deletedSession = await db_1.default
        .delete(schema_1.SessionDocument)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.SessionDocument.id, sessionId), (0, drizzle_orm_1.eq)(schema_1.SessionDocument.userId, req.userId)))
        .returning();
    (0, appAssert_1.default)(deletedSession, httpStatusCode_1.NOT_FOUND, "Session not found");
    return res.status(httpStatusCode_1.OK).json({ message: "Session removed successfully" });
});
