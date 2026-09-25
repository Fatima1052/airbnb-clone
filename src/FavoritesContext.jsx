import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import {
  addFavorite,
  getFavoriteKeys,
  removeFavorite,
} from "./services/favorites";

// One place that knows which listings the logged-in user has saved.
// Reading and writing the saved list goes through services/favorites.js.
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { currentUser, openAuthModal } = useAuth();
  const uid = currentUser?.uid;

  const [favoriteKeys, setFavoriteKeys] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  // Always holds the latest list so rapid clicks never act on stale state.
  const latestKeys = useRef([]);
  latestKeys.current = favoriteKeys;

  // Load once when the user logs in, clear when they log out.
  useEffect(() => {
    if (!uid) {
      setFavoriteKeys([]);
      setFavoritesLoading(false);
      return undefined;
    }

    let cancelled = false;
    setFavoritesLoading(true);

    getFavoriteKeys(uid)
      .then((keys) => {
        if (!cancelled) setFavoriteKeys(keys);
      })
      .catch((error) => {
        console.error("Error loading favorites:", error);
      })
      .finally(() => {
        if (!cancelled) setFavoritesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [uid]);

  const isFavorite = useCallback(
    (key) => favoriteKeys.includes(String(key)),
    [favoriteKeys]
  );

  const toggleFavorite = useCallback(
    async (key) => {
      if (!uid) {
        openAuthModal();
        return;
      }

      const favoriteKey = String(key);
      const wasSaved = latestKeys.current.includes(favoriteKey);

      // Update the heart immediately, undo it if the save fails.
      setFavoriteKeys((previous) =>
        wasSaved
          ? previous.filter((item) => item !== favoriteKey)
          : [...previous, favoriteKey]
      );

      try {
        if (wasSaved) {
          await removeFavorite(uid, favoriteKey);
        } else {
          await addFavorite(uid, favoriteKey);
        }
      } catch (error) {
        console.error("Error updating favorite:", error);

        setFavoriteKeys((previous) =>
          wasSaved
            ? [...previous, favoriteKey]
            : previous.filter((item) => item !== favoriteKey)
        );
      }
    },
    [uid, openAuthModal]
  );

  const value = useMemo(
    () => ({ favoriteKeys, favoritesLoading, isFavorite, toggleFavorite }),
    [favoriteKeys, favoritesLoading, isFavorite, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
