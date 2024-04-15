import BoardSectionList from "@/components/boards/BoardSectionList";
import Header from "@/components/Header";
import { ITicketAttrs } from "@/types";
import { addDays, startOfWeek } from "date-fns";

const getTickets = async (from: string, to: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/Tickets?from=${from}&to=${to}`,
      { cache: "no-store" }
    );
    const tickets = res.json();
    return tickets;
  } catch (error) {
    console.error("Failed to get tickets", error);
    throw error;
  }
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
  const endOfThisWeek = addDays(startOfThisWeek, 4);
  const fromDateString = startOfThisWeek.toISOString().split("T")[0];
  const toDateString = endOfThisWeek.toISOString().split("T")[0];

  const from = searchParams.from || fromDateString;
  const to = searchParams.to || toDateString;
  const tickets = await getTickets(from, to);
  return (
    <>
      <Header />
      <main className="items-center justify-between">
        {tickets &&
          tickets.map((ticket: ITicketAttrs) => (
            <BoardSectionList ticket={ticket} key={ticket.id} />
          ))}
      </main>
    </>
  );
}
