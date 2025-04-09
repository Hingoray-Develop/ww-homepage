"use client";

import React, { useState, useEffect } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import { useRouter } from "next/navigation";
import { Frame, Heading2, Body1, FrameScreen } from "@/atoms";
import { colors } from "@/styles";
import useClearLoading from "@/hooks/useClearLoading";
import InquiryComplete from "./InquiryComplete";

export default function InquiryPage() {
  const { setIsLoading } = useLoading();
  const router = useRouter();

  // 페이지 로딩 시 로딩 상태 초기화
  useClearLoading();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!email.trim() || !message.trim()) {
        alert("이메일과 문의 내용을 모두 입력해주세요.");
        return;
      }

      setIsSubmitting(true);

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

      // 성공 시 완료 화면으로 전환
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("문의 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 문의 완료 화면 표시
  if (isSubmitted) {
    return <InquiryComplete />;
  }

  return (
    <div className="mt-[-88px]">
      <FrameScreen
        bg={colors.neutral[950]}
        alignment="center"
        overflow="hidden"
        h="calc(100vh - 88px)"
      >
        <Frame
          mobile={{
            px: 20,
          }}
          col
          w="100%"
          h="100%"
          alignment="center"
        >
          <Frame
            bg={colors.white}
            p={40}
            radius={16}
            desktop={{ w: "100%" }}
            tablet={{ w: "600px" }}
            mobile={{ w: "600px" }}
            maxW="600px"
          >
            <Heading2 fontColor={colors.neutral[950]} pb={8}>
              문의하기
            </Heading2>
            <Body1 fontColor={colors.neutral[500]} pb={32}>
              문의하실 이메일과 문의 내용을 작성해주세요. 담당자가 확인 후 답변
              드리겠습니다.
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

            <Frame row gap={16}>
              <button
                onClick={() => router.back()}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  border: `1px solid ${colors.neutral[800]}`,
                  borderRadius: 8,
                  padding: "12px 24px",
                  cursor: isSubmitting ? "default" : "pointer",
                  fontSize: "16px",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                disabled={isSubmitting}
              >
                취소
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !email.trim() || !message.trim()}
                style={{
                  backgroundColor: "#101828",
                  color: "#FFFFFF",
                  borderRadius: 8,
                  padding: "12px 24px",
                  cursor: isSubmitting ? "default" : "pointer",
                  fontSize: "16px",
                  opacity:
                    isSubmitting || !email.trim() || !message.trim() ? 0.7 : 1,
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
                  "문의 보내기"
                )}
              </button>
            </Frame>
          </Frame>
        </Frame>
      </FrameScreen>
    </div>
  );
}
