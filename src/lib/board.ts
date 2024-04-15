import { BOARD_SECTIONS } from "../../constants";
import { BoardSections, ITaskAttrs, TaskStatus } from "../types";

import { getTasksByStatus } from "./tasks";

export const initializeBoard = (tasks: ITaskAttrs[]) => {
  const boardSections: BoardSections = {};

  Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(
      tasks,
      boardSectionKey as TaskStatus
    );
  });

  return boardSections;
};

export const findBoardSectionContainer = (
  boardSections: BoardSections,
  id: string
) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );
  return container;
};
