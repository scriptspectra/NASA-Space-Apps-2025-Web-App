"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar-custom.css"; // we'll create this below

export default function EventsCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="flex justify-center p-4">
      <div 
            className="rounded-md bg-[#1e1e1e] p-4 shadow-md"
            style={{ transform: "scale(0.75)", transformOrigin: "top center" }}
      >
        <Calendar
         // onChange={setValue}
          value={value}
          calendarType="gregory"
          prev2Label={null}
          next2Label={null}
          className="custom-calendar"
        />
      </div>
    </div>
  );
}
