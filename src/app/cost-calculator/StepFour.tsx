"use client";

import React, { useState } from "react";
import { Body1, Frame, Heading2 } from "@/atoms";
import { useLoading } from "@/contexts/LoadingContext";
import { colors } from "@/styles";

/**
 * <ai_context>
 * StepFour: now sums minCost and maxCost from selectedOptions to show a range,
 * then sends that range in the request body. We'll show "x,xxx원~x,xxx원" style.
 * Updated: add "additionalNotes" textarea so user can input more details.
 * </ai_context>
 */

interface CostCalculatorOption {
  durationMin: number;
  durationMax: number;
  minCost: number;
  maxCost: number;
  label?: string;
}

interface StepFourProps {
  selectedOptions: CostCalculatorOption[];
  scopes: string[];
  budgetRange: [number, number] | null;
  onComplete: () => void;
}

export default function StepFour({
  selectedOptions,
  scopes,

  onComplete,
}: StepFourProps) {
  const { setIsLoading } = useLoading();
  const [email, setEmail] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  console.log("selectedOptions", selectedOptions);

  // 평균 기간 계산 (StepThree에서 계산된 durationMin, durationMax 사용)

  async function handleSubmit() {
    try {
      setIsLoading(true);

      // 만약 selectedOptions가 비어있다면 기본값 설정
      const optionsToSend = [...selectedOptions];

      const response = await fetch("/api/send-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          additionalNotes,
          scopes,

          selectedOptions: optionsToSend,
          minDuration: selectedOptions[0].durationMin,
          maxDuration: selectedOptions[0].durationMax,
          totalMinCost: selectedOptions[0].minCost,
          totalMaxCost: selectedOptions[0].maxCost,
        }),
      });

      if (!response.ok) {
        throw new Error("이메일 전송에 실패했습니다.");
      }

      alert("견적서가 메일로 발송되었어요!");
      onComplete();
    } catch (error) {
      console.error("견적서 전송 실패:", error);
      alert("견적서 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Heading2 fontColor={colors.neutral[950]} pb={8}>
        연락처를 알려주세요.
      </Heading2>
      <Body1 fontColor={colors.neutral[500]} pb={32}>
        작성하신 이메일로 견적서가 보내질 예정이에요.
      </Body1>

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "16px 20px",
          borderRadius: 8,
          marginBottom: 24,
          backgroundColor: colors.neutral[100],
          border: "1px solid transparent",
          outline: "none",
          transition: "all 0.2s ease-in-out",
        }}
        onFocus={(e) => {
          e.target.style.backgroundColor = "#FFFFFF";
          e.target.style.borderColor = colors.neutral[300];
        }}
        onBlur={(e) => {
          e.target.style.backgroundColor = colors.neutral[100];
          e.target.style.borderColor = "transparent";
        }}
      />

      <Body1 fontColor={colors.neutral[500]} pb={8}>
        추가 문의 사항이 있으신가요?
      </Body1>
      <textarea
        placeholder="프로젝트에 대해 더 자세히 설명해주시면 더 정확한 견적 산출이 가능해요."
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        style={{
          width: "100%",
          minHeight: 100,
          padding: "16px 20px",
          borderRadius: 8,
          marginBottom: 24,
          backgroundColor: colors.neutral[100],
          border: "1px solid transparent",
          outline: "none",
          resize: "vertical",
          transition: "all 0.2s ease-in-out",
        }}
        onFocus={(e) => {
          e.target.style.backgroundColor = "#FFFFFF";
          e.target.style.borderColor = colors.neutral[300];
        }}
        onBlur={(e) => {
          e.target.style.backgroundColor = colors.neutral[100];
          e.target.style.borderColor = "transparent";
        }}
      />

      <Frame pb={40}>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#101828",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "12px 24px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          제출
        </button>
      </Frame>
    </div>
  );
}
