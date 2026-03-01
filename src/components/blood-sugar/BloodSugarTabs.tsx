"use client";

export type TabType = "curve" | "dynamic" | "table" | "records" | "target";

interface BloodSugarTabsProps {
    activeTab: TabType;
    onChange: (tab: TabType) => void;
}

export default function BloodSugarTabs({ activeTab, onChange }: BloodSugarTabsProps) {
    const tabs = [
        { id: "curve", label: "指血曲线" },
        { id: "dynamic", label: "动态曲线" },
        { id: "table", label: "数值表格" },
        { id: "records", label: "记录列表" },
        { id: "target", label: "目标设置" }
    ] as const;

    return (
        <div className="tabs-container">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => onChange(tab.id as TabType)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
