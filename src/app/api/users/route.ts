import User from "@/app/models/User";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const users = await User.find({}, "-password");
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const user = await User.create(data);
  return NextResponse.json(user);
}
