import type { Metadata } from "next";
import localFont from "next/font/local";
import "./reset.css";

const Pretendard = localFont({ src: "../../public/PretendardVariable.woff2" });

export const metadata: Metadata = {
  title: "GASP Practice",
  description: "GSAP를 연습하는 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>{children}</body>
    </html>
  );
}
