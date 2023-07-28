import Link from 'next/link';
import { IFriend } from '../models/Friend';
import { RiPhoneFill } from 'react-icons/ri';

export default function FriendCard({ friend }: { friend: IFriend }) {
  return (
    <Link
      href={`/friends/${friend._id}`}
      className='block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
    >
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {friend.name}
      </h5>
      <p className='font-normal text-gray-700 dark:text-gray-400'>
        {friend.email}
      </p>
      {friend.phone && (
        <p>
          <RiPhoneFill className='mr-2 inline-block text-gray-700 dark:text-gray-400' />
          {friend.phone}
        </p>
      )}
    </Link>
  );
}
