import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiHeart, FiSearch, FiUser } from "react-icons/fi";

import { useAuth } from "../AuthContext";

// Pages where a bottom "Reserve" bar (or no bar at all) is used instead.
const HIDDEN_ON = ["/listing/", "/experience/", "/service/", "/book/"];

// Airbnb's phone layout: Explore / Wishlists / Log in (or Profile) at the bottom.
function MobileBottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, openAuthModal } = useAuth();

  if (HIDDEN_ON.some((prefix) => pathname.startsWith(prefix))) return null;

  const itemClass = (active) =>
    `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium ${
      active ? "text-[#FF385C]" : "text-[#717171]"
    }`;

  const profileActive = pathname === "/profile";

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-[900] flex border-t border-[#dddddd] bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <NavLink
        to="/"
        className={() =>
          itemClass(
            ["/", "/homes", "/experiences", "/services", "/search"].includes(
              pathname
            )
          )
        }
      >
        <FiSearch size={22} />
        Explore
      </NavLink>

      <NavLink
        to="/wishlists"
        className={({ isActive }) => itemClass(isActive)}
      >
        <FiHeart size={22} />
        Wishlists
      </NavLink>

      <button
        type="button"
        onClick={() => (isLoggedIn ? navigate("/profile") : openAuthModal())}
        className={itemClass(profileActive)}
      >
        <FiUser size={22} />
        {isLoggedIn ? "Profile" : "Log in"}
      </button>
    </nav>
  );
}

export default MobileBottomNav;
