"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/blood-sugar-main.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BloodSugarMainPage() {
    const router = useRouter();
    const [isCGMMode, setIsCGMMode] = useState(true);
    const [activePeriod, setActivePeriod] = useState("当前");

    const toggleBloodSugarMode = () => {
        setIsCGMMode(!isCGMMode);
    };

    const handlePeriodChange = (period: string) => {
        setActivePeriod(period);
    };

    const rangeMap: Record<string, string> = {
        '空腹': '4.4-6.1 mmol/L',
        '早餐后': '4.0-10.0 mmol/L',
        '午餐前': '4.4-6.1 mmol/L',
        '午餐后': '4.0-10.0 mmol/L',
        '当前': '4.0-10.0 mmol/L'
    };

    const recommendedRange = rangeMap[activePeriod] || '4.0-10.0 mmol/L';
    const glucoseValue = isCGMMode ? 6.8 : 6.2;
    const glucoseModeText = isCGMMode ? "CGM" : "指血";
    const modeIndicatorText = isCGMMode ? "CGM动态监测中" : "指血测量模式";
    const toggleButtonText = isCGMMode ? "切换指血模式" : "切换CGM模式";

    // Style bindings for circle
    const strokeColor = isCGMMode ? "#10b981" : "#f97316";
    const strokeDashoffset = isCGMMode ? "100" : "200";

    return (
        <DashboardLayout
            pageTitle="血糖管理"
            pageSubtitle="2026年02月27日 星期四"
            headerActions={
                <>
                    <button className="header-btn header-btn-secondary" onClick={() => alert('导出血糖报告')}>
                        <i className="fas fa-download"></i>
                        导出报告
                    </button>
                    <button className="header-btn header-btn-primary" onClick={() => alert('新建血糖记录')}>
                        <i className="fas fa-plus"></i>
                        新建记录
                    </button>
                </>
            }
        >
            <div className="content">
                {/* 血糖主卡片 */}
                <div className="blood-sugar-main-card fade-in">
                    {/* 顶部控制栏 */}
                    <div className="card-top-controls">
                        {/* 模式切换按钮 */}
                        <button className="control-btn" onClick={toggleBloodSugarMode}>
                            <i className="fas fa-exchange-alt"></i>
                            <span>{toggleButtonText}</span>
                        </button>

                        {/* 数据统计按钮 */}
                        <button className="control-btn primary" onClick={() => router.push('/blood-sugar/analysis')}>
                            <i className="fas fa-chart-bar"></i>
                            <span>数据统计</span>
                        </button>
                    </div>

                    {/* 模式指示器 */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <div className="mode-indicator">
                            <span className="mode-dot"></span>
                            <span>{modeIndicatorText}</span>
                        </div>
                    </div>

                    {/* 时间段选择器 */}
                    <div className="time-period-selector">
                        {['空腹', '早餐后', '午餐前', '午餐后', '当前'].map(period => (
                            <button
                                key={period}
                                className={`time-period-btn ${activePeriod === period ? 'active' : ''}`}
                                onClick={() => handlePeriodChange(period)}
                            >
                                {period}
                            </button>
                        ))}
                    </div>

                    {/* 血糖圆环区域 */}
                    <div className="glucose-ring-section">
                        <div className="glucose-ring-container">
                            <div className="glucose-ring">
                                <svg width="200" height="200" viewBox="0 0 200 200">
                                    <circle className="ring-bg" cx="100" cy="100" r="80"></circle>
                                    <circle className="ring-progress" cx="100" cy="100" r="80"
                                        stroke={strokeColor}
                                        strokeDasharray="502.4"
                                        strokeDashoffset={strokeDashoffset}>
                                    </circle>
                                </svg>
                                <div className="ring-center">
                                    <div className="ring-value">{glucoseValue.toFixed(1)}</div>
                                    <div className="ring-unit">mmol/L</div>
                                    <div className="ring-label">{glucoseModeText}</div>
                                </div>
                            </div>
                        </div>

                        {/* 状态信息 */}
                        <div className="status-info">
                            <div className="status-item">
                                <div className="status-icon">
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                                <div className="status-text">
                                    <span>测量时间：</span>
                                    <span className="status-value">2026年02月27日 14:30</span>
                                </div>
                            </div>
                            <div className="status-item">
                                <div className="status-icon">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div className="status-text">
                                    <span>时间段：</span>
                                    <span className="status-value">{activePeriod}</span>
                                </div>
                            </div>
                            <div className="status-item">
                                <div className="status-icon">
                                    <i className="fas fa-bullseye"></i>
                                </div>
                                <div className="status-text">
                                    <span>推荐范围：</span>
                                    <span className="status-value">{recommendedRange}</span>
                                </div>
                            </div>
                            <div className="status-item">
                                <div className="status-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <div className="status-text">
                                    <span>状态：</span>
                                    <span className="status-value" style={{ color: '#10b981' }}>正常</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 统计数据网格 */}
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-label">今日平均</div>
                            <div className="stat-value">6.5</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">今日最高</div>
                            <div className="stat-value">8.3</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">今日最低</div>
                            <div className="stat-value">4.2</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">达标率</div>
                            <div className="stat-value">92%</div>
                        </div>
                    </div>

                    {/* 操作按钮组 */}
                    <div className="action-buttons">
                        <button className="action-btn device" onClick={() => alert('打开蓝牙血糖仪测量')}>
                            <i className="fas fa-mobile-alt"></i>
                            设备测量
                        </button>
                        <Link href="/blood-sugar-manual" className="action-btn manual" style={{ textDecoration: 'none' }}>
                            <i className="fas fa-plus"></i>
                            手动记录
                        </Link>
                    </div>
                </div>

                {/* 今日血糖趋势图 */}
                <div className="chart-card fade-in">
                    <div className="chart-header">
                        <h4 className="chart-title">今日血糖趋势</h4>
                        <div className="chart-filters">
                            <button className="chart-filter active">今日</button>
                            <button className="chart-filter">本周</button>
                            <button className="chart-filter">本月</button>
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
                                {/* 标准范围区域 (4.0-10.0 mmol/L) */}
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
                                <circle cx="0" cy="140" r="5" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="100" cy="130" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                                <circle cx="200" cy="110" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                                <circle cx="300" cy="125" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                                <circle cx="400" cy="95" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                                <circle cx="500" cy="115" r="5" fill="white" stroke="#f59e0b" strokeWidth="2"></circle>
                                <circle cx="600" cy="100" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                                <circle cx="700" cy="90" r="6" fill="#3b82f6" stroke="white" strokeWidth="2"></circle>

                                {/* 图例 */}
                                <rect x="20" y="10" width="12" height="12" fill="#10b981" fillOpacity="0.3"></rect>
                                <text x="38" y="20" fontSize="11" fill="#6b7280">达标范围 (4.0-10.0)</text>
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

                {/* 历史记录 */}
                <div className="history-section fade-in">
                    <div className="history-header">
                        <h4 className="history-title">近期血糖记录</h4>
                        <span className="history-action" onClick={() => alert('查看全部记录')}>
                            查看全部
                            <i className="fas fa-chevron-right text-xs" style={{ marginLeft: "4px" }}></i>
                        </span>
                    </div>
                    <div className="history-list">
                        {/* 记录1 */}
                        <div className="history-item">
                            <div className="history-time">
                                <div className="history-date">02月27日</div>
                                <div className="history-period">午餐后</div>
                            </div>
                            <div className="history-value">
                                <div className="value-circle normal">6.8</div>
                                <div className="value-detail">
                                    <div className="value-number">6.8 mmol/L</div>
                                    <div className="value-status">正常范围</div>
                                </div>
                            </div>
                            <div className="history-note">CGM自动采集</div>
                            <div className="history-actions">
                                <button className="history-btn" title="编辑">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="history-btn" title="删除">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        {/* 记录2 */}
                        <div className="history-item">
                            <div className="history-time">
                                <div className="history-date">02月27日</div>
                                <div className="history-period">早餐后</div>
                            </div>
                            <div className="history-value">
                                <div className="value-circle normal">7.2</div>
                                <div className="value-detail">
                                    <div className="value-number">7.2 mmol/L</div>
                                    <div className="value-status">正常范围</div>
                                </div>
                            </div>
                            <div className="history-note">指血测量</div>
                            <div className="history-actions">
                                <button className="history-btn" title="编辑">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="history-btn" title="删除">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        {/* 记录3 */}
                        <div className="history-item">
                            <div className="history-time">
                                <div className="history-date">02月27日</div>
                                <div className="history-period">空腹</div>
                            </div>
                            <div className="history-value">
                                <div className="value-circle low">3.8</div>
                                <div className="value-detail">
                                    <div className="value-number">3.8 mmol/L</div>
                                    <div className="value-status" style={{ color: '#d97706' }}>偏低</div>
                                </div>
                            </div>
                            <div className="history-note">CGM自动采集</div>
                            <div className="history-actions">
                                <button className="history-btn" title="编辑">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="history-btn" title="删除">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        {/* 记录4 */}
                        <div className="history-item">
                            <div className="history-time">
                                <div className="history-date">02月26日</div>
                                <div className="history-period">晚餐后</div>
                            </div>
                            <div className="history-value">
                                <div className="value-circle high">11.2</div>
                                <div className="value-detail">
                                    <div className="value-number">11.2 mmol/L</div>
                                    <div className="value-status" style={{ color: '#dc2626' }}>偏高</div>
                                </div>
                            </div>
                            <div className="history-note">指血测量</div>
                            <div className="history-actions">
                                <button className="history-btn" title="编辑">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="history-btn" title="删除">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
