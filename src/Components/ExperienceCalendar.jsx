import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "react-day-picker/style.css";

function ExperienceCalendar({ onDateSelect }) {
 const today = new Date();
today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // This weekend
  const friday = new Date(today);
  const currentDay = today.getDay();

  const daysUntilFriday = (5 - currentDay + 7) % 7;

  friday.setDate(today.getDate() + daysUntilFriday);

  const sunday = new Date(friday);
  sunday.setDate(friday.getDate() + 2);

  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleDateSelect = (date) => {
    if (!date) return;

    setSelectedDate(date);

    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return (
   <div className="flex h-full w-full overflow-hidden rounded-[32px] bg-white">
      {/* ================= LEFT QUICK OPTIONS ================= */}
  <div className="h-full w-[300px] shrink-0 overflow-hidden px-[38px] pt-[42px]">
        {/* TODAY */}

        <button
          onClick={() => handleDateSelect(today)}
          className={`
            mb-[18px]
            flex
            h-[100px]
            w-[177px]
            flex-col
            justify-center
            rounded-[16px]
            border
            bg-white
            px-[20px]
            text-left
            transition
            ${
              selectedDate &&
              selectedDate.toDateString() === today.toDateString()
                ? "border-black"
                : "border-[#dddddd] hover:border-black"
            }
          `}
        >
          <span className="text-[20px] font-semibold leading-[30px] text-[#222222]">
            Today
          </span>

          <span className="mt-[5px] text-[15px] leading-[24px] text-[#717171]">
            {formatDate(today)}
          </span>
        </button>


        {/* TOMORROW */}

        <button
          onClick={() => handleDateSelect(tomorrow)}
          className={`
            mb-[18px]
            flex
            h-[100px]
            w-[177px]
            flex-col
            justify-center
            rounded-[16px]
            border
            bg-white
            px-[24px]
            text-left
            transition
            ${
              selectedDate &&
              selectedDate.toDateString() === tomorrow.toDateString()
                ? "border-black"
                : "border-[#dddddd] hover:border-black"
            }
          `}
        >
          <span className="text-[20px] font-semibold leading-[30px] text-[#222222]">
            Tomorrow
          </span>

          <span className="mt-[5px] text-[15px] leading-[24px] text-[#717171]">
            {formatDate(tomorrow)}
          </span>
        </button>


        {/* THIS WEEKEND */}

        <button
          onClick={() => handleDateSelect(friday)}
          className="
            flex
             h-[100px]
            w-[177px]
            flex-col
            justify-center
            rounded-[16px]
            border
            border-[#dddddd]
            bg-white
            px-[24px]
            text-left
            transition
            hover:border-black
          "
        >
          <span className="text-[20px] font-semibold leading-[30px] text-[#222222]">
            This weekend
          </span>

          <span className="mt-[5px] text-[15px] leading-[24px] text-[#717171]">
            {formatDate(friday)} – {sunday.getDate()}
          </span>
        </button>

      </div>


      {/* ================= RIGHT CALENDAR ================= */}

     <div className="relative flex flex-1 justify-center overflow-hidden px-[10px] pt-[45px]">

        <DayPicker
  mode="single"

  selected={selectedDate}

  onSelect={handleDateSelect}

  defaultMonth={today}

  startMonth={today}

  disabled={{
    before: today,
  }}

  showOutsideDays={false}

       components={{
  Chevron: ({ orientation }) =>
    orientation === "left" ? (
      <FiChevronLeft
        size={25}
        strokeWidth={1.8}
      />
    ) : (
      <FiChevronRight
        size={25}
        strokeWidth={1.8}
      />
    ),
}}

          classNames={{

            /* CALENDAR ROOT */

           root: " relative w-[570px] max-w-full",

            months: "w-full",

            month: "w-full",


            /* ================= HEADER ================= */
month_caption:
  "relative flex h-[45px] w-full items-center justify-center -translate-y-[15px]",

            caption_label:
              "text-[24px] font-semibold text-[#222222]",


            /* ================= ARROWS ================= */
nav:
  "absolute left-[20px] right-[20px] -top-[10px] z-10 flex items-center justify-between",
button_previous:
  "flex h-[40px] w-[40px] items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f5f5f5] disabled:!text-[#d0d0d0] disabled:opacity-50 disabled:cursor-not-allowed",

button_next:
  "flex h-[40px] w-[40px] items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f5f5f5] disabled:cursor-not-allowed",


            /* ================= CALENDAR TABLE ================= */

                      month_grid:   "w-full border-collapse -translate-x-[23px]",

            weekdays:
              "w-full",

           weekday:
  "h-[38px] text-center text-[14px] font-medium text-[#717171]",

            week:
              "w-full",


            /* ================= DATES ================= */

          day:
  "h-[52px] w-[58px] p-0 text-center",

            day_button:
  "mx-auto flex h-[42px] w-[42px] items-center justify-center rounded-full text-[16px] font-normal text-[#222222] transition hover:bg-[#f5f5f5]",


            /* SELECTED */

            selected:
              "bg-[#222222] text-white",

            selected_day:
              "bg-[#222222] text-white",


            /* TODAY */

            today:
              "font-semibold text-[#222222]",


            /* DISABLED */

            disabled:
              "text-[#d0d0d0]",
          }}
        />

      </div>

    </div>
  );
}

export default ExperienceCalendar;