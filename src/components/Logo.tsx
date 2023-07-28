import Link from 'next/link';
import { GiThreeFriends } from 'react-icons/gi';

const Logo = () => {
  return (
    <Link href='/' className='my-2 flex items-center space-x-1 text-indigo-500'>
      <GiThreeFriends className='mr-3 h-8 w-8 flex-shrink-0' />
      <span className='font-sans text-3xl font-bold tracking-tight'>
        Friends
      </span>
    </Link>
  );
};

export default Logo;
