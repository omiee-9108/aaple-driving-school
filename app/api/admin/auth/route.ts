import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  verifySessionToken,
  SESSION_COOKIE_NAME,
  DEFAULT_PASSWORD,
} from "@/lib/admin-auth";
import { getAdminDatabase } from "@/lib/admin-store";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME);
    const db = getAdminDatabase();
    const effectivePassword = db.settings.adminPassword || DEFAULT_PASSWORD;

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false });
    }

    const isValid = verifySessionToken(sessionCookie.value, effectivePassword);
    return NextResponse.json({
      authenticated: isValid,
      schoolName: db.settings.schoolName,
      rtoJurisdiction: db.settings.rtoJurisdiction,
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: "Auth check failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    const db = getAdminDatabase();
    const effectivePassword = db.settings.adminPassword || DEFAULT_PASSWORD;

    if (!password || password !== effectivePassword) {
      return NextResponse.json(
        { success: false, message: "Invalid admin password. Please try again." },
        { status: 401 }
      );
    }

    const token = createSessionToken(effectivePassword);
    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
      schoolName: db.settings.schoolName,
    });

    // Set 7-day secure HttpOnly cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
