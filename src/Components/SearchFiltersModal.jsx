import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

import { DEFAULT_FILTERS } from "../utils/searchFilters";

const TYPES = [
  { value: "any", label: "Any type", icon: "🏘️" },
  { value: "room", label: "Room", icon: "🛏️" },
  { value: "home", label: "Entire home", icon: "🏠" },
  { value: "hotel", label: "Hotel", icon: "🏨" },
];

const RATINGS = [
  { value: 0, label: "Any" },
  { value: 4.5, label: "4.5+" },
  { value: 4.8, label: "4.8+" },
  { value: 4.9, label: "4.9+" },
];

const chip = (active) =>
  `rounded-full border px-4 py-2 text-[14px] transition ${
    active
      ? "border-[#222222] bg-[#f7f7f7] font-semibold"
      : "border-[#dddddd] hover:border-[#222222]"
  }`;

// Popup with the filters that work on the data we have today.
// `countResults(draft)` lets the button show how many places would match.
function SearchFiltersModal({ filters, onApply, onClose, countResults }) {
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const update = (patch) => setDraft((previous) => ({ ...previous, ...patch }));

  // Keep min <= max when both are set.
  const setPrice = (field, raw) => {
    const value = Math.max(0, Number(raw) || 0);
    update({ [field]: value });
  };

  const priceInvalid =
    draft.maxPrice > 0 && draft.minPrice > draft.maxPrice;

  const total = countResults(draft);

  return (
    <div
      className="fixed inset-0 z-[1500] flex items-end justify-center bg-black/50 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-[24px] bg-white sm:max-w-[640px] sm:rounded-[24px]"
      >
        <div className="relative border-b border-[#dddddd] px-6 py-4 text-center">
          <button
            type="button"
            aria-label="Close filters"
            onClick={onClose}
            className="absolute left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-[#f2f2f2]"
          >
            <FiX size={18} />
          </button>
          <h2 className="text-[16px] font-semibold">Filters</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* TYPE */}
          <section>
            <h3 className="text-[20px] font-semibold">Type of place</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TYPES.map((type) => (
                <button
                  type="button"
                  key={type.value}
                  onClick={() => update({ type: type.value })}
                  className={`flex flex-col items-start gap-2 rounded-[12px] border p-4 text-left text-[14px] ${
                    draft.type === type.value
                      ? "border-[#222222] bg-[#f7f7f7] font-semibold"
                      : "border-[#dddddd] hover:border-[#222222]"
                  }`}
                >
                  <span className="text-[24px]">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </section>

          <div className="my-8 border-t border-[#dddddd]" />

          {/* PRICE */}
          <section>
            <h3 className="text-[20px] font-semibold">Price range</h3>
            <p className="mt-1 text-[14px] text-[#717171]">
              Price for 2 nights, as shown on each listing
            </p>

            <div className="mt-5 flex items-center gap-3">
              <label className="flex-1 rounded-[12px] border border-[#b0b0b0] px-4 py-2">
                <span className="block text-[12px] text-[#717171]">Minimum</span>
                <span className="flex items-center">
                  $
                  <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={draft.minPrice || ""}
                    placeholder="0"
                    onChange={(event) => setPrice("minPrice", event.target.value)}
                    className="w-full bg-transparent pl-1 text-[16px] outline-none"
                  />
                </span>
              </label>

              <span className="text-[#717171]">–</span>

              <label className="flex-1 rounded-[12px] border border-[#b0b0b0] px-4 py-2">
                <span className="block text-[12px] text-[#717171]">Maximum</span>
                <span className="flex items-center">
                  $
                  <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    value={draft.maxPrice || ""}
                    placeholder="No limit"
                    onChange={(event) => setPrice("maxPrice", event.target.value)}
                    className="w-full bg-transparent pl-1 text-[16px] outline-none"
                  />
                </span>
              </label>
            </div>

            {priceInvalid && (
              <p className="mt-2 text-[13px] text-[#c13515]">
                The minimum price can't be higher than the maximum.
              </p>
            )}
          </section>

          <div className="my-8 border-t border-[#dddddd]" />

          {/* RATING */}
          <section>
            <h3 className="text-[20px] font-semibold">Guest rating</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {RATINGS.map((rating) => (
                <button
                  type="button"
                  key={rating.value}
                  onClick={() => update({ minRating: rating.value })}
                  className={chip(draft.minRating === rating.value)}
                >
                  {rating.value > 0 ? "★ " : ""}
                  {rating.label}
                </button>
              ))}
            </div>
          </section>

          <div className="my-8 border-t border-[#dddddd]" />

          {/* GUEST FAVORITE */}
          <section>
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <span>
                <span className="block text-[20px] font-semibold">
                  Guest favorites
                </span>
                <span className="block text-[14px] text-[#717171]">
                  The most loved homes on Airbnb
                </span>
              </span>
              <input
                type="checkbox"
                checked={draft.guestFavorite}
                onChange={(event) =>
                  update({ guestFavorite: event.target.checked })
                }
                className="h-6 w-6 accent-[#222222]"
              />
            </label>
          </section>
        </div>

        <div className="flex items-center justify-between border-t border-[#dddddd] px-6 py-4">
          <button
            type="button"
            onClick={() => setDraft(DEFAULT_FILTERS)}
            className="text-[15px] font-semibold underline"
          >
            Clear all
          </button>

          <button
            type="button"
            disabled={priceInvalid}
            onClick={() => {
              onApply(draft);
              onClose();
            }}
            className="rounded-[10px] bg-[#222222] px-6 py-3 text-[15px] font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            {total === 0
              ? "No places match"
              : `Show ${total} ${total === 1 ? "place" : "places"}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFiltersModal;
