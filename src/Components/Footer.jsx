

function Footer() {
  return (
    <footer className="
bg-[#f7f7f7]
px-4
sm:px-6
md:px-8
lg:px-12
py-8
md:py-12
">

      <div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-10
lg:gap-20
">

       <div>

          <h3 className="mb-5 text-[15px]
sm:text-[16px] font-semibold text-[#222222]">Support</h3>

           <p className="mb-[14px] cursor-pointer text-[14px] sm:text-[15px] text-[#6A6A6A] hover:underline">Help Center</p>
          <p className="mb-[14px] cursor-pointer text-[14px] sm:text-[15px] text-[#6A6A6A] hover:underline">Get help with a safety issue</p>
         <p className="mb-[14px] cursor-pointer text-[14px] sm:text-[15px] text-[#6A6A6A] hover:underline">AirCover</p>
          <p className="mb-[14px] cursor-pointer text-[14px] sm:text-[15px] text-[#6A6A6A] hover:underline">Travel insurance</p>
         <p className="mb-[14px] cursor-pointer text-[14px] sm:text-[15px] text-[#6A6A6A] hover:underline">Anti-discrimination</p>
          <p className="mb-[14px] cursor-pointer text-[14px] sm:text-[15px] text-[#6A6A6A] hover:underline">Disability support</p>
        <p className="mb-[14px] cursor-pointer text-[14px] sm:text-[15px] text-[#6A6A6A] hover:underline">Cancellation options</p>
          <p className="mb-[14px] cursor-pointer text-[14px] sm:text-[15px] text-[#6A6A6A] hover:underline">Report neighborhood concern</p>

        </div>

        <div>

          <h3 className="mb-5 text-[15px]
sm:text-[16px] font-semibold text-[#222222]">Hosting</h3>

          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Airbnb your home</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Airbnb your experience
</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Airbnb your service</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">AirCover for Hosts</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Hosting resources</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Community forum</p>
         <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Hosting responsibly</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Airbnb-friendly apartments</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Join a free hosting class</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Find a co‑host</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Refer a host</p>
        </div>

       <div>

        <h3 className="mb-5 text-[15px]
sm:text-[16px] font-semibold text-[#222222]">Airbnb</h3>

         <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Newsroom</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Careers</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Investors</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Gift cards</p>
          <p className="mb-[14px] cursor-pointer text-[14px]
sm:text-[15px] text-[#6A6A6A] hover:underline">Airbnb.org emergency stays</p>

        </div>

      </div>

     <hr className="my-8 md:my-10 border-0 border-t border-[#dddddd]" />

     <div
className="
flex
flex-col
gap-4
md:flex-row
md:items-center
md:justify-between
"
>

       <p className="
text-[13px]
sm:text-[14px]
text-[#6A6A6A]
text-center
md:text-left
"
>
  © 2026 Airbnb, Inc. · Privacy · Terms · Your Privacy Choices
</p>

        <div className="
flex
justify-center
md:justify-end
gap-5
text-[13px]
sm:text-[14px] text-[#222222]
">

          <span>🌐 English (US)</span>

          <span>$ USD</span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;