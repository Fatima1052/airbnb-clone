
import logo from "../assests/airbnblogo.png";
import all from  "../assests/all.jfif";
import home from "../assests/homedetailpageicon.avif";
import experience from "../assests/experiences.jpg";
import service from "../assests/services.jfif";

import {
  FiGlobe,
  FiMenu,
  FiHelpCircle,
} from "react-icons/fi";

import { NavLink, useLocation } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const location = useLocation();

const [activeTab, setActiveTab] = useState("/");
const [, setIsScrolled] = useState(false);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const menuRef = useRef(null);
const allControls = useAnimation();
const homeControls = useAnimation();
const experienceControls = useAnimation();
const serviceControls = useAnimation();

useEffect(() => {
  setActiveTab(location.pathname);
}, [location.pathname]);


useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


useEffect(() => {
  const playAnimation = async () => {

    if (activeTab === "/") {
      await allControls.start({
        scale: 1.18,
        transition: { duration: 0.19 },
      });

      await allControls.start({
        scale: 1,
        transition: { duration: 0.19 },
      });
    }

    if (activeTab === "/homes") {
      await homeControls.start({
        scale: 1.18,
        transition: { duration: 0.19 },
      });

      await homeControls.start({
        scale: 1,
        transition: { duration: 0.19 },
      });
    }

    if (activeTab === "/experiences") {
      await experienceControls.start({
        scale: 1.18,
        transition: { duration: 0.19 },
      });

      await experienceControls.start({
        scale: 1,
        transition: { duration: 0.19 },
      });
    }

    if (activeTab === "/services") {
      await serviceControls.start({
        scale: 1.18,
        transition: { duration: 0.19 },
      });

      await serviceControls.start({
        scale: 1,
        transition: { duration: 0.19 },
      });
    }

  };

  playAnimation();

}, [
  activeTab,
  allControls,
  homeControls,
  experienceControls,
  serviceControls,
]);




useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (


    <header
className="
sticky
top-0
  relative
z-50
flex
items-center
justify-between
h-[88px]
px-2
sm:px-4
md:px-6
lg:px-8
xl:px-10
bg-[#fafafa]
transition-all
duration-300
"
>

  {/* Left */}
<div
className="
flex
items-center
gap-1
text-[#ff385c]
font-black
"
>
  <img
    src={logo}
    alt="Airbnb Logo"
    className="
    w-[28px]
    sm:w-[32px]
    md:w-[36px]
    lg:w-[40px]
    "
  />

  <span
  className="
  hidden
  md:block
  text-[25px]
  font-semibold
  tracking-[-1px]
  text-[#FF385C]
"
>
  airbnb
</span>
</div>

  {/* Center */}
<div
className="
hidden
md:flex
items-center
gap-2
sm:gap-4
md:gap-5
lg:gap-[30px]
lg:ml-20
"
>

<NavLink
  to="/"
  end
 className="
relative
flex
items-center
gap-[4px]
sm:gap-[6px]
lg:gap-[7px]
no-underline
text-black
"
>
  <motion.img
  src={all}
  alt="All"
  whileHover={{
  scale: 1.15,
}}
  className="
w-[28px]
h-[28px]
sm:w-[32px]
sm:h-[32px]
lg:w-[36px]
lg:h-[36px]
object-contain
"
 animate={allControls}
  transition={{
    type: "spring",
    stiffness: 450,
    damping: 28,
  }}
/>

 


<motion.p
  animate={{
    opacity: 1,
  }}
  transition={{
    duration: 0.2,
  }}
  className={`mt-[2px] text-[11px]
sm:text-[12px]
lg:text-[14px] leading-[20px] ${
    activeTab === "/"
      ? "font-semibold text-[#222222]"
      : "font-[550] text-[#6A6A6A]"
  }`}
>
  All
</motion.p>







  {activeTab === "/" && (
   <motion.div
  layoutId="activeLine"
  transition={{
    type: "spring",
    stiffness: 500,
    damping: 35,
  }}
  className="absolute -bottom-2 h-[2px] w-full rounded-full bg-black"
/>
  )}
</NavLink>




   <NavLink
  to="/homes"
  className="
relative
flex
items-center
gap-[1px]
no-underline
text-black
"
>

  <div className="w-[63px] h-[63px] flex items-center justify-center">
  <motion.img
    src={home}
    alt="Homes"
    whileHover={{
  scale: 1.15,
}}
 className="w-[63px] h-[63px] object-cover"
  animate={homeControls}
    transition={{
      duration: 0.25,
      ease: "easeOut",
    }}
  />
  </div>

  <span
  className={`mt-0 text-[11px]
sm:text-[12px]
lg:text-[14px] leading-[20px] ${
    activeTab === "/homes"
      ? "font-semibold text-[#222222]"
      : "font-[550] text-[#6A6A6A]"
  }`}
>


    Homes
  </span>

  {activeTab === "/homes" && (
    <motion.div
      layoutId="activeLine"
       className="absolute -bottom-2 h-[2px] w-full rounded-full bg-black"
    />
  )}
</NavLink>

    <NavLink
  to="/experiences"
  className="
relative
flex
items-center
gap-[4px]
sm:gap-[6px]
lg:gap-[7px]
no-underline
text-black
"
>
  <motion.img
    src={experience}
    alt="Experiences"
     whileHover={{
    scale: 1.15,
  }}
  className="
w-[34px]
h-[34px]
sm:w-[38px]
sm:h-[38px]
lg:w-[42px]
lg:h-[42px]
object-contain
"
    animate={experienceControls}
    transition={{
      duration: 0.22,
      ease: "easeOut",
    }}
  />

  <p
    className={`mt-[2px] text-[11px]
sm:text-[12px]
lg:text-[14px] leading-none ${
      activeTab === "/experiences"
        ? "font-semibold text-[#222]"
       : "font-[550] text-[#6A6A6A]"
    }`}
  >
    Experiences
  </p>

  {activeTab === "/experiences" && (
    <motion.div
      layoutId="activeLine"
      className="absolute -bottom-2 h-[2px] w-full rounded-full bg-black"
    />
  )}
</NavLink>




<NavLink
  to="/services"
 className="
relative
flex
items-center
gap-[4px]
sm:gap-[6px]
lg:gap-[7px]
no-underline
text-black
"
>
  <motion.img
    src={service}
    alt="Services"
     whileHover={{
    scale: 1.15,
  }}
  className="
w-[32px]
h-[32px]
sm:w-[36px]
sm:h-[36px]
lg:w-[40px]
lg:h-[40px]
object-contain
"
    animate={serviceControls}
    transition={{
      duration: 0.22,
      ease: "easeOut",
    }}
  />

  <p
    className={`mt-[2px] text-[11px]
sm:text-[12px]
lg:text-[14px] leading-none ${
      activeTab === "/services"
        ? "font-semibold text-[#222]"
       : "font-[550] text-[#6A6A6A]"
    }`}
  >
    Services
  </p>

  {activeTab === "/services" && (
    <motion.div
      layoutId="activeLine"
      className="absolute -bottom-2 h-[2px] w-full rounded-full bg-black"
    />
  )}
</NavLink>

  </div>

  {/* Right */}
 <div
className="
flex
items-center
gap-2
sm:gap-3
lg:gap-[15px]
"
>

   


{/* RIGHT SIDE */}

<div
  ref={menuRef}
  className="relative flex items-center gap-3"
>

  {/* Become a host */}

  <button
    className="
      hidden
      lg:block
      rounded-full
      px-2
      py-4
      text-[15px]
      font-semibold
      text-[#222222]
      transition
      hover:bg-[#f5f5f5]
    "
  >
    Become a host
  </button>


  {/* Globe */}

  <button
    className="
      flex
      h-[38px]
      w-[38px]
      items-center
      justify-center
      rounded-full
     bg-[#eeeeee]
      text-[20px]
      transition
     hover:bg-[#e5e5e5]
    "
  >
    <FiGlobe />
  </button>


  {/* Menu button */}

  <button
    onClick={() => setIsMenuOpen((prev) => !prev)}
    className={`
      flex
      h-[38px]
      w-[38px]
      items-center
      justify-center
      rounded-full
      text-[20px]
      transition
      duration-200
      ${
        isMenuOpen
          ? "bg-[#eeeeee]"
          : "bg-[#eeeeee] hover:bg-[#e5e5e5]"
      }
    `}
  >
    <FiMenu />
  </button>


  {/* DROPDOWN MENU */}

  {isMenuOpen && (
    <div
      className="
        absolute
        right-0
        top-[60px]
        z-[1000]
        w-[285px]
      
        rounded-[18px]
        bg-white
        py-2
        shadow-[0_8px_28px_rgba(0,0,0,0.18)]
      "
    >

      {/* Help Center */}

      <button
        className="
          flex
          w-full
          items-center
          gap-4
          px-5
          py-4
          text-left
          text-[16px]
          text-[#222222]
          hover:bg-[#f7f7f7]
        "
      >
        <FiHelpCircle
          size={24}
          strokeWidth={1.8}
        />

        <span>
          Help Center
        </span>
      </button>


      {/* Divider */}

      <div className="mx-5 h-px bg-[#dddddd]" />


      {/* Become a host */}

      <button
        className="
          flex
          w-full
          items-center
          px-5
          py-2
          text-left
          hover:bg-[#f7f7f7]
        "
      >
        <div>
          <p className="text-[16px] font-semibold text-[#222222]">
            Become a host
          </p>

          <p className="mt-1 max-w-[250px] text-[14px] leading-[20px] text-[#717171]">
            It's easy to start hosting and earn extra income.
          </p>
        </div>
      </button>


      {/* Divider */}

      <div className="mx-5 h-px bg-[#dddddd]" />


      {/* Find a co-host */}

      <button
        className="
          w-full
          px-5
          py-3
          text-left
          text-[16px]
          text-[#222222]
          hover:bg-[#f7f7f7]
        "
      >
        Find a co-host
      </button>


      {/* Gift cards */}

      <button
        className="
          w-full
          px-5
          py-2
          text-left
          text-[16px]
          text-[#222222]
          hover:bg-[#f7f7f7]
        "
      >
        Gift cards
      </button>


      {/* Divider */}

      <div className="mx-5 h-px bg-[#dddddd]" />


      {/* Login */}

      <button
        className="
          w-full
          px-5
          py-3
          text-left
          text-[16px]
          text-[#222222]
          hover:bg-[#f7f7f7]
        "
      >
        Log in or sign up
      </button>

    </div>
  )}

</div>





  </div>

</header>
  );
}

export default Navbar;