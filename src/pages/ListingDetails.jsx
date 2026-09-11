import { useParams } from "react-router-dom";
import ListingDetailCalendar from "../Components/ListingDetailCalendar";
import Gallery from "../Components/Gallery";

import {
  allListings,
  listingImages,
} from "../data/listingsData";
import ListingHeader from "../Components/ListingHeader";
import {
  FiShare,
  FiHeart,
  FiCopy,
  FiFacebook,
  FiMail,
} from "react-icons/fi";

import laurelLeft from "../assests/laurel-left.png";
import laurelRight from "../assests/laurel-right.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect,  useState } from "react";

function ListingDetails() {
  const { id } = useParams();

  const property = allListings.find(
    (item) => item.id === Number(id)
  );

  const [detail, setDetail] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
const [showShare, setShowShare] = useState(false);
const handleShare = async () => {
  const shareData = {
    title: detail?.title || "Airbnb listing",
    text: `Check out this stay: ${detail?.title || ""}`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Listing link copied!");
    }
  } catch (error) {
    console.log("Share cancelled");
  }
};
  const [loadingDetail, setLoadingDetail] = useState(true);
const [dateRange, setDateRange] = useState([
  null,
  null,
]);


  useEffect(() => {
    const fetchListingDetail = async () => {
      try {
        setLoadingDetail(true);

        const detailRef = doc(db, "listingDetails", id);
        const detailSnap = await getDoc(detailRef);

        if (detailSnap.exists()) {
          setDetail(detailSnap.data());
        } else {
          setDetail(null);
        }
      } catch (error) {
        console.error("Error fetching listing detail:", error);
        setDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchListingDetail();
  }, [id]);
if (loadingDetail) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h2 className="text-xl font-semibold">
        Loading listing...
      </h2>
    </div>
  );
}
  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Property not found
        </h2>
      </div>
    );
  }
if (!detail) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h2 className="text-xl font-semibold">
        Listing details not found
      </h2>
    </div>
  );
}
const imageUrls =
  listingImages[property.id]?.map((image) => image.url) || [];
 

  const [startDate, endDate] = dateRange;

const nights =
  startDate && endDate
    ? endDate.diff(startDate, "day")
    : 0;

const nightlyPrice = Number(detail.price) || 0;




const stayTotal =
  nights > 0
    ? nightlyPrice * nights
    : 0;

 

  return (
    <>
      <ListingHeader />

      <main className="min-h-screen bg-white text-[#222222]">

        <div className="mx-auto max-w-[1120px] px-4 pb-20 pt-6 sm:px-6 md:px-8">

          {/* =========================
              TITLE + ACTIONS
          ========================== */}

       {/* TITLE + ACTIONS */}
<section className="mb-5">
  <div className="flex items-start justify-between gap-4">
    <div className="min-w-0">
      <h1
        className="
          text-[24px]
          font-semibold
          leading-[30px]
          tracking-[-0.3px]
          text-[#222222]
          sm:text-[26px]
        "
      >
       {detail.title}
      </h1>
    </div>

    {/* SHARE + SAVE */}
    <div className="hidden shrink-0 items-center gap-1 sm:flex">
      <button
  type="button"
  onClick={() => setShowShare(true)}
  className="
    flex items-center gap-2
    rounded-[8px]
    px-3 py-2
    text-[14px]
    font-semibold
    text-[#222222]
    underline
    hover:bg-[#f7f7f7]
  "
>
  <FiShare size={17} />
  Share
</button>

     <button
  type="button"
  onClick={() => setIsSaved((prev) => !prev)}
  className="
    flex items-center gap-2
    rounded-[8px]
    px-3 py-2
    text-[14px]
    font-semibold
    text-[#222222]
    underline
    hover:bg-[#f7f7f7]
  "
>
  <FiHeart
    size={18}
    className={isSaved ? "fill-[#ff385c] text-[#ff385c]" : ""}
  />

  {isSaved ? "Saved" : "Save"}
</button>
    </div>
  </div>

  {/* AIRBNB STYLE LISTING INFO */}
  
</section>

{showShare && (
  <div
    className="
      fixed
      inset-0
      z-[100]
      flex
      items-center
      justify-center
      bg-black/40
      px-4
    "
    onClick={() => setShowShare(false)}
  >
    <div
      className="
        relative
        w-full
        max-w-[520px]
        rounded-[16px]
        bg-white
        p-6
        shadow-2xl
      "
      onClick={(e) => e.stopPropagation()}
    >

      {/* CLOSE */}

      <button
        type="button"
        onClick={() => setShowShare(false)}
        className="
          absolute
          right-4
          top-4
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          text-[22px]
          hover:bg-[#f7f7f7]
        "
      >
        ×
      </button>


      {/* TITLE */}

      <h2 className="pr-8 text-[22px] font-semibold text-[#222222]">
        Share this place
      </h2>


      {/* LISTING */}

      <div className="mt-6 flex items-center gap-4">

        <img
          src={imageUrls[0]}
          alt={detail.title}
          className="
            h-[64px]
            w-[64px]
            rounded-[10px]
            object-cover
          "
        />

        <div className="min-w-0">
          <p className="truncate text-[16px] font-semibold">
            {detail.title}
          </p>

          <p className="mt-1 text-[13px] text-[#717171]">
            {detail.location}
          </p>
        </div>

      </div>


      {/* SHARE OPTIONS */}

      <div className="mt-7 space-y-2">

        {/* COPY LINK */}

        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(
                window.location.href
              );

              setShowShare(false);
              alert("Listing link copied!");
            } catch (error) {
              console.error("Copy failed:", error);
            }
          }}
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-[12px]
            p-4
            text-left
            hover:bg-[#f7f7f7]
          "
        >
          <FiCopy size={21} />

          <div>
            <p className="text-[15px] font-semibold">
              Copy link
            </p>

            <p className="mt-1 text-[13px] text-[#717171]">
              Copy this listing link
            </p>
          </div>
        </button>


        {/* FACEBOOK */}

        <button
          type="button"
          onClick={() => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`,
              "_blank"
            );
          }}
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-[12px]
            p-4
            text-left
            hover:bg-[#f7f7f7]
          "
        >
          <FiFacebook size={21} />

          <div>
            <p className="text-[15px] font-semibold">
              Share on Facebook
            </p>
          </div>
        </button>


        {/* EMAIL */}

        <button
          type="button"
          onClick={() => {
            window.location.href =
              `mailto:?subject=${encodeURIComponent(
                detail.title
              )}&body=${encodeURIComponent(
                `Check out this stay: ${window.location.href}`
              )}`;
          }}
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-[12px]
            p-4
            text-left
            hover:bg-[#f7f7f7]
          "
        >
          <FiMail size={21} />

          <div>
            <p className="text-[15px] font-semibold">
              Share by email
            </p>
          </div>
        </button>

      </div>

    </div>
  </div>
)}

          {/* =========================
              GALLERY
          ========================== */}

          <Gallery
  images={imageUrls}
  title={detail.title}
/>

          {/* =========================
              MAIN CONTENT
          ========================== */}

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">


            {/* ==================================
                LEFT CONTENT
            ================================== */}

            <div>


{/* PROPERTY SUMMARY */}

<section>

<h2 className="text-[22px] font-semibold leading-[28px]">
  {detail.placeType} in {detail.location}, Pakistan
</h2>

  <p className="mt-2 text-[15px] text-[#555555]">
    {detail.guests} guests ·{" "}
    {detail.bedrooms ?? detail.bedroom} bedrooms ·{" "}
    {detail.beds ?? detail.bed} beds ·{" "}
    {detail.baths} baths
  </p>

</section>


{/* PAY TODAY + CANCELLATION */}

<div className="mt-2 flex flex-wrap gap-2">

  {detail.payToday && (
    <div className="rounded-[8px] bg-[#f7f7f7] px-2 py-1">
      <p className="text-[12px] font-medium text-[#222222]">
        {detail.payToday}
      </p>
    </div>
  )}

  {detail.cancellation && (
    <div className="rounded-[8px] bg-[#f7f7f7] px-2 py-1">
      <p className="text-[12px] font-medium text-[#222222]">
        {detail.cancellation}
      </p>
    </div>
  )}

</div>



<div className="my-8 border-t border-[#dddddd]" />

{/* GUEST FAVORITE - TOP */}

{detail.guestFavorite && (
  <>
    <section>

      <div className="flex items-center gap-6">

        {/* LEFT RATING */}
        <div className="flex shrink-0 flex-col items-center justify-center">

          <p className="text-[22px] font-semibold text-[#222222]">
           ★ {detail.rating}
          </p>

          <p className="mt-1 text-[12px] text-[#555555]">
          {detail.guestFavoriteText}
          </p>

        </div>

        {/* CENTER CONTENT */}
        <div className="min-w-0 flex-1 border-l border-[#dddddd] pl-6">

          <h2 className="text-[18px] font-semibold leading-[24px] text-[#222222]">
            Guest favorite
          </h2>

          <p className="mt-2 max-w-[600px] text-[14px] leading-6 text-[#555555]">
            One of the most loved homes on Airbnb, according to
            guests. This home has excellent ratings, reviews,
            and reliability.
          </p>

        </div>

        {/* RIGHT BADGE */}
        <div className="hidden shrink-0 sm:flex">

          <div
            className="
              flex
              h-[64px]
              w-[64px]
              items-center
              justify-center
              rounded-[12px]
              bg-[#f7f7f7]
              text-[28px]
            "
          >
            🏆
          </div>

        </div>

      </div>

    </section>

    <div className="my-8 border-t border-[#dddddd]" />
  </>
)}


{/* HOST */}
<section>
  <div className="flex items-center gap-4">
    
    {/* HOST AVATAR */}
    <div className="
      flex h-[56px] w-[56px] shrink-0
      items-center justify-center
      overflow-hidden rounded-full
      bg-[#f2f2f2]
      text-[24px]
    ">
      👤
    </div>

    {/* HOST INFO */}
    <div>
      <h2 className="text-[16px] font-semibold leading-[22px] text-[#222222]">
        Hosted by {detail.hostName || "BlueOak Residences"}
      </h2>

    <p className="mt-1 text-[14px] leading-[20px] text-[#717171]">
  {detail.isSuperhost ? "Superhost" : "Host"} ·{" "}
  {detail.hostingYears} years hosting
</p>
    </div>

  </div>
</section>


<div className="my-8 border-t border-[#dddddd]" />

{/* LISTING HIGHLIGHTS */}

<section>

  <div className="mt-6 space-y-7">

    {detail.highlights?.map((highlight, index) => (

      <div
        key={`${highlight.title}-${index}`}
        className="flex items-start gap-5"
      >

        <div className="mt-1 shrink-0 text-[25px]">
          {highlight.icon}
        </div>

        <div>

          <p className="text-[15px] font-semibold">
            {highlight.title}
          </p>

          <p className="mt-1 text-[14px] leading-6 text-[#666666]">
            {highlight.description}
          </p>

        </div>

      </div>

    ))}

  </div>

</section>


              <div className="my-8 border-t border-[#dddddd]" />


              {/* ABOUT THIS PLACE */}
<section className="border-t border-[#dddddd] pt-8">
  <h2 className="text-[22px] font-semibold leading-[28px] text-[#222222]">
    About this place
  </h2>

  <div className="mt-6 text-[15px] leading-6 text-[#222222]">

   <p className="text-[15px] leading-6 text-[#222222]">
  {detail.description}
</p>
    {/* SHOW MORE */}
    <button
      type="button"
      className="
        mt-6
        font-semibold
        underline
        underline-offset-2
        hover:text-[#555555]
      "
    >
      Show more
    </button>

  </div>
</section>



              <div className="my-8 border-t border-[#dddddd]" />

<section>
  <h2 className="text-[22px] font-semibold leading-[28px] text-[#222222]">
    Where you'll sleep
  </h2>

  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
    {detail.bedroomDetails?.map((room, index) => (
      <div
        key={`${room.name}-${index}`}
        className="overflow-hidden rounded-[12px]"
      >
        <div className="h-[220px] w-full overflow-hidden rounded-[12px] bg-[#f2f2f2]">
          <img
            src={imageUrls[room.imageIndex]}
            alt={room.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-5">
          <h3 className="text-[16px] font-semibold text-[#222222]">
            {room.name}
          </h3>

          <p className="mt-2 text-[14px] text-[#555555]">
            {room.bed}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>



              <div className="my-8 border-t border-[#dddddd]" />
{/* WHAT THIS PLACE OFFERS */}

<section>

  <h2 className="text-[22px] font-semibold leading-[28px] text-[#222222]">
    What this place offers
  </h2>

  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2">

    {detail.amenities?.map((amenity, index) => {

      const icons = [
        "📶",
        "🍳",
        "🅿️",
        "📺",
        "❄️",
        "🔥",
        "🧺",
        "🔑",
        "🛗",
        "🔋",
      ];

      return (
        <div
          key={`${amenity}-${index}`}
          className="flex items-center gap-4 py-4"
        >
          <span className="text-[22px]">
            {icons[index] || "✓"}
          </span>

          <span className="text-[15px] text-[#222222]">
            {amenity}
          </span>
        </div>
      );
    })}

  </div>

  {/* SHOW ALL AMENITIES */}

  <button
    type="button"
    className="
      mt-6
      rounded-[8px]
      border
      border-[#222222]
      px-6
      py-3
      text-[14px]
      font-semibold
      text-[#222222]
      transition
      hover:bg-[#f7f7f7]
    "
  >
    Show all amenities
  </button>

</section>



<div className="my-8 border-t border-[#dddddd]" />
{/* ACCESSIBILITY FEATURES */}

<section>

  <h2 className="text-[22px] font-semibold leading-[28px] text-[#222222]">
    Accessibility features
  </h2>

  <p className="mt-2 text-[14px] leading-[18px] text-[#717171]">
    This info was provided by the Host and reviewed by Airbnb.
  </p>

  <div className="mt-6 space-y-6">

    {detail.accessibilityFeatures?.map((feature, index) => (

      <div key={`${feature.title}-${index}`}>

        <div className="h-[180px] w-[320px] overflow-hidden rounded-[12px] bg-[#f2f2f2]">

          <img
            src={imageUrls[feature.imageIndex]}
            alt={feature.title}
            className="h-full w-full object-cover"
          />

        </div>

        <div className="mt-3">

          <h3 className="text-[16px] font-semibold text-[#222222]">
            {feature.title}
          </h3>

          <p className="mt-1 text-[16px] leading-[18px] text-[#717171]">
            {feature.description}
          </p>

        </div>

      </div>

    ))}

  </div>

  <button
    type="button"
    className="mt-5 rounded-[8px] border border-[#222222] px-4 py-2.5 text-[13px] font-semibold text-[#222222] transition hover:bg-[#f7f7f7]"
  >
    Show all{" "}
    {detail.accessibilityFeatures?.length || 0}{" "}
    {detail.accessibilityFeatures?.length === 1
      ? "feature"
      : "features"}
  </button>

</section>
{/* =========================
    AVAILABILITY CALENDAR
========================= */}

<ListingDetailCalendar
  location={detail.location}
  dateRange={dateRange}
  setDateRange={setDateRange}
/>

<div className="my-8 border-t border-[#dddddd]" />

</div>


            {/* ==================================
                RIGHT BOOKING CARD
            ================================== */}

            <aside>

              <div
                className="
                  sticky
                  top-[100px]
                  rounded-[16px]
                  border
                  border-[#dddddd]
                  bg-white
                  p-6
                  shadow-[0_6px_20px_rgba(0,0,0,0.12)]
                "
              >

                {/* PRICE */}

                <div className="flex items-baseline gap-1">

  <span className="text-[22px] font-semibold">
    {nights > 0
      ? `$${stayTotal.toLocaleString()} for ${nights} ${
          nights === 1 ? "night" : "nights"
        }`
      : "Add dates for prices"}
  </span>

  {nights === 0 && (
    <span className="text-[14px] text-[#555555]">
      night
    </span>
  )}

</div>


                {/* RATING */}

                <div className="mt-2 text-[13px]">
  ★ {detail.rating}
</div>


                {/* DATE / GUEST BOX */}

                <div className="mt-5 overflow-hidden rounded-[10px] border border-[#777777]">

                  <div className="grid grid-cols-2">

                    <button
                      type="button"
                      className="
                        border-r
                        border-[#777777]
                        p-3
                        text-left
                        hover:bg-[#f7f7f7]
                      "
                    >

                    <p className="mt-1 text-[13px] text-[#666666]">
  {startDate
    ? startDate.format("MMM D, YYYY")
    : "Add date"}
</p>

                      

                    </button>


                    <button
                      type="button"
                      className="
                        p-3
                        text-left
                        hover:bg-[#f7f7f7]
                      "
                    >

                     <p className="mt-1 text-[13px] text-[#666666]">
  {endDate
    ? endDate.format("MMM D, YYYY")
    : "Add date"}
</p>

                      

                    </button>

                  </div>


                  <button
                    type="button"
                    className="
                      w-full
                      border-t
                      border-[#777777]
                      p-3
                      text-left
                      hover:bg-[#f7f7f7]
                    "
                  >

                    <p className="text-[10px] font-bold uppercase">
                      Guests
                    </p>

                    <p className="mt-1 text-[13px] text-[#666666]">
                      {detail.guests || 1} guest{(detail.guests || 1) !== 1 ? "s" : ""}
                    </p>

                  </button>

                </div>


                {/* RESERVE */}

                <button
  type="button"
  className="
    mt-5
    w-full
    rounded-[10px]
    bg-[#ff385c]
    py-3
    text-[15px]
    font-semibold
    text-white
    transition
    hover:bg-[#e61e4d]
  "
>
  {nights > 0 ? "Reserve" : "Check availability"}
</button>


                <p className="mt-3 text-center text-[12px] text-[#666666]">
                  You won't be charged yet
                </p>



              </div>

            </aside>

</div>


{/* =========================
    GUEST FAVORITE - AIRBNB STYLE
========================= */}

<section className="border-t border-[#dddddd] py-5">

  {/* 5.0 + LAURELS */}

  <div className="flex flex-col items-center text-center">

    <div className="flex items-center justify-center gap-2">

     <img
  src={laurelLeft}
  alt=""
  className="h-[250px] w-[80px] object-contain"
/>
      {/* RATING */}
      <span className="text-[84px] font-semibold leading-none tracking-[-3px] text-[#222222]">
  {detail.rating || "5.0"}
</span>

      {/* RIGHT LAUREL */}
      <img
  src={laurelRight}
  alt=""
  className="h-[250px] w-[80px] object-contain"
/>

    </div>


    {/* GUEST FAVORITE */}

   <h2 className="mt-0 text-[22px] font-semibold leading-[28px] text-[#222222]">
  Guest favorite
</h2>

    {/* AIRBNB TEXT */}

    <p className="mt-3 max-w-[600px] text-[15px] leading-[22px] text-[#717171]">
      This home is in the{" "}
      <span className="font-semibold text-[#222222]">
        top 10%
      </span>{" "}
      of eligible listings based on ratings, reviews, and reliability
    </p>


    {/* HOW REVIEWS WORK */}

    <button
      type="button"
      className="mt-4 text-[14px] font-semibold text-[#222222] underline underline-offset-2"
    >
      How reviews work
    </button>

  </div>


  {/* =========================
      RATING BREAKDOWN
  ========================== */}

  <div className="mt-10 border-t border-[#dddddd] pt-2">

    <div className="grid grid-cols-1 lg:grid-cols-7">


      {/* =========================
          OVERALL RATING
      ========================== */}

      <div className="border-b border-[#dddddd] pb-7 lg:border-b-0 lg:border-r lg:pr-7">

        <p className="text-[14px] font-semibold text-[#222222]">
          Overall rating
        </p>

        <div className="mt-4 space-y-[1px]">

          {[
  ["5", detail.ratingDistribution?.[5] || 0],
  ["4", detail.ratingDistribution?.[4] || 0],
  ["3", detail.ratingDistribution?.[3] || 0],
  ["2", detail.ratingDistribution?.[2] || 0],
  ["1", detail.ratingDistribution?.[1] || 0],
].map(([star, percentage]) => (

            <div
              key={star}
              className="flex items-center gap-3"
            >

              <span className="w-[8px] text-[12px] text-[#717171]">
                {star}
              </span>

              <div className="h-[4px] w-full rounded-full bg-[#dddddd]">

                <div
                  className="h-full rounded-full bg-[#222222]"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =========================
          CLEANLINESS
      ========================== */}

      <div className="border-b border-[#dddddd] px-5 py-6 lg:border-b-0 lg:border-r">

        <p className="text-[14px] text-[#222222]">
          Cleanliness
        </p>

        <p className="mt-2 text-[14px] font-semibold text-[#222222]">
  {detail.ratingBreakdown?.cleanliness?.toFixed(1) || "0.0"}
</p>

        <div className="mt-6 text-[25px] text-[#222222]">
          ♧
        </div>

      </div>


      {/* =========================
          ACCURACY
      ========================== */}

      <div className="border-b border-[#dddddd] px-5 py-6 lg:border-b-0 lg:border-r">

        <p className="text-[14px] text-[#222222]">
          Accuracy
        </p>

       <p className="mt-2 text-[14px] font-semibold text-[#222222]">
  {detail.ratingBreakdown?.accuracy?.toFixed(1) || "0.0"}
</p>

        <div className="mt-6 text-[25px] text-[#222222]">
          ✓
        </div>

      </div>


      {/* =========================
          CHECK-IN
      ========================== */}

      <div className="border-b border-[#dddddd] px-5 py-6 lg:border-b-0 lg:border-r">

        <p className="text-[14px] text-[#222222]">
          Check-in
        </p>

        <p className="mt-2 text-[14px] font-semibold text-[#222222]">
  {detail.ratingBreakdown?.checkIn?.toFixed(1) || "0.0"}
</p>

        <div className="mt-6 text-[25px] text-[#222222]">
          🔑
        </div>

      </div>


      {/* =========================
          COMMUNICATION
      ========================== */}

      <div className="border-b border-[#dddddd] px-5 py-6 lg:border-b-0 lg:border-r">

        <p className="text-[14px] text-[#222222]">
          Communication
        </p>

     <p className="mt-2 text-[14px] font-semibold text-[#222222]">
  {detail.ratingBreakdown?.communication?.toFixed(1) || "0.0"}
</p>

        <div className="mt-6 text-[25px] text-[#222222]">
          💬
        </div>

      </div>


      {/* =========================
          LOCATION
      ========================== */}

      <div className="border-b border-[#dddddd] px-5 py-6 lg:border-b-0 lg:border-r">

        <p className="text-[14px] text-[#222222]">
          Location
        </p>

      <p className="mt-2 text-[14px] font-semibold text-[#222222]">
  {detail.ratingBreakdown?.location?.toFixed(1) || "0.0"}
</p>

        <div className="mt-6 text-[25px] text-[#222222]">
          ⌖
        </div>

      </div>


      {/* =========================
          VALUE
      ========================== */}

      <div className="px-5 py-6">

        <p className="text-[14px] text-[#222222]">
          Value
        </p>

       <p className="mt-2 text-[14px] font-semibold text-[#222222]">
  {detail.ratingBreakdown?.value?.toFixed(1) || "0.0"}
</p>

        <div className="mt-6 text-[25px] text-[#222222]">
          ◇
        </div>

      </div>

    </div>

  </div>

</section>
{/* =========================
    GUEST REVIEWS MENTION
========================= */}

<section className="border-t border-[#dddddd] py-10">

  {/* SECTION TITLE */}
  <h2 className="text-[22px] font-semibold leading-[28px] tracking-[-0.3px] text-[#222222]">
    Guest reviews mention
  </h2>

  {/* =========================
      REVIEW MENTION PILLS
  ========================== */}

  <div className="relative mt-6">

   


    {/* PILLS SCROLLER */}

    <div
      
      className="
        flex
        gap-3
        overflow-x-auto
        px-1
        py-2
        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      "
    >

      {/* HOSPITALITY */}
      <button
        type="button"
        className="
          flex
          h-[46px]
          shrink-0
          items-center
          gap-1.5
          rounded-full
          border
          border-[#dddddd]
          bg-white
          px-4
          text-[13px]
          transition
          hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]
        "
      >
        <span className="text-[16px]">🎁</span>

        <span className="font-semibold text-[#222222]">
          Hospitality
        </span>

        <span className="text-[#717171]">
          {detail.reviewMentions?.Hospitality || 0}
        </span>
      </button>


      {/* CLEANLINESS */}
      <button
        type="button"
        className="
          flex
          h-[46px]
          shrink-0
          items-center
          gap-1.5
          rounded-full
          border
          border-[#dddddd]
          bg-white
          px-4
          text-[13px]
          transition
          hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]
        "
      >
        <span className="text-[16px]">🧼</span>

        <span className="font-semibold text-[#222222]">
          Cleanliness
        </span>

        <span className="text-[#717171]">
          {detail.reviewMentions?.Cleanliness || 0}
        </span>
      </button>


      {/* ACCURACY */}
      <button
        type="button"
        className="
          flex
          h-[46px]
          shrink-0
          items-center
          gap-1.5
          rounded-full
          border
          border-[#dddddd]
          bg-white
          px-4
          text-[13px]
          transition
          hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]
        "
      >
        <span className="text-[16px]">✅</span>

        <span className="font-semibold text-[#222222]">
          Accuracy
        </span>

        <span className="text-[#717171]">
          {detail.reviewMentions?.Accuracy || 0}
        </span>
      </button>


      {/* COMFORT */}
      <button
        type="button"
        className="
          flex
          h-[46px]
          shrink-0
          items-center
          gap-1.5
          rounded-full
          border
          border-[#dddddd]
          bg-white
          px-4
          text-[13px]
          transition
          hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]
        "
      >
        <span className="text-[16px]">🛋️</span>

        <span className="font-semibold text-[#222222]">
          Comfort
        </span>

        <span className="text-[#717171]">
          {detail.reviewMentions?.Comfort || 0}

        </span>
      </button>


      {/* CHECK-IN */}
      <button
        type="button"
        className="
          flex
          h-[46px]
          shrink-0
          items-center
          gap-1.5
          rounded-full
          border
          border-[#dddddd]
          bg-white
          px-4
          text-[13px]
          transition
          hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]
        "
      >
        <span className="text-[16px]">🔢</span>

        <span className="font-semibold text-[#222222]">
          Check-in
        </span>

        <span className="text-[#717171]">
          {detail.reviewMentions?.["Check-in"] || 0}

        </span>
      </button>


      {/* LOCATION */}
      <button
        type="button"
        className="
          flex
          h-[46px]
          shrink-0
          items-center
          gap-1.5
          rounded-full
          border
          border-[#dddddd]
          bg-white
          px-4
          text-[13px]
          transition
          hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]
        "
      >
        <span className="text-[16px]">📍</span>

        <span className="font-semibold text-[#222222]">
          Location
        </span>

        <span className="text-[#717171]">
          {detail.reviewMentions?.Location || 0}
        </span>
      </button>


      {/* NEARBY */}
      <button
        type="button"
        className="
          flex
          h-[46px]
          shrink-0
          items-center
          gap-1.5
          rounded-full
          border
          border-[#dddddd]
          bg-white
          px-4
          text-[13px]
          transition
          hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]
        "
      >
        <span className="text-[16px]">🏞️</span>

        <span className="font-semibold text-[#222222]">
          Nearby
        </span>

        <span className="text-[#717171]">
          {detail.reviewMentions?.Nearby || 0}
        </span>
      </button>

    </div>



  </div>

  {/* =========================
      REVIEWS
  ========================== */}
<div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">

  {detail.reviews?.map((review, index) => (

    <article key={`${review.name}-${index}`}>

      {/* REVIEWER */}

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-[56px]
            w-[56px]
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-full
            bg-[#e8e8e8]
          "
        >

          <span className="text-[18px] font-semibold text-[#555555]">
            {review.initial || review.name?.charAt(0)}
          </span>

        </div>

        <div>

          <p className="text-[16px] font-semibold text-[#222222]">
            {review.name}
          </p>

          <p className="mt-1 text-[14px] text-[#717171]">
            {review.subtitle}
          </p>

        </div>

      </div>


      {/* REVIEW CONTENT */}

      <div className="mt-5">

        <p className="text-[14px] text-[#555555]">

          {"★".repeat(review.rating || 5)}

          <span className="mx-2">·</span>

          {review.time}

          <span className="mx-2">·</span>

          {review.stay}

        </p>

        <p className="mt-3 text-[16px] leading-[24px] text-[#222222]">
          {review.text}
        </p>

        <button
          type="button"
          className="
            mt-3
            text-[15px]
            font-semibold
            text-[#222222]
            underline
            underline-offset-2
          "
        >
          Show more
        </button>

      </div>

    </article>

  ))}

</div>

  {/* =========================
      SHOW ALL REVIEWS
  ========================== */}

  <button
    type="button"
    className="
      mt-10
      rounded-[8px]
      border
      border-[#222222]
      px-5
      py-3
      text-[14px]
      font-semibold
      text-[#222222]
      transition
      hover:bg-[#f7f7f7]
    "
  >
    Show all reviews
  </button>

</section>


{/* =========================
    LOCATION
========================= */}

<div className="my-8 border-t border-[#dddddd]" />

<section>

  <h2 className="text-[22px] font-semibold leading-[28px]">
    Where you'll be
  </h2>

  <p className="mt-2 text-[15px] text-[#555555]">
  {detail.location}
</p>

  <div className="mt-6 flex h-[320px] items-center justify-center rounded-[18px] bg-[#eeeeee]">
    <div className="text-center">

      <div className="text-[34px]">
        📍
      </div>

     <p className="mt-2 font-medium">
  {detail.location}
</p>

      <p className="mt-1 text-[13px] text-[#777777]">
        Exact location provided after booking
      </p>

    </div>
  </div>

</section>



{/* =========================
    MEET YOUR HOST
========================= */}

<section className="border-t border-[#dddddd] py-10">

  <h2 className="text-[22px] font-semibold leading-[28px] text-[#222222]">
    Meet your host
  </h2>

  <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr]">

    {/* HOST PROFILE */}
    <div>

      <div
        className="
          flex
          min-h-[170px]
          flex-col
          items-center
          justify-center
          rounded-[16px]
          bg-[#f7f7f7]
          px-6
          py-7
        "
      >

        <div
          className="
            flex
            h-[80px]
            w-[80px]
            items-center
            justify-center
            rounded-full
            bg-[#222222]
            text-[28px]
            font-semibold
            text-white
          "
        >
          {(detail.hostName || "A").charAt(0).toUpperCase()}
        </div>

        <h3 className="mt-3 text-[18px] font-semibold text-[#222222]">
          {detail.hostName || "Host"}
        </h3>

        <p className="mt-1 text-[13px] text-[#717171]">
         {detail.isSuperhost ? "Superhost" : "Host"}
        </p>

      </div>

    </div>


    {/* HOST DETAILS */}
    <div>

    <h3 className="text-[16px] font-semibold text-[#222222]">
  {detail.hostName || "Host"}{" "}
  {detail.isSuperhost ? "is a Superhost" : "is your host"}
</h3>

      <p className="mt-2 max-w-[600px] text-[14px] leading-6 text-[#555555]">
  {detail.isSuperhost
    ? "Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests."
    : "Your host is here to help make your stay comfortable and enjoyable."}
</p>


      {/* HOST STATS */}

      <div className="mt-7 grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3">

        <div>
        <p className="text-[14px] font-semibold text-[#222222]">
  {detail.hostResponseRate}%
</p>

          <p className="mt-1 text-[13px] text-[#717171]">
            Response rate
          </p>
        </div>

        <div>
         <p className="text-[14px] font-semibold text-[#222222]">
  {detail.hostResponseTime}
</p>

          <p className="mt-1 text-[13px] text-[#717171]">
            Response time
          </p>
        </div>

        <div>
          <p className="text-[14px] font-semibold text-[#222222]">
  {detail.hostingYears} years
</p>

          <p className="mt-1 text-[13px] text-[#717171]">
            Hosting experience
          </p>
        </div>

      </div>


      {/* HOST MESSAGE */}

   <p className="mt-7 max-w-[650px] text-[14px] leading-6 text-[#555555]">
  {detail.hostBio}
</p>


      <button
        type="button"
        className="
          mt-5
          rounded-[8px]
          border
          border-[#222222]
          px-5
          py-3
          text-[14px]
          font-semibold
          text-[#222222]
          transition
          hover:bg-[#f7f7f7]
        "
      >
        Message host
      </button>

    </div>

  </div>

</section>

{/* =========================
    THINGS TO KNOW
========================= */}

<section className="border-t border-[#dddddd] py-10">

  <h2 className="text-[22px] font-semibold leading-[28px] text-[#222222]">
    Things to know
  </h2>

  <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">

    {/* HOUSE RULES */}

    <div>

      <h3 className="text-[16px] font-semibold text-[#222222]">
        House rules
      </h3>

      <div className="mt-5 space-y-5">

        {detail.houseRules?.map((rule, index) => (
          <div
            key={`${rule.text}-${index}`}
            className="flex items-start gap-4"
          >
            <span className="text-[20px]">
              {rule.icon}
            </span>

            <p className="text-[14px] leading-5 text-[#222222]">
              {rule.text}
            </p>
          </div>
        ))}

      </div>

      <button
        type="button"
        className="
          mt-5
          text-[14px]
          font-semibold
          underline
          underline-offset-2
        "
      >
        Show more
      </button>

    </div>


    {/* SAFETY & PROPERTY */}

    <div>

      <h3 className="text-[16px] font-semibold text-[#222222]">
        Safety & property
      </h3>

      <div className="mt-5 space-y-5">

        {detail.safety?.map((item, index) => (
          <div
            key={`${item.text}-${index}`}
            className="flex items-start gap-4"
          >
            <span className="text-[20px]">
              {item.icon}
            </span>

            <p className="text-[14px] leading-5 text-[#222222]">
              {item.text}
            </p>
          </div>
        ))}

      </div>

      <button
        type="button"
        className="
          mt-5
          text-[14px]
          font-semibold
          underline
          underline-offset-2
        "
      >
        Show more
      </button>

    </div>


    {/* CANCELLATION */}

    <div>

      <h3 className="text-[16px] font-semibold text-[#222222]">
        Cancellation policy
      </h3>

      <div className="mt-5">

        <p className="text-[14px] leading-6 text-[#222222]">
          {detail.cancellationDetails?.title}
        </p>

        <p className="mt-4 text-[14px] leading-6 text-[#555555]">
          {detail.cancellationDetails?.description}
        </p>

        <button
          type="button"
          className="
            mt-5
            text-[14px]
            font-semibold
            underline
            underline-offset-2
          "
        >
          Review the full cancellation policy
        </button>

      </div>

    </div>

  </div>

</section>


{/* =========================
    MORE STAYS NEARBY
========================= */}

<section className="border-t border-[#dddddd] py-10">

  <div className="flex items-center justify-between">

    <h2 className="text-[22px] font-semibold leading-[28px] text-[#222222]">
      More stays nearby
    </h2>

    <div className="flex items-center gap-2">

      <button
        type="button"
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          border
          border-[#dddddd]
          text-[16px]
          hover:bg-[#f7f7f7]
        "
      >
        ←
      </button>

      <button
        type="button"
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          border
          border-[#dddddd]
          text-[16px]
          hover:bg-[#f7f7f7]
        "
      >
        →
      </button>

    </div>

  </div>


  {/* STAYS */}

  <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

    {allListings
      .filter((listing) => listing.id !== property.id)
      .slice(0, 5)
      .map((listing) => {

        const nearbyImages =
          listingImages[listing.id] || [];

        const nearbyImage =
          nearbyImages[0]?.url;

        return (
          <div
            key={listing.id}
            className="min-w-0"
          >

            {/* IMAGE */}

            <div className="relative overflow-hidden rounded-[12px]">

              {nearbyImage ? (
                <img
                  src={nearbyImage}
                  alt={listing.title}
                  className="
                    aspect-square
                    w-full
                    object-cover
                    transition
                    duration-300
                    hover:scale-105
                  "
                />
              ) : (
                <div className="aspect-square w-full bg-[#eeeeee]" />
              )}

              {/* HEART */}

              <button
                type="button"
                className="
                  absolute
                  right-2
                  top-2
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-sm
                "
              >
                ♡
              </button>

            </div>


            {/* DETAILS */}

            <div className="mt-3">

              <p className="truncate text-[13px] font-semibold text-[#222222]">
                {listing.title}
              </p>

              <p className="mt-1 truncate text-[12px] text-[#717171]">
                {listing.location}
              </p>

              <p className="mt-1 text-[12px] text-[#717171]">
                ★ {listing.rating || "4.8"}
              </p>

              <p className="mt-1 text-[12px] text-[#222222]">
                <span className="font-semibold">
                  ${listing.price}
                </span>{" "}
                night
              </p>

            </div>

          </div>
        );

      })}

  </div>

</section>





<div className="my-8 border-t border-[#dddddd]" />




        </div>

      </main>
    </>
  );
}

export default ListingDetails;