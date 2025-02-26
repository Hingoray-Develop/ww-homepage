"use client";

import { Frame, Text } from "@/atoms";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { colors, animations } from "@/styles";
import Image from "next/image";
import React, { useState } from "react";
import ScrollAnimation from "../ScrollAnimation";

interface ProjectCardProps {
  image: string;
  title: string;
  type: string;
  boldTexts?: string[];
  onClick?: () => void;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  type,
  boldTexts = [],
  onClick,
  delay = 0,
}) => {
  const { isDarkMode } = useDarkMode();
  const [isHovered, setIsHovered] = useState(false);

  const renderTitle = (text: string) => {
    let parts: { text: string; isBold: boolean }[] = [{ text, isBold: false }];

    boldTexts.forEach((boldText) => {
      parts = parts.flatMap((part) => {
        if (!part.isBold) {
          const splitText = part.text.split(new RegExp(`(${boldText})`, "g"));
          return splitText.map((text, index) => ({
            text,
            isBold: index % 2 === 1,
          }));
        }
        return [part];
      });
    });

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          marginBottom: "8px",
        }}
      >
        {parts.map((part, index) => {
          let content = part.text;
          if (part.isBold) {
            content = "\u00A0" + part.text;
          }
          return (
            <Text
              key={index}
              fontSize={24}
              lineHeight="32px"
              fontColor={isDarkMode ? colors.white : colors.neutral[900]}
              fontWeight={part.isBold ? 700 : 400}
            >
              {content}
            </Text>
          );
        })}
      </div>
    );
  };

  return (
    <ScrollAnimation animation="slide-up" delay={delay}>
      <div
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          overflow: "hidden",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          transition: `all ${animations.hover.transitionDuration} ${animations.hover.transitionTimingFunction}`,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "80%",
            overflow: "hidden",
            borderRadius: 32,

            transition: `all ${animations.hover.transitionDuration} ${animations.hover.transitionTimingFunction}`,
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            style={{
              objectFit: "fill",
              borderRadius: 32,
              transition: `all ${animations.hover.transitionDuration} ${animations.hover.transitionTimingFunction}`,
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              filter: isHovered
                ? "brightness(1.1) contrast(1.1)"
                : "brightness(1) contrast(1)",
            }}
            priority
          />
        </div>
        <div
          style={{
            paddingTop: 16,
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transition: `all ${animations.hover.transitionDuration} ${animations.hover.transitionTimingFunction}`,
          }}
        >
          {renderTitle(title)}
          <Text
            fontSize={16}
            lineHeight="24px"
            fontColor={isDarkMode ? colors.white : colors.neutral[950]}
          >
            {type}
          </Text>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default ProjectCard;
