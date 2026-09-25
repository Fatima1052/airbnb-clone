import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { calculatePricing, formatMoney } from "../utils/pricing";

const GUEST_ROWS = [
  { key: "adults", label: "Adults", hint: "Age 13+" },
  { key: "children", label: "Children", hint: "Ages 2–12" },
  { key: "infants", label: "Infants", hint: "Under 2" },
  { key: "pets", label: "Pets", hint: "Bringing a service animal?" },
];

export const defaultGuests = { adults: 1, children: 0, infants: 0, pets: 0 };

export const guestSummary = (guests) => {
  const total = guests.adults + guests.children + guests.infants;
  const parts = [`${total} guest${total === 1 ? "" : "s"}`];
  if (guests.pets > 0) {
    parts.push(`${guests.pets} pet${guests.pets === 1 ? "" : "s"}`);
  }
  return parts.join(", ");
};

const counterButton =
  "flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#b0b0b0] bg-white text-[18px] leading-none text-[#222222] transition hover:border-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#b0b0b0]";

// The sticky "reserve" box on the right of a listing / experience page.
//   unit: "night" (homes) or "guest" (experiences and services)
function BookingCard({
  unitPrice,
  unit = "night",
  rating,
  dateRange,
  onPickDates,
  guests,
  setGuests,
  maxGuests = 16,
  onReserve,
  className = "",
}) {
  const [startDate, endDate] = dateRange;
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestRef = useRef(null);

  const nights = startDate && endDate ? endDate.diff(startDate, "day") : 0;
  const hasDates = nights > 0;
  const pricing = calculatePricing(unitPrice, nights);

  const totalGuests = guests.adults + guests.children + guests.infants;
  const atLimit = totalGuests >= maxGuests;

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setGuestsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const change = (key, delta) => {
    setGuests((previous) => {
      const next = { ...previous, [key]: previous[key] + delta };
      // A booking always needs at least one adult.
      if (next.adults < 1) next.adults = 1;
      if (next[key] < 0) next[key] = 0;
      return next;
    });
  };

  const canIncrease = (key) => {
    if (key === "pets") return guests.pets < 5;
    // Infants don't count towards the limit, same as on Airbnb.
    if (key === "infants") return guests.infants < 5;
    return !atLimit;
  };

  const dateBox = (label, date) => (
    <button
      type="button"
      onClick={onPickDates}
      className="p-3 text-left hover:bg-[#f7f7f7]"
    >
      <p className="text-[10px] font-bold uppercase">{label}</p>
      <p className="mt-1 text-[13px] text-[#666666]">
        {date ? date.format("MMM D, YYYY") : "Add date"}
      </p>
    </button>
  );

  return (
    <div
      className={`
        rounded-[16px]
        border
        border-[#dddddd]
        bg-white
        p-6
        shadow-[0_6px_20px_rgba(0,0,0,0.12)]
        ${className}
      `}
    >
      {/* PRICE */}
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-[22px] font-semibold">
          {hasDates
            ? `${formatMoney(pricing.subtotal)} for ${nights} ${
                nights === 1 ? "night" : "nights"
              }`
            : unitPrice
            ? "Add dates for prices"
            : "Add dates"}
        </span>

        {!hasDates && unitPrice > 0 && (
          <span className="text-[14px] text-[#555555]">
            {formatMoney(unitPrice)} {unit}
          </span>
        )}
      </div>

      {rating && <div className="mt-2 text-[13px]">★ {rating}</div>}

      {/* DATES + GUESTS */}
      <div ref={guestRef} className="relative mt-5">
        <div className="overflow-hidden rounded-[10px] border border-[#777777]">
          <div className="grid grid-cols-2">
            <div className="border-r border-[#777777]">
              {dateBox("Check-in", startDate)}
            </div>
            {dateBox("Checkout", endDate)}
          </div>

          <button
            type="button"
            onClick={() => setGuestsOpen((open) => !open)}
            aria-expanded={guestsOpen}
            className="flex w-full items-center justify-between border-t border-[#777777] p-3 text-left hover:bg-[#f7f7f7]"
          >
            <div>
              <p className="text-[10px] font-bold uppercase">Guests</p>
              <p className="mt-1 text-[13px] text-[#666666]">
                {guestSummary(guests)}
              </p>
            </div>

            {guestsOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </button>
        </div>

        {guestsOpen && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-[14px] border border-[#dddddd] bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
            {GUEST_ROWS.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="text-[15px] font-medium text-[#222222]">
                    {row.label}
                  </p>
                  <p className="text-[13px] text-[#717171]">{row.hint}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Fewer ${row.label.toLowerCase()}`}
                    disabled={
                      row.key === "adults"
                        ? guests.adults <= 1
                        : guests[row.key] <= 0
                    }
                    onClick={() => change(row.key, -1)}
                    className={counterButton}
                  >
                    −
                  </button>

                  <span className="w-5 text-center text-[15px]">
                    {guests[row.key]}
                  </span>

                  <button
                    type="button"
                    aria-label={`More ${row.label.toLowerCase()}`}
                    disabled={!canIncrease(row.key)}
                    onClick={() => change(row.key, 1)}
                    className={counterButton}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <p className="mt-1 text-[12px] leading-[16px] text-[#717171]">
              This place has a maximum of {maxGuests} guests, not including
              infants. Pets aren't allowed unless the host says so.
            </p>

            <button
              type="button"
              onClick={() => setGuestsOpen(false)}
              className="mt-2 block w-full text-right text-[14px] font-semibold underline"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* RESERVE */}
      <button
        type="button"
        onClick={hasDates ? onReserve : onPickDates}
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
        {hasDates ? "Reserve" : "Check availability"}
      </button>

      <p className="mt-3 text-center text-[12px] text-[#666666]">
        You won't be charged yet
      </p>

      {/* PRICE BREAKDOWN */}
      {hasDates && (
        <div className="mt-5 space-y-3 text-[15px] text-[#222222]">
          <div className="flex justify-between">
            <span className="underline">
              {formatMoney(pricing.nightlyPrice)} × {nights}{" "}
              {nights === 1 ? "night" : "nights"}
            </span>
            <span>{formatMoney(pricing.subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="underline">Airbnb service fee</span>
            <span>{formatMoney(pricing.serviceFee)}</span>
          </div>

          <div className="flex justify-between border-t border-[#dddddd] pt-4 font-semibold">
            <span>Total before taxes</span>
            <span>{formatMoney(pricing.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingCard;
