import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "灵芽 Lingya",
  description: "把你看到的教程、帖子和灵感，慢慢养成自己的判断。",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "灵芽",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#fff6db",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${notoSansSc.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
