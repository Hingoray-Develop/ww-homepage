"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right";
  delay?: number;
  threshold?: number;
  duration?: number;
}

const getAnimationStyle = (
  animation: ScrollAnimationProps["animation"],
  isVisible: boolean,
  duration: number
): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  };

  switch (animation) {
    case "slide-up":
      return {
        ...baseStyle,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
      };
    case "slide-down":
      return {
        ...baseStyle,
        transform: isVisible ? "translateY(0)" : "translateY(-40px)",
      };
    case "slide-left":
      return {
        ...baseStyle,
        transform: isVisible ? "translateX(0)" : "translateX(40px)",
      };
    case "slide-right":
      return {
        ...baseStyle,
        transform: isVisible ? "translateX(0)" : "translateX(-40px)",
      };
    case "fade":
    default:
      return baseStyle;
  }
};

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = "fade",
  delay = 0,
  threshold = 0.1,
  duration = 600,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold]);

  return (
    <div
      ref={elementRef}
      style={getAnimationStyle(animation, isVisible, duration)}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
