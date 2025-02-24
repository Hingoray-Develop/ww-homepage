"use client";

import React, { useState } from "react";
import { Body1, Frame, Heading2 } from "@/atoms";
import { useLoading } from "@/contexts/LoadingContext";
import { CostCalculatorOption } from "@/data/costCalculatorOptions";
import { colors } from "@/styles";

/**
 * <ai_context>
 * StepFour: now sums minCost and maxCost from selectedOptions to show a range,
 * then sends that range in the request body. We'll show "x,xxx원~x,xxx원" style.
 * </ai_context>
 */

interface StepFourProps {
  selectedOptions: CostCalculatorOption[];
  scopes: string[];
  budgetRange: [number, number] | null;
  onComplete: () => void;
}

export default function StepFour({
  selectedOptions,
  scopes,
  budgetRange,
  onComplete,
}: StepFourProps) {
  const { setIsLoading } = useLoading();
  const [email, setEmail] = useState("");

  const totalDuration = selectedOptions.reduce(
    (sum, option) => sum + option.duration,
    0
  );

  // sum minCost and maxCost
  const totalMinCost = selectedOptions.reduce(
    (sum, option) => sum + option.minCost,
    0
  );
  const totalMaxCost = selectedOptions.reduce(
    (sum, option) => sum + option.maxCost,
    0
  );

  async function handleSubmit() {
    try {
      setIsLoading(true);

      const response = await fetch("/api/send-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          scopes,
          budgetRange,
          selectedOptions,
          totalDuration,
          totalMinCost,
          totalMaxCost,
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
      <Heading2 pb={8}>연락처를 알려주세요.</Heading2>
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
