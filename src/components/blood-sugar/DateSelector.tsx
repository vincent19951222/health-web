"use client";

interface DateSelectorProps {
    dateDisplay: string;
    onPrevious: () => void;
    onNext: () => void;
    showRangeTabs?: boolean;
    activeRangeTab?: "day" | "week" | "month";
    onRangeChange?: (range: "day" | "week" | "month") => void;
}

export default function DateSelector({
    dateDisplay,
    onPrevious,
    onNext,
    showRangeTabs = false,
    activeRangeTab = "day",
    onRangeChange
}: DateSelectorProps) {
    return (
        <div className="date-selector">
            <div className="date-nav">
                <button className="date-nav-btn" onClick={onPrevious}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <span className="date-display">{dateDisplay}</span>
                <button className="date-nav-btn" onClick={onNext}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
            {showRangeTabs && onRangeChange && (
                <div className="date-range-tabs">
                    <button
                        className={`date-range-tab ${activeRangeTab === "day" ? "active" : ""}`}
                        onClick={() => onRangeChange("day")}
                    >
                        日
                    </button>
                    <button
                        className={`date-range-tab ${activeRangeTab === "week" ? "active" : ""}`}
                        onClick={() => onRangeChange("week")}
                    >
                        周
                    </button>
                    <button
                        className={`date-range-tab ${activeRangeTab === "month" ? "active" : ""}`}
                        onClick={() => onRangeChange("month")}
                    >
                        月
                    </button>
                </div>
            )}
        </div>
    );
}
