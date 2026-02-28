export default function MetricsOverview() {
    return (
        <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">健康指标概览</h3>
                <span className="text-sm text-blue-500 cursor-pointer flex items-center gap-1 hover:text-blue-600 transition-colors">
                    查看全部
                    <i className="fas fa-chevron-right text-xs"></i>
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
                {/* 血糖卡片 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer relative overflow-hidden fade-in group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-blue-100 text-blue-600">
                            <i className="fas fa-tint"></i>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">正常</span>
                    </div>
                    <div className="text-4xl font-extrabold text-gray-900 mb-1 leading-none">6.8</div>
                    <div className="text-sm text-gray-500 mb-3">mmol/L · CGM</div>
                    <div className="text-sm text-gray-600 font-medium">当前血糖</div>
                    <div className="flex items-center gap-1 text-xs mt-2 text-gray-500">
                        <i className="fas fa-minus"></i>
                        <span>较昨日持平</span>
                    </div>
                </div>

                {/* 血压卡片 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer relative overflow-hidden fade-in group" style={{ animationDelay: '50ms' }}>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-orange-50 text-orange-600">
                            <i className="fas fa-heart"></i>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">正常</span>
                    </div>
                    <div className="text-4xl font-extrabold text-gray-900 mb-1 leading-none">120/80</div>
                    <div className="text-sm text-gray-500 mb-3">mmHg</div>
                    <div className="text-sm text-gray-600 font-medium">当前血压</div>
                    <div className="flex items-center gap-1 text-xs mt-2 text-red-500">
                        <i className="fas fa-arrow-down"></i>
                        <span>较昨日下降5mmHg</span>
                    </div>
                </div>

                {/* 糖化血红蛋白卡片 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer relative overflow-hidden fade-in group" style={{ animationDelay: '100ms' }}>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-violet-600"></div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-violet-50 text-violet-600">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-600">偏高</span>
                    </div>
                    <div className="text-4xl font-extrabold text-gray-900 mb-1 leading-none">6.8</div>
                    <div className="text-sm text-gray-500 mb-3">%</div>
                    <div className="text-sm text-gray-600 font-medium">糖化血红蛋白</div>
                    <div className="flex items-center gap-1 text-xs mt-2 text-red-500">
                        <i className="fas fa-arrow-down"></i>
                        <span>较上月下降0.2%</span>
                    </div>
                </div>

                {/* 尿酸卡片 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer relative overflow-hidden fade-in group" style={{ animationDelay: '150ms' }}>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-cyan-50 text-cyan-600">
                            <i className="fas fa-flask"></i>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">正常</span>
                    </div>
                    <div className="text-4xl font-extrabold text-gray-900 mb-1 leading-none">380</div>
                    <div className="text-sm text-gray-500 mb-3">μmol/L</div>
                    <div className="text-sm text-gray-600 font-medium">尿酸值</div>
                    <div className="flex items-center gap-1 text-xs mt-2 text-gray-500">
                        <i className="fas fa-minus"></i>
                        <span>维持稳定</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
