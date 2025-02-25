"use client";

import LockIcon from "@/assets/icons/pricing/solar_lock-keyhole-bold-duotone.svg?react";
import PersonIcon from "@/assets/icons/pricing/solar_user-rounded-bold-duotone.svg?react";
import KeyIcon from "@/assets/icons/pricing/solar_key-minimalistic-bold-duotone.svg?react";
import FeedIcon from "@/assets/icons/pricing/solar_feed-bold-duotone.svg?react";
import HeartIcon from "@/assets/icons/pricing/solar_heart-angle-bold.svg?react";
import MessageIcon from "@/assets/icons/pricing/solar_chat-round-dots-bold-duotone.svg?react";
import ShareIcon from "@/assets/icons/pricing/solar_square-forward-bold-duotone.svg?react";
import NearbyIcon from "@/assets/icons/pricing/solar_people-nearby-bold-duotone.svg?react";
import GalleryIcon from "@/assets/icons/pricing/solar_gallery-minimalistic-bold-duotone.svg?react";
import CameraIcon from "@/assets/icons/pricing/solar_videocamera-record-bold-duotone.svg?react";
import ClipBoardIcon from "@/assets/icons/pricing/solar_clapperboard-play-bold-duotone.svg?react";
import ChatIcon from "@/assets/icons/pricing/solar_chat-round-dots-bold-duotone.svg?react";
import PresentationIcon from "@/assets/icons/pricing/solar_presentation-graph-bold-duotone.svg?react";
import ShopIcon from "@/assets/icons/pricing/solar_shop-bold-duotone.svg?react";
import CartIcon from "@/assets/icons/pricing/solar_cart-large-2-bold-duotone.svg?react";
import InboxIcon from "@/assets/icons/pricing/solar_inbox-archive-bold-duotone.svg?react";
import HandIcon from "@/assets/icons/pricing/solar_hand-heart-bold-duotone.svg?react";
import HandMoneyIcon from "@/assets/icons/pricing/solar_hand-money-bold-duotone.svg?react";
import RoundMoneyIcon from "@/assets/icons/pricing/solar_chat-round-money-bold-duotone.svg?react";
import WalletMoneyIcon from "@/assets/icons/pricing/solar_wallet-money-bold-duotone.svg?react";
import CouponIcon from "@/assets/icons/pricing/solar_banknote-bold-duotone.svg?react";
import StockIcon from "@/assets/icons/pricing/solar_box-bold-duotone.svg?react";
import CalendarIcon from "@/assets/icons/pricing/solar_calendar-bold-duotone.svg?react";
import ClockIcon from "@/assets/icons/pricing/solar_clock-circle-bold-duotone.svg?react";
import CallChatIcon from "@/assets/icons/pricing/solar_call-chat-rounded-bold-duotone.svg?react";
import BellIcon from "@/assets/icons/pricing/solar_bell-bold-duotone.svg?react";
import DocumentIcon from "@/assets/icons/pricing/solar_document-add-bold-duotone.svg?react";
import MedalIcon from "@/assets/icons/pricing/solar_medal-ribbons-star-bold-duotone.svg?react";
import ArrowUpIcon from "@/assets/icons/pricing/solar_map-arrow-up-bold-duotone.svg?react";
import PenIcon from "@/assets/icons/pricing/solar_pen-new-round-bold-duotone.svg?react";
import NoteIcon from "@/assets/icons/pricing/solar_clipboard-text-bold-duotone.svg?react";
import CityIcon from "@/assets/icons/pricing/solar_city-bold-duotone.svg?react";
import LikeIcon from "@/assets/icons/pricing/solar_like-bold-duotone.svg?react";
import SmileIcon from "@/assets/icons/pricing/solar_sticker-smile-circle-2-bold-duotone.svg?react";
import FolderIcon from "@/assets/icons/pricing/solar_move-to-folder-bold-duotone.svg?react";
import CheckReadIcon from "@/assets/icons/pricing/solar_check-read-bold-duotone.svg?react";
import ChatSquareIcon from "@/assets/icons/pricing/solar_chat-square-bold-duotone.svg?react";
import DialogIcon from "@/assets/icons/pricing/solar_dialog-bold-duotone.svg?react";
import HeadPhoneIcon from "@/assets/icons/pricing/solar_headphones-round-sound-bold-duotone.svg?react";
import DevicesIcon from "@/assets/icons/pricing/solar_devices-bold-duotone.svg?react";
import DisplayIcon from "@/assets/icons/pricing/solar_display-bold-duotone.svg?react";
import FaceScanIcon from "@/assets/icons/pricing/solar_face-scan-circle-bold-duotone.svg?react";
import MicrophoneIcon from "@/assets/icons/pricing/solar_microphone-bold-duotone.svg?react";
import FlipIcon from "@/assets/icons/pricing/solar_flip-horizontal-bold-duotone.svg?react";
import CopyRightIcon from "@/assets/icons/pricing/solar_copyright-bold-duotone.svg?react";
import DocumentsIcon from "@/assets/icons/pricing/solar_documents-bold-duotone.svg?react";
import DollarIcon from "@/assets/icons/pricing/solar_dollar-minimalistic-bold-duotone.svg?react";
import DountIcon from "@/assets/icons/pricing/solar_donut-bitten-bold-duotone.svg?react";
import TransferIcon from "@/assets/icons/pricing/solar_round-transfer-horizontal-bold-duotone.svg?react";
import ThrohpyIcon from "@/assets/icons/pricing/solar_cup-first-bold-duotone.svg?react";
import MailBoxIcon from "@/assets/icons/pricing/solar_mailbox-bold-duotone.svg?react";
import DeliveryIcon from "@/assets/icons/pricing/solar_delivery-bold-duotone.svg?react";
import HouseIcon from "@/assets/icons/pricing/solar_shop-2-bold-duotone.svg?react";
import MapPinIcon from "@/assets/icons/pricing/solar_map-point-wave-bold-duotone.svg?react";
import GlobalIcon from "@/assets/icons/pricing/solar_global-bold-duotone.svg?react";
import BillIcon from "@/assets/icons/pricing/solar_bill-list-bold-duotone.svg?react";
import GolfIcon from "@/assets/icons/pricing/solar_golf-bold-duotone.svg?react";
import GiftIcon from "@/assets/icons/pricing/solar_gift-bold-duotone.svg?react";
import FolderFavoritesIcon from "@/assets/icons/pricing/solar_folder-favourite-bookmark-bold-duotone.svg?react";

/**
 * <ai_context>
 * Expanded costCalculatorOptions.ts with the entire doc-based data,
 * preserving icons from the original code, and now structured as
 * Category(H2) -> subCategories(H3) -> items & optionalItems
 * Each item has { label, cost }, cost is hidden from user display but used in calculations.
 * </ai_context>
 */

export interface CostItem {
  label: string;
  cost: number;
}

export interface SubCategory {
  subtitle: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // optional icon
  subCategoryCost: number;
  items: CostItem[];
  optionalItems?: CostItem[];
}

export interface CostCategory {
  title: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // optional icon
  categoryCost: number;
  subCategories: SubCategory[];
}

export const costCalculatorOptions: CostCategory[] = [
  // 1) 사용자 관리 및 인증
  {
    title: "사용자 관리 및 인증",
    icon: LockIcon,
    categoryCost: 500,
    subCategories: [
      {
        subtitle: "회원가입/로그인",
        icon: LockIcon,
        subCategoryCost: 158 + 208 + 54, // 420
        items: [
          { label: "이메일 로그인 (이메일 인증)", cost: 158 },
          { label: "비밀번호 찾기", cost: 208 },
          { label: "회원 탈퇴 - 데이터 삭제", cost: 54 },
        ],
        optionalItems: [
          { label: "소셜 로그인(네이버)", cost: 53 },
          { label: "소셜 로그인(카카오)", cost: 53 },
          { label: "소셜 로그인(구글)", cost: 107 },
          { label: "소셜 로그인(페이스북)", cost: 107 },
          { label: "휴대폰 번호 로그인 + 번호 인증(비실명)", cost: 143 },
          { label: "탈퇴 시 데이터 유지", cost: 136 },
        ],
      },
      {
        subtitle: "프로필/권한 관리",
        icon: PersonIcon,
        subCategoryCost: 500,
        items: [
          { label: "닉네임 (중복체크 없음)", cost: 39 },
          { label: "프로필 정보 수정", cost: 170 },
          { label: "프로필 사진", cost: 64 },
        ],
        optionalItems: [
          { label: "닉네임 중복체크", cost: 91 },
          { label: "관심사", cost: 103 },
          { label: "성별/연령", cost: 52 },
          { label: "주소", cost: 101 },
          { label: "추천인", cost: 103 },
          { label: "프로필 배경 사진", cost: 90 },
          { label: "프로필 신고/차단", cost: 120 },
        ],
      },
      {
        subtitle: "사용자 권한 / 역할 설정",
        icon: KeyIcon,
        subCategoryCost: 749, // 예시(749 ~ 2068 중 일단 749)
        items: [
          { label: "회원 유형 분류(749~2068)", cost: 749 },
          { label: "회원 등급 있음", cost: 749 },
        ],
      },
    ],
  },

  // 2) 커뮤니티 및 소셜 인터랙션
  {
    title: "커뮤니티 및 소셜 인터랙션",
    icon: FeedIcon,
    categoryCost: 354,
    subCategories: [
      {
        subtitle: "게시글 / 댓글, 피드",
        icon: FeedIcon,
        subCategoryCost: 256 + 205 + 79 + 51 + 130, // 721
        items: [
          { label: "게시글 생성,수정 및 삭제", cost: 256 },
          { label: "내가 작성한 게시글 목록", cost: 0 },
          { label: "댓글 남기기", cost: 205 },
          { label: "더보기 버튼", cost: 79 },
          { label: "카테고리 설정", cost: 51 },
          { label: "페이지네이션", cost: 130 },
        ],
        optionalItems: [
          { label: "가격 입력", cost: 51 },
          { label: "항목 선택", cost: 97 },
          { label: "URL 미리보기", cost: 183 },
          { label: "해시태그", cost: 86 },
          { label: "위치 정보", cost: 114 },
          { label: "파일 업로드", cost: 117 },
          { label: "작성 에디터(최소)", cost: 205 },
          { label: "작성 에디터(기능추가)", cost: 463 },
          { label: "관리자 허용 후 등록", cost: 205 },
          { label: "비회원 등록", cost: 0 },
          { label: "무한 스크롤", cost: 106 },
          { label: "숨기기", cost: 75 },
          { label: "익명", cost: 75 },
          { label: "좋아요 목록", cost: 248 },
          { label: "좋아요 남긴 사람", cost: 277 },
          { label: "좋아요 알림", cost: 363 },
          { label: "대댓글", cost: 410 },
          { label: "사진 댓글", cost: 324 },
          { label: "댓글 좋아요", cost: 300 },
          { label: "댓글 신고", cost: 313 },
          { label: "댓글 수정", cost: 324 },
          { label: "댓글 알림", cost: 313 },
          { label: "조회수(회원/기기)", cost: 94 },
          { label: "조회수(새로고침)", cost: 40 },
          { label: "임시 저장", cost: 79 },
          { label: "공유(SNS)", cost: 66 },
          { label: "공유(이메일)", cost: 79 },
          { label: "공유(SMS)", cost: 79 },
          { label: "클립보드 공유", cost: 27 },
          { label: "공개 설정(비밀번호)", cost: 62 },
          { label: "공개 설정(팔로워)", cost: 215 },
          { label: "공개 설정(회원유형·등급별)", cost: 102 },
          { label: "2~3단 카테고리", cost: 102 },
          { label: "카테고리 2~3단(확장)", cost: 167 }, // 임의
          { label: "신고(사유 선택)", cost: 107 },
          { label: "신고(대상 차단)", cost: 215 },
          { label: "필터/정렬(범위)", cost: 79 },
          { label: "필터/정렬(단/복수선택)", cost: 51 },
          { label: "필터/정렬(인기순)", cost: 63 },
        ],
      },
      {
        subtitle: "팔로우 / 좋아요",
        icon: HeartIcon,
        subCategoryCost: 837,
        items: [
          { label: "팔로우 신청 없이", cost: 332 },
          { label: "좋아요 목록", cost: 248 },
          { label: "팔로우 신청&수락", cost: 498 },
          { label: "알림 없음", cost: 369 },
        ],
      },
      {
        subtitle: "개인 / 그룹 채팅",
        icon: MessageIcon,
        subCategoryCost: 1017,
        items: [
          { label: "채팅 API 연결", cost: 0 },
          { label: "신고 대상 차단하기", cost: 0 },
          { label: "1:1 채팅(333) 또는 그룹 채팅(440)", cost: 440 },
        ],
        optionalItems: [
          { label: "채팅 검색", cost: 642 },
          { label: "복사/전달", cost: 581 },
          { label: "메시지 답장", cost: 698 },
          { label: "새 메시지 표시", cost: 629 },
          { label: "대화 상대 내보내기", cost: 642 },
          { label: "목록 검색", cost: 581 },
          { label: "파일/사진/음성 전송", cost: 654 },
        ],
      },
      {
        subtitle: "SNS 공유/홍보기능",
        icon: ShareIcon,
        subCategoryCost: 66,
        items: [{ label: "SNS 공유 기능", cost: 66 }],
      },
      {
        subtitle: "메타버스 내 커뮤니티 요소",
        icon: NearbyIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
    ],
  },

  // 3) 컨텐츠 및 미디어 관리
  {
    title: "컨텐츠 및 미디어 관리",
    icon: FeedIcon,
    categoryCost: 0, // 임의
    subCategories: [
      {
        subtitle: "사진,동영상 업로드/공유",
        icon: GalleryIcon,
        subCategoryCost: 354 + 1514 + 106, // 임의 1974
        items: [
          { label: "사진 콘텐츠", cost: 354 },
          { label: "동영상 콘텐츠(1분기준)", cost: 1514 },
          { label: "다중 업로드", cost: 106 },
        ],
        optionalItems: [
          { label: "사진 편집", cost: 94 },
          { label: "확대", cost: 38 },
          { label: "태그", cost: 122 },
          { label: "영상 길이(1시간)", cost: 711 },
          { label: "음성 재생", cost: 239 },
          { label: "재생 기능(목록 셔플)", cost: 141 },
          { label: "재생 기능(종료 타이머)", cost: 154 },
          { label: "재생 기능(자동 재생)", cost: 141 },
          { label: "텍스트/해시태그", cost: 29 },
        ],
      },
      {
        subtitle: "라이브 스트리밍/관리",
        icon: CameraIcon,
        subCategoryCost: 4001 + 338 + 245,
        items: [
          { label: "스트리밍 화면 공유", cost: 4001 },
          { label: "시청자 수 카운팅", cost: 338 },
          { label: "참여자 내보내기", cost: 245 },
        ],
      },
      {
        subtitle: "VOD 업로드/관리",
        icon: ClipBoardIcon,
        subCategoryCost: 1514,
        items: [
          { label: "동영상 콘텐츠(1분기준) 업로드/삭제", cost: 1514 },
          { label: "조회수 관리", cost: 0 },
        ],
      },
      {
        subtitle: "실시간 채팅 / 댓글",
        icon: ChatIcon,
        subCategoryCost: 1017,
        items: [
          { label: "채팅 API 연결", cost: 0 },
          { label: "신고 대상 차단하기", cost: 0 },
          { label: "1:1 채팅(333) 또는 그룹 채팅(440)", cost: 440 },
        ],
      },
      {
        subtitle: "동영상 재생 통계",
        icon: PresentationIcon,
        subCategoryCost: 0,
        items: [{ label: "(옵션 - 조회수, 시청 시간 등)", cost: 0 }],
      },
    ],
  },

  // 4) 결제 및 거래 시스템
  {
    title: "결제 및 거래 시스템",
    icon: HeartIcon,
    categoryCost: 395,
    subCategories: [
      {
        subtitle: "상품 등록/관리",
        icon: ShopIcon,
        subCategoryCost: 907,
        items: [
          { label: "상품 글+사진 등록/수정/삭제", cost: 907 },
          { label: "주문 리스트 관리", cost: 0 },
          { label: "구매 수량 설정", cost: 0 },
        ],
      },
      {
        subtitle: "장바구니/결제",
        icon: CartIcon,
        subCategoryCost: 146 + 171 + 147 + 170, // 634
        items: [
          { label: "장바구니(회원전용)", cost: 146 },
          { label: "카드 결제(PG)", cost: 171 },
          { label: "계좌이체", cost: 147 },
          { label: "간편결제 카드 등록", cost: 170 },
        ],
        optionalItems: [
          { label: "다중 옵션", cost: 131 },
          { label: "할인·품절", cost: 129 },
          { label: "비회원 장바구니", cost: 146 },
          { label: "품목별 분류 장바구니 담기", cost: 158 },
          { label: "간편결제(토스/네이버/카카오/페이코)", cost: 0 },
          { label: "휴대폰 결제(171)", cost: 171 },
        ],
      },
      {
        subtitle: "인앱 결제",
        icon: InboxIcon,
        subCategoryCost: 331 + 331,
        items: [
          { label: "구글 인앱결제", cost: 331 },
          { label: "애플 인앱결제", cost: 331 },
        ],
      },
      {
        subtitle: "정기 후원 결제",
        icon: HandIcon,
        subCategoryCost: 170,
        items: [{ label: "정기 후원 결제", cost: 170 }],
      },
      {
        subtitle: "크라우드펀딩 결제",
        icon: HandMoneyIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "블록체인 기반 결제",
        icon: RoundMoneyIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "결제 취소,환불 프로세스",
        icon: WalletMoneyIcon,
        subCategoryCost: 354,
        items: [{ label: "환불 및 결제취소 모듈", cost: 354 }],
      },
      {
        subtitle: "할인 쿠폰/프로모션",
        icon: CouponIcon,
        subCategoryCost: 40 + 117 + 293, // 450
        items: [
          { label: "할인 쿠폰/프로모션(-n%, -n원)", cost: 40 },
          { label: "프로모션 코드 등록", cost: 117 },
          { label: "회원 유형/등급별 쿠폰 발행", cost: 293 },
        ],
      },
      {
        subtitle: "재고 및 배송 추적 관리",
        icon: StockIcon,
        subCategoryCost: 305 + 359,
        items: [
          { label: "배송지 관리", cost: 305 },
          { label: "배송 추적", cost: 359 },
        ],
      },
    ],
  },

  // 5) 예약 및 스케쥴 관리
  {
    title: "예약 및 스케쥴 관리",
    icon: PersonIcon,
    categoryCost: 498,
    subCategories: [
      {
        subtitle: "달력 기반 예약",
        icon: CalendarIcon,
        subCategoryCost: 51 + 76 + 39,
        items: [
          { label: "날짜 인풋", cost: 51 },
          { label: "달력", cost: 76 },
          { label: "시간대", cost: 39 },
        ],
      },
      {
        subtitle: "직원 스케쥴링 관리",
        icon: ClockIcon,
        subCategoryCost: 146,
        items: [{ label: "일정 확인", cost: 146 }],
      },
      {
        subtitle: "고객 예약 이력 관리",
        icon: CallChatIcon,
        subCategoryCost: 146,
        items: [{ label: "예약 내역 확인", cost: 146 }],
      },
      {
        subtitle: "자동 알림/리마인더",
        icon: BellIcon,
        subCategoryCost: 134 + 146,
        items: [
          { label: "예약 완료 알림", cost: 134 },
          { label: "리마인더 알림", cost: 146 },
        ],
      },
    ],
  },

  // 6) 교육 및 학습 관리
  {
    title: "교육 및 학습 관리",
    icon: PersonIcon,
    categoryCost: 283,
    subCategories: [
      {
        subtitle: "라이브 강의 및 화상 강의",
        icon: ClipBoardIcon,
        subCategoryCost: 4001 + 213,
        items: [
          { label: "라이브 강의 및 화상 강의(전체 화면 공유)", cost: 4001 },
          { label: "듣기 음량 조절", cost: 213 },
        ],
      },
      {
        subtitle: "시험 / 과제 제출, 퀴즈",
        icon: DocumentIcon,
        subCategoryCost: 418 + 418 + 418 + 249 + 249, // 임의 1752
        items: [
          { label: "시험-객관식", cost: 418 },
          { label: "시험-주관식", cost: 418 },
          { label: "시험-장문형", cost: 418 },
          { label: "문제별 점수·유형(237~249)", cost: 249 },
          { label: "오답노트", cost: 249 },
        ],
      },
      {
        subtitle: "학습 진도 추적",
        icon: ArrowUpIcon,
        subCategoryCost: 0,
        items: [{ label: "(옵션)", cost: 0 }],
      },
      {
        subtitle: "성적/수료증 관리",
        icon: MedalIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 내 별도 견적 없음)", cost: 0 }],
      },
    ],
  },

  // 7) 구인/구직 및 매칭
  {
    title: "구인/구직 및 매칭",
    icon: PersonIcon,
    categoryCost: 1179, // 임의
    subCategories: [
      {
        subtitle: "이력서 및 프로필 등록",
        icon: PenIcon,
        subCategoryCost: 0,
        items: [{ label: "(회원 정보 확장, 별도 구체 견적 미제시)", cost: 0 }],
      },
      {
        subtitle: "채용 공고/프로젝트 의뢰",
        icon: NoteIcon,
        subCategoryCost: 0,
        items: [{ label: "(게시글 확장)", cost: 0 }],
      },
      {
        subtitle: "매칭 추천 및 알림 기능",
        icon: CityIcon,
        subCategoryCost: 83 + 79 + 120 + 139,
        items: [
          { label: "자유(29)/조건(83)", cost: 83 },
          { label: "신청·수락(54~83)", cost: 54 },
          { label: "단일(113)/다중(139)", cost: 139 },
          { label: "취소·수정 알림(79~120)", cost: 79 },
        ],
      },
      {
        subtitle: "포트폴리오 관리",
        icon: NoteIcon,
        subCategoryCost: 0,
        items: [{ label: "(게시글 확장)", cost: 0 }],
      },
      {
        subtitle: "리뷰 시스템",
        icon: LikeIcon,
        subCategoryCost: 378 + 71 + 106 + 166 + 167 + 40,
        items: [
          { label: "평판/리뷰", cost: 378 },
          { label: "별점", cost: 71 },
          { label: "평가 댓글", cost: 106 },
          { label: "수정", cost: 166 },
          { label: "알림", cost: 167 },
          { label: "사진(40~106)", cost: 40 },
        ],
      },
    ],
  },

  // 8) 기업용 관리 및 운영 도구
  {
    title: "기업용 관리 및 운영 도구",
    icon: PersonIcon,
    categoryCost: 0,
    subCategories: [
      {
        subtitle: "CRM (고객 관리)",
        icon: SmileIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "ERP (업무 관리)",
        icon: FolderIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "BI 대시보드/통계",
        icon: CheckReadIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "협업 도구",
        icon: ChatSquareIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
    ],
  },

  {
    title: "AI, 챗봇 및 IOT",
    icon: PersonIcon,
    categoryCost: 0,
    subCategories: [
      {
        subtitle: "FAQ 자동응답 챗봇",
        icon: DialogIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "AI 고객지원",
        icon: HeadPhoneIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "IoT 디바이스 연동",
        icon: DevicesIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "실시간 모니터링 및 알림",
        icon: DisplayIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
    ],
  },

  // 9) 메타버스 및 3D 가상 공간
  {
    title: "메타버스 및 3D 가상 공간",
    icon: PersonIcon,
    categoryCost: 0,
    subCategories: [
      {
        subtitle: "아바타 생성, 커스터마이징",
        icon: SmileIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "실시간 음성, 텍스트 채팅",
        icon: MicrophoneIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 일부 채팅+통화 확장)", cost: 0 }],
      },
      {
        subtitle: "3D 공간 디자인 및 이벤트",
        icon: FlipIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "가상 화폐 및 포인트 연동",
        icon: CopyRightIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능 / 블록체인 연동)", cost: 0 }],
      },
    ],
  },

  // 10) 블록체인 및 암호화폐
  {
    title: "블록체인 및 암호화폐",
    icon: HeartIcon,
    categoryCost: 0,
    subCategories: [
      {
        subtitle: "스마트 컨트랙트",
        icon: DocumentsIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "NFT 발행 및 거래 마켓플레이스",
        icon: DollarIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },

      {
        subtitle: "토큰화 (토큰 발행 및 분배)",
        icon: DountIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "탈중앙화 앱(DApp) 연동",
        icon: TransferIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
    ],
  },

  // 11) 게이미피케이션
  {
    title: "게이미피케이션",
    icon: FeedIcon,
    categoryCost: 0,
    subCategories: [
      {
        subtitle: "리더보드/랭킹 시스템",
        icon: ThrohpyIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "업적/보상 시스템",
        icon: MedalIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "이벤트/업데이트 알림",
        icon: MailBoxIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
    ],
  },

  // 12) 부동산/매물 관리
  {
    title: "부동산/매물 관리",
    icon: PersonIcon,
    categoryCost: 0,
    subCategories: [
      {
        subtitle: "매물 등록/관리",
        icon: DeliveryIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "매물 문의 / 예약",
        icon: HouseIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "지도 기반 검색",
        icon: MapPinIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "가상 투어(VR/3D)",
        icon: GlobalIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "거래 이력/계약 관리",
        icon: BillIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
    ],
  },

  // 13) 크라우드 펀딩
  {
    title: "크라우드 펀딩",
    icon: HeartIcon,
    categoryCost: 0,
    subCategories: [
      {
        subtitle: "프로젝트 등록(목표 금액)",
        icon: GolfIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "리워드(선물) 옵션 관리",
        icon: GiftIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
      {
        subtitle: "프로젝트 진행 현황",
        icon: FolderFavoritesIcon,
        subCategoryCost: 0,
        items: [{ label: "(문서 외 신규 기능)", cost: 0 }],
      },
    ],
  },
];
