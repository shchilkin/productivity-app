import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const verifyToken = async (token: string) => {
  return await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
};

const PUBLIC_FILE = /\.(.*)$/;
const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/register') ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  )
    return NextResponse.next();

  if (process.env.COOKIE_NAME === undefined) return new Error('COOKIE_NAME is undefined.');

  const token = req.cookies.get(process.env.COOKIE_NAME);

  if (pathname === '/') {
    if (token) {
      req.nextUrl.pathname = '/app';
      return NextResponse.redirect(req.nextUrl);
    }
    req.nextUrl.pathname = '/sign-in';
    return NextResponse.next();
  }

  if (!token) {
    req.nextUrl.pathname = '/sign-in';
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyToken(token.value);
    return NextResponse.next();
  } catch (error) {
    req.nextUrl.pathname = '/sign-in';
    return NextResponse.redirect(req.nextUrl);
  }
};

export default middleware;
