"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPasswordCode = exports.resetPassword = exports.sendPasswordResetEmail = exports.verifyEmailServices = exports.refreshUserAccessToken = exports.loginUser = exports.createAccount = void 0;
const schema_1 = require("../schema/schema");
const schema_2 = require("../schema/schema");
const schema_3 = require("../schema/schema");
const db_1 = __importDefault(require("../lib/db"));
const drizzle_orm_1 = require("drizzle-orm");
const date_1 = require("../utils/date");
const appAssert_1 = __importDefault(require("../utils/appAssert"));
const httpStatusCode_1 = require("../utils/httpStatusCode");
const auth_JWTtoke_1 = require("./auth.JWTtoke");
const date_2 = require("../utils/date");
const auth_JWTtoke_2 = require("./auth.JWTtoke");
const sendMail_1 = require("../utils/sendMail");
const emailTemplate_1 = require("../utils/emailTemplate");
const emailTemplate_2 = require("../utils/emailTemplate");
const createAccount = async (data) => {
    //verify existing user
    const existingUser = await db_1.default
        .select()
        .from(schema_1.AuthUsers)
        .where((0, drizzle_orm_1.eq)(schema_1.AuthUsers.email, data.email));
    //checking or throwing error based on user
    (0, appAssert_1.default)(!existingUser[0], httpStatusCode_1.CONFLICT, "Email already in use by another account");
    //create user
    const user = await db_1.default
        .insert(schema_1.AuthUsers)
        .values({
        name: data.name,
        email: data.email,
        password: data.password,
        verified: false,
    })
        .returning();
    //create verifications code
    const verificationCode = await db_1.default
        .insert(schema_2.VerificationCode)
        .values({
        userId: user[0].id,
        type: "email_verification" /* VerificationCodeType.EmailVerification */,
        expires_at: (0, date_1.oneYearFromNow)(),
    })
        .returning();
    const url = `http://localhost:3000/email/verify/${verificationCode[0].id}`;
    //send verification email
    await (0, sendMail_1.sendMail)({
        to: user[0].email,
        ...(0, emailTemplate_1.verifyEmailTemplate)(url, user[0].email),
    });
    //create session
    const session = await db_1.default
        .insert(schema_3.SessionDocument)
        .values({
        userId: user[0].id,
        userAgent: data.userAgent,
        expires_at: (0, date_1.thirtyDaysFromNow)(),
    })
        .returning();
    //sign access token with refresh token
    const newUser = {
        email: user[0].email,
        id: user[0].id,
        created_at: user[0].created_at,
    };
    const sessionInfo = {
        sessionId: session[0].id,
    };
    const accessToken = (0, auth_JWTtoke_1.signToken)({
        ...sessionInfo,
        userId: newUser.id,
    });
    const refreshToken = (0, auth_JWTtoke_1.signToken)(sessionInfo, auth_JWTtoke_1.refreshTokenSignOptions);
    //   const refreshToken = Jwt.sign(
    //     { sessionId: session[0].id },
    //     process.env.JWT_REFRESH_SECRET as string,
    //     { audience: ["user"], expiresIn: "30d" }
    //   );
    //   const accessToken = Jwt.sign(
    //     { userId: user[0].id as string, sessionId: user[0].id },
    //     process.env.JWT_SECRET as string,
    //     { audience: ["user"], expiresIn: "15m" }
    //   );
    //return user with tokens
    return { newUser, refreshToken, accessToken };
};
exports.createAccount = createAccount;
const loginUser = async (data) => {
    //verify user exists
    const existingUser = await db_1.default
        .select()
        .from(schema_1.AuthUsers)
        .where((0, drizzle_orm_1.eq)(schema_1.AuthUsers.email, data.email));
    (0, appAssert_1.default)(existingUser[0], httpStatusCode_1.UNAUTHORIZED, "Invalid email or password");
    //validate password
    const isValid = data.password === existingUser[0].password;
    (0, appAssert_1.default)(isValid, httpStatusCode_1.UNAUTHORIZED, "Invalid email or password");
    //create a session
    const session = await db_1.default
        .insert(schema_3.SessionDocument)
        .values({
        userId: existingUser[0].id,
        userAgent: data.userAgent,
        expires_at: (0, date_1.thirtyDaysFromNow)(),
    })
        .returning();
    //sign access token and refresh token and return those
    const sessionInfo = {
        sessionId: session[0].id,
    };
    const newUser = {
        email: existingUser[0].email,
        id: existingUser[0].id,
        created_at: existingUser[0].created_at,
    };
    const accessToken = (0, auth_JWTtoke_1.signToken)({
        ...sessionInfo,
        userId: existingUser[0].id,
    });
    const refreshToken = (0, auth_JWTtoke_1.signToken)(sessionInfo, auth_JWTtoke_1.refreshTokenSignOptions);
    return { newUser, refreshToken, accessToken };
};
exports.loginUser = loginUser;
const refreshUserAccessToken = async (refreshToken) => {
    const { payload } = (0, auth_JWTtoke_2.verifyToken)(refreshToken, {
        secret: auth_JWTtoke_1.refreshTokenSignOptions.secret,
    });
    (0, appAssert_1.default)(payload, httpStatusCode_1.UNAUTHORIZED, "Invalid refresh token");
    console.log("Payload >>>>>>>", payload);
    const session = await db_1.default
        .select()
        .from(schema_3.SessionDocument)
        .where((0, drizzle_orm_1.eq)(schema_3.SessionDocument.id, payload.sessionId));
    const now = new Date(Date.now());
    console.log("The session found inside the database", session[0]);
    (0, appAssert_1.default)(session[0] && session[0].expires_at > now, httpStatusCode_1.UNAUTHORIZED, "Session expired");
    const sessionCalculation = Number(session[0].expires_at) - Number(now);
    //refresh the session if it expires in the next 24 hours
    const sessionNeedsRefresh = sessionCalculation <= date_2.ONE_DAY_MS;
    if (sessionNeedsRefresh) {
        await db_1.default
            .update(schema_3.SessionDocument)
            .set({ expires_at: (0, date_1.thirtyDaysFromNow)() })
            .where((0, drizzle_orm_1.eq)(schema_3.SessionDocument.id, session[0].id));
    }
    const newRefreshToken = sessionNeedsRefresh
        ? (0, auth_JWTtoke_1.signToken)({ sessionId: session[0].id }, auth_JWTtoke_1.refreshTokenSignOptions)
        : undefined;
    const accessToken = (0, auth_JWTtoke_1.signToken)({
        userId: session[0].userId,
        sessionId: session[0].id,
    });
    return { accessToken, newRefreshToken };
};
exports.refreshUserAccessToken = refreshUserAccessToken;
const verifyEmailServices = async (code) => {
    //get code
    const validationCode = await db_1.default
        .select()
        .from(schema_2.VerificationCode)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_2.VerificationCode.id, code), (0, drizzle_orm_1.gt)(schema_2.VerificationCode.expires_at, new Date(Date.now()))));
    (0, appAssert_1.default)(validationCode[0], httpStatusCode_1.NOT_FOUND, "Invalid or expired verification code");
    //get user by Identifier
    const verifyUser = await db_1.default
        .select()
        .from(schema_1.AuthUsers)
        .where((0, drizzle_orm_1.eq)(schema_1.AuthUsers.id, validationCode[0].userId));
    (0, appAssert_1.default)(verifyUser[0], httpStatusCode_1.NOT_FOUND, "User does not exist!");
    //update the user to verification true
    const updatedUser = await db_1.default
        .update(schema_1.AuthUsers)
        .set({ verified: true })
        .where((0, drizzle_orm_1.eq)(schema_1.AuthUsers.id, verifyUser[0].id))
        .returning();
    (0, appAssert_1.default)(updatedUser[0], httpStatusCode_1.INTERNAL_SERVER_ERROR, "Failed to verify email");
    //delete verification code
    await db_1.default.delete(schema_2.VerificationCode).where((0, drizzle_orm_1.eq)(schema_2.VerificationCode.id, code));
    //return users
    const newUser = {
        email: updatedUser[0].email,
        id: updatedUser[0].id,
        created_at: updatedUser[0].created_at,
    };
    return { newUser };
};
exports.verifyEmailServices = verifyEmailServices;
const sendPasswordResetEmail = async (email) => {
    //get the user by email
    const user = await db_1.default
        .select()
        .from(schema_1.AuthUsers)
        .where((0, drizzle_orm_1.eq)(schema_1.AuthUsers.email, email));
    //check if user exists
    (0, appAssert_1.default)(user[0], httpStatusCode_1.NOT_FOUND, "User email does not exist");
    //check email rate limit
    const date = new Date(Date.now());
    const count = await db_1.default
        .select()
        .from(schema_2.VerificationCode)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_2.VerificationCode.type, "password_reset" /* VerificationCodeType.PasswordReset */), (0, drizzle_orm_1.eq)(schema_2.VerificationCode.userId, user[0].id), (0, drizzle_orm_1.gt)(schema_2.VerificationCode.expires_at, date)));
    console.log(count.length);
    (0, appAssert_1.default)(count.length <= 1, httpStatusCode_1.TOO_MANY_REQUESTS, "Too many requests, please try again later");
    //create verification code
    const passwordResetCode = await db_1.default
        .insert(schema_2.VerificationCode)
        .values({
        userId: user[0].id,
        type: "password_reset" /* VerificationCodeType.PasswordReset */,
        expires_at: (0, date_1.fiveMinutesFromNow)(),
    })
        .returning();
    //send verification email
    const timeStamp = Math.floor((0, date_1.fiveMinutesFromNow)().getTime());
    const url = `${process.env.AP_ORIGIN}auth/password/reset?code=${passwordResetCode[0].id}&exp=${timeStamp}`;
    const { data, error } = await (0, sendMail_1.sendMail)({
        to: user[0].email,
        ...(0, emailTemplate_2.resetPasswordEmailTemplate)(url, user[0].email),
    });
    (0, appAssert_1.default)(data?.id, httpStatusCode_1.INTERNAL_SERVER_ERROR, `${error}`);
    //return success
    return { url, emailId: data.id };
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const resetPassword = async ({ password, verificationCode, }) => {
    const date = new Date(Date.now());
    //get the verification code
    const validCode = await db_1.default
        .select()
        .from(schema_2.VerificationCode)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_2.VerificationCode.id, verificationCode), (0, drizzle_orm_1.eq)(schema_2.VerificationCode.type, "password_reset" /* VerificationCodeType.PasswordReset */), (0, drizzle_orm_1.gt)(schema_2.VerificationCode.expires_at, date)));
    //if valid update the user password
    (0, appAssert_1.default)(validCode[0], httpStatusCode_1.NOT_FOUND, "Invalid or expired verification code");
    const updatedUser = await db_1.default
        .update(schema_1.AuthUsers)
        .set({ password: password })
        .where((0, drizzle_orm_1.eq)(schema_1.AuthUsers.id, validCode[0].userId))
        .returning();
    //delete the verification code
    console.log("Updated user details", updatedUser[0]);
    await db_1.default
        .delete(schema_2.VerificationCode)
        .where((0, drizzle_orm_1.eq)(schema_2.VerificationCode.id, verificationCode));
    //delete ALL sessions
    await db_1.default
        .delete(schema_3.SessionDocument)
        .where((0, drizzle_orm_1.eq)(schema_3.SessionDocument.userId, updatedUser[0].id));
    const newUser = {
        email: updatedUser[0].email,
    };
    return { newUser };
};
exports.resetPassword = resetPassword;
const checkPasswordCode = async (code) => {
    const availableCode = await db_1.default
        .select()
        .from(schema_2.VerificationCode)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_2.VerificationCode.id, code), (0, drizzle_orm_1.gt)(schema_2.VerificationCode.expires_at, new Date(Date.now()))));
    (0, appAssert_1.default)(availableCode[0], httpStatusCode_1.NOT_FOUND, "Code unavailable or expired");
    return { availableCode };
};
exports.checkPasswordCode = checkPasswordCode;
