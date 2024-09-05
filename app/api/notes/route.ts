import { connectToDatabase } from "@/lib/database";
import { NextResponse } from "next/server";
import Notes from "@/lib/models/models.note";

// create a new note
export const POST = async (request: Request) => {
  const { title, tag, description } = await request.json();
  try {
    await connectToDatabase();
    const notes = await Notes.create({
      title,
      tag,
      description,
    });
    return NextResponse.json(notes, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("something unexpected happened", { status: 500 });
  }
};

// get all notes
export const GET = async () => {
  try {
    await connectToDatabase();
    const notes = await Notes.find({}).sort({ createdAt: -1 });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("something unexpected happened", { status: 500 });
  }
};
