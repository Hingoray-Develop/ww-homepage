"use client";

import { useState, useEffect } from "react";

type DeviceType = "ios" | "android" | "desktop";

const getDeviceType = (): DeviceType => {
  if (typeof window !== undefined) {
    const userAgent = window.navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return "ios";
    }

    if (/Android/i.test(userAgent)) {
      return "android";
    }

    return "desktop";
  }
  return "desktop";
};

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    deviceType,
  };
};

export default useDeviceType;
