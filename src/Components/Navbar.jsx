import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";

import UserMenu from "./UserMenu";
import { cityFromDestination } from "../data/destinations";

import logo from "../assests/airbnblogo.png";
import all from "../assests/all.jfif";
import home from "../assests/home.png";
import experience from "../assests/experiences.jpg";
import service from "../assests/services.jfif";

// Icon size classes differ per tab because the source images have different padding.
export const NAV_TABS = [
  {
    to: "/",
    label: "All",
    icon: all,
    end: true,
    iconClass:
      "w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] lg:w-[36px] lg:h-[36px] mix-blend-multiply",
  },
  {
    to: "/homes",
    label: "Homes",
    icon: home,
    iconClass: "w-[42px] h-[42px]",
  },
  {
    to: "/experiences",
    label: "Experiences",
    icon: experience,
    iconClass:
      "w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] lg:w-[42px] lg:h-[42px]",
  },
  {
    to: "/services",
    label: "Services",
    icon: service,
    iconClass:
      "w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] lg:w-[40px] lg:h-[40px]",
  },
];

function NavTab({ tab, active }) {
  const controls = useAnimation();

  // Small "pop" on the icon each time the tab becomes active.
  useEffect(() => {
    if (!active) return;

    const play = async () => {
      await controls.start({ scale: 1.18, transition: { duration: 0.19 } });
      await controls.start({ scale: 1, transition: { duration: 0.19 } });
    };
    play();
  }, [active, controls]);

  return (
    <NavLink
      to={tab.to}
      end={tab.end}
      className="relative flex h-[42px] items-center gap-[4px] text-black no-underline sm:gap-[6px] lg:gap-[7px]"
    >
      <motion.img
        src={tab.icon}
        alt=""
        whileHover={{ scale: 1.15 }}
        animate={controls}
        className={`object-contain ${tab.iconClass}`}
      />

      <span
        className={`mt-[2px] text-[11px] leading-[20px] sm:text-[12px] lg:text-[14px] ${
          active
            ? "font-semibold text-[#222222]"
            : "font-[550] text-[#6A6A6A]"
        }`}
      >
        {tab.label}
      </span>

      {active && (
        <motion.div
          layoutId="activeLine"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="absolute -bottom-2 h-[4px] w-full rounded-full bg-black"
        />
      )}
    </NavLink>
  );
}

// The little summary pill shown instead of the big search bar once the page
// has been scrolled. Clicking it brings the full search bar back.
function CompactSearchPill({ onClick }) {
  const search = useSelector((state) => state.search);

  const city = cityFromDestination(search.location);
  const guests = search.adults + search.children + search.infants;

  const dates = search.startDate
    ? `${search.startDate.format("D MMM")}${
        search.endDate ? ` – ${search.endDate.format("D MMM")}` : ""
      }`
    : "Any week";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[48px] items-center rounded-full border border-[#dddddd] bg-white pl-5 pr-2 shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition hover:shadow-[0_3px_12px_rgba(0,0,0,0.16)]"
    >
      <span className="px-3 text-[14px] font-semibold text-[#222222]">
        {city || "Anywhere"}
      </span>
      <span className="h-[24px] w-px bg-[#dddddd]" />
      <span className="px-3 text-[14px] font-semibold text-[#222222]">
        {dates}
      </span>
      <span className="h-[24px] w-px bg-[#dddddd]" />
      <span className="px-3 text-[14px] text-[#6A6A6A]">
        {guests > 0 ? `${guests} guest${guests === 1 ? "" : "s"}` : "Add guests"}
      </span>
      <span className="ml-1 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#E31C5F] text-white">
        <FiSearch size={16} strokeWidth={3} />
      </span>
    </button>
  );
}

// Desktop top bar. `compact` swaps the tabs for the search summary pill.
function Navbar({ compact = false, onExpandSearch }) {
  const location = useLocation();

  return (
    <header
      className="
        relative
        hidden
        h-[72px]
        items-center
        justify-between
        bg-[#fafafa]
        px-6
        md:flex
        md:h-[88px]
        lg:px-8
        xl:px-10
      "
    >
      {/* Left */}
      <Link to="/" className="flex items-center gap-1 text-[#ff385c]">
        <img
          src={logo}
          alt="Airbnb Logo"
          className="w-[32px] md:w-[36px] lg:w-[40px]"
        />
        <span className="hidden text-[25px] font-semibold tracking-[-1px] text-[#FF385C] md:block">
          airbnb
        </span>
      </Link>

      {/* Center */}
      <div className="absolute left-[49%] flex -translate-x-1/2 items-center gap-5 lg:gap-[25px] xl:gap-[30px]">
        {compact ? (
          <CompactSearchPill onClick={onExpandSearch} />
        ) : (
          NAV_TABS.map((tab) => (
            <NavTab
              key={tab.to}
              tab={tab}
              active={
                tab.end
                  ? location.pathname === tab.to
                  : location.pathname.startsWith(tab.to)
              }
            />
          ))
        )}
      </div>

      {/* Right */}
      <UserMenu />
    </header>
  );
}

export default Navbar;
