"use server";

import { db } from "@/lib/db/config/db";
import { updateParentTicketStatus } from "@/lib/db/dbUtils/ticketUtils";
import { TaskStatus } from "@/types";
import { revalidateTag } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

interface PatchRequestBody {
  status: TaskStatus;
}

export async function PATCH(
  req: NextRequest,
  route: { params: { id: string } }
) {
  try {
    const body = (await req.json()) as PatchRequestBody;
    if (!body.status) {
      return NextResponse.json(
        { message: "Missing status in request body" },
        { status: 400 }
      );
    }
    const validStatusValues: TaskStatus[] = [
      "backlog",
      "todo",
      "in progress",
      "done",
    ];

    if (!Object.values(validStatusValues).includes(body.status)) {
      return NextResponse.json(
        { message: `Invalid status: ${body.status}` },
        { status: 400 }
      );
    }

    const updatedTask = await db.Tasks.findById(route.params.id);

    if (!updatedTask) {
      NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    updatedTask.status = body.status;
    await updatedTask.save();

    await updateParentTicketStatus(updatedTask);

    revalidateTag("collection");
    return NextResponse.json(
      { message: "Task status as been updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
