import { useParams, useSearchParams } from "react-router-dom";
import { allListings, listingImages } from "../data/listingsData";
import ImageGallery from "../Components/ImageGallery";
import DetailSearchBar from "../Components/DetailSearchBar";
import { useState } from "react";

function PropertyDetail() {
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const { id } = useParams();
const [searchParams] = useSearchParams();

const selectedImageIndex = Number(
  searchParams.get("image") || 0
);
  const property = allListings.find(
    (item) => item.id === Number(id)
  );

 const propertyWithImages = property
  ? {
      ...property,

      description:
        property.description ||
        `${property.title} · Comfortable stay`,

      details:
        property.details ||
        "1 bedroom · 1 bed · 1 private bath",

      date:
        property.date ||
        "Aug 7 – 9",

      // Same listing image used multiple times
    images:
  listingImages[property.id]
    ? [
        listingImages[property.id][selectedImageIndex],
        ...listingImages[property.id].filter(
          (_, index) => index !== selectedImageIndex
        ),
      ].slice(0, 5)
    : [],
    }
  : null;
  if (!propertyWithImages) {
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
      <DetailSearchBar location={propertyWithImages.location} />

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
  property={propertyWithImages}
  selectedPrice={selectedPrice}
  setSelectedPrice={setSelectedPrice}
  selectedType={selectedType}
  setSelectedType={setSelectedType}
  selectedImageIndex={selectedImageIndex}
/>
      </div>
    </>
  );
}

export default PropertyDetail;

