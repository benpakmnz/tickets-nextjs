"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { addDays, startOfWeek, format } from "date-fns";
import DatePickerWithRange from "./DateRangePicker";
import { Button } from "./ui/button";
import { useCallback } from "react";

const Header = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleDatesFromQuery = (): DateRange => {
    const today = new Date();
    const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
    const endOfThisWeek = addDays(startOfThisWeek, 4);
    const fromDateString = startOfThisWeek.toISOString().split("T")[0];
    const toDateString = endOfThisWeek.toISOString().split("T")[0];

    const from = new Date(searchParams.get("from") || fromDateString);
    const to = new Date(searchParams.get("to") || toDateString);

    return { from, to };
  };

  const handleSelection = useCallback(
    (dates: any) => {
      if (dates?.from && dates?.to) {
        const from = format(dates.from, "yyyy-MM-dd");
        const to = format(dates.to, "yyyy-MM-dd");
        const updatedParams = new URLSearchParams();
        updatedParams.set("from", from);
        updatedParams.set("to", to);
        const pathname = window.location.pathname;
        const updatedURL = `${pathname}?${updatedParams.toString()}`;

        router.replace(updatedURL);
      }
    },
    [router]
  );

  return (
    <header className="flex items-center space-y-2">
      <h2 className="text-3xl font-bold tracking-tight mr-5">Tasks Manager</h2>
      <div className="flex items-center space-x-2">
        <DatePickerWithRange
          label="Date range:"
          dates={handleDatesFromQuery()}
          handleSelection={handleSelection}
        />
        <Button
          variant="outline"
          className="w-24"
          onClick={() => router.push(`/ticket/new`)}
        >
          Add New +
        </Button>
      </div>
    </header>
  );
};

export default Header;
