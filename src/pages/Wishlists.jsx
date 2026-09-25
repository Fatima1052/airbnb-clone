import { Link } from "react-router-dom";

import ListingHeader from "../Components/ListingHeader";
import HeartButton from "../Components/HeartButton";
import { useAuth } from "../AuthContext";
import { useFavorites } from "../FavoritesContext";
import {
  detailPath,
  favoriteKey,
  findItemByFavoriteKey,
} from "../data/catalog";

function Wishlists() {
  const { isLoggedIn, authLoading, openAuthModal } = useAuth();
  const { favoriteKeys, favoritesLoading, toggleFavorite } = useFavorites();

  // Newest saves first, ignoring anything that no longer exists in the catalog.
  const saved = [...favoriteKeys]
    .reverse()
    .map((key) => findItemByFavoriteKey(key))
    .filter(Boolean);

  let content;

  if (authLoading || (isLoggedIn && favoritesLoading)) {
    content = (
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} aria-hidden="true">
            <div className="aspect-square animate-pulse rounded-[16px] bg-[#ececec]" />
            <div className="mt-3 h-[14px] w-3/4 animate-pulse rounded bg-[#ececec]" />
          </div>
        ))}
      </div>
    );
  } else if (!isLoggedIn) {
    content = (
      <div className="max-w-[460px] py-6">
        <h2 className="text-[22px] font-semibold">Log in to see your wishlists</h2>
        <p className="mt-2 text-[16px] text-[#6a6a6a]">
          You can create wishlists and save your favorite places after you log in.
        </p>
        <button
          type="button"
          onClick={openAuthModal}
          className="mt-6 rounded-[10px] bg-[#FF385C] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#e61e4d]"
        >
          Log in
        </button>
      </div>
    );
  } else if (saved.length === 0) {
    content = (
      <div className="max-w-[460px] py-6">
        <h2 className="text-[22px] font-semibold">No saved places yet</h2>
        <p className="mt-2 text-[16px] text-[#6a6a6a]">
          As you search, tap the heart icon to save your favorite places to stay.
        </p>
        <Link
          to="/homes"
          className="mt-6 inline-block rounded-[10px] bg-[#222222] px-6 py-3 text-[15px] font-semibold text-white hover:bg-black"
        >
          Start exploring
        </Link>
      </div>
    );
  } else {
    content = (
      <>
        <p className="mb-6 text-[15px] text-[#6a6a6a]">
          {saved.length} saved {saved.length === 1 ? "place" : "places"}
        </p>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map(({ kind, item }) => {
            const key = favoriteKey(kind, item.id);

            return (
              <Link key={key} to={detailPath(kind, item.id)} className="block">
                <div className="relative aspect-square overflow-hidden rounded-[16px] bg-[#eeeeee]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <HeartButton
                    saved
                    onClick={() => toggleFavorite(key)}
                    className="absolute right-3 top-3"
                  />
                </div>

                <div className="mt-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[15px] font-semibold text-[#222222]">
                      {item.title}
                    </p>
                    {item.rating && (
                      <p className="shrink-0 text-[14px]">★ {item.rating}</p>
                    )}
                  </div>

                  {item.location && (
                    <p className="text-[14px] text-[#717171]">{item.location}</p>
                  )}
                  <p className="mt-1 text-[14px] text-[#222222]">{item.price}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <ListingHeader />

      <main className="mx-auto min-h-[60vh] max-w-[1280px] px-5 py-10 md:px-8">
        <h1 className="mb-2 text-[30px] font-semibold text-[#222222]">
          Wishlists
        </h1>

        {content}
      </main>
    </>
  );
}

export default Wishlists;
