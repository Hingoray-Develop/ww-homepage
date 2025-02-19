"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoadingState] = useState(true);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const MIN_LOADING_TIME = 2000; // 최소 2초 (최소 재생시간)
  const FADE_DURATION = 500; // fade-out 애니메이션 시간

  const setIsLoading = (loading: boolean) => {
    if (loading) {
      setIsVisible(true);
      setLoadingStartTime(Date.now());
      setIsLoadingState(true);
    } else {
      const currentTime = Date.now();
      const elapsedTime = loadingStartTime ? currentTime - loadingStartTime : 0;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      if (remainingTime > 0) {
        setTimeout(() => {
          setIsVisible(false); // fade-out 시작
          setTimeout(() => {
            setIsLoadingState(false); // 컴포넌트 제거
          }, FADE_DURATION);
        }, remainingTime);
      } else {
        setIsVisible(false);
        setTimeout(() => {
          setIsLoadingState(false);
        }, FADE_DURATION);
      }
    }
  };

  useEffect(() => {
    setLoadingStartTime(Date.now());
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingSpinner />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
