import { connectDB } from "@/library/mongodb";
import users from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// register controller function: POST
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return NextResponse.json(
        { message: "User Already Exist!! Please Login!!!", data: {} },
        { status: 400 },
      );
    } else {
      const encryptPassword = await bcrypt.hash(password, 18);
      const newuser = await users.create({
        name,
        email,
        password: encryptPassword,
      });
      return NextResponse.json(
        { message: "User Registered Successfully ", data: newuser },
        { status: 201 },
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something Went Wrong!!", data: {} },
      { status: 500 },
    );
  }
}
