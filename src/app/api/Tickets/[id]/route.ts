"use server";

import { NextResponse, NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/app/_helper/config/db";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  try {
    const ticket = await db.Tickets.findById(route.params.id);
    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, route: { params: { id: string } }) {
  try {
    const body = await req.json();
    const ticketData = body;
    const updatedTicket = await db.Tickets.findByIdAndUpdate(
      route.params.id,
      ticketData
    );

    if (!updatedTicket) {
      NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }
    revalidateTag("collection");

    return NextResponse.json(
      { message: "Ticket as been updated", updatedTicket },
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
    const ticketId = route.params.id;
    const deletedTicket = await db.Tickets.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }
    revalidateTag("collection");
    return NextResponse.json(
      { message: "Ticket has been deleted" },
      { status: 204 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
