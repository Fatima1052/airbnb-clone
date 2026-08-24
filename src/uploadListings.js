 import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";

import {
  popularHomes,
  greatHotels,
  weekendHomes,
  stayInMurree,
  nathiaGaliHomes,
  karachiHomes,
  faisalabadHomes,
  dubaiPlaces,
  bhurbanHomes,
  istanbulHomes,
  bakuHomes,
} from "./data/listingsData";

const uploadListings = async () => {
  console.log("UPLOAD FUNCTION STARTED");

  try {
    const listingsWithCategories = [
      ...popularHomes.map((item) => ({
        ...item,
        category: "popularHomes",
      })),

      ...greatHotels.map((item) => ({
        ...item,
        category: "greatHotels",
      })),

      ...weekendHomes.map((item) => ({
        ...item,
        category: "weekendHomes",
      })),

      ...stayInMurree.map((item) => ({
        ...item,
        category: "stayInMurree",
      })),

      ...nathiaGaliHomes.map((item) => ({
        ...item,
        category: "nathiaGaliHomes",
      })),

      ...karachiHomes.map((item) => ({
        ...item,
        category: "karachiHomes",
      })),

      ...faisalabadHomes.map((item) => ({
        ...item,
        category: "faisalabadHomes",
      })),

      ...dubaiPlaces.map((item) => ({
        ...item,
        category: "dubaiPlaces",
      })),

      ...bhurbanHomes.map((item) => ({
        ...item,
        category: "bhurbanHomes",
      })),

      ...istanbulHomes.map((item) => ({
        ...item,
        category: "istanbulHomes",
      })),

      ...bakuHomes.map((item) => ({
        ...item,
        category: "bakuHomes",
      })),
    ];


    const batch = writeBatch(db);

console.log("Total listings:", listingsWithCategories.length);
console.log("Listings being uploaded:", listingsWithCategories);



   listingsWithCategories.forEach((listing) => {

  const listingRef = doc(
    collection(db, "listings"),
    String(listing.id)
  );

  batch.set(listingRef, listing);
});


    await batch.commit();

    console.log("All listings uploaded successfully!");
  } catch (error) {
    console.error("Error uploading listings:", error);
  }
};


export default uploadListings;