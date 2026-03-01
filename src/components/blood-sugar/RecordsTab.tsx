"use client";

import { useState } from "react";

interface RecordData {
    id: string;
    time: string;
    period: string;
    deviceSource?: "mobile";
    value: number;
    status: "normal" | "high" | "low";
    statusText: string;
    tags: {
        text: string;
        type: "green" | "yellow" | "orange" | "blue";
        icon: string;
    }[];
}

interface DayData {
    date: string;
    dateLabel: string;
    recordCount: parseInt;
    average: number;
    records: RecordData[];
}

export default function RecordsTab() {
    const [expandedDays, setExpandedDays] = useState<string[]>(["2026-02-27"]);

    const toggleDay = (date: string) => {
        setExpandedDays(prev =>
            prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
        );
    };

    // Dummy data from HTML prototype
    const daysData: DayData[] = [
        {
            date: "2026-02-27",
            dateLabel: "02月27日",
            recordCount: 6 as any,
            average: 6.4,
            records: [
                {
                    id: "r1", time: "08:30", period: "早餐后", deviceSource: "mobile",
                    value: 7.2, status: "normal", statusText: "正常",
                    tags: [
                        { text: "饥饿", type: "yellow", icon: "fas fa-utensils" },
                        { text: "乏力", type: "orange", icon: "fas fa-battery-quarter" }
                    ]
                },
                {
                    id: "r2", time: "07:00", period: "早餐前",
                    value: 5.8, status: "normal", statusText: "正常",
                    tags: [
                        { text: "无不适", type: "green", icon: "fas fa-smile" }
                    ]
                },
                {
                    id: "r3", time: "12:30", period: "午餐后", deviceSource: "mobile",
                    value: 6.8, status: "normal", statusText: "正常",
                    tags: [
                        { text: "尿多", type: "blue", icon: "fas fa-tint" }
                    ]
                }
            ]
        },
        {
            date: "2026-02-26",
            dateLabel: "02月26日",
            recordCount: 5 as any,
            average: 6.7,
            records: [
                {
                    id: "r4", time: "22:00", period: "睡前", deviceSource: "mobile",
                    value: 6.1, status: "normal", statusText: "正常",
                    tags: [
                        { text: "无不适", type: "green", icon: "fas fa-smile" }
                    ]
                },
                {
                    id: "r5", time: "14:00", period: "午餐后", deviceSource: "mobile",
                    value: 7.8, status: "high", statusText: "偏高",
                    tags: [
                        { text: "口渴", type: "blue", icon: "fas fa-tint" },
                        { text: "头痛", type: "orange", icon: "fas fa-headache" }
                    ]
                }
            ]
        }
    ];

    return (
        <div className="tab-content active fade-in">
            <div className="records-section">
                {daysData.map(day => {
                    const isExpanded = expandedDays.includes(day.date);
                    return (
                        <div key={day.date} className="day-card">
                            <div className="day-header" onClick={() => toggleDay(day.date)}>
                                <div className="day-info">
                                    <span className="day-date">{day.dateLabel}</span>
                                    <span className="day-badge">{day.recordCount}次测量</span>
                                </div>
                                <div className="day-stats">
                                    <span className="day-average">平均: {day.average.toFixed(1)} mmol/L</span>
                                    <div className={`day-toggle ${isExpanded ? "expanded" : ""}`}>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="day-records">
                                    {day.records.map(record => (
                                        <div key={record.id} className="record-item">
                                            <div className="record-time">
                                                <span className="record-time-text">{record.time} {record.period}</span>
                                                {record.deviceSource === "mobile" && (
                                                    <i className="fas fa-mobile-alt record-device" title="设备记录" style={{ marginLeft: "8px" }}></i>
                                                )}
                                            </div>
                                            <div className="record-value">
                                                <div className={`value-badge ${record.status}`}>{record.value.toFixed(1)}</div>
                                                <div className="value-info">
                                                    <span className="value-number">{record.value.toFixed(1)} mmol/L</span>
                                                    <span className="value-status" style={{
                                                        color: record.status === 'normal' ? '#16a34a' :
                                                            record.status === 'high' ? '#dc2626' : '#ea580c'
                                                    }}>
                                                        {record.statusText}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="record-tags">
                                                {record.tags.map((tag, idx) => (
                                                    <span key={idx} className={`record-tag tag-${tag.type}`}>
                                                        <i className={`${tag.icon} mr-1`}></i>{tag.text}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
