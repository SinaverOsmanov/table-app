import { useEffect, useRef, useState } from "react";

export function useThrottle(value, delay) {
  const [throttleValue, setThrottleValue] = useState(value);
  const previousValueRef = useRef(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== throttleValue) setThrottleValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, throttleValue, delay]);

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return { throttleValue };
}
