"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/blood-sugar-result.css";

type ResultMeta = {
    status: string;
    color: string;
    percent: number;
    levelText: string;
};

function getResultMeta(value: number): ResultMeta {
    if (value < 3.9) {
        return { status: "血糖偏低", color: "#3b82f6", percent: 30, levelText: "低血糖风险，需要及时补充碳水。" };
    }
    if (value <= 6.1) {
        return { status: "血糖正常", color: "#10b981", percent: 60, levelText: "数值在理想范围内，请继续保持。" };
    }
    if (value <= 7.0) {
        return { status: "血糖略高", color: "#f59e0b", percent: 72, levelText: "建议控制餐后摄入并增加轻运动。" };
    }
    return { status: "血糖偏高", color: "#ef4444", percent: 86, levelText: "建议尽快复测并咨询医生。" };
}

function toNumber(raw: string | null, fallback: number) {
    const parsed = Number(raw);
    return Number.isNaN(parsed) ? fallback : parsed;
}

function BloodSugarResultContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);
    const [showReminder, setShowReminder] = useState(true);

    const value = toNumber(searchParams.get("value"), 6.7);
    const period = searchParams.get("period") || "空腹";
    const dateTime = searchParams.get("dateTime") || "2026年3月5日 10:00";
    const meta = useMemo(() => getResultMeta(value), [value]);

    const reportSummary = useMemo(
        () => [
            `本次${period}血糖为 ${value.toFixed(1)} mmol/L，${meta.levelText}`,
            "建议继续保持规律监测，重点关注饮食结构、运动安排和睡眠质量。",
            value > 7 ? "如果连续两次高于目标范围，建议尽快联系医生进行进一步评估。" : "当前状态可继续按既定管理方案执行。",
        ],
        [meta.levelText, period, value]
    );

    const handleShare = async () => {
        const shareText = `我的血糖记录：${value.toFixed(1)} mmol/L（${period}）`;
        if (navigator.share) {
            await navigator.share({
                title: "血糖记录结果",
                text: shareText,
                url: window.location.href,
            });
            return;
        }
        await navigator.clipboard.writeText(shareText);
        alert("结果文案已复制到剪贴板");
    };

    return (
        <DashboardLayout hideHeader>
            <div className="bsr-page">
                <div className="blood-sugar-result-page">
                <header className="bsr-header">
                    <div className="bsr-header-left">
                        <button className="bsr-back-btn" onClick={() => router.push("/blood-sugar")}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h2 className="bsr-page-title">血糖记录结果</h2>
                    </div>
                    <div className="bsr-header-right">
                        <button className="bsr-share-btn" onClick={handleShare}>
                            <i className="fas fa-share-alt"></i>
                            分享结果
                        </button>
                    </div>
                </header>

                <section className="bsr-content">
                    <aside className="bsr-left-panel">
                        <h3 className="bsr-result-title">本次血糖检测结果</h3>
                        <div
                            className="bsr-result-circle"
                            style={{
                                background: `conic-gradient(from -90deg, ${meta.color} 0deg ${meta.percent * 3.6}deg, #e5e7eb ${meta.percent * 3.6}deg 360deg)`,
                            }}
                        >
                            <div className="bsr-value-wrap">
                                <span className="bsr-value">{value.toFixed(1)}</span>
                                <span className="bsr-unit">mmol/L</span>
                            </div>
                        </div>
                        <div className="bsr-status">{meta.status}</div>
                        <div className="bsr-record-info">
                            <div className="bsr-record-datetime">{dateTime}</div>
                            <div className="bsr-record-period">测量时段：{period}</div>
                        </div>

                        <div className="bsr-reference">
                            <div className="bsr-reference-title">血糖参考范围</div>
                            <div className="bsr-reference-item">
                                <span className="dot low"></span>
                                <span>低血糖: &lt; 3.9 mmol/L</span>
                            </div>
                            <div className="bsr-reference-item">
                                <span className="dot normal"></span>
                                <span>正常: 3.9-6.1 mmol/L（空腹）</span>
                            </div>
                            <div className="bsr-reference-item">
                                <span className="dot warning"></span>
                                <span>偏高: 6.1-7.0 mmol/L</span>
                            </div>
                            <div className="bsr-reference-item">
                                <span className="dot danger"></span>
                                <span>过高: &gt; 7.0 mmol/L</span>
                            </div>
                        </div>
                    </aside>

                    <div className="bsr-right-panel">
                        {showReminder && (
                            <section className="bsr-reminder-card">
                                <div className="bsr-reminder-avatar">
                                    <i className="fas fa-robot"></i>
                                </div>
                                <div className="bsr-reminder-content">
                                    <div className="bsr-reminder-title">小优提示</div>
                                    <div className="bsr-reminder-text">
                                        以下内容为 AI 生成的健康管理建议，仅供参考，不替代医生诊疗意见。
                                    </div>
                                </div>
                                <button className="bsr-close-btn" onClick={() => setShowReminder(false)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </section>
                        )}

                        <section className="bsr-report-card">
                            <div className="bsr-report-header">
                                <h3 className="bsr-report-title">
                                    <i className="fas fa-file-medical-alt"></i>
                                    血糖 AI 分析报告
                                </h3>
                            </div>
                            <div className="bsr-report-content">
                                <h4>检测结果概览</h4>
                                <p>{reportSummary[0]}</p>

                                <h4>趋势判断</h4>
                                <p>{reportSummary[1]}</p>

                                <h4>下一步建议</h4>
                                <p>{reportSummary[2]}</p>
                                <ul>
                                    <li>饮食：减少高糖和精制碳水，三餐定时定量。</li>
                                    <li>运动：每周至少 150 分钟中等强度有氧运动。</li>
                                    <li>监测：保持每天固定时段测量并记录。</li>
                                </ul>
                                <div className="bsr-disclaimer">
                                    <i className="fas fa-info-circle"></i>
                                    内容由 AI 自动生成，仅供参考。
                                </div>
                            </div>
                            <div className="bsr-feedback">
                                <span>这份建议是否有帮助？</span>
                                <div className="bsr-feedback-buttons">
                                    <button
                                        className={`bsr-feedback-btn ${feedback === "like" ? "active-like" : ""}`}
                                        onClick={() => setFeedback((v) => (v === "like" ? null : "like"))}
                                    >
                                        <i className={`${feedback === "like" ? "fas" : "far"} fa-thumbs-up`}></i>
                                    </button>
                                    <button
                                        className={`bsr-feedback-btn ${feedback === "dislike" ? "active-dislike" : ""}`}
                                        onClick={() => setFeedback((v) => (v === "dislike" ? null : "dislike"))}
                                    >
                                        <i className={`${feedback === "dislike" ? "fas" : "far"} fa-thumbs-down`}></i>
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="bsr-consult-card">
                            <div className="bsr-consult-header">
                                <div className="bsr-consult-icon">
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div>
                                    <h3>在线问诊</h3>
                                    <p>专业医生，快速解读血糖异常风险</p>
                                </div>
                            </div>
                            <p className="bsr-consult-desc">
                                若近期血糖波动频繁，建议尽早与医生沟通，结合饮食、运动与药物方案进行精细化管理。
                            </p>
                        </section>

                        <div className="bsr-action-bar">
                            <Link href="/blood-sugar" className="bsr-btn bsr-btn-secondary">
                                <i className="fas fa-list"></i>
                                返回列表
                            </Link>
                            <Link href="/blood-sugar-manual" className="bsr-btn bsr-btn-primary">
                                <i className="fas fa-plus"></i>
                                继续记录
                            </Link>
                            <Link href="/ai-chat" className="bsr-btn bsr-btn-success">
                                <i className="fas fa-comments"></i>
                                联系客服
                            </Link>
                        </div>
                    </div>
                </section>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default function BloodSugarResultPage() {
    return (
        <Suspense fallback={null}>
            <BloodSugarResultContent />
        </Suspense>
    );
}
