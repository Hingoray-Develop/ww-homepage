"use client";

import React, { useState } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import { useRouter } from "next/navigation";
import { Frame, Heading2, Body1 } from "@/atoms";
import { colors } from "@/styles";

/**
 * <ai_context>
 * New inquiry page where user can send an email inquiry using send-inquiry route.
 * Updated: match the design style from StepFour.tsx (e.g. inputs, textarea, button).
 * </ai_context>
 */

export default function InquiryPage() {
  const { setIsLoading } = useLoading();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (!email.trim() || !message.trim()) {
        alert("이메일과 문의 내용을 모두 입력해주세요.");
        return;
      }
      setIsLoading(true);

      const res = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) {
        throw new Error("문의 전송에 실패했습니다.");
      }

      alert("문의가 성공적으로 전송되었습니다.");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("문의 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "40px auto",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: "40px",
      }}
    >
      <Heading2 pb={8}>문의하기</Heading2>
      <Body1 fontColor={colors.neutral[500]} pb={32}>
        문의하실 이메일과 문의 내용을 작성해주세요. 담당자가 확인 후 답변 드리겠습니다.
      </Body1>

      {/* 이메일 입력 */}
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

      {/* 문의 내용 입력 */}
      <Body1 fontColor={colors.neutral[500]} pb={8}>
        문의 내용을 작성해주세요.
      </Body1>
      <textarea
        placeholder="문의하실 내용을 자세히 작성해주시면 더욱 빠른 응대가 가능합니다."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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

      <Frame pb={40} row gap={16}>
        <button
          onClick={() => router.back()}
          style={{
            backgroundColor: "#E2E8F0",
            color: "#000000",
            borderRadius: 8,
            padding: "12px 24px",
            cursor: "pointer",
            fontSize: "16px",
            border: "none",
          }}
        >
          취소
        </button>

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
          문의 보내기
        </button>
      </Frame>
    </div>
  );
}