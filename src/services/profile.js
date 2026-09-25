import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../firebase";

// The profile details (name, bio, location) of one user, stored at users/{uid}.
// The backend phase replaces these bodies with GET / PATCH requests on /me.
// Both functions throw when the request fails.

// Resolves to `null` when the user has not saved a profile yet.
export async function getProfile(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));

  return snapshot.exists() ? snapshot.data() : null;
}

// Only the fields passed in are changed, the rest of the profile stays as it is.
export async function saveProfile(uid, fields) {
  await setDoc(
    doc(db, "users", uid),
    { ...fields, updatedAt: new Date() },
    { merge: true }
  );
}
