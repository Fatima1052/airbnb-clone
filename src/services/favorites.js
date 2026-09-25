import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";

// The listings one user has saved (the heart button). Stored at
// users/{uid}/favorites/{favoriteKey}. The backend phase replaces these bodies
// with requests such as GET /favorites, PUT /favorites/:key, DELETE /favorites/:key.
// All of them throw when the request fails.

// The favorite keys the user has saved, e.g. ["12", "experience-3"].
export async function getFavoriteKeys(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "favorites"));

  return snapshot.docs.map((item) => item.id);
}

export async function addFavorite(uid, favoriteKey) {
  await setDoc(doc(db, "users", uid, "favorites", favoriteKey), {
    listingId: favoriteKey,
    createdAt: new Date(),
  });
}

export async function removeFavorite(uid, favoriteKey) {
  await deleteDoc(doc(db, "users", uid, "favorites", favoriteKey));
}
