import { connectToDatabase } from "@/lib/database";
import { NextResponse } from "next/server";
import Notes from "@/lib/models/models.note";
import mongoose from "mongoose";

// get a single note
export const GET = async (
  request: Request,
  { params }: { params: { note_id: string } }
) => {
  const { note_id } = params;

  if (!mongoose.Types.ObjectId.isValid(note_id)) {
    return NextResponse.json({ message: "Invalid note ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const note = await Notes.findById(note_id);

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("something unexpected happened", { status: 500 });
  }
};

// delete a note
export const DELETE = async (
  request: Request,
  { params }: { params: { note_id: string } }
) => {
  const { note_id } = params;

  if (!mongoose.Types.ObjectId.isValid(note_id)) {
    return NextResponse.json({ message: "Invalid note ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const note = await Notes.findByIdAndDelete(note_id);

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json("something unexpected happened", { status: 500 });
  }
};

// update a note
export const PATCH = async (
  request: Request,
  { params }: { params: { note_id: string } }
) => {
  const { note_id } = params;

  if (!mongoose.Types.ObjectId.isValid(note_id)) {
    return NextResponse.json({ message: "Invalid note ID" }, { status: 400 });
  }

  const { title, tag, description } = await request.json();

  try {
    await connectToDatabase();
    const updatedNote = await Notes.findByIdAndUpdate(
      note_id,
      { title, tag, description },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json("Something unexpected happened", { status: 500 });
  }
};
