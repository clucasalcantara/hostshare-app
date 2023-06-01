import { useEffect, useCallback, RefObject } from "react";

export default function useClickOutside(
  ref: RefObject<Element>,
  callback: (event: MouseEvent) => void
) {
  const handleClick = useCallback(
    (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}
