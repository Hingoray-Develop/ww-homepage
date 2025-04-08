"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Body1, Body2, Body3, Frame, Heading2, Text } from "@/atoms";
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
 *   e.g. "4개 선택됨 (약 2,300원, 4~8일)"
 * - Tooltips are now rendered with React Portal to ensure they appear above all other elements.
 * </ai_context>
 */

interface StepThreeProps {
  onNext: () => void;
  scopes: string[];
  selectedOptions: any[];
  setSelectedOptions: (val: any[]) => void;
}

// 아이템 타입 정의
interface Item {
  label: string;
}

// 서브카테고리 타입 정의
interface SubCategory {
  subtitle: string;
  subCategoryCost: number;
  durationMin?: number;
  durationMax?: number;
  icon?: React.ComponentType<any>;
  items: Item[];
  optionalItems?: Item[];
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
  const [tooltipCoords, setTooltipCoords] = useState({ x: 0, y: 0 });
  const [isBrowser, setIsBrowser] = useState(false);

  // 브라우저 환경인지 확인 (Portal 사용을 위함)
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // 호버 중인 버튼 상태 추적
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Detect if only BI/CI 디자인 was selected at StepOne
  const isOnlyBiCi =
    scopes.length === 1 && scopes[0] === "BI/CI 디자인(로고, 브랜딩 등)";

  const handleSubCategoryMouseEnter = (subCategoryKey: string) => {
    if (isOnlyBiCi) return; // BI/CI만 선택된 경우 호버 이벤트 무시

    // 호버 중인 버튼 설정
    setHoveredButton(subCategoryKey);

    const buttonElement = buttonRefs.current[subCategoryKey];
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // 툴팁 위치 계산
      if (rect.top > windowHeight * 0.8 || windowHeight - rect.bottom < 250) {
        setTooltipPosition("top");
        setTooltipCoords({
          x: rect.left,
          y: rect.top - 10,
        });
      } else {
        setTooltipPosition("bottom");
        setTooltipCoords({
          x: rect.left,
          y: rect.bottom + 10,
        });
      }

      hoverTimerRef.current = setTimeout(() => {
        setHoveredSubCategory(subCategoryKey);
      }, 500);
    }
  };

  const handleSubCategoryMouseLeave = () => {
    if (isOnlyBiCi) return; // BI/CI만 선택된 경우 리브 이벤트 무시

    // 호버 상태 초기화
    setHoveredButton(null);

    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setTimeout(() => {
      if (!isTooltipHoveredRef.current) {
        setHoveredSubCategory(null);
      }
    }, 100);
  };

  const handleTooltipMouseEnter = (subCategoryKey: string) => {
    if (isOnlyBiCi) return; // BI/CI만 선택된 경우 이벤트 무시

    isTooltipHoveredRef.current = true;
    setHoveredSubCategory(subCategoryKey);
  };

  const handleTooltipMouseLeave = () => {
    if (isOnlyBiCi) return; // BI/CI만 선택된 경우 이벤트 무시

    isTooltipHoveredRef.current = false;
    setHoveredSubCategory(null);
  };

  const toggleSubCategorySelection = (subCategoryKey: string) => {
    if (isOnlyBiCi) return; // BI/CI만 선택된 경우 선택 이벤트 무시

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
  const { totalSelectedCost, totalMinDuration, totalMaxDuration } =
    useMemo(() => {
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

  // 가격의 +/- 10% 계산
  const minCost = Math.round(totalSelectedCost * 0.9);
  const maxCost = Math.round(totalSelectedCost * 1.1);

  // 다음 단계로 넘어갈 때 선택된 옵션과 계산된 가격, 기간 정보를 전달
  const handleNext = () => {
    // 선택된 subCategory들을 기반으로 옵션 객체 생성
    let options;

    if (isOnlyBiCi || selectedSubCategories.length === 0) {
      // BI/CI 디자인만 선택되었거나 선택된 기능이 없는 경우 기본값 설정
      const baseAmount = 0; // 2,766만원
      options = {
        label: isOnlyBiCi ? "BI/CI 디자인(로고, 브랜딩 등)" : "선택된 기능",
        durationMin: 13,
        durationMax: 26,
        minCost: Math.round(baseAmount * 0.9),
        maxCost: Math.round(baseAmount * 1.1),
      };
    } else {
      // 선택된 기능이 있는 경우
      options = {
        label: selectedSubCategories.join(", "),
        durationMin: totalMinDuration || 13,
        durationMax: totalMaxDuration || 26,
        minCost: minCost || Math.round(0 * 0.9),
        maxCost: maxCost || Math.round(0 * 1.1),
      };
    }

    // 선택된 옵션 설정
    setSelectedOptions([options]);

    // 다음 단계로 이동
    onNext();
  };

  // 호버 중인 버튼의 배경색과 아이콘 색상 결정하는 함수
  const getButtonStyles = (subCategoryKey: string, isSelected: boolean) => {
    const isHovered = hoveredButton === subCategoryKey;

    // 기본, 선택됨, 호버 상태에 따른 스타일 설정
    let backgroundColor = "#F5F6F7"; // 기본 배경색
    let iconColor = "#000"; // 기본 아이콘 색상
    let boxShadow = undefined;

    if (isSelected) {
      backgroundColor = colors.main[100];
      iconColor = colors.main[400];
      boxShadow = `0 0 0 2px ${colors.main[400]} inset`;
    }

    if (isHovered) {
      if (isSelected) {
        backgroundColor = colors.main[100]; // 선택된 상태에서의 호버 색상
      } else {
        backgroundColor = colors.main[100]; // 선택되지 않은 상태에서의 호버 색상
      }
    }

    return {
      backgroundColor,
      iconColor,
      boxShadow,
    };
  };

  // 툴팁에 표시할 서브카테고리 찾기
  const findSubCategory = (key: string): SubCategory | null => {
    let foundSubCategory: SubCategory | null = null;

    costCalculatorOptions.some((category) => {
      return category.subCategories.some((subcat) => {
        const subcatKey = category.title + " > " + subcat.subtitle;
        if (subcatKey === key) {
          foundSubCategory = subcat;
          return true;
        }
        return false;
      });
    });

    return foundSubCategory;
  };

  // 툴팁 렌더링 함수
  const renderTooltip = () => {
    if (!isBrowser || !hoveredSubCategory) return null;

    // 현재 호버된 카테고리 찾기
    const currentSubCategory = findSubCategory(hoveredSubCategory);

    if (!currentSubCategory) return null;

    // Portal을 사용하여 body에 직접 렌더링
    return createPortal(
      <div
        data-tooltip={hoveredSubCategory}
        style={{
          position: "fixed",
          left: tooltipCoords.x,
          top: tooltipCoords.y,
          backgroundColor: "#101828",
          opacity: 0.9,
          color: "#fff",
          padding: "12px 16px",
          borderRadius: 6,
          fontSize: 13,
          width: "280px",
          zIndex: 9999,
          maxHeight: "250px",
          overflowY: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onMouseEnter={() => handleTooltipMouseEnter(hoveredSubCategory)}
        onMouseLeave={handleTooltipMouseLeave}
      >
        <Text
          fontWeight={600}
          pb={6}
          fontSize={14}
          fontColor={colors.main[300]}
        >
          필수 기능
        </Text>
        <ul style={{ paddingLeft: 16 }}>
          {currentSubCategory.items.map((item) => (
            <li key={item.label} style={{ marginBottom: 4 }}>
              {item.label}
            </li>
          ))}
        </ul>

        {currentSubCategory.optionalItems &&
          currentSubCategory.optionalItems.length > 0 && (
            <>
              <Text fontSize={14} fontWeight={600} pb={8} fontColor="#FFB358">
                선택 옵션
              </Text>
              <ul style={{ paddingLeft: 16 }}>
                {currentSubCategory.optionalItems.map((item) => (
                  <li key={item.label} style={{ marginBottom: 4 }}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </>
          )}
      </div>,
      document.body
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <Heading2 fontColor={colors.neutral[950]} pb={8}>
        구현이 필요한 기능을 골라주세요.
      </Heading2>
      <Body1 fontColor={colors.neutral[500]} pb={32}>
        필요한 기능들을 고를수록 정확한 견적을 보내드려요.
      </Body1>

      <div style={{ position: "relative" }}>
        <div
          className="hide-scrollbar"
          style={{
            maxHeight: 450,
            overflowY: "scroll",
            opacity: isOnlyBiCi ? 0.2 : 1,
            pointerEvents: isOnlyBiCi ? "none" : "auto",
          }}
        >
          {costCalculatorOptions.map((category: CostCategory) => (
            <div key={category.title} style={{ marginBottom: 16 }}>
              <Text
                fontColor={colors.neutral[700]}
                fontSize={14}
                fontWeight={600}
                lineHeight={"22px"}
                pb={12}
              >
                {category.title}
              </Text>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  rowGap: 8,
                  columnGap: 12,
                }}
              >
                {category.subCategories.map((subcat) => {
                  const subCategoryKey =
                    category.title + " > " + subcat.subtitle;
                  const isSelected =
                    selectedSubCategories.includes(subCategoryKey);
                  const IconComp = subcat.icon;

                  // 버튼 스타일 결정
                  const buttonStyle = getButtonStyles(
                    subCategoryKey,
                    isSelected
                  );

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
                        onClick={() =>
                          toggleSubCategorySelection(subCategoryKey)
                        }
                        style={{
                          width: "100%",
                          padding: "14px",
                          borderRadius: 8,
                          backgroundColor: buttonStyle.backgroundColor,
                          boxShadow: buttonStyle.boxShadow,
                          textAlign: "left",
                          cursor: isOnlyBiCi ? "default" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          transition: "all 0.2s ease",
                        }}
                      >
                        {IconComp && (
                          <IconComp
                            width={28}
                            height={28}
                            fill={buttonStyle.iconColor}
                          />
                        )}
                        <Text
                          fontSize={16}
                          fontWeight={600}
                          fontColor={colors.neutral[900]}
                          lineHeight={"26px"}
                        >
                          {subcat.subtitle}
                        </Text>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {isOnlyBiCi && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#0C111D",
              opacity: 0.85,
              color: colors.white,
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              zIndex: 100,
            }}
          >
            <Body2 fontColor={colors.white}>
              BI/CI 디자인만 선택했을 경우,
            </Body2>
            <Body2 fontColor={colors.white}>선택할 필요가 없어요.</Body2>
          </div>
        )}
      </div>

      {/* 툴팁 렌더링 */}
      {renderTooltip()}

      <Frame
        w="100%"
        alignment="center"
        gap="auto"
        pt={32}
        pb={40}
        row
        zIndex={10}
      >
        <Frame>
          <button
            onClick={handleNext}
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
        {!isOnlyBiCi && (
          <Frame bg={colors.main[400]} radius={4}>
            <Body3 px={8} py={5} fontColor={colors.white}>
              {totalSelectedCount > 0
                ? `${totalSelectedCount}개 선택됨`
                : "0개 선택됨"}
            </Body3>
          </Frame>
        )}
      </Frame>
    </div>
  );
}
