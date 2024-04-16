import { Schema } from "mongoose";

export type TaskStatus = "backlog" | "todo" | "in progress" | "done";
export type TicketStatus = "new" | "approved" | "committed" | "done";
export type TicketCategory = "ticket" | "bug";

export interface ITicketAttrs {
  id?: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: number;
  status: TicketStatus;
  owner: string;
  dueDate: string;
  tasks: Schema.Types.ObjectId[];
}

export interface ITaskAttrs {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: TaskStatus;
  ticketId?: Schema.Types.ObjectId;
}

export type BoardSections = {
  [name: string]: ITaskAttrs[];
};

export interface IBoardSectionAttrs {
  id: string;
  title: string;
  tasks: ITaskAttrs[];
  ticketId: string;
}

export const tasksStatusValues: TaskStatus[] = [
  "backlog",
  "todo",
  "in progress",
  "done",
];

export const ticketStatusOptions: TicketStatus[] = [
  "approved",
  "committed",
  "done",
  "new",
];
