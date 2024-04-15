import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";
import SortableTaskItem from "./SortableTaskItem";
import Link from "next/link";
import { Button } from "../ui/button";
import { IBoardSectionAttrs } from "@/types";

const BoardSection = ({ id, tasks, title, ticketId }: IBoardSectionAttrs) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div className="min-h-32">
      <h6 className="font-semibold leading-none tracking-tight">{title}</h6>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {tasks.map((task) => {
            return (
              <div key={task.id} className="my-3">
                <SortableTaskItem id={task.id}>
                  <TaskItem task={task} />
                </SortableTaskItem>
              </div>
            );
          })}
          {id === "backlog" && (
            <Button asChild variant="outline" className="h-6 px-1 mt-0">
              <Link
                href={{
                  pathname: "/task/new",
                  query: {
                    ticketId: ticketId,
                  },
                }}
              >
                + Create
              </Link>
            </Button>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSection;
