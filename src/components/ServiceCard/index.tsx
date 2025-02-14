"use client";

import { Body1, Frame, Heading3 } from "@/atoms";
import { colors } from "@/styles";
import { ReactNode } from "react";
import Divider from "../Divider";

/**
 * ServiceCardProps 인터페이스에 minH 옵션을 추가합니다.
 * 기본값은 300 (데스크탑/태블릿)으로 유지하고, 필요시 외부에서 override할 수 있습니다.
 */
export interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  descriptions: string[];
  onMoreClick?: () => void;
  /** 카드의 최소 높이, 기본값 300 */
  minH?: number;
}

const ServiceCard = ({
  icon,
  title,
  descriptions,
  onMoreClick,
  minH = 300,
}: ServiceCardProps) => {
  return (
    <Frame
      col
      pl={24}
      pt={24}
      pb={20}
      pr={24}
      gap={24}
      bg={colors.neutral[100]}
      radius={16}
      w="100%"
      minH={minH}
    >
      <Frame>{icon}</Frame>

      <Frame col w={"100%"} gap={20}>
        <Heading3 fontColor={colors.neutral[900]}>{title}</Heading3>
        <Frame w={"100%"}>
          <Divider color={colors.neutral[200]} />
        </Frame>
        <Frame col gap={8}>
          {descriptions.map((desc, index) => (
            <Body1 key={index} fontColor={colors.neutral[500]}>
              {desc}
            </Body1>
          ))}
        </Frame>
      </Frame>

      <Frame
        w={"100%"}
        cursor="pointer"
        onClick={onMoreClick}
        alignment="bottom-right"
      >
        <Body1 fontColor={colors.neutral[500]}>더보기 →</Body1>
      </Frame>
    </Frame>
  );
};

export default ServiceCard;
