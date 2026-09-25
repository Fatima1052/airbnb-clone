import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const arrowClass =
  "absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#222222] opacity-0 shadow transition hover:scale-105 group-hover:opacity-100";

// Photo slider for a listing card: swipe on phones, arrows on hover on desktop,
// dots underneath. Anything passed as children (heart, badge) is drawn on top.
function ImageCarousel({ images, alt, className = "", children }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const slides = images.slice(0, 5);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  const go = (event, direction) => {
    // The card is a link – arrows must not open the listing.
    event.preventDefault();
    event.stopPropagation();

    const track = trackRef.current;
    if (!track) return;

    track.scrollTo({
      left: (index + direction) * track.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`group relative overflow-hidden bg-[#eeeeee] ${className}`}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="scrollbar-hide flex h-full snap-x snap-mandatory overflow-x-auto"
      >
        {slides.map((url, position) => (
          <img
            key={`${url}-${position}`}
            src={url}
            alt={position === 0 ? alt : ""}
            loading={position === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            className="h-full w-full shrink-0 snap-center object-cover"
          />
        ))}
      </div>

      {slides.length > 1 && index > 0 && (
        <button
          type="button"
          aria-label="Previous photo"
          onClick={(event) => go(event, -1)}
          className={`${arrowClass} left-3`}
        >
          <FiChevronLeft size={16} />
        </button>
      )}

      {slides.length > 1 && index < slides.length - 1 && (
        <button
          type="button"
          aria-label="Next photo"
          onClick={(event) => go(event, 1)}
          className={`${arrowClass} right-3`}
        >
          <FiChevronRight size={16} />
        </button>
      )}

      {slides.length > 1 && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, position) => (
            <span
              key={position}
              className={`h-[6px] w-[6px] rounded-full ${
                position === index ? "bg-white" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {children}
    </div>
  );
}

export default ImageCarousel;
