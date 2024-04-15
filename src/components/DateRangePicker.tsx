"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";

interface IDateRangePickerAttrs {
  className?: React.HTMLAttributes<HTMLDivElement>;
  label?: string;
  dates?: DateRange;
  handleSelection: (dates: DateRange | undefined) => void;
}

const DatePickerWithRange: React.FC<IDateRangePickerAttrs> = ({
  className,
  label,
  dates,
  handleSelection,
}) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: dates?.from || new Date(2022, 0, 20),
    to: dates?.to || addDays(new Date(2022, 0, 20), 20),
  });

  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const submitSelection = () => {
    handleSelection(selectedDate);
    setDate(selectedDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={() => setSelectedDate(date)}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {label && <div className="mr-2">{label}</div>}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selectedDate?.from}
            selected={selectedDate}
            onSelect={setSelectedDate}
            numberOfMonths={2}
          />
          <PopoverClose asChild>
            <Button
              disabled={!selectedDate}
              variant="outline"
              onClick={submitSelection}
            >
              Select
            </Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithRange;
