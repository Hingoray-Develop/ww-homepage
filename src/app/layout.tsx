import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components";
import localFont from "next/font/local";
// import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "흰고래컴퍼니",
  description: "흰고래컴퍼니",
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
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
