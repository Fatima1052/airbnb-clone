import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../firebase";

// Everything the app reads about listings goes through this file, so pages and
// components never talk to a database directly.
//
// getListings() has two sources:
//   - REACT_APP_API_URL set (see airbnb-clone-backend/) -> the new MongoDB-backed
//     API. Its listings are shaped for the database (numeric price, a
//     {city,country,coordinates} location...), so adaptListing() below
//     translates each one back into the exact shape the cards already expect
//     (e.g. price: "$46 for 2 nights") — no component had to change.
//   - otherwise -> the original Firestore "listings" collection, unchanged.
//
// Both functions throw when the request fails – the caller decides what to show.
const API_URL = process.env.REACT_APP_API_URL;

// "$46 for 2 nights" (homes) / "From $50 / guest" (experiences, services) —
// the same strings the frontend has always displayed and parsed prices from
// (see data/catalog.js parsePrice).
function formatPrice(item) {
  if (item.kind && item.kind !== "home") {
    return `From $${item.price} / ${item.priceUnit || "guest"}`;
  }
  return `$${item.price} for 2 nights`;
}

function adaptListing(item) {
  return {
    id: item.legacyId,
    kind: item.kind,
    title: item.title,
    category: item.category,
    price: formatPrice(item),
    rating: item.rating,
    guestFavorite: item.guestFavorite,
    location: item.location?.city || "",
    image: item.images?.[0] || "",
  };
}

// Every listing card (home page rows, search results). Homes only, to match
// what the Firestore "listings" collection has always held.
export async function getListings() {
  if (API_URL) {
    const response = await fetch(`${API_URL}/listings?kind=home&limit=100`);
    if (!response.ok) throw new Error("Could not load listings");

    const data = await response.json();
    return data.items.map(adaptListing);
  }

  const snapshot = await getDocs(collection(db, "listings"));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

// The long details of one listing (photos, amenities, reviews…). Still
// Firestore-only for now — see airbnb-clone-backend/README.md "What's next".
// Resolves to `null` when there is no details document for that id.
export async function getListingDetail(id) {
  const snapshot = await getDoc(doc(db, "listingDetails", String(id)));

  return snapshot.exists() ? snapshot.data() : null;
}
