import Tag from "@/app/models/Tag";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const tags = await Tag.find();
  return NextResponse.json(tags);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const tag = await Tag.create(data);
  return NextResponse.json(tag);
}
