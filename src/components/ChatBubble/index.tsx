import React from "react";

export default function ChatBubble({
  text = "",
  bgColor = "#344054", // 말풍선 배경색 (rect, path)
  textColor = "#FFFFFF", // 말풍선 안 글자색
  width = 419,
  height = 54,
}) {
  const finalWidth = Math.max(width, 28);

  return (
    <svg
      width={finalWidth}
      height={height}
      viewBox={`0 0 ${finalWidth} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1) 말풍선의 둥근 직사각형 */}
      <rect
        width={finalWidth}
        height={height}
        rx="29"
        fill={bgColor} // 배경색을 props로
      />

      {/* 3) 말풍선의 꼬리 부분 (피그마에서 따온 Path) */}
      <path
        d="M5.40652 0H26C27.1046 0 28 0.89543 28 2V19.6516C28 21.3603 25.9958 22.2821 24.6984 21.1701L4.10493 3.51851C2.69514 2.31012 3.5497 0 5.40652 0Z"
        fill={bgColor}
      />

      {/* 4) 실제 표시하고 싶은 텍스트 */}
      <text
        x="50%" // SVG 너비 기준 50% (정중앙)
        y="50%" // SVG 높이 기준 50% (정중앙)
        fill={textColor}
        fontSize="16" // 원하는 폰트 크기로 조정
        textAnchor="middle" // 가로 가운데 정렬
        dominantBaseline="middle" // 세로 가운데 정렬
      >
        {text}
      </text>
    </svg>
  );
}
