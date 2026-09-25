import { useEffect, useState } from "react";

// true while the browser window matches the CSS media query, e.g.
//   const isDesktop = useMediaQuery("(min-width: 768px)");
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}
