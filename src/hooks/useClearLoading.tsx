"use client";

import { useEffect } from "react";
import { useLoading } from "@/contexts/LoadingContext";

export default function useClearLoading() {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    // Immediately clear the loading state on mount
    setIsLoading(false);
  }, [setIsLoading]);
}