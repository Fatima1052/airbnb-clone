import PriceDropdown from "./PriceDropdown";
import logo from "../assests/airbnblogo.png";
import { 
  FiSearch, 
  FiGlobe, 
  FiMenu, 
  FiHome, 
  FiSliders, 
  FiChevronDown 
} from "react-icons/fi";
import { useState } from "react";
function DetailSearchBar() {
  const [openFilter, setOpenFilter] = useState(null);
  return (
 <div className="sticky top-0 z-50 bg-gray-100">

      {/* top section */}

     <div className="flex items-center justify-between px-20 py-3">
        <div className="flex items-center text-2xl font-bold text-[#ff385c] gap-[1px]">
           <img
             src={logo}
             alt="Airbnb Logo"
             className="w-[50px] cursor-pointer"
           />
           airbnb
         </div>
        <div className="
flex 
items-center 
rounded-full 
border 
border-gray-200 
bg-white 
px-2 
py-1 
shadow-sm
mr-1
scale-90
">

         <div className="flex items-center gap-2 px-4 font-medium">
  <FiHome size={18}/>
  <span>
    Homes in Islamabad
  </span>
</div>

          <div className="h-6 border-r border-gray-300"></div>

          <span className="px-4">
            Any weekend
          </span>

          <div className="h-6 border-r border-gray-300"></div>

          <span className="px-4">
            Add guests
          </span>

          <button className="ml-3 rounded-full bg-[#ff385c] p-3 text-white">
    <FiSearch size={18} />
</button>
        </div>

       <div className="flex items-center gap-2">

          <p className="font-medium">
            Become a host
          </p>

          <button className="rounded-full p-3 hover:bg-gray-100">
            <FiGlobe />
          </button>

          <button className="rounded-full p-3 hover:bg-gray-100">
            <FiMenu />
          </button>

        </div>


  




      </div>

      {/* filter section */}

    <div className="border-b border-gray-400 bg-grey-100 py-3">

<div className="flex justify-center gap-3">

<button


className="
flex items-center gap-2
rounded-full
border
border-gray-300
px-5 py-2
text-sm
hover:shadow-md
"
>

<FiSliders size={17}/>
Filters

</button>

<button
onClick={() =>
setOpenFilter(
openFilter === "price" ? null : "price"
)
}

className="
flex items-center gap-2
rounded-full
border
border-gray-300
px-5 py-2
text-sm
hover:shadow-md
"
>

Price

<FiChevronDown size={16}/>

</button>


<button 
onClick={() =>
setOpenFilter(
openFilter === "type" ? null : "type"
)
}
className="
flex items-center gap-2
rounded-full
border
border-gray-300
px-5 py-2
text-sm
hover:shadow-md
">

Type of place

<FiChevronDown size={16}/>

</button>


</div>

</div>


{openFilter === "price" && (
  <PriceDropdown
    onClose={() => setOpenFilter(null)}
  />
)}


    </div>
  );
}

export default DetailSearchBar;