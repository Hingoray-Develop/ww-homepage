"use client";

import { Frame, FrameScreen, Heading2, Heading3, Text } from "@/atoms";
import { ChatBubble, Divider } from "@/components";
import { colors } from "@/styles";
import { useEffect, useMemo, useState } from "react";
import useResponsiveType from "@/hooks/useResponsiveType";
import { useDarkMode } from "@/contexts/DarkModeContext";

// 텍스트 픽셀 길이를 재는 헬퍼 함수
function measureTextWidth(text: string, font = "16px sans-serif"): number {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;
  ctx.font = font;
  return ctx.measureText(text).width;
}

const Intro = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { responsiveType } = useResponsiveType();
  const { isDarkMode } = useDarkMode();
  const isMobile = responsiveType === "mobile";
  const isTablet = responsiveType === "tablet";

  const containerPy = isMobile ? 80 : isTablet ? 100 : 120;

  const messages = useMemo(
    () => [
      "예산도 한정적이고, 개발 시간도 너무 부족해요.",
      "우리만의 개성을 어떻게 만들어야할지 모르겠어요!",
      "기획 어디서부터 어디까지 해둬야하나요?",
      "아이디어를 빠르게 검증해보고 싶어요.",
      "개발에 대해선 문외한이에요...",
      "어떤 기술을 써야하나요..?",
      ". . .",
    ],
    []
  );

  const [widths, setWidths] = useState<number[]>([]);
  useEffect(() => {
    const newWidths = messages.map((msg) => {
      const textPx = measureTextWidth(msg, "16px sans-serif");
      const maxWidth = isMobile ? 300 : isTablet ? 450 : 600;
      return Math.min(Math.max(textPx + 60, 80), maxWidth);
    });
    setWidths(newWidths);
  }, [messages, isMobile, isTablet]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const descriptionFontSize = isMobile ? 14 : isTablet ? 16 : 20;
  const descriptionLineHeight = isMobile ? "26px" : isTablet ? "28px" : "30px";

  const containerPx = isMobile ? 16 : isTablet ? 30 : 40;

  const textAreaPt = isMobile ? 120 : isTablet ? 200 : 460;
  const textAreaGap = isMobile ? 8 : isTablet ? 12 : 24;
  const dividerPy = isMobile ? 16 : isTablet ? 20 : 24;

  if (isMobile || isTablet) {
    return (
      <div
        id="intro"
        className={`transition-colors duration-500 ${
          isDarkMode ? "dark-mode" : "light-mode"
        }`}
        style={{
          backgroundColor: isDarkMode ? colors.neutral[950] : colors.white,
        }}
      >
        <Frame
          col
          w="100%"
          px={containerPx}
          py={containerPy}
          bg={isDarkMode ? colors.neutral[950] : colors.white}
        >
          <Heading3
            fontColor={isDarkMode ? colors.white : colors.neutral[950]}
            fontWeight={700}
          >
            모르는 게 많아도,
          </Heading3>
          <Heading3
            fontColor={isDarkMode ? colors.white : colors.neutral[950]}
            fontWeight={700}
          >
            어디서부터 시작해야 할지 몰라도 괜찮습니다.
          </Heading3>
          <Frame w="100%" py={dividerPy}>
            <Divider
              color={isDarkMode ? colors.neutral[700] : colors.neutral[200]}
            />
          </Frame>
          <Frame>
            <Text
              fontColor={isDarkMode ? colors.neutral[200] : colors.neutral[600]}
              fontSize={descriptionFontSize}
              lineHeight={descriptionLineHeight}
              fontWeight={400}
            >
              흰고래컴퍼니는 기획부터 개발까지 IT 프로덕트 제작의 모든 단계를
              지원하는 IT 솔루션 에이전시입니다.
            </Text>
            <Text
              fontColor={isDarkMode ? colors.neutral[200] : colors.neutral[600]}
              fontSize={descriptionFontSize}
              lineHeight={descriptionLineHeight}
              fontWeight={400}
            >
              막연한 아이디어도 깊이 있는 분석을 통해 구체화하고, 시장에
              성공적으로 출시할 수 있도록 돕습니다.
            </Text>
            <Text
              fontColor={isDarkMode ? colors.neutral[200] : colors.neutral[600]}
              fontSize={descriptionFontSize}
              lineHeight={descriptionLineHeight}
              fontWeight={400}
            >
              프로젝트 진행 중 마주하는 다양한 문제들을 흰고래컴퍼니가 함께
              해결하며, 훌륭한 결과물을 약속드립니다.
            </Text>
          </Frame>
        </Frame>
      </div>
    );
  } else {
    return (
      <div
        id="intro"
        className={`transition-colors duration-500 ${
          isDarkMode ? "dark-mode" : "light-mode"
        }`}
        style={{
          backgroundColor: isDarkMode ? colors.neutral[950] : colors.white,
        }}
      >
        <Frame
          row
          w="100%"
          h="100%"
          px={containerPx}
          py={containerPy}
          bg={isDarkMode ? colors.neutral[950] : colors.white}
        >
          <Frame col w="40%" h="100%" alignment="top-left">
            {messages.map((msg, i) => (
              <Frame key={i} pb={24} opacity={Math.max(1 - i * 0.15, 0)}>
                <ChatBubble
                  bgColor={
                    isDarkMode ? colors.neutral[700] : colors.neutral[200]
                  }
                  textColor={
                    isDarkMode ? colors.main[200] : colors.neutral[600]
                  }
                  width={widths[i]}
                  text={msg}
                />
              </Frame>
            ))}
          </Frame>

          <Frame
            col
            w="100%"
            alignment="bottom-left"
            pt={textAreaPt}
            // gap={textAreaGap}
          >
            <Heading2
              fontColor={isDarkMode ? colors.white : colors.neutral[950]}
              fontWeight={700}
            >
              모르는 게 많아도,
            </Heading2>
            <Heading2
              fontColor={isDarkMode ? colors.white : colors.neutral[950]}
              fontWeight={700}
            >
              어디서부터 시작해야 할지 몰라도 괜찮습니다.
            </Heading2>
            <Frame w="100%" py={dividerPy}>
              <Divider
                color={isDarkMode ? colors.neutral[700] : colors.neutral[200]}
              />
            </Frame>
            <Frame>
              <Text
                fontColor={
                  isDarkMode ? colors.neutral[200] : colors.neutral[600]
                }
                fontSize={descriptionFontSize}
                lineHeight={descriptionLineHeight}
                fontWeight={400}
              >
                흰고래컴퍼니는 기획부터 개발까지 IT 프로덕트 제작의 모든 단계를
                지원하는 IT 솔루션 에이전시입니다.
              </Text>
              <Text
                fontColor={
                  isDarkMode ? colors.neutral[200] : colors.neutral[600]
                }
                fontSize={descriptionFontSize}
                lineHeight={descriptionLineHeight}
                fontWeight={400}
              >
                막연한 아이디어도 깊이 있는 분석을 통해 구체화하고, 시장에
                성공적으로 출시할 수 있도록 돕습니다.
              </Text>
              <Text
                fontColor={
                  isDarkMode ? colors.neutral[200] : colors.neutral[600]
                }
                fontSize={descriptionFontSize}
                lineHeight={descriptionLineHeight}
                fontWeight={400}
              >
                프로젝트 진행 중 마주하는 다양한 문제들을 흰고래컴퍼니가 함께
                해결하며, 훌륭한 결과물을 약속드립니다.
              </Text>
            </Frame>
          </Frame>
        </Frame>
      </div>
    );
  }
};

export default Intro;
