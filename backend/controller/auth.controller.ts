import catchError from "../utils/catchError";
import {
  createAccount,
  resetPassword,
  sendPasswordResetEmail,
} from "../services/auth.service";
import {
  setAuthCookies,
  clearOutCookies,
  getRefreshTokenCookieOptions,
} from "../utils/cookies";
import { registerSchema } from "./auth.registerSchema";
import { loginSchema } from "./auth.loginSchema";
import { loginUser } from "../services/auth.service";
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../utils/httpStatusCode";
import { verifyToken } from "../services/auth.JWTtoke";
import db from "../lib/db";
import { eq } from "drizzle-orm";
import { SessionDocument } from "../schema/schema";
import appAssert from "../utils/appAssert";
import { refreshUserAccessToken } from "../services/auth.service";
import { getAccessTokenCookieOptions } from "../utils/cookies";
import { verificationCodeSchema } from "./auth.verifyEmailCodeSchema";
import { verifyEmailServices } from "../services/auth.service";
import { emailSchema } from "./auth.verifyEmailSchema";
import { resetPasswordSchema } from "./auth.resetPasswordSchema";
import { checkPasswordCode } from "../services/auth.service";

export const registerHandler = catchError(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { newUser, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json({ newUser, message: "Login successful!" });
});

export const loginHandler = catchError(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { newUser, refreshToken, accessToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json({ message: "Login successful!", newUser });
});

export const logoutHandler = catchError(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken || "");

  console.log("executed>>>>>>>>>>>>>>>>");

  if (payload) {
    await db
      .delete(SessionDocument)
      .where(eq(SessionDocument.id, payload.sessionId));
  }

  return clearOutCookies(res)
    .status(OK)
    .json({ message: "Logout successFull" });
});

export const refreshHandler = catchError(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string;
  const origin = req.get("Origin");

  const host = req.get("Host");
  console.log("Origin>>>>>>>", origin , "Host>>>>>>" , host);

  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log("Request>>>>>>>>>>", fullUrl);

  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken, newRefreshToken } =
    await refreshUserAccessToken(refreshToken);

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }
  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access token refreshed" });
});

export const verifyEmailHandler = catchError(async (req, res) => {
  //verify email code
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  const { newUser } = await verifyEmailServices(verificationCode);

  return res.status(OK).json({ message: "Email has been verified!", newUser });
});

export const forgotPasswordHandler = catchError(async (req, res) => {
  const email = emailSchema.parse(req.body.email);
  await sendPasswordResetEmail(email);

  return res.status(OK).json({ message: "Password reset email sent" });
});

export const resetPasswordHandler = catchError(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);

  await resetPassword(request);

  return clearOutCookies(res)
    .status(OK)
    .json({ message: "Password has been reset" });
});

export const checkPasswordCodeHandler = catchError(async (req, res) => {
  const { code, exp } = req.query;

  const verifyCode = verificationCodeSchema.parse(code as string);

  const { availableCode } = await checkPasswordCode(verifyCode);

  return res.status(OK).json({ message: "Code has been verified" });
});
