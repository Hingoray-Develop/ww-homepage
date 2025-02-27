"use client";

import React, { useState } from "react";
import { Body1, Frame, Heading2 } from "@/atoms";
import { colors } from "@/styles";
import { useRouter } from "next/navigation";

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
  budgetRange: [number, number] | null; // ← StepTwo에서 넘어온 예산 범위
  onComplete: () => void;
  setStep: (val: number) => void;
}

export default function StepFour({
  selectedOptions,
  scopes,
  budgetRange,
  onComplete,
  setStep,
}: StepFourProps) {
  const [email, setEmail] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    try {
      setIsSubmitting(true);

      // StepTwo에서 선택한 예산 범위를 함께 전송
      const userMinBudget = budgetRange ? budgetRange[0] : null;
      const userMaxBudget = budgetRange ? budgetRange[1] : null;

      const response = await fetch("/api/send-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          additionalNotes,
          scopes,

          // StepThree/StepFour 계산 결과
          selectedOptions,
          minDuration: selectedOptions[0].durationMin,
          maxDuration: selectedOptions[0].durationMax,
          totalMinCost: selectedOptions[0].minCost,
          totalMaxCost: selectedOptions[0].maxCost,

          // StepTwo에서 선택한 예산 범위
          userMinBudget,
          userMaxBudget,
        }),
      });

      if (!response.ok) {
        throw new Error("이메일 전송에 실패했습니다.");
      }

      onComplete();
      setStep(5);
    } catch (error) {
      console.error("견적서 전송 실패:", error);
      alert("견적서 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
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
        disabled={isSubmitting}
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
        disabled={isSubmitting}
      />

      <Frame pb={40}>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            backgroundColor: "#101828",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "12px 24px",
            cursor: isSubmitting ? "default" : "pointer",
            fontSize: "16px",
            opacity: isSubmitting ? 0.7 : 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              전송중...
            </>
          ) : (
            "제출"
          )}
        </button>
      </Frame>
    </div>
  );
}
