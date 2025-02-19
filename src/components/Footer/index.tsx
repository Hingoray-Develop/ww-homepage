"use client";

import { Frame, FrameScreen, Text } from "@/atoms";
import { colors } from "@/styles";
import Button from "../Button";
import Divider from "../Divider";

import ArrowRight from "@/assets/icons/line/arrow-right.svg?react";
import { AnalyticsEventList, logEvent } from "@/utils/analytics";
import Image from "next/image";
const Footer = () => {
  return (
    <FrameScreen overflow="hidden">
      <Frame
        w="100%"
        col
        alignment="center"
        bg={colors.neutral[950]}
        p={40}
        mobile={{ p: 20 }}
        tablet={{ p: 30 }}
      >
        <Frame
          w="100%"
          col
          p={40}
          bg={colors.neutral[800]}
          row
          radius={32}
          mobile={{ p: 20 }}
          tablet={{ p: 30 }}
        >
          <Frame w="100%" col>
            <Frame
              w="100%"
              row
              alignment="center"
              gap="auto"
              pb={32}
              // mobile={{ pb: 20 }}
              // tablet={{ pb: 24 }}
            >
              <Frame col alignment="center">
                <Text
                  fontSize={52}
                  lineHeight="72px"
                  fontWeight={700}
                  fontColor={colors.white}
                  mobile={{ fontSize: 28, lineHeight: "36px" }}
                  tablet={{ fontSize: 36, lineHeight: "48px" }}
                >
                  IT 솔루션 개발,
                </Text>
                <Text
                  fontSize={52}
                  lineHeight="72px"
                  fontWeight={700}
                  fontColor={colors.main[200]}
                  mobile={{ fontSize: 28, lineHeight: "36px" }}
                  tablet={{ fontSize: 36, lineHeight: "48px" }}
                >
                  첫삽부터 제대로
                </Text>
              </Frame>
              <Frame>
                <Button
                  bg={colors.main[600]}
                  radius={500}
                  onClick={() => {
                    logEvent(AnalyticsEventList.BUTTON_CLICK, {
                      button_name: "cost_calculator_footer",
                    });
                  }}
                >
                  <Frame
                    row
                    alignment="center"
                    px={40}
                    py={18}
                    gap={8}
                    mobile={{ px: 20, py: 12 }}
                    tablet={{ px: 30, py: 14 }}
                  >
                    <Text
                      fontColor={colors.white}
                      fontWeight={700}
                      py={2}
                      fontSize={18}
                      mobile={{ fontSize: 16 }}
                      tablet={{ fontSize: 18 }}
                    >
                      빠른 프로젝트 견적내기
                    </Text>
                    <ArrowRight width={24} height={24} fill={colors.white} />
                  </Frame>
                </Button>
              </Frame>
            </Frame>
            <Divider color={colors.neutral[700]} thickness={1} />
            <Frame
              w="100%"
              pt={32}
              row
              gap="auto"
              alignment="center"
              mobile={{ pt: 20 }}
              tablet={{ pt: 24 }}
            >
              <Frame mobile={{ pb: 16 }}>
                <Frame
                  w="100%"
                  row
                  gap={8}
                  mobile={{ alignment: "center" }}
                  tablet={{ row: true, alignment: "center" }}
                >
                  <Text
                    fontSize={14}
                    lineHeight={"22px"}
                    mobile={{ fontSize: 12, lineHeight: "18px" }}
                    fontColor={colors.neutral[400]}
                  >
                    흰고래컴퍼니
                  </Text>
                  <Text
                    fontSize={14}
                    lineHeight={"22px"}
                    mobile={{ fontSize: 12, lineHeight: "18px" }}
                    fontColor={colors.neutral[400]}
                  >
                    |
                  </Text>
                  <Text
                    fontSize={14}
                    lineHeight={"22px"}
                    mobile={{ fontSize: 12, lineHeight: "18px" }}
                    fontColor={colors.neutral[400]}
                  >
                    대표 마성준
                  </Text>
                  <Text
                    fontSize={14}
                    lineHeight={"22px"}
                    mobile={{ fontSize: 12, lineHeight: "18px" }}
                    fontColor={colors.neutral[400]}
                  >
                    |
                  </Text>
                  <Text
                    fontSize={14}
                    lineHeight={"22px"}
                    mobile={{ fontSize: 12, lineHeight: "18px" }}
                    fontColor={colors.neutral[400]}
                  >
                    사업자등록번호 467-34-00514
                  </Text>
                </Frame>
                <Text
                  fontSize={14}
                  lineHeight={"22px"}
                  mobile={{ fontSize: 12, lineHeight: "18px" }}
                  fontColor={colors.neutral[400]}
                >
                  서울특별시 서초구 반포대로14길 71 405호
                </Text>
                <Text
                  fontSize={14}
                  lineHeight={"22px"}
                  mobile={{ fontSize: 12, lineHeight: "18px" }}
                  fontColor={colors.neutral[600]}
                >
                  © Hingoray Company. All Right Reserved
                </Text>
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
