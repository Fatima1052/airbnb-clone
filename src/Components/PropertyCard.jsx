

function PropertyCard({ image, title, price, rating, guestFavorite, original, location }){
    return(

    <div className="w-[185px] shrink-0 cursor-pointer">
<div className="relative h-[185px] w-full overflow-hidden rounded-[14px]">
{guestFavorite && (
   <div className="absolute left-[14px] top-[14px] z-[2] rounded-[18px] bg-white px-[10px] py-[5px] text-[12px] font-semibold text-[#222222] shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
        Guest favorite
    </div>
)}

{original && (
   <div className="absolute left-[14px] top-[14px] z-[2] rounded-[18px] bg-white px-[10px] py-[5px] text-[12px] font-semibold text-[#222222] shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
        Original
    </div>
)}

<img
  src={image}
  alt="property"
  className="w-full h-full object-cover"
/>

                <button className="absolute right-[10px] top-[10px] flex h-[38px] w-[38px] cursor-pointer items-center justify-center border-none bg-transparent text-[35px] text-white [text-shadow:0_2px_5px_rgba(51,50,50,0.4)]">
                    ♡
                </button>

            </div>





<div className="mt-[10px]">

    <h3 className="m-0 text-[15px] font-medium text-[#222222] truncate">
    {title}
</h3>

<p className="my-[2px] text-[12px] text-[#6A6A6A]">
{location}
</p>
    <div className="mt-[1px] flex items-center gap-[14px]">

      <p className="m-0 text-[13px] font-normal text-[#6A6A6A]">
    {price}
</p>
       <div className="-ml-[8px] flex items-center gap-[2px] text-[13px] text-[#222222]">

            <span>{rating}</span>

        </div>

    </div>

</div>






        </div>

    )

}

export default PropertyCard;