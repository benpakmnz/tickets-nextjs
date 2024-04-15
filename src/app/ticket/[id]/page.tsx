import TicketForm from "@/components/forms/TicketForm";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { getTicket } from "@/lib/ticket-service";

const TicketInfoPage = async ({ params }: { params: { id: string } }) => {
  const ticket = params.id !== "new" ? await getTicket(params.id) : undefined;
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="p-6 border-gray-700 lg:w-[800px]">
        <CardContent>
          <TicketForm initialData={ticket} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketInfoPage;
