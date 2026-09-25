import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import PropertyCard, { PropertyCardSkeleton } from "./PropertyCard";

const arrowBase =
  "flex h-[33px] w-[33px] items-center justify-center rounded-full transition";
const arrowOn =
  "cursor-pointer bg-[#f2f2f2] text-[#222222] hover:bg-[#e5e5e5]";
const arrowOff = "cursor-not-allowed bg-[#f7f7f7] text-[#b0b0b0]";

// A titled, horizontally scrolling row of cards.
//   kind:      "home" | "experience" | "service"
//   loading:   show placeholder cards while data is being fetched
//   viewAllTo: where the round arrow next to the title goes. For homes it
//              defaults to the search page for that city.
function Listings({
  title,
  subtitle,
  listings = [],
  kind = "home",
  loading = false,
  viewAllTo,
}) {
  const sliderRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const firstLocation = listings[0]?.location;
  const arrowTarget =
    viewAllTo ??
    (kind === "home" && firstLocation
      ? `/search?location=${encodeURIComponent(firstLocation)}`
      : null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return undefined;

    const checkScrollPosition = () => {
      setIsAtStart(slider.scrollLeft <= 0);
      setIsAtEnd(
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 4
      );
    };

    checkScrollPosition();
    slider.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      slider.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [listings.length, loading]);

  const scrollBySlide = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * slider.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  if (!loading && listings.length === 0) return null;

  return (
    <section
      className="
        px-4
        sm:px-6
        md:px-8
        lg:px-[32px]
        pt-6
        pb-2
      "
    >
      <div className="mb-[25px] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2
              className="
                m-0 text-[18px]
                sm:text-[22px]
                md:text-[25px] font-semibold text-[#222222]
              "
            >
              {title}
            </h2>

            {arrowTarget && (
              <Link
                to={arrowTarget}
                aria-label={`See all: ${title}`}
                className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full bg-[#f2f2f2] transition hover:bg-[#e5e5e5]"
              >
                <FiArrowRight />
              </Link>
            )}
          </div>

          {subtitle && (
            <p
              className="
                mt-[6px] text-[13px]
                sm:text-[14px]
                md:text-[16px] text-[#6a6a6a]
              "
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="hidden md:flex gap-[10px]">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBySlide(-1)}
            disabled={isAtStart}
            className={`${arrowBase} ${isAtStart ? arrowOff : arrowOn}`}
          >
            <FiChevronLeft />
          </button>

          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBySlide(1)}
            disabled={isAtEnd}
            className={`${arrowBase} ${isAtEnd ? arrowOff : arrowOn}`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="
          w-full
          flex
          gap-4
          overflow-x-auto
          scroll-smooth
          scrollbar-hide
        "
      >
        {loading
          ? Array.from({ length: 6 }, (_, index) => (
              <PropertyCardSkeleton key={index} />
            ))
          : listings.map((listing) => (
              <PropertyCard
                key={`${kind}-${listing.id}`}
                kind={kind}
                id={listing.id}
                image={listing.image}
                title={listing.title}
                price={listing.price}
                rating={listing.rating}
                guestFavorite={listing.guestFavorite}
                original={listing.original}
                popular={listing.popular}
              />
            ))}
      </div>
    </section>
  );
}

export default Listings;
