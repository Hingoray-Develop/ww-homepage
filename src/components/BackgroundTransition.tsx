"use client";

import { useEffect, useState } from "react";
import { colors } from "@/styles";

export default function BackgroundTransition() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const introSection = document.getElementById("intro");
    const servicesSection = document.getElementById("services");
    const whyChooseUsSection = document.getElementById("why-choose-us");

    if (!introSection || !servicesSection || !whyChooseUsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "services" && entry.isIntersecting) {
            console.log("services");
            setIsDarkMode(false);
          } else if (
            entry.target.id === "why-choose-us" &&
            entry.isIntersecting
          ) {
            console.log("why-choose-us");
            setIsDarkMode(true);
          } else if (entry.target.id === "intro" && entry.isIntersecting) {
            console.log("intro");
            setIsDarkMode(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(introSection);
    observer.observe(servicesSection);
    observer.observe(whyChooseUsSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={isDarkMode ? "dark-mode" : "light-mode"}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: isDarkMode ? colors.neutral[950] : colors.white,
        zIndex: -1,
        transition: "background-color 0.3s ease-out",
        pointerEvents: "none",
      }}
    />
  );
}
