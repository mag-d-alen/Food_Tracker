import { useRef, useEffect, useMemo } from "react";
import { debounce } from "lodash";

export const useDebounce = <T extends (...args: any | any[]) => any>(
  callback: T
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      //@ts-ignore
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};
