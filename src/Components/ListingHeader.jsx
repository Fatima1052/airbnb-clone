
import logo from "../assests/airbnblogo.png";

import homeIcon from "../assests/homedetailpageicon.avif";
import {
  FiGlobe,
  FiMenu,
  
  FiSearch,
  
} from "react-icons/fi";
import { Link } from "react-router-dom";

function ListingHeader() {
  return (
   <header className="sticky top-0 z-50 border-b border-[#d9d9d9] bg-white">

      <div
        className="
          mx-auto
          flex
          h-[80px]
          w-full
          max-w-[1280px]
          items-center
          justify-between
          px-5
          md:px-8
        "
      >

        {/* =========================
            LEFT — AIRBNB LOGO
        ========================== */}

        <Link
          to="/"
          className="flex shrink-0 items-center"
        >
          <img
            src={logo}
            alt="Airbnb"
            className="
              h-[34px]
              w-auto
              sm:h-[38px]
            "
          />

          <span
            className="
              ml-2
              hidden
              text-[23px]
              font-semibold
              tracking-[-1px]
              text-[#FF385C]
              lg:block
            "
          >
            airbnb
          </span>
        </Link>


        {/* =========================
            CENTER SEARCH
        ========================== */}

        <div
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            md:block
          "
        >

          <div
            className="
              flex
              h-[52px]
              items-center
              rounded-full
              border
              border-[#dddddd]
              bg-white
              shadow-[0_2px_8px_rgba(0,0,0,0.08)]
            "
          >

     <div className="flex items-center gap-[1px] pr-0 shrink-0">
  <img
    src={homeIcon}
    alt="Home"
    className="w-[49px] h-[49px] object-cover"
  />
</div>


            {/* ANYWHERE */}

            <button
              type="button"
              className="
                border-r
                border-[#dddddd]
                pl-0 pr-5
                text-[14px]
                font-semibold
                text-[#222222]
              "
            >
              Anywhere
            </button>


            {/* ANYTIME */}

            <button
              type="button"
              className="
                border-r
                border-[#dddddd]
                px-5
                text-[14px]
                font-semibold
                text-[#222222]
              "
            >
              Anytime
            </button>


            {/* ADD GUESTS */}

            <button
              type="button"
              className="
                flex
                items-center
                gap-4
                px-4
                text-[14px]
                font-semibold
                text-[#555555]
              "
            >
              Add guests

              <span
                className="
                  flex
                  h-[34px]
                  w-[34px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#FF385C]
                  text-white
                "
              >
                <FiSearch size={16} />
              </span>
            </button>

          </div>

        </div>


        {/* =========================
            RIGHT SIDE
        ========================== */}

        <div
          className="
            ml-auto
            flex
            items-center
            gap-2
          "
        >

          {/* BECOME A HOST */}

          <button
            type="button"
            className="
              hidden
              rounded-full
              px-4
              py-3
              text-[14px]
              font-semibold
              text-[#222222]
              hover:bg-[#f7f7f7]
              lg:block
            "
          >
            Become a host
          </button>




          {/* GLOBE */}

          <button
            type="button"
            aria-label="Language"
            className="
              flex
              h-[40px]
              w-[40px]
              items-center
              justify-center
              rounded-full
              bg-[#eeeeee]
              text-[#222222]
              transition
              hover:bg-[#e5e5e5]
            "
          >
            <FiGlobe size={19} />
          </button>


         <button
  type="button"
  aria-label="Menu"
  className="
    flex
    h-[40px]
    w-[40px]
    items-center
    justify-center
    rounded-full
    bg-[#eeeeee]
    text-[#222222]
    transition
    hover:bg-[#e5e5e5]
  "
>
  <FiMenu size={19} />
</button>

        </div>

      </div>


      {/* =========================
          MOBILE SEARCH
      ========================== */}

      <div className="px-4 pb-3 md:hidden">

        <button
          type="button"
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-full
            border
            border-[#dddddd]
            bg-white
            px-4
            py-3
            text-left
            shadow-[0_2px_8px_rgba(0,0,0,0.08)]
          "
        >

          <FiSearch size={18} />

          <div>

            <p className="text-[13px] font-semibold text-[#222222]">
              Where to?
            </p>

            <p className="mt-0.5 text-[11px] text-[#717171]">
              Anywhere · Anytime · Add guests
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}

export default ListingHeader;

