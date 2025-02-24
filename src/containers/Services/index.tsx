"use client";

import { Frame, Heading2 } from "@/atoms";

import { colors } from "@/styles";
import PlanningIcon from "@/assets/icons/line/planning.svg?react";
import DesignIcon from "@/assets/icons/line/design.svg?react";
import DevelopIcon from "@/assets/icons/line/develop.svg?react";
import MaintenanceIcon from "@/assets/icons/line/maintenance.svg?react";
import useResponsiveType from "@/hooks/useResponsiveType";
import { useEffect } from "react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { ServiceCard } from "@/components";

const Services = () => {
  const { responsiveType } = useResponsiveType();
  const isMobile = responsiveType === "mobile";
  const isTablet = responsiveType === "tablet";
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  useEffect(() => {
    function onScroll() {
      const servicesSection = document.getElementById("services");
      const whyChooseUsSection = document.getElementById("why-choose-us");
      if (!servicesSection || !whyChooseUsSection) return;

      const servicesRect = servicesSection.getBoundingClientRect();
      const whyChooseUsRect = whyChooseUsSection.getBoundingClientRect();
      const threshold = window.innerHeight * 0.5;

      if (servicesRect.top <= threshold && whyChooseUsRect.top > threshold) {
        setIsDarkMode(false);
      } else if (whyChooseUsRect.top <= threshold) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(true);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [setIsDarkMode]);

  const paddingX = isMobile ? 16 : isTablet ? 30 : 40;
  const paddingY = isMobile ? 80 : isTablet ? 120 : 160;

  const services = [
    {
      icon: <PlanningIcon width={64} height={64} fill={colors.neutral[300]} />,
      title: "기획",
      descriptions: [
        "고객 및 시장조사",
        "기능 요구사항 정리",
        "정보 구조 설계 (IA)",
        "프로젝트 계획 수립",
      ],
    },
    {
      icon: <DesignIcon width={64} height={64} fill={colors.neutral[300]} />,
      title: "UX/UI 디자인",
      descriptions: [
        "인터랙션 디자인",
        "디자인시스템 구축",
        "UI 디자인",
        "프로토타입 제작",
      ],
    },
    {
      icon: <DevelopIcon width={64} height={64} fill={colors.neutral[300]} />,
      title: "웹 & APP 개발",
      descriptions: [
        "개발 구조 설계",
        "맞춤형 웹, APP 개발",
        "서버, API 개발",
        "성능 최적화",
      ],
    },
    {
      icon: (
        <MaintenanceIcon width={64} height={64} fill={colors.neutral[300]} />
      ),
      title: "유지보수",
      descriptions: [
        "버그 수정",
        "서버 및 호스팅 관리",
        "정기 점검 및 최적화",
        "기능 업데이트*",
      ],
    },
  ];

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gap: "24px",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
      ? "repeat(2, 1fr)"
      : "repeat(4, 1fr)",
    width: "100%",
  };

  return (
    <div
      id="services"
      className={`transition-colors duration-500 ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
      style={{
        backgroundColor: isDarkMode ? colors.neutral[950] : colors.white,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        overflow: "hidden",
      }}
    >
      <Frame w={"100%"} alignment="center" pb={80}>
        <Heading2
          fontColor={isDarkMode ? colors.white : colors.neutral[950]}
          fontWeight={700}
        >
          서비스 제공 범위
        </Heading2>
      </Frame>
      <Frame col w="100%" gap={24}>
        <div style={gridStyle}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              descriptions={service.descriptions}
              minH={isMobile ? 220 : 300}
            />
          ))}
        </div>
      </Frame>
    </div>
  );
};

export default Services;