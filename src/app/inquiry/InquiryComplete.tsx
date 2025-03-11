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
 * InquiryComplete: Success screen shown after a user successfully submits an inquiry.
 * Displays a success message and a "홈으로 돌아가기" button that navigates to the homepage.
 * Design follows the same pattern as StepFive.tsx from the cost calculator.
 * </ai_context>
 */

export default function InquiryComplete() {
  const router = useRouter();

  return (
    <Frame
      w="100%"
      h="100%"
      col
      alignment="center"
      minH={660}
      mobile={{
        px: 20,
      }}
    >
      <Frame
        bg={colors.white}
        p={40}
        radius={16}
        col
        alignment="center"
        desktop={{ w: "100%" }}
        tablet={{ w: "600px" }}
        mobile={{ w: "600px" }}
        maxW="600px"
      >
        <CheckIcon width={52} height={52} />
        <Frame col alignment="center">
          <Heading2 fontColor={colors.neutral[900]} py={8}>
            문의 접수 완료!
          </Heading2>
          <Body1 fontColor={colors.neutral[500]}>
            문의가 성공적으로 접수되었습니다.
          </Body1>
          <Body1 fontColor={colors.neutral[500]} pb={32}>
            빠른 시일 내 입력해주신 이메일 주소로 발송될 예정입니다.
          </Body1>
        </Frame>
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
    </Frame>
  );
}
