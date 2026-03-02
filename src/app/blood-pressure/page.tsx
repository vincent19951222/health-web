"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/blood-pressure-main.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BloodPressureMainPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("7天");

    const bpValue = { systolic: 125, diastolic: 82 };
    const heartRate = 72;
    const measurementTime = "2026年02月27日 14:30";

    // SVG parameters
    const circumference = 2 * Math.PI * 58; // r=58 -> 140px diameter approx
    const targetSystolic = 120; // 目标收缩压
    const currentSystolic = bpValue.systolic;
    const targetDiastolic = 80; // 目标舒张压
    const currentDiastolic = bpValue.diastolic;

    const systolicPercentage = Math.min((currentSystolic / 160) * 100, 100);
    const diastolicPercentage = Math.min((currentDiastolic / 120) * 100, 100);

    const systolicDashoffset = circumference - (systolicPercentage / 100) * circumference;
    const diastolicDashoffset = circumference - (diastolicPercentage / 100) * circumference;

    return (
        <DashboardLayout
            pageTitle="血压管理"
            pageSubtitle="2026年02月27日 星期四"
            headerActions={
                <>
                    <button className="header-btn header-btn-secondary" onClick={() => alert('导出血压报告')}>
                        <i className="fas fa-download"></i>
                        导出报告
                    </button>
                    <button className="header-btn header-btn-primary" onClick={() => alert('新建血压记录')}>
                        <i className="fas fa-plus"></i>
                        新建记录
                    </button>
                </>
            }
        >
            <div className="content">
                {/* 血压主卡片 */}
                <div className="bp-main-card fade-in">


                    {/* 双圆环区域 */}
                    <div className="dual-ring-container">
                        {/* 收缩压圆环 */}
                        <div className="ring-wrapper">
                            <div className="ring-label">收缩压 (高压)</div>
                            <div className="bp-ring">
                                <svg width="140" height="140" viewBox="0 0 140 140">
                                    <circle className="ring-bg" cx="70" cy="70" r="58"></circle>
                                    <circle className="ring-progress" cx="70" cy="70" r="58"
                                        stroke="#ef4444"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={systolicDashoffset}>
                                    </circle>
                                </svg>
                                <div className="ring-value">
                                    <div className="number">{bpValue.systolic}</div>
                                    <div className="unit">mmHg</div>
                                </div>
                            </div>
                        </div>

                        {/* 舒张压圆环 */}
                        <div className="ring-wrapper">
                            <div className="ring-label">舒张压 (低压)</div>
                            <div className="bp-ring">
                                <svg width="140" height="140" viewBox="0 0 140 140">
                                    <circle className="ring-bg" cx="70" cy="70" r="58"></circle>
                                    <circle className="ring-progress" cx="70" cy="70" r="58"
                                        stroke="#3b82f6"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={diastolicDashoffset}>
                                    </circle>
                                </svg>
                                <div className="ring-value">
                                    <div className="number">{bpValue.diastolic}</div>
                                    <div className="unit">mmHg</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 心率显示 */}
                    <div className="heart-rate-display">
                        <i className="fas fa-heartbeat"></i>
                        <span className="heart-rate-value">{heartRate}</span>
                        <span className="heart-rate-unit">次/分</span>
                    </div>

                    {/* 状态信息 */}
                    <div className="status-info">
                        <div className="status-item">
                            <i className="far fa-clock"></i>
                            <span>{measurementTime}</span>
                        </div>
                        <div className="status-item">
                            <div className="status-dot normal"></div>
                            <span>血压正常</span>
                        </div>
                    </div>
                </div>

                {/* 统计数据网格 */}
                <div className="stats-grid fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-arrow-up text-red-500"></i>
                            平均收缩压
                        </div>
                        <div className="stat-card-value">124 <span className="stat-card-unit">mmHg</span></div>
                        <div className="stat-card-trend down">
                            <i className="fas fa-arrow-down"></i> 较上周 -2%
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-arrow-down text-blue-500"></i>
                            平均舒张压
                        </div>
                        <div className="stat-card-value">82 <span className="stat-card-unit">mmHg</span></div>
                        <div className="stat-card-trend stable">
                            <i className="fas fa-minus"></i> 较上周持平
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-heartbeat text-pink-500"></i>
                            平均心率
                        </div>
                        <div className="stat-card-value">75 <span className="stat-card-unit">次/分</span></div>
                        <div className="stat-card-trend up">
                            <i className="fas fa-arrow-up"></i> 较上周 +3%
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-check-circle text-green-500"></i>
                            血压达标率
                        </div>
                        <div className="stat-card-value">85 <span className="stat-card-unit">%</span></div>
                        <div className="stat-card-trend up">
                            <i className="fas fa-arrow-up"></i> 较上周 +5%
                        </div>
                    </div>
                </div>

                {/* 参考范围 */}
                <div className="reference-card fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="reference-title">
                        <i className="fas fa-info-circle"></i>
                        血压参考范围
                    </div>
                    <div className="reference-items">
                        <div className="reference-item">
                            <div className="reference-label">正常血压</div>
                            <div className="reference-value">&lt;120/80 mmHg</div>
                        </div>
                        <div className="reference-item">
                            <div className="reference-label">正常高值</div>
                            <div className="reference-value">120-139/80-89 mmHg</div>
                        </div>
                        <div className="reference-item">
                            <div className="reference-label">高血压</div>
                            <div className="reference-value">≥140/90 mmHg</div>
                        </div>
                    </div>
                </div>

                {/* 操作按钮组 */}
                <div className="action-buttons fade-in" style={{ animationDelay: '0.3s' }}>
                    <button className="action-btn primary" onClick={() => alert('打开蓝牙血压计测量')}>
                        <i className="fab fa-bluetooth-b"></i>
                        设备测量
                    </button>
                    <button className="action-btn secondary" onClick={() => router.push('/blood-pressure-manual')}>
                        <i className="fas fa-edit"></i>
                        手动记录
                    </button>
                </div>

                {/* 近7天血压趋势图 */}
                <div className="chart-card fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="chart-card-header">
                        <h3 className="chart-card-title">近7天血压趋势</h3>
                        <div className="chart-tabs">
                            {['7天', '14天', '30天'].map(tab => (
                                <button
                                    key={tab}
                                    className={`chart-tab ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="chart-container">
                        <svg className="trend-chart" viewBox="0 0 800 250" preserveAspectRatio="xMidYMid meet">
                            {/* 网格线 */}
                            <line className="chart-grid-line" x1="60" y1="40" x2="780" y2="40" />
                            <line className="chart-grid-line" x1="60" y1="90" x2="780" y2="90" />
                            <line className="chart-grid-line" x1="60" y1="140" x2="780" y2="140" />
                            <line className="chart-grid-line" x1="60" y1="190" x2="780" y2="190" />

                            {/* Y轴标签 */}
                            <text className="chart-label" x="50" y="44" textAnchor="end">160</text>
                            <text className="chart-label" x="50" y="94" textAnchor="end">130</text>
                            <text className="chart-label" x="50" y="144" textAnchor="end">100</text>
                            <text className="chart-label" x="50" y="194" textAnchor="end">70</text>

                            {/* X轴标签 */}
                            <text className="chart-label" x="120" y="220" textAnchor="middle">周一</text>
                            <text className="chart-label" x="220" y="220" textAnchor="middle">周二</text>
                            <text className="chart-label" x="320" y="220" textAnchor="middle">周三</text>
                            <text className="chart-label" x="420" y="220" textAnchor="middle">周四</text>
                            <text className="chart-label" x="520" y="220" textAnchor="middle">周五</text>
                            <text className="chart-label" x="620" y="220" textAnchor="middle">周六</text>
                            <text className="chart-label" x="720" y="220" textAnchor="middle">周日</text>

                            {/* 收缩压区域 */}
                            <path className="chart-area systolic" d="M120,85 L220,75 L320,90 L420,70 L520,80 L620,65 L720,75 L720,140 L120,140 Z" />

                            {/* 舒张压区域 */}
                            <path className="chart-area diastolic" d="M120,155 L220,150 L320,160 L420,145 L520,155 L620,148 L720,152 L720,190 L120,190 Z" />

                            {/* 收缩压线 */}
                            <path className="chart-line systolic" d="M120,85 L220,75 L320,90 L420,70 L520,80 L620,65 L720,75" />

                            {/* 舒张压线 */}
                            <path className="chart-line diastolic" d="M120,155 L220,150 L320,160 L420,145 L520,155 L620,148 L720,152" />

                            {/* 收缩压点 */}
                            <circle className="chart-dot systolic" cx="120" cy="85" />
                            <circle className="chart-dot systolic" cx="220" cy="75" />
                            <circle className="chart-dot systolic" cx="320" cy="90" />
                            <circle className="chart-dot systolic" cx="420" cy="70" />
                            <circle className="chart-dot systolic" cx="520" cy="80" />
                            <circle className="chart-dot systolic" cx="620" cy="65" />
                            <circle className="chart-dot systolic" cx="720" cy="75" />

                            {/* 舒张压点 */}
                            <circle className="chart-dot diastolic" cx="120" cy="155" />
                            <circle className="chart-dot diastolic" cx="220" cy="150" />
                            <circle className="chart-dot diastolic" cx="320" cy="160" />
                            <circle className="chart-dot diastolic" cx="420" cy="145" />
                            <circle className="chart-dot diastolic" cx="520" cy="155" />
                            <circle className="chart-dot diastolic" cx="620" cy="148" />
                            <circle className="chart-dot diastolic" cx="720" cy="152" />
                        </svg>
                    </div>
                </div>

                {/* 历史记录 */}
                <div className="history-card fade-in" style={{ animationDelay: '0.5s' }}>
                    <div className="history-card-header">
                        <h3 className="history-card-title">最近记录</h3>
                        <a href="#" className="view-all-btn">
                            查看全部 <i className="fas fa-chevron-right"></i>
                        </a>
                    </div>
                    <div className="history-list">
                        <div className="history-item">
                            <div className="history-icon normal">
                                <i className="fas fa-heart"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">125/82 mmHg</div>
                                <div className="history-meta">心率：72次/分 · 正常</div>
                            </div>
                            <div className="history-time">今天 08:30</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon warning">
                                <i className="fas fa-heart"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">138/88 mmHg</div>
                                <div className="history-meta">心率：78次/分 · 正常高值</div>
                            </div>
                            <div className="history-time">昨天 20:15</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon normal">
                                <i className="fas fa-heart"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">122/80 mmHg</div>
                                <div className="history-meta">心率：70次/分 · 正常</div>
                            </div>
                            <div className="history-time">昨天 08:00</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon normal">
                                <i className="fas fa-heart"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">118/78 mmHg</div>
                                <div className="history-meta">心率：68次/分 · 正常</div>
                            </div>
                            <div className="history-time">前天 08:00</div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
