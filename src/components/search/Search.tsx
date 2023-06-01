"use client";
import { useState } from "react";
// Icons
import { BiSearch } from "react-icons/bi";
// Components
import { DropButton } from "../drop-button";
import { DateRange } from "../date-range";
import { PaxCounter } from "../pax-counter";
import { LocationInput } from "../location-input";
// Utils
import truncate from "@/utils/truncate";
import format from "date-fns/format";
import { useAppStore } from "@/store";

export default function Search() {
  const [guestsAmount, setGuestsAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [dateRange, setDateRange] = useState<{ selection: any } | null>(null);
  const [guestsConfig, setGuestsConfig] = useState({});
  const {
    filters: { location },
  } = useAppStore();

  const getDisplayDate = () => {
    const { selection } = dateRange || {};

    if (selection) {
      const { startDate, endDate } = selection;
      const start = format(startDate, "dd MMMM");
      const end = format(endDate, "dd MMMM");

      return `${start} to ${end}`;
    }
  };

  return (
    <div className="flex flex-row justify-between rounded-full shadow-md shadow-[rgba(0,0,0,.1)] py-2 border items-center px-4 cursor-pointer flex-1 lg:max-w-[50%] w-full">
      <div className="flex flex-row justify-between text-center mx-2 divide-x items-center gap-2 w-full">
        <div className="relative w-full">
          <DropButton
            label={truncate(address as string, 22) || "Anywhere"}
            classnames={`ml-[-20px] text-black ${
              !location?.length && "font-bold"
            } truncate text-ellipsis`}
            forceCloseOnSelect
            dropContent={
              <div className="absolute top-1 left-[-130px] lg:right-[-10px] sm:left-[-240px] md:left-[-270px] lg:left-[initial] p-4 bg-white shadow-md rounded-lg">
                <LocationInput handleChange={setAddress} />
              </div>
            }
          />
        </div>
        <DropButton
          label={dateRange ? getDisplayDate() : "Any week"}
          classnames={`font-bold ${dateRange && "text-gray-600 font-normal"}`}
          transparentDrop
          dropContent={<DateRange handleChange={setDateRange} />}
        />
        <div className="relative flex min-w-[250px]">
          <DropButton
            value={guestsAmount}
            label="Add guests"
            classnames="text-gray-400"
            dropContent={
              <PaxCounter
                guestsConfig={guestsConfig}
                handleCount={setGuestsAmount}
                handleConfig={setGuestsConfig}
              />
            }
          />
        </div>
      </div>
      <div className="bg-black rounded-full">
        <div className="bg-[#329a9a] w-[40px] h-[40px] rounded-full flex justify-center items-center hover:bg-opacity-80">
          <BiSearch color="white" size={22} />
        </div>
      </div>
    </div>
  );
}
