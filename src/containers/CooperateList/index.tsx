"use client";
import React from "react";
import Marquee from "react-fast-marquee";

import Cooperate1 from "@/assets/logo/coop1.svg?react";
import Cooperate2 from "@/assets/logo/coop2.svg?react";
import Cooperate3 from "@/assets/logo/coop3.svg?react";
import Cooperate4 from "@/assets/logo/coop4.svg?react";
import Cooperate5 from "@/assets/logo/coop5.svg?react";
import Cooperate6 from "@/assets/logo/coop6.svg?react";

import Cooperate8 from "@/assets/logo/coop8.svg?react";
import Cooperate9 from "@/assets/logo/coop9.svg?react";
import Cooperate10 from "@/assets/logo/coop10.svg?react";
import Cooperate11 from "@/assets/logo/coop11.svg?react";
import Cooperate12 from "@/assets/logo/coop12.svg?react";
import Cooperate13 from "@/assets/logo/coop13.svg?react";
import { colors } from "@/styles";

interface ClientLogo {
  name: string;
  src: React.ReactNode;
}

const clientLogos: ClientLogo[] = [
  { name: "창업진흥원", src: <Cooperate1 /> },
  { name: "중소벤처기업진흥공단", src: <Cooperate2 /> },
  { name: "과학기술정보통신부", src: <Cooperate3 /> },
  { name: "Kibo", src: <Cooperate4 /> },
  { name: "동효", src: <Cooperate5 /> },
  { name: "PMC", src: <Cooperate6 /> },
  { name: "신한은행", src: <Cooperate8 /> },
  { name: "RollingStone", src: <Cooperate9 /> },
  { name: "DeltaX", src: <Cooperate10 /> },
  { name: "박정희대통령기념재단", src: <Cooperate11 /> },
  { name: "SFactory", src: <Cooperate12 /> },
  { name: "KIATLUX", src: <Cooperate13 /> },
];

export default function Clients() {
  // 첫 번째 그룹: 인덱스 0 ~ 6
  const firstGroup = clientLogos.slice(0, 7);
  // 두 번째 그룹: 인덱스 7 ~ 끝
  const secondGroup = clientLogos.slice(7);

  return (
    <section
      className="overflow-hidden"
      style={{
        backgroundColor: colors.neutral[950],
      }}
    >
      <div
        className="text-center"
        style={{
          paddingTop: "120px",
          paddingBottom: "120px",
          gap: "40px",
        }}
      >
        {/* 첫 번째 줄: 왼쪽에서 오른쪽으로 */}
        <Marquee
          gradient={false}
          direction="left"
          speed={50}
          pauseOnHover
          autoFill
          className="overflow-hidden"
        >
          <div className="flex gap-[80px] mr-[80px]">
            {firstGroup.map((client, idx) => (
              <div key={idx} className="flex flex-col  p-4">
                <div className="h-12 flex items-center justify-center">
                  {client.src}
                </div>
              </div>
            ))}
          </div>
        </Marquee>
        <div
          style={{
            height: "40px",
          }}
        />
        {/* 두 번째 줄: 오른쪽에서 왼쪽으로 */}
        <Marquee
          gradient={false}
          direction="right"
          speed={50}
          pauseOnHover
          autoFill
          className="overflow-hidden"
        >
          <div className="flex gap-[80px] ml-[80px]">
            {secondGroup.map((client: ClientLogo, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4"
              >
                <div className=" flex items-center justify-center">
                  {client.src}
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
