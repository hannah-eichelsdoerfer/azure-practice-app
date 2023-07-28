import { LoginButton } from '@/components/Button';
import Friends from '@/components/Friends';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main>
      {session ? (
        <Friends />
      ) : (
        // If the user is not authenticated, show the welcome and signup info
        <div className='flex flex-col items-center justify-center dark:bg-red-300'>
          <h1 className='mb-4 text-3xl font-bold'>
            Welcome! Sign up now to join us.
          </h1>
          <LoginButton />
        </div>
      )}
    </main>
  );
}
