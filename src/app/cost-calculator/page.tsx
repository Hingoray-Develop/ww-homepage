"use client";

import { useState } from "react";

import {
  costCalculatorOptions,
  CostCalculatorSection,
  CostCalculatorOption,
} from "@/data/costCalculatorOptions";
import { useLoading } from "@/contexts/LoadingContext";
import { useInitialLoading } from "@/hooks/useInitialLoading";
import CodeIcon from "@/assets/icons/line/code.svg?react";
import { Text } from "@/atoms";

interface CostCalculatorProps {
  temp?: string;
}

export default function CostCalculator({}: CostCalculatorProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    CostCalculatorOption[]
  >([]);
  const { setIsLoading } = useLoading();

  // 초기 로딩 상태 관리
  useInitialLoading();

  const toggleOptionSelection = (option: CostCalculatorOption) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const totalDuration = selectedOptions.reduce(
    (sum, option) => sum + option.duration,
    0
  );
  const totalCost = selectedOptions.reduce(
    (sum, option) => sum + option.cost,
    0
  );

  const handleCheckEstimate = async () => {
    try {
      setIsLoading(true); // 전체 페이지 로딩 시작

      // 이메일 전송
      const response = await fetch("/api/send-estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "blood8879@naver.com",
          totalDuration,
          totalCost,
        }),
      });

      if (!response.ok) {
        throw new Error("이메일 전송에 실패했습니다.");
      }

      alert("견적서가 메일로 발송되었어요");
    } catch (error) {
      console.error("견적서 전송 실패:", error);
      alert("견적서 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false); // 전체 페이지 로딩 종료
    }
  };

  return (
    <div className="pt-[48px] px-[40px] bg-white">
      {costCalculatorOptions.map((section: CostCalculatorSection) => (
        <div key={section.title} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <div className="grid grid-cols-6 gap-4">
            {section.options.map((option) => (
              <button
                key={option.label}
                type="button"
                className={`flex flex-col px-[32px] py-[18px] items-center justify-center border rounded-md transition-all ease-in duration-100 ${
                  selectedOptions.includes(option) ? "bg-blue-200" : "bg-white"
                }`}
                onClick={() => toggleOptionSelection(option)}
              >
                <CodeIcon
                  width={28}
                  height={28}
                  fill={
                    selectedOptions.includes(option) ? "#007AFF" : "#000000"
                  }
                  stroke={selectedOptions.includes(option) ? "#007AFF" : "none"}
                />
                <Text fontSize={16} fontWeight={600} lineHeight={"26px"} pt={8}>
                  {option.label}
                </Text>
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white p-4 rounded-md"
        onClick={handleCheckEstimate}
      >
        기간 및 견적 확인
      </button>
    </div>
  );
}
