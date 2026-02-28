import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 bottom-0 w-[64px] md:w-[240px] bg-gradient-to-b from-blue-800 to-blue-500 text-white flex flex-col z-[100] shadow-xl transition-all duration-300">
            <div className="p-4 md:p-6 border-b border-white/10 flex justify-center md:justify-start">
                <h1 className="text-[20px] font-bold flex items-center gap-2.5">
                    <i className="fas fa-heartbeat"></i>
                    <span className="hidden md:inline">优唐智能AI+</span>
                </h1>
            </div>

            <nav className="flex-1 p-2 md:p-4 overflow-y-auto">
                <div className="mb-6">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50 px-3 mb-2 hidden md:block">健康监测</div>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white bg-white/20 font-semibold mb-1 justify-center md:justify-start">
                        <i className="fas fa-th-large w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">健康概览</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white mb-1 justify-center md:justify-start">
                        <i className="fas fa-tint w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">血糖管理</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white mb-1 justify-center md:justify-start">
                        <i className="fas fa-heart w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">血压管理</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white mb-1 justify-center md:justify-start">
                        <i className="fas fa-chart-line w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">糖化血红蛋白</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white mb-1 justify-center md:justify-start">
                        <i className="fas fa-flask w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">尿酸检测</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white mb-1 justify-center md:justify-start">
                        <i className="fas fa-burn w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">血酮检测</span>
                    </Link>
                </div>

                <div className="mb-6">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50 px-3 mb-2 hidden md:block">智能服务</div>
                    <Link href="#" className="relative flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white mb-1 justify-center md:justify-start">
                        <i className="fas fa-robot w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">AI助手</span>
                        <span className="absolute top-1 right-1 md:relative md:top-0 md:right-0 md:ml-auto bg-red-500 text-white text-[8px] md:text-[11px] py-[2px] px-1 md:px-2 rounded-full font-semibold">新</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white mb-1 justify-center md:justify-start">
                        <i className="fas fa-hospital w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">互联网医院</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white mb-1 justify-center md:justify-start">
                        <i className="fas fa-microchip w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">设备管理</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white mb-1 justify-center md:justify-start">
                        <i className="fas fa-file-medical-alt w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">健康报告</span>
                    </Link>
                </div>

                <div className="mb-6">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50 px-3 mb-2 hidden md:block">设置</div>
                    <Link href="#" className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl cursor-pointer transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white mb-1 justify-center md:justify-start">
                        <i className="fas fa-cog w-5 text-center text-base"></i>
                        <span className="text-sm hidden md:inline">系统设置</span>
                    </Link>
                </div>
            </nav>

            <Link href="#" className="p-4 border-t border-white/10 flex items-center gap-3 cursor-pointer transition-colors hover:bg-white/10 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-base">张</div>
                <div className="flex-1 hidden md:block">
                    <div className="text-sm font-semibold">张先生</div>
                    <div className="text-xs text-white/60">健康会员</div>
                </div>
            </Link>
        </aside>
    );
}
