"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollToSection() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 88; // 헤더 높이
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [searchParams]);

  return null;
}
