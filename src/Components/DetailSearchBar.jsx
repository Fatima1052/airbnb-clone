import PriceDropdown from "./PriceDropdown";
import TypePlaceDropdown from "./TypePlaceDropdown";
import FiltersModal from "./FiltersModal";
import logo from "../assests/airbnblogo.png";
import { 
  FiSearch, 
  FiGlobe, 
  FiMenu, 
  
  FiSliders, 
  FiChevronDown 
} from "react-icons/fi";
import homeIcon from "../assests/homedetailpageicon.avif";

import { useState } from "react";
function DetailSearchBar({ location }) {
  const [openFilter, setOpenFilter] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  return (
 <div className="
sticky
top-0
z-50
relative
bg-[#F7F7F7]
border-b
border-[#F0F0F0]
">

      {/* top section */}

    <div className="
flex
items-center
justify-between
h-[80px]
px-12
2xl:px-20
max-w-[1760px]
mx-auto
">
        <div className="w-[260px] flex items-center text-2xl font-bold text-[#ff385c] gap-[1px]">
           <img
             src={logo}
             alt="Airbnb Logo"
             className="w-[36px]"
           />
           airbnb
         </div>
      <div className="
w-[480px]
flex
items-center
h-[50px]
rounded-full
border
border-[#DDDDDD]
bg-[#F7F7F7]
pl-2
pr-1
shadow-[0_2px_8px_rgba(0,0,0,0.12)]
">

       <div className="flex items-center gap-[1px] pr-3 shrink-0">
  <img
    src={homeIcon}
    alt="Home"
   className="w-[44px] h-[44px] object-cover"
  />

  <span className="text-[15px] font-medium text-[#1F1F1F] whitespace-nowrap">
  Homes in {location}
</span>
</div>

        <div className="mx-1 h-5 w-px bg-[#DDDDDD] shrink-0"></div>

          <div className="flex items-center px-2 whitespace-nowrap shrink-0">
    <span className="text-[15px] font-medium text-[#1F1F1F] whitespace-nowrap">
  Any weekend
</span>
</div>

         <div className="flex items-center">
      <div className="mx-2 h-6 w-px bg-[#D0D0D0]"></div>

       <div className="flex items-center px-2 whitespace-nowrap shrink-0">
   <span className="text-[15px] font-medium text-[#1F1F1F] whitespace-nowrap">
Add guests
</span>
</div>
</div>
        <button
className="
ml-auto
mr-1
w-[38px]
h-[38px]
rounded-full
bg-[#D70466]
flex
items-center
justify-center
text-white
shrink-0
">
   
    <FiSearch size={16}/>
</button>
        </div>
<div className="w-[260px] flex justify-end items-center">

  <p className="mr-3 font-medium">
    Become a host
  </p>

  <button
  className="
  w-[42px]
  h-[42px]
  rounded-full
  bg-[#F2F2F2]
  shadow-sm
  flex
  items-center
  justify-center
  hover:shadow-md
  "
>
  <FiGlobe size={18} />
</button>

  <button
  className="
  ml-3
  w-[42px]
  h-[42px]
  rounded-full
  bg-[#F2F2F2]
  shadow-sm
  flex
  items-center
  justify-center
  hover:shadow-md
  "
>
  <FiMenu size={18} />
</button>
</div>


  




      </div>

      {/* filter section */}

   <div className="border-b border-[#F0F0F0] bg-[#FAFAFA] pt-2 pb-5">
<div className="flex items-center justify-center gap-2">
<button
onClick={() => setShowFilters(true)}
className="
flex
items-center
gap-[10px]
rounded-full
border
border-[#DDDDDD]
bg-white
px-[10px]
h-[35px]
text-[13px]
font-medium
text-[#222222]
"
>

<FiSliders size={17}/>
Filters

</button>
<div className="mx-1 h-6 w-px bg-[#D0D0D0]"></div>
<button
onClick={() =>
setOpenFilter(
openFilter === "price" ? null : "price"
)
}
className={`
flex
items-center
gap-2
rounded-full
border
bg-white
px-3
h-[38px]
text-[14px]
font-medium
text-[#222]
${openFilter === "price"
? "border-[#222]"
: "border-[#DDDDDD]"
}
`}
>

Price

{openFilter === "price" 
?
<FiChevronDown 
size={16}
className="rotate-180"
/>
:
<FiChevronDown size={16}/>
}

</button>


<button
onClick={() =>
setOpenFilter(
openFilter === "type" ? null : "type"
)
}
className={`
flex
items-center
gap-2
rounded-full
border
bg-white
px-3
h-[35px]
text-[14px]
font-medium
${
  openFilter === "type"
    ? "border-[#222222] text-[#222222]"
    : "border-[#DDDDDD] text-[#4B4B4B]"
}
`}
>

Type of place

{
openFilter === "type"
?
<FiChevronDown
size={13}
className="rotate-180"
/>
:
<FiChevronDown size={13}/>
}

</button>


</div>

</div>


{openFilter === "price" && (
  <PriceDropdown
    onClose={() => setOpenFilter(null)}
  />
)}

{openFilter === "type" && (
  <TypePlaceDropdown
    onClose={() => setOpenFilter(null)}
  />
)}

{showFilters && (
  <FiltersModal
    onClose={() => setShowFilters(false)}
  />
)}
    </div>
  );
}

export default DetailSearchBar;