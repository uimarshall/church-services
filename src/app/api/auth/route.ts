import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In a real application, you would look up the user in a database
    // and compare the hashed password.
    if (email === 'test@example.com' && password === 'password') {
      // In a real application, you would use a secret from environment variables
      const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c421674590011a2ec63894ae0797fb639d6efg576246d0'
      );
      const alg = 'HS256';

      const session = await new SignJWT({ email, 'urn:example:claim': true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secret);

      cookies().set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 2, // 2 hours in seconds
        path: '/',
      });

      return NextResponse.json({ message: 'Login successful' });
    } else {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
