import Friend from '@/models/Friend';
import connect from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) => {
  const { id } = params;

  try {
    await connect();

    const post = await Friend.findById(id);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) => {
  const { id } = params;

  try {
    await connect();

    await Friend.findByIdAndDelete(id);

    return new NextResponse('Post has been deleted', { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};
