export default function TodayGoals() {
    return (
        <section className="overview-section fade-in">
            <div className="section-header">
                <h3 className="section-title">今日健康目标</h3>
            </div>

            <div className="ring-cards-grid">
                {/* 血糖达标率 */}
                <div className="ring-card">
                    <div className="ring-card-title">血糖达标率</div>
                    <div className="ring-container">
                        <svg className="ring-svg" width="160" height="160" viewBox="0 0 160 160">
                            <circle className="ring-bg" cx="80" cy="80" r="60"></circle>
                            <circle className="ring-progress" cx="80" cy="80" r="60"
                                stroke="#3b82f6"
                                strokeDasharray="377"
                                strokeDashoffset="30">
                            </circle>
                        </svg>
                        <div className="ring-center">
                            <div className="ring-value">92%</div>
                            <div className="ring-unit">达标</div>
                        </div>
                    </div>
                    <div className="ring-label">目标: &gt;90%</div>
                </div>

                {/* 血压双圆环 */}
                <div className="ring-card">
                    <div className="ring-card-title">血压监测</div>
                    <div className="dual-ring-container">
                        <div className="dual-ring-item">
                            <div className="ring-container" style={{ width: '120px', height: '120px' }}>
                                <svg className="ring-svg" width="120" height="120" viewBox="0 0 120 120">
                                    <circle className="ring-bg" cx="60" cy="60" r="45"></circle>
                                    <circle className="ring-progress" cx="60" cy="60" r="45"
                                        stroke="#ef4444"
                                        strokeDasharray="283"
                                        strokeDashoffset="80">
                                    </circle>
                                </svg>
                                <div className="ring-center">
                                    <div className="ring-value" style={{ fontSize: '20px' }}>120</div>
                                    <div className="ring-unit">收缩压</div>
                                </div>
                            </div>
                        </div>
                        <div className="dual-ring-item">
                            <div className="ring-container" style={{ width: '120px', height: '120px' }}>
                                <svg className="ring-svg" width="120" height="120" viewBox="0 0 120 120">
                                    <circle className="ring-bg" cx="60" cy="60" r="45"></circle>
                                    <circle className="ring-progress" cx="60" cy="60" r="45"
                                        stroke="#3b82f6"
                                        strokeDasharray="283"
                                        strokeDashoffset="140">
                                    </circle>
                                </svg>
                                <div className="ring-center">
                                    <div className="ring-value" style={{ fontSize: '20px' }}>80</div>
                                    <div className="ring-unit">舒张压</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ring-label" style={{ marginTop: '16px' }}>正常范围: 90-140/60-90</div>
                </div>

                {/* 血酮监测 */}
                <div className="ring-card">
                    <div className="ring-card-title">血酮监测</div>
                    <div className="ring-container">
                        <svg className="ring-svg" width="160" height="160" viewBox="0 0 160 160">
                            <circle className="ring-bg" cx="80" cy="80" r="60"></circle>
                            <circle className="ring-progress" cx="80" cy="80" r="60"
                                stroke="#8b5cf6"
                                strokeDasharray="377"
                                strokeDashoffset="260">
                            </circle>
                        </svg>
                        <div className="ring-center">
                            <div className="ring-value">0.4</div>
                            <div className="ring-unit">mmol/L</div>
                        </div>
                    </div>
                    <div className="ring-label">正常范围: 0-0.6</div>
                </div>
            </div>
        </section>
    );
}
