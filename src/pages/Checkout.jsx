import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { FiCheckCircle, FiChevronLeft } from "react-icons/fi";

import ListingHeader from "../Components/ListingHeader";
import NotFound from "./NotFound";
import { useAuth } from "../AuthContext";
import { allListings, listingImages } from "../data/listingsData";
import {
  allExperiences,
  allServices,
  detailPath,
  parsePrice,
} from "../data/catalog";
import { calculatePricing, formatMoney } from "../utils/pricing";
import { createBooking } from "../services/bookings";

const num = (value) => Math.max(0, Number(value) || 0);

// "Confirm and pay" page. Everything here is real (dates, guests, price maths);
// the last step calls services/bookings.js, which is where the backend plugs in.
function Checkout() {
  const { kind, id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { isLoggedIn, authLoading, openAuthModal } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  // Set once the backend confirms the booking — swaps the whole page for a
  // confirmation screen so "did it work?" has an obvious answer.
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const isHome = kind === "home";
  const item = isHome
    ? allListings.find((entry) => String(entry.id) === id)
    : (kind === "experience" ? allExperiences : allServices).find(
        (entry) => String(entry.id) === id
      );

  const guests = {
    adults: Math.max(1, num(params.get("adults"))),
    children: num(params.get("children")),
    infants: num(params.get("infants")),
    pets: num(params.get("pets")),
  };
  const guestCount = guests.adults + guests.children + guests.infants;

  const checkIn = params.get("checkIn") ? dayjs(params.get("checkIn")) : null;
  const checkOut = params.get("checkOut") ? dayjs(params.get("checkOut")) : null;
  const activityDate = params.get("date") ? dayjs(params.get("date")) : null;

  const nights = checkIn && checkOut ? checkOut.diff(checkIn, "day") : 0;

  // Homes: price per night × nights. Experiences/services: price per guest
  // (or per group). The price is read from the catalog, never from the URL.
  const unitPrice = parsePrice(item?.price);
  const pricing = isHome
    ? calculatePricing(unitPrice, nights)
    : calculatePricing(
        unitPrice,
        /group/i.test(item?.price || "") ? 1 : guestCount
      );

  const validTrip = isHome ? nights > 0 : !!activityDate;

  useEffect(() => {
    document.title = "Confirm and pay - Airbnb";
  }, []);

  // Not logged in (e.g. opened the link directly): ask them to log in first.
  useEffect(() => {
    if (!authLoading && !isLoggedIn) openAuthModal();
  }, [authLoading, isLoggedIn, openAuthModal]);

  if (!item || !validTrip) return <NotFound />;

  const image = isHome ? listingImages[item.id]?.[0]?.url || item.image : item.image;

  const guestText = `${guestCount} guest${guestCount === 1 ? "" : "s"}${
    guests.pets ? `, ${guests.pets} pet${guests.pets === 1 ? "" : "s"}` : ""
  }`;

  if (confirmedBooking) {
    return (
      <>
        <ListingHeader maxWidth="max-w-[1120px]" />

        <main className="mx-auto max-w-[640px] px-4 py-20 text-center sm:px-6">
          <FiCheckCircle className="mx-auto text-[56px] text-[#008a05]" />

          <h1 className="mt-6 text-[26px] font-semibold text-[#222222]">
            Booking confirmed!
          </h1>

          <p className="mt-3 text-[16px] text-[#6a6a6a]">
            Your reservation at <strong>{item.title}</strong> is booked.
          </p>

          <div className="mt-8 rounded-[16px] border border-[#dddddd] p-6 text-left">
            <div className="flex gap-4">
              <img
                src={image}
                alt={item.title}
                className="h-[72px] w-[72px] rounded-[10px] object-cover"
              />
              <div>
                <p className="text-[16px] font-semibold">{item.title}</p>
                <p className="text-[14px] text-[#717171]">
                  {isHome
                    ? `${checkIn.format("MMM D")} – ${checkOut.format("MMM D, YYYY")}`
                    : activityDate.format("dddd, MMM D, YYYY")}
                </p>
                <p className="text-[14px] text-[#717171]">{guestText}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between border-t border-[#dddddd] pt-4 text-[16px] font-semibold">
              <span>Total paid (USD)</span>
              <span>{formatMoney(pricing.total)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => navigate("/profile?tab=trips")}
              className="rounded-[10px] bg-[#222222] px-6 py-3 text-[15px] font-semibold text-white hover:bg-black"
            >
              View my trips
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-[10px] border border-[#dddddd] px-6 py-3 text-[15px] font-semibold hover:bg-[#f7f7f7]"
            >
              Back to home
            </button>
          </div>
        </main>
      </>
    );
  }

  const confirm = async () => {
    setMessage("");
    setSubmitting(true);

    try {
      const booking = await createBooking({
        kind,
        itemId: item.id,
        checkIn: checkIn?.format("YYYY-MM-DD"),
        checkOut: checkOut?.format("YYYY-MM-DD"),
        date: activityDate?.format("YYYY-MM-DD"),
        guests,
        pricing,
      });

      setConfirmedBooking(booking || true);
    } catch (error) {
      setMessage(
        error.message === "BOOKING_BACKEND_NOT_CONNECTED"
          ? "Booking isn't available yet – payments and reservations will work once the backend is connected."
          : error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const row = (label, value) => (
    <div className="flex justify-between py-1 text-[15px]">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );

  return (
    <>
      <ListingHeader maxWidth="max-w-[1120px]" />

      <main className="mx-auto max-w-[1120px] px-4 pb-24 pt-8 sm:px-6 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f2f2f2]"
          >
            <FiChevronLeft size={22} />
          </button>
          <h1 className="text-[28px] font-semibold text-[#222222]">
            Confirm and pay
          </h1>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
          {/* LEFT: trip + payment */}
          <div>
            <h2 className="text-[22px] font-semibold">Your trip</h2>

            <div className="mt-5 flex justify-between">
              <div>
                <p className="font-semibold">{isHome ? "Dates" : "Date"}</p>
                <p className="text-[15px] text-[#555555]">
                  {isHome
                    ? `${checkIn.format("MMM D")} – ${checkOut.format(
                        "MMM D, YYYY"
                      )}`
                    : activityDate.format("dddd, MMM D, YYYY")}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="font-semibold">Guests</p>
              <p className="text-[15px] text-[#555555]">{guestText}</p>
            </div>

            <div className="my-8 border-t border-[#dddddd]" />

            <h2 className="text-[22px] font-semibold">Pay with</h2>
            <div className="mt-4 rounded-[12px] border border-[#dddddd] p-4 text-[15px] text-[#717171]">
              Payment methods will be added together with the backend.
            </div>

            <div className="my-8 border-t border-[#dddddd]" />

            <h2 className="text-[22px] font-semibold">Cancellation policy</h2>
            <p className="mt-3 text-[15px] leading-[22px] text-[#555555]">
              {isHome
                ? "Free cancellation for 48 hours. After that, cancel before check-in for a partial refund."
                : "Cancel at least 24 hours before it starts for a full refund."}
            </p>

            <div className="my-8 border-t border-[#dddddd]" />

            <button
              type="button"
              disabled={submitting || !isLoggedIn}
              onClick={confirm}
              className="w-full rounded-[10px] bg-[#ff385c] py-4 text-[16px] font-semibold text-white transition hover:bg-[#e61e4d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12"
            >
              {submitting ? "Confirming…" : "Confirm booking"}
            </button>

            {message && (
              <p
                role="alert"
                className="mt-4 rounded-[10px] bg-[#fff4e5] px-4 py-3 text-[14px] text-[#7a4b00]"
              >
                {message}
              </p>
            )}
          </div>

          {/* RIGHT: summary card */}
          <aside>
            <div className="rounded-[16px] border border-[#dddddd] p-6">
              <div className="flex gap-4">
                <img
                  src={image}
                  alt={item.title}
                  className="h-[96px] w-[96px] rounded-[10px] object-cover"
                />
                <div>
                  <p className="text-[16px] font-semibold">{item.title}</p>
                  <p className="text-[14px] text-[#717171]">{item.location}</p>
                  {item.rating && (
                    <p className="mt-1 text-[14px]">★ {item.rating}</p>
                  )}
                </div>
              </div>

              <div className="my-6 border-t border-[#dddddd]" />

              <h3 className="text-[20px] font-semibold">Price details</h3>

              <div className="mt-3">
                {isHome
                  ? row(
                      `${formatMoney(pricing.nightlyPrice)} × ${nights} ${
                        nights === 1 ? "night" : "nights"
                      }`,
                      formatMoney(pricing.subtotal)
                    )
                  : row(
                      `${formatMoney(pricing.nightlyPrice)} × ${
                        pricing.nights
                      } ${/group/i.test(item.price) ? "group" : "guests"}`,
                      formatMoney(pricing.subtotal)
                    )}
                {row("Airbnb service fee", formatMoney(pricing.serviceFee))}
              </div>

              <div className="mt-4 flex justify-between border-t border-[#dddddd] pt-4 text-[16px] font-semibold">
                <span>Total (USD)</span>
                <span>{formatMoney(pricing.total)}</span>
              </div>
            </div>

            <Link
              to={detailPath(kind, item.id)}
              className="mt-4 block text-center text-[14px] font-semibold underline"
            >
              View {isHome ? "listing" : kind}
            </Link>
          </aside>
        </div>
      </main>
    </>
  );
}

export default Checkout;
