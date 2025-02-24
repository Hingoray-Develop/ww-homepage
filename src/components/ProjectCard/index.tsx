"use client";

import { Frame, Text } from "@/atoms";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { colors } from "@/styles";
import Image from "next/image";
import React from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  type: string;
  boldTexts?: string[];
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  type,
  boldTexts = [],
  onClick,
}) => {
  const { isDarkMode } = useDarkMode();
  const renderTitle = (text: string) => {
    // 텍스트를 boldTexts를 기준으로 분할
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
      <Frame row>
        {parts.map((part, index) => {
          let content = part.text;
          if (part.isBold) {
            // Bold 텍스트인 경우 앞뒤에 무조건 한 칸씩 추가합니다.
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
      </Frame>
    );
  };

  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: 8,
      }}
    >
      <div
        style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          style={{
            objectFit: "fill",
            // objectPosition: "top center",
            borderRadius: 32,
          }}
          priority
        />
      </div>
      <div style={{ paddingTop: 16 }}>
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
  );
};

export default ProjectCard;
