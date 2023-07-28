import { ObjectId } from 'mongoose';
import { RiPhoneFill } from 'react-icons/ri';

async function getFriend(id: ObjectId) {
  const res = await fetch(`http://localhost:3000/api/friends/${id}`, {
    cache: 'no-store',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closes `error.js` Error Boundary
    throw new Error('Failed to fetch friend');
  }

  return res.json();
}

export default async function MyFriend({
  params,
}: {
  params: {
    id: ObjectId;
  };
}) {
  const friend = await getFriend(params.id);

  return (
    <div>
      {friend ? (
        <div>
          <h1>{friend.name}</h1>
          <p>{friend.email}</p>
          <p>
            <RiPhoneFill /> {friend.phone}
          </p>
        </div>
      ) : (
        <div>
          <h1>Friend not found</h1>
        </div>
      )}
    </div>
  );
}
