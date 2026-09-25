import { destinations } from "../data/destinations";

function WhereDropdown({ setSelectedDestination, setActiveSection }) {
  return (
    <div
      className="
        absolute
        left-0
        top-[72px]
        z-[1000]
        w-[420px]
        h-[402px]
        bg-white
        rounded-[32px]
        shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_28px_rgba(0,0,0,0.12)]
        flex
        flex-col
        overflow-hidden
      "
    >
      <div className="px-8 pt-7 pb-1">
        <h3 className="text-[14px] text-[#222222]">
          Suggested destinations
        </h3>
      </div>

      <div className="dropdown-scroll flex-1 overflow-y-auto px-6 pb-6 pr-3">
        {destinations.map((item) => (
          <div
            onClick={() => {
              setSelectedDestination(item.title);
              setActiveSection("");
            }}
            key={item.title}
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              px-2
              py-3
              cursor-pointer
              transition-all
              duration-200
              hover:bg-[#F7F7F7]
            "
          >
            <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px]  bg-[#f5f5f5] text-[28px]">
              {item.icon}
            </div>

            <div>
              <h5 className="text-[15px] font-[549] text-[#222]">
                {item.title}
              </h5>

              <p className="mt-[3px] text-[15px] leading-[20px] text-[#717171]">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhereDropdown;
