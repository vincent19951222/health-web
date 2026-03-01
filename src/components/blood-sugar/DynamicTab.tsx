"use client";

import { useState } from "react";
import DateSelector from "./DateSelector";

export default function DynamicTab() {
    const [dateDisplay, setDateDisplay] = useState("2026年02月27日");
    const [activeRangeTab, setActiveRangeTab] = useState<"day" | "week" | "month">("day");

    // Mock functions for date navigation
    const handlePrevious = () => setDateDisplay("2026年02月26日");
    const handleNext = () => setDateDisplay("2026年02月28日");

    return (
        <div className="tab-content active fade-in">
            {/* 日期选择器 */}
            <DateSelector
                dateDisplay={dateDisplay}
                onPrevious={handlePrevious}
                onNext={handleNext}
                showRangeTabs={true}
                activeRangeTab={activeRangeTab}
                onRangeChange={setActiveRangeTab}
            />

            {/* 统计卡片 */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon green"><i className="fas fa-chart-bar"></i></div>
                    </div>
                    <div className="stat-card-value">6.6</div>
                    <div className="stat-card-label">平均值</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon red"><i className="fas fa-arrow-up"></i></div>
                    </div>
                    <div className="stat-card-value">8.1</div>
                    <div className="stat-card-label">最高值</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon blue"><i className="fas fa-arrow-down"></i></div>
                    </div>
                    <div className="stat-card-value">5.8</div>
                    <div className="stat-card-label">最低值</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon purple"><i className="fas fa-bullseye"></i></div>
                    </div>
                    <div className="stat-card-value">82%</div>
                    <div className="stat-card-label">目标范围时间</div>
                </div>
            </div>

            {/* 趋势图表 */}
            <div className="chart-card">
                <div className="chart-header">
                    <h4 className="chart-title">CGM动态血糖趋势</h4>
                    <div className="chart-legend">
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: "#10b981" }}></span>
                            目标范围 (4.0-10.0)
                        </div>
                    </div>
                </div>
                <div className="chart-container">
                    <div className="chart-y-axis">
                        <span>15</span>
                        <span>10</span>
                        <span>5</span>
                        <span>0</span>
                    </div>
                    <div className="chart-area">
                        <svg width="100%" height="100%" viewBox="0 0 700 250" preserveAspectRatio="none">
                            {/* 标准范围区域 */}
                            <rect x="0" y="50" width="700" height="117" fill="#10b981" fillOpacity="0.1"></rect>

                            {/* 网格线 */}
                            <line x1="0" y1="0" x2="700" y2="0" stroke="#e5e7eb" strokeWidth="1"></line>
                            <line x1="0" y1="62.5" x2="700" y2="62.5" stroke="#e5e7eb" strokeWidth="1"></line>
                            <line x1="0" y1="125" x2="700" y2="125" stroke="#e5e7eb" strokeWidth="1"></line>
                            <line x1="0" y1="187.5" x2="700" y2="187.5" stroke="#e5e7eb" strokeWidth="1"></line>
                            <line x1="0" y1="250" x2="700" y2="250" stroke="#e5e7eb" strokeWidth="1"></line>

                            {/* 动态曲线 - 更平滑 */}
                            <path d="M0,130 C30,125 60,115 100,120 C140,125 180,100 220,105 C260,110 300,95 340,100 C380,105 420,90 460,95 C500,100 540,85 580,90 C620,95 660,80 700,85"
                                fill="none" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round"></path>

                            {/* 数据点 */}
                            <circle cx="100" cy="120" r="4" fill="#0891b2"></circle>
                            <circle cx="220" cy="105" r="4" fill="#0891b2"></circle>
                            <circle cx="340" cy="100" r="4" fill="#0891b2"></circle>
                            <circle cx="460" cy="95" r="4" fill="#0891b2"></circle>
                            <circle cx="580" cy="90" r="4" fill="#0891b2"></circle>
                            <circle cx="700" cy="85" r="5" fill="#0891b2" stroke="white" strokeWidth="2"></circle>
                        </svg>
                    </div>
                    <div className="chart-x-axis">
                        <span>00:00</span>
                        <span>04:00</span>
                        <span>08:00</span>
                        <span>12:00</span>
                        <span>16:00</span>
                        <span>20:00</span>
                        <span>24:00</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
