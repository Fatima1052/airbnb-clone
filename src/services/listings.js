import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../firebase";

// Everything the app reads about listings goes through this file, so pages and
// components never talk to Firestore directly. In the backend phase only the
// bodies of these functions change, e.g.
//
//   const response = await fetch(`${API_URL}/listings`);
//   return response.json();
//
// Both functions throw when the request fails – the caller decides what to show.

// Every listing card (home page rows, search results).
export async function getListings() {
  const snapshot = await getDocs(collection(db, "listings"));

  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

// The long details of one listing (photos, amenities, reviews…).
// Resolves to `null` when there is no details document for that id.
export async function getListingDetail(id) {
  const snapshot = await getDoc(doc(db, "listingDetails", String(id)));

  return snapshot.exists() ? snapshot.data() : null;
}
