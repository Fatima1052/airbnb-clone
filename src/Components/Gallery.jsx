import { useNavigate, useParams } from "react-router-dom";

function Gallery({ images, title }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const galleryImages = images.slice(0, 5);

  const openPhotoGallery = () => {
    navigate(`/listing/${id}/photos`);
  };

  return (
    <section className="relative">
      <div
        className="
          grid
          w-full
          h-[270px]
          sm:h-[290px]
          md:h-[300px]
          grid-cols-1
          md:grid-cols-[1.8fr_1fr_1fr]
          md:grid-rows-2
          gap-[8px]
          overflow-hidden
          rounded-[12px]
        "
      >
        {/* MAIN IMAGE */}
        <button
          type="button"
          onClick={openPhotoGallery}
          className="relative overflow-hidden md:row-span-2 cursor-pointer"
        >
          {galleryImages[0] && (
            <img
              src={galleryImages[0]}
              alt={title}
              className="
                block
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                hover:scale-[1.02]
              "
            />
          )}
        </button>

        {/* IMAGE 2 */}
        <button
          type="button"
          onClick={openPhotoGallery}
          className="hidden overflow-hidden md:block cursor-pointer"
        >
          {galleryImages[1] && (
            <img
              src={galleryImages[1]}
              alt={`${title} 2`}
              className="
                block
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                hover:scale-[1.02]
              "
            />
          )}
        </button>

        {/* IMAGE 3 */}
        <button
          type="button"
          onClick={openPhotoGallery}
          className="hidden overflow-hidden md:block cursor-pointer"
        >
          {galleryImages[2] && (
            <img
              src={galleryImages[2]}
              alt={`${title} 3`}
              className="
                block
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                hover:scale-[1.02]
              "
            />
          )}
        </button>

        {/* IMAGE 4 */}
        <button
          type="button"
          onClick={openPhotoGallery}
          className="hidden overflow-hidden md:block cursor-pointer"
        >
          {galleryImages[3] && (
            <img
              src={galleryImages[3]}
              alt={`${title} 4`}
              className="
                block
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                hover:scale-[1.02]
              "
            />
          )}
        </button>

        {/* IMAGE 5 */}
        <div className="relative hidden overflow-hidden md:block">
          <button
            type="button"
            onClick={openPhotoGallery}
            className="h-full w-full cursor-pointer"
          >
            {galleryImages[4] && (
              <img
                src={galleryImages[4]}
                alt={`${title} 5`}
                className="
                  block
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-300
                  hover:scale-[1.02]
                "
              />
            )}
          </button>

          {/* SHOW ALL PHOTOS */}
          {images.length > 5 && (
            <button
              type="button"
              onClick={openPhotoGallery}
              className="
                absolute
                bottom-4
                right-4
                rounded-[8px]
                border
                border-[#222222]
                bg-white
                px-4
                py-2
                text-[13px]
                font-semibold
                text-[#222222]
                shadow-sm
                hover:bg-[#f7f7f7]
              "
            >
              ▦ Show all photos
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Gallery;