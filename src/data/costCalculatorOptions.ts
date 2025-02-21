"use client";

import BellIcon from "@/assets/icons/pricing/bell.svg?react";
import FeedIcon from "@/assets/icons/pricing/feed.svg?react";
import HeartIcon from "@/assets/icons/pricing/heart.svg?react";
import LockIcon from "@/assets/icons/pricing/lock.svg?react";
import MessageIcon from "@/assets/icons/pricing/message.svg?react";
import PersonIcon from "@/assets/icons/pricing/person.svg?react";
/**
 * <ai_context>
 * Updated: each option now uses minCost and maxCost, plus an imported SVG icon (React component).
 * We replaced cost with minCost and maxCost to allow a cost range.
 * </ai_context>
 */

export interface CostCalculatorOption {
  label: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  minCost: number;
  maxCost: number;
  duration: number; // Example: duration in days
}

export interface CostCalculatorSection {
  title: string;
  options: CostCalculatorOption[];
}

export const costCalculatorOptions: CostCalculatorSection[] = [
  {
    title: "사용자 관리 및 인증",
    options: [
      {
        label: "회원가입 / 로그인",
        icon: LockIcon,
        duration: 7,
        minCost: 800000,
        maxCost: 1200000,
      },
      {
        label: "프로필 / 권한 관리",
        icon: PersonIcon,
        duration: 5,
        minCost: 600000,
        maxCost: 1000000,
      },
    ],
  },
  {
    title: "커뮤니티 및 소셜 인터랙션",
    options: [
      {
        label: "게시글 / 댓글, 피드",
        icon: FeedIcon,
        duration: 10,
        minCost: 1000000,
        maxCost: 1800000,
      },
      {
        label: "팔로우 / 좋아요",
        icon: HeartIcon,
        duration: 5,
        minCost: 500000,
        maxCost: 900000,
      },
      {
        label: "개인 / 그룹 채팅",
        icon: MessageIcon,
        duration: 12,
        minCost: 1300000,
        maxCost: 2200000,
      },
      {
        label: "SNS 공유",
        icon: BellIcon,
        duration: 3,
        minCost: 300000,
        maxCost: 700000,
      },
    ],
  },
  {
    title: "컨텐츠 관리 및 미디어 스트리밍",
    options: [
      {
        label: "사진·동영상 업로드 / 공유",
        icon: FeedIcon,
        duration: 10,
        minCost: 1400000,
        maxCost: 2000000,
      },
      {
        label: "라이브 스트리밍 / 관리",
        icon: HeartIcon,
        duration: 20,
        minCost: 2200000,
        maxCost: 3600000,
      },
      {
        label: "실시간 채팅/댓글",
        icon: MessageIcon,
        duration: 10,
        minCost: 1000000,
        maxCost: 1500000,
      },
      {
        label: "CDN 연동, 동영상 재생 통계",
        icon: MessageIcon,
        duration: 15,
        minCost: 1800000,
        maxCost: 2800000,
      },
    ],
  },
  {
    title: "결제 및 이커머스",
    options: [
      {
        label: "상품 등록 / 관리",
        icon: FeedIcon,
        duration: 14,
        minCost: 1800000,
        maxCost: 2600000,
      },
      {
        label: "장바구니",
        icon: HeartIcon,
        duration: 7,
        minCost: 1000000,
        maxCost: 1600000,
      },
      {
        label: "결제 / 취소 / 환불",
        icon: MessageIcon,
        duration: 10,
        minCost: 1200000,
        maxCost: 2000000,
      },
      {
        label: "인앱 결제",
        icon: MessageIcon,
        duration: 8,
        minCost: 900000,
        maxCost: 1600000,
      },
      {
        label: "일반 / 정기 후원",
        icon: MessageIcon,
        duration: 10,
        minCost: 1100000,
        maxCost: 1800000,
      },
    ],
  },
  {
    title: "예약 및 스케줄 관리",
    options: [
      {
        label: "달력 기반 예약",
        icon: FeedIcon,
        duration: 12,
        minCost: 1000000,
        maxCost: 1800000,
      },
      {
        label: "알림 / 리마인더",
        icon: BellIcon,
        duration: 5,
        minCost: 500000,
        maxCost: 900000,
      },
      {
        label: "직원 스케줄링 관리",
        icon: MessageIcon,
        duration: 10,
        minCost: 1000000,
        maxCost: 1500000,
      },
      {
        label: "고객 예약 이력 관리",
        icon: MessageIcon,
        duration: 7,
        minCost: 800000,
        maxCost: 1300000,
      },
    ],
  },
  {
    title: "교육 및 학습 관리",
    options: [
      {
        label: "시험 / 과제 제출, 퀴즈",
        icon: MessageIcon,
        duration: 15,
        minCost: 1500000,
        maxCost: 2500000,
      },
      {
        label: "강사 / 학생 권한 관리",
        icon: MessageIcon,
        duration: 8,
        minCost: 600000,
        maxCost: 1400000,
      },
      {
        label: "학습 진도 추적",
        icon: MessageIcon,
        duration: 10,
        minCost: 900000,
        maxCost: 1600000,
      },
      {
        label: "성적 / 수료증 관리",
        icon: MessageIcon,
        duration: 7,
        minCost: 600000,
        maxCost: 1200000,
      },
    ],
  },
  {
    title: "구인 / 구직 및 매칭",
    options: [
      {
        label: "이력서/프로필 등록",
        icon: MessageIcon,
        duration: 10,
        minCost: 1300000,
        maxCost: 1800000,
      },
      {
        label: "채용공고/프로젝트 의뢰",
        icon: MessageIcon,
        duration: 12,
        minCost: 1500000,
        maxCost: 2400000,
      },
      {
        label: "매칭 추천/알림",
        icon: MessageIcon,
        duration: 15,
        minCost: 1400000,
        maxCost: 2400000,
      },
      {
        label: "포트폴리오 관리 및 평판/리뷰 시스템",
        icon: MessageIcon,
        duration: 10,
        minCost: 1100000,
        maxCost: 1800000,
      },
    ],
  },
];
