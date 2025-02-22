"use client";

import Link from "next/link";
import CodeIcon from "@/assets/icons/line/code.svg?react";
import IdentityIcon from "@/assets/icons/line/identity.svg?react";
import ConsultingIcon from "@/assets/icons/line/consulting.svg?react";
import DesignSystemIcon from "@/assets/icons/line/design-system.svg?react";
import PricingIcon from "@/assets/icons/line/pricing.svg?react";
import { Body1, Frame, Heading4, Text } from "@/atoms";
import { colors } from "@/styles";
import { useResponsiveType } from "@/hooks";
import { Divider } from "@/components";
import { AnalyticsEventList, logEvent } from "@/utils/analytics";
import { useDarkMode } from "@/contexts/DarkModeContext";

/**
 * 아이콘 위치를 지정할 수 있도록 iconPosition 필드를 만듭니다.
 */
interface ReasonCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  description2?: React.ReactNode;
  variant: "neutral800" | "white" | "main300" | "main400" | "main800";
  isLink?: boolean;
  href?: string;
  iconPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  iconAboveText?: boolean;
}

/**
 * ReasonCard: 카드 하나의 UI
 * Tailwind로 스타일링, 아이콘은 absolute로 배치
 */
function ReasonCard({
  icon,
  title,
  description,
  description2,
  variant,
  isLink = false,
  href = "",
  iconPosition = "top-left",
  iconAboveText = false,
}: ReasonCardProps) {
  const { responsiveType } = useResponsiveType();
  const { isDarkMode } = useDarkMode();

  const isDesktop = responsiveType === "desktop";

  /** variant에 따른 배경/글자색 정의 */
  const getVariantStyles = () => {
    switch (variant) {
      case "neutral800":
        return {
          bg: "bg-[#1D2939]",
          titleColor: colors.white,
          descriptionColor: colors.white,
        };
      case "white":
        return {
          bg: isDarkMode ? "bg-white" : "bg-[#475467]",
          titleColor: isDarkMode ? colors.neutral[950] : colors.white,
          descriptionColor: isDarkMode ? colors.neutral[950] : colors.white,
        };
      case "main300":
        return {
          bg: "bg-[#84AAFB]",
          titleColor: colors.main[800],
          descriptionColor: colors.main[800],
        };
      case "main400":
        return {
          bg: "bg-[#5288F9]",
          titleColor: colors.white,
          descriptionColor: colors.white,
        };
      case "main800":
        return {
          bg: "bg-[#042B7B]",
          titleColor: colors.white,
          descriptionColor: colors.white,
        };
      default:
        return {
          bg: "bg-[#1A1D2B]",
          titleColor: colors.white,
          descriptionColor: colors.neutral[400],
        };
    }
  };

  const styles = getVariantStyles();

  /** iconPosition에 따른 위치 클래스 */
  const iconPositionClass = (() => {
    switch (iconPosition) {
      case "top-left":
        return "absolute top-6 left-6";
      case "top-right":
        return "absolute top-6 right-6";
      case "bottom-left":
        return "absolute bottom-6 left-6";
      case "bottom-right":
        return "absolute bottom-6 right-6";
      default:
        return "absolute top-6 left-6";
    }
  })();

  /** 카드 실제 내용 */
  const CardContent = () => (
    <div
      className={`relative w-full h-full p-[32px] rounded-[24px] ${styles.bg}`}
    >
      {/* 아이콘 배치: lg 이상에서만 표시 */}
      {iconAboveText ? (
        // 1) 아이콘을 텍스트 위에 (normal flow) - lg 이상에서만 표시
        <div
          className={`${
            isDesktop ? "flex" : "hidden"
          } items-center justify-start`}
        >
          {icon}
        </div>
      ) : (
        // 2) 기존: 아이콘 절대 배치 - lg 이상에서만 표시
        <div
          className={`${isDesktop ? "block" : "hidden"} ${iconPositionClass}`}
        >
          {icon}
        </div>
      )}

      {/* 제목/설명 영역 */}
      <div
        style={{
          position: iconAboveText && isDesktop ? "absolute" : "relative",
          bottom: iconAboveText && isDesktop ? 0 : undefined,
          paddingBottom: iconAboveText && isDesktop ? 32 : 24,
          paddingRight: iconAboveText && isDesktop ? 32 : 0,
        }}
      >
        <Heading4 fontColor={styles.titleColor} fontWeight={700}>
          {title}
        </Heading4>
        <Body1 fontColor={styles.descriptionColor} fontWeight={400}>
          {description}
        </Body1>
        {description2 && description2}
        {isLink && href && (
          <Text
            fontSize={18}
            lineHeight={"28px"}
            fontColor={colors.white}
            underline
          >
            <Link
              href={href}
              onClick={() => {
                logEvent(AnalyticsEventList.BUTTON_CLICK, {
                  button_name: "cost_calculator_why_choose_us",
                });
              }}
            >
              비용 산정하러 가기 {">"}
            </Link>
          </Text>
        )}
      </div>
    </div>
  );

  return CardContent();
}

/**
 * 섹션 전체:
 * - 큰 화면에서는 2×2(왼쪽) + 오른쪽(2행) = 두 번째 스크린샷과 동일
 * - 작은 화면에서는 1~2열로 표시
 */
export default function WhyChooseUs() {
  const { isDarkMode } = useDarkMode();

  /** 카드 5개. iconPosition을 카드마다 다르게 지정 */
  const reasons: ReasonCardProps[] = [
    {
      icon: <CodeIcon width={86} height={86} />,
      title: "개발 기간 단축과 품질관리",
      description:
        "검증된 보일러플레이트를 사용하여 효율적인 프로세스로 개발 속도를 극대화합니다.",
      variant: "neutral800",
      iconPosition: "bottom-right",
    },
    {
      icon: <DesignSystemIcon width={86} height={86} />,
      title: "디자인시스템 구축",
      description:
        "유연하고 확장 가능한 디자인시스템을 구축하여 프로젝트별 통일되고 일관된 사용자 경험을 제공합니다.",
      variant: "white",
      iconPosition: "bottom-right",
    },
    {
      icon: <IdentityIcon width={86} height={86} />,
      title: "브랜드 아이덴티티",
      description:
        "브랜드 가치를 반영한 디자인과 UX 설계를 초기 단계부터 함께 진행합니다.",
      variant: "main300",
      iconPosition: "bottom-left",
    },
    {
      icon: <ConsultingIcon width={86} height={86} />,
      title: "맞춤형 컨설팅 제공",
      description:
        "스타트업의 성장 단계에 맞춘 사업 전략, 제품 개발 우선순위 설정 등의 컨설팅을 제공합니다.",
      variant: "main400",
      iconPosition: "bottom-left",
      iconAboveText: true,
    },
    {
      icon: <PricingIcon width={86} height={86} />,
      title: "투명한 비용 산정",
      description:
        "기능별 개발 비용 산정 방식을 통해 모든 개발 비용을 명확히 공개합니다.",
      description2: (
        <Frame w={40} py={12} tablet={{ w: 0 }} mobile={{ w: 0 }}>
          <Divider />
        </Frame>
      ),
      variant: "main800",
      isLink: true,
      href: "/cost-calculator",
      iconPosition: "bottom-right",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className={`transition-colors duration-500 px-[40px] pt-[160px]  ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
      style={{
        backgroundColor: isDarkMode ? colors.neutral[950] : colors.white,
      }}
    >
      {/* 타이틀 영역 (상단 여백 최소화) */}
      <div className="text-center pt-4">
        <h2
          className={`${
            isDarkMode ? "text-white" : "text-neutral[950]"
          } text-4xl md:text-5xl font-bold leading-tight`}
        >
          흰고래컴퍼니를
        </h2>
        <h2
          className={`${
            isDarkMode ? "text-white" : "text-neutral[950]"
          } text-4xl md:text-5xl font-bold leading-tight`}
        >
          이용해야하는 이유
        </h2>
      </div>

      {/**
       * [큰 화면] 3열 2행 (총 높이 800px)
       * - 왼쪽 2×2 (4개 카드), 오른쪽(row-span-2) 카드 1개
       */}
      <div
        className="hidden lg:grid grid-cols-3 grid-rows-2 gap-6 w-full h-[720px] pt-[60px]"
        style={{
          gap: "24px",
          height: "720px",
          paddingTop: "60px",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
        }}
      >
        {/* 첫 행 왼쪽 첫 칸 (reasons[0]) */}
        <div className="w-full h-full">
          <ReasonCard {...reasons[0]} />
        </div>
        {/* 첫 행 왼쪽 두 번째 칸 (reasons[1]) */}
        <div className="w-full h-full" style={{ height: "110%" }}>
          <ReasonCard {...reasons[1]} />
        </div>
        {/* 오른쪽 큰 카드 (2행 차지) (reasons[4]) */}
        <div className="row-span-2 w-full h-full">
          <ReasonCard {...reasons[4]} />
        </div>
        {/* 둘째 행 왼쪽 첫 칸 (reasons[2]) */}
        <div className="w-full h-full">
          <ReasonCard {...reasons[2]} />
        </div>
        {/* 둘째 행 왼쪽 두 번째 칸 (reasons[3]) */}
        <div className="w-full" style={{ paddingTop: 35 }}>
          <ReasonCard {...reasons[3]} />
        </div>
      </div>

      {/**
       * [작은 화면] (lg 미만)
       * - 1~2열로 모든 카드 표시
       */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 pt-[60px] px-4 pb-10">
        {reasons.map((reason, i) => (
          <div key={i} className="w-full h-full">
            <ReasonCard {...reason} />
          </div>
        ))}
      </div>
    </section>
  );
}
