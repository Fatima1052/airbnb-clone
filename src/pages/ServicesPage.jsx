import Listings from "../Components/Listings";
import { londonServices } from "../data/servicesData";
import { losAngelesService} from "../data/servicesData";
function ServicesPage(){

return(
<>
<Listings

title="Services in London"

listings={londonServices}

/>

<Listings

title="Services in Los Angeles"

listings={losAngelesService}

/>
</>
)

}

export default ServicesPage;