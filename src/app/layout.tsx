import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LoadingProvider } from "@/contexts/LoadingContext";

export const metadata: Metadata = {
  title: "흰고래컴퍼니 | 맞춤형 소프트웨어 개발 및 IT 솔루션",
  description:
    "흰고래컴퍼니는 맞춤형 소프트웨어 개발, 웹 & 앱 제작, IT 컨설팅을 제공하는 최고의 개발 파트너입니다. 효율적인 솔루션과 혁신적인 기술을 만나보세요.",
};

const pretendard = localFont({
  src: [
    {
      path: "../fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body className={` ${pretendard.variable}`}>
        <LoadingProvider>
          <Header />
          <div style={{ paddingTop: "88px" }}>{children}</div>
        </LoadingProvider>
        {/* <Footer /> */}
        <GoogleAnalytics gaId="G-RSB381YFK5" />
      </body>
    </html>
  );
}
