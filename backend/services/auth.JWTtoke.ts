import { SignOptions, VerifyOptions } from "jsonwebtoken";
import Jwt from "jsonwebtoken";

export type refreshTokenPayload = {
  sessionId: string;
};

export type accessTokenPayload = {
  userId: string;
  sessionId: string;
};

type signOptionsSecret = SignOptions & {
  secret: string;
};

const signDefaults: SignOptions = {
  audience: "user",
};

const verifyDefaults: VerifyOptions = {
  audience: "user",
};

const accessTokenSignOptions: signOptionsSecret = {
  expiresIn: "15m",
  secret: process.env.JWT_SECRET as string,
};

export const refreshTokenSignOptions: signOptionsSecret = {
  expiresIn: "30d",
  secret: process.env.JWT_REFRESH_SECRET as string,
};

export const signToken = (
  payload: accessTokenPayload | refreshTokenPayload,
  options?: signOptionsSecret
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;

  return Jwt.sign(payload, secret, { ...signDefaults, ...signOpts });
};

export const verifyToken = <TPayload extends object = accessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  const { secret = process.env.JWT_SECRET as string, ...verifyOpts } =
    options || {};

  try {
    const decoded = Jwt.verify(token, secret, {
      ...verifyDefaults,
      ...verifyOpts,
    });

    if (typeof decoded === "string") {
      return { error: "Invalid token format" };
    }

    const payload = decoded as TPayload;
    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};
