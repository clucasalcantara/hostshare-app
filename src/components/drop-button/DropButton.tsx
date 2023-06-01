"use client";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";

export default function DropButton({
  value,
  label,
  dropContent,
  classnames,
  transparentDrop = false,
}: any) {
  const areaRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(areaRef, () => setIsOpen(false));

  return (
    <div className="w-full relative" ref={areaRef}>
      <div
        className="flex-1"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className={` ${classnames}`}>{value > 0 ? value : label}</span>
      </div>
      {isOpen && (
        <div
          className={`w-full absolute shadow-lg rounded-lg px-4 bg-white top-[40px] right-[-50px] ${
            transparentDrop && "bg-transparent"
          }`}
        >
          {dropContent}
        </div>
      )}
    </div>
  );
}
