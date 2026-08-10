import { useState } from "react";
import { FiX } from "react-icons/fi";
import { MdBolt } from "react-icons/md";
import { FiKey } from "react-icons/fi";
import { PiPawPrint } from "react-icons/pi";
import { FiChevronDown } from "react-icons/fi";
import {
  MdOutlineWifi,
  MdOutlineKitchen,
  MdOutlineLocalLaundryService,
  MdOutlineAcUnit,
} from "react-icons/md";

import { TbTemperature } from "react-icons/tb";
function FiltersModal({ onClose }) {

  const [placeType, setPlaceType] = useState("any");
const [hoveredType, setHoveredType] = useState("");
const [bedrooms, setBedrooms] = useState(0);
const [beds, setBeds] = useState(0);
const [bathrooms, setBathrooms] = useState(0);

const increaseValue = (setter, value) => {
  if (value < 8) {
    setter(value + 1);
  }
};

const decreaseValue = (setter, value) => {
  if (value > 0) {
    setter(value - 1);
  }
};
  return (
    <div className="
    fixed
    inset-0
    bg-black/35
    z-[100]
    flex
    items-center
    justify-center
    ">

      <div
  className="
  w-[570px]
  h-[507px]
  bg-white
  rounded-[32px]
  shadow-2xl
  overflow-hidden
  flex
  flex-col
  "
>

        {/* Header */}

        <div className="
        h-[64px]
        border-b
        border-[#EBEBEB]
        flex
        items-center
        justify-center
        relative
        ">

          <h2 className="
          text-[17px]
          font-semibold
          ">
            Filters
          </h2>

          <button
            onClick={onClose}
            className="
            absolute
            right-6
            text-[20px]
            text-[#222]
            "
          >
            <FiX />
          </button>

        </div>

      {/* Body */}

<div
  className="
  flex-1
  overflow-y-auto
  custom-scroll
  px-6
  pt-6
  pb-2
  "
>

    <h2
  className="
  text-[19px]
  font-semibold
  text-[#222222]
  "
>
  Type of place
</h2>



<div
  className="
  mt-5
  h-[52px]
  rounded-[14px]
  border
  border-[#DDDDDD]
  flex
  overflow-hidden
  "
>
  {/* Any type */}

  <button
    onClick={() => setPlaceType("any")}
    onMouseEnter={() => setHoveredType("any")}
    onMouseLeave={() => setHoveredType("")}
    className={`
      flex-1
      rounded-[14px]
      transition-all
      duration-200
      text-[16px]
      font-semibold
      ${
        hoveredType === "any"
          ? "bg-[#F7F7F7]"
          : ""
      }
      ${
        placeType === "any"
          ? "border border-black"
          : ""
      }
    `}
  >
    Any type
  </button>

  <div
    className={`w-px ${
      hoveredType === "any" ||
      hoveredType === "room"
        ? "bg-transparent"
        : "bg-[#DDDDDD]"
    }`}
  />

  {/* Room */}

  <button
    onClick={() => setPlaceType("room")}
    onMouseEnter={() => setHoveredType("room")}
    onMouseLeave={() => setHoveredType("")}
    className={`
      flex-1
      rounded-[14px]
      transition-all
      duration-200
      text-[16px]
      font-semibold
      ${
        hoveredType === "room"
          ? "bg-[#F7F7F7]"
          : ""
      }
      ${
        placeType === "room"
          ? "border border-black"
          : ""
      }
    `}
  >
    Room
  </button>

  <div
    className={`w-px ${
      hoveredType === "room" ||
      hoveredType === "home"
        ? "bg-transparent"
        : "bg-[#DDDDDD]"
    }`}
  />

  {/* Entire home */}

  <button
    onClick={() => setPlaceType("home")}
    onMouseEnter={() => setHoveredType("home")}
    onMouseLeave={() => setHoveredType("")}
    className={`
      flex-1
      rounded-[14px]
      transition-all
      duration-200
      text-[16px]
      font-semibold
      ${
        hoveredType === "home"
          ? "bg-[#F7F7F7]"
          : ""
      }
      ${
        placeType === "home"
          ? "border border-black"
          : ""
      }
    `}
  >
    Entire home
  </button>
</div>

<div
  className="
  mt-7
  border-t
  border-[#EBEBEB]
  "
/>
<div className="mt-6">

  <h2
    className="
    text-[20px]
    font-semibold
    "
  >
    Price range
  </h2>

  <p
    className="
    mt-1
    text-[16px]
    text-[#4B4B4B]
    "
  >
    Trip price, includes all fees
  </p>


{/* Histogram */}

<div
  className="
  mt-10
  h-[45px]
  flex
  items-end
  justify-center
  gap-[3px]
  "
>
  {Array.from({ length: 45 }).map((_, i) => (
    <div
      key={i}
      className="
      w-[6px]
      bg-[#E31C5F]
      rounded-t
      "
      style={{
        height: `${18 + Math.random() * 55}px`,
      }}
    />
  ))}
</div>

<div
  className="
  relative
  mt-[-2px]
  h-[2px]
  bg-[#E31C5F]
  rounded-full
  "
>

  <div
    className="
    absolute
    left-0
    top-1/2
    -translate-y-1/2
    w-[34px]
    h-[34px]
    rounded-full
    bg-white
    border
    border-[#DDDDDD]
    shadow-sm
    "
  />

  <div
    className="
    absolute
    right-0
    top-1/2
    -translate-y-1/2
    w-[34px]
    h-[34px]
    rounded-full
    bg-white
    border
    border-[#DDDDDD]
    shadow-sm
    "
  />
</div>

</div>
<div
  className="
  mt-8
  flex
  justify-between
  items-start
  "
>
  {/* Minimum */}

  <div>
    <p
      className="
      text-[14px]
      text-[#6A6A6A]
      font-medium
      mb-1
      ml-3
      "
    >
      Minimum
    </p>

    <button
      className="
      w-[85px]
h-[50px]
rounded-[34px]
      border
      border-[#DDDDDD]
      text-left
      px-4
      bg-white
      "
    >
      <div
  className="
  flex
  items-center
  h-full
  text-[18px]
  font-medium
  text-[#222]
  "
>
  $20
</div>
    </button>
  </div>

  {/* Maximum */}

  <div>
    <p
      className="
      text-[14px]
      text-[#6A6A6A]
      font-medium
      mb-1
      mr-3
      text-right
      "
    >
      Maximum
    </p>

    <button
      className="
       w-[85px]
h-[50px]
rounded-[34px]
      border
      border-[#DDDDDD]
      text-left
      px-4
      bg-white
      "
    >
    <div
  className="
  flex
  items-center
  h-full
  text-[18px]
  font-medium
  text-[#222]
  "
>
  $210+
</div>
    </button>
  </div>
</div>
<div
  className="
  mt-6
  border-t
    border-[#D5D5D5]
  "
/>


<div className="mt-5">

  <h2
    className="
    text-[20px]
    font-semibold
    text-[#222222]
    "
  >
    Rooms and beds
  </h2>


  <div
  className="
  mt-4
  flex
  items-center
  justify-between
  "
>

  <p
    className="
    text-[17px]
    text-[#222222]
    "
  >
    Bedrooms
  </p>

  <div
    className="
    flex
    items-center
    gap-4
    "
  >

   <button
  onClick={() => decreaseValue(setBedrooms, bedrooms)}

      className="
      w-[30px]
      h-[30px]
      rounded-full
      border
      border-[#DDDDDD]
      text-[#B0B0B0]
      text-[25px]
      leading-none
      bg-[#F2F2F2]
      "
    >
      −
    </button>

    <span
      className="
      text-[17px]
      text-[#222222]
      min-w-[40px]
      text-center
      "
    >
    {bedrooms === 0 ? "Any" : bedrooms}
    </span>

    <button
      onClick={() => increaseValue(setBedrooms, bedrooms)}
      className="
      w-[30px]
      h-[30px]
      rounded-full
     
      text-[24px]
      leading-none
      bg-[#F2F2F2]
      "
    >
      +
    </button>

  </div>

</div>


<div
  className="
  mt-7
  flex
  items-center
  justify-between
  "
>

  <p
    className="
    text-[17px]
    text-[#222222]
    "
  >
    Beds
  </p>

  <div
    className="
    flex
    items-center
    gap-4
    "
  >

    <button
    onClick={() => decreaseValue(setBeds, beds)}
      className="
      w-[30px]
      h-[30px]
      rounded-full
      border
      border-[#DDDDDD]
      text-[#B0B0B0]
      text-[24px]
      leading-none
           bg-[#F2F2F2]
      "
    >
      −
    </button>

    <span
      className="
      text-[17px]
      text-[#222222]
      min-w-[40px]
      text-center
      "
    >
      {beds === 0 ? "Any" : beds}
    </span>

    <button
    onClick={() => increaseValue(setBeds, beds)}
      className="
      w-[30px]
      h-[30px]
      rounded-full
     
      text-[24px]
      leading-none
           bg-[#F2F2F2]
      "
    >
      +
    </button>

  </div>

</div>


<div
  className="
  mt-7
  flex
  items-center
  justify-between
  "
>

  <p
    className="
    text-[17px]
    text-[#222222]
    "
  >
    Bathrooms
  </p>

  <div
    className="
    flex
    items-center
    gap-4
    "
  >

    <button
    onClick={() => decreaseValue(setBathrooms, bathrooms)}
      className="
      w-[30px]
      h-[30px]
      rounded-full
      border
      border-[#DDDDDD]
      text-[#B0B0B0]
      text-[24px]
      leading-none
           bg-[#F2F2F2]
      "
    >
      −
    </button>

    <span
      className="
      text-[17px]
      text-[#222222]
      min-w-[40px]
      text-center
      "
    >
     {bathrooms === 0 ? "Any" : bathrooms}
    </span>

    <button
    onClick={() => increaseValue(setBathrooms, bathrooms)}
      className="
      w-[30px]
      h-[30px]
      rounded-full
    
      text-[24px]
      leading-none
           bg-[#F2F2F2]
      "
    >
      +
    </button>

  </div>

</div>


<div
  className="
  mt-7
  border-t
  border-[#D5D5D5]
  "
/>



<div className="mt-6">

  <h2
    className="
    text-[20px]
    font-semibold
    text-[#222222]
    "
  >
    Amenities
  </h2>


  <div
  className="
  mt-6
  flex
  flex-wrap
  gap-3
  "
>

  <button
  className="
  px-2
  h-[48px]
  rounded-full
  border
  border-[#DDDDDD]
  bg-white
  flex
  items-center
  gap-3
  hover:border-[#222222]
  transition-all
  "
>
  <MdOutlineWifi className="text-[24px]" />
  <span className="text-[16px]">Wifi</span>
</button>

  <button
  className="
  px-2
  h-[48px]
  rounded-full
  border
  border-[#DDDDDD]
  bg-white
  flex
  items-center
  gap-3
  hover:border-[#222222]
  transition-all
  "
>
  <MdOutlineKitchen className="text-[24px]" />
  <span className="text-[16px]">Kitchen</span>
</button>

  
  <button
  className="
  px-6
  h-[48px]
  rounded-full
  border
  border-[#DDDDDD]
  bg-white
  flex
  items-center
  gap-3
  hover:border-[#222222]
  transition-all
  "
>
  <MdOutlineLocalLaundryService className="text-[24px]" />
  <span className="text-[16px]">Washer</span>
</button>

  <button
  className="
  px-2
  h-[48px]
  rounded-full
  border
  border-[#DDDDDD]
  bg-white
  flex
  items-center
  gap-3
  hover:border-[#222222]
  transition-all
  "
>
  <MdOutlineLocalLaundryService className="text-[24px]" />
  <span className="text-[16px]">Dryer</span>
</button>

</div>


<div
  className="
  mt-4
  flex
  flex-wrap
  gap-3
  "
>

  <button
  className="
  px-2
  h-[48px]
  rounded-full
  border
  border-[#DDDDDD]
  bg-white
  flex
  items-center
  gap-3
  hover:border-[#222222]
  transition-all
  "
>
  <MdOutlineAcUnit className="text-[24px]" />
  <span className="text-[16px]">Air conditioning</span>
</button>

 <button
  className="
  px-2
  h-[48px]
  rounded-full
  border
  border-[#DDDDDD]
  bg-white
  flex
  items-center
  gap-3
  hover:border-[#222222]
  transition-all
  "
>
  <TbTemperature className="text-[24px]" />
  <span className="text-[16px]">Heating</span>
</button>

</div>


<button
  className="
  mt-5
  flex
  items-center
  gap-2
  text-[17px]
  font-semibold
  text-[#222222]
  underline
  underline-offset-[3px]
  hover:text-black
  transition-all
  "
>
  <span>Show more</span>

  <FiChevronDown className="text-[20px]" />
</button>

</div>




</div>

<div
  className="
  mt-7
  border-t
  border-[#D5D5D5]
  "
/>



<div className="mt-6">

  <h2
    className="
    text-[20px]
    font-semibold
    text-[#222222]
    "
  >
    Booking options
  </h2>
   
<div
  className="
  mt-6
  flex
  flex-wrap
  gap-3
  "
>

  {/* Instant Book */}

  <button
    className="
    px-3
    h-[48px]
    rounded-full
    border
    border-[#DDDDDD]
    bg-white
    flex
    items-center
    gap-3
    hover:border-[#222222]
    transition-all
    "
  >
    <MdBolt className="text-[23px]" />
    <span className="text-[16px]">
      Instant Book
    </span>
  </button>

  {/* Self check-in */}

  <button
    className="
    px-3
    h-[48px]
    rounded-full
    border
    border-[#DDDDDD]
    bg-white
    flex
    items-center
    gap-3
    hover:border-[#222222]
    transition-all
    "
  >
    <FiKey className="text-[22px]" />
    <span className="text-[16px]">
      Self check-in
    </span>
  </button>

  {/* Allows pets */}

  <button
    className="
    px-3
    h-[48px]
    rounded-full
    border
    border-[#DDDDDD]
    bg-white
    flex
    items-center
    gap-3
    hover:border-[#222222]
    transition-all
    "
  >
    <PiPawPrint className="text-[22px]" />
    <span className="text-[16px]">
      Allows pets
    </span>
  </button>
</div>


<div
  className="
  mt-7
  border-t
  border-[#D5D5D5]
  "
/>


<div className="mt-7">

  <h2
    className="
    text-[20px]
    font-semibold
    text-[#222222]
    "
  >
    Standout stays
  </h2>

<div
  className="
  mt-6
  grid
  grid-cols-2
  gap-4
  "
>
<button
  className="
  h-[100px]
  border
  border-[#DDDDDD]
  rounded-[18px]
  px-6
  flex
  items-center
  gap-5
  "
>
  <div className="text-[40px]">
    🏆
  </div>

  <div className="text-left">
    <h3 className="text-[18px] font-semibold">
      Guest favorite
    </h3>

    <p className="text-[15px] text-[#717171]">
      The most loved homes on Airbnb
    </p>
  </div>
</button>


<button
  className="
  h-[100px]
  border
  border-[#DDDDDD]
  rounded-[18px]
  px-6
  flex
  items-center
  gap-5
  "
>
  <div className="text-[40px]">
    🏠
  </div>

  <div className="text-left">
    <h3 className="text-[18px] font-semibold">
      Luxe
    </h3>

    <p className="text-[15px] text-[#717171]">
      Luxury homes with elevated design
    </p>
  </div>
</button>
</div>
</div>


<div
  className="
  mt-7
  w-full
  h-px
  bg-[#EBEBEB]
  "
/>

<div className="mt-7">

  <div
    className="
    flex
    items-center
    justify-between
    "
  >
    <h2
      className="
      text-[20px]
      font-semibold
      text-[#222222]
      "
    >
      Property type
    </h2>

    <FiChevronDown className="text-[26px]" />
  </div>

</div>

<div
  className="
  mt-8
  w-full
  h-px
  bg-[#EBEBEB]
  "
/>


<div className="mt-8">

  <div
    className="
    flex
    items-center
    justify-between
    "
  >
    <h2
      className="
      text-[20px]
      font-semibold
      text-[#222222]
      "
    >
      Accessibility features
    </h2>

    <FiChevronDown className="text-[26px]" />
  </div>

</div>


<div
  className="
  mt-8
  w-full
  h-px
  bg-[#EBEBEB]
  "
/>


<div className="mt-8">

  <div
    className="
    flex
    items-center
    justify-between
    "
  >
    <h2
      className="
      text-[20px]
      font-semibold
      text-[#222222]
      "
    >
      Host language
    </h2>

    <FiChevronDown className="text-[26px]" />
  </div>

</div>


<div
  className="
  mt-10
  w-full
  h-px
  bg-[#EBEBEB]
  "
/>




</div>





</div>




{/* Footer */}

<div
className="
flex-shrink-0
h-[72px]
bg-[#FFFFFF]
border-t
border-[#DCDCDC]

shadow-[0_-8px_24px_rgba(0,0,0,0.08)]
px-6
flex
items-center
justify-between
">

<button
className="
text-[#B0B0B0]
font-medium
text-[15px]
px-3
py-2
rounded-lg
hover:bg-[#F2F2F2]
transition-all
duration-200
">
Clear all
</button>

<button
className="
bg-[#222222]
text-white
px-6
py-3
rounded-xl
font-semibold
text-[16px]
hover:bg-black
transition-all
duration-200
">
Show 1,000+ places
</button>

</div>


      </div>

    </div>
  );
}

export default FiltersModal;