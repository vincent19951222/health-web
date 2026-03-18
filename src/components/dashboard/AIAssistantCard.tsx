"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";
import RotatingTypewriter from "./RotatingTypewriter";

const heroStats = [
    { label: "今日达标率", value: 92, suffix: "%" },
    { label: "连续稳定天数", value: 14, suffix: "天" },
    { label: "待处理提醒", value: 3, suffix: "项" },
];

const heroFocusWords = [
    { text: "血糖", tone: "blue" },
    { text: "血压", tone: "emerald" },
    { text: "糖化", tone: "coral" },
    { text: "尿酸", tone: "indigo" },
    { text: "血酮", tone: "amber" },
] as const;

function HealthOrbitIllustration() {
    return (
        <div className="health-illustration" aria-hidden="true">
            <div className="health-illustration__halo health-illustration__halo--one" />
            <div className="health-illustration__halo health-illustration__halo--two" />
            <svg viewBox="0 0 420 340" className="health-illustration__svg">
                <defs>
                    <linearGradient id="heroCardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
                        <stop offset="100%" stopColor="#eff8ff" stopOpacity="0.88" />
                    </linearGradient>
                    <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2a6cf0" />
                        <stop offset="100%" stopColor="#57c7a5" />
                    </linearGradient>
                </defs>

                <rect x="92" y="58" width="236" height="170" rx="36" fill="url(#heroCardGradient)" />
                <rect x="112" y="84" width="196" height="16" rx="8" fill="#dbeafe" />
                <rect x="112" y="112" width="120" height="12" rx="6" fill="#bfd8ff" />
                <path
                    d="M110 182 C140 154, 180 198, 214 166 C250 134, 282 178, 308 150"
                    stroke="url(#heroLineGradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                />
                <circle cx="214" cy="166" r="13" fill="#ffffff" stroke="#2a6cf0" strokeWidth="8" />
                <circle cx="308" cy="150" r="11" fill="#ffffff" stroke="#57c7a5" strokeWidth="7" />

                <rect x="56" y="128" width="96" height="112" rx="28" fill="#102347" opacity="0.98" />
                <rect x="74" y="150" width="60" height="10" rx="5" fill="#75f1d2" opacity="0.8" />
                <rect x="74" y="170" width="42" height="42" rx="18" fill="#2a6cf0" opacity="0.22" />
                <path
                    d="M88 191 H103 L112 178 L122 207 L132 191 H144"
                    stroke="#ffffff"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <rect x="290" y="190" width="86" height="72" rx="24" fill="#ffffff" opacity="0.95" />
                <circle cx="320" cy="226" r="17" fill="#57c7a5" opacity="0.18" />
                <path
                    d="M308 226 H320 L328 214 L338 238 L346 226 H358"
                    stroke="#2f4fd4"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <rect x="302" y="248" width="56" height="8" rx="4" fill="#d4ddf8" />
            </svg>
        </div>
    );
}

export default function AIAssistantCard() {
    return (
        <motion.section
            className="dashboard-hero"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="dashboard-hero__content">
                <div className="dashboard-hero__eyebrow">AI 健康工作台</div>

                <h2 className="dashboard-hero__title">
                    <span className="dashboard-hero__title-intro">优唐健康一直在关心您的</span>
                    <span className="dashboard-hero__title-focus">
                        <RotatingTypewriter words={[...heroFocusWords]} />
                    </span>
                </h2>

                <p className="dashboard-hero__subtitle">
                    把血糖、血压与日常提醒集中在一个更清晰的工作台里，系统会结合最近趋势、关键目标和设备状态，
                    优先呈现今天最值得关注的健康信号与下一步建议。
                </p>

                <div className="dashboard-hero__actions">
                    <Link href="/ai-chat" className="header-btn header-btn-primary">
                        <i className="fas fa-robot" />
                        获取 AI 建议
                    </Link>
                    <Link href="/reports" className="header-btn header-btn-secondary">
                        <i className="fas fa-file-medical" />
                        查看健康报告
                    </Link>
                </div>

                <div className="dashboard-hero__stats">
                    {heroStats.map((item, index) => (
                        <motion.div
                            key={item.label}
                            className="dashboard-hero__stat"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                        >
                            <span className="dashboard-hero__stat-label">{item.label}</span>
                            <strong className="dashboard-hero__stat-value">
                                <AnimatedNumber value={item.value} />
                                {item.suffix}
                            </strong>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="dashboard-hero__visual">
                <HealthOrbitIllustration />

                <div className="dashboard-hero__note">
                    <div className="dashboard-hero__note-label">今日工作台焦点</div>
                    <div className="dashboard-hero__note-title">3 条高优先级事项已整理完成</div>
                    <p>系统已按时段归位血糖、血压与提醒任务，进入首页就能直接开始处理。</p>

                    <div className="dashboard-hero__note-tags" aria-label="今日重点事项">
                        <span>晚间餐后记录</span>
                        <span>晨起血压复测</span>
                        <span>周报同步提醒</span>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
