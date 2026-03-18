"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    href: string;
    label: string;
    icon: string;
    aliases?: string[];
    badge?: string;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
    {
        title: "健康监测",
        items: [
            { href: "/", label: "健康总览", icon: "fa-chart-pie", aliases: ["/dashboard"] },
            { href: "/blood-sugar", label: "血糖管理", icon: "fa-droplet" },
            { href: "/blood-pressure", label: "血压管理", icon: "fa-heart-pulse" },
            { href: "/glycated", label: "糖化血红蛋白", icon: "fa-chart-line" },
            { href: "/uric-acid", label: "尿酸监测", icon: "fa-vial" },
            { href: "/blood-ketone", label: "血酮监测", icon: "fa-wave-square" },
        ],
    },
    {
        title: "智能服务",
        items: [
            { href: "/ai-chat", label: "AI 健康助手", icon: "fa-robot", badge: "NEW" },
            { href: "/hospital", label: "互联网医院", icon: "fa-hospital" },
            { href: "/reports", label: "健康报告", icon: "fa-file-medical" },
        ],
    },
    {
        title: "系统设置",
        items: [{ href: "/settings", label: "设置中心", icon: "fa-cog" }],
    },
];

function isPathActive(pathname: string, href: string, aliases?: string[]) {
    if (href === "/") {
        return pathname === "/" || pathname === "/dashboard" || aliases?.includes(pathname);
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <Link href="/" className="sidebar-logo__link">
                    <div className="sidebar-logo__mark">
                        <span className="sidebar-logo__dot" />
                        YT
                    </div>
                    <div>
                        <div className="sidebar-logo__title">优糖智能</div>
                        <div className="sidebar-logo__subtitle">Health Command Center</div>
                    </div>
                </Link>
            </div>

            <nav className="sidebar-nav">
                {NAV_SECTIONS.map((section) => (
                    <div className="nav-section" key={section.title}>
                        <div className="nav-section-title">{section.title}</div>
                        {section.items.map((item) => {
                            const active = isPathActive(pathname, item.href, item.aliases);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`nav-item ${active ? "active" : ""}`}
                                >
                                    <i className={`fas ${item.icon}`} />
                                    <span>{item.label}</span>
                                    {item.badge ? <span className="badge">{item.badge}</span> : null}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            <Link href="/settings" className="sidebar-user">
                <div className="user-avatar">唐</div>
                <div>
                    <div className="user-name">唐先生</div>
                    <div className="user-status">今日状态稳定</div>
                </div>
            </Link>
        </aside>
    );
}
