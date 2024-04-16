import { addDays, startOfWeek } from "date-fns";
import { BASE_URI } from "../../constants";

export const getTicket = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URI}/Tickets/${id}`, {
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

export const getTickets = async (range?: { from: string; to: string }) => {
  const queryParams = range ? `?from=${range.from}&to=${range.to}` : "";
  const path = `${BASE_URI}/Tickets${queryParams}`;
  try {
    const res = await fetch(path, { cache: "no-store" });
    const tickets = res.json();
    return tickets;
  } catch (error) {
    console.error("Failed to get tickets", error);
    throw error;
  }
};

export const getDateRanges = (searchParams: URLSearchParams) => {
  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
  const endOfThisWeek = addDays(startOfThisWeek, 4);
  const fromDateString = startOfThisWeek.toISOString().split("T")[0];
  const toDateString = endOfThisWeek.toISOString().split("T")[0];

  const startDate = searchParams.get("from") || fromDateString;
  const endDate = searchParams.get("to") || toDateString;

  return { $gte: startDate, $lt: endDate };
};
