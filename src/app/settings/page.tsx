"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
    const router = useRouter();
    const [toastMessage, setToastMessage] = useState("");

    // Switch states
    const [msgEnabled, setMsgEnabled] = useState(true);
    const [privacyEnabled, setPrivacyEnabled] = useState(false);
    const [alertEnabled, setAlertEnabled] = useState(true);

    // Password states
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const showToast = (message: string) => {
        setToastMessage(message);
    };

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(""), 2000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const toggleSetting = (e: React.MouseEvent, type: string) => {
        e.stopPropagation();
        let next = false;
        if (type === "消息通知") { next = !msgEnabled; setMsgEnabled(next); }
        else if (type === "隐私模式") { next = !privacyEnabled; setPrivacyEnabled(next); }
        else if (type === "异常登录提醒") { next = !alertEnabled; setAlertEnabled(next); }
        showToast(type + (next ? "已开启" : "已关闭"));
    };

    const updatePwd = () => {
        if (!oldPwd || !newPwd || !confirmPwd) return showToast("请完整填写密码信息");
        if (newPwd.length < 8) return showToast("新密码至少需要 8 位");
        if (newPwd !== confirmPwd) return showToast("两次输入的新密码不一致");
        setOldPwd(""); setNewPwd(""); setConfirmPwd("");
        showToast("密码修改成功（演示）");
    };

    return (
        <DashboardLayout hideHeader>
            <div style={{ minHeight: "100vh", background: "var(--gray-50)" }}>
                {/* Header */}
                <header className="page-header">
                    <div className="header-left">
                        <h1 className="page-title">系统设置</h1>
                        <p className="page-title-sub">管理账号安全、通知偏好与隐私设置</p>
                    </div>
                    <div className="header-right">
                        <button className="header-btn header-btn-secondary" onClick={() => router.push("/dashboard")}>
                            <i className="fas fa-arrow-left"></i>
                            返回看板
                        </button>
                        <button className="header-btn header-btn-primary" onClick={() => showToast("设置已保存")}>
                            <i className="fas fa-save"></i>
                            保存更改
                        </button>
                    </div>
                </header>

                {/* 账号与安全概览 */}
                <div className="card" style={{ marginBottom: "24px" }}>
                    <div className="card-header">
                        <div>
                            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--gray-900)" }}>账号与安全概览</h2>
                            <p style={{ fontSize: "13px", color: "var(--gray-500)", marginTop: "4px" }}>查看账号安全状态和已开启的保护项</p>
                        </div>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-value">3</div>
                            <div className="stat-label">已开启保护项</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value" style={{ color: "var(--warning-500)" }}>1</div>
                            <div className="stat-label">待处理提醒</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">7天</div>
                            <div className="stat-label">最近密码更新</div>
                        </div>
                    </div>
                </div>

                {/* 账号安全 + 系统偏好 */}
                <div className="grid-2" style={{ marginBottom: "24px" }}>
                    {/* 账号安全 */}
                    <details className="card">
                        <summary className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", listStyle: "none", outline: "none" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--gray-900)" }}>账号安全</h3>
                            <i className="fas fa-chevron-down toggle-icon"></i>
                        </summary>
                        <div className="settings-list" style={{ marginTop: "16px" }}>
                            <div className="settings-item">
                                <div className="settings-item-left">
                                    <div className="settings-icon blue"><i className="fas fa-mobile-screen-button"></i></div>
                                    <div className="settings-text">
                                        <div className="settings-name">已绑定手机号</div>
                                        <div className="settings-desc">用于登录验证、找回密码和异常提醒</div>
                                    </div>
                                </div>
                                <div className="settings-value">138****8888</div>
                            </div>
                            <div className="settings-item" onClick={() => document.getElementById("oldPwd")?.focus()}>
                                <div className="settings-item-left">
                                    <div className="settings-icon green"><i className="fas fa-lock"></i></div>
                                    <div className="settings-text">
                                        <div className="settings-name">登录密码</div>
                                        <div className="settings-desc">修改后其他设备将重新校验登录状态</div>
                                    </div>
                                </div>
                                <div className="settings-value" style={{ color: "var(--primary-500)" }}>修改密码</div>
                            </div>
                        </div>
                        <div className="password-form">
                            <input type="password" id="oldPwd" className="form-input" placeholder="当前密码" value={oldPwd} onChange={e => setOldPwd(e.target.value)} />
                            <input type="password" id="newPwd" className="form-input" placeholder="新密码（至少 8 位）" value={newPwd} onChange={e => setNewPwd(e.target.value)} />
                            <input type="password" id="confirmPwd" className="form-input" placeholder="确认新密码" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} />
                            <button className="form-btn" onClick={updatePwd}>更新密码</button>
                        </div>
                    </details>

                    {/* 系统偏好 */}
                    <details className="card">
                        <summary className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", listStyle: "none", outline: "none" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--gray-900)" }}>系统偏好</h3>
                            <i className="fas fa-chevron-down toggle-icon"></i>
                        </summary>
                        <div className="settings-list" style={{ marginTop: "16px" }}>
                            <div className="settings-item">
                                <div className="settings-item-left">
                                    <div className="settings-icon cyan"><i className="fas fa-bell"></i></div>
                                    <div className="settings-text">
                                        <div className="settings-name">消息通知</div>
                                        <div className="settings-desc">设备异常、AI 报告、亲友提醒</div>
                                    </div>
                                </div>
                                <button className={`toggle ${msgEnabled ? "on" : ""}`} onClick={e => toggleSetting(e, "消息通知")}></button>
                            </div>
                            <div className="settings-item">
                                <div className="settings-item-left">
                                    <div className="settings-icon green"><i className="fas fa-shield-halved"></i></div>
                                    <div className="settings-text">
                                        <div className="settings-name">隐私模式</div>
                                        <div className="settings-desc">隐藏手机号、设备号与敏感指标</div>
                                    </div>
                                </div>
                                <button className={`toggle ${privacyEnabled ? "on" : ""}`} onClick={e => toggleSetting(e, "隐私模式")}></button>
                            </div>
                            <div className="settings-item">
                                <div className="settings-item-left">
                                    <div className="settings-icon orange"><i className="fas fa-triangle-exclamation"></i></div>
                                    <div className="settings-text">
                                        <div className="settings-name">异常登录提醒</div>
                                        <div className="settings-desc">检测到新设备登录时提醒</div>
                                    </div>
                                </div>
                                <button className={`toggle ${alertEnabled ? "on" : ""}`} onClick={e => toggleSetting(e, "异常登录提醒")}></button>
                            </div>
                        </div>
                    </details>
                </div>

                {/* 数据与支持 + 会话管理 */}
                <div className="grid-2">
                    {/* 数据与支持 */}
                    <div className="card">
                        <div className="card-header">
                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--gray-900)" }}>数据与支持</h3>
                        </div>
                        <div className="settings-list">
                            <div className="settings-item" onClick={() => showToast("正在导出健康数据")}>
                                <div className="settings-item-left">
                                    <div className="settings-icon cyan"><i className="fas fa-file-export"></i></div>
                                    <div className="settings-text">
                                        <div className="settings-name">导出健康数据</div>
                                        <div className="settings-desc">导出近 90 天血糖、血压与同步记录</div>
                                    </div>
                                </div>
                                <i className="fas fa-chevron-right" style={{ color: "var(--gray-400)" }}></i>
                            </div>
                            <Link href="#" className="settings-item" style={{ textDecoration: "none", color: "inherit" }}>
                                <div className="settings-item-left">
                                    <div className="settings-icon blue"><i className="fas fa-circle-info"></i></div>
                                    <div className="settings-text">
                                        <div className="settings-name">关于</div>
                                        <div className="settings-desc">版本信息、服务协议与产品说明</div>
                                    </div>
                                </div>
                                <div className="settings-value">v2.6.1</div>
                            </Link>
                            <div className="settings-item" onClick={() => showToast("帮助中心开发中")}>
                                <div className="settings-item-left">
                                    <div className="settings-icon green"><i className="fas fa-headset"></i></div>
                                    <div className="settings-text">
                                        <div className="settings-name">帮助中心</div>
                                        <div className="settings-desc">设备绑定、异常排查与账号说明</div>
                                    </div>
                                </div>
                                <i className="fas fa-chevron-right" style={{ color: "var(--gray-400)" }}></i>
                            </div>
                        </div>
                    </div>

                    {/* 会话管理 */}
                    <div className="card danger-card">
                        <div className="card-header">
                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--danger-500)" }}>会话管理</h3>
                        </div>
                        <div className="session-info">
                            <div className="session-item">
                                <div className="session-icon"><i className="fas fa-desktop"></i></div>
                                <div className="session-details">
                                    <div className="session-name">当前设备</div>
                                    <div className="session-meta">Windows 10 · Chrome 浏览器</div>
                                </div>
                                <div className="session-status active">在线</div>
                            </div>
                            <div className="session-item">
                                <div className="session-icon other"><i className="fas fa-mobile-alt"></i></div>
                                <div className="session-details">
                                    <div className="session-name">iPhone 15 Pro</div>
                                    <div className="session-meta">上次活跃: 2小时前</div>
                                </div>
                                <div className="session-status">离线</div>
                            </div>
                        </div>
                        <button className="logout-btn" onClick={() => showToast("退出登录功能开发中")}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>退出登录</span>
                        </button>
                        <p className="logout-hint">退出后将返回登录页，当前浏览器缓存凭据会失效</p>
                    </div>
                </div>

                {/* 底部信息栏 */}
                <footer style={{ background: "white", borderTop: "1px solid var(--gray-200)", padding: "12px 32px", display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--gray-500)", marginTop: "24px" }}>
                    <span>系统设置 Web 原型页</span>
                    <span>最近更新: 2026-02-28</span>
                </footer>

                {/* Toast */}
                {toastMessage && (
                    <div className="toast show" style={{ position: "fixed", right: "24px", bottom: "24px", background: "var(--gray-800)", color: "white", padding: "12px 20px", borderRadius: "var(--radius-lg)", fontSize: "14px", zIndex: 1000 }}>
                        {toastMessage}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
