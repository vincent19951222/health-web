"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/glycated-main.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GlycatedMainPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("6个月");

    const ghbValue = 6.8;
    const measurementTime = "2026年2月15日";

    // SVG parameters
    const circumference = 2 * Math.PI * 72; // r=72
    const targetValue = 7.0; // 目标值
    // If value > 14 (extreme high limit for visualization), cap it at 14 to not break ring
    const visualizationValue = Math.min(ghbValue, 14);
    // Let's say max visualization is 14%
    const percentage = Math.min((visualizationValue / 14) * 100, 100);
    const dashoffset = circumference - (percentage / 100) * circumference;

    return (
        <DashboardLayout
            pageTitle="糖化血红蛋白"
            pageSubtitle="反映近2-3个月血糖控制水平的金标准"
            headerActions={
                <>
                    <button className="header-btn header-btn-secondary" onClick={() => alert('导出报告')}>
                        <i className="fas fa-download"></i>
                        导出报告
                    </button>
                    <button className="header-btn header-btn-primary" onClick={() => alert('新建记录')}>
                        <i className="fas fa-plus"></i>
                        新建记录
                    </button>
                </>
            }
        >
            <div className="content">
                {/* 糖化血红蛋白主卡片 */}
                <div className="ghb-main-card fade-in">
                    <div className="ghb-card-header">
                        <div>
                            <div className="ghb-card-title">最近检测结果</div>
                            <div className="ghb-card-time">检测日期：{measurementTime}</div>
                        </div>
                    </div>

                    {/* 居中内容区 */}
                    <div className="ghb-center-content">
                        {/* 圆环显示 */}
                        <div className="ring-container">
                            <div className="ghb-ring">
                                <svg viewBox="0 0 160 160">
                                    <circle className="ring-bg" cx="80" cy="80" r="72"></circle>
                                    <circle className="ring-progress" cx="80" cy="80" r="72"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashoffset}></circle>
                                </svg>
                                <div className="ring-value">
                                    <div className="number">{ghbValue.toFixed(1)}</div>
                                    <div className="unit">% HbA1c</div>
                                </div>
                            </div>
                        </div>

                        {/* 推荐范围 */}
                        <div className="recommended-range">
                            <i className="fas fa-lightbulb"></i>
                            <span>推荐目标：&lt;{targetValue.toFixed(1)}%</span>
                        </div>

                        {/* 状态信息 */}
                        <div className="status-info">
                            <div className="status-item">
                                <span className={`status-dot ${ghbValue < targetValue ? 'normal' : 'danger'}`}></span>
                                <span>{ghbValue < targetValue ? '达标良好' : '未达标'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 统计网格 */}
                <div className="stats-grid fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-chart-line text-blue-500"></i>
                            <span>3个月平均</span>
                        </div>
                        <div className="stat-card-value">6.9 <span className="stat-card-unit">%</span></div>
                        <div className="stat-card-trend down">
                            <i className="fas fa-arrow-down"></i> 较上次 -0.2
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-arrow-up text-red-500"></i>
                            <span>最高值</span>
                        </div>
                        <div className="stat-card-value">7.4 <span className="stat-card-unit">%</span></div>
                        <div className="stat-card-trend">
                            <span style={{ color: 'var(--gray-400)' }}>近6个月</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-arrow-down text-green-500"></i>
                            <span>最低值</span>
                        </div>
                        <div className="stat-card-value">6.5 <span className="stat-card-unit">%</span></div>
                        <div className="stat-card-trend">
                            <span style={{ color: 'var(--gray-400)' }}>近6个月</span>
                        </div>
                    </div>
                </div>

                {/* 参考范围 */}
                <div className="reference-card fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="reference-title">
                        <i className="fas fa-info-circle"></i>
                        糖化血红蛋白参考范围
                    </div>
                    <div className="reference-items">
                        <div className="reference-item">
                            <div className="reference-label">正常</div>
                            <div className="reference-value" style={{ color: '#16a34a' }}>4.0% - 5.6%</div>
                        </div>
                        <div className="reference-item">
                            <div className="reference-label">糖尿病前期</div>
                            <div className="reference-value" style={{ color: '#ca8a04' }}>5.7% - 6.4%</div>
                        </div>
                        <div className="reference-item">
                            <div className="reference-label">糖尿病</div>
                            <div className="reference-value" style={{ color: '#dc2626' }}>≥6.5%</div>
                        </div>
                        <div className="reference-item">
                            <div className="reference-label">控制目标</div>
                            <div className="reference-value" style={{ color: '#7c3aed' }}>&lt;7.0%</div>
                        </div>
                    </div>
                </div>

                {/* 知识卡片 */}
                <div className="knowledge-card fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="knowledge-title">
                        <i className="fas fa-book-open"></i>
                        健康知识
                    </div>
                    <div className="knowledge-content">
                        糖化血红蛋白（HbA1c）是血液中葡萄糖与血红蛋白结合的产物，能反映近2-3个月的平均血糖水平。与空腹血糖和餐后血糖不同，HbA1c不受短期饮食、运动等因素影响，是评估长期血糖控制状况的"金标准"。建议每3-6个月检测一次。
                    </div>
                </div>

                {/* 操作按钮 */}
                <div className="action-buttons fade-in" style={{ animationDelay: '0.4s' }}>
                    <button className="action-btn primary" onClick={() => router.push('/glycated-manual')}>
                        <i className="fas fa-edit"></i>
                        手动记录
                    </button>
                    <button className="action-btn secondary" onClick={() => alert('查看历史图表详情')}>
                        <i className="fas fa-history"></i>
                        查看历史
                    </button>
                </div>

                {/* 趋势图表 */}
                <div className="chart-card fade-in" style={{ animationDelay: '0.5s' }}>
                    <div className="chart-card-header">
                        <h3 className="chart-card-title">近6个月趋势</h3>
                        <div className="chart-tabs">
                            {['3个月', '6个月', '1年'].map(tab => (
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

                            {/* 参考线 (7.0%) */}
                            <line className="reference-line" x1="60" y1="140" x2="780" y2="140" />

                            {/* Y轴标签 */}
                            <text className="chart-label" x="50" y="44" textAnchor="end">9.0%</text>
                            <text className="chart-label" x="50" y="94" textAnchor="end">8.0%</text>
                            <text className="chart-label" x="50" y="144" textAnchor="end">7.0%</text>
                            <text className="chart-label" x="50" y="194" textAnchor="end">6.0%</text>

                            {/* X轴标签 */}
                            <text className="chart-label" x="120" y="220" textAnchor="middle">9月</text>
                            <text className="chart-label" x="240" y="220" textAnchor="middle">10月</text>
                            <text className="chart-label" x="360" y="220" textAnchor="middle">11月</text>
                            <text className="chart-label" x="480" y="220" textAnchor="middle">12月</text>
                            <text className="chart-label" x="600" y="220" textAnchor="middle">1月</text>
                            <text className="chart-label" x="720" y="220" textAnchor="middle">2月</text>

                            {/* 面积图 */}
                            <path className="chart-area" d="M120,130 L240,115 L360,125 L480,100 L600,110 L720,115 L720,200 L120,200 Z" />

                            {/* 折线 */}
                            <path className="chart-line" d="M120,130 L240,115 L360,125 L480,100 L600,110 L720,115" />

                            {/* 数据点 */}
                            <circle className="chart-dot" cx="120" cy="130" />
                            <circle className="chart-dot" cx="240" cy="115" />
                            <circle className="chart-dot" cx="360" cy="125" />
                            <circle className="chart-dot" cx="480" cy="100" />
                            <circle className="chart-dot" cx="600" cy="110" />
                            <circle className="chart-dot" cx="720" cy="115" />
                        </svg>
                    </div>
                    <div className="chart-legend">
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: '#8b5cf6' }}></span>
                            <span>糖化血红蛋白</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-line"></span>
                            <span>目标值 7.0%</span>
                        </div>
                    </div>
                </div>

                {/* 历史记录 */}
                <div className="history-card fade-in" style={{ animationDelay: '0.6s' }}>
                    <div className="history-card-header">
                        <h3 className="history-card-title">检测记录</h3>
                        <a href="#" className="view-all-btn">
                            查看全部 <i className="fas fa-chevron-right"></i>
                        </a>
                    </div>
                    <div className="history-list">
                        <div className="history-item">
                            <div className="history-icon good">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">6.8%</div>
                                <div className="history-meta">达标良好 · 控制目标 &lt;7.0%</div>
                            </div>
                            <div className="history-time">2026年2月15日</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon good">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">7.0%</div>
                                <div className="history-meta">达标 · 控制目标 &lt;7.0%</div>
                            </div>
                            <div className="history-time">2026年1月10日</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon warning">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">7.4%</div>
                                <div className="history-meta">偏高 · 建议加强控制</div>
                            </div>
                            <div className="history-time">2025年12月8日</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon good">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">6.9%</div>
                                <div className="history-meta">达标良好 · 控制目标 &lt;7.0%</div>
                            </div>
                            <div className="history-time">2025年11月5日</div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
