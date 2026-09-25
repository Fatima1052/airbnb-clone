import { allListings } from "./listingsData";
import { airbnbOriginals, kualalumpurexperience } from "./experienceData";
import { londonServices, losAngelesService } from "./servicesData";

// The Kuala Lumpur experiences and Los Angeles services have no `location` in
// their source data, so fill it in here.
export const allExperiences = [
  ...airbnbOriginals,
  ...kualalumpurexperience.map((item) => ({
    location: "Kuala Lumpur",
    ...item,
  })),
];

export const allServices = [
  ...londonServices,
  ...losAngelesService.map((item) => ({ location: "Los Angeles", ...item })),
];

// Homes, experiences and services all have numeric ids that overlap (1, 2, 3…),
// so anything shared between them (favorites, links) has to include the kind.
//
// Homes keep the plain id as the favorite key because that is how existing
// favorites are already stored in Firestore.
export const favoriteKey = (kind, id) =>
  kind === "home" || !kind ? String(id) : `${kind}-${id}`;

export const detailPath = (kind, id) => {
  if (kind === "experience") return `/experience/${id}`;
  if (kind === "service") return `/service/${id}`;
  return `/listing/${id}`;
};

// Reverse of favoriteKey: "12" -> home 12, "experience-3" -> experience 3.
export function findItemByFavoriteKey(key) {
  const [prefix, rest] = String(key).split("-");

  if (prefix === "experience") {
    const item = allExperiences.find((e) => String(e.id) === rest);
    return item ? { kind: "experience", item } : null;
  }

  if (prefix === "service") {
    const item = allServices.find((s) => String(s.id) === rest);
    return item ? { kind: "service", item } : null;
  }

  const item = allListings.find((l) => String(l.id) === String(key));
  return item ? { kind: "home", item } : null;
}

// "$46 for 2 nights" -> 46, "From $50 / guest" -> 50
export function parsePrice(priceText) {
  const match = String(priceText ?? "").match(/\$\s*([\d,]+(?:\.\d+)?)/);
  return match ? Number(match[1].replace(/,/g, "")) : 0;
}

// Same rule the seed script uses to decide the type of a stay.
export function stayType(listing) {
  const title = (listing.title || "").toLowerCase();
  if (title.includes("hotel") || title.includes("resort")) return "hotel";
  if (title.includes("room")) return "room";
  return "home";
}
