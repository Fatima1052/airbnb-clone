import {
  setLocation,
  setStartDate,
  setEndDate,
} from "../redux/searchSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Calendar from "./Calender";
import WhereDropdown from "./WhereDropdown";
import ExperienceCalendar from "./ExperienceCalendar";
import MobileSearchSheet from "./MobileSearchSheet";
import { FiSliders } from "react-icons/fi";
import { 
  FiSearch, 
 
} from "react-icons/fi";




function SearchBar() {
   const location = useLocation();
const navigate = useNavigate();

const dispatch = useDispatch();

const guests = useSelector((state) => state.search);
const selectedDestination = useSelector(
  (state) => state.search.location
);


const startDate = useSelector(
  (state) => state.search.startDate
);

const endDate = useSelector(
  (state) => state.search.endDate
);

  const [calendarTab, setCalendarTab] = useState("dates");
const [selectedOption, setSelectedOption] = useState("Exact dates");
  const searchRef = useRef(null);
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActiveSection("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  const [activeSection, setActiveSection] = useState("");

const [hoveredSection, setHoveredSection] = useState("");
const [sheetOpen, setSheetOpen] = useState(false);











// Flexible mode
const [flexibleDuration, setFlexibleDuration] = useState("");
const [selectedMonths, setSelectedMonths] = useState([]);


const handleFlexibleMonth = (month) => {
  setSelectedMonths((prev) => {
    if (prev.includes(month)) {
      return prev.filter((item) => item !== month);
    }

    return [...prev, month];
  });
};


const increaseGuest = (type) => {
  const totalGuests =
    guests.adults + guests.children + guests.infants;

  if (type === "pets") {
    if (guests.pets >= 5) {
      return;
    }

    dispatch({
      type: "search/increasePets",
    });

    return;
  }

  if (totalGuests >= 16) {
    return;
  }

  dispatch({
    type: `search/increase${type.charAt(0).toUpperCase() + type.slice(1)}`,
  });
};





const decreaseGuest = (type) => {
  dispatch({
    type: `search/decrease${type.charAt(0).toUpperCase() + type.slice(1)}`,
  });
};




if (isMobile) {
  const totalGuests = guests.adults + guests.children + guests.infants;
  const mobileSummary = [
    selectedDestination ? selectedDestination.split(",")[0] : "Anywhere",
    startDate
      ? `${startDate.format("D MMM")}${
          endDate ? ` – ${endDate.format("D MMM")}` : ""
        }`
      : "Any week",
    totalGuests > 0
      ? `${totalGuests} guest${totalGuests === 1 ? "" : "s"}`
      : "Add guests",
  ].join(" • ");

  return (
    <div className="px-4 py-3">
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className="
        flex
        items-center
        justify-between
        w-full
        h-[56px]
        rounded-full
        border
        border-[#dddddd]
        bg-white
        px-5
        shadow-md
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <FiSearch size={18} className="shrink-0" />

          <div className="min-w-0 text-left">
            <h4 className="text-[14px] font-semibold">
              Where to?
            </h4>

            <p className="truncate text-[12px] text-[#717171]">
              {mobileSummary}
            </p>
          </div>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border">
          <FiSliders size={16} />
        </div>
      </button>

      {sheetOpen && (
        <MobileSearchSheet onClose={() => setSheetOpen(false)} />
      )}
    </div>
  );
}

  return (



    <div
  ref={searchRef}
  className={`
  relative
  mx-auto
  
  mt-2
  flex
h-[67px]
w-[94%]
sm:w-[92%]
md:w-[90%]
lg:w-[82%]
xl:w-[66%]
2xl:w-[70%]
  items-center
  rounded-full
  border
  border-[#dddddd]
 
shadow-[0_2px_8px_rgba(0,0,0,0.08)]
 ${activeSection ? "bg-[#EBEBEB]" : "bg-white"}
`}
>
      <div
      onMouseEnter={() => setHoveredSection("where")}
onMouseLeave={() => setHoveredSection("")}
 onClick={() => setActiveSection("where")}
       className={`flex h-full flex-1 min-w-0 cursor-pointer flex-col justify-center
pt-[14px]
pb-[14px] rounded-full px-3 sm:px-4 md:px-6 lg:px-[25px] transition-all
${
activeSection === "where"
  ? "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.18)] z-20"
  : "hover:bg-[#DDDDDD]"
}`}
       
      >
       <h4 className="m-0 text-[12px] sm:text-[13px]
font-semibold
leading-none font-semibold">
  Where
</h4>
       <p className="mt-[4px]
text-[13px]
sm:text-[14px]
md:text-[15px]
font-normal
text-[#6A6A6A]
leading-none">
       {selectedDestination ||
  (location.pathname === "/experiences"
    ? "Search by city or landmark"
    : "Search destinations")}
        </p>
      </div>

     <div
  className={`h-[35px] w-px transition-all duration-200 ${
    hoveredSection === "where" ||
    activeSection === "where" ||
    hoveredSection === "when" ||
    activeSection === "when"
      ? "bg-transparent"
      : "bg-[#dddddd]"
  }`}
/>

      <div
      onMouseEnter={() => setHoveredSection("when")}
onMouseLeave={() => setHoveredSection("")}
 onClick={() => setActiveSection("when")}
       className={`flex h-full flex-1 min-w-0 cursor-pointer flex-col justify-center rounded-full px-3 sm:px-4 md:px-6 lg:px-[25px] transition-all
${
activeSection === "when"
  ? "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.18)] z-20"
  : "hover:bg-[#DDDDDD]"
}`}
       
      >
       <h4 className="m-0 text-[12px] sm:text-[13px]
font-semibold
leading-none">
  When
</h4>
   
 <p className="mt-[4px] text-[13px] sm:text-[14px] md:text-[15px] font-normal leading-none text-[#6A6A6A]">
  {calendarTab === "flexible" && flexibleDuration
    ? `${flexibleDuration}${
        selectedMonths.length > 0
          ? ` · ${selectedMonths
  .map((month) => month.split(" ")[0].slice(0, 3))
  .join(" ")}`
          : ""
      }`
    : startDate
    ? `${startDate.format("DD MMM")}${
        endDate ? ` – ${endDate.format("DD MMM")}` : ""
      }${
        selectedOption !== "Exact dates"
          ? ` · ${selectedOption.replace("± ", "+")}`
          : ""
      }`
    : "Add dates"}
</p>
      </div>

   <div
  className={`
    h-[35px]
    w-px
    transition-all
    duration-200
    ${
      hoveredSection === "when" ||
      activeSection === "when" ||
      hoveredSection === "who" ||
      activeSection === "who"
        ? "bg-transparent"
        : "bg-[#dddddd]"
    }
  `}
/>






<div
onMouseEnter={() => setHoveredSection("who")}
onMouseLeave={() => setHoveredSection("")}
  className={`
    group
    relative
    flex
    h-full
    flex-[1.2]
    min-w-0
    items-center
    rounded-full
    transition-all
    duration-200
    ${
      activeSection === "who"
        ? "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.18)] z-20"
        : "hover:bg-[#DDDDDD]"
    }
  `}
>
  {/* WHO SECTION */}
  <div
    onClick={() => setActiveSection("who")}
    className="
      flex
      h-full
      min-w-0
      flex-1
      cursor-pointer
      flex-col
      justify-center
      rounded-full
   px-3
sm:px-4
md:px-5
lg:px-6
    "
  >
  
<h4 className="m-0 text-[12px] sm:text-[13px] font-semibold leading-none">
  {location.pathname === "/services" ? "Type of service" : "Who"}
</h4>



<p className="mt-[4px] text-[13px] sm:text-[14px] md:text-[15px] font-normal leading-none text-[#6A6A6A]">
     {location.pathname === "/services"
  ? "Add service"
  : guests.adults +
      guests.children +
      guests.infants +
      guests.pets ===
    0
  ? "Add guests"
  : `${guests.adults + guests.children + guests.infants} guests${
      guests.pets > 0 ? `, ${guests.pets} pets` : ""
    }`}
    </p>
  </div>

  {/* SEARCH BUTTON */}
  <button
    onClick={(e) => {
  e.stopPropagation();
  navigate("/search");
}}
    className={`
    mr-1
sm:mr-2
h-[44px]
sm:h-[48px]
      shrink-0
      flex
      items-center
      justify-center
      gap-2
      rounded-full
     bg-[#E31C5F]
      text-white
      hover:bg-[#E31C5F]
      transition-all
      duration-300
      overflow-hidden
      ${
   
  activeSection
    ? "w-[96px] shadow-[0_0_12px_rgba(255,56,92,0.35)]"
    : "w-[48px]"

      }
    `}
  >
    <FiSearch size={22} />

    {activeSection && (
      <span className="text-[14px] font-semibold whitespace-nowrap">
        Search
      </span>
    )}
  </button>
</div>






 






{activeSection === "where" && (
 <WhereDropdown
  setSelectedDestination={(destination) =>
    dispatch(setLocation(destination))
  }
  setActiveSection={setActiveSection}
/>
)}




{activeSection === "when" && (
<div
  className={`
  absolute
  left-1/2
  -translate-x-1/2
  top-[82px]
  z-[1000]

  max-w-[calc(100vw-24px)]




  


  rounded-[32px]
  bg-white
  shadow-[0_8px_28px_rgba(0,0,0,0.12)]

  ${
    location.pathname === "/experiences" ||
    location.pathname === "/services"
     ? "w-[660px] h-[397px] overflow-y-auto overflow-x-hidden"
      : "w-[660px] h-[397px] overflow-hidden"
  }
`}
>
   
  <div
  className={
    location.pathname === "/experiences" ||
    location.pathname === "/services"
      ? "w-full"
      : "calendar-body"
  }
>

{location.pathname === "/experiences" ||
location.pathname === "/services" ? (
<ExperienceCalendar
  onDateSelect={(date) => {
    dispatch(setStartDate(date));
    setActiveSection("when");
  }}
/>
) : (
 <Calendar
  startDate={startDate}
  endDate={endDate}
  setStartDate={(date) => dispatch(setStartDate(date))}
  setEndDate={(date) => dispatch(setEndDate(date))}
  calendarTab={calendarTab}
  setCalendarTab={setCalendarTab}
  selectedOption={selectedOption}
  setSelectedOption={setSelectedOption}
  flexibleDuration={flexibleDuration}
  setFlexibleDuration={setFlexibleDuration}
  selectedMonths={selectedMonths}
  setSelectedMonths={setSelectedMonths}
  handleFlexibleMonth={handleFlexibleMonth}
/>
)}

{location.pathname !== "/experiences" &&
 location.pathname !== "/services" &&
 calendarTab === "dates" && (
<div className="calendar-footer">
  {[
    "Exact dates",
    "± 1 day",
    "± 2 days",
    "± 3 days",
    "± 7 days",
    "± 14 days",
  ].map((item) => (
    <button
      key={item}
      onClick={() => setSelectedOption(item)}
      className={`footer-chip ${
  selectedOption === item ? "active" : ""
}`}
    >
      {item}
    </button>
  ))}
</div>
)}

</div>




  </div>
)}

      {activeSection === "who" && (
       <div className="absolute right-0 top-[82px] z-[1000] w-[90vw]
sm:w-[380px]
md:w-[420px] rounded-[30px] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.15)]">
          <div className="flex items-center justify-between border-b border-[#eeeeee] py-[18px] last:border-b-0">
            <div>
              <h4 className="m-0 text-[16px] font-semibold">Adults</h4>
              <p className="mt-1 text-[14px] text-[#717171]">Ages 13 or above</p>
            </div>

            <div className="flex items-center gap-[14px]">
           <button
  onClick={() => decreaseGuest("adults")}
  className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black"
>
  -
</button>

<span className="text-[16px]">{guests.adults}</span>

<button
  disabled={
    guests.adults +
    guests.children +
    guests.infants >= 16
  }
  onClick={() => increaseGuest("adults")}
  className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black"
>
  +
</button>
            </div>
          </div>
<div className="flex items-center justify-between border-b border-[#eeeeee] py-[18px] last:border-b-0">
            <div>
              <h4 className="m-0 text-[16px] font-semibold">Children</h4>
              <p className="mt-1 text-[14px] text-[#717171]">Ages 2–12</p>
            </div>

           <div className="flex items-center gap-[14px]">
              <button onClick={() => decreaseGuest("children")} className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">-</button>

             <span className="text-[16px]">{guests.children}</span>
<button
  disabled={
    guests.adults +
    guests.children +
    guests.infants >= 16
  }
  onClick={() => increaseGuest("children")}
  className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black"
>
  +
</button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-[#eeeeee] py-[18px] last:border-b-0">
            <div>
              <h4 className="m-0 text-[16px] font-semibold">Infants</h4>
              <p className="mt-1 text-[14px] text-[#717171]">Under 2</p>
            </div>

           <div className="flex items-center gap-[14px]">
             <button onClick={() => decreaseGuest("infants")} className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">-</button>
<span className="text-[16px]">{guests.infants}</span>

  <button
  disabled={
    guests.adults +
      guests.children +
      guests.infants >=
    16
  }
  onClick={() => increaseGuest("infants")}
  className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black disabled:opacity-40"
>
  +
</button>
            </div>
          </div>




{location.pathname !== "/experiences" && (
          <div className="flex items-center justify-between border-b border-[#eeeeee] py-[18px] last:border-b-0">
            <div>
              <h4 className="m-0 text-[16px] font-semibold">Pets</h4>
              <p className="mt-1 text-[14px] text-[#717171]">Bringing a service animal?</p>
            </div>

            <div className="flex items-center gap-[14px]">
              <button onClick={() => decreaseGuest("pets")} className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">-</button>

              <span className="text-[16px]">{guests.pets}</span>

            <button
  disabled={guests.pets >= 5}
  onClick={() => increaseGuest("pets")}
  className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black disabled:opacity-40"
>
  +
</button>
            </div>
          </div>
)}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
