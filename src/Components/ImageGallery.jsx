import { useState } from "react";
import { Link } from "react-router-dom";

function ImageGallery({
  property,
  selectedPrice,
  setSelectedPrice,
  selectedType,
  setSelectedType,
}) {

  const [openFilter, setOpenFilter] = useState(null);

    

  return (
    <div className="mt-2">

      <h2 className="mb-2 text-[22px] md:text-[26px] font-semibold text-[#222222]">
        Over 1,000 homes in {property.location}
      </h2>


      {openFilter === "Price" && (
        <div className="absolute left-0 top-[70px] z-50 w-[380px] rounded-[24px] bg-white p-6 shadow-2xl border">

          <h3 className="text-[22px] font-semibold">
            Price range
          </h3>

          <p className="mt-2 text-[14px] text-[#6A6A6A]">
            Nightly prices before fees and taxes
          </p>

          <div className="mt-8 h-[4px] rounded-full bg-gray-300">
            <div className="h-full w-[45%] rounded-full bg-black"></div>
          </div>

          <div className="mt-8 flex gap-4">

            <div className="flex-1 rounded-xl border p-3">
              <p className="text-[12px] text-gray-500">
                Minimum
              </p>

              <h4 className="text-lg font-semibold">
                $0
              </h4>
            </div>

            <div className="flex-1 rounded-xl border p-3">
              <p className="text-[12px] text-gray-500">
                Maximum
              </p>

              <h4 className="text-lg font-semibold">
                $1000+
              </h4>
            </div>

          </div>

          <div className="mt-8 flex justify-between">

            <button
              className="underline"
              onClick={() => setOpenFilter(null)}
            >
              Clear
            </button>

            <button
              className="rounded-lg bg-black px-6 py-3 text-white"
              onClick={() => setOpenFilter(null)}
            >
              Save
            </button>

          </div>

        </div>
      )}


      {/* Selected Property */}
      <Link to={`/listing/${property.id}`}>
      <div
        className="
          relative
          flex
          flex-col
          md:flex-row
          w-full
          max-w-[660px]
          rounded-[24px]
          bg-white
          p-4
          shadow-md
        "
      >

        <div>

          <div className="relative">

            <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-[#222222] shadow-md">
              Guest favorite
            </div>

            <img
              src={property.image}
              alt={property.title}
              className="
                w-full
                md:w-[230px]
                h-[220px]
                md:h-[198px]
                object-cover
                rounded-[18px]
              "
            />

          </div>

        </div>


        <div className="ml-5 flex flex-col justify-center">

          <h2 className="text-[22px] font-semibold text-[#222222]">
            {property.title}
          </h2>

          <p className="mt-2 text-[15px] text-[#6A6A6A]">
            {property.description}
          </p>

          <p className="mt-1 text-[15px] text-[#6A6A6A]">
            {property.details}
          </p>

          <p className="mt-5 text-[15px] text-[#6A6A6A]">
            {property.date}
          </p>

          <div className="mt-6 flex items-center justify-between">

         <p className="text-[16px] font-semibold text-[#222222]">
  {property.price}
</p>

            <div className="flex items-center gap-1">

              <span className="text-[14px]">
                ★
              </span>

              <span className="text-[15px] font-medium text-[#222222]">
                {property.rating}
              </span>

              <span className="text-[15px] text-[#6A6A6A]">
                (140)
              </span>

            </div>

          </div>

        </div>


        <button
          className="absolute top-5 right-5 text-[28px] text-[#222222] bg-transparent border-none cursor-pointer"
        >
          ♡
        </button>

      </div>
      </Link>

 {/* Dynamic Property Images */}
<div
  className="
    mt-8
    grid
    grid-cols-1
    md:grid-cols-2
    gap-x-6
    gap-y-10
    w-full
    max-w-[660px]
  "
>
  {property.images?.map((image, index) => (
  <Link
  key={index}
  to={`/listing/${property.id}?image=${index}`}
  className="block w-full"
>
      <div className="w-full cursor-pointer">
        
        <img
          src={image.url}
          alt={property.title}
          className="
            h-[270px]
            w-full
            rounded-[20px]
            object-cover
            transition
            duration-200
            hover:opacity-95
          "
        />

        <div className="mt-3">
          <h3 className="text-[17px] font-semibold text-[#222222]">
            {image.title}
          </h3>

          <p className="mt-1 text-[15px] leading-[21px] text-[#6A6A6A]">
            {image.subtitle}
          </p>

          <p className="mt-1 text-[15px] leading-[21px] text-[#6A6A6A]">
            {image.details}
          </p>

          <p className="mt-3 text-[15px] text-[#222222]">
            <span className="font-semibold">
              {image.price}
            </span>
          </p>
        </div>

      </div>
    </Link>
  ))}
</div>

</div>
    
  );
}

export default ImageGallery;