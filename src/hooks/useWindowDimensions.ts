import { useEffect, useState } from "react";
import { MIN_DESKTOP_WIDTH } from "../constants/breakpoints";

export const useWindowDimensions = function () {
  const [dimensions, setDimensions] = useState<{
    height: number;
    width: number;
  }>({
    height: 0,
    width: 0,
  });
  useEffect(() => {
    const handleResizeWindow = function () {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    handleResizeWindow();

    window.addEventListener("resize", handleResizeWindow);

    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  const isDesktop = dimensions.width >= MIN_DESKTOP_WIDTH;
  return { dimensions, isDesktop };
};
