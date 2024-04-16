"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import { ITicketAttrs } from "../../types";
import { Button } from "../ui/button";
import BoardHeader from "./BoardHeader";
import BoardSectionList from "./BoardSectionList";
import "./styles.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTickets } from "@/lib/ticket-service";

const TicketsBoard = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tickets, setTickets] = useState<ITicketAttrs[]>([]);

  const fetchTickets = async () => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let range;
    if (from && to) {
      range = { from, to };
    }

    const data = await getTickets(range);
    data && setTickets(data);
  };

  useEffect(() => {
    if (pathname === "/") {
      fetchTickets();
    }
  }, [pathname, searchParams]);

  return (
    <>
      {tickets?.length ? (
        <div>
          <BoardHeader />

          {tickets.map((ticket: ITicketAttrs) => (
            <BoardSectionList
              ticket={ticket}
              key={ticket.id}
              refresh={fetchTickets}
            />
          ))}
        </div>
      ) : (
        <div className="w-full items-center flex flex-col space-y-4 capitalize mt-10">
          <h2 className="text-2xl font-semibold ">No tickets has been found</h2>
          <div className="shadow-md p-4 text-center space-y-4">
            <p>please add one or change the selected due date range</p>
            <Button variant="default" className="w-24" asChild>
              <Link href="/ticket/new">Add New +</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketsBoard;
