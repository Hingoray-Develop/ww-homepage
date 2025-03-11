// 기본 트랜지션 설정
const defaultTransition = {
  duration: "0.4s",
  timing: "cubic-bezier(0.4, 0, 0.2, 1)",
};

// 페이지 전환 애니메이션
const page = {
  transitionProperty: "all",
  transitionTimingFunction: defaultTransition.timing,
  transitionDuration: "0.3s",
};

// 모달 애니메이션
const modal = {
  transitionProperty: "all",
  transitionTimingFunction: defaultTransition.timing,
  transitionDuration: defaultTransition.duration,
};

// 호버 효과
const hover = {
  transitionProperty: "all",
  transitionTimingFunction: defaultTransition.timing,
  transitionDuration: "0.4s",
};

// 스크롤 애니메이션
const scroll = {
  transitionProperty: "all",
  transitionTimingFunction: defaultTransition.timing,
  transitionDuration: "0.6s",
};

// 키프레임 애니메이션
const keyframes = {
  shimmer: `
    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  slideUp: `
    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  pulse: `
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  `,
};

const animations = {
  defaultTransition,
  page,
  modal,
  hover,
  scroll,
  keyframes,
};

export default animations;
