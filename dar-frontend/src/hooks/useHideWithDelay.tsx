import { DELAY } from "@/utils";
import { useEffect, useState } from "react";

export const useHideWithDelay = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, DELAY);
    return () => clearTimeout(timer);
  });
  return { isVisible: visible, hide: () => setVisible(false) };
};
