import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiGlobe, FiHelpCircle, FiMenu } from "react-icons/fi";

import { useAuth } from "../AuthContext";

const itemClass =
  "block w-full px-5 py-3 text-left text-[15px] text-[#222222] hover:bg-[#f7f7f7]";

const Divider = () => <div className="mx-0 my-2 h-px bg-[#dddddd]" />;

// The right-hand side of every header: "Become a host", globe, avatar and the
// hamburger menu. It knows whether the visitor is logged in, so the menu shows
// "Log in or sign up" or Wishlists / Trips / Log out accordingly.
function UserMenu({ className = "" }) {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, openAuthModal, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const name =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "Guest";
  const initial = name.charAt(0).toUpperCase();

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative flex items-center gap-2 sm:gap-3 ${className}`}
    >
      <button
        type="button"
        onClick={isLoggedIn ? () => goTo("/profile") : openAuthModal}
        className="hidden rounded-full px-3 py-3 text-[15px] font-semibold text-[#222222] transition hover:bg-[#f0f0f0] lg:block"
      >
        {isLoggedIn ? "Switch to hosting" : "Become a host"}
      </button>

      {!isLoggedIn && (
        <button
          type="button"
          aria-label="Language and currency"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#eeeeee] text-[20px] transition hover:bg-[#e5e5e5]"
        >
          <FiGlobe />
        </button>
      )}

      {isLoggedIn && (
        <button
          type="button"
          aria-label="Your profile"
          onClick={() => goTo("/profile")}
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#f7e8dc] text-[15px] font-semibold text-[#222222] transition hover:bg-[#efdccb]"
        >
          {initial}
        </button>
      )}

      <button
        type="button"
        aria-label="Main menu"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#eeeeee] text-[20px] transition hover:bg-[#e5e5e5]"
      >
        <FiMenu />
      </button>

      {open && (
        <div className="absolute right-0 top-[52px] z-[1000] w-[calc(100vw-24px)] rounded-[18px] bg-white py-2 shadow-[0_8px_28px_rgba(0,0,0,0.18)] sm:w-[285px]">
          {isLoggedIn ? (
            <>
              <div className="px-5 pb-1 pt-3">
                <p className="text-[15px] font-semibold text-[#222222]">
                  {name}
                </p>
                <p className="truncate text-[13px] text-[#717171]">
                  {currentUser?.email}
                </p>
              </div>

              <Divider />

              <button type="button" className={itemClass} onClick={() => goTo("/wishlists")}>
                Wishlists
              </button>
              <button type="button" className={itemClass} onClick={() => goTo("/profile?tab=trips")}>
                Trips
              </button>
              <button type="button" className={itemClass} onClick={() => goTo("/profile")}>
                Profile
              </button>

              <Divider />

              <button type="button" className={`${itemClass} flex items-center gap-3`}>
                <FiHelpCircle size={20} strokeWidth={1.8} />
                Help Center
              </button>
              <button type="button" className={itemClass}>
                Gift cards
              </button>

              <Divider />

              <button type="button" className={itemClass} onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button type="button" className={`${itemClass} flex items-center gap-4 py-4`}>
                <FiHelpCircle size={22} strokeWidth={1.8} />
                Help Center
              </button>

              <Divider />

              <button
                type="button"
                className={itemClass}
                onClick={() => {
                  setOpen(false);
                  openAuthModal();
                }}
              >
                <span className="block font-semibold">Become a host</span>
                <span className="mt-1 block max-w-[250px] text-[14px] leading-[20px] text-[#717171]">
                  It's easy to start hosting and earn extra income.
                </span>
              </button>

              <Divider />

              <button type="button" className={itemClass}>
                Find a co-host
              </button>
              <button type="button" className={itemClass}>
                Gift cards
              </button>

              <Divider />

              <button
                type="button"
                className={itemClass}
                onClick={() => {
                  setOpen(false);
                  openAuthModal();
                }}
              >
                Log in or sign up
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserMenu;
