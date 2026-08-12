
import { Link } from "react-router-dom";
function PropertyCard({ id,image, title, price, rating, guestFavorite, original, location }){

  return(

 <Link
  to={`/property/${id}`}
  className="
    block
    shrink-0
    snap-start
    cursor-pointer

    w-[calc((100%-16px)/1.5)]
    sm:w-[calc((100%-32px)/2.5)]
    md:w-[calc((100%-48px)/4)]
    lg:w-[calc((100%-64px)/5)]
    xl:w-[calc((100%-80px)/6)]
  "
>
 <div className="w-full">

<div className="
relative
aspect-square
overflow-hidden
rounded-[14px]
"
>
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
  <h3 className="m-0 text-[13px]
sm:text-[14px]
md:text-[15px] font-semibold text-[#222222]">
    {title}
</h3>


    <div className="mt-[1px] flex items-center gap-[14px]">

      <p className="m-0 text-[12px]
sm:text-[13px] font-normal text-[#6A6A6A]">
    {price}
</p>
       <div className="-ml-[8px] flex items-center gap-[2px] text-[13px] text-[#222222]">
  <span>★</span>
  <span>{rating}</span>
</div>

    </div>

</div>
        </div>

</Link>
    )

}

export default PropertyCard;