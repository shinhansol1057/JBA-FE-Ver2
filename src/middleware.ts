import { auth } from "../auth";

export default auth((req) => {
  const { auth } = req;
  console.log("auth: ", auth);
  const isAdmin = auth?.role === "ROLE_ADMIN" || auth?.role === "ROLE_MASTER";

  const adminPath = AdminPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  const userPath = UserPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (userPath && !auth) {
    // 로그인 안되어있으면 로그인 페이지로 리다이렉션
    return Response.redirect(new URL("/login/social", req.nextUrl.origin));
  }

  if (adminPath && !isAdmin) {
    // 관리자 권한이 없으면 로그인 페이지로 리다이렉션
    return Response.redirect(new URL("/login/social", req.nextUrl.origin));
  }

  if (
    (req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/login/social") &&
    auth
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    // 로그인 페이지로 가는데 로그인이 되어있으면 메인페이지로 리다이렉션
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }
  // return Response.next();
});

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
  "/admin",
];

export const UserPaths = ["/user/my-page"];

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
