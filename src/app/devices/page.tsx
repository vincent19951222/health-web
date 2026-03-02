"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/devices-main.css";

// Interface for Device data
interface IDevice {
    id: string;
    name: string;
    desc: string;
    image: string;
    status: "connected" | "unconnected";
}

// Interface for Device Category
interface IDeviceCategory {
    id: string;
    title: string;
    icon: string;
    devices: IDevice[];
}

// Mock Data
const DEVICE_CATEGORIES: IDeviceCategory[] = [
    {
        id: "multi",
        title: "多参数检测设备",
        icon: "fas fa-layer-group",
        devices: [
            {
                id: "d1",
                name: "优唐医生血压/血糖/尿酸/血酮测试仪(Y916D-4G版)",
                desc: "一机测四项，新时代智能黑科技！快速出值，语音播报。",
                image: "/imgs/四合一血糖.png",
                status: "connected"
            }
        ]
    },
    {
        id: "glucose",
        title: "血糖仪设备",
        icon: "fas fa-tint",
        devices: [
            {
                id: "d2",
                name: "优唐医生血糖仪(GLM-76L蓝牙版)",
                desc: "微量采血、8秒检测、高低警示、分类记忆",
                image: "/imgs/雅思.jpg",
                status: "unconnected"
            }
        ]
    },
    {
        id: "pressure",
        title: "血压计设备",
        icon: "fas fa-heartbeat",
        devices: [
            {
                id: "d3",
                name: "优唐医生电子血压计(蓝牙版)",
                desc: "一键测量、全程语音播报、大屏显示、心率不齐提示",
                image: "/imgs/血压计.jpg",
                status: "unconnected"
            }
        ]
    },
    {
        id: "cgm",
        title: "动态血糖仪",
        icon: "fas fa-wave-square",
        devices: [
            {
                id: "d4",
                name: "硅基动感 动态血糖仪",
                desc: "14天免扎针测血糖，手机碰一碰看结果。",
                image: "/imgs/cgmlogo.png",
                status: "unconnected"
            },
            {
                id: "d5",
                name: "三诺 动态血糖仪(三诺爱看)",
                desc: "15天实时监测，免扎手指，高低血糖自动报警。",
                image: "/imgs/sannuo.jpg",
                status: "unconnected"
            }
        ]
    }
];

export default function DevicesPage() {

    const connectDevice = (deviceId: string) => {
        alert(`正在跳转设备绑定/解绑页面 (ID: ${deviceId})...`);
    };

    const showHelp = (deviceId: string) => {
        alert(`正在打开设备使用帮助 (ID: ${deviceId})...`);
    };

    return (
        <DashboardLayout hideHeader>
            <div className="devices-page fade-in">
                {/* 顶部Header - Integrating with Dashboard Layout bounds indirectly */}
                <header className="bg-white px-8 py-5 border-b border-gray-200 flex items-center justify-between -mx-8 -mt-8 mb-6">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold text-gray-800">设备管理</h2>
                        <span className="text-sm text-gray-500 mt-1">智能硬件数据同步一站式管理</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                            <i className="fas fa-download"></i>
                            导出报告
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600">
                            <i className="fas fa-plus"></i>
                            新建记录
                        </button>
                    </div>
                </header>

                <div className="content-wrapper px-0 sm:px-2">
                    {DEVICE_CATEGORIES.map((category, idx) => (
                        <div key={category.id} className="category-section fade-in" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
                            <h2 className="category-title">
                                <i className={category.icon}></i>
                                {category.title}
                            </h2>
                            <div className="device-grid">
                                {category.devices.map(device => (
                                    <div key={device.id} className={`device-card ${device.status}`}>
                                        <div className="device-header">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={device.image} alt={device.name} className="device-image" />
                                            <div className="device-info">
                                                <h4 className="device-name">{device.name}</h4>
                                                <p className="device-desc">{device.desc}</p>
                                            </div>
                                        </div>
                                        <div className="device-actions">
                                            {device.status === "connected" ? (
                                                <button
                                                    className="btn-connect bound"
                                                    onClick={() => connectDevice(device.id)}
                                                >
                                                    <i className="fas fa-unlink"></i>
                                                    解除绑定
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn-connect unbound"
                                                    onClick={() => connectDevice(device.id)}
                                                >
                                                    <i className="fas fa-link"></i>
                                                    去绑定
                                                </button>
                                            )}
                                            <button
                                                className="btn-help"
                                                onClick={() => showHelp(device.id)}
                                            >
                                                <i className="fas fa-question-circle"></i>
                                                使用帮助
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
