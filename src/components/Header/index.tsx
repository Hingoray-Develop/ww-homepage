"use client";

import { Body2, Frame, FrameScreen, Image } from "@/atoms";
import { colors } from "@/styles";
import { AnalyticsEventList, logEvent } from "@/utils/analytics";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    // 현재 URL이 홈페이지가 아닌 경우
    if (window.location.pathname !== "/") {
      router.push(`/?section=${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      // 헤더 높이(88px)를 고려한 오프셋 계산
      const headerOffset = 88;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <FrameScreen overflow="hidden">
      <Frame
        alignment="center"
        row
        w="100%"
        py={12}
        px={40}
        bg={colors.neutral[950]}
        gap={"auto"}
        overflow="hidden"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
      >
        <Frame>
          <Link
            href="/"
            onClick={() => {
              logEvent(AnalyticsEventList.MENU_CLICK, {
                menu_name: "home_logo",
              });
            }}
          >
            <Image
              src="/images/logo/logo.png"
              alt="logo"
              width={64}
              height={64}
            />
          </Link>
        </Frame>

        <Frame row gap={24} tablet={{ hidden: true }} mobile={{ hidden: true }}>
          <div
            className="items-center justify-center px-[4px] py-[19px] cursor-pointer"
            onClick={() => {
              scrollToSection("intro");
              logEvent(AnalyticsEventList.MENU_CLICK, {
                menu_name: "intro",
              });
            }}
          >
            <span
              className={`py-[19px] font-[600] text-[16px] items-center justify-center text-[#CED3D8] hover:text-[#344054]`}
            >
              회사 소개
            </span>
          </div>
          <div
            className="items-center justify-center px-[4px] py-[19px] cursor-pointer"
            onClick={() => {
              scrollToSection("projects");
              logEvent(AnalyticsEventList.MENU_CLICK, {
                menu_name: "projects",
              });
            }}
          >
            <span
              className={`py-[19px] font-[600] text-[16px] items-center justify-center text-[#CED3D8] hover:text-[#344054]`}
            >
              포트폴리오
            </span>
          </div>
          <div
            className="items-center justify-center px-[4px] py-[19px] cursor-pointer"
            onClick={() => {
              scrollToSection("services");
              logEvent(AnalyticsEventList.MENU_CLICK, {
                menu_name: "services",
              });
            }}
          >
            <span
              className={`py-[19px] font-[600] text-[16px] items-center justify-center text-[#CED3D8] hover:text-[#344054]`}
            >
              서비스 제공 범위
            </span>
          </div>
          <div className="items-center justify-center px-[4px] py-[19px] cursor-pointer">
            <span
              className={`py-[19px] font-[600] text-[16px] items-center justify-center text-[#CED3D8]`}
            >
              |
            </span>
          </div>
          <div
            className="items-center justify-center px-[4px] py-[19px] cursor-pointer"
            onClick={() => {
              router.push("/cost-calculator");
              logEvent(AnalyticsEventList.MENU_CLICK, {
                menu_name: "cost_calculator",
              });
            }}
          >
            <span
              className={`py-[19px] font-[600] text-[16px] items-center justify-center text-[#84AAFB] hover:text-[#2167F7]`}
            >
              프로젝트 견적내기
            </span>
          </div>
          <div
            className="items-center justify-center px-[4px] py-[19px] cursor-pointer"
            onClick={() => {
              router.push("/question");
              logEvent(AnalyticsEventList.MENU_CLICK, {
                menu_name: "question",
              });
            }}
          >
            <span
              className={`py-[19px] font-[600] text-[16px] items-center justify-center text-[#CED3D8] hover:text-[#344054]`}
            >
              문의하기
            </span>
          </div>
        </Frame>

        <Frame row desktop={{ hidden: true }}>
          <Frame
            cursor="pointer"
            onClick={() => router.push("/cost-calculator")}
          >
            <Body2 px={4} py={19} fontWeight={600} fontColor={colors.main[300]}>
              프로젝트 견적내기
            </Body2>
          </Frame>
        </Frame>
      </Frame>
    </FrameScreen>
  );
};

export default Header;
