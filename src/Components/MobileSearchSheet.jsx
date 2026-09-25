import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { FiSearch, FiX } from "react-icons/fi";

import { destinations } from "../data/destinations";
import {
  setLocation,
  setStartDate,
  setEndDate,
  setAdults,
  setChildren,
  setInfants,
  setPets,
  increaseAdults,
  decreaseAdults,
  increaseChildren,
  decreaseChildren,
  increaseInfants,
  decreaseInfants,
  increasePets,
  decreasePets,
} from "../redux/searchSlice";

const GUEST_ROWS = [
  { key: "adults", label: "Adults", hint: "Ages 13 or above", inc: increaseAdults, dec: decreaseAdults },
  { key: "children", label: "Children", hint: "Ages 2–12", inc: increaseChildren, dec: decreaseChildren },
  { key: "infants", label: "Infants", hint: "Under 2", inc: increaseInfants, dec: decreaseInfants },
  { key: "pets", label: "Pets", hint: "Bringing a service animal?", inc: increasePets, dec: decreasePets },
];

const counterButton =
  "flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#b0b0b0] bg-white text-[18px] leading-none disabled:opacity-30";

const cardClass = "rounded-[20px] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.12)]";

// Full-screen search for phones (Where / When / Who as stacked cards),
// opened from the search pill at the top of the page.
function MobileSearchSheet({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useSelector((state) => state.search);

  const [open, setOpen] = useState("where");

  // Lock page scroll while the sheet is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const totalGuests = search.adults + search.children + search.infants;
  const today = dayjs().format("YYYY-MM-DD");

  const onDate = (setter, value, isStart) => {
    if (!value) {
      dispatch(setter(null));
      return;
    }

    const date = dayjs(value);
    dispatch(setter(date));

    // Keep check-out after check-in.
    if (isStart && search.endDate && !search.endDate.isAfter(date, "day")) {
      dispatch(setEndDate(null));
    }
  };

  const clearAll = () => {
    dispatch(setLocation(""));
    dispatch(setStartDate(null));
    dispatch(setEndDate(null));
    dispatch(setAdults(0));
    dispatch(setChildren(0));
    dispatch(setInfants(0));
    dispatch(setPets(0));
  };

  const runSearch = () => {
    onClose();
    navigate("/search");
  };

  const summary = {
    where: search.location || "I'm flexible",
    when: search.startDate
      ? `${search.startDate.format("D MMM")}${
          search.endDate ? ` – ${search.endDate.format("D MMM")}` : ""
        }`
      : "Add dates",
    who:
      totalGuests > 0
        ? `${totalGuests} guest${totalGuests === 1 ? "" : "s"}`
        : "Add guests",
  };

  const collapsedCard = (id, label) => (
    <button
      type="button"
      onClick={() => setOpen(id)}
      className={`${cardClass} flex w-full items-center justify-between text-left`}
    >
      <span className="text-[15px] text-[#717171]">{label}</span>
      <span className="text-[15px] font-semibold text-[#222222]">
        {summary[id]}
      </span>
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-[2000] flex flex-col bg-[#f7f7f7]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="flex items-center justify-center px-4 pb-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#dddddd] bg-white"
        >
          <FiX size={18} />
        </button>
        <p className="text-[16px] font-semibold text-[#222222]">Search</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-28 pt-3">
        {/* WHERE */}
        {open === "where" ? (
          <div className={cardClass}>
            <h2 className="text-[22px] font-semibold text-[#222222]">
              Where to?
            </h2>

            <div className="mt-4 max-h-[52vh] overflow-y-auto">
              {destinations.map((item) => (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => {
                    dispatch(setLocation(item.title));
                    setOpen("when");
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl px-1 py-3 text-left hover:bg-[#f7f7f7]"
                >
                  <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#f5f5f5] text-[26px]">
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-[#222222]">
                      {item.title}
                    </span>
                    <span className="block text-[14px] text-[#717171]">
                      {item.subtitle}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          collapsedCard("where", "Where")
        )}

        {/* WHEN */}
        {open === "when" ? (
          <div className={cardClass}>
            <h2 className="text-[22px] font-semibold text-[#222222]">
              When's your trip?
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[12px] font-semibold uppercase text-[#222222]">
                  Check-in
                </span>
                <input
                  type="date"
                  min={today}
                  value={search.startDate?.format("YYYY-MM-DD") || ""}
                  onChange={(event) =>
                    onDate(setStartDate, event.target.value, true)
                  }
                  className="mt-1 w-full rounded-[10px] border border-[#b0b0b0] px-3 py-3 text-[15px]"
                />
              </label>

              <label className="block">
                <span className="text-[12px] font-semibold uppercase text-[#222222]">
                  Check-out
                </span>
                <input
                  type="date"
                  min={
                    search.startDate
                      ? search.startDate.add(1, "day").format("YYYY-MM-DD")
                      : today
                  }
                  value={search.endDate?.format("YYYY-MM-DD") || ""}
                  onChange={(event) =>
                    onDate(setEndDate, event.target.value, false)
                  }
                  className="mt-1 w-full rounded-[10px] border border-[#b0b0b0] px-3 py-3 text-[15px]"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => setOpen("who")}
              className="mt-5 text-[15px] font-semibold underline"
            >
              Next
            </button>
          </div>
        ) : (
          collapsedCard("when", "When")
        )}

        {/* WHO */}
        {open === "who" ? (
          <div className={cardClass}>
            <h2 className="text-[22px] font-semibold text-[#222222]">
              Who's coming?
            </h2>

            {GUEST_ROWS.map((row) => {
              const limitReached =
                row.key === "pets"
                  ? search.pets >= 5
                  : row.key === "infants"
                  ? false
                  : totalGuests >= 16;

              return (
                <div
                  key={row.key}
                  className="flex items-center justify-between border-b border-[#eeeeee] py-4 last:border-b-0"
                >
                  <div>
                    <p className="text-[16px] font-semibold text-[#222222]">
                      {row.label}
                    </p>
                    <p className="text-[14px] text-[#717171]">{row.hint}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      aria-label={`Fewer ${row.label.toLowerCase()}`}
                      disabled={search[row.key] <= 0}
                      onClick={() => dispatch(row.dec())}
                      className={counterButton}
                    >
                      −
                    </button>
                    <span className="w-4 text-center text-[16px]">
                      {search[row.key]}
                    </span>
                    <button
                      type="button"
                      aria-label={`More ${row.label.toLowerCase()}`}
                      disabled={limitReached}
                      onClick={() => dispatch(row.inc())}
                      className={counterButton}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          collapsedCard("who", "Who")
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-[#dddddd] bg-white px-5 py-4">
        <button
          type="button"
          onClick={clearAll}
          className="text-[15px] font-semibold underline"
        >
          Clear all
        </button>

        <button
          type="button"
          onClick={runSearch}
          className="flex items-center gap-2 rounded-[10px] bg-[#E31C5F] px-6 py-3 text-[15px] font-semibold text-white"
        >
          <FiSearch size={18} strokeWidth={2.5} />
          Search
        </button>
      </div>
    </div>
  );
}

export default MobileSearchSheet;
