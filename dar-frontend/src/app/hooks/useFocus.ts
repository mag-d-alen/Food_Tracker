import { RefObject, useRef } from "react";

export const useFocus = <T extends HTMLDivElement>(): [
  RefObject<T>,
  () => void
] => {
  const htmlElRef = useRef<T>(null);
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.classList.add("focused");
      htmlElRef.current.scrollIntoView();
    }
  };

  return [htmlElRef, setFocus];
};
