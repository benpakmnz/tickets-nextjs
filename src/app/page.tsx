import Header from "@/components/Header";
import TicketsBoard from "@/components/board/TicketsBoard";

const Home = () => {
  return (
    <>
      <Header />
      <main className="items-center justify-between">
        <TicketsBoard />
      </main>
    </>
  );
};

export default Home;
