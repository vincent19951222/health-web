export default function MetricsOverview() {
    return (
        <section className="overview-section fade-in">
            <div className="section-header">
                <h3 className="section-title">健康指标概览</h3>
                <a href="#" className="section-action">
                    查看全部 <i className="fas fa-chevron-right" style={{ fontSize: '12px' }}></i>
                </a>
            </div>

            <div className="metrics-grid">
                {/* 血糖 */}
                <div className="metric-card blood-sugar">
                    <div className="metric-header">
                        <div className="metric-icon">
                            <i className="fas fa-tint"></i>
                        </div>
                        <span className="metric-status status-normal">正常</span>
                    </div>
                    <div className="metric-value">6.8</div>
                    <div className="metric-unit">mmol/L · CGM</div>
                    <div className="metric-label">当前血糖</div>
                    <div className="metric-trend trend-stable">
                        <i className="fas fa-minus"></i>
                        <span>较昨日持平</span>
                    </div>
                </div>

                {/* 血压 */}
                <div className="metric-card blood-pressure">
                    <div className="metric-header">
                        <div className="metric-icon">
                            <i className="fas fa-heart"></i>
                        </div>
                        <span className="metric-status status-normal">正常</span>
                    </div>
                    <div className="metric-value">120/80</div>
                    <div className="metric-unit">mmHg</div>
                    <div className="metric-label">当前血压</div>
                    <div className="metric-trend trend-down">
                        <i className="fas fa-arrow-down"></i>
                        <span>较昨日下降5mmHg</span>
                    </div>
                </div>

                {/* 糖化血红蛋白 */}
                <div className="metric-card glycated">
                    <div className="metric-header">
                        <div className="metric-icon">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <span className="metric-status status-warning">偏高</span>
                    </div>
                    <div className="metric-value">6.8</div>
                    <div className="metric-unit">%</div>
                    <div className="metric-label">糖化血红蛋白</div>
                    <div className="metric-trend trend-down">
                        <i className="fas fa-arrow-down"></i>
                        <span>较上月下降0.2%</span>
                    </div>
                </div>

                {/* 尿酸 */}
                <div className="metric-card uric-acid">
                    <div className="metric-header">
                        <div className="metric-icon">
                            <i className="fas fa-flask"></i>
                        </div>
                        <span className="metric-status status-normal">正常</span>
                    </div>
                    <div className="metric-value">380</div>
                    <div className="metric-unit">μmol/L</div>
                    <div className="metric-label">尿酸值</div>
                    <div className="metric-trend trend-stable">
                        <i className="fas fa-minus"></i>
                        <span>维持稳定</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
