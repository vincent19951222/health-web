"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const secondaryActions = [
    {
        href: "/reports",
        title: "生成健康报告",
        description: "整理本周血糖、血压与提醒执行情况，便于统一复盘。",
        icon: "fa-file-medical",
        tone: "indigo",
    },
    {
        href: "/settings",
        title: "检查提醒设置",
        description: "确认提醒时间、设备同步方式和通知偏好是否符合日常节奏。",
        icon: "fa-sliders",
        tone: "mint",
    },
] as const;

export default function ChartsAndActions() {
    return (
        <section className="dashboard-section">
            <div className="chart-action-layout">
                <div className="chart-stack">
                    <motion.article
                        className="dashboard-chart-card"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45 }}
                    >
                        <div className="dashboard-chart-card__header">
                            <div>
                                <h3>近 7 日血糖趋势</h3>
                                <p>餐后波动整体稳定，主要记录仍位于建议区间内。</p>
                            </div>
                            <div className="dashboard-chart-card__filters">
                                <button className="chart-filter">日</button>
                                <button className="chart-filter active">周</button>
                                <button className="chart-filter">月</button>
                            </div>
                        </div>
                        <div className="dashboard-chart">
                            <div className="dashboard-chart__labels dashboard-chart__labels--y">
                                <span>15</span>
                                <span>12</span>
                                <span>9</span>
                                <span>6</span>
                                <span>3</span>
                                <span>0</span>
                            </div>
                            <svg viewBox="0 0 620 260" preserveAspectRatio="none" className="dashboard-chart__svg">
                                <defs>
                                    <linearGradient id="dashboardSugarArea" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#2a6cf0" stopOpacity="0.32" />
                                        <stop offset="100%" stopColor="#2a6cf0" stopOpacity="0.02" />
                                    </linearGradient>
                                </defs>
                                <rect x="0" y="78" width="620" height="84" rx="20" fill="#dff6ef" />
                                <path
                                    d="M0 132 C55 110, 105 122, 155 104 S255 92, 310 116 S410 82, 465 96 S565 84, 620 74 L620 260 L0 260 Z"
                                    fill="url(#dashboardSugarArea)"
                                />
                                <path
                                    d="M0 132 C55 110, 105 122, 155 104 S255 92, 310 116 S410 82, 465 96 S565 84, 620 74"
                                    fill="none"
                                    stroke="#2a6cf0"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                                <circle cx="155" cy="104" r="7" fill="#ffffff" stroke="#2a6cf0" strokeWidth="4" />
                                <circle cx="310" cy="116" r="7" fill="#ffffff" stroke="#57c7a5" strokeWidth="4" />
                                <circle cx="465" cy="96" r="7" fill="#ffffff" stroke="#2a6cf0" strokeWidth="4" />
                                <circle cx="620" cy="74" r="9" fill="#2a6cf0" stroke="#ffffff" strokeWidth="4" />
                            </svg>
                            <div className="dashboard-chart__labels dashboard-chart__labels--x">
                                <span>周一</span>
                                <span>周二</span>
                                <span>周三</span>
                                <span>周四</span>
                                <span>周五</span>
                                <span>周六</span>
                                <span>周日</span>
                            </div>
                        </div>
                    </motion.article>

                    <motion.article
                        className="dashboard-chart-card"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: 0.06 }}
                    >
                        <div className="dashboard-chart-card__header">
                            <div>
                                <h3>近 7 日血压变化</h3>
                                <p>收缩压与舒张压都保持在建议范围内，趋势较平稳。</p>
                            </div>
                            <div className="dashboard-chart-card__legend">
                                <span>
                                    <i className="fas fa-circle" /> 收缩压
                                </span>
                                <span>
                                    <i className="fas fa-circle" /> 舒张压
                                </span>
                            </div>
                        </div>
                        <div className="dashboard-chart dashboard-chart--pressure">
                            <div className="dashboard-chart__labels dashboard-chart__labels--y">
                                <span>180</span>
                                <span>150</span>
                                <span>120</span>
                                <span>90</span>
                                <span>60</span>
                            </div>
                            <svg viewBox="0 0 620 260" preserveAspectRatio="none" className="dashboard-chart__svg">
                                <rect x="0" y="86" width="620" height="72" rx="18" fill="#fff0ea" />
                                <path
                                    d="M0 88 L103 82 L206 94 L310 76 L413 84 L516 76 L620 68"
                                    fill="none"
                                    stroke="#ff8b67"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M0 150 L103 156 L206 148 L310 152 L413 144 L516 148 L620 142"
                                    fill="none"
                                    stroke="#2a6cf0"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="dashboard-chart__labels dashboard-chart__labels--x">
                                <span>周一</span>
                                <span>周二</span>
                                <span>周三</span>
                                <span>周四</span>
                                <span>周五</span>
                                <span>周六</span>
                                <span>周日</span>
                            </div>
                        </div>
                    </motion.article>
                </div>

                <motion.aside
                    className="dashboard-side-panel"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.05 }}
                >
                    <div className="dashboard-device-card">
                        <div className="dashboard-device-card__top">
                            <div className="dashboard-device-card__icon">
                                <i className="fas fa-microchip" />
                            </div>
                            <span className="dashboard-device-card__badge">已连接</span>
                        </div>
                        <h3>CGM 设备在线</h3>
                        <p>传感器状态良好，最近一次同步时间为 5 分钟前，数据会继续自动汇总到首页工作台。</p>
                    </div>

                    <div className="dashboard-action-list">
                        {secondaryActions.map((item) => (
                            <Link key={item.title} href={item.href} className={`dashboard-action dashboard-action--${item.tone}`}>
                                <div className="dashboard-action__icon">
                                    <i className={`fas ${item.icon}`} />
                                </div>
                                <div>
                                    <strong>{item.title}</strong>
                                    <span>{item.description}</span>
                                </div>
                                <i className="fas fa-arrow-right dashboard-action__arrow" />
                            </Link>
                        ))}
                    </div>

                    <div className="dashboard-service-card">
                        <div className="dashboard-service-card__eyebrow">今日建议</div>
                        <h3>晚餐后 30 分钟进行 15 分钟快走</h3>
                        <p>有助于维持餐后血糖稳定，也能让晚间血压波动保持更平缓。</p>
                        <Link href="/hospital" className="header-btn header-btn-secondary">
                            <i className="fas fa-stethoscope" />
                            进入互联网医院
                        </Link>
                    </div>
                </motion.aside>
            </div>
        </section>
    );
}
