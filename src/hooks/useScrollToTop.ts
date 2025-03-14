"use client";

import { useEffect } from "react";

export default function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
}
