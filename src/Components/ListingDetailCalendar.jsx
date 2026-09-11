import { useMemo } from "react";
import dayjs from "dayjs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function ListingDetailCalendar({
  location,
  dateRange,
  setDateRange,
}) {
  const [startDate, endDate] = dateRange;

  const currentMonth = dayjs().startOf("month");

  const firstMonth = currentMonth;
  const secondMonth = currentMonth.add(1, "month");

  const nights = useMemo(() => {
    if (!startDate || !endDate) return 0;

    return endDate.diff(startDate, "day");
  }, [startDate, endDate]);

  const formatDate = (date) => {
    if (!date) return "Add date";

    return date.format("MMM D");
  };

  const handleDateClick = (date) => {
    if (date.isBefore(dayjs(), "day")) return;

    // First date
    if (!startDate || (startDate && endDate)) {
      setDateRange([date, null]);
      return;
    }

    // Second date
    if (date.isAfter(startDate, "day")) {
      setDateRange([startDate, date]);
    } else {
      setDateRange([date, null]);
    }
  };

  const clearDates = () => {
    setDateRange([null, null]);
  };

  const getMonthDays = (month) => {
    const firstDay = month.startOf("month");
    const daysInMonth = month.daysInMonth();

    const startWeekDay = firstDay.day();

    const days = [];

    for (let i = 0; i < startWeekDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(month.date(i));
    }

    return days;
  };

  const renderMonth = (month) => {
    const days = getMonthDays(month);

    return (
      <div className="flex-1 min-w-0">

        {/* MONTH TITLE */}

        <div className="mb-5 text-center">
          <h3 className="text-[15px] font-semibold text-[#222222]">
            {month.format("MMMM YYYY")}
          </h3>
        </div>

        {/* WEEK DAYS */}

        <div className="mb-2 grid grid-cols-7">
          {["S", "M", "T", "W", "T", "F", "S"].map(
            (day, index) => (
              <div
                key={`${day}-${index}`}
                className="
                  flex
                  h-[32px]
                  items-center
                  justify-center
                  text-[11px]
                  font-medium
                  text-[#717171]
                "
              >
                {day}
              </div>
            )
          )}
        </div>

        {/* DATES */}

        <div className="grid grid-cols-7 gap-y-1">

          {days.map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  className="h-[40px]"
                />
              );
            }

            const isPast = date.isBefore(dayjs(), "day");

            const isStart =
              startDate &&
              date.isSame(startDate, "day");

            const isEnd =
              endDate &&
              date.isSame(endDate, "day");

            const isBetween =
              startDate &&
              endDate &&
              date.isAfter(startDate, "day") &&
              date.isBefore(endDate, "day");

            return (
              <div
                key={date.format("YYYY-MM-DD")}
                className="relative flex h-[40px] items-center justify-center"
              >

                {/* RANGE BACKGROUND */}

                {isBetween && (
                  <div className="
                    absolute
                    inset-y-0
                    left-0
                    right-0
                    bg-[#f0f0f0]
                  " />
                )}

                {isStart && endDate && (
                  <div className="
                    absolute
                    inset-y-0
                    right-0
                    w-1/2
                    bg-[#f0f0f0]
                  " />
                )}

                {isEnd && startDate && (
                  <div className="
                    absolute
                    inset-y-0
                    left-0
                    w-1/2
                    bg-[#f0f0f0]
                  " />
                )}

                {/* DATE */}

                <button
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDateClick(date)}
                  className={`
                    relative
                    z-10
                    flex
                    h-[40px]
                    w-[40px]
                    items-center
                    justify-center
                    rounded-full
                    text-[13px]
                    transition

                    ${
                      isStart || isEnd
                        ? "bg-[#222222] text-white font-semibold"
                        : ""
                    }

                    ${
                      !isStart &&
                      !isEnd &&
                      !isPast
                        ? "text-[#222222] hover:bg-[#f2f2f2]"
                        : ""
                    }

                    ${
                      isPast
                        ? "cursor-not-allowed text-[#b0b0b0]"
                        : ""
                    }
                  `}
                >
                  {date.date()}
                </button>

              </div>
            );
          })}

        </div>
      </div>
    );
  };

  return (
    <section className="border-t border-[#dddddd] pt-8">

      {/* HEADING */}

      <div className="mb-7">

        <h2 className="text-[22px] font-semibold leading-[28px] text-[#222222]">
          {nights > 0
            ? `${nights} ${
                nights === 1 ? "night" : "nights"
              } in ${location}`
            : "Choose your dates"}
        </h2>

        <p className="mt-2 text-[14px] text-[#717171]">
          {startDate && endDate
            ? `${startDate.format(
                "MMM D, YYYY"
              )} - ${endDate.format("MMM D, YYYY")}`
            : "Add your travel dates for exact pricing"}
        </p>

      </div>

      {/* CALENDAR */}

      <div className="relative">

        {/* LEFT ARROW */}

        <button
          type="button"
          className="
            absolute
            left-[-14px]
            top-[5px]
            z-20
            flex
            h-[32px]
            w-[32px]
            items-center
            justify-center
            rounded-full
            bg-white
            hover:bg-[#f7f7f7]
          "
        >
          <FiChevronLeft
            size={18}
            className="text-[#222222]"
          />
        </button>

        {/* RIGHT ARROW */}

        <button
          type="button"
          className="
            absolute
            right-[-14px]
            top-[5px]
            z-20
            flex
            h-[32px]
            w-[32px]
            items-center
            justify-center
            rounded-full
            bg-white
            hover:bg-[#f7f7f7]
          "
        >
          <FiChevronRight
            size={18}
            className="text-[#222222]"
          />
        </button>

        {/* TWO MONTHS */}

        <div className="flex gap-10 px-4">

          {renderMonth(firstMonth)}

          {renderMonth(secondMonth)}

        </div>

      </div>

      {/* CLEAR DATES */}

      <div className="mt-5 flex justify-end">

        <button
          type="button"
          onClick={clearDates}
          className="
            text-[13px]
            font-semibold
            text-[#222222]
            underline
            underline-offset-2
            hover:text-[#717171]
          "
        >
          Clear dates
        </button>

      </div>

    </section>
  );
}

export default ListingDetailCalendar;