'use client';

import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <button
      className='inline-block whitespace-nowrap rounded-lg bg-indigo-500 px-5 py-2 text-sm font-semibold capitalize tracking-wider text-white shadow-lg transition duration-300 hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 sm:text-lg'
      type='button'
      onClick={() => signIn('github')}
    >
      Sign in
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className='inline-block whitespace-nowrap rounded-lg bg-indigo-500 px-5 py-2 text-sm font-semibold capitalize tracking-wider text-white shadow-lg transition duration-300 hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 sm:text-lg'
      type='button'
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};
