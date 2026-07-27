import "./Listings.css";
import PropertyCard from "./PropertyCard";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { useRef } from "react";



function Listings({ title, subtitle, listings }) {

const sliderRef = useRef(null);

const scrollLeft = () => {
  sliderRef.current.scrollBy({
    left: -900,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  sliderRef.current.scrollBy({
    left: 900,
    behavior: "smooth",
  });
};


  return (

    <section className="listing-section">
<div className="section-header">

  <div className="section-title-wrapper">

    <div>

      <div className="title-row">
        <h2 className="section-title">
          {title}
        </h2>

        <div className="title-arrow">
          <FiArrowRight />
        </div>
      </div>

      {subtitle && (
        <p className="section-subtitle">
          {subtitle}
        </p>
      )}

    </div>

  </div>

  <div className="slider-buttons">

    <button onClick={scrollLeft}>
      <FiChevronLeft />
    </button>

    <button onClick={scrollRight}>
      <FiChevronRight />
    </button>

  </div>

</div>
   
<div
    className="listing-container"
    ref={sliderRef}
>

          {listings.map((listing) => (

<PropertyCard

key={listing.id}

image={listing.image}
title={listing.title}
price={listing.price}
rating={listing.rating}
guestFavorite={listing.guestFavorite}
original={listing.original}
location={listing.location}

/>

))}

        </div>

    </section>

)

}


export default Listings;