import Friend from "@/models/Friend";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/services/db";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connect();
    const friends = await Friend.find();
    return new NextResponse(JSON.stringify(friends), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
