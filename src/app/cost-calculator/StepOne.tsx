"use client";

import React from "react";
import { Body1, Frame, Heading2, Text } from "@/atoms";
import { colors } from "@/styles";
import CheckedIcon from "@/assets/icons/line/checked.svg?react";
import UncheckedIcon from "@/assets/icons/line/unchecked.svg?react";

/**
 * <ai_context>
 * StepOne: Select which project scopes the user wants (기획/디자인/개발).
 * Now all 3 are selected by default,
 * and the '다음' button is disabled if none is selected.
 * </ai_context>
 */

const DEFAULT_SCOPES = [
  "기획",
  "UX/UI 디자인",
  "BI/CI 디자인(로고, 브랜딩 등)",
  "개발",
];

interface StepOneProps {
  scopes: string[];
  setScopes: (val: string[]) => void;
  onNext: () => void;
}

const STEP_OPTIONS = DEFAULT_SCOPES;

export default function StepOne({ scopes, setScopes, onNext }: StepOneProps) {
  // 컴포넌트 마운트 시 초기값 설정
  React.useEffect(() => {
    if (scopes.length === 0) {
      setScopes(DEFAULT_SCOPES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleScope = (scope: string) => {
    if (scopes.includes(scope)) {
      setScopes(scopes.filter((s) => s !== scope));
    } else {
      setScopes([...scopes, scope]);
    }
  };

  const isDisabled = scopes.length === 0;

  return (
    <>
      <Frame col w="100%">
        <Heading2 pb={8}>프로젝트 범위를 알려주세요.</Heading2>
        <Body1 fontColor={colors.neutral[500]}>
          프로젝트에 필요한 부분을 전부 체크해주세요.
        </Body1>
        <Frame col w="100%" gap={16} py={32}>
          {STEP_OPTIONS.map((opt) => {
            const checked = scopes.includes(opt);
            return (
              <label
                key={opt}
                onClick={() => toggleScope(opt)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: checked ? "#E7EEFF" : "rgba(0,0,0,0.05)",
                  padding: "12px 16px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                {checked ? <CheckedIcon /> : <UncheckedIcon />}
                <Body1>{opt}</Body1>
              </label>
            );
          })}
        </Frame>
      </Frame>
      <Frame pb={40}>
        <button
          onClick={onNext}
          disabled={isDisabled}
          style={{
            backgroundColor: isDisabled ? "#101828" : "#101828",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "12px 24px",
            cursor: isDisabled ? "default" : "pointer",
            fontSize: "16px",
            opacity: isDisabled ? 0.5 : 1,
          }}
        >
          다음
        </button>
      </Frame>
    </>
  );
}
