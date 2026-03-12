"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/blood-sugar-manual.css";

type StatusItem = {
    key: string;
    label: string;
    icon: string;
    color: string;
};

const PERIODS = ["凌晨", "空腹", "早餐后", "午餐前", "午餐后", "晚餐前", "晚餐后", "睡前", "随机"];

const STATUS_ITEMS: StatusItem[] = [
    { key: "none", label: "无不适", icon: "fas fa-smile", color: "#22c55e" },
    { key: "polyuria", label: "尿多", icon: "fas fa-tint", color: "#3b82f6" },
    { key: "polydipsia", label: "口渴", icon: "fas fa-glass-water", color: "#06b6d4" },
    { key: "hungry", label: "饥饿", icon: "fas fa-utensils", color: "#f59e0b" },
    { key: "weak", label: "乏力", icon: "fas fa-battery-quarter", color: "#f97316" },
    { key: "headache", label: "头痛", icon: "fas fa-head-side-cough", color: "#ef4444" },
    { key: "sweat", label: "出汗", icon: "fas fa-droplet", color: "#8b5cf6" },
    { key: "palpitations", label: "心悸", icon: "fas fa-heartbeat", color: "#ef4444" },
    { key: "other", label: "其他", icon: "fas fa-ellipsis-h", color: "#6b7280" },
];

const MIN_VALUE = 1;
const MAX_VALUE = 30;

function clampValue(value: number) {
    return Math.min(MAX_VALUE, Math.max(MIN_VALUE, Number(value.toFixed(1))));
}

function valueToAngle(value: number) {
    return ((clampValue(value) - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 270;
}

function angleToValue(angle: number) {
    const progress = Math.min(270, Math.max(0, angle)) / 270;
    return clampValue(MIN_VALUE + progress * (MAX_VALUE - MIN_VALUE));
}

function getDefaultPeriod() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) return "凌晨";
    if (hour >= 5 && hour < 7) return "空腹";
    if (hour >= 7 && hour < 10) return "早餐后";
    if (hour >= 10 && hour < 12) return "午餐前";
    if (hour >= 12 && hour < 14) return "午餐后";
    if (hour >= 14 && hour < 17) return "晚餐前";
    if (hour >= 17 && hour < 20) return "晚餐后";
    if (hour >= 20 && hour < 23) return "睡前";
    return "随机";
}

function toDateTimeInputValue(date: Date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
}

function formatDateTime(value: string) {
    const date = value ? new Date(value) : new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hh = date.getHours().toString().padStart(2, "0");
    const mm = date.getMinutes().toString().padStart(2, "0");
    return `${year}年${month}月${day}日 ${hh}:${mm}`;
}

export default function BloodSugarManualPage() {
    const router = useRouter();
    const circleRef = useRef<HTMLDivElement | null>(null);

    const [currentValue, setCurrentValue] = useState(6.8);
    const [selectedPeriod, setSelectedPeriod] = useState(getDefaultPeriod());
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [recordDateTime, setRecordDateTime] = useState(() => toDateTimeInputValue(new Date()));
    const [note, setNote] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tempNumberInput, setTempNumberInput] = useState("6.8");
    const [circleSize, setCircleSize] = useState(280);

    const currentAngle = useMemo(() => valueToAngle(currentValue), [currentValue]);
    const ringDegrees = useMemo(() => ((currentValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 270, [currentValue]);

    useEffect(() => {
        if (!isDragging) return;

        const onPointerMove = (event: PointerEvent) => {
            const circle = circleRef.current;
            if (!circle) return;

            const rect = circle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mathAngle = (Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) / Math.PI;
            const cssAngle = Math.min(270, Math.max(0, mathAngle + 90));
            setCurrentValue(angleToValue(cssAngle));
        };

        const onPointerUp = () => setIsDragging(false);

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };
    }, [isDragging]);

    useEffect(() => {
        const circle = circleRef.current;
        if (!circle) return;

        const updateSize = () => setCircleSize(circle.clientWidth || 280);
        updateSize();

        const observer = new ResizeObserver(updateSize);
        observer.observe(circle);
        return () => observer.disconnect();
    }, []);

    const handleStatusToggle = (status: string) => {
        setSelectedStatuses((prev) =>
            prev.includes(status) ? prev.filter((item) => item !== status) : [...prev, status]
        );
    };

    const handleShowNumberInput = () => {
        setTempNumberInput(currentValue.toString());
        setShowModal(true);
    };

    const handleNumberInput = (num: string) => {
        setTempNumberInput((prev) => {
            if (num === "." && prev.includes(".")) return prev;
            const next = prev === "0" && num !== "." ? num : `${prev}${num}`;
            return next.slice(0, 5);
        });
    };

    const handleDeleteInput = () => {
        setTempNumberInput((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
    };

    const handleConfirmNumber = () => {
        const nextValue = Number(tempNumberInput);
        if (Number.isNaN(nextValue) || nextValue < MIN_VALUE || nextValue > MAX_VALUE) {
            alert("血糖值应在 1.0 - 30.0 mmol/L 范围内");
            return;
        }
        setCurrentValue(clampValue(nextValue));
        setShowModal(false);
    };

    const handleSave = () => {
        if (Number.isNaN(currentValue) || currentValue < MIN_VALUE || currentValue > MAX_VALUE) {
            alert("请输入有效的血糖值（1.0 - 30.0 mmol/L）");
            return;
        }

        const record = {
            value: currentValue,
            period: selectedPeriod,
            timestamp: recordDateTime || new Date().toISOString(),
            statuses: selectedStatuses,
            note,
        };

        const existing = JSON.parse(localStorage.getItem("bloodSugarRecords") || "[]");
        localStorage.setItem("bloodSugarRecords", JSON.stringify([...existing, record]));

        const params = new URLSearchParams({
            value: currentValue.toString(),
            period: selectedPeriod,
            dateTime: formatDateTime(recordDateTime),
        });
        router.push(`/blood-sugar-result?${params.toString()}`);
    };

    const radius = circleSize / 2 - 24;
    const handleLeft = circleSize / 2 + radius * Math.cos(((currentAngle - 90) * Math.PI) / 180);
    const handleTop = circleSize / 2 + radius * Math.sin(((currentAngle - 90) * Math.PI) / 180);

    return (
        <DashboardLayout hideHeader>
            <div className="bsm-page">
                <div className="blood-sugar-manual-page">
                <header className="bsm-header">
                    <div className="bsm-header-left">
                        <button className="bsm-back-btn" onClick={() => router.push("/blood-sugar")}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h2 className="bsm-page-title">手动记录血糖</h2>
                    </div>
                </header>

                <section className="bsm-content">
                    <div className="bsm-left-panel">
                        <h3 className="bsm-panel-title">拖动圆环快速录入血糖值</h3>

                        <div className="bsm-circle-container">
                            <div ref={circleRef} className="bsm-circle">
                                <div
                                    className="bsm-progress-ring"
                                    style={{
                                        background: `conic-gradient(from 0deg, #3b82f6 0deg, #3b82f6 ${ringDegrees}deg, #e5e7eb ${ringDegrees}deg, #e5e7eb 360deg)`,
                                    }}
                                />

                                <button className="bsm-center-display" onClick={handleShowNumberInput}>
                                    <span className="bsm-center-value">{currentValue.toFixed(1)}</span>
                                    <span className="bsm-center-unit">mmol/L</span>
                                    <span className="bsm-center-hint">点击直接输入</span>
                                </button>

                                <button
                                    className={`bsm-drag-handle ${isDragging ? "dragging" : ""}`}
                                    style={{ left: `${handleLeft}px`, top: `${handleTop}px` }}
                                    onPointerDown={() => setIsDragging(true)}
                                >
                                    <span className="bsm-drag-dot" />
                                </button>
                            </div>
                        </div>

                        <div className="bsm-reference-info">
                            <div className="bsm-reference-item">
                                <span className="bsm-reference-dot normal" />
                                <span>正常: 3.9-6.1 mmol/L（空腹）</span>
                            </div>
                            <div className="bsm-reference-item">
                                <span className="bsm-reference-dot warning" />
                                <span>偏高: 6.1-7.0 mmol/L</span>
                            </div>
                            <div className="bsm-reference-item">
                                <span className="bsm-reference-dot danger" />
                                <span>过高: &gt; 7.0 mmol/L</span>
                            </div>
                        </div>
                    </div>

                    <div className="bsm-right-panel">
                        <div className="bsm-form-section">
                            <div className="bsm-form-section-title">
                                <i className="fas fa-clock"></i>
                                测量时间段
                            </div>
                            <div className="bsm-time-grid">
                                {PERIODS.map((period) => (
                                    <button
                                        key={period}
                                        className={`bsm-time-item ${selectedPeriod === period ? "active" : ""}`}
                                        onClick={() => setSelectedPeriod(period)}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bsm-form-section">
                            <div className="bsm-form-section-title">
                                <i className="fas fa-calendar-alt"></i>
                                记录时间
                            </div>
                            <div className="bsm-form-row">
                                <label className="bsm-form-label" htmlFor="recordDateTime">
                                    日期时间
                                </label>
                                <input
                                    id="recordDateTime"
                                    type="datetime-local"
                                    className="bsm-form-input"
                                    value={recordDateTime}
                                    onChange={(event) => setRecordDateTime(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bsm-form-section">
                            <div className="bsm-form-section-title">
                                <i className="fas fa-user-check"></i>
                                个体状态 <span className="bsm-optional">（可选）</span>
                            </div>
                            <div className="bsm-status-grid">
                                {STATUS_ITEMS.map((item) => {
                                    const selected = selectedStatuses.includes(item.label);
                                    return (
                                        <button
                                            key={item.key}
                                            className={`bsm-status-item ${selected ? "selected" : ""}`}
                                            onClick={() => handleStatusToggle(item.label)}
                                        >
                                            <i className={item.icon} style={{ color: item.color }}></i>
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bsm-form-section">
                            <div className="bsm-form-section-title">
                                <i className="fas fa-sticky-note"></i>
                                备注 <span className="bsm-optional">（可选）</span>
                            </div>
                            <textarea
                                className="bsm-note-input"
                                placeholder="例如：餐后30分钟散步、今天进食偏多等..."
                                value={note}
                                onChange={(event) => setNote(event.target.value)}
                            />
                        </div>

                        <div className="bsm-action-bar">
                            <button className="bsm-btn bsm-btn-secondary" onClick={() => router.push("/blood-sugar")}>
                                取消
                            </button>
                            <button className="bsm-btn bsm-btn-primary" onClick={handleSave}>
                                <i className="fas fa-check"></i>
                                保存记录
                            </button>
                        </div>
                    </div>
                </section>

                {showModal && (
                    <div className="bsm-modal-overlay">
                        <div className="bsm-modal-content">
                            <div className="bsm-modal-header">
                                <h3 className="bsm-modal-title">输入血糖值</h3>
                                <button className="bsm-modal-close" onClick={() => setShowModal(false)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="bsm-modal-body">
                                <div className="bsm-number-display">
                                    <div className="bsm-number-value">{tempNumberInput || "0"}</div>
                                    <div className="bsm-number-unit">mmol/L</div>
                                </div>
                                <div className="bsm-keypad">
                                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map((key) => (
                                        <button key={key} className="bsm-key-btn" onClick={() => handleNumberInput(key)}>
                                            {key}
                                        </button>
                                    ))}
                                    <button className="bsm-key-btn" onClick={handleDeleteInput}>
                                        <i className="fas fa-backspace"></i>
                                    </button>
                                </div>
                                <div className="bsm-modal-actions">
                                    <button className="bsm-btn bsm-btn-secondary" onClick={() => setShowModal(false)}>
                                        取消
                                    </button>
                                    <button className="bsm-btn bsm-btn-primary" onClick={handleConfirmNumber}>
                                        确定
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </DashboardLayout>
    );
}
