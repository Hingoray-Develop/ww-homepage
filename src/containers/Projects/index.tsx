"use client";

import { Frame, Text } from "@/atoms";
import { ProjectCard } from "@/components";
import { colors } from "@/styles";
import useResponsiveType from "@/hooks/useResponsiveType";

const Projects = () => {
  const { responsiveType } = useResponsiveType();
  const isMobile = responsiveType === "mobile";
  const isTablet = responsiveType === "tablet";

  const paddingX = isMobile ? 16 : isTablet ? 30 : 40;
  const paddingY = isMobile ? 80 : isTablet ? 120 : 160;

  const projects = [
    {
      image: "/images/hero/whale.jpg", // 실제 이미지 경로로 수정 필요
      title: "나의 올해 사주는? 루리즈",
      type: "Interactive Web",
      boldTexts: ["루리즈"],
      onClick: () => console.log("루리즈 클릭됨"),
    },
    {
      image: "/images/hero/whale.jpg", // 실제 이미지 경로로 수정 필요
      title: "흰고래컴퍼니 자체 디자인시스템",
      type: "Interactive Web",
      boldTexts: ["디자인시스템"],
      onClick: () => console.log("디자인시스템 클릭됨"),
    },
    {
      image: "/images/hero/whale.jpg", // 실제 이미지 경로로 수정 필요
      title: "인도네시아에도 당근마켓이? 이너서클",
      type: "Interactive Web",
      boldTexts: ["이너서클"],
      onClick: () => console.log("이너서클 클릭됨"),
    },
    {
      image: "/images/hero/whale.jpg", // 실제 이미지 경로로 수정 필요
      title: "탈중앙 암호화폐 거래소, 블록덱스",
      type: "Interactive Web",
      boldTexts: ["블록덱스"],
      onClick: () => console.log("블록렉스 클릭됨"),
    },
  ];

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gap: "24px",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
      ? "repeat(2, 1fr)"
      : "repeat(2, 1fr)",
    width: "100%",
  };

  const getCardStyle = (index: number): React.CSSProperties => ({
    transform: !isMobile && index % 2 === 1 ? "translateY(80px)" : "none",
    transition: "transform 0.3s ease-in-out",
    paddingTop: !isMobile && index % 2 === 1 ? "80px" : "0",
  });

  return (
    <div
      id="projects"
      style={{
        backgroundColor: colors.white,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        overflow: "hidden",
      }}
    >
      <Frame w={"100%"} alignment="center" pb={80}>
        <Text
          fontColor={colors.neutral[900]}
          fontSize={52}
          lineHeight={"72px"}
          fontWeight={700}
        >
          프로젝트
        </Text>
        <Text
          fontColor={colors.neutral[700]}
          fontSize={20}
          lineHeight={"30x"}
          fontWeight={400}
          pt={8}
        >
          기업과 유저가 원하는 최고의 문제해결을 통해
        </Text>
        <Text
          fontColor={colors.neutral[700]}
          fontSize={20}
          lineHeight={"30x"}
          fontWeight={400}
        >
          우리가 함께 완성한 프로젝트를 소개합니다.
        </Text>
      </Frame>
      <Frame col w="100%" gap={24}>
        <div style={gridStyle}>
          {projects.map((project, index) => (
            <div key={index} style={getCardStyle(index)}>
              <ProjectCard
                image={project.image}
                title={project.title}
                type={project.type}
                boldTexts={project.boldTexts}
                onClick={project.onClick}
              />
            </div>
          ))}
        </div>
      </Frame>
    </div>
  );
};

export default Projects;
