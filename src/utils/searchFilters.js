import { parsePrice, stayType } from "../data/catalog";
import { cityFromDestination } from "../data/destinations";

export const DEFAULT_FILTERS = {
  type: "any", // any | room | home | hotel
  minPrice: 0,
  maxPrice: 0, // 0 = no upper limit
  minRating: 0,
  guestFavorite: false,
};

// How many filters differ from the defaults (shown as a badge on "Filters").
export function countActiveFilters(filters) {
  let count = 0;
  if (filters.type !== "any") count += 1;
  if (filters.minPrice > 0 || filters.maxPrice > 0) count += 1;
  if (filters.minRating > 0) count += 1;
  if (filters.guestFavorite) count += 1;
  return count;
}

// Listings in the searched city (all of them when no city was chosen).
export function filterByLocation(listings, destination) {
  const city = cityFromDestination(destination).toLowerCase();
  if (!city) return listings;

  return listings.filter(
    (listing) => (listing.location || "").trim().toLowerCase() === city
  );
}

export function applyFilters(listings, filters) {
  return listings.filter((listing) => {
    if (filters.type !== "any" && stayType(listing) !== filters.type) {
      return false;
    }

    const price = parsePrice(listing.price);
    if (filters.minPrice > 0 && price < filters.minPrice) return false;
    if (filters.maxPrice > 0 && price > filters.maxPrice) return false;

    if (filters.minRating > 0 && Number(listing.rating) < filters.minRating) {
      return false;
    }

    if (filters.guestFavorite && !listing.guestFavorite) return false;

    return true;
  });
}
