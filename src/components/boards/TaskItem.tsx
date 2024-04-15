"use client";

import { useRouter } from "next/navigation";
import { ITaskAttrs } from "../../types";
import { Card, CardHeader, CardTitle } from "../ui/card";

const TaskItem = ({ task }: { task: ITaskAttrs }) => {
  const router = useRouter();

  const handleClick = () => {
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
