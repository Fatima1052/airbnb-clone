import Listings from "../Components/Listings";
import {
  airbnbOriginals,
  kualalumpurexperience,
} from "../data/experienceData";

function ExperiencesPage() {
  return (
    <>
      <Listings
        kind="experience"
        title="Airbnb Originals"
        subtitle="Hosted by the world's most interesting people"
        listings={airbnbOriginals}
      />

      <Listings
        kind="experience"
        title="Experiences in Kuala Lumpur"
        listings={kualalumpurexperience}
      />
    </>
  );
}

export default ExperiencesPage;
