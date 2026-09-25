// Suggested destinations shown in the "Where" dropdown (desktop) and the
// mobile search sheet. `city` is the value stored in the listings' `location`.
export const destinations = [
  { icon: "📍", title: "Nearby", subtitle: "Find what's around you", city: null },
  { icon: "🏙️", title: "Islamabad, Pakistan", subtitle: "For sights like Faisal Mosque", city: "Islamabad" },
  { icon: "🌆", title: "Lahore, Pakistan", subtitle: "Historic city", city: "Lahore" },
  { icon: "🏔️", title: "Murree, Pakistan", subtitle: "Near you", city: "Murree" },
  { icon: "🏖️", title: "Karachi, Pakistan", subtitle: "Beach destination", city: "Karachi" },
  { icon: "🌄", title: "Hunza, Pakistan", subtitle: "Mountain views", city: "Hunza" },
  { icon: "🏕️", title: "Skardu, Pakistan", subtitle: "Nature getaway", city: "Skardu" },
  { icon: "🏡", title: "Nathia Gali, Pakistan", subtitle: "Popular hill station", city: "Nathia Gali" },
  { icon: "🌲", title: "Swat, Pakistan", subtitle: "Valley of beauty", city: "Swat" },
  { icon: "🏞️", title: "Fairy Meadows", subtitle: "Adventure trip", city: "Fairy Meadows" },
];

// [latitude, longitude] of the city centre. Used to place price pins on the
// search map and the "Where you'll be" map on a listing.
// NOTE: listings do not have their own coordinates yet – the backend phase
// should store real lat/lng per listing and replace this lookup.
export const cityCoords = {
  Islamabad: [33.6844, 73.0479],
  Lahore: [31.5204, 74.3587],
  Murree: [33.907, 73.3943],
  Karachi: [24.8607, 67.0011],
  Faisalabad: [31.4504, 73.135],
  "Nathia Gali": [34.0722, 73.3806],
  Bhurban: [33.9, 73.463],
  Dubai: [25.2048, 55.2708],
  Istanbul: [41.0082, 28.9784],
  Baku: [40.4093, 49.8671],
  Hunza: [36.3167, 74.65],
  Skardu: [35.2971, 75.6333],
  Swat: [35.2227, 72.4258],
  "Fairy Meadows": [35.3861, 74.5967],
};

// Turns the value stored in redux ("Islamabad, Pakistan") into a city name.
// "Nearby" (and an empty value) mean "no location filter".
export function cityFromDestination(destination) {
  if (!destination) return "";
  const city = destination.split(",")[0].trim();
  return city.toLowerCase() === "nearby" ? "" : city;
}
