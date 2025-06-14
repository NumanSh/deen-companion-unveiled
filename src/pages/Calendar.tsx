
import React from "react";
import BottomTabBar from "@/components/BottomTabBar";
import IslamicCalendar from "@/components/IslamicCalendar";

const Calendar = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">Islamic Calendar</h1>
          <IslamicCalendar />
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default Calendar;
