"use client";

import React, { useEffect, useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { BoardSections as BoardSectionsType, ITicket } from "../../types";
import BoardSection from "./BoardSection";
import TaskItem from "./TaskItem";
import { findBoardSectionContainer, initializeBoard } from "@/lib/board";
import { getTaskById } from "@/lib/tasks";
import { useRouter } from "next/navigation";
import { updateTaskStatus } from "@/lib/task-service";

const BoardSectionList = ({ ticket }: { ticket: ITicket }) => {
  const router = useRouter();
  const [boardSections, setBoardSections] = useState<BoardSectionsType>(
    initializeBoard(ticket.tasks || [])
  );

  useEffect(() => {
    const initialBoardSections = initializeBoard(ticket.tasks || []);
    setBoardSections(initialBoardSections);
    console.log(ticket.status);
  }, [ticket]);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 20,
    },
  });

  const sensors = useSensors(
    pointerSensor,
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
    if (over) {
      await updateTaskStatus(active.id.toString(), overContainer);
      router.refresh();
    }
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(ticket.tasks, activeTaskId) : null;
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="rounded-lg p-8 flex">
        <div
          className="w-1/4 h-500 p-4 rounded-xl border bg-card text-card-foreground shadow mr-6"
          onClick={() => router.push(`/ticket/${ticket.id}`)}
        >
          <div>{ticket.title}</div>
          <div>{ticket.owner}</div>
          <div>{ticket.status}</div>
          <div>{ticket.dueDate}</div>
        </div>
        {Object.keys(boardSections).map((boardSectionKey) => (
          <div
            key={boardSectionKey}
            className="w-1/4 h-500 p-4 rounded-xl border bg-card text-card-foreground shadow mr-6"
          >
            <BoardSection
              id={boardSectionKey}
              ticketId={ticket.id!}
              title={boardSectionKey}
              tasks={boardSections[boardSectionKey]}
            />
          </div>
        ))}

        <DragOverlay dropAnimation={dropAnimation}>
          {task ? <TaskItem task={task} /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default BoardSectionList;
