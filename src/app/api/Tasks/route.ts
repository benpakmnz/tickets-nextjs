"use server";

import { db } from "@/app/_helper/config/db";
import { revalidateTag } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    const newTask = new db.Tasks(body);
    const savedTask = await newTask.save();

    await db.Tickets.findByIdAndUpdate(body.ticketId, {
      $push: { tasks: savedTask.id },
    });

    revalidateTag("collection");
    return NextResponse.json(
      { message: "Task Created", newTask },
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
