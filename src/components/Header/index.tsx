"use client";

import { Body2, Frame, FrameScreen, Image } from "@/atoms";
import { colors } from "@/styles";

const Header = () => {
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
      >
        <Frame>
          <Image
            src="/images/logo/logo.png"
            alt="logo"
            width={64}
            height={64}
          />
        </Frame>

        <Frame row gap={24} tablet={{ hidden: true }} mobile={{ hidden: true }}>
          <Frame
            cursor="pointer"
            onClick={() => {
              console.log("회사 소개");
            }}
          >
            <Body2
              px={4}
              py={19}
              fontWeight={600}
              fontColor={colors.neutral[300]}
            >
              회사 소개
            </Body2>
          </Frame>
          <Frame
            cursor="pointer"
            onClick={() => {
              console.log("포트폴리오");
            }}
          >
            <Body2
              px={4}
              py={19}
              fontWeight={600}
              fontColor={colors.neutral[300]}
            >
              포트폴리오
            </Body2>
          </Frame>
          <Frame
            cursor="pointer"
            onClick={() => {
              console.log("서비스 제공 범위");
            }}
          >
            <Body2
              px={4}
              py={19}
              fontWeight={600}
              fontColor={colors.neutral[300]}
            >
              서비스 제공 범위
            </Body2>
          </Frame>
          <Body2
            px={4}
            py={19}
            fontWeight={600}
            fontColor={colors.neutral[300]}
          >
            |
          </Body2>
          <Frame
            cursor="pointer"
            onClick={() => {
              console.log("프로젝트 견적내기");
            }}
          >
            <Body2 px={4} py={19} fontWeight={600} fontColor={colors.main[300]}>
              프로젝트 견적내기
            </Body2>
          </Frame>
          <Frame
            cursor="pointer"
            onClick={() => {
              console.log("문의하기");
            }}
          >
            <Body2
              px={4}
              py={19}
              fontWeight={600}
              fontColor={colors.neutral[300]}
            >
              문의하기
            </Body2>
          </Frame>
        </Frame>

        <Frame row desktop={{ hidden: true }}>
          <Frame
            cursor="pointer"
            onClick={() => {
              console.log("프로젝트 견적내기");
            }}
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
