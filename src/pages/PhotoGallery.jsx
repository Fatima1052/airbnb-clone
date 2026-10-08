
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiShare,
  FiHeart,
  FiCopy,
  FiFacebook,
  FiMail,
} from "react-icons/fi";

import {
  allListings,
  listingImages,
} from "../data/listingsData";
import { getListingDetail } from "../services/listings";

function PhotoGallery() {
  const navigate = useNavigate();
  const { id } = useParams();

  const property = allListings.find(
    (item) => item.id === Number(id)
  );

  const [detail, setDetail] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [loading, setLoading] = useState(true);

  const sectionRefs = useRef([]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);

        setDetail(await getListingDetail(id));
      } catch (error) {
        console.error(
          "Error loading photo gallery:",
          error
        );

        setDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const scrollToSection = (index) => {
    const section = sectionRefs.current[index];

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[#717171]">
          Listing not found.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[15px] text-[#717171]">
          Loading photos...
        </p>
      </div>
    );
  }

  const images =
    listingImages[property.id] || [];

  const photoSections =
    detail?.photoSections || [];

  return (
    <div className="min-h-screen bg-white text-[#222222]">
      {/* ================= TOP HEADER ================= */}
      <header
        className="
          sticky
          top-0
          z-30
          flex
          h-[72px]
          items-center
          justify-between
          border-b
          border-[#dddddd]
          bg-white
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-[#f7f7f7]
          "
          aria-label="Go back"
        >
          <FiArrowLeft size={22} />
        </button>

        {/* SHARE + SAVE */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowShare(true)}
            className="
              flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-[14px]
              font-semibold
              underline
              transition
              hover:bg-[#f7f7f7]
            "
          >
            <FiShare size={18} />
            Share
          </button>

          <button
            type="button"
            onClick={() => setSaved(!saved)}
            className="
              flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-[14px]
              font-semibold
              underline
              transition
              hover:bg-[#f7f7f7]
            "
          >
            <FiHeart
              size={18}
              fill={
                saved
                  ? "currentColor"
                  : "none"
              }
            />

            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </header>

      {/* ================= SHARE POPUP ================= */}
      {showShare && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowShare(false)}
        >
          <div
            className="relative w-full max-w-[520px] rounded-[16px] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowShare(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[22px] hover:bg-[#f7f7f7]"
            >
              ×
            </button>

            <h2 className="pr-8 text-[22px] font-semibold">
              Share this place
            </h2>

            <div className="mt-6 flex items-center gap-4">
              {images[0] && (
                <img
                  src={images[0].url}
                  alt={detail?.title || property.title}
                  className="h-[64px] w-[64px] rounded-[10px] object-cover"
                />
              )}

              <div className="min-w-0">
                <p className="truncate text-[16px] font-semibold">
                  {detail?.title || property.title}
                </p>
                <p className="mt-1 text-[13px] text-[#717171]">
                  {detail?.location || property.location}
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-2">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    setShowShare(false);
                    alert("Listing link copied!");
                  } catch (error) {
                    console.error("Copy failed:", error);
                  }
                }}
                className="flex w-full items-center gap-4 rounded-[12px] p-4 text-left hover:bg-[#f7f7f7]"
              >
                <FiCopy size={21} />
                <div>
                  <p className="text-[15px] font-semibold">Copy link</p>
                  <p className="mt-1 text-[13px] text-[#717171]">
                    Copy this listing link
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`,
                    "_blank"
                  );
                }}
                className="flex w-full items-center gap-4 rounded-[12px] p-4 text-left hover:bg-[#f7f7f7]"
              >
                <FiFacebook size={21} />
                <p className="text-[15px] font-semibold">Share on Facebook</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = `mailto:?subject=${encodeURIComponent(
                    detail?.title || property.title
                  )}&body=${encodeURIComponent(
                    `Check out this stay: ${window.location.href}`
                  )}`;
                }}
                className="flex w-full items-center gap-4 rounded-[12px] p-4 text-left hover:bg-[#f7f7f7]"
              >
                <FiMail size={21} />
                <p className="text-[15px] font-semibold">Share by email</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-[1200px] px-5 pb-20 pt-8 sm:px-8 lg:px-10">
        {/* LISTING TITLE */}
        <div className="mb-7">
          <h1 className="text-[24px] font-semibold leading-[30px]">
            {detail?.title || property.title}
          </h1>

          <p className="mt-2 text-[14px] text-[#717171]">
            {detail?.location ||
              property.location}
            , Pakistan
          </p>
        </div>

        {/* ================= PHOTO TOUR ================= */}
        <section className="mb-12">
          <h2 className="mb-5 text-[22px] font-semibold leading-[28px]">
            Photo tour
          </h2>

          {/* HORIZONTAL THUMBNAILS */}
          <div
            className="
              flex
              gap-4
              overflow-x-auto
              pb-3
              scrollbar-hide
            "
          >
            {photoSections.map(
              (section, index) => {
                const image =
                  images[
                    section.imageIndex
                  ];

                if (!image) {
                  return null;
                }

                return (
                  <button
                    key={`${section.title}-${index}`}
                    type="button"
                    onClick={() =>
                      scrollToSection(index)
                    }
                    className="
                      group
                      w-[145px]
                      flex-shrink-0
                      text-left
                    "
                  >
                    <div
                      className="
                        h-[95px]
                        w-[145px]
                        overflow-hidden
                        rounded-[8px]
                        bg-[#f2f2f2]
                      "
                    >
                      <img
                        src={image.url}
                        alt={section.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-300
                          group-hover:scale-[1.04]
                        "
                      />
                    </div>

                    <p
                      className="
                        mt-2
                        line-clamp-2
                        text-[13px]
                        font-medium
                        leading-[17px]
                        text-[#222222]
                      "
                    >
                      {section.title}
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </section>

{/* ================= PHOTO SECTIONS ================= */}
<div className="space-y-20">
  {photoSections.map((section, index) => {
    const image = images[section.imageIndex];

    if (!image) {
      return null;
    }

    return (
      <section
        key={`${section.title}-${index}`}
        ref={(element) => {
          sectionRefs.current[index] = element;
        }}
        className="scroll-mt-[95px]"
      >
        <div
          className="
            grid
            items-center
            gap-8
            md:grid-cols-[260px_1fr]
            lg:grid-cols-[300px_1fr]
          "
        >
          {/* LEFT SIDE — PHOTO DETAILS */}
          <div className="self-start pt-2">
            <h2
              className="
                text-[20px]
                font-semibold
                leading-[26px]
                text-[#222222]
              "
            >
              {section.title}
            </h2>

            {image.description && (
              <p
                className="
                  mt-2
                  text-[14px]
                  leading-[20px]
                  text-[#717171]
                "
              >
                {image.description}
              </p>
            )}
          </div>

          {/* RIGHT SIDE — PHOTO */}
          <div
            className="
              overflow-hidden
              rounded-[12px]
              bg-[#f2f2f2]
            "
          >
            <img
              src={image.url}
              alt={section.title}
              className="
                block
                h-[360px]
                w-full
                object-cover
                sm:h-[440px]
                md:h-[500px]
                lg:h-[560px]
              "
            />
          </div>
        </div>
      </section>
    );
  })}
</div>



        {/* ================= FALLBACK ================= */}
        {photoSections.length === 0 && (
          <section>
            <h2 className="mb-5 text-[22px] font-semibold">
              Photos
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {images.map(
                (image, index) => (
                  <div
                    key={`${image.url}-${index}`}
                    className="overflow-hidden rounded-[12px]"
                  >
                    <img
                      src={image.url}
                      alt={
                        image.description ||
                        `${property.title} photo ${
                          index + 1
                        }`
                      }
                      className="
                        block
                        aspect-[4/3]
                        w-full
                        object-cover
                      "
                    />
                  </div>
                )
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default PhotoGallery;
