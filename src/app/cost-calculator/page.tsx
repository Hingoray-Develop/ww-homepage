"use client";

import { useState } from "react";
import useClearLoading from "@/hooks/useClearLoading";
import CostCalculatorLeft from "./CostCalculatorLeft";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

import { Body3, Frame } from "@/atoms";
import useResponsiveType from "@/hooks/useResponsiveType";
// import { CostCalculatorOption } from "@/types";

/**
 * <ai_context>
 * Main cost-calculator page redesigned to 4-step wizard + left panel.
 * Updated to reset step after email is submitted and pass scopes/budgetRange to StepFour.
 * Now updated to give the left panel ~50% width, and the right panel ~50%.
 * Next update: disallow forward navigation if prior steps not completed,
 * but allow backward navigation from later steps.
 * Also store step completion states so previous selections remain.
 * And show disabled style (reduced opacity/cursor) for steps that are not yet allowed.
 * Updated again: pass 'scopes' to StepThree so it can detect if only BI/CI 디자인 was chosen.
 * </ai_context>
 */

// StepFour에서 정의한 인터페이스와 동일하게 정의
interface CostCalculatorOption {
  durationMin: number;
  durationMax: number;
  minCost: number;
  maxCost: number;
}

export default function CostCalculator() {
  const { responsiveType } = useResponsiveType();
  const isMobile = responsiveType === "mobile";
  const isTablet = responsiveType === "tablet";

  // Clear any lingering loading state for this page
  useClearLoading();

  const [step, setStep] = useState(1);

  // Track which steps are "completed"
  const [stepComplete, setStepComplete] = useState<{
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
  }>({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  // StepOne state
  const [scopes, setScopes] = useState<string[]>([
    "기획",
    "UX/UI 디자인",
    "BI/CI 디자인(로고, 브랜딩 등)",
    "개발",
  ]); // default selected

  // StepTwo: min & max budget or null if don't know
  const [budgetRange, setBudgetRange] = useState<[number, number] | null>([
    3000, 7000,
  ]);

  // StepThree state
  const [selectedOptions, setSelectedOptions] = useState<
    CostCalculatorOption[]
  >([]);

  const canGoForward = (targetStep: number) => {
    // can always go backward
    if (targetStep < step) return true;

    // else, check if all steps up to (targetStep - 1) are complete
    for (let i = 1; i < targetStep; i++) {
      if (!stepComplete[i as 1 | 2 | 3 | 4]) {
        return false;
      }
    }
    return true;
  };

  // stepOne "Next"
  const handleNextFromStepOne = () => {
    // must ensure stepOne is valid
    if (scopes.length > 0) {
      setStepComplete((prev) => ({ ...prev, 1: true }));
      setStep(2);
    }
  };

  // stepTwo "Next"
  const handleNextFromStepTwo = () => {
    setStepComplete((prev) => ({ ...prev, 2: true }));
    setStep(3);
  };

  // stepThree "Next"
  const handleNextFromStepThree = () => {
    setStepComplete((prev) => ({ ...prev, 3: true }));
    setStep(4);
  };

  // finalize => StepFour
  const handleComplete = () => {
    // after sending email, reset
    setScopes([
      "기획",
      "UX/UI 디자인",
      "BI/CI 디자인(로고, 브랜딩 등)",
      "개발",
    ]);
    setBudgetRange([1000, 5000]);
    setSelectedOptions([]);
    setStepComplete({ 1: false, 2: false, 3: false, 4: false });
    setStep(1);
  };

  // 반응형 패딩 값 설정
  const containerPx = isMobile ? 16 : isTablet ? 30 : 40;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile || isTablet ? "column" : "row",
        width: "100%",
        paddingRight: containerPx,
        paddingLeft: containerPx,
        gap: isMobile || isTablet ? 24 : 0,
      }}
    >
      {/* Left panel - 태블릿 이상에서만 표시 */}
      {!isMobile && !isTablet && (
        <div style={{ flex: 1, width: "auto" }}>
          <CostCalculatorLeft />
        </div>
      )}

      {/* Right panel (Steps) */}
      <div
        style={{
          flex: isMobile || isTablet ? "none" : 1,
          width: "100%",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
          borderRadius: 16,
          paddingLeft: isMobile ? 20 : 40,
          paddingRight: isMobile ? 20 : 40,
          margin: isMobile || isTablet ? "0 auto" : undefined,
          maxWidth: isMobile || isTablet ? "600px" : undefined,
        }}
      >
        {/* Step indicator */}
        <Frame col w="100%" pt={isMobile ? 24 : 40} pb={isMobile ? 32 : 48}>
          <div
            style={{
              display: "flex",
              gap: isMobile ? 8 : 16,
              fontSize: isMobile ? 12 : 14,
              fontWeight: 600,
              width: "100%",
            }}
          >
            {[1, 2, 3, 4].map((n) => {
              const disabled = !canGoForward(n);
              return (
                <div
                  key={n}
                  onClick={() => {
                    if (!disabled) {
                      setStep(n);
                    }
                  }}
                  style={{
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: step === n ? "#101828" : "#E5E7EB",
                    color: step === n ? "#FFF" : "#000",
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.5 : 1,
                  }}
                >
                  <Body3 px={isMobile ? 8 : 12} py={isMobile ? 2 : 4}>
                    {("0" + n).slice(-2)}
                  </Body3>
                </div>
              );
            })}
          </div>
        </Frame>

        {/* Steps */}
        {step === 1 && (
          <StepOne
            scopes={scopes}
            setScopes={setScopes}
            onNext={handleNextFromStepOne}
          />
        )}
        {step === 2 && (
          <StepTwo
            budgetRange={budgetRange}
            setBudgetRange={setBudgetRange}
            onNext={handleNextFromStepTwo}
          />
        )}
        {step === 3 && (
          <StepThree
            onNext={handleNextFromStepThree}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            scopes={scopes}
          />
        )}
        {step === 4 && (
          <StepFour
            selectedOptions={selectedOptions}
            scopes={scopes}
            budgetRange={budgetRange}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  );
}
