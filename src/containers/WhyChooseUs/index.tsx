"use client";

import Link from "next/link";
import CodeIcon from "@/assets/icons/line/code.svg?react";
import IdentityIcon from "@/assets/icons/line/identity.svg?react";
import ConsultingIcon from "@/assets/icons/line/consulting.svg?react";
import DesignSystemIcon from "@/assets/icons/line/design-system.svg?react";
import PricingIcon from "@/assets/icons/line/pricing.svg?react";
import { Body1, Frame, Heading2, Heading4, Text } from "@/atoms";
import { colors } from "@/styles";
import { useResponsiveType } from "@/hooks";
import { Divider } from "@/components";
import { AnalyticsEventList, logEvent } from "@/utils/analytics";
import { useDarkMode } from "@/contexts/DarkModeContext";

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
  backgroundImage?: string;
}

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
          backgroundImage: "url('/images/image-gradation.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
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

  const CardContent = () => (
    <div
      className={`relative w-full h-full p-[32px] rounded-[24px] ${styles.bg}`}
      style={{
        backgroundImage: styles.backgroundImage,
        backgroundSize: styles.backgroundSize,
        backgroundPosition: styles.backgroundPosition,
      }}
    >
      {variant === "main300" && (
        <div className="absolute top-0 left-0 right-0 h-full rounded-[24px]  from-[#84AAFB] to-[#84AAFB]/10 z-0" />
      )}
      {iconAboveText ? (
        <div
          className={`${
            isDesktop ? "flex" : "hidden"
          } justify-start items-end pt-[24px]`}
        >
          {icon}
        </div>
      ) : (
        <div
          className={`${isDesktop ? "block" : "hidden"} ${iconPositionClass}`}
        >
          {icon}
        </div>
      )}

      <div
        style={{
          position: iconAboveText && isDesktop ? "absolute" : "relative",
          bottom: iconAboveText && isDesktop ? 0 : undefined,
          paddingBottom: iconAboveText && isDesktop ? 32 : 24,
          paddingRight: iconAboveText && isDesktop ? 32 : 0,
        }}
      >
        <Heading4 fontColor={styles.titleColor} fontWeight={700} pb={4}>
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

export default function WhyChooseUs() {
  const { isDarkMode } = useDarkMode();

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
        <Frame w={40} py={24} tablet={{ w: 0 }} mobile={{ w: 0 }} opacity={0.2}>
          <Divider />
        </Frame>
      ),
      variant: "main800",
      isLink: true,
      href: "/cost-calculator",
      iconPosition: "bottom-right",
    },
  ];

  const { responsiveType } = useResponsiveType();
  const isDesktop = responsiveType === "desktop";

  return (
    <section
      id="why-choose-us"
      className={`transition-colors duration-500  pt-[160px]  ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
      style={{
        backgroundColor: isDarkMode ? colors.neutral[950] : colors.white,
        paddingLeft: isDesktop ? "40px" : "16px",
        paddingRight: isDesktop ? "40px" : "16px",
      }}
    >
      <div className="text-center pt-4">
        <Text
          fontColor={isDarkMode ? colors.white : colors.neutral[950]}
          fontWeight={700}
          fontSize={52}
          lineHeight={"72px"}
        >
          흰고래컴퍼니를
        </Text>
        <Text
          fontColor={isDarkMode ? colors.white : colors.neutral[950]}
          fontWeight={700}
          fontSize={52}
          lineHeight={"72px"}
        >
          이용해야하는 이유
        </Text>
      </div>

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
        <div className="w-full h-full ">
          <ReasonCard {...reasons[0]} />
        </div>
        <div className="w-full h-full" style={{ height: "110%" }}>
          <ReasonCard {...reasons[1]} />
        </div>
        <div className="row-span-2 w-full h-full">
          <ReasonCard {...reasons[4]} />
        </div>
        <div className="w-full h-full">
          <ReasonCard {...reasons[2]} />
        </div>
        <div className="w-full" style={{ paddingTop: 35 }}>
          <ReasonCard {...reasons[3]} />
        </div>
      </div>

      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 pt-[60px] pb-10">
        {reasons.map((reason, i) => (
          <div key={i} className="w-full h-full">
            <ReasonCard {...reason} />
          </div>
        ))}
      </div>
    </section>
  );
}
