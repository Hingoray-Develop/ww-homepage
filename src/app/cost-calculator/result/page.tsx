"use client";

import { useSearchParams } from "next/navigation";

export default function ResultPage({}: object) {
  const searchParams = useSearchParams();
  const totalDuration = Number(searchParams.get("totalDuration") || 0);
  const totalCost = Number(searchParams.get("totalCost") || 0);

  return (
    <div>
      <h1>견적 결과</h1>
      <p>총 예상 기간: {totalDuration}일</p>
      <p>총 예상 견적: {totalCost}원</p>
    </div>
  );
}
