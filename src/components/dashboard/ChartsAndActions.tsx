'use client';
import Link from 'next/link';

export default function ChartsAndActions() {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* 图表区域占宽 2/3 */}
            <div className="xl:col-span-2 flex flex-col gap-6">
                {/* 血糖趋势图 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 fade-in">
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                        <h4 className="text-base font-semibold text-gray-900">血糖趋势</h4>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 border-none">日</button>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors bg-blue-500 text-white border-none">周</button>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 border-none">月</button>
                        </div>
                    </div>
                    <div className="h-[280px] relative">
                        <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-[11px] text-gray-400">
                            <span>15</span><span>12</span><span>9</span><span>6</span><span>3</span><span>0</span>
                        </div>
                        <div className="absolute left-[50px] right-0 top-0 bottom-6">
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
                        <div className="absolute left-[50px] right-0 bottom-0 h-6 flex justify-between text-[11px] text-gray-400">
                            <span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span>
                        </div>
                    </div>
                </div>

                {/* 血压趋势图 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 fade-in" style={{ animationDelay: '50ms' }}>
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                        <h4 className="text-base font-semibold text-gray-900">近7日血压变化</h4>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 border-none">日</button>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors bg-blue-500 text-white border-none">周</button>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 border-none">月</button>
                        </div>
                    </div>
                    <div className="h-[280px] relative">
                        <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-[11px] text-gray-400">
                            <span>180</span><span>150</span><span>120</span><span>90</span><span>60</span>
                        </div>
                        <div className="absolute left-[50px] right-0 top-0 bottom-6">
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
                        <div className="absolute left-[50px] right-0 bottom-0 h-6 flex justify-between text-[11px] text-gray-400">
                            <span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 快捷操作区 占宽 1/3 */}
            <div className="xl:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 fade-in h-full">
                    <h4 className="text-base font-semibold text-gray-900 mb-4">快捷操作</h4>

                    {/* 设备状态 */}
                    <div className="bg-gradient-to-br from-blue-50 to-sky-100 flex-1 rounded-2xl p-5 mb-4 border border-sky-200">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl text-blue-600 shadow-sm">
                                <i className="fas fa-microchip"></i>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-900">硅基CGM设备</h4>
                                <p className="text-xs text-gray-600">已绑定 · 传感器状态良好</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600 whitespace-nowrap">
                                已连接
                            </span>
                        </div>
                    </div>

                    <button className="flex items-center gap-3 w-full p-3.5 rounded-xl text-sm font-medium cursor-pointer transition-colors border border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 mb-2.5">
                        <i className="fas fa-mobile-alt w-8 h-8 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center text-sm"></i>
                        <span>蓝牙血糖仪测量</span>
                    </button>

                    <button className="flex items-center gap-3 w-full p-3.5 rounded-xl text-sm font-medium cursor-pointer transition-colors border border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 mb-2.5">
                        <i className="fas fa-heart w-8 h-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-sm"></i>
                        <span>蓝牙血压计测量</span>
                    </button>

                    <button className="flex items-center gap-3 w-full p-3.5 rounded-xl text-sm font-medium cursor-pointer transition-colors border border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 mb-2.5">
                        <i className="fas fa-edit w-8 h-8 rounded-md bg-green-100 text-green-600 flex items-center justify-center text-sm"></i>
                        <span>手动记录数据</span>
                    </button>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">更多记录</h5>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                                + 尿酸
                            </span>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                                + 血酮
                            </span>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                                + 用药
                            </span>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                                + 饮食
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="text-sm font-medium text-gray-700 mb-3">快捷服务</h5>
                        <Link href="/hospital" className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <i className="fas fa-hospital text-white"></i>
                                </div>
                                <div>
                                    <h6 className="font-medium text-gray-800 text-sm">在线问诊</h6>
                                    <p className="text-xs text-gray-500">专业医生在线咨询</p>
                                </div>
                            </div>
                            <i className="fas fa-chevron-right text-gray-400 group-hover:text-blue-500 transition-colors"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
