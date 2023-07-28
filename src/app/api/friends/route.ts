import Friend from '@/models/Friend';
import { NextRequest, NextResponse } from 'next/server';
import connect from '@/services/db';

// To protect your API Routes (blocking unauthorized access to resources), you can use getServerSession() to know whether a session exists or not:
// const session = await getServerSession(req, res, authOptions)
// if (session) {
//   // Session exists, continue to API route
// } else {
//   // Session does not exist, return 401 Unauthorized response
//   return new NextResponse('Unauthorized', { status: 401 })

export const GET = async (request: NextRequest) => {
  try {
    await connect();

    const friends = await Friend.find();

    return new NextResponse(JSON.stringify(friends), { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const newPost = new Friend(body);

  try {
    await connect();

    await newPost.save();

    return new NextResponse('Post has been created', { status: 201 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};
