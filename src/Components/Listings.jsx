
import PropertyCard from "./PropertyCard";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { useRef } from "react";



function Listings({ title, subtitle, listings }) {

const sliderRef = useRef(null);

const scrollLeft = () => {
  sliderRef.current.scrollBy({
    left: -900,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  sliderRef.current.scrollBy({
    left: 900,
    behavior: "smooth",
  });
};


  return (

    <section className="px-[32px] pt-[24px] pb-[8px]">
<div className="mb-[25px] flex items-center justify-between">

  <div className="flex items-center gap-3">
    <div>

      <div className="flex items-center gap-2">
       <h2 className="m-0 text-[25px] font-semibold text-[#222222]">
          {title}
        </h2>

       <div className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full bg-[#f2f2f2] transition hover:bg-[#e5e5e5]">
          <FiArrowRight />
        </div>
      </div>

      {subtitle && (
       <p className="mt-[6px] text-[16px] text-[#6a6a6a]">
          {subtitle}
        </p>
      )}

    </div>

  </div>

 <div className="flex gap-[10px]">

   <button
  onClick={scrollLeft}
  className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#f2f2f2] transition hover:bg-[#e5e5e5]"
>
      <FiChevronLeft />
    </button>

   <button
  onClick={scrollRight}
  className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#f2f2f2] transition hover:bg-[#e5e5e5]"
>
      <FiChevronRight />
    </button>

  </div>

</div>
   
<div
  ref={sliderRef}
 
className="flex gap-[17px] overflow-x-hidden scroll-smooth"
>

          {listings.map((listing) => (

<PropertyCard

key={listing.id}

image={listing.image}
title={listing.title}
price={listing.price}
rating={listing.rating}
guestFavorite={listing.guestFavorite}
original={listing.original}
location={listing.location}

/>

))}

        </div>

    </section>

)

}


export default Listings;