import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { FiClock, FiGlobe, FiShare, FiUsers } from "react-icons/fi";

import ListingHeader from "../Components/ListingHeader";
import HeartButton from "../Components/HeartButton";
import NotFound from "./NotFound";
import { useAuth } from "../AuthContext";
import { useFavorites } from "../FavoritesContext";
import {
  allExperiences,
  allServices,
  favoriteKey,
  parsePrice,
} from "../data/catalog";
import { formatMoney } from "../utils/pricing";

const counterButton =
  "flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#b0b0b0] bg-white text-[18px] leading-none hover:border-black disabled:cursor-not-allowed disabled:opacity-30";

// Detail page for an experience or a service.
// The source data only has a photo, title, place, price and rating, so the
// descriptive text below is generic placeholder copy until the backend supplies it.
function ExtraDetails({ kind }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, openAuthModal } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isExperience = kind === "experience";
  const item = (isExperience ? allExperiences : allServices).find(
    (entry) => String(entry.id) === id
  );

  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    if (item) document.title = `${item.title} - Airbnb`;
  }, [item]);

  if (!item) return <NotFound />;

  const noun = isExperience ? "experience" : "service";
  const unitPrice = parsePrice(item.price);
  const perGroup = /group/i.test(item.price);
  const total = perGroup ? unitPrice : unitPrice * guests;
  const key = favoriteKey(kind, item.id);

  const reserve = () => {
    if (!date) {
      setDateError(true);
      return;
    }

    if (!isLoggedIn) {
      openAuthModal();
      return;
    }

    navigate(`/book/${kind}/${item.id}?date=${date}&adults=${guests}`);
  };

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: item.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        window.alert("Link copied!");
      }
    } catch {
      // The person closed the share sheet – nothing to do.
    }
  };

  return (
    <>
      <ListingHeader />

      <main className="mx-auto max-w-[1120px] px-4 pb-24 pt-6 sm:px-6 md:px-8">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-[24px] font-semibold leading-[30px] text-[#222222] sm:text-[28px]">
            {item.title}
          </h1>

          <div className="hidden shrink-0 items-center gap-1 sm:flex">
            <button
              type="button"
              onClick={share}
              className="flex items-center gap-2 rounded-[8px] px-3 py-2 text-[14px] font-semibold underline hover:bg-[#f7f7f7]"
            >
              <FiShare size={17} />
              Share
            </button>
          </div>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-[16px] bg-[#eeeeee]">
          <img
            src={item.image}
            alt={item.title}
            className="h-[280px] w-full object-cover sm:h-[420px]"
          />
          <HeartButton
            size={30}
            saved={isFavorite(key)}
            onClick={() => toggleFavorite(key)}
            className="absolute right-4 top-4"
          />
          {item.original && (
            <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold shadow">
              Airbnb Original
            </span>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_370px]">
          {/* LEFT */}
          <div>
            <p className="text-[15px] text-[#555555]">
              {item.rating && <>★ {item.rating} · </>}
              {item.location}
            </p>

            <h2 className="mt-2 text-[22px] font-semibold text-[#222222]">
              {isExperience ? "Experience" : "Service"} hosted by a verified host
            </h2>

            <div className="my-8 border-t border-[#dddddd]" />

            <ul className="space-y-6">
              <li className="flex gap-4">
                <FiClock size={24} className="mt-1 shrink-0" />
                <div>
                  <p className="font-semibold">Flexible duration</p>
                  <p className="text-[15px] text-[#717171]">
                    Usually 2–3 hours. The host confirms the exact time.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <FiUsers size={24} className="mt-1 shrink-0" />
                <div>
                  <p className="font-semibold">Small group</p>
                  <p className="text-[15px] text-[#717171]">
                    Hosted for a small number of guests so it stays personal.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <FiGlobe size={24} className="mt-1 shrink-0" />
                <div>
                  <p className="font-semibold">Hosted in English</p>
                  <p className="text-[15px] text-[#717171]">
                    More languages can be added by the host.
                  </p>
                </div>
              </li>
            </ul>

            <div className="my-8 border-t border-[#dddddd]" />

            <h2 className="text-[22px] font-semibold text-[#222222]">
              About this {noun}
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-[#222222]">
              {item.title}. Join a local host in {item.location} for a
              memorable {noun}. Full details, photos and reviews will appear
              here once hosts can publish their own {noun}s.
            </p>

            <div className="my-8 border-t border-[#dddddd]" />

            <h2 className="text-[22px] font-semibold text-[#222222]">
              Cancellation policy
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-[#222222]">
              Cancel at least 24 hours before it starts for a full refund.
            </p>
          </div>

          {/* RIGHT – booking box */}
          <aside>
            <div className="sticky top-[100px] rounded-[16px] border border-[#dddddd] bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
              <p className="text-[22px] font-semibold">
                {formatMoney(unitPrice)}{" "}
                <span className="text-[14px] font-normal text-[#555555]">
                  {perGroup ? "/ group" : "/ guest"}
                </span>
              </p>

              <label className="mt-5 block">
                <span className="text-[10px] font-bold uppercase">Date</span>
                <input
                  type="date"
                  min={dayjs().add(1, "day").format("YYYY-MM-DD")}
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setDateError(false);
                  }}
                  className={`mt-1 w-full rounded-[10px] border px-3 py-3 text-[15px] ${
                    dateError ? "border-[#c13515]" : "border-[#777777]"
                  }`}
                />
                {dateError && (
                  <span className="mt-1 block text-[13px] text-[#c13515]">
                    Choose a date first.
                  </span>
                )}
              </label>

              <div className="mt-4 flex items-center justify-between rounded-[10px] border border-[#777777] p-3">
                <div>
                  <p className="text-[10px] font-bold uppercase">Guests</p>
                  <p className="mt-1 text-[13px] text-[#666666]">
                    {guests} guest{guests === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Fewer guests"
                    disabled={guests <= 1}
                    onClick={() => setGuests((count) => count - 1)}
                    className={counterButton}
                  >
                    −
                  </button>
                  <span className="w-4 text-center">{guests}</span>
                  <button
                    type="button"
                    aria-label="More guests"
                    disabled={guests >= 10}
                    onClick={() => setGuests((count) => count + 1)}
                    className={counterButton}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={reserve}
                className="mt-5 w-full rounded-[10px] bg-[#ff385c] py-3 text-[15px] font-semibold text-white transition hover:bg-[#e61e4d]"
              >
                Reserve
              </button>

              <p className="mt-3 text-center text-[12px] text-[#666666]">
                You won't be charged yet
              </p>

              <div className="mt-5 flex justify-between border-t border-[#dddddd] pt-4 text-[15px] font-semibold">
                <span>Total</span>
                <span>{formatMoney(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default ExtraDetails;
