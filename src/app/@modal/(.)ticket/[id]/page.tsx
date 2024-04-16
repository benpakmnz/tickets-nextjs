"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TicketForm from "@/components/forms/TicketForm";
import { getTicket } from "@/lib/ticket-service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ITicketAttrs } from "@/types";

const TicketInfoModal = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [ticket, setTicket] = useState<ITicketAttrs>();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      const data = await getTicket(params.id);
      data.id && setTicket(data);
    };

    params.id !== "new" && fetchTicket();
  }, [params]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="sm:max-w-[800px]">
        <TicketForm
          initialData={ticket}
          onClose={() => {
            router.back();
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TicketInfoModal;
