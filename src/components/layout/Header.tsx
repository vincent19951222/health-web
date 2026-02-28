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
        <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <h2 className="text-[20px] font-bold text-gray-900">健康概览</h2>
                {currentDate && <span className="text-sm text-gray-500">{currentDate}</span>}
            </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 border-none">
                    <i className="fas fa-download"></i>
                    导出报告
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors bg-blue-500 text-white hover:bg-blue-600 border-none">
                    <i className="fas fa-plus"></i>
                    新建记录
                </button>
                <div className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-200" title="通知">
                    <i className="fas fa-bell text-gray-600"></i>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
            </div>
        </header>
    );
}
