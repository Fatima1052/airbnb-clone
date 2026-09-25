import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";

import UserMenu from "./UserMenu";
import MobileSearchSheet from "./MobileSearchSheet";
import { cityFromDestination } from "../data/destinations";

import logo from "../assests/airbnblogo.png";
import homeIcon from "../assests/homedetailpageicon.avif";

// Compact white header used on every "inner" page (listing details, wishlists,
// experiences, checkout). Shows what the visitor searched for.
//   onSearchClick: what clicking the search summary does (default: go to /homes)
function ListingHeader({ maxWidth = "max-w-[1280px]", onSearchClick }) {
  const navigate = useNavigate();
  const search = useSelector((state) => state.search);
  const [sheetOpen, setSheetOpen] = useState(false);

  const city = cityFromDestination(search.location);
  const guests = search.adults + search.children + search.infants;
  const dates = search.startDate
    ? `${search.startDate.format("D MMM")}${
        search.endDate ? ` – ${search.endDate.format("D MMM")}` : ""
      }`
    : "";

  const cityText = city || "Anywhere";
  const datesText = dates || "Anytime";
  const guestsText =
    guests > 0 ? `${guests} guest${guests === 1 ? "" : "s"}` : "Add guests";

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9d9d9] bg-white">
      <div
        className={`relative mx-auto flex h-[80px] w-full ${maxWidth} items-center justify-between px-5 md:px-8`}
      >
        {/* LOGO */}
        <Link to="/" className="flex shrink-0 items-center">
          <img src={logo} alt="Airbnb" className="h-[34px] w-auto sm:h-[38px]" />
          <span className="ml-2 hidden text-[23px] font-semibold tracking-[-1px] text-[#FF385C] lg:block">
            airbnb
          </span>
        </Link>

        {/* SEARCH SUMMARY */}
        <button
          type="button"
          onClick={onSearchClick || (() => navigate("/homes"))}
          aria-label="Change your search"
          className="absolute left-1/2 hidden h-[52px] -translate-x-1/2 items-center rounded-full border border-[#dddddd] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_3px_12px_rgba(0,0,0,0.16)] md:flex"
        >
          <img
            src={homeIcon}
            alt=""
            className="h-[49px] w-[49px] shrink-0 object-cover"
          />

          <span className="border-r border-[#dddddd] pr-5 text-[14px] font-semibold text-[#222222]">
            {cityText}
          </span>
          <span className="border-r border-[#dddddd] px-5 text-[14px] font-semibold text-[#222222]">
            {datesText}
          </span>
          <span className="flex items-center gap-4 px-4 text-[14px] font-semibold text-[#555555]">
            {guestsText}
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#FF385C] text-white">
              <FiSearch size={16} />
            </span>
          </span>
        </button>

        {/* MENU */}
        <UserMenu />
      </div>

      {/* MOBILE SEARCH */}
      <div className="px-4 pb-3 md:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex w-full items-center gap-3 rounded-full border border-[#dddddd] bg-white px-4 py-3 text-left shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        >
          <FiSearch size={18} />

          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#222222]">
              Where to?
            </p>
            <p className="mt-0.5 truncate text-[11px] text-[#717171]">
              {cityText} · {datesText} · {guestsText}
            </p>
          </div>
        </button>
      </div>

      {sheetOpen && <MobileSearchSheet onClose={() => setSheetOpen(false)} />}
    </header>
  );
}

export default ListingHeader;
