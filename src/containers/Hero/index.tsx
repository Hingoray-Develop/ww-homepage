"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import ArrowRight from "@/assets/icons/line/arrow-right.svg?react";
import { colors } from "@/styles";
import { Heading6, Text, Frame } from "@/atoms";
import { useResponsiveType } from "@/hooks";
import { logEvent, AnalyticsEventList } from "@/utils/analytics";

export default function Hero() {
  // 마운트 여부 상태 추가
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 창 크기를 반영할 상태 (초기값은 1024 사용)

  const { responsiveType } = useResponsiveType();
  const isMobile = responsiveType === "mobile";
  const isTablet = responsiveType === "tablet";

  // 마운트 전에는 아무것도 렌더링하지 않음으로써 SSR과 클라이언트의 초기 HTML 불일치를 방지
  if (!hasMounted) return null;

  // 반응형 텍스트 설정
  const mainHeadingFontSize = isMobile ? 32 : 56;
  const mainHeadingLineHeight = isMobile ? "44px" : "76px";
  const subTextFontSize = isMobile ? 16 : 20;
  const subTextLineHeight = isMobile ? "24px" : "30px";

  const containerPx = isMobile ? 16 : isTablet ? 30 : 40;

  return (
    <div
      id="intro"
      className={`bg-[#0C111D] `}
      style={{
        paddingLeft: containerPx,
        paddingRight: containerPx,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "840px", // 원하는 고정 높이
          backgroundImage: "url('/images/hero/whale.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "32px",
        }}
      >
        {/* 컨텐츠 영역 */}
        <Frame col alignment="center" gap={24} w="100%" h="100%">
          <Frame col alignment="center">
            <Text
              fontColor={colors.white}
              fontSize={mainHeadingFontSize}
              lineHeight={mainHeadingLineHeight}
              fontWeight={200}
            >
              막막했던 외주 개발,
            </Text>
            <Text
              fontColor={colors.white}
              fontSize={mainHeadingFontSize}
              lineHeight={mainHeadingLineHeight}
              fontWeight={700}
            >
              흰고래컴퍼니와 함께하세요!
            </Text>
          </Frame>
          <Frame col alignment="center">
            <Text
              fontColor={colors.white}
              fontSize={subTextFontSize}
              lineHeight={subTextLineHeight}
              fontWeight={400}
            >
              단순한 아웃소싱을 넘어 비즈니스 파트너로
            </Text>
            <Text
              fontColor={colors.white}
              fontSize={subTextFontSize}
              lineHeight={subTextLineHeight}
              fontWeight={400}
            >
              A to Z 솔루션을 제공합니다.
            </Text>
          </Frame>
          <Frame alignment="center">
            <Button
              bg={colors.neutral[900]}
              radius={500}
              onClick={() => {
                logEvent(AnalyticsEventList.BUTTON_CLICK, {
                  button_name: "cost_calculator_hero",
                });
              }}
            >
              <Frame
                row
                alignment="center"
                px={isMobile ? 24 : 40}
                py={isMobile ? 14 : 18}
                gap={8}
              >
                <Heading6 fontColor={colors.white} fontWeight={700}>
                  빠른 프로젝트 견적내기
                </Heading6>
                <ArrowRight width={24} height={24} fill={colors.main[500]} />
              </Frame>
            </Button>
          </Frame>
        </Frame>
      </div>
    </div>
  );
}
