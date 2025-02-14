import { Frame, FrameScreen } from "@/atoms";
import { Footer } from "@/components";
import { Hero, Services } from "@/containers";
import Intro from "@/containers/Intro";
import Projects from "@/containers/Projects";

export default function Home() {
  return (
    <FrameScreen overflow="hidden">
      <Frame w="100%" h={"100%"} col>
        <Hero />
        <Intro />
        <Services />
        <Projects />
        <Footer />
      </Frame>
    </FrameScreen>
  );
}
