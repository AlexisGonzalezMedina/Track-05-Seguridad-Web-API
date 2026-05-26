import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || 'fallback_secrect_key_32_chars_minium');
const COOKIE_NAME = 'session_secure_token';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

    let isAuthenticated = false;

    if (sessionCookie) {
        try {
            await jwtVerify(sessionCookie, SECRET_KEY, {
                algorithms: ['HS256'],
            });
            isAuthenticated = true;
        } catch (error) {
            isAuthenticated = false;
        }
    }

    if (pathname.startsWith('/dashboard') && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    if ((pathname === '/login' || pathname === '/') && isAuthenticated) {
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/'],
};