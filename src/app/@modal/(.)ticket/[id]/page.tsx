import { Dialog, DialogContent } from "@/components/ui/dialog";
import TicketForm from "@/components/forms/TicketForm";
import { getTicket } from "@/lib/ticket-service";

const TicketInfoModal = async ({ params }: { params: { id: string } }) => {
  const ticket = params.id !== "new" ? await getTicket(params.id) : undefined;
  console.log(ticket);

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[800px]">
        <TicketForm initialData={ticket} />
      </DialogContent>
    </Dialog>
  );
};

export default TicketInfoModal;
