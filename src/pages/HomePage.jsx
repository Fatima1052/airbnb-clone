import { useEffect, useState } from "react";

import Listings from "../Components/Listings";
import Inspiration from "../Components/Inspiration";

import fetchListings from "../fetchListings";

function HomePage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getListings = async () => {
      const data = await fetchListings();
      setListings(data);
    };

    getListings();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto">

      <Listings
        title="Popular homes in Islamabad"
        listings={listings.filter(
          (listing) => listing.category === "popularHomes"
        )}
      />

      <Listings
        title="Great hotels for your next trip"
        subtitle="Plus, Get Airbnb Credit when you stay at your featured hotel"
        listings={listings.filter(
          (listing) => listing.category === "greatHotels"
        )}
      />

      <Listings
        title="Available in Lahore this weekend"
        listings={listings.filter(
          (listing) => listing.category === "weekendHomes"
        )}
      />

      <Listings
        title="Stay in Murree"
        listings={listings.filter(
          (listing) => listing.category === "stayInMurree"
        )}
      />

      <Listings
        title="Available in Nathia Gali this weekend"
        listings={listings.filter(
          (listing) => listing.category === "nathiaGaliHomes"
        )}
      />

      <Listings
        title="Homes in Karachi"
        listings={listings.filter(
          (listing) => listing.category === "karachiHomes"
        )}
      />

      <Listings
        title="Available in Faisalabad this weekend"
        listings={listings.filter(
          (listing) => listing.category === "faisalabadHomes"
        )}
      />

      <Listings
        title="Places to stay in Dubai"
        listings={listings.filter(
          (listing) => listing.category === "dubaiPlaces"
        )}
      />

      <Listings
        title="Checkout homes in Bhurban"
        listings={listings.filter(
          (listing) => listing.category === "bhurbanHomes"
        )}
      />

      <Listings
        title="Popular homes in Istanbul"
        listings={listings.filter(
          (listing) => listing.category === "istanbulHomes"
        )}
      />

      <Listings
        title="Stay in Baku"
        listings={listings.filter(
          (listing) => listing.category === "bakuHomes"
        )}
      />

      <Inspiration />

    </div>
  );
}

export default HomePage;