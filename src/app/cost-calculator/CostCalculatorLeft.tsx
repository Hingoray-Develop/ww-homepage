"use client";

import { Body1, Frame, Heading2, Heading6, Text } from "@/atoms";
import { colors } from "@/styles";
import Image from "next/image";
import IconArrowBottom from "@/assets/icons/line/arrow-down.svg?react";

/**
 * <ai_context>
 * Left-side component for cost-calculator steps,
 * featuring an image, title, and "회사소개서 다운로드" button.
 * Updated to fill ~50% of screen width, no border radius, bigger layout.
 * </ai_context>
 */

export default function CostCalculatorLeft() {
  return (
    <Frame
      col
      w="100%"
      h="100%"
      alignment="top-left"
      bg={colors.neutral[950]}
      pl={60}
      py={135}
    >
      <Frame col alignment="top-left" gap={8} w="100%">
        <Heading2 fontColor={colors.white} fontWeight={700}>
          IT 솔루션 개발,
        </Heading2>
        <Heading2 fontColor={colors.main[200]} fontWeight={700}>
          첫삽부터 제대로
        </Heading2>
      </Frame>

      <Frame w="100%" py={24}>
        <div style={{ width: "320px", height: "240px", position: "relative" }}>
          <Image
            src="/images/coding.png"
            alt="company-intro"
            fill
            style={{
              objectFit: "cover",
              borderRadius: "16px",
            }}
          />
        </div>
      </Frame>

      <Frame w="100%" pb={24}>
        <Body1 fontColor={colors.neutral[300]} fontWeight={400}>
          세부 진행과정이 궁금하시다면,
          <br />
          흰고래컴퍼니 회사소개서를 다운받아보세요.
        </Body1>
      </Frame>

      <a
        href="/whitewhale-company-profile.pdf"
        download
        style={{
          textDecoration: "none",
          backgroundColor: colors.neutral[950],
          color: colors.white,
          borderRadius: 500,
          padding: "18px 40px",
          border: `1px solid ${colors.white}`,
        }}
      >
        <Frame row gap={8} alignment="center">
          <Heading6>회사소개서 다운받기</Heading6>
          <IconArrowBottom />
        </Frame>
      </a>
    </Frame>
  );
}
