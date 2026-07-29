
import logo from "../assests/airbnblogo.png";
import all from  "../assests/all.jfif";
import home from "../assests/home.png";
import experience from "../assests/experiences.jpg";
import service from "../assests/services.jfif";

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
<header className="flex items-center justify-between h-[80px] px-5">

  {/* Left */}
  <div className="flex items-center text-2xl font-bold text-[#ff385c] gap-[1px]">
    <img
      src={logo}
      alt="Airbnb Logo"
      className="w-[50px] cursor-pointer"
    />
    airbnb
  </div>

  {/* Center */}
  <div className="flex gap-[30px]">

    <NavLink
      to="/"
      end
      className={({ isActive }) =>
        `flex items-center gap-[7px] no-underline text-inherit ${
          isActive ? "font-semibold border-b-2 border-black pb-2" : ""
        }`
      }
    >
      <img
        src={all}
        alt="All"
        className="w-[35px] h-[55px] object-contain"
      />
      <p className="m-0 text-[14px]">All</p>
    </NavLink>

    <NavLink
      to="/homes"
      className={({ isActive }) =>
        `flex items-center gap-[7px] no-underline text-inherit ${
          isActive ? "font-semibold border-b-2 border-black pb-2" : ""
        }`
      }
    >
      <img
        src={home}
        alt="Homes"
        className="w-[35px] h-[55px] object-contain"
      />
      <p className="m-0 text-[14px]">Homes</p>
    </NavLink>

    <NavLink
      to="/experiences"
      className={({ isActive }) =>
        `flex items-center gap-[7px] no-underline text-inherit ${
          isActive ? "font-semibold border-b-2 border-black pb-2" : ""
        }`
      }
    >
      <img
        src={experience}
        alt="Experiences"
        className="w-[35px] h-[55px] object-contain"
      />
      <p className="m-0 text-[14px]">Experiences</p>
    </NavLink>

    <NavLink
      to="/services"
      className={({ isActive }) =>
        `flex items-center gap-[7px] no-underline text-inherit ${
          isActive ? "font-semibold border-b-2 border-black pb-2" : ""
        }`
      }
    >
      <img
        src={service}
        alt="Services"
        className="w-[35px] h-[55px] object-contain"
      />
      <p className="m-0 text-[14px]">Services</p>
    </NavLink>

  </div>

  {/* Right */}
  <div className="flex items-center gap-[15px]">

    <p>Become a host</p>

    <button className="w-[35px] h-[35px] rounded-full bg-[#f3f1f1] border-none text-[18px] cursor-pointer">
      🌐
    </button>

    <button className="w-[35px] h-[35px] rounded-full bg-[#f3f1f1] border-none text-[18px] cursor-pointer">
      ☰
    </button>

  </div>

</header>
  );
}

export default Navbar;