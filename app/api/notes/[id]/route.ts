import { NextRequest, NextResponse } from "next/server";
import notes from "@/models/noteModel";
import { connectDB } from "@/library/mongodb";
// GET: view note
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const noteDetails = await notes.findById({ _id: id });
    return NextResponse.json(noteDetails, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Something Went Wrong!!", { status: 500 });
  }
}

// PUT: update note
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const reqBody = await req.json();
    const updateNoteDetails = await notes.findByIdAndUpdate(
      { _id: id },
      reqBody,
      { new: true },
    );
    return NextResponse.json(updateNoteDetails, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Something Went Wrong!!", { status: 500 });
  }
}
// DELETE : delete note
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const deleteNoteDetails = await notes.findByIdAndDelete(id);

    if (!deleteNoteDetails) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Note deleted successfully",
        deletedNote: deleteNoteDetails,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Something Went Wrong!!" },
      { status: 500 },
    );
  }
}
