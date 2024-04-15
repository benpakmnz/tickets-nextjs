import { ITicketAttrs, statusValues } from "../../types";
import BoardHeader from "./BoardHeader";
import BoardSectionList from "./BoardSectionList";
import "./styles.css";

const TicketsBoard = ({ tickets }: { tickets: ITicketAttrs[] }) => {
  return (
    <>
      {tickets.length && (
        <div>
          <BoardHeader />

          {tickets.map((ticket: ITicketAttrs) => (
            <BoardSectionList ticket={ticket} key={ticket.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default TicketsBoard;
