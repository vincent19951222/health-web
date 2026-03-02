"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/reports-main.css";

// --- Types & Mock Data ---

type ReportStatus = 'completed' | 'pending' | 'draft';
type ReportType = 'monthly' | 'yearly' | 'special';

interface IReportSummary {
    bloodSugar: { avg: number; trend: 'up' | 'down' | 'stable' };
    bloodPressure: { systolic: number; diastolic: number };
    glycated: number;
}

interface IReport {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    status: ReportStatus;
    type: ReportType;
    summary: IReportSummary | null;
}

const MOCK_REPORTS: IReport[] = [
    {
        id: 'report_1',
        title: '2026年2月健康报告',
        createdAt: '2026-02-15T10:30:00',
        updatedAt: '2026-02-20T14:20:00',
        status: 'completed',
        type: 'monthly',
        summary: {
            bloodSugar: { avg: 6.5, trend: 'stable' },
            bloodPressure: { systolic: 120, diastolic: 80 },
            glycated: 6.8
        }
    },
    {
        id: 'report_2',
        title: '2026年1月健康报告',
        createdAt: '2026-01-15T09:00:00',
        updatedAt: '2026-01-18T16:45:00',
        status: 'completed',
        type: 'monthly',
        summary: {
            bloodSugar: { avg: 6.8, trend: 'down' },
            bloodPressure: { systolic: 125, diastolic: 82 },
            glycated: 7.0
        }
    },
    {
        id: 'report_3',
        title: '2025年度健康总结',
        createdAt: '2026-01-02T08:00:00',
        updatedAt: '2026-01-05T11:30:00',
        status: 'completed',
        type: 'yearly',
        summary: {
            bloodSugar: { avg: 6.6, trend: 'down' },
            bloodPressure: { systolic: 122, diastolic: 81 },
            glycated: 6.9
        }
    },
    {
        id: 'report_4',
        title: '糖尿病专项评估报告',
        createdAt: '2026-02-10T14:00:00',
        updatedAt: '2026-02-12T09:15:00',
        status: 'pending',
        type: 'special',
        summary: {
            bloodSugar: { avg: 7.2, trend: 'up' },
            bloodPressure: { systolic: 130, diastolic: 85 },
            glycated: 7.2
        }
    },
    {
        id: 'report_5',
        title: '心血管风险评估',
        createdAt: '2026-02-25T11:00:00',
        updatedAt: '2026-02-25T11:00:00',
        status: 'draft',
        type: 'special',
        summary: null
    },
    {
        id: 'report_6',
        title: '2025年12月健康报告',
        createdAt: '2025-12-15T10:00:00',
        updatedAt: '2025-12-20T15:30:00',
        status: 'completed',
        type: 'monthly',
        summary: {
            bloodSugar: { avg: 6.9, trend: 'stable' },
            bloodPressure: { systolic: 128, diastolic: 84 },
            glycated: 7.1
        }
    }
];

// Map enumerator values to display strings
const STATUS_MAP = {
    'completed': '已完成',
    'pending': '待完善',
    'draft': '草稿'
};

const TYPE_MAP: Record<string, string> = {
    'monthly': '月度报告',
    'yearly': '年度报告',
    'special': '专项报告'
};

export default function ReportsPage() {
    const [reports, setReports] = useState<IReport[]>(MOCK_REPORTS);
    const [activeFilter, setActiveFilter] = useState<'all' | ReportStatus>('all');
    const [searchQuery, setSearchQuery] = useState("");

    // Compute Derived Statistics
    const totalCount = reports.length;
    const completedCount = reports.filter(r => r.status === 'completed').length;
    const pendingCount = reports.filter(r => r.status === 'pending').length;

    // Evaluate if created "This Month" dynamically. The prototype locked it to mock logic. Let's do a reliable check contextually around "now" (which is simulated as Feb 2026 per the data, but we'll use actual System time or rely on February if need be. We'll use actual runtime).
    const now = new Date();
    const thisMonthCount = reports.filter(r => {
        const date = new Date(r.createdAt);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    // Filter Logic
    const filteredReports = reports.filter(r => {
        const matchesFilter = activeFilter === 'all' || r.status === activeFilter;
        const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Formatting Helpers
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const deleteReport = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm("确定要删除这份健康报告吗？此操作不可恢复。")) {
            setReports(prev => prev.filter(r => r.id !== id));
        }
    };

    const downloadReport = (e: React.MouseEvent, title: string) => {
        e.stopPropagation();
        alert(`正在下载报告: ${title}`);
    };

    return (
        <DashboardLayout hideHeader>
            <div className="reports-page fade-in">
                {/* Header built into layout stream */}
                <header className="bg-white px-8 py-5 border-b border-gray-200 flex items-center justify-between -mx-8 -mt-8 mb-6">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold text-gray-800">健康报告</h2>
                        <span className="text-sm text-gray-500 mt-1">管理您的健康档案与报告</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                            <i className="fas fa-download"></i>
                            批量导出
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-[#0891b2] text-white hover:bg-[#0e7490] hover:shadow-lg">
                            <i className="fas fa-plus"></i>
                            新建报告
                        </button>
                    </div>
                </header>

                <div className="content-wrapper px-0 sm:px-2 pb-12">

                    {/* 统计概览 */}
                    <div className="stats-row fade-in">
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon total"><i className="fas fa-file-medical"></i></div>
                            </div>
                            <div className="stat-value">{totalCount}</div>
                            <div className="stat-label">总报告数</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon completed"><i className="fas fa-check-circle"></i></div>
                            </div>
                            <div className="stat-value">{completedCount}</div>
                            <div className="stat-label">已完成</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon pending"><i className="fas fa-clock"></i></div>
                            </div>
                            <div className="stat-value">{pendingCount}</div>
                            <div className="stat-label">待完善</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon this-month"><i className="fas fa-calendar-alt"></i></div>
                            </div>
                            <div className="stat-value">{thisMonthCount}</div>
                            <div className="stat-label">本月新增</div>
                        </div>
                    </div>

                    {/* 筛选栏 */}
                    <div className="filter-bar fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="filter-tabs">
                            <button className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>全部报告</button>
                            <button className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`} onClick={() => setActiveFilter('completed')}>已完成</button>
                            <button className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`} onClick={() => setActiveFilter('pending')}>待完善</button>
                            <button className={`filter-tab ${activeFilter === 'draft' ? 'active' : ''}`} onClick={() => setActiveFilter('draft')}>草稿</button>
                        </div>
                        <div className="search-box">
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="搜索报告名称..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 报告列表 */}
                    {filteredReports.length > 0 ? (
                        <div className="reports-grid">
                            {filteredReports.map((report, idx) => (
                                <div key={report.id} className="report-card fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                                    <div className="card-header">
                                        <div className="card-icon">
                                            <i className="fas fa-file-medical-alt"></i>
                                        </div>
                                        <div className="card-info">
                                            <div className="card-title">{report.title}</div>
                                            <div className="card-meta">
                                                <span><i className="fas fa-calendar-alt"></i> {formatDate(report.createdAt)}</span>
                                                <span><i className="fas fa-tag"></i> {TYPE_MAP[report.type] || '健康报告'}</span>
                                            </div>
                                        </div>
                                        <div className="card-actions">
                                            <button className="card-action-btn" onClick={(e) => downloadReport(e, report.title)} title="下载">
                                                <i className="fas fa-download"></i>
                                            </button>
                                            <button className="card-action-btn delete" onClick={(e) => deleteReport(e, report.id)} title="删除">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="status-badges">
                                        <span className={`status-badge ${report.status}`}>
                                            <i className={`fas fa-${report.status === 'completed' ? 'check-circle' : report.status === 'pending' ? 'clock' : 'edit'}`}></i>
                                            {STATUS_MAP[report.status]}
                                        </span>
                                    </div>

                                    {report.summary && (
                                        <div className="card-summary">
                                            <div className="summary-item">
                                                <span className="summary-label">平均血糖</span>
                                                <span className="summary-value highlight text-blue-600">
                                                    {report.summary.bloodSugar.avg} mmol/L
                                                    {report.summary.bloodSugar.trend === 'up' && <i className="fas fa-arrow-up ml-1 text-red-500"></i>}
                                                    {report.summary.bloodSugar.trend === 'down' && <i className="fas fa-arrow-down ml-1 text-green-500"></i>}
                                                    {report.summary.bloodSugar.trend === 'stable' && <i className="fas fa-minus ml-1 text-gray-500"></i>}
                                                </span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-label">血压</span>
                                                <span className="summary-value">{report.summary.bloodPressure.systolic}/{report.summary.bloodPressure.diastolic} mmHg</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-label">糖化血红蛋白</span>
                                                <span className="summary-value">{report.summary.glycated}%</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state fade-in col-span-full">
                            <div className="empty-icon shadow-sm">
                                <i className="fas fa-folder-open text-[#06b6d4]"></i>
                            </div>
                            <h3 className="empty-title">暂无相关报告</h3>
                            <p className="empty-desc">没有找到符合筛选条件的报告</p>
                            <button
                                className="empty-action bg-[#0891b2] hover:bg-[#0e7490]"
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveFilter("all");
                                }}
                            >
                                清除筛选条件
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
