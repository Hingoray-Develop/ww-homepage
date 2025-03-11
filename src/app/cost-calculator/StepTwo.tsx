"use client";

import React, { useState } from "react";
import { Body1, Frame, Heading2 } from "@/atoms";
import { Range } from "react-range";
import { colors } from "@/styles";
import CheckedIcon from "@/assets/icons/line/checked.svg?react";
import UncheckedIcon from "@/assets/icons/line/unchecked.svg?react";

interface StepTwoProps {
  budgetRange: [number, number] | null;
  setBudgetRange: (val: [number, number] | null) => void;
  onNext: () => void;
}

/**
 * <ai_context>
 * StepTwo: min/max budget range slider with discrete marks,
 * re-implemented so we have 7 equally spaced steps (0~6),
 * each mapped to DISCRETE_VALUES = [500, 1000, 3000, 5000, 7000, 9000, 10000].
 * We track the user's last used slider values so toggling
 * "아직 잘 모르겠어요" off again restores them.
 * </ai_context>
 */

const DISCRETE_VALUES = [500, 1000, 3000, 5000, 7000, 9000, 10000];

export default function StepTwo({
  budgetRange,
  setBudgetRange,
  onNext,
}: StepTwoProps) {
  // 사용자가 "아직 잘 모르겠어요." 상태인지 추적
  const [dontKnow, setDontKnow] = useState(budgetRange === null);

  // 마지막으로 사용자가 지정한 슬라이더 값(state)
  const [sliderValues, setSliderValues] = useState<[number, number]>(() => {
    if (budgetRange === null) {
      // 기본값 [2, 4] => 3000~7000만원
      return [2, 4];
    }
    const [minVal, maxVal] = budgetRange;
    return [findIndexForValue(minVal), findIndexForValue(maxVal)];
  });

  // 이전에 사용하던 슬라이더 값
  const [previousSliderValues, setPreviousSliderValues] =
    useState<[number, number]>(sliderValues);

  function findIndexForValue(val: number) {
    let bestIndex = 0;
    let bestDiff = Math.abs(val - DISCRETE_VALUES[0]);
    for (let i = 1; i < DISCRETE_VALUES.length; i++) {
      const diff = Math.abs(val - DISCRETE_VALUES[i]);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIndex = i;
      }
    }
    return bestIndex;
  }

  function handleSliderChange(indices: number[]) {
    const sorted = [...indices].sort((a, b) => a - b);
    setSliderValues([sorted[0], sorted[1]]);
    setPreviousSliderValues([sorted[0], sorted[1]]); // 매번 업데이트
    const [idx1, idx2] = sorted;
    setBudgetRange([DISCRETE_VALUES[idx1], DISCRETE_VALUES[idx2]]);
  }

  function handleDontKnow(checked: boolean) {
    if (checked) {
      // "아직 잘 모르겠어요" 상태로 진입
      // 현재 sliderValues 백업
      setPreviousSliderValues(sliderValues);
      setDontKnow(true);
      setBudgetRange(null);
    } else {
      // 되돌릴 때 이전 sliderValues 복원
      setDontKnow(false);
      setSliderValues(previousSliderValues);
      const [idx1, idx2] = previousSliderValues;
      setBudgetRange([DISCRETE_VALUES[idx1], DISCRETE_VALUES[idx2]]);
    }
  }

  const labelTexts = DISCRETE_VALUES.map((val) =>
    val === 10000 ? "1억+" : val.toLocaleString("ko-KR")
  );
  const STEP_COUNT = DISCRETE_VALUES.length - 1;

  return (
    <div>
      <Heading2 fontColor={colors.neutral[950]} pb={8}>
        예산 범위를 알려주세요.
      </Heading2>
      <Body1 fontColor={colors.neutral[500]}>
        대략적인 예산의 범위를 알려주세요.
      </Body1>

      <Frame col gap={24} py={32} w="100%">
        <div
          style={{
            width: "100%",
            position: "relative",
            opacity: dontKnow ? 0.5 : 1,
          }}
        >
          <Range
            values={sliderValues}
            step={1}
            min={0}
            max={STEP_COUNT}
            disabled={dontKnow}
            onChange={(vals) => handleSliderChange(vals as [number, number])}
            renderTrack={({ props, children }) => {
              const [val0, val1] = sliderValues;
              const leftPercent = ((val0 - 0) / STEP_COUNT) * 100;
              const rightPercent = ((val1 - 0) / STEP_COUNT) * 100;
              return (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    width: "100%",
                    height: 6,
                    background: `linear-gradient(
                      to right,
                      ${colors.neutral[200]} 0%,
                      ${colors.neutral[200]} ${leftPercent}%,
                      #5288F9 ${leftPercent}%,
                      #5288F9 ${rightPercent}%,
                      ${colors.neutral[200]} ${rightPercent}%,
                      ${colors.neutral[200]} 100%
                    )`,
                    borderRadius: 3,
                    position: "relative",
                  }}
                >
                  {children}
                </div>
              );
            }}
            renderThumb={({ props, isDragged }) => {
              const { key, ...restProps } = props;
              return (
                <div
                  key={key}
                  {...restProps}
                  style={{
                    ...restProps.style,
                    height: 14,
                    width: 14,
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 0 0 2px #5288F9",
                    outline: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: "translateX(-50%)",
                  }}
                />
              );
            }}
          />
          <div style={{ position: "relative", height: "24px", marginTop: 12 }}>
            {labelTexts.map((label, i) => {
              let leftPercent = (i / STEP_COUNT) * 100;

              // 첫 번째와 마지막 라벨의 위치 조정
              if (i === 0) {
                leftPercent = 0;
              } else if (i === STEP_COUNT) {
                leftPercent = 100;
              }

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${leftPercent}%`,
                    transform:
                      i === 0
                        ? "translateX(0)"
                        : i === STEP_COUNT
                        ? "translateX(-100%)"
                        : "translateX(-50%)",
                    color: "#667085",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </Frame>

      <label
        onClick={() => handleDontKnow(!dontKnow)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: colors.neutral[950],
        }}
      >
        {dontKnow ? <CheckedIcon /> : <UncheckedIcon />}
        아직 잘 모르겠어요.
      </label>
      <Frame pb={40}>
        <button
          onClick={onNext}
          style={{
            marginTop: 24,
            backgroundColor: "#101828",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "12px 24px",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          다음
        </button>
      </Frame>
    </div>
  );
}
