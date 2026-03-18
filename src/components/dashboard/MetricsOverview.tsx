"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

const metrics = [
    {
        label: "当前血糖",
        value: 6.8,
        unit: "mmol/L",
        route: "/blood-sugar",
        status: "稳定",
        trend: "较昨日持平",
        icon: "fa-droplet",
        tone: "blue",
    },
    {
        label: "当前血压",
        value: "120/80",
        unit: "mmHg",
        route: "/blood-pressure",
        status: "正常",
        trend: "较昨日下降 2 mmHg",
        icon: "fa-heart-pulse",
        tone: "coral",
    },
    {
        label: "糖化血红蛋白",
        value: 6.8,
        unit: "%",
        route: "/glycated",
        status: "可控",
        trend: "较上月下降 0.2%",
        icon: "fa-chart-line",
        tone: "indigo",
    },
    {
        label: "尿酸数值",
        value: 380,
        unit: "umol/L",
        route: "/uric-acid",
        status: "平稳",
        trend: "连续两周无明显波动",
        icon: "fa-vial",
        tone: "mint",
    },
];

export default function MetricsOverview() {
    return (
        <section className="dashboard-section">
            <div className="section-header">
                <div>
                    <h3 className="section-title">核心指标概览</h3>
                    <p className="section-caption">保留原有业务数据语义，以更清晰的视觉层次呈现每日重点。</p>
                </div>
                <Link href="/reports" className="section-action">
                    查看完整趋势
                    <i className="fas fa-arrow-right" />
                </Link>
            </div>

            <div className="metrics-overview-grid">
                {metrics.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.45, delay: index * 0.06 }}
                    >
                        <Link href={item.route} className={`metric-panel metric-panel--${item.tone}`}>
                            <div className="metric-panel__top">
                                <div className="metric-panel__icon">
                                    <i className={`fas ${item.icon}`} />
                                </div>
                                <span className="metric-panel__status">{item.status}</span>
                            </div>
                            <div className="metric-panel__body">
                                <div className="metric-panel__value">
                                    {typeof item.value === "number" ? (
                                        <AnimatedNumber value={item.value} decimals={item.value % 1 ? 1 : 0} />
                                    ) : (
                                        item.value
                                    )}
                                </div>
                                <div className="metric-panel__unit">{item.unit}</div>
                            </div>
                            <div className="metric-panel__footer">
                                <strong>{item.label}</strong>
                                <span>{item.trend}</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
