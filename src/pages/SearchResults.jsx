import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchListings from "../fetchListings";
import logo from "../assests/airbnblogo.png";

import homeiconimg from "../assests/homeiconimg.avif";
import {
  FiSliders,
  FiHeart,
  FiChevronRight,
  FiChevronLeft,
  FiMap,
  FiGlobe,
  FiMenu,
  FiSearch,
} from "react-icons/fi";

function SearchResults() {
  const search = useSelector((state) => state.search);

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getListings = async () => {
      const data = await fetchListings();
      setListings(data);
    };

    getListings();
  }, []);

  const totalGuests =
    search.adults +
    search.children +
    search.infants;

const filteredListings = listings.filter((listing) => {
  if (!search.location) return true;

  const selectedLocation = search.location
    .toLowerCase()
    .split(",")[0]
    .trim();

  const listingLocation = listing.location
    ?.toLowerCase()
    .trim();

  return listingLocation === selectedLocation;
});


  const dateText = search.startDate
    ? `${search.startDate.format("DD MMM")}${
        search.endDate
          ? ` – ${search.endDate.format("DD MMM")}`
          : ""
      }`
    : "Any dates";

 return (
  <div className="w-full bg-white">

{/* SEARCH RESULTS NAVBAR */}
<div className="w-full bg-white">
  <div className="relative mx-auto flex h-[80px] max-w-[1800px] items-center px-6 lg:px-10">

    {/* LEFT - LOGO */}
   <div className="flex items-center gap-2 shrink-0">
  <img
    src={logo}
    alt="Airbnb"
    className="h-[36px] w-auto object-contain"
  />

  <span className="hidden text-[24px] font-semibold tracking-[-1px] text-[#FF385C] sm:block">
    airbnb
  </span>
</div>


    {/* CENTER - SEARCH BAR */}
    <div
      className="
        absolute left-1/2 top-1/2
        flex -translate-x-1/2 -translate-y-1/2
        items-center
        h-[52px]
      
        rounded-full
        border border-[#dddddd]
        bg-white
        shadow-[0_2px_8px_rgba(0,0,0,0.12)]
        hover:shadow-[0_3px_10px_rgba(0,0,0,0.16)]
        transition
      "
    >

      {/* WHERE */}
  <div className="flex min-w-[115px] items-center gap-1 px-2 py-2">
  <img
    src={homeiconimg}
    alt="home"
    className="h-16 w-14 shrink-0 object-contain"
  />

  <p className="max-w-[140px] truncate text-[14px] font-medium text-[#222222]">
   {search.location
  ? `Homes in ${search.location.split(",")[0].trim()}`
  : "Homes anywhere"}
  </p>

</div>


      {/* DIVIDER */}
      <div className="h-[30px] w-px bg-[#dddddd]" />


      {/* WHEN */}
    <div className="min-w-[105px] px-3 py-2">
  <p className="text-[14px] font-medium text-[#222222]">
    {dateText}
  </p>
</div>


      {/* DIVIDER */}
   
<div className="ml-2 mr-0 h-[30px] w-px shrink-0 bg-[#dddddd]" />
      {/* WHO */}
  <div className="flex items-center gap-4 px-4 py-2">
  <p className="whitespace-nowrap text-[14px] font-medium text-[#222222]">
    {totalGuests > 0
      ? `${totalGuests} guests`
      : "Add guests"}
  </p>

  <button
    className="
      flex h-[42px] w-[42px]
      shrink-0
      items-center justify-center
      rounded-full
      bg-[#E31C5F]
      text-white
      transition
      hover:bg-[#d41450]
    "
  >
    <FiSearch size={20} strokeWidth={2.5} />
  </button>
</div>
      </div>



    {/* RIGHT SIDE */}
    <div className="ml-auto flex items-center gap-2">

      {/* BECOME A HOST */}
      <button
        className="
          hidden
          rounded-full
          px-4 py-3
          text-[14px]
          font-semibold
          hover:bg-[#f7f7f7]
          md:block
        "
      >
        Become a host
      </button>


      {/* GLOBE */}
      <button
        className="
          flex h-[42px] w-[42px]
          items-center justify-center
          rounded-full
          bg-[#f7f7f7]
          hover:bg-[#f7f7f7]
        "
      >
        <FiGlobe size={19} />
      </button>


      {/* MENU */}
      <button
        className="
          flex h-[42px] w-[42px]
          items-center justify-center
          rounded-full
          bg-[#f7f7f7]
          hover:bg-[#eeeeee]
        "
      >
        <FiMenu size={20} />
      </button>

    </div>

  </div>
</div>

 


    


      {/* FILTER BAR */}
      <div className="border-b border-[#dddddd]">
      <div className="mx-auto flex max-w-[1800px] items-center justify-center gap-3 px-6 py-3">

          <button className="flex shrink-0 items-center gap-2 rounded-full border border-[#222222] px-4 py-2 text-[13px] font-medium">
            <FiSliders size={17} />
            Filters
          </button>

          <button className="shrink-0 rounded-full border border-[#dddddd] px-4 py-2 text-[12px]">
            Self check-in
          </button>

          <button className="shrink-0 rounded-full border border-[#dddddd] px-4 py-2 text-[13px]">
            2+ bedrooms
          </button>

          <button className="shrink-0 rounded-full border border-[#dddddd] px-4 py-2 text-[13px]">
            Instant Book
          </button>

          <button className="shrink-0 rounded-full border border-[#dddddd] px-4 py-2 text-[13px]">
            Free parking
          </button>

          <button className="shrink-0 rounded-full border border-[#dddddd] px-4 py-2 text-[13px]">
            Air conditioning
          </button>

          <button className="shrink-0 rounded-full border border-[#dddddd] px-4 py-2 text-[13px]">
            2+ beds
          </button>

          <button className="shrink-0 rounded-full border border-[#dddddd] px-4 py-2 text-[13px]">
            Kitchen
          </button>

          <button className="shrink-0 rounded-full border border-[#dddddd] px-4 py-2 text-[13px]">
            Wifi
          </button>

          <button className="shrink-0 rounded-full border border-[#dddddd] px-4 py-2 text-[13px]">
            TV
          </button>

          <button className="shrink-0 rounded-full border border-[#dddddd] px-4 py-2 text-[13px]">
            Guest favorite
          </button>

        </div>
      </div>


      {/* MAIN CONTENT */}
      <div className="mx-auto flex max-w-[1600px]">

        {/* LEFT LISTINGS */}
        <div className="w-full px-6 py-8 lg:w-[62%]">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h1 className="text-[24px] font-semibold">
                Over 1,000 homes in{" "}
                {search.location || "your area"}
              </h1>

              <p className="mt-2 text-[14px] text-[#717171]">
                Prices include all fees
              </p>
            </div>

          </div>


          {/* LISTING GRID */}
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">

           {filteredListings.map((listing) => (

              <div
                key={listing.id}
                className="group cursor-pointer"
              >

                {/* IMAGE */}
                <div className="relative aspect-[1.05/1] overflow-hidden rounded-[18px] bg-[#eeeeee]">

                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />

                  {/* FAVORITE */}
                  <button
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-white"
                  >
                    <FiHeart
                      size={26}
                      strokeWidth={2}
                      className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                    />
                  </button>

                  {/* GUEST FAVORITE */}
                  {listing.guestFavorite && (
                    <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-[13px] font-semibold shadow-sm">
                      Guest favorite
                    </div>
                  )}

                  {/* ARROWS */}
                  <button className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white opacity-0 shadow-sm transition group-hover:opacity-100">
                    <FiChevronLeft size={16} />
                  </button>

                  <button className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white opacity-0 shadow-sm transition group-hover:opacity-100">
                    <FiChevronRight size={16} />
                  </button>

                </div>


                {/* DETAILS */}
                <div className="px-1 pt-3">

                  <div className="flex items-start justify-between gap-3">

                    <h2 className="text-[16px] font-medium">
                      {listing.title}
                    </h2>

                    <div className="flex shrink-0 items-center gap-1 text-[14px]">
                      <span>★</span>
                      <span>{listing.rating}</span>
                    </div>

                  </div>

                  <p className="mt-1 text-[15px] text-[#717171]">
                    {listing.location}
                  </p>

                  <p className="mt-1 text-[15px] text-[#717171]">
                    Available for your trip
                  </p>

                  <p className="mt-2 text-[15px]">
                    <span className="font-semibold">
                      {listing.price}
                    </span>
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* MAP AREA */}
        <div className="sticky top-0 hidden h-[calc(100vh-140px)] w-[38%] lg:block">

          <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#e8eee4]">

            {/* TEMPORARY MAP */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#e7eedf]">

              <div className="text-center">

                <FiMap
                  size={55}
                  className="mx-auto mb-4 text-[#555555]"
                />

                <p className="text-[20px] font-semibold">
                  Map
                </p>

                <p className="mt-1 text-[14px] text-[#717171]">
                  {search.location || "Your search area"}
                </p>

              </div>

            </div>


            {/* MAP BUTTON */}
            <button className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#222222] px-5 py-3 text-[14px] font-semibold text-white shadow-lg">
              Show map
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SearchResults;