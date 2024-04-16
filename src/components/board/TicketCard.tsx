"use client";

import { useRouter } from "next/navigation";
import { ITicketAttrs } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CheckCircleIcon } from "lucide-react";

const TicketCard = ({ ticket }: { ticket: ITicketAttrs }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/ticket/${ticket.id}`);
  };

  console.log(ticket);
  const ticketColor = ticket.category === "bug" ? "bg-rose-100" : "bg-sky-50";

  return (
    <Button asChild variant="ghost" onClick={handleClick}>
      <Card
        className={`relative align-start h-full w-full p-3 rounded-xl border shadow cursor-pointer ${ticketColor}`}
      >
        {ticket.status === "done" && (
          <CheckCircleIcon className="absolute right-5 top-5" />
        )}
        <CardHeader>
          <CardTitle>{ticket.title}</CardTitle>
          <CardContent className="p-0">
            <p className="text-sm font-semibold">
              Owner:
              <span className=" font-medium">{ticket.owner}</span>
            </p>
            <p className="text-sm font-semibold">
              Status:
              <span className="font-medium">{ticket.status}</span>
            </p>
            <p className="text-sm font-semibold">
              Due-date:
              <span className="font-medium ">
                {format(ticket.dueDate, "LLL dd, y")}
              </span>
            </p>
          </CardContent>
        </CardHeader>
      </Card>
    </Button>
  );
};

export default TicketCard;
