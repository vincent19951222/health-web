"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname.startsWith(path);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h1>
                    <i className="fas fa-heartbeat"></i>
                    <span>优唐智能AI+</span>
                </h1>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <div className="nav-section-title">健康监测</div>
                    <Link href="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                        <i className="fas fa-th-large"></i>
                        <span>健康概览</span>
                    </Link>
                    <Link href="/blood-sugar" className={`nav-item ${isActive('/blood-sugar') ? 'active' : ''}`}>
                        <i className="fas fa-tint"></i>
                        <span>血糖管理</span>
                    </Link>
                    <Link href="/blood-pressure" className={`nav-item ${isActive('/blood-pressure') ? 'active' : ''}`}>
                        <i className="fas fa-heart"></i>
                        <span>血压管理</span>
                    </Link>
                    <Link href="/glycated" className={`nav-item ${isActive('/glycated') ? 'active' : ''}`}>
                        <i className="fas fa-chart-line"></i>
                        <span>糖化血红蛋白</span>
                    </Link>
                    <Link
                        href="/uric-acid"
                        className={`nav-item ${isActive('/uric-acid') ? 'active' : ''}`}
                    >
                        <i className="fas fa-flask w-5 text-center text-lg"></i>
                        <span className="text-sm">尿酸检测</span>
                    </Link>
                    <Link
                        href="/blood-ketone"
                        className={`nav-item ${isActive('/blood-ketone') ? 'active' : ''}`}
                    >
                        <i className="fas fa-burn w-5 text-center text-lg"></i>
                        <span className="text-sm">血酮检测</span>
                    </Link>
                </div>

                <div className="nav-section">
                    <div className="nav-section-title">智能服务</div>
                    <Link
                        href="/ai-chat"
                        className={`nav-item ${isActive('/ai-chat') ? 'active' : ''}`}
                    >
                        <i className="fas fa-robot w-5 text-center text-lg"></i>
                        <span className="text-sm">AI助手</span>
                        <span className="badge bg-red-500 text-white text-[11px] px-2 py-0.5 rounded-full font-semibold ml-auto">新</span>
                    </Link>
                    <Link
                        href="/hospital"
                        className={`nav-item ${isActive('/hospital') ? 'active' : ''}`}
                    >
                        <i className="fas fa-hospital w-5 text-center text-lg"></i>
                        <span className="text-sm">互联网医院</span>
                    </Link>
                    <Link
                        href="/devices"
                        className={`nav-item ${isActive('/devices') ? 'active' : ''}`}
                    >
                        <i className="fas fa-microchip w-5 text-center text-lg"></i>
                        <span className="text-sm">设备管理</span>
                    </Link>
                    <Link
                        href="/reports"
                        className={`nav-item ${isActive('/reports') ? 'active' : ''}`}
                    >
                        <i className="fas fa-file-medical-alt w-5 text-center text-lg"></i>
                        <span className="text-sm">健康报告</span>
                    </Link>
                </div>

                <div className="nav-section">
                    <div className="nav-section-title">设置</div>
                    <Link href="#" className="nav-item">
                        <i className="fas fa-cog"></i>
                        <span>系统设置</span>
                    </Link>
                </div>
            </nav>

            <Link href="#" className="sidebar-user">
                <div className="user-avatar">张</div>
                <div>
                    <div className="user-name">张先生</div>
                    <div className="user-status">健康会员</div>
                </div>
            </Link>
        </aside>
    );
}
