export const getTicket = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch ticket");
    }
    return res.json();
  } catch (error) {
    console.error("Failed to get tickets", error);
    throw error;
  }
};

export const getTickets = async (from: string, to: string) => {
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
