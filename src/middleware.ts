import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c421674590011a2ec63894ae0797fb639d6efg576246d0'
);

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    await jwtVerify(session, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
};
