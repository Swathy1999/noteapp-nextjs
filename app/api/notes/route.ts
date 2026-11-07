import { connectDB } from "@/library/mongodb";
import notes from "@/models/noteModel";
import { NextRequest, NextResponse } from "next/server";

// POST: add note
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newNote = await notes.create(body);
    return NextResponse.json(newNote, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Something Went Wrong!!!", { status: 500 });
  }
}
// GET:get all notes
export async function GET(req:NextRequest) {
  try {
    await connectDB();
    const searchParams=req.nextUrl.searchParams
    const email=searchParams.get("email")
    const allNotes = await notes.find({userMail:email});
    return NextResponse.json(allNotes, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Something went Wrong!!!", { status: 500 });
  }
}
