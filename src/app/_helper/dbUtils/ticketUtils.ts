import { db } from "../config/db";

export async function updateParentTicketStatus(updatedTask: any) {
  const parentTicket = await db.Tickets.findById(updatedTask.ticketId).populate(
    [{ path: "tasks", model: "Tasks" }]
  );

  if (!parentTicket) {
    throw new Error("Parent ticket not found");
  }

  const isAllTasksDone = parentTicket.tasks.every(
    (task: any) => task.status === "done"
  );

  parentTicket.status = isAllTasksDone ? "done" : "new";
  await parentTicket.save();

  // Return the updated parent ticket
  return parentTicket;
}
