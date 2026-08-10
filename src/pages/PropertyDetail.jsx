import { useParams } from "react-router-dom";
import { allListings } from "../data/listingsData";
import ImageGallery from "../Components/ImageGallery";
import DetailSearchBar from "../Components/DetailSearchBar";
import { useState } from "react";
function PropertyDetail() {
  const [selectedPrice, setSelectedPrice] = useState("all");
const [selectedType, setSelectedType] = useState("all");

  const { id } = useParams();

  const property = allListings.find(
    (item) => item.id === Number(id)
  );

  if (!property) {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold">
        Property not found
      </h2>
    </div>
  );
}

  return (
     <>
    <DetailSearchBar location={property.location} />
   <div
  className="
  max-w-[1120px]
  mx-auto
  px-4
  sm:px-6
  md:px-8
  py-6
  md:py-8
"
>
    <ImageGallery
  property={property}
  selectedPrice={selectedPrice}
  setSelectedPrice={setSelectedPrice}
  selectedType={selectedType}
  setSelectedType={setSelectedType}
/>
    </div>

        </>
  );
}

export default PropertyDetail;