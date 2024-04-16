"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import TaskForm from "@/components/forms/TaskForm";
import { getTask } from "@/lib/task-service";
import { useRouter } from "next/navigation";

const TaskInfoModal = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { ticketId: string };
}) => {
  const router = useRouter();
  const task = params.id !== "new" ? await getTask(params.id) : undefined;

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="sm:max-w-[800px]">
        <TaskForm initialData={task} ticketId={searchParams.ticketId} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskInfoModal;
