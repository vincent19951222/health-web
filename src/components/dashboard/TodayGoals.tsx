export default function TodayGoals() {
    return (
        <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">今日健康目标</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* 血糖达标率 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center fade-in">
                    <div className="text-sm font-semibold text-gray-700 mb-4 text-center">血糖达标率</div>
                    <div className="relative w-[160px] h-[160px] mb-4">
                        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 160 160">
                            <circle className="ring-bg" cx="80" cy="80" r="60"></circle>
                            <circle className="ring-progress" cx="80" cy="80" r="60"
                                stroke="#3b82f6"
                                strokeDasharray="377"
                                strokeDashoffset="30">
                            </circle>
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <div className="text-[28px] font-bold text-gray-900 leading-none">92%</div>
                            <div className="text-xs text-gray-500 mt-1">达标</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">目标: &gt;90%</div>
                </div>

                {/* 血压双圆环 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center fade-in" style={{ animationDelay: '50ms' }}>
                    <div className="text-sm font-semibold text-gray-700 mb-4 text-center">血压监测</div>
                    <div className="flex gap-6 justify-center w-full">
                        {/* 收缩压 */}
                        <div className="flex flex-col items-center">
                            <div className="relative w-[120px] h-[120px] mb-2">
                                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
                                    <circle className="ring-bg" cx="60" cy="60" r="45"></circle>
                                    <circle className="ring-progress" cx="60" cy="60" r="45"
                                        stroke="#ef4444"
                                        strokeDasharray="283"
                                        strokeDashoffset="80">
                                    </circle>
                                </svg>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="text-xl font-bold text-gray-900 leading-none">120</div>
                                    <div className="text-xs text-gray-500 mt-1">收缩压</div>
                                </div>
                            </div>
                        </div>
                        {/* 舒张压 */}
                        <div className="flex flex-col items-center">
                            <div className="relative w-[120px] h-[120px] mb-2">
                                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
                                    <circle className="ring-bg" cx="60" cy="60" r="45"></circle>
                                    <circle className="ring-progress" cx="60" cy="60" r="45"
                                        stroke="#3b82f6"
                                        strokeDasharray="283"
                                        strokeDashoffset="140">
                                    </circle>
                                </svg>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="text-xl font-bold text-gray-900 leading-none">80</div>
                                    <div className="text-xs text-gray-500 mt-1">舒张压</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-4">正常范围: 90-140/60-90</div>
                </div>

                {/* 血酮监测 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center fade-in" style={{ animationDelay: '100ms' }}>
                    <div className="text-sm font-semibold text-gray-700 mb-4 text-center">血酮监测</div>
                    <div className="relative w-[160px] h-[160px] mb-4">
                        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 160 160">
                            <circle className="ring-bg" cx="80" cy="80" r="60"></circle>
                            <circle className="ring-progress" cx="80" cy="80" r="60"
                                stroke="#8b5cf6"
                                strokeDasharray="377"
                                strokeDashoffset="260">
                            </circle>
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <div className="text-[28px] font-bold text-gray-900 leading-none">0.4</div>
                            <div className="text-xs text-gray-500 mt-1">mmol/L</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">正常范围: 0-0.6</div>
                </div>
            </div>
        </section>
    );
}
