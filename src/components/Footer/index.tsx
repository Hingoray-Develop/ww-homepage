"use client";

import { Body3, Frame, FrameScreen, Heading6, Image, Text } from "@/atoms";
import { colors } from "@/styles";
import Button from "../Button";
import Divider from "../Divider";

import ArrowRight from "@/assets/icons/line/arrow-right.svg?react";

const Footer = () => {
  return (
    <FrameScreen overflow="hidden">
      <Frame w="100%" col alignment="center" bg={colors.neutral[950]} p={40}>
        <Frame w="100%" col p={40} bg={colors.neutral[800]} row radius={32}>
          <Frame w="100%" col>
            <Frame w="100%" row alignment="top" gap={"auto"} pb={32}>
              <Frame col>
                <Text
                  fontSize={52}
                  lineHeight={"72px"}
                  fontWeight={700}
                  fontColor={colors.white}
                >
                  IT 솔루션 개발,
                </Text>
                <Text
                  fontSize={52}
                  lineHeight={"72px"}
                  fontWeight={700}
                  fontColor={colors.main[200]}
                >
                  첫삽부터 제대로
                </Text>
              </Frame>
              <Frame>
                <Button
                  bg={colors.main[600]}
                  radius={500}
                  onClick={() => {
                    console.log("빠른 프로젝트 견적내기");
                  }}
                >
                  <Frame row alignment="center" px={40} py={18} gap={8}>
                    <Heading6 fontColor={colors.white} fontWeight={700} py={2}>
                      빠른 프로젝트 견적내기
                    </Heading6>
                    <ArrowRight width={24} height={24} fill={colors.white} />
                  </Frame>
                </Button>
              </Frame>
            </Frame>
            <Divider color={colors.neutral[700]} thickness={1} />
            <Frame w="100%" pt={32} row gap={"auto"} alignment="center">
              <Frame>
                <Frame w="100%" row gap={8}>
                  <Body3 fontColor={colors.neutral[400]}>흰고래컴퍼니</Body3>
                  <Body3 fontColor={colors.neutral[400]}>|</Body3>
                  <Body3 fontColor={colors.neutral[400]}>대표 마성준</Body3>
                  <Body3 fontColor={colors.neutral[400]}>|</Body3>
                  <Body3 fontColor={colors.neutral[400]}>
                    사업자등록번호 467-34-00514
                  </Body3>
                </Frame>
                <Body3 fontColor={colors.neutral[400]}>
                  서울특별시 서초구 반포대로14길 71 405호
                </Body3>
                <Body3 fontColor={colors.neutral[600]}>
                  © Hingoray Company. All Right Reserved
                </Body3>
              </Frame>
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={64}
                height={64}
              />
            </Frame>
          </Frame>
        </Frame>
      </Frame>
    </FrameScreen>
  );
};

export default Footer;
