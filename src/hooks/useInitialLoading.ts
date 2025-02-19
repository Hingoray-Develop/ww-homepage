"use client";

import { useEffect } from "react";
import { useLoading } from "@/contexts/LoadingContext";

export const useInitialLoading = () => {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    // 페이지가 완전히 로드되면 로딩 상태를 false로 변경
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [setIsLoading]);
};
