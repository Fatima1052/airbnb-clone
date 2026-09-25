import { Link } from "react-router-dom";

import HeartButton from "./HeartButton";
import { useFavorites } from "../FavoritesContext";
import { detailPath, favoriteKey } from "../data/catalog";

// Same width rules as before so every slider shows 1.5 / 2.5 / 4 / 5 / 6 cards.
export const CARD_WIDTH = `
  shrink-0
  snap-start
  w-[calc((100%-16px)/1.5)]
  sm:w-[calc((100%-32px)/2.5)]
  md:w-[calc((100%-48px)/4)]
  lg:w-[calc((100%-64px)/5)]
  xl:w-[calc((100%-80px)/6)]
`;

const badgeClass =
  "absolute left-[14px] top-[14px] z-[2] rounded-[18px] bg-white px-[10px] py-[5px] text-[12px] font-semibold text-[#222222] shadow-[0_2px_8px_rgba(0,0,0,0.12)]";

// kind: "home" | "experience" | "service" – decides where the card links to
// and which wishlist key it uses (their ids overlap, see data/catalog.js).
function PropertyCard({
  id,
  kind = "home",
  image,
  title,
  price,
  rating,
  guestFavorite,
  original,
  popular,
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const key = favoriteKey(kind, id);

  return (
    <Link
      to={detailPath(kind, id)}
      className={`block cursor-pointer ${CARD_WIDTH}`}
    >
      <div className="w-full">
        <div className="relative aspect-square overflow-hidden rounded-[14px] bg-[#eeeeee]">
          {guestFavorite && <div className={badgeClass}>Guest favorite</div>}
          {!guestFavorite && original && (
            <div className={badgeClass}>Original</div>
          )}
          {!guestFavorite && !original && popular && (
            <div className={badgeClass}>Popular</div>
          )}

          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />

          <HeartButton
            saved={isFavorite(key)}
            onClick={() => toggleFavorite(key)}
            className="absolute right-[10px] top-[10px]"
          />
        </div>

        <div className="mt-[10px]">
          <h3
            className="
              m-0 text-[13px]
              sm:text-[14px]
              md:text-[15px]
              font-semibold text-[#222222]
            "
          >
            {title}
          </h3>

          <div className="mt-[7px] flex items-center gap-[14px]">
            <p
              className="
                m-0 text-[12px]
                sm:text-[13px] font-normal text-[#222222]
              "
            >
              {price}
            </p>

            {rating && (
              <div className="-ml-[8px] flex items-center gap-[2px] text-[13px] text-[#222222]">
                <span>★</span>
                <span>{rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className={CARD_WIDTH} aria-hidden="true">
      <div className="aspect-square animate-pulse rounded-[14px] bg-[#ececec]" />
      <div className="mt-[10px] h-[14px] w-3/4 animate-pulse rounded bg-[#ececec]" />
      <div className="mt-[9px] h-[12px] w-1/2 animate-pulse rounded bg-[#ececec]" />
    </div>
  );
}

export default PropertyCard;
