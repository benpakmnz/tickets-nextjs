"use server";

import { NextResponse, NextRequest } from "next/server";
import { addDays, startOfWeek } from "date-fns";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db/config/db";
import { getDateRanges } from "@/lib/ticket-service";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const ticketData = body;
    const ticket = await db.Tickets.create(ticketData);
    revalidateTag("collection");

    return NextResponse.json(
      { message: "Ticket Created", ticket },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const range = getDateRanges(searchParams);
  try {
    const tickets = await db.Tickets.find({
      dueDate: range,
    })
      .populate([{ path: "tasks", model: "Tasks" }])
      .sort({ dueDate: "asc" });
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
