import { Response, CookieOptions } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

export const refreshPATH = "/auth/refresh";
const secure = process.env.NODE_ENV !== "development";

const defaultToken: CookieOptions = {
  sameSite: "none",
  httpOnly: true,
  secure: true,
};
type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const clearCookiesOptions = (): CookieOptions => ({
  ...defaultToken,
});

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaultToken,
  expires: fifteenMinutesFromNow(),
  path: "/",
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaultToken,
  expires: thirtyDaysFromNow(),
  path: "/auth/refresh",
});

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
  return res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
};

export const clearOutCookies = (res: Response) => {
  return res
    .clearCookie("accessToken", { path: "/" })
    .clearCookie("refreshToken", { path: refreshPATH });
};
