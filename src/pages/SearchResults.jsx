import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMap, FiList, FiSliders } from "react-icons/fi";

import { getListings } from "../services/listings";
import { setLocation } from "../redux/searchSlice";
import { cityFromDestination } from "../data/destinations";
import { listingImages } from "../data/listingsData";
import {
  DEFAULT_FILTERS,
  applyFilters,
  countActiveFilters,
  filterByLocation,
} from "../utils/searchFilters";
import { useFavorites } from "../FavoritesContext";

import ListingHeader from "../Components/ListingHeader";
import SearchBar from "../Components/SearchBar";
import ImageCarousel from "../Components/ImageCarousel";
import HeartButton from "../Components/HeartButton";
import SearchMap from "../Components/SearchMap";
import SearchFiltersModal from "../Components/SearchFiltersModal";
import useMediaQuery from "../hooks/useMediaQuery";

// Quick filter buttons under the header. Each one flips part of the filters.
const QUICK_FILTERS = [
  {
    label: "Guest favorite",
    isOn: (f) => f.guestFavorite,
    toggle: (f) => ({ ...f, guestFavorite: !f.guestFavorite }),
  },
  {
    label: "Rooms",
    isOn: (f) => f.type === "room",
    toggle: (f) => ({ ...f, type: f.type === "room" ? "any" : "room" }),
  },
  {
    label: "Entire homes",
    isOn: (f) => f.type === "home",
    toggle: (f) => ({ ...f, type: f.type === "home" ? "any" : "home" }),
  },
  {
    label: "Hotels",
    isOn: (f) => f.type === "hotel",
    toggle: (f) => ({ ...f, type: f.type === "hotel" ? "any" : "hotel" }),
  },
  {
    label: "4.9+ rating",
    isOn: (f) => f.minRating === 4.9,
    toggle: (f) => ({ ...f, minRating: f.minRating === 4.9 ? 0 : 4.9 }),
  },
  {
    label: "Under $60",
    isOn: (f) => f.maxPrice === 60 && f.minPrice === 0,
    toggle: (f) =>
      f.maxPrice === 60 && f.minPrice === 0
        ? { ...f, maxPrice: 0 }
        : { ...f, minPrice: 0, maxPrice: 60 },
  },
];

function ResultCard({ listing, isHovered, onHover }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const key = String(listing.id);

  // Show the card's own photo first, then the rest of the photos of the stay.
  const gallery = (listingImages[listing.id] || []).map((image) => image.url);
  const images = [
    listing.image,
    ...gallery.filter((url) => url !== listing.image),
  ];

  return (
    <Link
      to={`/listing/${listing.id}`}
      onMouseEnter={() => onHover(listing.id)}
      onMouseLeave={() => onHover(null)}
      className={`block rounded-[18px] transition ${
        isHovered ? "ring-2 ring-[#222222]/10" : ""
      }`}
    >
      <ImageCarousel
        images={images}
        alt={listing.title}
        className="aspect-[1.05/1] rounded-[18px]"
      >
        {listing.guestFavorite && (
          <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-[13px] font-semibold shadow-sm">
            Guest favorite
          </div>
        )}

        <HeartButton
          size={28}
          saved={isFavorite(key)}
          onClick={() => toggleFavorite(key)}
          className="absolute right-3 top-3 z-10"
        />
      </ImageCarousel>

      <div className="px-1 pt-3">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[16px] font-medium">{listing.title}</h2>

          <div className="flex shrink-0 items-center gap-1 text-[14px]">
            <span>★</span>
            <span>{listing.rating}</span>
          </div>
        </div>

        <p className="mt-1 text-[15px] text-[#717171]">{listing.location}</p>

        <p className="mt-2 text-[15px] font-semibold">{listing.price}</p>
      </div>
    </Link>
  );
}

function SearchResults() {
  const dispatch = useDispatch();
  const routerLocation = useLocation();
  const [params] = useSearchParams();
  const search = useSelector((state) => state.search);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false); // phones only
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    document.title = "Search results - Airbnb";
  }, []);

  // A link like /search?location=Lahore (from a home page row) sets the city.
  useEffect(() => {
    const fromLink = params.get("location");
    if (fromLink) dispatch(setLocation(fromLink));
    // Only when the page opens – after that the search bar is in charge.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cancelled = false;

    getListings()
      .catch((error) => {
        console.error("Error fetching listings:", error);
        return [];
      })
      .then((data) => {
        if (!cancelled) {
          setListings(data);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Clicking "Search" inside the expanded search bar closes it.
  useEffect(() => {
    setSearchOpen(false);
  }, [routerLocation.key]);

  const inCity = useMemo(
    () => filterByLocation(listings, search.location),
    [listings, search.location]
  );

  const results = useMemo(
    () => applyFilters(inCity, filters),
    [inCity, filters]
  );

  const countResults = useCallback(
    (draft) => applyFilters(inCity, draft).length,
    [inCity]
  );

  const closeFilters = useCallback(() => setFiltersOpen(false), []);

  const city = cityFromDestination(search.location);
  const activeCount = countActiveFilters(filters);

  const heading = loading
    ? "Searching…"
    : `${results.length} ${results.length === 1 ? "stay" : "stays"} ${
        city ? `in ${city}` : "to explore"
      }`;

  const chipClass = (active) =>
    `shrink-0 rounded-full border px-4 py-2 text-[13px] transition ${
      active
        ? "border-[#222222] bg-[#f7f7f7] font-semibold"
        : "border-[#dddddd] hover:border-[#222222]"
    }`;

  return (
    <div className="w-full bg-white">
      <div className="sticky top-0 z-40 bg-white">
        <ListingHeader
          maxWidth="max-w-[1800px]"
          onSearchClick={() => setSearchOpen((open) => !open)}
        />

        {/* Desktop: the pill in the header opens the full search bar here */}
        {isDesktop && searchOpen && (
          <div className="border-b border-[#dddddd] bg-[#fafafa] pb-6 pt-2">
            <SearchBar />
          </div>
        )}

        <div className="border-b border-[#dddddd] bg-white">
          <div className="scrollbar-hide mx-auto flex max-w-[1800px] items-center gap-3 overflow-x-auto px-6 py-3 lg:justify-center">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium ${
                activeCount > 0 ? "border-[#222222] bg-[#f7f7f7]" : "border-[#222222]"
              }`}
            >
              <FiSliders size={16} />
              Filters
              {activeCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#222222] text-[11px] text-white">
                  {activeCount}
                </span>
              )}
            </button>

            {QUICK_FILTERS.map((quick) => (
              <button
                type="button"
                key={quick.label}
                aria-pressed={quick.isOn(filters)}
                onClick={() => setFilters(quick.toggle)}
                className={chipClass(quick.isOn(filters))}
              >
                {quick.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1800px]">
        {/* LIST */}
        <div className="w-full px-6 py-8 lg:w-[62%] xl:w-[60%]">
          <div className="mb-6">
            <h1 className="text-[22px] font-semibold sm:text-[24px]">
              {heading}
            </h1>
            <p className="mt-1 text-[14px] text-[#717171]">
              {search.startDate
                ? `${search.startDate.format("MMM D")}${
                    search.endDate ? ` – ${search.endDate.format("MMM D")}` : ""
                  } · `
                : ""}
              Prices shown are for 2 nights
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} aria-hidden="true">
                  <div className="aspect-[1.05/1] animate-pulse rounded-[18px] bg-[#ececec]" />
                  <div className="mt-3 h-[14px] w-2/3 animate-pulse rounded bg-[#ececec]" />
                  <div className="mt-2 h-[12px] w-1/3 animate-pulse rounded bg-[#ececec]" />
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="max-w-[460px] py-10">
              <h2 className="text-[22px] font-semibold">
                {inCity.length === 0 && city
                  ? `We don't have stays in ${city} yet`
                  : "No exact matches"}
              </h2>
              <p className="mt-2 text-[16px] text-[#6a6a6a]">
                {inCity.length === 0 && city
                  ? "Try another destination or look at everything we have."
                  : "Try changing or removing some of your filters."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="rounded-[10px] bg-[#222222] px-5 py-3 text-[15px] font-semibold text-white hover:bg-black"
                  >
                    Clear filters
                  </button>
                )}

                {city && (
                  <button
                    type="button"
                    onClick={() => dispatch(setLocation(""))}
                    className="rounded-[10px] border border-[#222222] px-5 py-3 text-[15px] font-semibold hover:bg-[#f7f7f7]"
                  >
                    Show all stays
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">
              {results.map((listing) => (
                <ResultCard
                  key={listing.id}
                  listing={listing}
                  isHovered={hoveredId === listing.id}
                  onHover={setHoveredId}
                />
              ))}
            </div>
          )}
        </div>

        {/* MAP (desktop) */}
        {isLarge && (
          <div className="sticky top-[150px] h-[calc(100vh-150px)] flex-1 py-4 pr-6">
            <div className="h-full overflow-hidden rounded-[20px]">
              <SearchMap listings={results} hoveredId={hoveredId} />
            </div>
          </div>
        )}
      </div>

      {/* MAP (phones): full-screen overlay */}
      {!isLarge && mapOpen && (
        <div className="fixed inset-0 z-[1000] bg-white">
          <SearchMap listings={results} hoveredId={hoveredId} />
        </div>
      )}

      {!isLarge && (
        <button
          type="button"
          onClick={() => setMapOpen((open) => !open)}
          className="fixed bottom-[76px] left-1/2 z-[1200] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#222222] px-5 py-3 text-[14px] font-semibold text-white shadow-lg md:bottom-8"
        >
          {mapOpen ? <FiList size={16} /> : <FiMap size={16} />}
          {mapOpen ? "Show list" : "Map"}
        </button>
      )}

      {filtersOpen && (
        <SearchFiltersModal
          filters={filters}
          onApply={setFilters}
          onClose={closeFilters}
          countResults={countResults}
        />
      )}
    </div>
  );
}

export default SearchResults;
