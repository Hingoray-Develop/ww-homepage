"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Frame, FrameScreen } from "@/atoms";
import { Footer } from "@/components";
import {
  Hero,
  Services,
  Intro,
  Projects,
  CooperateList,
  WhyChooseUs,
} from "@/containers";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [searchParams]);

  return (
    <FrameScreen overflow="hidden">
      <Frame w="100%" h={"100%"} col>
        <Hero />
        <Intro />
        <Services />
        <Projects />
        <WhyChooseUs />
        <CooperateList />
        <Footer />
      </Frame>
    </FrameScreen>
  );
}
