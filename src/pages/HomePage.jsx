
import Listings from "../Components/Listings";
import Inspiration from "../Components/Inspiration";


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
} from "../data/listingsData";

function HomePage() {
  return (
   <div
  className="
  max-w-[1600px]
  mx-auto
  "
>
     

      <Listings
        title="Popular homes in Islamabad"
        
        listings={popularHomes}
      />

      <Listings
        title="Great hotels for your next trip"
        subtitle="Plus, Get Airbnb Credit when you stay at your featured hotel"
        listings={greatHotels}
      />

      <Listings
        title="Available in Lahore this weekend"
        listings={weekendHomes}
      />

      <Listings
        title="Stay in Murree"
        listings={stayInMurree}
      />

      <Listings
        title="Available in Nathia Gali this weekend"
        listings={nathiaGaliHomes}
      />

      <Listings
        title="Homes in Karachi"
        listings={karachiHomes}
      />

      <Listings
        title="Available in Faisalabad this weekend"
        listings={faisalabadHomes}
      />

      <Listings
        title="Places to stay in Dubai"
        listings={dubaiPlaces}
      />

      <Listings
        title="Checkout homes in Bhurban"
        listings={bhurbanHomes}
      />

      <Listings
        title="Popular homes in Istanbul"
        listings={istanbulHomes}
      />

      <Listings
        title="Stay in Baku"
        listings={bakuHomes}
      />

      <Inspiration />

   
    </div>
  );
}

export default HomePage;