import { ITaskAttrs, TaskStatus } from "@/types";

export const getTasksByStatus = (tasks: ITaskAttrs[], status: TaskStatus) => {
  return tasks?.filter((task) => task.status === status);
};

export const getTaskById = (tasks: ITaskAttrs[], id: string) => {
  return tasks?.find((task) => task.id === id);
};
