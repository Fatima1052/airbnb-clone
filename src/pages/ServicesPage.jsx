import Listings from "../Components/Listings";
import { londonServices, losAngelesService } from "../data/servicesData";

function ServicesPage() {
  return (
    <>
      <Listings
        kind="service"
        title="Services in London"
        listings={londonServices}
      />

      <Listings
        kind="service"
        title="Services in Los Angeles"
        listings={losAngelesService}
      />
    </>
  );
}

export default ServicesPage;
