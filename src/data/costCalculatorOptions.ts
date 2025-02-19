export interface CostCalculatorOption {
  label: string;
  icon: string;
  duration: number; // Example: duration in days
  cost: number; // Example: cost in KRW
}

export interface CostCalculatorSection {
  title: string;
  options: CostCalculatorOption[];
}

export const costCalculatorOptions: CostCalculatorSection[] = [
  {
    title: "1. 사용자 관리 및 인증",
    options: [
      {
        label: "회원가입 / 로그인",
        icon: "/assets/icons/line/develop.svg",
        duration: 7,
        cost: 1000000,
      },
      {
        label: "프로필 / 권한 관리",
        icon: "/assets/icons/line/develop.svg",
        duration: 5,
        cost: 800000,
      },
    ],
  },
  {
    title: "2. 커뮤니티 및 소셜 인터랙션",
    options: [
      {
        label: "게시글 / 댓글, 피드",
        icon: "/assets/icons/line/develop.svg",
        duration: 10,
        cost: 1500000,
      },
      {
        label: "팔로우 / 좋아요",
        icon: "/assets/icons/line/develop.svg",
        duration: 5,
        cost: 800000,
      },
      {
        label: "개인 / 그룹 채팅",
        icon: "/assets/icons/line/develop.svg",
        duration: 12,
        cost: 2000000,
      },
      {
        label: "SNS 공유",
        icon: "/assets/icons/line/develop.svg",
        duration: 3,
        cost: 500000,
      },
    ],
  },
  {
    title: "3. 컨텐츠 관리 및 미디어 스트리밍",
    options: [
      {
        label: "사진·동영상 업로드 / 공유",
        icon: "/assets/icons/line/develop.svg",
        duration: 10,
        cost: 1800000,
      },
      {
        label: "라이브 스트리밍 / 관리",
        icon: "/assets/icons/line/develop.svg",
        duration: 20,
        cost: 3000000,
      },
      {
        label: "실시간 채팅/댓글",
        icon: "/assets/icons/line/develop.svg",
        duration: 10,
        cost: 1500000,
      },
      {
        label: "CDN 연동, 동영상 재생 통계",
        icon: "/assets/icons/line/develop.svg",
        duration: 15,
        cost: 2500000,
      },
    ],
  },
  {
    title: "4. 결제 및 이커머스",
    options: [
      {
        label: "상품 등록 / 관리",
        icon: "/assets/icons/line/develop.svg",
        duration: 14,
        cost: 2200000,
      },
      {
        label: "장바구니",
        icon: "/assets/icons/line/develop.svg",
        duration: 7,
        cost: 1200000,
      },
      {
        label: "결제 / 취소 / 환불",
        icon: "/assets/icons/line/develop.svg",
        duration: 10,
        cost: 1800000,
      },
      {
        label: "인앱 결제",
        icon: "/assets/icons/line/develop.svg",
        duration: 8,
        cost: 1500000,
      },
      {
        label: "일반 / 정기 후원",
        icon: "/assets/icons/line/develop.svg",
        duration: 10,
        cost: 1700000,
      },
    ],
  },
  {
    title: "5. 예약 및 스케줄 관리",
    options: [
      {
        label: "달력 기반 예약",
        icon: "/assets/icons/line/develop.svg",
        duration: 12,
        cost: 2000000,
      },
      {
        label: "알림 / 리마인더",
        icon: "/assets/icons/line/develop.svg",
        duration: 5,
        cost: 800000,
      },
      {
        label: "직원 스케줄링 관리",
        icon: "/assets/icons/line/develop.svg",
        duration: 10,
        cost: 1500000,
      },
      {
        label: "고객 예약 이력 관리",
        icon: "/assets/icons/line/develop.svg",
        duration: 7,
        cost: 1200000,
      },
    ],
  },
  {
    title: "6. 교육 및 학습 관리",
    options: [
      {
        label: "시험 / 과제 제출, 퀴즈",
        icon: "/assets/icons/line/develop.svg",
        duration: 15,
        cost: 2500000,
      },
      {
        label: "강사 / 학생 권한 관리",
        icon: "/assets/icons/line/develop.svg",
        duration: 8,
        cost: 1400000,
      },
      {
        label: "학습 진도 추적",
        icon: "/assets/icons/line/develop.svg",
        duration: 10,
        cost: 1600000,
      },
      {
        label: "성적 / 수료증 관리",
        icon: "/assets/icons/line/develop.svg",
        duration: 7,
        cost: 1200000,
      },
    ],
  },
  {
    title: "7. 구인 / 구직 및 매칭",
    options: [
      {
        label: "이력서/프로필 등록",
        icon: "/assets/icons/line/develop.svg",
        duration: 10,
        cost: 1800000,
      },
      {
        label: "채용공고/프로젝트 의뢰",
        icon: "/assets/icons/line/develop.svg",
        duration: 12,
        cost: 2000000,
      },
      {
        label: "매칭 추천/알림",
        icon: "/assets/icons/line/develop.svg",
        duration: 15,
        cost: 2400000,
      },
      {
        label: "포트폴리오 관리 및 평판/리뷰 시스템",
        icon: "/assets/icons/line/develop.svg",
        duration: 10,
        cost: 1800000,
      },
    ],
  },
];
