"use client";

import React, { useState, useRef, useMemo } from "react";
import { Body1, Body3, Frame, Heading2, Text } from "@/atoms";
import {
  costCalculatorOptions,
  CostCategory,
} from "@/data/costCalculatorOptions";
import { colors } from "@/styles";

/**
 * <ai_context>
 * StepThree now handles hierarchical data:
 * - For each category(H2) => subCategories(H3)
 * - On hover of a subCategory, after 1s, show bullet points (items + optionalItems).
 * - subCategory.icon is now displayed inside the button.
 * - Clicking each subCategory toggles selection, changing background/border color to #5288F9.
 * - Displays total selected subCategories count in the bottom right.
 * - Also shows total cost of all selected subCategories next to the selected count.
 * Updated: we wrap the list area in a scrollable container with hidden scrollbar.
 * Also if "BI/CI 디자인(로고, 브랜딩 등)" alone is selected in StepOne, skip feature selection.
 * 
 * Updated again:
 * - Sum up durationMin, durationMax from all selected subCategories,
 *   and display them alongside the total cost in the bottom summary.
 *   e.g. "4개 선택됨 (약 2,300원, 4~8개월)"
 * </ai_context>
 */

interface StepThreeProps {
  onNext: () => void;
  scopes: string[];
  selectedOptions: any[];
  setSelectedOptions: (val: any[]) => void;
}

export default function StepThree({
  onNext,
  scopes,
  selectedOptions,
  setSelectedOptions,
}: StepThreeProps) {
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(
    null
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isTooltipHoveredRef = useRef<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const buttonRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Detect if only BI/CI 디자인 was selected at StepOne
  const isOnlyBiCi =
    scopes.length === 1 && scopes[0] === "BI/CI 디자인(로고, 브랜딩 등)";

  const handleSubCategoryMouseEnter = (subCategoryKey: string) => {
    const buttonElement = buttonRefs.current[subCategoryKey];
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (rect.top > windowHeight * 0.8 || windowHeight - rect.bottom < 250) {
        setTooltipPosition("top");

        setTimeout(() => {
          const tooltipElement = document.querySelector(
            `[data-tooltip="${subCategoryKey}"]`
          ) as HTMLElement;
          if (tooltipElement) {
            const tooltipRect = tooltipElement.getBoundingClientRect();
            if (tooltipRect.top < 0) {
              window.scrollTo({
                top: scrollTop + tooltipRect.top - 10,
                behavior: "smooth",
              });
            }
          }
        }, 550);
      } else {
        setTooltipPosition("bottom");
      }
    }

    hoverTimerRef.current = setTimeout(() => {
      setHoveredSubCategory(subCategoryKey);
    }, 500);
  };

  const handleSubCategoryMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setTimeout(() => {
      if (!isTooltipHoveredRef.current) {
        setHoveredSubCategory(null);
      }
    }, 100);
  };

  const handleTooltipMouseEnter = (subCategoryKey: string) => {
    isTooltipHoveredRef.current = true;
    setHoveredSubCategory(subCategoryKey);
  };

  const handleTooltipMouseLeave = () => {
    isTooltipHoveredRef.current = false;
    setHoveredSubCategory(null);
  };

  const toggleSubCategorySelection = (subCategoryKey: string) => {
    setSelectedSubCategories((prev) => {
      if (prev.includes(subCategoryKey)) {
        return prev.filter((item) => item !== subCategoryKey);
      } else {
        return [...prev, subCategoryKey];
      }
    });
  };

  const totalSelectedCount = selectedSubCategories.length;

  // 선택된 subCategory들의 비용 합산
  const { totalSelectedCost, totalMinDuration, totalMaxDuration } = useMemo(() => {
    let costSum = 0;
    let minDurationSum = 0;
    let maxDurationSum = 0;

    costCalculatorOptions.forEach((category: CostCategory) => {
      category.subCategories.forEach((subcat) => {
        const subcatKey = category.title + " > " + subcat.subtitle;
        if (selectedSubCategories.includes(subcatKey)) {
          costSum += subcat.subCategoryCost;
          if (subcat.durationMin) {
            minDurationSum += subcat.durationMin;
          }
          if (subcat.durationMax) {
            maxDurationSum += subcat.durationMax;
          }
        }
      });
    });

    return {
      totalSelectedCost: costSum,
      totalMinDuration: minDurationSum,
      totalMaxDuration: maxDurationSum,
    };
  }, [selectedSubCategories]);

  const formattedCost = new Intl.NumberFormat("ko-KR").format(
    totalSelectedCost
  );

  if (isOnlyBiCi) {
    return (
      <div>
        <Heading2 pb={8}>구현이 필요한 기능을 골라주세요.</Heading2>
        <Body1 fontColor={colors.neutral[500]} pb={32}>
          BI/CI 디자인만 선택했을 경우, 기능을 선택하실 필요가 없어요
        </Body1>
        <Frame pb={40}>
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

  return (
    <div>
      <Heading2 pb={8}>구현이 필요한 기능을 골라주세요.</Heading2>
      <Body1 fontColor={colors.neutral[500]} pb={16}>
        필요한 기능들을 고를수록 정확한 견적을 보내드려요.
      </Body1>

      <div
        className="hide-scrollbar"
        style={{
          maxHeight: 550,
          overflowY: "scroll",
        }}
      >
        {costCalculatorOptions.map((category: CostCategory) => (
          <div key={category.title} style={{ marginBottom: 32 }}>
            <Text fontSize={18} fontWeight={700} pb={12}>
              {category.title}
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
              }}
            >
              {category.subCategories.map((subcat) => {
                const subCategoryKey = category.title + " > " + subcat.subtitle;
                const isHovered = hoveredSubCategory === subCategoryKey;
                const isSelected =
                  selectedSubCategories.includes(subCategoryKey);
                const IconComp = subcat.icon;

                return (
                  <div
                    key={subcat.subtitle}
                    style={{ position: "relative" }}
                    onMouseEnter={() =>
                      handleSubCategoryMouseEnter(subCategoryKey)
                    }
                    onMouseLeave={handleSubCategoryMouseLeave}
                    ref={(el) => {
                      buttonRefs.current[subCategoryKey] = el;
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSubCategorySelection(subCategoryKey)}
                      style={{
                        width: "100%",
                        padding: "16px",
                        borderRadius: 8,
                        backgroundColor: isSelected
                          ? colors.main[100]
                          : "#F5F6F7",
                        boxShadow: isSelected
                          ? `0 0 0 2px ${colors.main[400]} inset`
                          : undefined,
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {IconComp && (
                        <IconComp
                          width={20}
                          height={20}
                          fill={isSelected ? "#FFFFFF" : "#666"}
                        />
                      )}
                      <Text
                        fontSize={14}
                        fontWeight={600}
                        fontColor={colors.neutral[900]}
                      >
                        {subcat.subtitle}
                      </Text>
                    </button>

                    {isHovered && (
                      <div
                        data-tooltip={subCategoryKey}
                        style={{
                          position: "absolute",
                          ...(tooltipPosition === "bottom"
                            ? { top: "calc(100% + 4px)" }
                            : { bottom: "calc(100% + 4px)" }),
                          left: 0,
                          backgroundColor: "#333",
                          color: "#fff",
                          padding: "12px",
                          borderRadius: 6,
                          fontSize: 13,
                          width: "280px",
                          zIndex: 100,
                          maxHeight: "250px",
                          overflowY: "auto",
                        }}
                        onMouseEnter={() =>
                          handleTooltipMouseEnter(subCategoryKey)
                        }
                        onMouseLeave={handleTooltipMouseLeave}
                      >
                        <Text fontWeight={600} pb={8} fontColor="#FFD700">
                          필수 기능
                        </Text>
                        <ul style={{ paddingLeft: 16, marginBottom: 12 }}>
                          {subcat.items.map((it) => (
                            <li key={it.label} style={{ marginBottom: 4 }}>
                              {it.label}
                            </li>
                          ))}
                        </ul>

                        {subcat.optionalItems &&
                          subcat.optionalItems.length > 0 && (
                            <>
                              <Text
                                fontWeight={600}
                                pb={8}
                                fontColor="#ADD8E6"
                              >
                                선택 옵션
                              </Text>
                              <ul style={{ paddingLeft: 16 }}>
                                {subcat.optionalItems.map((oit) => (
                                  <li
                                    key={oit.label}
                                    style={{ marginBottom: 4 }}
                                  >
                                    {oit.label}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Frame w="100%" alignment="center" gap="auto" pt={20} pb={40} row>
        <Frame>
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
        {totalSelectedCount > 0 && (
          <Frame bg={colors.main[400]} radius={4} row alignment="center">
            <Body3 px={8} py={5} fontWeight={500} fontColor={colors.white}>
              {totalSelectedCount}개 선택됨 (약 {formattedCost}원
              {totalMinDuration > 0 || totalMaxDuration > 0
                ? `, ${totalMinDuration}~${totalMaxDuration}개월`
                : ""}
              )
            </Body3>
          </Frame>
        )}
      </Frame>
    </div>
  );
}