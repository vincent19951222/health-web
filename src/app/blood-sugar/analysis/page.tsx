"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BloodSugarTabs, { TabType } from "@/components/blood-sugar/BloodSugarTabs";
import CurveTab from "@/components/blood-sugar/CurveTab";
import DynamicTab from "@/components/blood-sugar/DynamicTab";
import TableTab from "@/components/blood-sugar/TableTab";
import RecordsTab from "@/components/blood-sugar/RecordsTab";
import TargetTab from "@/components/blood-sugar/TargetTab";
import "@/styles/blood-sugar-analysis.css";

export default function BloodSugarPage() {
    const [activeTab, setActiveTab] = useState<TabType>("curve");

    return (
        <DashboardLayout>
            <div className="header-left mb-6">
                <h2 className="page-title">血糖数据分析</h2>
                <span className="text-sm text-gray-500">全面了解您的血糖控制情况</span>
            </div>

            {/* 标签页导航 */}
            <BloodSugarTabs activeTab={activeTab} onChange={setActiveTab} />

            {/* 标签页内容 */}
            <div className="tab-wrapper">
                {activeTab === "curve" && <CurveTab />}
                {activeTab === "dynamic" && <DynamicTab />}
                {activeTab === "table" && <TableTab />}
                {activeTab === "records" && <RecordsTab />}
                {activeTab === "target" && <TargetTab />}
            </div>

            {/* 底部信息栏 */}
            <footer className="footer-bar mt-8">
                <span>© 2026 优糖智能AI+ · 您的健康管理专家</span>
                <span>数据更新时间: 2026-02-27 14:30:00</span>
            </footer>
        </DashboardLayout>
    );
}
