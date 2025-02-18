import React from 'react';

interface ChatBubbleProps {
  text?: string;
  bgColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export default function ChatBubble({
  text = '',
  bgColor = '#344054',
  textColor = '#FFFFFF',
  width = 419,
  height = 54,
  onClick,
}: ChatBubbleProps) {
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
        onClick={onClick}
        width={finalWidth}
        height={height}
        rx="29"
        fill={bgColor}
      />

      {/* 3) 말풍선의 꼬리 부분 (피그마에서 따온 Path) */}
      <path
        onClick={onClick}
        d="M5.40652 0H26C27.1046 0 28 0.89543 28 2V19.6516C28 21.3603 25.9958 22.2821 24.6984 21.1701L4.10493 3.51851C2.69514 2.31012 3.5497 0 5.40652 0Z"
        fill={bgColor}
      />

      {/* 4) 실제 표시하고 싶은 텍스트 */}
      <text
        onClick={onClick}
        x="50%"
        y="50%"
        fill={textColor}
        fontSize="16"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {text}
      </text>
    </svg>
  );
}
