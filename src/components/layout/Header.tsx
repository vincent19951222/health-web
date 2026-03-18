'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface HeaderProps {
    pageTitle?: string;
    pageSubtitle?: string;
    actions?: React.ReactNode;
}

const ROUTE_META: Record<string, { title: string; subtitle: string }> = {
    "/": {
        title: "健康总览",
        subtitle: "从关键指标到趋势分析，集中查看今日健康状态。",
    },
    "/dashboard": {
        title: "健康总览",
        subtitle: "从关键指标到趋势分析，集中查看今日健康状态。",
    },
    "/blood-sugar": {
        title: "血糖管理",
        subtitle: "持续关注血糖趋势、记录与目标达成情况。",
    },
    "/blood-pressure": {
        title: "血压管理",
        subtitle: "快速查看收缩压、舒张压与历史波动。",
    },
    "/glycated": {
        title: "糖化血红蛋白",
        subtitle: "聚焦长期控糖质量与阶段变化趋势。",
    },
    "/uric-acid": {
        title: "尿酸监测",
        subtitle: "追踪尿酸波动，辅助日常饮食与生活管理。",
    },
    "/blood-ketone": {
        title: "血酮监测",
        subtitle: "关注酮体变化，及时识别异常状态。",
    },
    "/ai-chat": {
        title: "AI 健康助手",
        subtitle: "结合你的健康数据，获取更贴身的分析建议。",
    },
    "/hospital": {
        title: "互联网医院",
        subtitle: "连接问诊、咨询与专业医疗服务入口。",
    },
    "/reports": {
        title: "健康报告",
        subtitle: "查看、导出与管理你的阶段性健康档案。",
    },
    "/settings": {
        title: "系统设置",
        subtitle: "管理提醒、设备、偏好与账号配置。",
    },
};

function resolveRouteMeta(pathname: string) {
    const exact = ROUTE_META[pathname];
    if (exact) {
        return exact;
    }

    const matchedPrefix = Object.keys(ROUTE_META)
        .filter((key) => key !== "/" && pathname.startsWith(key))
        .sort((a, b) => b.length - a.length)[0];

    return ROUTE_META[matchedPrefix] ?? ROUTE_META["/dashboard"];
}

export default function Header({ pageTitle, pageSubtitle, actions }: HeaderProps) {
    const pathname = usePathname();
    const routeMeta = useMemo(() => resolveRouteMeta(pathname), [pathname]);
    const currentDate = useMemo(
        () =>
            new Date().toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
            }),
        [],
    );
    const title = pageTitle ?? routeMeta.title;
    const subtitle = pageSubtitle ?? routeMeta.subtitle;

    return (
        <header className="dashboard-header">
            <div className="dashboard-header__left">
                <div className="dashboard-header__eyebrow">
                    <span className="dashboard-header__pulse" />
                    AI 健康管理工作台
                </div>
                <div>
                    <h1 className="page-title">{title}</h1>
                    <p className="page-title-sub">{subtitle}</p>
                </div>
            </div>

            <div className="dashboard-header__right">
                <div className="dashboard-header__date">
                    <span className="dashboard-header__date-label">今日日期</span>
                    <strong>{currentDate || "正在同步时间..."}</strong>
                </div>

                {actions ?? (
                    <>
                        <Link href="/reports" className="header-btn header-btn-secondary">
                            <i className="fas fa-file-medical" />
                            生成报告
                        </Link>
                        <Link href="/ai-chat" className="header-btn header-btn-primary">
                            <i className="fas fa-robot" />
                            咨询 AI
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
