import { useCallback, useEffect, useState } from "react";

import Listings from "../Components/Listings";
import Inspiration from "../Components/Inspiration";

import { getListings } from "../services/listings";

// Order of the rows on the page. `category` matches the field stored on each
// listing document in Firestore.
const SECTIONS = [
  { title: "Popular homes in Islamabad", category: "popularHomes" },
  {
    title: "Great hotels for your next trip",
    subtitle: "Plus, Get Airbnb Credit when you stay at your featured hotel",
    category: "greatHotels",
  },
  { title: "Available in Lahore this weekend", category: "weekendHomes" },
  { title: "Stay in Murree", category: "stayInMurree" },
  {
    title: "Available in Nathia Gali this weekend",
    category: "nathiaGaliHomes",
  },
  { title: "Homes in Karachi", category: "karachiHomes" },
  {
    title: "Available in Faisalabad this weekend",
    category: "faisalabadHomes",
  },
  { title: "Places to stay in Dubai", category: "dubaiPlaces" },
  { title: "Checkout homes in Bhurban", category: "bhurbanHomes" },
  { title: "Popular homes in Istanbul", category: "istanbulHomes" },
  { title: "Stay in Baku", category: "bakuHomes" },
];

function HomePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadListings = useCallback(async () => {
    setLoading(true);

    try {
      setListings(await getListings());
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  // Fetching finished but nothing came back (offline, Firestore rules, empty DB)
  if (!loading && listings.length === 0) {
    return (
      <div className="mx-auto max-w-[520px] px-6 py-24 text-center">
        <h2 className="text-[22px] font-semibold text-[#222222]">
          We couldn't load any stays
        </h2>
        <p className="mt-2 text-[15px] text-[#6a6a6a]">
          Check your internet connection and try again.
        </p>
        <button
          type="button"
          onClick={loadListings}
          className="mt-6 rounded-[10px] bg-[#222222] px-6 py-3 text-[15px] font-semibold text-white hover:bg-black"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      {loading ? (
        <>
          <Listings title="Popular homes in Islamabad" loading />
          <Listings title="Great hotels for your next trip" loading />
          <Listings title="Available in Lahore this weekend" loading />
        </>
      ) : (
        SECTIONS.map((section) => (
          <Listings
            key={section.category}
            title={section.title}
            subtitle={section.subtitle}
            listings={listings.filter(
              (listing) => listing.category === section.category
            )}
          />
        ))
      )}

      <Inspiration />
    </div>
  );
}

export default HomePage;
