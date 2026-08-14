import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "aaple_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "aaple-driving-school-secret-key-2024";
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "aaple@admin123";

/**
 * Generate a signed session token
 */
export function createSessionToken(password: string): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(`${password}-${timestamp}`)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Verify a session token against valid passwords
 */
export function verifySessionToken(token: string, validPassword: string = DEFAULT_PASSWORD): boolean {
  try {
    if (!token || !token.includes(".")) return false;
    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;
    
    // Verify token expiration (7 days)
    const tokenAge = Date.now() - parseInt(timestamp, 10);
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (isNaN(tokenAge) || tokenAge < 0 || tokenAge > maxAge) {
      return false;
    }

    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(`${validPassword}-${timestamp}`)
      .digest("hex");

    const sigBuf = Buffer.from(signature, "utf-8");
    const expBuf = Buffer.from(expectedSignature, "utf-8");

    if (sigBuf.length !== expBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(sigBuf, expBuf);
  } catch (err) {
    return false;
  }
}

/**
 * Helper to check if current request has an active valid session
 */
export async function isAuthenticated(validPassword: string = DEFAULT_PASSWORD): Promise<boolean> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) return false;
  return verifySessionToken(sessionCookie.value, validPassword);
}

export { SESSION_COOKIE_NAME, DEFAULT_PASSWORD };
