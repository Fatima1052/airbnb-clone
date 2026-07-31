function PriceDropdown({ onClose }) {
  return (
   <div className="absolute top-[165px] left-1/2 -translate-x-1/2 z-50">
      <div className="w-[620px] rounded-[24px] bg-white p-8 shadow-2xl border">

        <h2 className="text-[34px] font-semibold">
          Price range
        </h2>

        <p className="mt-3 text-gray-500">
          Trip price, includes all fees
        </p>

        <div className="mt-10 h-[6px] rounded-full bg-gray-300">
          <div className="h-full w-[60%] rounded-full bg-pink-500"></div>
        </div>

        <div className="mt-10 flex justify-between">
          <div className="border rounded-xl p-4 w-[140px]">
            <p className="text-sm text-gray-500">Minimum</p>
            <h3 className="text-2xl">$20</h3>
          </div>

          <div className="border rounded-xl p-4 w-[140px]">
            <p className="text-sm text-gray-500">Maximum</p>
            <h3 className="text-2xl">$220+</h3>
          </div>
        </div>

        <div className="mt-10 flex justify-between items-center">
          <button className="text-gray-400 underline">
            Clear
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-black px-6 py-3 text-white"
          >
            Show 1,000+ places
          </button>
        </div>

      </div>
    </div>
  );
}

export default PriceDropdown;