import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAdmin =
    session?.role === "ROLE_ADMIN" || session?.role === "ROLE_MASTER";

  const adminPath = AdminPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  const userPath = UserPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (userPath && !session) {
    // 로그인 안되어있으면 로그인 페이지로 리다이렉션
    return NextResponse.redirect(new URL("/login/social", request.url));
  }

  if (adminPath && !isAdmin) {
    // 관리자 권한이 없으면 로그인 페이지로 리다이렉션
    return NextResponse.redirect(new URL("/login/social", request.url));
  }

  if (
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/login/social") &&
    session
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    // 로그인 페이지로 가는데 로그인이 되어있으면 메인페이지로 리다이렉션
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const AdminPaths = [
  "/jeju-competition/info/add",
  "/jeju-competition/info/update",
  "/jeju-competition/schedule/add",
  "/jeju-competition/schedule/update",
  "/jeju-competition/result/add",
  "/jeju-competition/result/update",
  "/media/gallery/add",
  "/media/gallery/update",
  "/media/video/add",
  "/media/video/update",
  "/post/add",
  "/post/update",
];

export const UserPaths = ["/user/my-page"];
