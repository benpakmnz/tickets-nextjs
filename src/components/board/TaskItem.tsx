"use client";

import { useRouter } from "next/navigation";
import { ITaskAttrs } from "../../types";
import { Button } from "../ui/button";

const TaskItem = ({ task }: { task: ITaskAttrs }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/task/${task.id}`);
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="w-full justify-start text-left capitalize font-bold"
    >
      {task.title}
    </Button>
  );
};

export default TaskItem;
