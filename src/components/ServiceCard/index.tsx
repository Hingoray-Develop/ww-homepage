"use client";

import React from "react";
import { Text } from "@/atoms";
import { colors } from "@/styles";
import { useDarkMode } from "@/contexts/DarkModeContext";

/**
 * ServiceCardProps 인터페이스에 minH 옵션을 추가합니다.
 * 기본값은 300 (데스크탑/태블릿)으로 유지하고, 필요시 외부에서 override할 수 있습니다.
 */
export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  descriptions: string[];
  // onMoreClick?: () => void;
  /** 카드의 최소 높이, 기본값 300 */
  minH?: number;
}

export default function ServiceCard({
  icon,
  title,
  descriptions,
  // onMoreClick,
  minH = 300,
}: ServiceCardProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className="transition-colors duration-500"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: minH,
        padding: 24,
        gap: 20,
        backgroundColor: isDarkMode ? colors.neutral[900] : colors.neutral[100],
        border: isDarkMode ? `1px solid ${colors.neutral[800]}` : undefined,
        borderRadius: "24px",
      }}
    >
      {/* 아이콘 */}
      <div
        style={{
          width: 64,
          height: 64,
        }}
      >
        {icon}
      </div>

      {/* 제목 */}
      <Text
        fontSize={24}
        lineHeight="34px"
        fontWeight={700}
        fontColor={isDarkMode ? colors.white : colors.neutral[950]}
      >
        {title}
      </Text>

      <div>
        <div className="w-full h-[1px] bg-[#E4E7EC] " />
      </div>

      {/* 설명 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {descriptions.map((desc, index) => (
          <Text
            key={index}
            fontSize={16}
            lineHeight="26px"
            fontWeight={400}
            fontColor={isDarkMode ? colors.neutral[300] : colors.neutral[600]}
          >
            {desc}
          </Text>
        ))}
      </div>

      {/* <Frame
        w={"100%"}
        cursor="pointer"
        onClick={onMoreClick}
        alignment="bottom-right"
      >
        <Body1 fontColor={colors.neutral[500]}>더보기 →</Body1>
      </Frame> */}
    </div>
  );
}
