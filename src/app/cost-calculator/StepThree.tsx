"use client";

import React from "react";
import {
  costCalculatorOptions,
  CostCalculatorOption,
} from "@/data/costCalculatorOptions";
import { Body1, Frame, Heading2, Text } from "@/atoms";
import { colors } from "@/styles";

/**
 * <ai_context>
 * StepThree: user picks functionalities from the existing costCalculatorOptions,
 * now uses the item.icon directly, which is a React SVG component.
 * Also no changes needed for cost logic here aside from the icons usage.
 * </ai_context>
 */

interface StepThreeProps {
  selectedOptions: CostCalculatorOption[];
  setSelectedOptions: (val: CostCalculatorOption[]) => void;
  onNext: () => void;
}

export default function StepThree({
  selectedOptions,
  setSelectedOptions,
  onNext,
}: StepThreeProps) {
  const toggleOptionSelection = (option: CostCalculatorOption) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      <Heading2 pb={8}>구현이 필요한 기능을 골라주세요.</Heading2>
      <Body1 fontColor={colors.neutral[500]} pb={24}>
        필요한 기능들을 고를수록 정확한 견적을 보내드려요.
      </Body1>

      {costCalculatorOptions.map((section) => (
        <div key={section.title} style={{ marginBottom: 24 }}>
          <Text fontSize={20} fontWeight={600} pb={8}>
            {section.title}
          </Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {section.options.map((option) => {
              const isSelected = selectedOptions.includes(option);
              const IconComp = option.icon;

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => toggleOptionSelection(option)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    borderRadius: 8,
                    border: isSelected
                      ? `1px solid ${colors.main[500]}`
                      : `1px solid ${colors.neutral[100]}`,
                    padding: "12px",
                    backgroundColor: isSelected
                      ? "rgba(0,122,255,0.1)"
                      : colors.neutral[100],
                    cursor: "pointer",
                  }}
                >
                  <IconComp
                    width={28}
                    height={28}
                    fill={isSelected ? "#007AFF" : "#000"}
                  />
                  <Text fontSize={14} fontWeight={500}>
                    {option.label}
                  </Text>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <Frame pt={32} pb={40}>
        <button
          onClick={onNext}
          style={{
            backgroundColor: "#101828",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "12px 24px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          다음
        </button>
      </Frame>
    </div>
  );
}
