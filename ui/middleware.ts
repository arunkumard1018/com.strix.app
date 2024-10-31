import { NextRequest, NextResponse } from "next/server";

const publicPaths = ['/auth/login', '/auth/register'];

export default function Middleware(req: NextRequest) {
    const { cookies, url } = req;
    const currentPath = new URL(url).pathname;
    const _authToken = cookies.get("token");

    // If the user is logged in and trying to access login or register, redirect to dashboard
    if (_authToken && (currentPath === "/auth/login" || currentPath === "/auth/register")) {
        return NextResponse.redirect(new URL("/dashboard", url));
    }

    // If the current path is protected (not a public path) and there is no auth token, redirect to login
    if (!publicPaths.includes(currentPath) && !_authToken) {
        return NextResponse.redirect(new URL("/auth/login", url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"],  // Match /dashboard and any subpaths under it
};
