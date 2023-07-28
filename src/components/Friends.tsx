import { IFriend } from '@/models/Friend';
import FriendCard from './FriendCard';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Link from 'next/link';

async function getFriends() {
  const res = await fetch('http://localhost:3000/api/friends');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closes `error.js` Error Boundary
    throw new Error('Failed to fetch friends');
  }

  return res.json();
}

export default async function Friends() {
  const friends = await getFriends();

  return (
    <>
      <h1 className='my-5 text-center text-4xl font-bold'>My Friends</h1>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <div className='block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:scale-105 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
          <Link href='/friends/add'>
            <AiOutlineUserAdd
              size={60}
              color={'rgba(107, 114, 128, var(--tw-text-opacity))'}
            />
          </Link>
        </div>
        {friends.map((friend: IFriend) => (
          <FriendCard key={friend._id.toString()} friend={friend} />
        ))}
      </div>
    </>
  );
}
