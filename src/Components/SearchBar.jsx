
import { useState, useRef, useEffect } from "react";
import Calendar from "./Calender";
function SearchBar() {
  const searchRef = useRef(null);

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

  const [activeSection, setActiveSection] = useState("");
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);

const [guests, setGuests] = useState({
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
});

const increaseGuest = (type) => {
  setGuests((prev) => ({
    ...prev,
    [type]: prev[type] + 1,
  }));
};

const decreaseGuest = (type) => {
  setGuests((prev) => ({
    ...prev,
    [type]: Math.max(0, prev[type] - 1),
  }));
};


  return (
    <div
      ref={searchRef}
      className="relative mx-auto mt-2 flex h-[58px] w-[750px] items-center rounded-full border border-[#dddddd] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
    >
      <div
        className={`flex h-full flex-1 cursor-pointer flex-col justify-center rounded-full px-[25px] transition-all
${activeSection === "where" ? "bg-[#f7f7f7]" : "hover:bg-[#f7f7f7]"}`}
        onClick={() => setActiveSection("where")}
      >
        <h4 className="m-0 text-[14px] font-semibold">Where</h4>
        <p className="mt-[5px] text-[13px] text-gray-500">
          Search destinations
        </p>
      </div>

      <div className="h-[35px] w-px bg-[#dddddd]" />

      <div
        className={`flex h-full flex-1 cursor-pointer flex-col justify-center rounded-full px-[25px] transition-all
${activeSection === "when" ? "bg-[#f7f7f7]" : "hover:bg-[#f7f7f7]"}`}
        onClick={() => setActiveSection("when")}
      >
        <h4 className="m-0 text-[14px] font-semibold">When</h4>
       <p className="mt-[5px] text-[13px] text-gray-500">
  {startDate
    ? startDate.toLocaleDateString()
    : "Add dates"}
</p>
      </div>

      <div className="h-[35px] w-px bg-[#dddddd]" />

      <div
        className={`flex h-full flex-1 cursor-pointer flex-col justify-center rounded-full px-[25px] transition-all
${activeSection === "who" ? "bg-[#f7f7f7]" : "hover:bg-[#f7f7f7]"}`}
        onClick={() => setActiveSection("who")}
      >
        <h4 className="m-0 text-[14px] font-semibold">Who</h4>
     <p className="mt-[5px] text-[13px] text-gray-500">
  {guests.adults +
    guests.children +
    guests.infants ===
  0
    ? "Add guests"
    : `${guests.adults + guests.children + guests.infants} guests`}

  {guests.pets > 0 ? `, ${guests.pets} pet` : ""}
</p>
      </div>

      <button className="mr-[10px] h-[48px] w-[48px] rounded-full border-none bg-[#ff385c] text-[18px] text-white">
        🔍
      </button>

      {activeSection === "where" && (
        <div className="absolute left-0 top-[75px] z-[1000] max-h-[370px] w-[370px] overflow-y-auto rounded-[30px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
          <h4 className="mb-[18px] text-[18px] font-semibold">
            Suggested destinations
          </h4>

          <div className="flex cursor-pointer items-center gap-4 rounded-2xl p-3 transition-all duration-200 hover:bg-[#f7f7f7]">
            <div className="icon-box">📍</div>

            <div>
              <h5 className="m-0 text-[17px] font-semibold">Nearby</h5>

              <p className="mt-1 text-[15px] text-[#717171]">
                Find what's around you
              </p>
            </div>
          </div>
          <div className="flex cursor-pointer items-center gap-4 rounded-2xl p-3 transition-all duration-200 hover:bg-[#f7f7f7]">
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl bg-[#f5f5f5] text-[28px]">
              🏙️
            </div>

            <div>
              <h5 className="m-0 text-[17px] font-semibold">
                Islamabad, Pakistan
              </h5>

              <p className="mt-1 text-[15px] text-[#717171]">
                For sights like Faisal Mosque
              </p>
            </div>
          </div>

          <div className="flex cursor-pointer items-center gap-4 rounded-2xl p-3 transition-all duration-200 hover:bg-[#f7f7f7]">
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl bg-[#f5f5f5] text-[28px]">
              🌆
            </div>

            <div>
              <h5 className="m-0 text-[17px] font-semibold">
                Lahore, Pakistan
              </h5>

              <p className="mt-1 text-[15px] text-[#717171]">Historic city</p>
            </div>
          </div>

          <div className="flex cursor-pointer items-center gap-4 rounded-2xl p-3 transition-all duration-200 hover:bg-[#f7f7f7]">
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl bg-[#f5f5f5] text-[28px]">
              🏔️
            </div>

            <div>
              <h5 className="m-0 text-[17px] font-semibold">
                Murree, Pakistan
              </h5>

              <p className="mt-1 text-[15px] text-[#717171]">Near you</p>
            </div>
          </div>
        </div>
      )}


  {activeSection === "when" && (
  <div className="absolute left-1/2 top-[70px] z-[9999] -translate-x-1/2 rounded-[32px] bg-white p-8 shadow-lg">
    <Calendar />
  </div>
)}





      {activeSection === "who" && (
       <div className="absolute right-0 top-[82px] z-[1000] w-[420px] rounded-[30px] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.15)]">
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

              <button onClick={() => increaseGuest("children")} className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">+</button>
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

              <button onClick={() => increaseGuest("infants")} className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-[#eeeeee] py-[18px] last:border-b-0">
            <div>
              <h4 className="m-0 text-[16px] font-semibold">Pets</h4>
              <p className="mt-1 text-[14px] text-[#717171]">Bringing a service animal?</p>
            </div>

            <div className="flex items-center gap-[14px]">
              <button onClick={() => decreaseGuest("pets")} className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">-</button>

              <span className="text-[16px]">{guests.pets}</span>

              <button onClick={() => increaseGuest("pets")} className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
