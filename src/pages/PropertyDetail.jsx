import { useParams } from "react-router-dom";
import { allListings } from "../data/listingsData";
import ImageGallery from "../Components/ImageGallery";
import { useState } from "react";
function PropertyDetail() {
  const [selectedPrice, setSelectedPrice] = useState("all");
const [selectedType, setSelectedType] = useState("all");

  const { id } = useParams();

  const property = allListings.find(
    (item) => item.id === Number(id)
  );

  return (
    <div className="max-w-[1120px] mx-auto px-6 py-8">
    <ImageGallery
  property={property}
  selectedPrice={selectedPrice}
  setSelectedPrice={setSelectedPrice}
  selectedType={selectedType}
  setSelectedType={setSelectedType}
/>
    </div>
  );
}

export default PropertyDetail;