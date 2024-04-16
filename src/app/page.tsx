import TicketsBoard from "@/components/boards/TicketsBoard";
import Header from "@/components/Header";
import { getTickets } from "@/lib/ticket-service";
import { NextPage } from "next";

interface HomeProps {
  searchParams: {
    from?: string;
    to?: string;
  };
}

const Home: NextPage<HomeProps> = async ({ searchParams }) => {
  const { from, to } = searchParams;
  let range;
  if (from && to) {
    range = { from, to };
  }

  const tickets = await getTickets(range);
  return (
    <>
      <Header />
      <main className="items-center justify-between">
        <TicketsBoard tickets={tickets} />
      </main>
    </>
  );
};

export default Home;
