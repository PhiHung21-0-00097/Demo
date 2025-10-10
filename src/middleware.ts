// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   locales: ["vi", "en"],
//   defaultLocale: "vi",
//   localeDetection: false,
// });

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };
// middleware.ts (có thể xóa hoàn toàn nếu không dùng next-intl)
// hoặc giữ nếu có mục đích khác
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  // hiện tại không redirect gì hết
  return NextResponse.next();
}

export const config = {
  matcher: [], // không match bất kỳ route nào
};
