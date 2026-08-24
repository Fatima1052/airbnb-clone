import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const fetchListings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "listings"));

    const listings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("LISTINGS FETCHED FROM FIREBASE:", listings);

    return listings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

export default fetchListings;