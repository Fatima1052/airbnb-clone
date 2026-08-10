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

    <h2 className="mb-4 text-center text-[20px] font-semibold">
  How long would you like to stay?
</h2>

<div className="mb-16 flex justify-center gap-2">

  <button
    onClick={() => {
      setFlexibleDuration("Weekend");
      setSelectedOption("Exact dates");
    }}
    className={`rounded-full border px-4 py-3 transition ${
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
    className={`rounded-full border px-4 py-3 transition ${
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
    className={`rounded-full border px-4 py-3 transition ${
      flexibleDuration === "Month"
        ? "border-black bg-[#f7f7f7]"
        : "border-[#dddddd] bg-white hover:border-black"
    }`}
  >
    Month
  </button>

</div>

    <h2 className="mb-6 text-center text-[20px] font-semibold">
      Go anytime
    </h2>

    <div className="relative mt-5">

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
w-[294px]
h-[122px]
rounded-[20px]
border
border-[#DDDDDD]
bg-white
flex
flex-col
items-center
justify-center
transition-all
  duration-200
    ${
     selectedMonths.includes(`${item.month} ${item.year}`)
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
<button
  onClick={previousMonths}
  className="
  absolute
  left-[-6]
  top-1/2
  -translate-y-1/2
  w-[26px]
  h-[26px]
  rounded-full
  border
  bg-white
  shadow-md
  "
>
  <FiChevronLeft />
</button>
  <button
    onClick={nextMonths}
    className="
    absolute
    right-0
    top-1/2
    -translate-y-1/2
    w-[26px]
    h-[26px]
    rounded-full
    border
    bg-white
    shadow-md
    "
  >
    <FiChevronRight />
  </button>

</div>

    

  </div>
)}
    </LocalizationProvider>
  );
}

export default Calendar;