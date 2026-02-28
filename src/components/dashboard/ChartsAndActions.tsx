'use client';
import Link from 'next/link';

export default function ChartsAndActions() {
    return (
        <div className="chart-section">
            {/* 图表区域 占 2/3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 血糖趋势图 */}
                <div className="chart-card fade-in">
                    <div className="chart-header">
                        <h4 className="chart-title">血糖趋势</h4>
                        <div className="chart-filters">
                            <button className="chart-filter">日</button>
                            <button className="chart-filter active">周</button>
                            <button className="chart-filter">月</button>
                        </div>
                    </div>
                    <div className="chart-container">
                        <div className="chart-y-axis">
                            <span>15</span><span>12</span><span>9</span><span>6</span><span>3</span><span>0</span>
                        </div>
                        <div className="chart-area">
                            <svg width="100%" height="100%" viewBox="0 0 600 220" preserveAspectRatio="none">
                                <rect x="0" y="66" width="600" height="88" fill="#10b981" fillOpacity="0.1"></rect>
                                <line x1="0" y1="0" x2="600" y2="0" stroke="#e5e7eb" strokeWidth="1"></line>
                                <line x1="0" y1="44" x2="600" y2="44" stroke="#e5e7eb" strokeWidth="1"></line>
                                <line x1="0" y1="88" x2="600" y2="88" stroke="#e5e7eb" strokeWidth="1"></line>
                                <line x1="0" y1="132" x2="600" y2="132" stroke="#e5e7eb" strokeWidth="1"></line>
                                <line x1="0" y1="176" x2="600" y2="176" stroke="#e5e7eb" strokeWidth="1"></line>
                                <line x1="0" y1="220" x2="600" y2="220" stroke="#e5e7eb" strokeWidth="1"></line>
                                <defs>
                                    <linearGradient id="areaGradientSugar" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"></stop>
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0,120 Q50,100 100,110 T200,90 T300,100 T400,80 T500,95 T600,85 L600,220 L0,220 Z" fill="url(#areaGradientSugar)"></path>
                                <path d="M0,120 Q50,100 100,110 T200,90 T300,100 T400,80 T500,95 T600,85" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"></path>
                                <circle cx="0" cy="120" r="5" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="100" cy="110" r="5" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="200" cy="90" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                                <circle cx="300" cy="100" r="5" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="400" cy="80" r="5" fill="white" stroke="#10b981" strokeWidth="2"></circle>
                                <circle cx="500" cy="95" r="5" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="600" cy="85" r="6" fill="#3b82f6" stroke="white" strokeWidth="2"></circle>
                            </svg>
                        </div>
                        <div className="chart-x-axis">
                            <span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span>
                        </div>
                    </div>
                </div>

                {/* 血压趋势图 */}
                <div className="chart-card fade-in">
                    <div className="chart-header">
                        <h4 className="chart-title">近7日血压变化</h4>
                        <div className="chart-filters">
                            <button className="chart-filter">日</button>
                            <button className="chart-filter active">周</button>
                            <button className="chart-filter">月</button>
                        </div>
                    </div>
                    <div className="chart-container">
                        <div className="chart-y-axis">
                            <span>180</span><span>150</span><span>120</span><span>90</span><span>60</span>
                        </div>
                        <div className="chart-area">
                            <svg width="100%" height="100%" viewBox="0 0 600 220" preserveAspectRatio="none">
                                <rect x="0" y="44" width="600" height="88" fill="#10b981" fillOpacity="0.1"></rect>
                                <line x1="0" y1="0" x2="600" y2="0" stroke="#e5e7eb" strokeWidth="1"></line>
                                <line x1="0" y1="55" x2="600" y2="55" stroke="#e5e7eb" strokeWidth="1"></line>
                                <line x1="0" y1="110" x2="600" y2="110" stroke="#e5e7eb" strokeWidth="1"></line>
                                <line x1="0" y1="165" x2="600" y2="165" stroke="#e5e7eb" strokeWidth="1"></line>
                                <line x1="0" y1="220" x2="600" y2="220" stroke="#e5e7eb" strokeWidth="1"></line>
                                <path d="M0,80 L100,75 L200,85 L300,70 L400,78 L500,72 L600,68" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"></path>
                                <path d="M0,140 L100,145 L200,138 L300,142 L400,135 L500,140 L600,138" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"></path>
                                <circle cx="0" cy="80" r="4" fill="white" stroke="#ef4444" strokeWidth="2"></circle>
                                <circle cx="100" cy="75" r="4" fill="white" stroke="#ef4444" strokeWidth="2"></circle>
                                <circle cx="200" cy="85" r="4" fill="white" stroke="#ef4444" strokeWidth="2"></circle>
                                <circle cx="300" cy="70" r="4" fill="white" stroke="#ef4444" strokeWidth="2"></circle>
                                <circle cx="400" cy="78" r="4" fill="white" stroke="#ef4444" strokeWidth="2"></circle>
                                <circle cx="500" cy="72" r="4" fill="white" stroke="#ef4444" strokeWidth="2"></circle>
                                <circle cx="600" cy="68" r="5" fill="#ef4444" stroke="white" strokeWidth="2"></circle>
                                <circle cx="0" cy="140" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="100" cy="145" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="200" cy="138" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="300" cy="142" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="400" cy="135" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="500" cy="140" r="4" fill="white" stroke="#3b82f6" strokeWidth="2"></circle>
                                <circle cx="600" cy="138" r="5" fill="#3b82f6" stroke="white" strokeWidth="2"></circle>
                            </svg>
                        </div>
                        <div className="chart-x-axis">
                            <span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 快捷操作 占 1/3 */}
            <div>
                <div className="quick-actions-card fade-in" style={{ height: '100%' }}>
                    <h4 className="quick-actions-title">快捷操作</h4>

                    {/* 设备状态 */}
                    <div className="device-status-card">
                        <div className="device-status-header">
                            <div className="device-icon">
                                <i className="fas fa-microchip"></i>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-900)' }}>硅基CGM设备</h4>
                                <p style={{ fontSize: '12px', color: 'var(--gray-600)' }}>已绑定 · 传感器状态良好</p>
                            </div>
                            <span className="device-status-badge connected">已连接</span>
                        </div>
                    </div>

                    <button className="quick-action-btn">
                        <div className="quick-action-icon" style={{ background: '#fff7ed', color: 'var(--secondary-600)' }}>
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                        蓝牙血糖仪测量
                    </button>

                    <button className="quick-action-btn">
                        <div className="quick-action-icon" style={{ background: 'var(--primary-100)', color: 'var(--primary-600)' }}>
                            <i className="fas fa-heart"></i>
                        </div>
                        蓝牙血压计测量
                    </button>

                    <button className="quick-action-btn">
                        <div className="quick-action-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
                            <i className="fas fa-edit"></i>
                        </div>
                        手动记录数据
                    </button>

                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--gray-200)' }}>
                        <h5 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '12px' }}>更多记录</h5>
                        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                            {['+ 尿酸', '+ 血酮', '+ 用药', '+ 饮食'].map((item) => (
                                <span key={item} style={{
                                    padding: '4px 12px',
                                    background: 'var(--gray-100)',
                                    borderRadius: '9999px',
                                    fontSize: '13px',
                                    color: 'var(--gray-600)',
                                    cursor: 'pointer'
                                }}>{item}</span>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--gray-200)' }}>
                        <h5 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--gray-700)', marginBottom: '12px' }}>快捷服务</h5>
                        <Link href="/hospital" className="service-item">
                            <div className="service-icon">
                                <i className="fas fa-hospital"></i>
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--gray-800)' }}>在线问诊</div>
                                <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>专业医生在线咨询</div>
                            </div>
                            <i className="fas fa-chevron-right" style={{ marginLeft: 'auto', color: 'var(--gray-400)', fontSize: '12px' }}></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
