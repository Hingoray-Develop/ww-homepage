"use client";

import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  borderRadius = "0.25rem",
  className = "",
  style = {},
}) => {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        ...style,
      }}
    />
  );
};

// ProjectCard용 스켈레톤
export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: 32,
      }}
    >
      <Skeleton
        width="100%"
        height="0"
        style={{
          paddingTop: "80%",
        }}
      />
      <div style={{ paddingTop: 16 }}>
        <Skeleton width="70%" height="32px" style={{ marginBottom: "8px" }} />
        <Skeleton width="40%" height="24px" />
      </div>
    </div>
  );
};

// 전역 스타일에 애니메이션 추가
const style = document.createElement("style");
style.textContent = `
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
document.head.appendChild(style);

export default Skeleton;
