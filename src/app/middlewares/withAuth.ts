import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextProxy,
  NextRequest,
  NextResponse,
} from "next/server";

const authPage = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];
export default function withAuth(
  middleware: NextProxy,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
    });

    // 1. Jika belum login dan akses protected page
    if (!token && requireAuth.includes(pathname)) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // 2. Jika sudah login dan akses auth page
    if (token && authPage.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return middleware(req, next);
  };
}
