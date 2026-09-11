import { useAuthModal } from "../AuthContext";
import PropertyCard from "./PropertyCard";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { useRef, useState, useEffect } from "react";



function Listings({ title, subtitle, listings }) {
const { openAuthModal } = useAuthModal();
const [favorites, setFavorites] = useState([]);



const sliderRef = useRef(null);
const [isAtStart, setIsAtStart] = useState(true);
useEffect(() => {
  const loadFavorites = async () => {
    const user = auth.currentUser;

    if (!user) return;

    try {
      const favoritesRef = collection(
        db,
        "users",
        user.uid,
        "favorites"
      );

      const snapshot = await getDocs(favoritesRef);

      const favoriteIds = snapshot.docs.map((favorite) =>
        Number(favorite.id)
      );

      setFavorites(favoriteIds);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  loadFavorites();
}, []);
const toggleFavorite = async (listingId) => {
  const user = auth.currentUser;

 if (!user) {
  console.log("FAVORITE CLICK - USER NOT LOGGED IN");
  openAuthModal();
  return;
}

  const favoriteRef = doc(
    db,
    "users",
    user.uid,
    "favorites",
    String(listingId)
  );

  try {
    if (favorites.includes(listingId)) {
      await deleteDoc(favoriteRef);

      setFavorites((prev) =>
        prev.filter((id) => id !== listingId)
      );
    } else {
      await setDoc(favoriteRef, {
        listingId: listingId,
        createdAt: new Date(),
      });

      setFavorites((prev) => [
        ...prev,
        listingId,
      ]);
    }
  } catch (error) {
    console.error("Error updating favorite:", error);
  }
};
const checkScrollPosition = () => {
  if (!sliderRef.current) return;

  const { scrollLeft } = sliderRef.current;

  setIsAtStart(scrollLeft <= 0);

  
};

useEffect(() => {
  const slider = sliderRef.current;

  if (!slider) return;

  slider.addEventListener("scroll", checkScrollPosition);
  window.addEventListener("resize", checkScrollPosition);

  return () => {
    slider.removeEventListener("scroll", checkScrollPosition);
    window.removeEventListener("resize", checkScrollPosition);
  };
}, [listings]);



const scrollLeft = () => {
  if (sliderRef.current) {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (sliderRef.current) {
    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  }
};


  return (

   <section
className="
px-4
sm:px-6
md:px-8
lg:px-[32px]
pt-6
pb-2
"
>
<div className="mb-[25px] flex items-center justify-between">

  <div className="flex items-center gap-3">
    <div>

      <div className="flex items-center gap-2">
       <h2 className="m-0 text-[18px]
sm:text-[22px]
md:text-[25px] font-semibold text-[#222222]">
          {title}
        </h2>

       <div className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full bg-[#f2f2f2] transition hover:bg-[#e5e5e5]">
          <FiArrowRight />
        </div>
      </div>

      {subtitle && (
       <p className="mt-[6px] text-[13px]
sm:text-[14px]
md:text-[16px] text-[#6a6a6a]">
          {subtitle}
        </p>
      )}

    </div>

  </div>

<div className="hidden md:flex gap-[10px]">

   <button
  onClick={scrollLeft}
  disabled={isAtStart}
  className={`
    flex h-[33px] w-[33px] items-center justify-center rounded-full
    transition
    ${
      isAtStart
        ? "cursor-not-allowed bg-[#f7f7f7] text-[#b0b0b0]"
        : "cursor-pointer bg-[#f2f2f2] text-[#222222] hover:bg-[#e5e5e5]"
    }
  `}
>
  <FiChevronLeft />
</button>

   

  <button
  onClick={scrollRight}
  className="
    flex
    h-[33px]
    w-[33px]
    items-center
    justify-center
    rounded-full
    bg-[#f2f2f2]
    text-[#222222]
    cursor-pointer
    transition
    hover:bg-[#e5e5e5]
  "
>
  <FiChevronRight />
</button>




  </div>

</div>
   
<div
  ref={sliderRef}
  className="
    w-full
    flex
    gap-4
    overflow-x-auto
    scroll-smooth
    scrollbar-hide
  "
>

          {listings.map((listing) => (

<PropertyCard
  id={listing.id}
  isFavorite={favorites.includes(listing.id)}
onFavorite={toggleFavorite}
  image={listing.image}
  title={listing.title}
  description={listing.description}
  details={listing.details}
  price={listing.price}
  oldPrice={listing.oldPrice}
  nights={listing.nights}
  rating={listing.rating}
  reviews={listing.reviews}
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