"use server";

import { db } from "@/app/_helper/config/db";
import { updateParentTicketStatus } from "@/app/_helper/dbUtils/ticketUtils";
import { revalidateTag } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  try {
    const task = await db.Tasks.findById(route.params.id);
    console.log(task);
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, route: { params: { id: string } }) {
  try {
    const body = await req.json();

    const updatedTask = await db.Tasks.findByIdAndUpdate(route.params.id, body);

    console.log(updatedTask);

    if (!updatedTask) {
      NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await updateParentTicketStatus(updatedTask);

    revalidateTag("collection");
    return NextResponse.json(
      { message: "Task as been updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  route: { params: { id: string } }
) {
  try {
    const deletedTask = await db.Tasks.findByIdAndDelete(route.params.id);

    if (!deletedTask) {
      NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    revalidateTag("collection");
    return NextResponse.json(
      { message: "Task as been deleted" },
      { status: 204 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
