import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, password } = body;

    if (!email && !name && !password) {
      return NextResponse.json({
        message: "All fields are required.",
      });
    }

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      return NextResponse.json({
        code: 400,
        message: "Already Registered. please login !",
      });
    }

    const user = new User(body);
    const saveduser = await user.save();

    return NextResponse.json({
      code: 200,
      message: "User registered successfully!",
      saveduser,
    });
  } catch (error) {
    // Handle errors
    return NextResponse.json({ message: "Internal Server Error", error });
  }
}
