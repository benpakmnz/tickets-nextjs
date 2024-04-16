import { db } from "@/lib/db/config/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const newTask = new db.Tasks(body);
    const savedTask = await newTask.save();
    const ticket = await db.Tickets.findByIdAndUpdate(
      body.ticketId,
      {
        $push: { tasks: savedTask.id },
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Task Created", ticket },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const tasks = await db.Tasks.find({});
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
