import { useState } from "react";
function TypePlaceDropdown() {
    const [selectedType, setSelectedType] = useState("any");
  return (
    <div
      className="
      absolute
      top-[150px]
      left-1/2
      -translate-x-1/2
      w-[470px]
      h-[215px]
      bg-white
      rounded-[20px]
      border
      border-[#DDDDDD]
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      z-50
      "
    >
      {/* Top Section */}
      <div className="px-7 pt-6">
        <div
          className="
          h-[50px]
          bg-[#F2F2F2]
          rounded-full
          flex
          items-center
          p-[4px]
          "
        >
          {/* Any Type */}
          <button
  onClick={() => setSelectedType("any")}
  className={`
  w-[140px]
  h-[40px]
  rounded-full
  text-[16px]
  font-medium
  transition-all
  ${
   selectedType === "any"
  ? "bg-white shadow-sm text-[#222222]"
  : "bg-transparent hover:bg-[#EBEBEB] text-[#6A6A6A]"
  }
  `}
>
  Any type
</button>

          {/* Room */}
          <button
  onClick={() => setSelectedType("room")}
  className={`
   w-[140px]
  h-[40px]
  rounded-full
  text-[16px]
  font-medium
  transition-all
  ${
   selectedType === "room"
  ? "bg-white shadow-sm text-[#222222]"
  : "bg-transparent hover:bg-[#EBEBEB] text-[#6A6A6A]"
  }
  `}
>
  Room
</button>

          {/* Entire Home */}
          <button
  onClick={() => setSelectedType("entire")}
  className={`
   w-[140px]
  h-[40px]
  rounded-full
  text-[16px]
  font-medium
  transition-all
  ${
   selectedType === "entire"
  ? "bg-white shadow-sm text-[#222222]"
  : "bg-transparent hover:bg-[#EBEBEB] text-[#6A6A6A]"
  }
  `}
>
  Entire home
</button>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-9 border-t border-[#EEEEEE]" />

      {/* Bottom Buttons */}
      <div
        className="
        px-8
        py-5
        flex
        justify-between
        items-center
        "
      >
     
     <button
  onClick={() => setSelectedType("any")}
  disabled={selectedType === "any"}
  className={`
  px-3
  py-2
  rounded-lg
  text-[15px]
  font-medium
  transition-all
  duration-200
  ${
    selectedType === "any"
      ? "text-[#B0B0B0] cursor-not-allowed"
      : "text-[#222222] hover:bg-[#F2F2F2]"
  }
  `}
>
  Clear
</button>
        <button
          className="
          bg-[#222222]
          text-white
          px-8
          py-3
          rounded-xl
          font-semibold
          text-[17px]
          "
        >
          Show 1,000+ places
        </button>
      </div>
    </div>
  );
}

export default TypePlaceDropdown;