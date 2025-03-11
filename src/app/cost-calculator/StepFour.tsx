"use client";

import React, { useState, useEffect } from "react";
import { Body1, Body2, Frame, Heading2 } from "@/atoms";
import { colors } from "@/styles";

/**
 * <ai_context>
 * StepFour: with basic email validation
 * - 유효성 검사 후, 잘못된 이메일은 경고 메시지 표시 & 제출 버튼 비활성화
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
  const [emailError, setEmailError] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateEmail(value: string) {
    // 간단한 RFC 5322 기반 정규표현식
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value.trim());
  }

  useEffect(() => {
    if (email === "") {
      setEmailError("");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("유효한 이메일 주소가 아닙니다.");
    } else {
      setEmailError("");
    }
  }, [email]);

  async function handleSubmit() {
    // 이메일 유효성 확인 후 전송
    if (!validateEmail(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    try {
      setIsSubmitting(true);

      const userMinBudget = budgetRange ? budgetRange[0] : null;
      const userMaxBudget = budgetRange ? budgetRange[1] : null;

      const response = await fetch("/api/send-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          additionalNotes,
          scopes,
          selectedOptions,
          minDuration: selectedOptions[0].durationMin,
          maxDuration: selectedOptions[0].durationMax,
          totalMinCost: selectedOptions[0].minCost,
          totalMaxCost: selectedOptions[0].maxCost,
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
          marginBottom: 20,
          backgroundColor: colors.neutral[100],
          outline: `1px solid ${colors.neutral[100]}`,
          color: colors.neutral[950],
        }}
        onFocus={(e) => {
          e.target.style.backgroundColor = colors.neutral[100];
          e.target.style.outline = `1px solid ${colors.neutral[300]}`;
        }}
        onBlur={(e) => {
          e.target.style.backgroundColor = colors.neutral[100];
          e.target.style.outline = "none";
        }}
        disabled={isSubmitting}
      />
      {emailError && (
        <div style={{ color: "red", fontSize: 14, marginBottom: 16 }}>
          {emailError}
        </div>
      )}

      <Body2 fontColor={colors.neutral[500]} pb={8}>
        추가 문의 사항이 있으신가요?
      </Body2>
      <textarea
        placeholder="내용을 입력하세요."
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        style={{
          width: "100%",
          minHeight: 100,
          padding: "16px 20px",
          borderRadius: 8,
          marginBottom: 24,
          backgroundColor: colors.neutral[100],
          outline: `1px solid ${colors.neutral[100]}`,
          resize: "none",
          color: colors.neutral[950],
        }}
        onFocus={(e) => {
          e.target.style.backgroundColor = colors.neutral[100];
          e.target.style.outline = `1px solid ${colors.neutral[300]}`;
        }}
        onBlur={(e) => {
          e.target.style.backgroundColor = colors.neutral[100];
          e.target.style.outline = "none";
        }}
        disabled={isSubmitting}
      />

      <Frame pb={40}>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !!emailError || email.length === 0}
          style={{
            backgroundColor: "#101828",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "12px 24px",
            cursor: isSubmitting ? "default" : "pointer",
            fontSize: "16px",
            opacity:
              isSubmitting || !!emailError || email.length === 0 ? 0.7 : 1,
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
