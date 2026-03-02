"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/blood-ketone-main.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BloodKetoneMainPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("7天");
    const [measureMode, setMeasureMode] = useState("设备测量");

    const bkValue = 0.8;
    const measurementTime = "今天 07:30";

    // SVG parameters
    const circumference = 2 * Math.PI * 72; // r=72
    const targetValue = 1.5; // 正常/关注边界
    // Visualization cap
    const visualizationValue = Math.min(bkValue, 4.0); // assume 4.0 is max for chart ring fill
    const percentage = Math.min((visualizationValue / 4.0) * 100, 100);
    const dashoffset = circumference - (percentage / 100) * circumference;

    return (
        <DashboardLayout
            pageTitle="血酮检测"
            pageSubtitle="监测血酮水平，预防糖尿病酮症酸中毒"
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
                {/* 血酮主卡片 */}
                <div className="bk-main-card fade-in">
                    <div className="bk-card-header">
                        <div>
                            <div className="bk-card-title">今日血酮</div>
                            <div className="bk-card-time">最后测量：{measurementTime}</div>
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
                    <div className="bk-center-content">
                        {/* 圆环显示 */}
                        <div className="ring-container">
                            <div className="bk-ring">
                                <svg viewBox="0 0 160 160">
                                    <circle className="ring-bg" cx="80" cy="80" r="72"></circle>
                                    <circle className="ring-progress" cx="80" cy="80" r="72"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashoffset}></circle>
                                </svg>
                                <div className="ring-value">
                                    <div className="number">{bkValue}</div>
                                    <div className="unit">mmol/L</div>
                                </div>
                            </div>
                        </div>

                        {/* 状态标签 */}
                        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <div className="status-badge">
                                <i className={`fas fa-${bkValue <= targetValue ? 'check-circle' : 'exclamation-triangle'}`}></i>
                                <span>{bkValue <= targetValue ? '血酮正常' : '血酮偏高'}</span>
                            </div>
                        </div>

                        {/* 状态信息 */}
                        <div className="status-info">
                            <div className="status-item">
                                <span className={`status-dot ${bkValue <= targetValue ? 'normal' : 'warning'}`}></span>
                                <span>{bkValue <= targetValue ? '低于1.5 mmol/L' : '高于1.5 mmol/L'}</span>
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
                        <div className="stat-card-value">0.7 <span className="stat-card-unit">mmol/L</span></div>
                        <div className="stat-card-trend stable">
                            <i className="fas fa-minus"></i> 较上周持平
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-arrow-up text-red-500"></i>
                            <span>最高值</span>
                        </div>
                        <div className="stat-card-value">1.2 <span className="stat-card-unit">mmol/L</span></div>
                        <div className="stat-card-trend">
                            <span style={{ color: 'var(--gray-400)' }}>近7天</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-arrow-down text-green-500"></i>
                            <span>最低值</span>
                        </div>
                        <div className="stat-card-value">0.5 <span className="stat-card-unit">mmol/L</span></div>
                        <div className="stat-card-trend">
                            <span style={{ color: 'var(--gray-400)' }}>近7天</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <i className="fas fa-check-circle text-purple-500"></i>
                            <span>达标率</span>
                        </div>
                        <div className="stat-card-value">100 <span className="stat-card-unit">%</span></div>
                        <div className="stat-card-trend down">
                            <i className="fas fa-check"></i> 全部达标
                        </div>
                    </div>
                </div>

                {/* 参考范围 */}
                <div className="reference-card fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="reference-title">
                        <i className="fas fa-info-circle"></i>
                        血酮参考范围
                    </div>
                    <div className="reference-items">
                        <div className="reference-item">
                            <div className="reference-label">正常</div>
                            <div className="reference-value" style={{ color: '#16a34a' }}>&lt;0.6 mmol/L</div>
                        </div>
                        <div className="reference-item">
                            <div className="reference-label">轻度升高</div>
                            <div className="reference-value" style={{ color: '#ca8a04' }}>0.6-1.5 mmol/L</div>
                        </div>
                        <div className="reference-item">
                            <div className="reference-label">酮症风险</div>
                            <div className="reference-value" style={{ color: '#ea580c' }}>1.5-3.0 mmol/L</div>
                        </div>
                        <div className="reference-item">
                            <div className="reference-label">酮症酸中毒</div>
                            <div className="reference-value" style={{ color: '#dc2626' }}>&gt;3.0 mmol/L</div>
                        </div>
                    </div>
                </div>

                {/* 警告提示 */}
                <div className="warning-card fade-in" style={{ animationDelay: '0.3s' }}>
                    <div className="warning-title">
                        <i className="fas fa-exclamation-triangle"></i>
                        注意事项
                    </div>
                    <div className="warning-content">
                        当血酮值超过3.0 mmol/L时，可能发生糖尿病酮症酸中毒（DKA），这是一种严重的急性并发症，需要立即就医。如果您出现恶心、呕吐、腹痛、呼吸急促等症状，请立即测量血糖和血酮，并及时就医。
                    </div>
                </div>

                {/* 操作按钮 */}
                <div className="action-buttons fade-in" style={{ animationDelay: '0.4s' }}>
                    <button className="action-btn primary" onClick={() => alert('设备测量')}>
                        <i className="fas fa-burn"></i>
                        设备测量
                    </button>
                    <button className="action-btn secondary" onClick={() => router.push('/blood-ketone-manual')}>
                        <i className="fas fa-edit"></i>
                        手动记录
                    </button>
                </div>

                {/* 趋势图表 */}
                <div className="chart-card fade-in" style={{ animationDelay: '0.5s' }}>
                    <div className="chart-card-header">
                        <h3 className="chart-card-title">近7天血酮趋势</h3>
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

                            {/* 警戒线 (1.5) -> corresponds to y1=90 in prototype */}
                            <line className="reference-line-danger" x1="60" y1="90" x2="780" y2="90" />

                            {/* Y轴标签 */}
                            <text className="chart-label" x="50" y="44" textAnchor="end">3.0</text>
                            <text className="chart-label" x="50" y="94" textAnchor="end">1.5</text>
                            <text className="chart-label" x="50" y="144" textAnchor="end">1.0</text>
                            <text className="chart-label" x="50" y="194" textAnchor="end">0.5</text>

                            {/* X轴标签 */}
                            <text className="chart-label" x="120" y="220" textAnchor="middle">周一</text>
                            <text className="chart-label" x="220" y="220" textAnchor="middle">周二</text>
                            <text className="chart-label" x="320" y="220" textAnchor="middle">周三</text>
                            <text className="chart-label" x="420" y="220" textAnchor="middle">周四</text>
                            <text className="chart-label" x="520" y="220" textAnchor="middle">周五</text>
                            <text className="chart-label" x="620" y="220" textAnchor="middle">周六</text>
                            <text className="chart-label" x="720" y="220" textAnchor="middle">周日</text>

                            {/* 面积图 */}
                            <path className="chart-area" d="M120,175 L220,165 L320,180 L420,155 L520,170 L620,160 L720,168 L720,200 L120,200 Z" />

                            {/* 折线 */}
                            <path className="chart-line" d="M120,175 L220,165 L320,180 L420,155 L520,170 L620,160 L720,168" />

                            {/* 数据点 */}
                            <circle className="chart-dot" cx="120" cy="175" />
                            <circle className="chart-dot" cx="220" cy="165" />
                            <circle className="chart-dot" cx="320" cy="180" />
                            <circle className="chart-dot" cx="420" cy="155" />
                            <circle className="chart-dot" cx="520" cy="170" />
                            <circle className="chart-dot" cx="620" cy="160" />
                            <circle className="chart-dot" cx="720" cy="168" />
                        </svg>
                    </div>
                    <div className="chart-legend">
                        <div className="legend-item">
                            <span className="legend-dot" style={{ background: '#a855f7' }}></span>
                            <span>血酮值</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-line" style={{ background: '#ef4444' }}></span>
                            <span>警戒线 1.5 mmol/L</span>
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
                                <i className="fas fa-burn"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">0.8 mmol/L</div>
                                <div className="history-meta">正常 · 低于1.5 mmol/L</div>
                            </div>
                            <div className="history-time">今天 07:30</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon normal">
                                <i className="fas fa-burn"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">0.7 mmol/L</div>
                                <div className="history-meta">正常 · 低于1.5 mmol/L</div>
                            </div>
                            <div className="history-time">昨天 07:45</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon warning">
                                <i className="fas fa-burn"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">1.2 mmol/L</div>
                                <div className="history-meta">轻度偏高 · 建议关注</div>
                            </div>
                            <div className="history-time">前天 08:00</div>
                        </div>
                        <div className="history-item">
                            <div className="history-icon normal">
                                <i className="fas fa-burn"></i>
                            </div>
                            <div className="history-content">
                                <div className="history-value">0.6 mmol/L</div>
                                <div className="history-meta">正常 · 低于1.5 mmol/L</div>
                            </div>
                            <div className="history-time">3天前 07:30</div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
