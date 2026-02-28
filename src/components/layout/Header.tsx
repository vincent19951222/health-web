'use client';
import { useState, useEffect } from 'react';

export default function Header() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        }));
    }, []);

    return (
        <header className="header">
            <div className="header-left">
                <h2 className="page-title">健康概览</h2>
                {currentDate && <span className="header-date">{currentDate}</span>}
            </div>
            <div className="header-right">
                <button className="header-btn header-btn-secondary">
                    <i className="fas fa-download"></i>
                    导出报告
                </button>
                <button className="header-btn header-btn-primary">
                    <i className="fas fa-plus"></i>
                    新建记录
                </button>
                <div className="notification-btn" title="通知">
                    <i className="fas fa-bell" style={{ color: 'var(--gray-600)' }}></i>
                    <span className="notification-dot"></span>
                </div>
            </div>
        </header>
    );
}
