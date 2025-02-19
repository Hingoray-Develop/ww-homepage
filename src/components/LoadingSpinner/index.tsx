"use client";

import dynamic from "next/dynamic";
import loadingAnimation from "@/assets/lottie/loading2.json";
import { Frame } from "@/atoms";
import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  width?: number;
  height?: number;
}

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LoadingSpinner = ({ width = 100, height = 100 }: LoadingSpinnerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Frame w="100%" h="100%" alignment="center">
        <Lottie
          animationData={loadingAnimation}
          style={{ width, height }}
          loop={true}
        />
      </Frame>
    </div>
  );
};

export default LoadingSpinner;
