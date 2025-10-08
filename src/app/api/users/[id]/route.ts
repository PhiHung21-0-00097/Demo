import User from "@/app/models/User";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const user = await User.findById(params.id).select("-password");
  return NextResponse.json(user);
}
