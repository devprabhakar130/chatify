import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

function normalizeSameSite(value) {
  if (!value) return undefined;
  const normalized = String(value).trim().toLowerCase();
  if (normalized === "lax") return "lax";
  if (normalized === "strict") return "strict";
  if (normalized === "none") return "none";
  return undefined;
}

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const sameSite = normalizeSameSite(ENV.COOKIE_SAMESITE) || "strict";
  const secure = ENV.COOKIE_SECURE ?? (ENV.NODE_ENV === "development" ? false : true);

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    httpOnly: true, 
    sameSite,
    secure,
  });

  return token;
};

