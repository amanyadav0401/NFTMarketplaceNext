import { useState, useEffect } from "react";

const PHONE_SCREEN_THRESHOLD = 640;

interface WindowWidthHookResult {
  windowWidth: number;
  isPhoneScreen: boolean;
}

function useWindowWidth(): WindowWidthHookResult {
  // Function to get the current window width
  const getWindowWidth = (): number => {
    return typeof window !== 'undefined' ? window.innerWidth : 0;
  }

  // Initialize state with the current width of the window
  const [windowWidth, setWindowWidth] = useState<number>(getWindowWidth());
  const [isPhoneScreen, setIsPhoneScreen] = useState<boolean>(windowWidth <= PHONE_SCREEN_THRESHOLD);

  useEffect(() => {
    // Update width and isPhoneScreen state
    const updateWindowDimensions = () => {
      const newWindowWidth = getWindowWidth();
      setWindowWidth(newWindowWidth);
      setIsPhoneScreen(newWindowWidth <= PHONE_SCREEN_THRESHOLD);
    }

    // Add event listener
    window.addEventListener("resize", updateWindowDimensions);

    // Call updateWindowDimensions in case of a page reload
    updateWindowDimensions();

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []); // Empty dependency array ensures effect is only run on mount and unmount

  return {
    windowWidth,
    isPhoneScreen,
  };
}

export default useWindowWidth;
