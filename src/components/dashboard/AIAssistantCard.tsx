import Link from 'next/link';

export default function AIAssistantCard() {
    return (
        <section className="mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 text-white relative overflow-hidden fade-in shadow-md">
                {/* Decorative circle */}
                <div className="absolute -top-[50%] -right-[20%] w-[200px] h-[200px] bg-white/10 rounded-full pointer-events-none"></div>

                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl">
                        <i className="fas fa-robot"></i>
                    </div>
                    <div className="flex-1">
                        <div className="text-base font-semibold">小优AI健康建议</div>
                        <div className="text-sm opacity-80">基于您的健康数据提供个性化建议</div>
                    </div>
                    <Link href="/ai-assistant" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <i className="fas fa-comment-dots"></i>
                        问AI
                    </Link>
                </div>

                <div className="text-sm leading-relaxed opacity-95 mb-4 relative z-10">
                    根据您近期的血糖监测数据分析，空腹血糖平均6.2mmol/L，餐后2小时血糖平均7.8mmol/L，整体控制良好。
                    建议继续保持规律监测，并注意餐后30分钟进行轻度运动。
                </div>

                <div className="flex flex-wrap gap-2 relative z-10">
                    <Link href="/ai-assistant" className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-colors flex items-center">
                        <i className="fas fa-robot mr-1"></i>问AI
                    </Link>
                    <span className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-colors flex items-center">
                        查看详细建议
                    </span>
                    <span className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-colors flex items-center">
                        设置测量提醒
                    </span>
                    <span className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-colors flex items-center">
                        导出健康报告
                    </span>
                </div>
            </div>
        </section>
    );
}
