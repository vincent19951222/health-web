import type { Metadata } from "next";
import { Noto_Sans_SC, Outfit } from "next/font/google";
import VoiceAssistantBall from "@/components/VoiceAssistantBall";
import "./globals.css";

const bodyFont = Noto_Sans_SC({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const displayFont = Outfit({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
    title: "优糖智能 AI+ 健康管理平台",
    description: "面向慢病与日常健康监测的智能仪表盘与 AI 辅助管理系统。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
                {children}
                <VoiceAssistantBall />
            </body>
        </html>
    );
}
