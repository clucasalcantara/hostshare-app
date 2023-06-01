"use client";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const Counter = ({ onChange, value }: any) => {
  return (
    <div className="flex flex-row items-center justify-between gap-6 min-w-[33%] relative">
      <AiOutlineMinusCircle
        size={22}
        className="text-gray-500"
        onClick={() => value > 0 && onChange(value - 1)}
      />
      <span className="text-md font-bold absolute left-7">{value}</span>
      <AiOutlinePlusCircle
        size={22}
        className="text-gray-500"
        onClick={() => onChange(value + 1)}
      />
    </div>
  );
};

export default function PaxCounter({
  handleCount,
  handleConfig,
  guestsConfig,
}: any) {
  const [adultsQtd, setAdultsQtd] = useState(guestsConfig.adultsQtd || 0);
  const [childrenQtd, setChildrenQtd] = useState(guestsConfig.childrenQtd || 0);
  const [infantsQtd, setInfantsQtd] = useState(guestsConfig.infantsQtd || 0);

  useEffect(() => {
    handleCount(adultsQtd + childrenQtd + infantsQtd);
    handleConfig({ adultsQtd, childrenQtd, infantsQtd });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adultsQtd, childrenQtd, handleCount, infantsQtd]);

  return (
    <div className="flex flex-col divide-y flex-1">
      <div className="flex flex-row justify-between items-center py-6">
        <div className="flex flex-col items-start">
          <span className="font-bold">Adults</span>
          <span className="text-gray-600 text-xs">Age 13 or above</span>
        </div>
        <div className="mt-2">
          <Counter onChange={setAdultsQtd} value={guestsConfig.adultsQtd} />
        </div>
      </div>
      <div className="flex flex-col divide-y">
        <div className="flex flex-row justify-between items-center py-6">
          <div className="flex flex-col items-start pr-16">
            <span className="font-bold">Children</span>
            <span className="text-gray-600 text-xs">Age 2-12</span>
          </div>
          <div className="mt-2">
            <Counter
              onChange={setChildrenQtd}
              value={guestsConfig.childrenQtd}
            />
          </div>
        </div>
        <div className="flex flex-col divide-y">
          <div className="flex flex-row justify-between items-center py-6">
            <div className="flex flex-col items-start">
              <span className="font-bold">Infants</span>
              <span className="text-gray-600 text-xs">under 2</span>
            </div>
            <div className="mt-2">
              <Counter
                onChange={setInfantsQtd}
                value={guestsConfig.infantsQtd}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
