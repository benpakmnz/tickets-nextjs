export type TaskStatus = "backlog" | "in progress" | "done";
export type TicketStatus = "new" | "approved" | "committed" | "done";

export interface ITicket {
  id?: string;
  title: string;
  description: string;
  owner: string;
  dueDate: string;
  status: TicketStatus;
  priority: number;
  tasks: ITask[];
  category: string;
}

export interface ITask {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  owner: string;
}

export interface BoardSections {
  [name: string]: ITask[];
}
