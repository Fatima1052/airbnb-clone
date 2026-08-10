

function PriceDropdown({ onClose }) {

const minPrice = 20;
const maxPrice = 220;

  return (
    <div
      className="
      absolute
      top-[150px]
      left-1/2
      -translate-x-1/2
      w-[445px]
      h-[400px]
      bg-white
      rounded-[24px]
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      border
      border-[#DDDDDD]
      z-50
      "
    >

      {/* Heading */}

     <div className="px-9 pt-7">

        <h2 className="
        text-[15px]
        font-medium
        text-[#222222]
        ">
          Trip price, includes all fees
        </h2>


        {/* Histogram */}

        <div className="
       mt-12
h-[90px]
        flex
        items-end
        justify-center
        gap-[4px]
        ">

        {
          Array.from({length:45}).map((_,i)=>(
            <div
            key={i}
            className="
            w-[5px]
            bg-[#FF385C]
            rounded-t
            "
            style={{
              height:`${20 + Math.random()*80}px`
            }}
            >

            </div>
          ))
        }

        </div>


        {/* Slider line */}

        <div className="
        relative
        mt-[-3px]
        h-[3px]
        bg-[#FF385C]
        rounded-full
        ">


          <div
          className="
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          w-[38px]
          h-[38px]
          rounded-full
          bg-white
          border
          border-[#DDDDDD]
          shadow-sm
          "
          />


          <div
          className="
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          w-[38px]
          h-[38px]
          rounded-full
          bg-white
          border
          border-[#DDDDDD]
          shadow-sm
          "
          />


        </div>


        {/* Min Max labels */}


  <div className="
flex
justify-between
mt-8
">
<div className="w-[80px] translate-x-1">

        <p className="
text-[#717171]
font-semibold
text-[13px]
">
Minimum
</p>


          <div className="
mt-2
-translate-x-3
w-[80px]
h-[50px]
rounded-full
border
border-[#DDDDDD]
flex
items-center
justify-center
text-[16px]
">
${minPrice}
</div>


          </div>



         <div className="w-[80px] translate-x-3">

          <p className="
text-[#717171]
font-semibold
text-[13px]
">
Maximum
</p>


          <div className="
          -translate-x-2
          mt-2
          mr-3
          w-[80px]
          h-[50px]
          rounded-full
          border
          border-[#DDDDDD]
          flex
          items-center
          justify-center
          text-[16px]
          ">
          ${maxPrice}+
          </div>


          </div>


        </div>



      </div>



      {/* Bottom buttons */}


      <div className="
      mt-4
      border-t
      border-[#EEEEEE]
      px-5
     pt-5
pb-1
      flex
      justify-between
      items-center
      ">


      <button
      className="
      text-[#B0B0B0]
      font-semibold
      text-[15px]
      ">
      Clear
      </button>


      <button
      className="
      bg-[#222222]
      text-white
      px-3
      py-2
      rounded-xl
      font-semibold
      text-[18px]
      ">
      Show 1,000+ places
      </button>


      </div>



    </div>
  )
}


export default PriceDropdown;