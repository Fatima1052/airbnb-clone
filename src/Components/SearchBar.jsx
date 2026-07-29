import { useState, useRef, useEffect } from "react";

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
        <p className="mt-[5px] text-[13px] text-gray-500">Add Dates</p>
      </div>

      <div className="h-[35px] w-px bg-[#dddddd]" />

      <div
        className={`flex h-full flex-1 cursor-pointer flex-col justify-center rounded-full px-[25px] transition-all
${activeSection === "who" ? "bg-[#f7f7f7]" : "hover:bg-[#f7f7f7]"}`}
        onClick={() => setActiveSection("who")}
      >
        <h4 className="m-0 text-[14px] font-semibold">Who</h4>
        <p className="mt-[5px] text-[13px] text-gray-500">Add guests</p>
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
        <div className="absolute left-1/2 top-[70px] z-[9999] w-[850px] max-w-[90vw] -translate-x-1/2 rounded-[32px] bg-white p-[18px] shadow-[0_10px_35px_rgba(0,0,0,0.15)]">
         <div className="mx-auto mb-5 flex w-[260px] rounded-full bg-[#f2f2f2] p-1">
           <button className="flex-1 rounded-full bg-white py-3 text-[15px] shadow-[0_2px_6px_rgba(0,0,0,0.1)]">Dates</button>
<button className="flex-1 rounded-full bg-transparent py-3 text-[15px]">Flexible</button>
          </div>

          <div className="flex justify-around gap-5">
            <div className="w-[360px]">
              <h3 className="mb-3 text-center text-[18px] font-semibold">July 2026</h3>

             <div className="grid grid-cols-7 gap-y-2 text-center text-[#666666]">
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">S</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">M</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">T</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">W</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">T</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">F</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">S</span>
              </div>

             <div className="mt-[10px] grid grid-cols-7 gap-[2px] text-center">
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"></span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"></span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"></span>

               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">1</span>
              <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">2</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">3</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">4</span>

                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">5</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">6</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">7</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">8</span>
              <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">9</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">10</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">11</span>

                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">12</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">13</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">14</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">15</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">16</span>
              <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"> 17</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">18</span>

                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">19</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"> 20</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">21</span>
              <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">22</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">23</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">24</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">25</span>

                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">26</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">27</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">28</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">29</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">30</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">31</span>
              </div>
            </div>

             <div className="w-[360px]">
               <h3 className="mb-3 text-center text-[18px] font-semibold">August 2026</h3>

                  <div className="grid grid-cols-7 gap-y-2 text-center text-[#666666]">
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">S</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">M</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">T</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">W</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">T</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">F</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">S</span>
              </div>
             <div className="mt-[10px] grid grid-cols-7 gap-[2px] text-center">
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"></span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"></span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"></span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"></span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"></span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"></span>

                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">1</span>

                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">2</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"> 3</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">4</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">5</span>
             <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]"> 6</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">7</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">8</span>

                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">9</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">10</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">11</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">12</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">13</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">14</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">15</span>

                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">16</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">17</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">18</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">19</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">20</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">21</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">22</span>

               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">23</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">24</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">25</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">26</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">27</span>
               <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">28</span>
              <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">29</span>

                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">30</span>
                <span className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#f2f2f2]">31</span>
              </div>
            </div>
          </div>
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
             <button className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">-</button>

            <span className="text-[16px]">0</span>

              <button className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">+</button>
            </div>
          </div>
<div className="flex items-center justify-between border-b border-[#eeeeee] py-[18px] last:border-b-0">
            <div>
              <h4 className="m-0 text-[16px] font-semibold">Children</h4>
              <p className="mt-1 text-[14px] text-[#717171]">Ages 2–12</p>
            </div>

           <div className="flex items-center gap-[14px]">
              <button className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">-</button>

              <span className="text-[16px]">0</span>

              <button className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-[#eeeeee] py-[18px] last:border-b-0">
            <div>
              <h4 className="m-0 text-[16px] font-semibold">Infants</h4>
              <p className="mt-1 text-[14px] text-[#717171]">Under 2</p>
            </div>

           <div className="flex items-center gap-[14px]">
             <button className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">-</button>

              <span className="text-[16px]">0</span>

              <button className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-[#eeeeee] py-[18px] last:border-b-0">
            <div>
              <h4 className="m-0 text-[16px] font-semibold">Pets</h4>
              <p className="mt-1 text-[14px] text-[#717171]">Bringing a service animal?</p>
            </div>

            <div className="flex items-center gap-[14px]">
              <button className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">-</button>

              <span className="text-[16px]">0</span>

              <button className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#cccccc] bg-white text-[18px] transition hover:border-black">+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
