import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Navbar, { NAV_TABS } from "./Navbar";
import SearchBar from "./SearchBar";
import useMediaQuery from "../hooks/useMediaQuery";

// Pages that draw their own header (or need none).
const PAGES_WITHOUT_HEADER = [
  "/search",
  "/profile",
  "/wishlists",
  "/listing/",
  "/property/",
  "/experience/",
  "/service/",
  "/book/",
];

// Phones: the search pill with the Homes / Experiences / Services tabs below it.
function MobileHeader() {
  return (
    <div className="w-full border-b-2 border-[#ebebeb] bg-[#fafafa]">
      <SearchBar />

      <nav className="flex items-end justify-around px-2 pb-3">
        {NAV_TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `relative flex flex-1 flex-col items-center gap-1 pb-2 ${
                isActive ? "text-[#222222]" : "text-[#6A6A6A]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={tab.icon}
                  alt=""
                  className="h-[34px] w-[34px] object-contain mix-blend-multiply"
                />
                <span
                  className={`text-[12px] ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 h-[3px] w-full max-w-[64px] rounded-full bg-black" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

// Desktop: the header is fixed to the top. After scrolling it shrinks to a
// small search pill (like Airbnb); clicking the pill opens the full bar again.
function DesktopHeader() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40);
  const [expanded, setExpanded] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const innerRef = useRef(null);
  const expandedRef = useRef(false);

  expandedRef.current = expanded;
  const compact = scrolled && !expanded;

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);

      // Scrolling closes the expanded search bar again.
      if (!isScrolled || expandedRef.current) setExpanded(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Because the header is fixed it doesn't take space in the page, so keep an
  // empty spacer as tall as the full header. That way the content below never
  // jumps when the header shrinks.
  useLayoutEffect(() => {
    if (compact) return undefined;

    const element = innerRef.current;
    const measure = () => setSpacerHeight(element.offsetHeight);

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [compact]);

  return (
    <>
      <div style={{ height: spacerHeight }} className="bg-[#fafafa]" />

      {expanded && (
        <div
          className="fixed inset-0 z-40 bg-black/25"
          onClick={() => setExpanded(false)}
        />
      )}

      <div
        ref={innerRef}
        className={`
          fixed inset-x-0 top-0 z-50
          border-b-2 border-[#ebebeb] bg-[#fafafa]
          shadow-[0_1px_3px_rgba(0,0,0,0.05)]
          ${compact ? "" : "pb-[30px] lg:pb-[35px]"}
        `}
      >
        <Navbar compact={compact} onExpandSearch={() => setExpanded(true)} />
        {!compact && <SearchBar />}
      </div>
    </>
  );
}

function Header() {
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (PAGES_WITHOUT_HEADER.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return isDesktop ? <DesktopHeader /> : <MobileHeader />;
}

export default Header;
