import { Dialog, DialogContent } from "@/components/ui/dialog";
import TaskForm from "@/components/forms/TaskForm";
import { getTask } from "@/lib/task-service";

const TaskInfoModal = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { ticketId: string };
}) => {
  const task = params.id !== "new" ? await getTask(params.id) : undefined;
  console.log(searchParams);
  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[800px]">
        <TaskForm initialData={task} ticketId={searchParams.ticketId} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskInfoModal;
