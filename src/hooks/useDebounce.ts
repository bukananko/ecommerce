import { useEffect, useRef } from "react";

const useDebounce = (callback: () => void, delay: number) => {
  const latestCallback = useRef<() => void>();
  const latestTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  return () => {
    if (latestTimeout.current) {
      clearTimeout(latestTimeout.current);
    }

    latestTimeout.current = setTimeout(() => {
      latestCallback.current!();
    }, delay);
  };
};

export default useDebounce;
