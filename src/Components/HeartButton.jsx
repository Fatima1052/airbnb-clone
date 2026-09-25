// Airbnb-style wishlist heart. Sits on top of photos: white outline when not
// saved, solid red when saved.
function HeartButton({ saved, onClick, size = 26, className = "" }) {
  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={!!saved}
      onClick={(event) => {
        // The heart usually sits inside a <Link>; don't navigate when it is clicked.
        event.preventDefault();
        event.stopPropagation();
        onClick?.(event);
      }}
      className={`flex h-9 w-9 cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-transform duration-150 hover:scale-110 active:scale-95 ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
        fill={saved ? "#FF385C" : "rgba(0,0,0,0.5)"}
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinejoin="round"
      >
        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05A6.98 6.98 0 0 0 9 4a6.98 6.98 0 0 0-7 7c0 7 7 12.27 14 17z" />
      </svg>
    </button>
  );
}

export default HeartButton;
