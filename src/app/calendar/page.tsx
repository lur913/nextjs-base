"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <h1 className="py-4 uppercase font-bold">Calendar Page</h1>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
      />
    </div>
  );
}
