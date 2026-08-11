import { FiCalendar } from "react-icons/fi";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
function Calendar({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  calendarTab,
  setCalendarTab,
  selectedOption,
  setSelectedOption,
  flexibleDuration,
  setFlexibleDuration,
  selectedMonths,
setSelectedMonths,
handleFlexibleMonth,
}) {

  const months = [
  { month: "August", year: "2026" },
  { month: "September", year: "2026" },
  { month: "October", year: "2026" },
  { month: "November", year: "2026" },
  { month: "December", year: "2026" },
  { month: "January", year: "2027" },
  { month: "February", year: "2027" },
  { month: "March", year: "2027" },
  { month: "April", year: "2027" },
];

const [startIndex, setStartIndex] = useState(0);




const nextMonths = () => {
  if (startIndex < months.length - 6) {
    setStartIndex(startIndex + 1);
  }
};

const previousMonths = () => {
  if (startIndex > 0) {
    setStartIndex(startIndex - 1);
  }
};


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     <div className="calendar-tabs">
<button
  onClick={() => {
    setCalendarTab("dates");
  }}
  className={calendarTab === "dates" ? "active-tab" : ""}
>
  Dates
</button>

<button
  onClick={() => setCalendarTab("flexible")}
  className={calendarTab === "flexible" ? "active-tab" : ""}
>
  Flexible
</button>
</div>
    {calendarTab === "dates" && (
  <DateRangeCalendar
    disablePast
    value={[startDate, endDate]}
    onChange={(newValue) => {
      setStartDate(newValue[0]);
      setEndDate(newValue[1]);
    }}
  />
)}

{calendarTab === "flexible" && (
  <div className="p-5">

    <h2 className="mb-4 text-center text-[18px] sm:text-[20px] font-semibold">
  How long would you like to stay?
</h2>

<div className="mb-16 flex justify-center gap-2">

  <button
    onClick={() => {
      setFlexibleDuration("Weekend");
      setSelectedOption("Exact dates");
    }}
   className={`rounded-full border px-3 py-2 text-sm transition sm:px-4 sm:py-3 sm:text-base ${
      flexibleDuration === "Weekend"
        ? "border-black bg-[#f7f7f7]"
        : "border-[#dddddd] bg-white hover:border-black"
    }`}
  >
    Weekend
  </button>

  <button
    onClick={() => {
      setFlexibleDuration("Week");
      setSelectedOption("Exact dates");
    }}
  className={`rounded-full border px-3 py-2 text-sm transition sm:px-4 sm:py-3 sm:text-base ${
      flexibleDuration === "Week"
        ? "border-black bg-[#f7f7f7]"
        : "border-[#dddddd] bg-white hover:border-black"
    }`}
  >
    Week
  </button>

  <button
    onClick={() => {
      setFlexibleDuration("Month");
      setSelectedOption("Exact dates");
    }}
  className={`rounded-full border px-3 py-2 text-sm transition sm:px-4 sm:py-3 sm:text-base ${
      flexibleDuration === "Month"
        ? "border-black bg-[#f7f7f7]"
        : "border-[#dddddd] bg-white hover:border-black"
    }`}
  >
    Month
  </button>

</div>

   <h2 className="mb-2 text-center text-[18px] sm:text-[20px] font-semibold">
  Go anytime
</h2>



<div className="relative mt-5 px-3">

  {/* MONTH CARDS */}
  <div className="flex gap-4 overflow-hidden">

    {months
      .slice(startIndex, startIndex + 6)
      .map((item, index) => (
        <div
          key={index}
          onClick={() => {
            handleFlexibleMonth(`${item.month} ${item.year}`);
          }}
          className={`
            w-[112px]
            h-[122px]
            shrink-0
            rounded-[20px]
            border
            bg-white
            flex
            flex-col
            items-center
            justify-center
            cursor-pointer
            transition-all
            duration-200
            ${
              selectedMonths.includes(
                `${item.month} ${item.year}`
              )
                ? "border-black shadow-sm"
                : "border-[#DDDDDD] hover:border-black hover:shadow-sm"
            }
          `}
        >

          <FiCalendar className="text-[31px] text-[#717171]" />

          <h3 className="mt-5 text-[16px] font-medium">
            {item.month}
          </h3>

          <p className="text-[14px] text-[#717171]">
            {item.year}
          </p>

        </div>
      ))}
  </div>


  {/* LEFT BUTTON */}
  {startIndex > 0 && (
    <button
      onClick={previousMonths}
      className="
        absolute
        left-[-2px]
        top-1/2
        -translate-y-1/2
        z-10
        flex
        h-[32px]
        w-[32px]
        items-center
        justify-center
        rounded-full
        border
        border-[#DDDDDD]
        bg-white
        shadow-[0_2px_8px_rgba(0,0,0,0.15)]
        hover:shadow-[0_3px_10px_rgba(0,0,0,0.20)]
        transition
      "
    >
      <FiChevronLeft className="text-[18px] text-[#222222]" />
    </button>
  )}


  {/* RIGHT BUTTON */}
  {startIndex < months.length - 6 && (
    <button
      onClick={nextMonths}
      className="
        absolute
        right-[-2px]
        top-1/2
        -translate-y-1/2
        z-10
        flex
        h-[32px]
        w-[32px]
        items-center
        justify-center
        rounded-full
        border
        border-[#DDDDDD]
        bg-white
        shadow-[0_2px_8px_rgba(0,0,0,0.15)]
        hover:shadow-[0_3px_10px_rgba(0,0,0,0.20)]
        transition
      "
    >
      <FiChevronRight className="text-[18px] text-[#222222]" />
    </button>
  )}

</div>










    

  </div>
)}
    </LocalizationProvider>
  );
}

export default Calendar;