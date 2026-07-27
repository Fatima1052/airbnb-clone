
import Listings from "../Components/Listings";
import { airbnbOriginals } from "../data/experienceData";
import { kualalumpurexperience } from "../data/experienceData";

function ExperiencesPage(){

return(

<>

<Listings

title="Airbnb Originals"

subtitle="Hosted by the world's most interesting people"

listings={airbnbOriginals}

/>

<Listings

title="Experiences in KualaLumpur"



listings={kualalumpurexperience}

/>

</>

)

}

export default ExperiencesPage;
