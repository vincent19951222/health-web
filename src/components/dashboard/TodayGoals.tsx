"use client";

import { motion } from "framer-motion";

const goals = [
    {
        title: "血糖达标率",
        value: "92%",
        subtitle: "目标 > 90%",
        stroke: "#2a6cf0",
        progress: 0.92,
    },
    {
        title: "血压监测",
        value: "120/80",
        subtitle: "建议范围 90-140 / 60-90",
        stroke: "#ff8b67",
        progress: 0.76,
    },
    {
        title: "血酮监测",
        value: "0.4",
        subtitle: "建议范围 0-0.6 mmol/L",
        stroke: "#5e67ff",
        progress: 0.65,
    },
];

function GoalRing({ progress, stroke, label }: { progress: number; stroke: string; label: string }) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progress);

    return (
        <svg className="goal-ring" width="136" height="136" viewBox="0 0 136 136" aria-label={label}>
            <circle cx="68" cy="68" r={radius} className="goal-ring__bg" />
            <circle
                cx="68"
                cy="68"
                r={radius}
                className="goal-ring__progress"
                stroke={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
            />
        </svg>
    );
}

export default function TodayGoals() {
    return (
        <section className="dashboard-section">
            <div className="section-header">
                <div>
                    <h3 className="section-title">今日健康目标</h3>
                    <p className="section-caption">用更直观的环形进度表达目标完成度与当前状态。</p>
                </div>
            </div>

            <div className="goal-grid">
                {goals.map((goal, index) => (
                    <motion.article
                        key={goal.title}
                        className="goal-card"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                        <div className="goal-card__meta">
                            <h4>{goal.title}</h4>
                            <span>{goal.subtitle}</span>
                        </div>
                        <div className="goal-card__ring">
                            <GoalRing progress={goal.progress} stroke={goal.stroke} label={goal.title} />
                            <div className="goal-card__center">
                                <strong>{goal.value}</strong>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
