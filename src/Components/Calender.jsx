import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";

function Calendar({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangeCalendar
  value={[startDate, endDate]}
  onChange={(newValue) => {
    setStartDate(newValue[0]);
    setEndDate(newValue[1]);
  }}
/>
    </LocalizationProvider>
  );
}

export default Calendar;