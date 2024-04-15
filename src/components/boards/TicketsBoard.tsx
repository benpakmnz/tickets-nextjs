import { useRouter } from "next/router";
import { ITicketAttrs, statusValues } from "../../types";
import { Button } from "../ui/button";
import BoardHeader from "./BoardHeader";
import BoardSectionList from "./BoardSectionList";
import "./styles.css";
import Link from "next/link";

const TicketsBoard = ({ tickets }: { tickets: ITicketAttrs[] }) => {
  return (
    <>
      {tickets?.length ? (
        <div>
          <BoardHeader />

          {tickets.map((ticket: ITicketAttrs) => (
            <BoardSectionList ticket={ticket} key={ticket.id} />
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
