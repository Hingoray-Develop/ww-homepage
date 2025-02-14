"use client";

import { Frame, FrameScreen, Heading2, Heading4, Text } from "@/atoms";
import { ChatBubble, Divider } from "@/components";
import { colors } from "@/styles";
import { useEffect, useMemo, useState } from "react";
import useResponsiveType from "@/hooks/useResponsiveType";

// 텍스트 픽셀 길이를 재는 헬퍼 함수
function measureTextWidth(text: string, font = "16px sans-serif"): number {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;
  ctx.font = font;
  return ctx.measureText(text).width;
}

const Intro = () => {
  // 클라이언트에서 마운트되었는지 확인
  const [hasMounted, setHasMounted] = useState(false);

  const { responsiveType } = useResponsiveType();
  const isMobile = responsiveType === "mobile";
  const isTablet = responsiveType === "tablet";

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

  // 채팅 말풍선의 너비 계산 (모바일: 최대 300, 태블릿: 최대 450, 데스크탑: 최대 600)
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

  // 폰트 크기 및 줄 높이 설정

  const descriptionFontSize = isMobile ? 14 : isTablet ? 16 : 20;
  const descriptionLineHeight = isMobile ? "26px" : isTablet ? "28px" : "30px";

  // 외부 컨테이너 여백
  const containerPx = isMobile ? 16 : isTablet ? 30 : 40;
  const containerPy = isMobile ? 80 : isTablet ? 100 : 120;

  // 우측(또는 단일) 텍스트 영역 설정

  const textAreaPt = isMobile ? 120 : isTablet ? 200 : 460;
  const textAreaGap = isMobile ? 8 : isTablet ? 12 : 16;
  const dividerPy = isMobile ? 16 : isTablet ? 20 : 24;

  if (isMobile || isTablet) {
    // 모바일 또는 태블릿: 채팅 말풍선은 숨기고 텍스트들만 중앙 정렬하여 표시
    return (
      <FrameScreen overflow="hidden">
        <Frame
          col
          w="100%"
          px={containerPx}
          py={containerPy}
          bg={colors.neutral[950]}
        >
          <Heading4 fontColor={colors.white} fontWeight={700}>
            모르는 게 많아도,
          </Heading4>
          <Heading4 fontColor={colors.white} fontWeight={700}>
            어디서부터 시작해야 할지 몰라도 괜찮습니다.
          </Heading4>
          <Frame w="100%" py={dividerPy}>
            <Divider color={colors.neutral[700]} />
          </Frame>
          <Frame>
            <Text
              fontColor={colors.neutral[200]}
              fontSize={descriptionFontSize}
              lineHeight={descriptionLineHeight}
              fontWeight={400}
            >
              흰고래컴퍼니는 기획부터 개발까지 IT 프로덕트 제작의 모든 단계를
              지원하는 IT 솔루션 에이전시입니다.
            </Text>
            <Text
              fontColor={colors.neutral[200]}
              fontSize={descriptionFontSize}
              lineHeight={descriptionLineHeight}
              fontWeight={400}
            >
              막연한 아이디어도 깊이 있는 분석을 통해 구체화하고, 시장에
              성공적으로 출시할 수 있도록 돕습니다.
            </Text>
            <Text
              fontColor={colors.neutral[200]}
              fontSize={descriptionFontSize}
              lineHeight={descriptionLineHeight}
              fontWeight={400}
            >
              프로젝트 진행 중 마주하는 다양한 문제들을 흰고래컴퍼니가 함께
              해결하며, 훌륭한 결과물을 약속드립니다.
            </Text>
          </Frame>
        </Frame>
      </FrameScreen>
    );
  } else {
    // 데스크탑: 채팅 말풍선과 텍스트들을 좌측/우측에 배치
    return (
      <FrameScreen overflow="hidden">
        <Frame
          row
          w="100%"
          h="100%"
          px={containerPx}
          py={containerPy}
          bg={colors.neutral[950]}
        >
          {/* 채팅 메시지 영역 */}
          <Frame col w="40%" h="100%" alignment="top-left">
            {messages.map((msg, i) => (
              <Frame key={i} pb={24} opacity={Math.max(1 - i * 0.15, 0)}>
                <ChatBubble
                  bgColor={colors.neutral[700]}
                  textColor={colors.main[200]}
                  width={widths[i]}
                  text={msg}
                />
              </Frame>
            ))}
          </Frame>

          {/* 우측 하단 텍스트 영역 */}
          <Frame
            col
            w="100%"
            alignment="bottom-left"
            pt={textAreaPt}
            gap={textAreaGap}
          >
            <Heading2 fontColor={colors.white} fontWeight={700}>
              모르는 게 많아도,
            </Heading2>
            <Heading2 fontColor={colors.white} fontWeight={700}>
              어디서부터 시작해야 할지 몰라도 괜찮습니다.
            </Heading2>
            <Frame w="100%" py={dividerPy}>
              <Divider color={colors.neutral[700]} />
            </Frame>
            <Frame>
              <Text
                fontColor={colors.neutral[200]}
                fontSize={descriptionFontSize}
                lineHeight={descriptionLineHeight}
                fontWeight={400}
              >
                흰고래컴퍼니는 기획부터 개발까지 IT 프로덕트 제작의 모든 단계를
                지원하는 IT 솔루션 에이전시입니다.
              </Text>
              <Text
                fontColor={colors.neutral[200]}
                fontSize={descriptionFontSize}
                lineHeight={descriptionLineHeight}
                fontWeight={400}
              >
                막연한 아이디어도 깊이 있는 분석을 통해 구체화하고, 시장에
                성공적으로 출시할 수 있도록 돕습니다.
              </Text>
              <Text
                fontColor={colors.neutral[200]}
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
      </FrameScreen>
    );
  }
};

export default Intro;
