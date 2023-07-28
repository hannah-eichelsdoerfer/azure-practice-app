'use client';

import { useSession } from 'next-auth/react';
import { LoginButton, LogoutButton } from '@/components/Button';
import Logo from '@/components/Logo';

export default function Navbar() {
  const { status } = useSession();

  return (
    <nav className='flex flex-wrap items-center justify-between px-20 py-3 text-white shadow-sm'>
      <Logo />
      <div className='flex gap-4'>
        {status === 'authenticated' ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
}
