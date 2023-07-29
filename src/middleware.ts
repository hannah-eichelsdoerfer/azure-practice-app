import { getServerSession } from 'next-auth';
import { withAuth } from 'next-auth/middleware'; // `withAuth` augments your `Request` with the user's token.
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextResponse } from 'next/server';

export async function getUser() {
  const res = await fetch('http://localhost:3000/api/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch friends');
  }

  return res.json();
}

// export const middleware = async (req) => {
//   const session = await getSession();

//   // if (!session) {
//   //   return NextResponse.redirect('http://localhost:3000/api/auth/signin');
//   // }

//   const me = await getUser();

//   if (!me) {
//     throw new Error('Failed to fetch user');
//     return NextResponse.redirect('http://localhost:3000/api/auth/signin');
//   }

//   if (!me.registrationComplete) {
//     return NextResponse.redirect('http://localhost:3000/register');
//   }

//   if (req.nextUrl.pathname === '/register') {
//     return NextResponse.redirect('http://localhost:3000');
//   }

//   return NextResponse.next();
// };

// combine withAuth and middleware
export default withAuth(
  // the middleware function will only be invoked if the authorized callback returns true
  async function middleware(req) {
    const me = await getUser();

    if (!me) {
      throw new Error('Failed to fetch user');
      return NextResponse.redirect('http://localhost:3000/api/auth/signin');
    }

    if (!me.registrationComplete) {
      return NextResponse.redirect('http://localhost:3000/register');
    }

    if (req.nextUrl.pathname === '/register') {
      return NextResponse.redirect('http://localhost:3000');
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname === '/admin') {
          return token?.userRole === 'admin';
        }

        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ['/friends/:path*'], // '/((?!api|_next|static|public|favicon.ico).*)',
};
