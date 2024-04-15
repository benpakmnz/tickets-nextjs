import { db } from "@/lib/db/config/db";
import { TicketStatus } from "@/types";
import { NextResponse, NextRequest } from "next/server";

interface PatchRequestBody {
  status: TicketStatus;
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
    const validStatusValues: TicketStatus[] = [
      "approved",
      "committed",
      "done",
      "new",
    ];

    if (!Object.values(validStatusValues).includes(body.status)) {
      return NextResponse.json(
        { message: `Invalid status: ${body.status}` },
        { status: 400 }
      );
    }
    const id = route.params.id;
    const ticket = await db.Tickets.findById(id);

    if (!ticket) {
      NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }
    ticket.status = body.status;
    await ticket.save();

    return NextResponse.json(
      { message: "Ticket status as been updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
