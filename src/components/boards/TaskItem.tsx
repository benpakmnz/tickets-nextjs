"use client";

import { useRouter } from "next/navigation";
import { ITask } from "../../types";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface ITaskItemProps {
  task: ITask;
}

const TaskItem = ({ task }: ITaskItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    console.log(task.id);
    router.push(`/task/${task.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TaskItem;
