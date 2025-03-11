"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Frame, Heading2, Body1, Body2 } from "@/atoms";
import { colors } from "@/styles";
import Button from "@/components/Button";
import HomeIcon from "@/assets/icons/line/home.svg?react";
import CheckIcon from "@/assets/icons/circle/check.svg?react";

/**
 * <ai_context>
 * StepFive: final step of the wizard, shown after email is successfully sent.
 * Displays the success message. The "메인으로 돌아가기" button navigates to the homepage.
 * </ai_context>
 */

export default function StepFive() {
  const router = useRouter();

  return (
    <Frame w="100%" h="100%" col alignment="center">
      <CheckIcon width={52} height={52} />
      <Heading2 fontColor={colors.neutral[900]} pt={8} pb={16}>
        견적서 요청 완료!
      </Heading2>
      <Body1 fontColor={colors.neutral[500]} pb={32}>
        견적서는 검토 후 빠른 시일 내 입력해주신 이메일 주소로 발송될
        예정입니다.
        <br />
        이메일 주소가 정확하지 않을 경우 연락이 어려울 수 있으니 확인
        부탁드립니다.
      </Body1>
      <Button
        onClick={() => router.push("/")}
        bg={colors.neutral[800]}
        radius={6}
      >
        <Frame row px={20} py={11} gap={8} alignment="center">
          <HomeIcon />
          <Body2 fontColor={colors.white}>홈으로 돌아가기</Body2>
        </Frame>
      </Button>
    </Frame>
  );
}
