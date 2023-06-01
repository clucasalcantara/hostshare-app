import { DateRangePicker } from "react-date-range";

export default function DateRange({ handleChange }: any) {
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  //
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="mr-[70px] mt-2 shadow-lg">
        <DateRangePicker
          showDateDisplay
          ranges={[selectionRange]}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
