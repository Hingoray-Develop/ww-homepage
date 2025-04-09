"use client";

import { useEffect, useState } from "react";
import useClearLoading from "@/hooks/useClearLoading";
import CostCalculatorLeft from "./CostCalculatorLeft";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

import { Body3, Frame } from "@/atoms";
import useResponsiveType from "@/hooks/useResponsiveType";
import { colors } from "@/styles";

/**
 * <ai_context>
 * Main cost-calculator page. Now extended to 5 steps:
 * Step1 -> Step2 -> Step3 -> Step4 -> Step5 (success).
 * Updated so that after StepFour submission, we go to StepFive.
 * Step indicator now shows 5 steps.
 * The user can navigate backward if needed (except from StepFive).
 * Layout updated to have left and right areas take exactly 50% width each.
 * Right panel now takes full available screen height dynamically.
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
    5: boolean;
  }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  // StepOne state
  const [scopes, setScopes] = useState<string[]>([
    "기획",
    "UX/UI 디자인",
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
      if (!stepComplete[i as 1 | 2 | 3 | 4 | 5]) {
        return false;
      }
    }
    return true;
  };

  // stepOne "Next"
  const handleNextFromStepOne = () => {
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

  // finalize => StepFour (submitting email)
  const handleComplete = () => {
    // after sending email
    // normally we might reset state here, but since we want to keep data, we'll do nothing
    setStepComplete((prev) => ({ ...prev, 4: true }));
  };

  // for step 5 we don't have a "next", so no handle needed.

  // 반응형 패딩 값 설정
  const containerPx = isMobile ? 16 : isTablet ? 30 : 40;

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // 초기 윈도우 높이 설정
    setWindowHeight(window.innerHeight);

    // 리사이즈 이벤트 핸들러
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 헤더 높이(88px)와 컨테이너 패딩을 고려한 높이 계산
  const calculatedHeight = windowHeight - 88 - containerPx;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile || isTablet ? "column" : "row",
        width: "100%",
        height: calculatedHeight, // `${windowHeight - 88}px`,
        minHeight: "540px",
        paddingRight: containerPx,
        paddingLeft: containerPx,
        gap: isMobile || isTablet ? 24 : 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Left panel - 태블릿 이상에서만 표시 */}
      {!isMobile && !isTablet && (
        <div style={{ width: "50%", height: "100%" }}>
          <CostCalculatorLeft />
        </div>
      )}

      {/* Right panel (Steps) */}
      <div
        style={{
          width: isMobile || isTablet ? "100%" : "50%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
          borderRadius: 16,
          paddingLeft: isMobile ? 20 : 40,
          paddingRight: isMobile ? 20 : 40,
          margin: isMobile || isTablet ? "0 auto" : undefined,
          maxWidth: isMobile || isTablet ? "600px" : undefined,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Step indicator */}
        {step <= 5 && (
          <div
            className="flex flex-col w-[100%]"
            style={{
              paddingTop: isMobile ? 20 : 40,
              paddingBottom: isMobile ? 24 : 48,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 6,
                fontSize: isMobile ? 12 : 14,
                fontWeight: 600,
                width: "100%",
              }}
            >
              {[1, 2, 3, 4, 5].map((n) => {
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
                      backgroundColor:
                        step === n && !disabled
                          ? colors.neutral[800]
                          : step !== n && disabled
                          ? colors.neutral[100]
                          : colors.neutral[100],
                      color:
                        step === n && !disabled
                          ? colors.white
                          : step !== n && disabled
                          ? colors.neutral[300]
                          : colors.neutral[500],
                      cursor: disabled ? "not-allowed" : "pointer",
                      opacity: disabled ? 0.6 : 1,
                    }}
                  >
                    <Body3
                      px={isMobile ? 8 : 12}
                      py={isMobile ? 2 : 4}
                      fontWeight={600}
                    >
                      {("0" + n).slice(-2)}
                    </Body3>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
            setStep={setStep}
          />
        )}
        {step === 5 && <StepFive />}
      </div>
    </div>
  );
}
