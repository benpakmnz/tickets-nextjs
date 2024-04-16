import Header from "@/components/Header";
import TicketsBoard from "@/components/board/TicketsBoard";
import { Suspense } from "react";

const Home = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <main className="items-center justify-between">
          <TicketsBoard />
        </main>
      </Suspense>
    </>
  );
};

export default Home;
