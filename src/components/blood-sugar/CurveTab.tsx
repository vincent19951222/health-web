"use client";

import { useState } from "react";
import DateSelector from "./DateSelector";

export default function CurveTab() {
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
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon blue"><i className="fas fa-vial"></i></div>
                    </div>
                    <div className="stat-card-value">28</div>
                    <div className="stat-card-label">测量次数</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon green"><i className="fas fa-check-circle"></i></div>
                    </div>
                    <div className="stat-card-value">23</div>
                    <div className="stat-card-label">正常次数</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon red"><i className="fas fa-arrow-up"></i></div>
                    </div>
                    <div className="stat-card-value">3</div>
                    <div className="stat-card-label">偏高次数</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon orange"><i className="fas fa-arrow-down"></i></div>
                    </div>
                    <div className="stat-card-value">2</div>
                    <div className="stat-card-label">偏低次数</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon purple"><i className="fas fa-percentage"></i></div>
                    </div>
                    <div className="stat-card-value">82%</div>
                    <div className="stat-card-label">正常比例</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon blue"><i className="fas fa-chart-line"></i></div>
                    </div>
                    <div className="stat-card-value">5.8</div>
                    <div className="stat-card-label">最低血糖</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon red"><i className="fas fa-chart-line"></i></div>
                    </div>
                    <div className="stat-card-value">8.1</div>
                    <div className="stat-card-label">最高血糖</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon green"><i className="fas fa-calculator"></i></div>
                    </div>
                    <div className="stat-card-value">6.6</div>
                    <div className="stat-card-label">平均血糖</div>
                </div>
            </div>

            {/* 趋势图表 */}
            <div className="chart-card">
                <div className="chart-header">
                    <h4 className="chart-title">今日血糖趋势</h4>
                    <div className="chart-legend">
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: "#10b981" }}></span>
                            达标范围 (4.4-10.0)
                        </div>
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: "#3b82f6" }}></span>
                            血糖值
                        </div>
                    </div>
                </div>
                <div className="chart-container">
                    <div className="chart-y-axis">
                        <span>20</span>
                        <span>15</span>
                        <span>10</span>
                        <span>5</span>
                        <span>0</span>
                    </div>
                    <div className="chart-area">
                        <svg width="100%" height="100%" viewBox="0 0 700 250" preserveAspectRatio="none">
                            {/* 标准范围区域 */}
                            <rect x="0" y="75" width="700" height="88" fill="#10b981" fillOpacity="0.1"></rect>

                            {/* 网格线 */}
                            <line x1="0" y1="0" x2="700" y2="0" stroke="#e5e7eb" strokeWidth="1"></line>
                            <line x1="0" y1="50" x2="700" y2="50" stroke="#e5e7eb" strokeWidth="1"></line>
                            <line x1="0" y1="100" x2="700" y2="100" stroke="#e5e7eb" strokeWidth="1"></line>
                            <line x1="0" y1="150" x2="700" y2="150" stroke="#e5e7eb" strokeWidth="1"></line>
                            <line x1="0" y1="200" x2="700" y2="200" stroke="#e5e7eb" strokeWidth="1"></line>
                            <line x1="0" y1="250" x2="700" y2="250" stroke="#e5e7eb" strokeWidth="1"></line>

                            {/* 标准范围界限线 */}
                            <line x1="0" y1="75" x2="700" y2="75" stroke="#10b981" strokeWidth="1" strokeDasharray="5,5" opacity="0.5"></line>
                            <line x1="0" y1="163" x2="700" y2="163" stroke="#10b981" strokeWidth="1" strokeDasharray="5,5" opacity="0.5"></line>

                            {/* 渐变定义 */}
                            <defs>
                                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"></stop>
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>

                            {/* 趋势区域 */}
                            <path d="M0,140 Q50,120 100,130 T200,110 T300,125 T400,95 T500,115 T600,100 T700,90 L700,250 L0,250 Z"
                                fill="url(#areaGradient)"></path>

                            {/* 趋势线 */}
                            <path d="M0,140 Q50,120 100,130 T200,110 T300,125 T400,95 T500,115 T600,100 T700,90"
                                fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"></path>

                            {/* 数据点 */}
                            <circle cx="0" cy="140" r="5" fill="white" stroke="#f97316" strokeWidth="2"></circle>
                            <circle cx="100" cy="130" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                            <circle cx="200" cy="110" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                            <circle cx="300" cy="125" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                            <circle cx="400" cy="95" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                            <circle cx="500" cy="115" r="5" fill="white" stroke="#f59e0b" strokeWidth="2"></circle>
                            <circle cx="600" cy="100" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                            <circle cx="700" cy="90" r="6" fill="#3b82f6" stroke="white" strokeWidth="2"></circle>
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
