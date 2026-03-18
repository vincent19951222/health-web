"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AnimatedNumber from "./AnimatedNumber";

type PanelTone = "blue" | "coral";
type TaskTone = "blue" | "coral" | "indigo";
type TaskFilter = "pending" | "completed";

interface TrendPoint {
    label: string;
    value: number;
}

interface PanelConfig {
    title: string;
    route: string;
    icon: string;
    tone: PanelTone;
    value: number | string;
    decimals?: number;
    unit: string;
    status: string;
    summary: string;
    detailLabel: string;
    detailValue: string;
    trend: string;
    markers: string[];
    cta: string;
    trendPoints: TrendPoint[];
}

interface TaskItem {
    id: string;
    title: string;
    meta: string;
    priority: string;
    tone: TaskTone;
    href: string;
    cta: string;
    completed: boolean;
}

const primaryPanels: PanelConfig[] = [
    {
        title: "血糖管理",
        route: "/blood-sugar",
        icon: "fa-droplet",
        tone: "blue",
        value: 6.8,
        decimals: 1,
        unit: "mmol/L",
        status: "稳定",
        summary: "餐后波动平稳，继续维持今日饮食与轻量活动节奏。",
        detailLabel: "今日重点",
        detailValue: "晚餐后 2 小时补测",
        trend: "较昨日下降 0.3",
        markers: ["早餐后 7.2", "午餐后 6.8", "目标区间内"],
        cta: "进入血糖工作台",
        trendPoints: [
            { label: "07:30", value: 7.2 },
            { label: "10:30", value: 6.5 },
            { label: "13:20", value: 6.8 },
            { label: "16:40", value: 6.4 },
            { label: "20:30", value: 6.8 },
        ],
    },
    {
        title: "血压管理",
        route: "/blood-pressure",
        icon: "fa-heart-pulse",
        tone: "coral",
        value: "120/80",
        unit: "mmHg",
        status: "正常",
        summary: "晨起与午后两次记录都在建议范围内，波动控制良好。",
        detailLabel: "下一次记录",
        detailValue: "今晚 20:30",
        trend: "收缩压较上周均值下降 2",
        markers: ["晨起 118/78", "午后 121/81", "夜间待复测"],
        cta: "查看血压详情",
        trendPoints: [
            { label: "07:00", value: 118 },
            { label: "11:30", value: 122 },
            { label: "15:00", value: 120 },
            { label: "18:30", value: 121 },
            { label: "21:00", value: 119 },
        ],
    },
];

const initialTasks: TaskItem[] = [
    {
        id: "post-meal-sugar",
        title: "晚间餐后血糖记录",
        meta: "20:30 前完成，已为你保留快捷录入入口。",
        priority: "高优先级",
        tone: "blue",
        href: "/blood-sugar-manual",
        cta: "立即记录",
        completed: false,
    },
    {
        id: "morning-pressure",
        title: "晨起血压复测提醒",
        meta: "建议保持静坐 5 分钟后再测，结果会自动写入趋势图。",
        priority: "已安排",
        tone: "coral",
        href: "/blood-pressure",
        cta: "查看安排",
        completed: false,
    },
    {
        id: "weekly-report",
        title: "本周健康摘要待生成",
        meta: "整理血糖、血压与提醒执行情况，方便统一复盘。",
        priority: "低干扰",
        tone: "indigo",
        href: "/reports",
        cta: "生成周报",
        completed: false,
    },
    {
        id: "device-sync-check",
        title: "设备同步状态确认",
        meta: "CGM 最近一次同步成功，工作台已完成记录归档。",
        priority: "已完成",
        tone: "blue",
        href: "/settings",
        cta: "查看同步",
        completed: true,
    },
];

function buildSparklinePath(points: TrendPoint[]) {
    if (points.length === 0) {
        return "";
    }

    const width = 260;
    const height = 68;
    const paddingX = 10;
    const paddingY = 8;
    const values = points.map((point) => point.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(max - min, 1);

    return points
        .map((point, index) => {
            const x =
                points.length === 1
                    ? width / 2
                    : paddingX + (index / (points.length - 1)) * (width - paddingX * 2);
            const y = height - paddingY - ((point.value - min) / range) * (height - paddingY * 2);
            return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(" ");
}

function TrendStrip({ panel }: { panel: PanelConfig }) {
    const path = buildSparklinePath(panel.trendPoints);

    return (
        <div className={`workbench-panel__sparkline workbench-panel__sparkline--${panel.tone}`}>
            <div className="workbench-panel__sparkline-top">
                <span>今日迷你趋势</span>
                <strong>{panel.trend}</strong>
            </div>

            <svg viewBox="0 0 260 68" className="workbench-panel__sparkline-svg" preserveAspectRatio="none">
                <path d="M 10 56 H 250" className="workbench-panel__sparkline-baseline" />
                <path d={path} className="workbench-panel__sparkline-line" />
                {panel.trendPoints.map((point, index) => {
                    const values = panel.trendPoints.map((item) => item.value);
                    const min = Math.min(...values);
                    const max = Math.max(...values);
                    const range = Math.max(max - min, 1);
                    const x =
                        panel.trendPoints.length === 1
                            ? 130
                            : 10 + (index / (panel.trendPoints.length - 1)) * 240;
                    const y = 68 - 8 - ((point.value - min) / range) * 52;

                    return <circle key={point.label} cx={x} cy={y} r="4.5" className="workbench-panel__sparkline-dot" />;
                })}
            </svg>

            <div className="workbench-panel__timeline" aria-label={`${panel.title} 时间轴`}>
                {panel.trendPoints.map((point) => (
                    <div key={point.label} className="workbench-panel__timeline-item">
                        <strong>{point.label}</strong>
                        <span>{point.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HealthWorkbench() {
    const [taskFilter, setTaskFilter] = useState<TaskFilter>("pending");
    const [tasks, setTasks] = useState(initialTasks);
    const [feedback, setFeedback] = useState("");

    const completedCount = tasks.filter((task) => task.completed).length;
    const pendingCount = tasks.length - completedCount;
    const filteredTasks = tasks.filter((task) =>
        taskFilter === "pending" ? !task.completed : task.completed,
    );

    const workbenchSignals = [
        { label: "今日工作台状态", value: `${completedCount} 项已完成` },
        { label: "待处理提醒", value: `${pendingCount} 项` },
        { label: "设备同步", value: "最近更新 5 分钟前" },
    ];

    const toggleTask = (taskId: string) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) => {
                if (task.id !== taskId) {
                    return task;
                }

                const nextCompleted = !task.completed;
                setFeedback(nextCompleted ? `已完成：${task.title}` : `已恢复待办：${task.title}`);

                return {
                    ...task,
                    completed: nextCompleted,
                    priority: nextCompleted ? "已完成" : task.priority === "已完成" ? "待处理" : task.priority,
                };
            }),
        );
    };

    return (
        <section className="dashboard-section">
            <div className="section-header">
                <div>
                    <h3 className="section-title">健康工作台</h3>
                    <p className="section-caption">
                        把血糖、血压与日常提醒收束到一个可执行面板里，进入首页后直接开始今天最重要的动作。
                    </p>
                </div>
                <Link href="/reports" className="section-action">
                    查看完整健康报告
                    <i className="fas fa-arrow-right" />
                </Link>
            </div>

            <motion.div
                className="health-workbench"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5 }}
            >
                <div className="health-workbench__top">
                    <div className="health-workbench__main">
                        <div className="health-workbench__summary">
                            <div>
                                <span className="health-workbench__summary-label">今日总览</span>
                                <h4>血糖与血压状态平稳，提醒事项已按优先级整理</h4>
                            </div>

                            <div className="health-workbench__summary-pills">
                                {workbenchSignals.map((signal) => (
                                    <div key={signal.label} className="health-workbench__summary-pill">
                                        <span>{signal.label}</span>
                                        <strong>{signal.value}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="health-workbench__panels">
                            {primaryPanels.map((panel, index) => (
                                <motion.article
                                    key={panel.title}
                                    className={`workbench-panel workbench-panel--${panel.tone}`}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.45, delay: index * 0.08 }}
                                >
                                    <div className="workbench-panel__top">
                                        <div className="workbench-panel__heading">
                                            <span className="workbench-panel__icon">
                                                <i className={`fas ${panel.icon}`} />
                                            </span>
                                            <div>
                                                <h4>{panel.title}</h4>
                                                <p>{panel.summary}</p>
                                            </div>
                                        </div>
                                        <span className="workbench-panel__status">{panel.status}</span>
                                    </div>

                                    <div className="workbench-panel__value-row">
                                        <div className="workbench-panel__value">
                                            {typeof panel.value === "number" ? (
                                                <AnimatedNumber value={panel.value} decimals={panel.decimals ?? 0} />
                                            ) : (
                                                panel.value
                                            )}
                                            <small>{panel.unit}</small>
                                        </div>
                                        <div className="workbench-panel__trend">{panel.trend}</div>
                                    </div>

                                    <div className="workbench-panel__focus">
                                        <span>{panel.detailLabel}</span>
                                        <strong>{panel.detailValue}</strong>
                                    </div>

                                    <TrendStrip panel={panel} />

                                    <div className="workbench-panel__markers">
                                        {panel.markers.map((marker) => (
                                            <span key={marker}>{marker}</span>
                                        ))}
                                    </div>

                                    <Link href={panel.route} className="workbench-panel__cta">
                                        {panel.cta}
                                        <i className="fas fa-arrow-right" />
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </div>

                    <motion.aside
                        className="health-workbench__aside"
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                    >
                        <div className="workbench-task-card">
                        <div className="workbench-task-card__header">
                            <div>
                                <div className="workbench-task-card__eyebrow">今日提醒与待办</div>
                                <h4>完成勾选后会自动归档，工作台状态会同步更新</h4>
                            </div>

                            <div className="workbench-task-card__filters" aria-label="提醒状态筛选">
                                <button
                                    type="button"
                                    className={`workbench-task-card__filter ${taskFilter === "pending" ? "active" : ""}`}
                                    onClick={() => setTaskFilter("pending")}
                                >
                                    待完成
                                </button>
                                <button
                                    type="button"
                                    className={`workbench-task-card__filter ${taskFilter === "completed" ? "active" : ""}`}
                                    onClick={() => setTaskFilter("completed")}
                                >
                                    已完成
                                </button>
                            </div>
                        </div>

                        <div className="workbench-task-card__subline">
                            <span>{taskFilter === "pending" ? `还有 ${pendingCount} 项待处理` : `${completedCount} 项已完成`}</span>
                            {feedback ? <strong>{feedback}</strong> : null}
                        </div>

                        <motion.div layout className="workbench-task-list">
                            <AnimatePresence mode="popLayout">
                                {filteredTasks.length > 0 ? (
                                    filteredTasks.map((task) => (
                                        <motion.div
                                            key={task.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.22 }}
                                            className={`workbench-task workbench-task--${task.tone} ${task.completed ? "is-completed" : ""}`}
                                        >
                                            <div className="workbench-task__meta">
                                                <div className="workbench-task__topline">
                                                    <span className="workbench-task__badge">{task.priority}</span>
                                                    {task.completed ? (
                                                        <span className="workbench-task__feedback">
                                                            <i className="fas fa-check" />
                                                            已归档
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <strong>{task.title}</strong>
                                                <p>{task.meta}</p>
                                            </div>

                                            <div className="workbench-task__actions">
                                                <button
                                                    type="button"
                                                    className={`workbench-task__toggle ${task.completed ? "is-active" : ""}`}
                                                    onClick={() => toggleTask(task.id)}
                                                    aria-pressed={task.completed}
                                                >
                                                    <i className={`fas ${task.completed ? "fa-rotate-left" : "fa-check"}`} />
                                                    {task.completed ? "恢复待办" : "标记完成"}
                                                </button>
                                                <Link href={task.href} className="workbench-task__link">
                                                    {task.cta}
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="workbench-task-list__empty"
                                    >
                                        <i className="fas fa-circle-check" />
                                        <span>{taskFilter === "pending" ? "当前没有待处理提醒" : "还没有已完成事项"}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                        </div>
                    </motion.aside>
                </div>

                <motion.div
                    className="workbench-quicklinks"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <Link href="/ai-chat" className="workbench-quicklink workbench-quicklink--ai">
                        <div className="workbench-quicklink__icon">
                            <i className="fas fa-robot" />
                        </div>
                        <div className="workbench-quicklink__body">
                            <span className="workbench-quicklink__eyebrow">AI 问答</span>
                            <strong>让 AI 帮你梳理今天的健康信号</strong>
                            <small>快速总结重点指标、提醒与下一步建议</small>
                        </div>
                        <span className="workbench-quicklink__arrow">
                            <i className="fas fa-arrow-right" />
                        </span>
                    </Link>
                    <Link href="/hospital" className="workbench-quicklink workbench-quicklink--hospital">
                        <div className="workbench-quicklink__icon">
                            <i className="fas fa-stethoscope" />
                        </div>
                        <div className="workbench-quicklink__body">
                            <span className="workbench-quicklink__eyebrow">互联网医院</span>
                            <strong>需要时可直接进入互联网医院咨询</strong>
                            <small>快速衔接专业问诊与后续服务支持</small>
                        </div>
                        <span className="workbench-quicklink__arrow">
                            <i className="fas fa-arrow-right" />
                        </span>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
