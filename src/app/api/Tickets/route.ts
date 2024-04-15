"use server";

import { NextResponse, NextRequest } from "next/server";
import { addDays, startOfWeek } from "date-fns";
import { revalidateTag } from "next/cache";
import { db } from "@/app/_helper/config/db";

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
  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
  const endOfThisWeek = addDays(startOfThisWeek, 4);
  const fromDateString = startOfThisWeek.toISOString().split("T")[0];
  const toDateString = endOfThisWeek.toISOString().split("T")[0];

  const startDate = searchParams.get("from") || fromDateString;
  const endDate = searchParams.get("to") || toDateString;
  try {
    const tickets = await db.Tickets.find({
      dueDate: { $gte: startDate, $lt: endDate },
    }).populate([{ path: "tasks", model: "Tasks" }]);
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
