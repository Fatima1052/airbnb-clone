import detailcard1 from "../assests/detailcard1.avif";
import detailcard2 from "../assests/detailcard2.avif";
import detailcard3 from "../assests/detailcard3.avif";
import detailcard4 from "../assests/detailcard4.avif";

import { useState } from "react";



const listings = [
  {
    image: detailcard1,
    title: "Apartment in Islamabad",
    rating: "4.93",
    description: "Modern Studio in Central Islamabad",
    details: "1 bedroom · 1 bed · 1 bath",
    date: "Aug 7 – 9",
    price: "$119",
  },
  {
    image: detailcard2,
    title: "Apartment in Islamabad",
    rating: "5.0",
    description: "Luxury Apartment in F-6",
    details: "2 bedrooms · 2 beds · 2 baths",
    date: "Aug 7 – 9",
    price: "$230",
  },
{
  image: detailcard3,
  title: "Cabin in Islamabad",
  rating: "5.0",
  description: "The Lair",
  details: "1 bedroom · 1 king bed · 1 bath",
  date: "Aug 14 – 16",
  price: "$119",
},
{
  image: detailcard4,
  title: "Apartment in Islamabad",
  rating: "5.0",
  description: "The Curated Stay - 1BKH Flat in Islamabad",
  details: "1 bedroom · 1 double bed · 1 bath",
  date: "Aug 7 – 9",
  price: "$54",
},


];



function ImageGallery({
  property,
  selectedPrice,
  setSelectedPrice,
  selectedType,
  setSelectedType,
}) {

  const [openFilter, setOpenFilter] = useState(null);

   const filteredListings = listings.filter((item) => {

    const price = Number(item.price.replace("$", ""));

    const priceMatch =
      selectedPrice === "all" ||
      (selectedPrice === "low" && price < 100) ||
      (selectedPrice === "high" && price >= 100);

    const typeMatch =
      selectedType === "all" ||
      item.title.includes(selectedType);

    return priceMatch && typeMatch;
  });
  return (
   <div className="mt-2">

  <h2 className="mb-2 text-[26px] font-semibold text-[#222222]">
    Over 1,000 homes in Islamabad
  </h2>







{openFilter === "Price" && (
  <div className="absolute left-0 top-[70px] z-50 w-[380px] rounded-[24px] bg-white p-6 shadow-2xl border">

    <h3 className="text-[22px] font-semibold">
      Price range
    </h3>

    <p className="mt-2 text-[14px] text-[#6A6A6A]">
      Nightly prices before fees and taxes
    </p>

    <div className="mt-8 h-[4px] rounded-full bg-gray-300">
      <div className="h-full w-[45%] rounded-full bg-black"></div>
    </div>

    <div className="mt-8 flex gap-4">

      <div className="flex-1 rounded-xl border p-3">
        <p className="text-[12px] text-gray-500">
          Minimum
        </p>

        <h4 className="text-lg font-semibold">
          $0
        </h4>
      </div>

      <div className="flex-1 rounded-xl border p-3">
        <p className="text-[12px] text-gray-500">
          Maximum
        </p>

        <h4 className="text-lg font-semibold">
          $1000+
        </h4>
      </div>

    </div>

    <div className="mt-8 flex justify-between">

      <button
        className="underline"
        onClick={() => setOpenFilter(null)}
      >
        Clear
      </button>

      <button
        className="rounded-lg bg-black px-6 py-3 text-white"
        onClick={() => setOpenFilter(null)}
      >
        Save
      </button>

    </div>

  </div>
)}


  <div className="relative flex rounded-[24px] bg-white p-4 shadow-md h-[230px] w-[660px]">
        {/* Left Image */}
        <div>
<div className="relative">
<div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-[#222222] shadow-md">
  Guest favorite
</div>


  <img
src={property.image}
    alt="Room"
 className="h-[198px] w-[230px] rounded-[18px] object-cover"
  />

</div>
        </div>

        <div className="ml-5 flex flex-col justify-center">
<h2 className="text-[22px] font-semibold text-[#222222]">
 {property.title}
</h2>

<p className="mt-2 text-[15px] text-[#6A6A6A]">
 {property.description}
</p>

<p className="mt-1 text-[15px] text-[#6A6A6A]">
{property.details}
</p>

<p className="mt-5 text-[15px] text-[#6A6A6A]">
 {property.date}
</p>

<div className="mt-6 flex items-center justify-between">

  {/* Price */}
  <p className="text-[16px] font-semibold text-[#222222]">
   {property.price} <span className="font-normal">for 2 nights</span>
  </p>

  {/* Rating */}
  <div className="flex items-center gap-1">
    <span className="text-[14px]">★</span>
    <span className="text-[15px] font-medium text-[#222222]">
      {property.rating}
    </span>
    <span className="text-[15px] text-[#6A6A6A]">
      (140)
    </span>
  </div>

</div>
</div>
        <div>

        </div>

       <button
  className="absolute top-5 right-5 text-[28px] text-[#222222] bg-transparent border-none cursor-pointer"
>
  ♡
</button>
        <div>

        </div>

      </div>
{/* Image Listings */}
<div className="mt-8 w-[660px] grid grid-cols-2 gap-x-6 gap-y-8">
  {filteredListings.map((item, index) => (
    <div key={index} className="w-[310px]">

      <img
        src={item.image}
        alt={item.title}
        className="h-[270px] w-full rounded-[20px] object-cover"
      />

      <div className="mt-3 flex items-start justify-between">
        <h3 className="text-[18px] font-semibold text-[#222222]">
          {item.title}
        </h3>

        <div className="flex items-center gap-1">
          <span>★</span>
          <span>{item.rating}</span>
        </div>
      </div>

      <p className="text-[15px] text-[#6A6A6A]">
        {item.description}
      </p>

      <p className="text-[15px] text-[#6A6A6A]">
        {item.details}
      </p>

      <p className="text-[15px] text-[#6A6A6A]">
        {item.date}
      </p>

      <p className="mt-2 text-[16px] font-semibold">
        {item.price}
        <span className="font-normal"> for 2 nights</span>
      </p>

    </div>
  ))}
</div>
    </div>
  );
}

export default ImageGallery;