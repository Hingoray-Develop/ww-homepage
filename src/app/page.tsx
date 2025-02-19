"use client";

import { Suspense } from "react";
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
import ScrollToSection from "@/components/ScrollToSection";
import { useInitialLoading } from "@/hooks/useInitialLoading";

export default function Home() {
  useInitialLoading();

  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
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
        <ScrollToSection />
      </Suspense>
    </>
  );
}
