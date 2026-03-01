"use client";

import { useState, useEffect } from "react";
import DateSelector from "./DateSelector";

interface BloodSugarRecord {
    day: number;
    slots: {
        value: string;
        status: "status-normal" | "status-high" | "status-low" | "";
    }[];
}

export default function TableTab() {
    const [monthDisplay, setMonthDisplay] = useState("2026年02月");
    const [tableData, setTableData] = useState<BloodSugarRecord[]>([]);

    const handlePrevious = () => setMonthDisplay("2026年01月");
    const handleNext = () => setMonthDisplay("2026年03月");

    const [isMounted, setIsMounted] = useState(false);

    // Generate mock table data on mount
    useEffect(() => {
        setIsMounted(true);
        const daysInMonth = 28; // Feb 2026
        const generatedData: BloodSugarRecord[] = [];

        for (let day = daysInMonth; day >= 1; day--) {
            const slots = Array(8).fill(null).map(() => {
                if (Math.random() < 0.7) {
                    const numValue = (Math.random() * 8 + 4);
                    let status: BloodSugarRecord["slots"][0]["status"] = "status-normal";
                    if (numValue < 4.4) status = "status-low";
                    else if (numValue > 10.0) status = "status-high";

                    return {
                        value: numValue.toFixed(1),
                        status
                    };
                }
                return { value: "-", status: "" as const };
            });

            generatedData.push({ day, slots });
        }
        setTableData(generatedData);
    }, []);

    // Prevent hydration mismatch by returning empty table structure during SSR
    if (!isMounted) {
        return (
            <div className="tab-content active fade-in">
                <DateSelector
                    dateDisplay={monthDisplay}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    showRangeTabs={false}
                />
                <div className="table-card">
                    <div className="table-header">
                        <h4 className="table-title">血糖数据表</h4>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>日期</th>
                                    <th>凌晨</th>
                                    <th>早餐前</th>
                                    <th>早餐后</th>
                                    <th>午餐前</th>
                                    <th>午餐后</th>
                                    <th>晚餐前</th>
                                    <th>晚餐后</th>
                                    <th>睡前</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty rows initially */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="tab-content active fade-in">
            {/* 月份选择器 */}
            <DateSelector
                dateDisplay={monthDisplay}
                onPrevious={handlePrevious}
                onNext={handleNext}
                showRangeTabs={false}
            />

            {/* 数据表格 */}
            <div className="table-card">
                <div className="table-header">
                    <h4 className="table-title">血糖数据表</h4>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>凌晨</th>
                                <th>早餐前</th>
                                <th>早餐后</th>
                                <th>午餐前</th>
                                <th>午餐后</th>
                                <th>晚餐前</th>
                                <th>晚餐后</th>
                                <th>睡前</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((record) => (
                                <tr key={record.day}>
                                    <td>{record.day}</td>
                                    {record.slots.map((slot, idx) => (
                                        <td key={idx} className={slot.status}>
                                            {slot.value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
