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
