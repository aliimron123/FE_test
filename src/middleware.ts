import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Daftar halaman yang butuh proteksi
const protectedRoutes = ["/dashboard", "/laporan", "/settings"];
// Halaman yg tidak boleh diakses ketika sudah login
const publicRoutesWhenLoggedIn = ["/", "/auth/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Jika belum login dan akses halaman protected ATAU home
  if (!token && (protectedRoutes.some((r) => pathname.startsWith(r)) || pathname === "/")) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Jika sudah login dan coba akses halaman login/home
  if (token && publicRoutesWhenLoggedIn.includes(pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Default lanjutkan request
  return NextResponse.next();
}

// Hanya berlaku untuk path tertentu
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/laporan/:path*",
    "/settings/:path*",
    "/auth/login",
    "/", // home
  ],
};
