"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/uric-acid-main.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UricAcidMainPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("7天");
    const [measureMode, setMeasureMode] = useState("设备测量");

    const uaValue = 368;
    const measurementTime = "今天 07:30";

    // SVG parameters
    const circumference = 2 * Math.PI * 72; // r=72
    const targetValue = 420; // 正常上限
    // Visualization cap
    const visualizationValue = Math.min(uaValue, 600);
    const percentage = Math.min((visualizationValue / 600) * 100, 100);
    const dashoffset = circumference - (percentage / 100) * circumference;

    return (
        <DashboardLayout
            pageTitle="尿酸检测"
            pageSubtitle="监测尿酸水平，预防痛风风险"
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
                {/* 尿酸主卡片 */}
                <div className="ua-main-card fade-in">
                    <div className="ua-card-header">
                        <div>
                            <div className="ua-card-title">今日尿酸</div>
                            <div className="ua-card-time">最后测量：{measurementTime}</div>
                        </div>
                        <div className="mode-toggle">
                            <button
                                className={`mode-btn ${measureMode === '设备测量' ? 'active' : ''}`}
                                onClick={() => setMeasureMode('设备测量')}
                            >设备测量</button>
                            <button
                                className={`mode-btn ${measureMode === '手动记录' ? 'active' : ''}`}
                                onClick={() => setMeasureMode('手动记录')}
                            >手动记录</button>
                        </div>
                    </div>

                    {/* 居中内容区 */}
                    <div className="ua-center-content">
                        {/* 圆环显示 */}
                        <div className="ring-container">
                            <div className="ua-ring">
                                <svg viewBox="0 0 160 160">
                                    <circle className="ring-bg" cx="80" cy="80" r="72"></circle>
                                    <circle className="ring-progress" cx="80" cy="80" r="72"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashoffset}></circle>
                                </svg>
                                <div className="ring-value">
                                    <div className="number">{uaValue}</div>
                                    <div className="unit">μmol/L</div>
                                </div>
                            </div>
                        </div>

                        {/* 性别参考 */}
                        <div className="gender-reference">
                            <div className="gender-item">
                                <i className="fas fa-mars" style={{ color: '#93c5fd' }}></i>
                                <span>男性正常：150-416 μmol/L</span>
                            </div>
                            <div className="gender-item">
                                <i className="fas fa-venus" style={{ color: '#f9a8d4' }}></i>
                                <span>女性正常：89-357 μmol/L</span>
                            </div>
                        </div>

                        {/* 状态信息 */}
                        <div className="status-info">
                            <div className="status-item">
                                <span className={`status-dot ${uaValue <= targetValue ? 'normal' : 'danger'}`}></span>
                                <span>{uaValue <= targetValue ? '尿酸正常' : '偏高'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 统计网格 */}
                <div className="stats-grid fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-chart-line text-blue-500"></i>
                            <span>7日平均</span>
                        </div>
                        <div className="stat-card-value">375 <span className="stat-card-unit">μmol/L</span></div>
                        <div className="stat-card-trend stable">
                            <i className="fas fa-minus"></i> 较上周持平
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-arrow-up text-red-500"></i>
                            <span>最高值</span>
                        </div>
                        <div className="stat-card-value">398 <span className="stat-card-unit">μmol/L</span></div>
                        <div className="stat-card-trend">
                            <span style={{ color: 'var(--gray-400)' }}>近7天</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-arrow-down text-green-500"></i>
                            <span>最低值</span>
                        </div>
                        <div className="stat-card-value">352 <span className="stat-card-unit">μmol/L</span></div>
                        <div className="stat-card-trend">
                            <span style={{ color: 'var(--gray-400)' }}>近7天</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-check-circle text-purple-500"></i>
                            <span>达标率</span>
                        </div>
                        <div className="stat-card-value">92 <span className="stat-card-unit">%</span></div>
                        <div className="stat-card-trend down">
                            <i className="fas fa-arrow-up"></i> 较上周 +3%
                        </div>
                    </div>
                </div>

                {/* 参考范围 */}
                <div className="reference-card fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="reference-title">
                        <i className="fas fa-info-circle"></i>
                        尿酸参考范围
                    </div>
                    <div className="reference-items">
                        <div className="reference-item">
                            <div className="reference-label">正常范围</div>
                            <div className="reference-value" style={{ color: '#16a34a' }}>150-416 μmol/L</div>
                        </div>
                        <div className="reference-item">
                            <div className="reference-label">偏高</div>
                            <div className="reference-value" style={{ color: '#dc2626' }}>&gt;420 μmol/L</div>
                        </div>
                        <div className="reference-item">
                            <div className="reference-label">痛风风险</div>
                            <div className="reference-value" style={{ color: '#dc2626' }}>&gt;480 μmol/L</div>
                        </div>
                    </div>
                </div>

                {/* 健康提示 */}
                <div className="tips-card fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="tips-title">
                        <i className="fas fa-lightbulb"></i>
                        健康提示
                    </div>
                    <ul className="tips-list">
                        <li>• 多喝水，每天至少2000ml，促进尿酸排泄</li>
                        <li>• 限制高嘌呤食物：动物内脏、海鲜、浓肉汤等</li>
                        <li>• 适量运动，控制体重，避免过度劳累</li>
                        <li>• 限制饮酒，特别是啤酒和白酒</li>
                    </ul>
                </div>

                {/* 操作按钮 */}
                <div className="action-buttons fade-in" style={{ animationDelay: '0.4s' }}>
                    <button className="action-btn primary" onClick={() => alert('设备测量')}>
                        <i className="fas fa-flask"></i>
                        设备测量
                    </button>
                    <button className="action-btn secondary" onClick={() => router.push('/uric-acid-manual')}>
                        <i className="fas fa-edit"></i>
                        手动记录
                    </button>
                </div>

                {/* 趋势图表 */}
                <div className="chart-card fade-in" style={{ animationDelay: '0.5s' }}>
                    <div className="chart-card-header">
                        <h3 className="chart-card-title">近7天尿酸趋势</h3>
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

                            {/* 参考线 (正常上限 416) => visual position at y=80 corresponds to roughly 448 approx. Let's match original graphic y1=80 */}
                            <line className="reference-line-upper" x1="60" y1="80" x2="780" y2="80" />

                            {/* Y轴标签 */}
                            <text className="chart-label" x="50" y="44" textAnchor="end">500</text>
                            <text className="chart-label" x="50" y="94" textAnchor="end">420</text>
                            <text className="chart-label" x="50" y="144" textAnchor="end">350</text>
                            <text className="chart-label" x="50" y="194" textAnchor="end">280</text>

                            {/* X轴标签 */}
                            <text className="chart-label" x="120" y="220" textAnchor="middle">周一</text>
                            <text className="chart-label" x="220" y="220" textAnchor="middle">周二</text>
                            <text className="chart-label" x="320" y="220" textAnchor="middle">周三</text>
                            <text className="chart-label" x="420" y="220" textAnchor="middle">周四</text>
                            <text className="chart-label" x="520" y="220" textAnchor="middle">周五</text>
                            <text className="chart-label" x="620" y="220" textAnchor="middle">周六</text>
                            <text className="chart-label" x="720" y="220" textAnchor="middle">周日</text>

                            {/* 面积图 */}
                            <path className="chart-area" d="M120,150 L220,140 L320,160 L420,135 L520,145 L620,130 L720,140 L720,200 L120,200 Z" />

                            {/* 折线 */}
                            <path className="chart-line" d="M120,150 L220,140 L320,160 L420,135 L520,145 L620,130 L720,140" />

                            {/* 数据点 */}
                            <circle className="chart-dot" cx="120" cy="150" />
                            <circle className="chart-dot" cx="220" cy="140" />
                            <circle className="chart-dot" cx="320" cy="160" />
                            <circle className="chart-dot" cx="420" cy="135" />
                            <circle className="chart-dot" cx="520" cy="145" />
                            <circle className="chart-dot" cx="620" cy="130" />
                            <circle className="chart-dot" cx="720" cy="140" />
                        </svg>
                    </div>
                    <div className="chart-legend">
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: '#6366f1' }}></span>
                            <span>尿酸值</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-line" style={{ background: '#f59e0b' }}></span>
                            <span>正常上限 420 μmol/L</span>
                        </div>
                    </div>
                </div>

                {/* 历史记录 */}
                <div className="history-card fade-in" style={{ animationDelay: '0.6s' }}>
                    <div className="history-card-header">
                        <h3 className="history-card-title">最近记录</h3>
                        <a href="#" className="view-all-btn">
                            查看全部 <i className="fas fa-chevron-right"></i>
                        </a>
                    </div>
                    <div className="history-list">
                        <div className="history-item">
                            <div className="history-icon normal">
                                <i className="fas fa-flask"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">368 μmol/L</div>
                                <div className="history-meta">正常 · 低于420 μmol/L</div>
                            </div>
                            <div className="history-time">今天 07:30</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon normal">
                                <i className="fas fa-flask"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">375 μmol/L</div>
                                <div className="history-meta">正常 · 低于420 μmol/L</div>
                            </div>
                            <div className="history-time">昨天 07:45</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon warning">
                                <i className="fas fa-flask"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">425 μmol/L</div>
                                <div className="history-meta">偏高 · 超过正常范围</div>
                            </div>
                            <div className="history-time">前天 08:00</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon normal">
                                <i className="fas fa-flask"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">398 μmol/L</div>
                                <div className="history-meta">正常 · 低于420 μmol/L</div>
                            </div>
                            <div className="history-time">3天前 07:30</div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
