import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import TaskForm from "@/components/forms/TaskForm";
import { getTask } from "@/lib/task-service";

const TaskInfoPage = async ({ params }: { params: { id: string } }) => {
  const task = params.id !== "new" ? await getTask(params.id) : undefined;
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="p-6 border-gray-700 lg:w-[800px]">
        <CardContent>
          <TaskForm initialData={task} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskInfoPage;
