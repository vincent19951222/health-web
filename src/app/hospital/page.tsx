"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/hospital-main.css";

// Mock data for doctors
const DOCTORS = [
    {
        id: "d1",
        name: "欧阳存",
        title: "主任医师",
        department: "内分泌科",
        experience: "35年经验",
        tags: ["糖尿病", "甲状腺疾病", "代谢综合征"],
        stats: { rating: "4.9", consults: "12,580", approval: "98%" },
        image: "/imgs/欧阳存.png"
    },
    {
        id: "d2",
        name: "聂慧敏",
        title: "主治医师",
        department: "内分泌科",
        experience: "15年经验",
        tags: ["妊娠糖尿病", "血糖管理", "胰岛素治疗"],
        stats: { rating: "4.8", consults: "8,320", approval: "97%" },
        image: "/imgs/聂慧敏.png"
    },
    {
        id: "d3",
        name: "黄宏华",
        title: "执业医师",
        department: "营养科",
        experience: "10年经验",
        tags: ["饮食调理", "营养指导", "体重管理"],
        stats: { rating: "4.7", consults: "5,680", approval: "96%" },
        image: "/imgs/黄宏华.png"
    }
];

const DEPARTMENTS = ["全部", "内分泌科", "心血管科", "营养科", "全科", "中医科", "神经内科"];

export default function HospitalPage() {
    const [activeDepartment, setActiveDepartment] = useState("全部");

    const filteredDoctors = DOCTORS.filter(doc =>
        activeDepartment === "全部" || doc.department === activeDepartment
    );

    const consultDoctor = (doctorName: string) => {
        alert(`正在为您连接${doctorName}医生，请稍候...`);
    };

    return (
        <DashboardLayout hideHeader>
            <div className="hospital-page fade-in">
                {/* Header built into layout stream */}
                <header className="bg-white px-8 py-5 border-b border-gray-200 flex items-center justify-between -mx-8 -mt-8 mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">互联网医院</h1>
                        <p className="text-sm text-gray-500 mt-1">专业医生在线问诊，足不出户享受优质医疗服务</p>
                    </div>
                </header>

                <div className="content-wrapper px-0 sm:px-2">

                    {/* 服务介绍横幅 */}
                    <div className="service-banner fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="banner-content">
                            <h3>在线问诊服务</h3>
                            <p>三甲医院专家团队7×24小时在线，为您提供专业医疗咨询服务</p>
                        </div>
                        <div className="banner-icon">
                            <i className="fas fa-stethoscope"></i>
                        </div>
                    </div>

                    {/* 科室筛选 */}
                    <div className="department-filter fade-in" style={{ animationDelay: '0.2s' }}>
                        <h3 className="department-filter-title">选择科室</h3>
                        <div className="department-tags">
                            {DEPARTMENTS.map(dept => (
                                <span
                                    key={dept}
                                    className={`department-tag ${activeDepartment === dept ? 'active' : ''}`}
                                    onClick={() => setActiveDepartment(dept)}
                                >
                                    {dept}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="hospital-two-column fade-in" style={{ animationDelay: '0.3s' }}>
                        <div>
                            {/* 推荐医生 */}
                            <section className="doctors-section">
                                <div className="hospital-section-header">
                                    <h2 className="hospital-section-title">推荐医生</h2>
                                    <a className="view-all">
                                        查看全部
                                        <i className="fas fa-chevron-right text-[10px] ml-1"></i>
                                    </a>
                                </div>

                                <div className="doctors-grid">
                                    {filteredDoctors.map(doc => (
                                        <div key={doc.id} className="doctor-card">
                                            <div className="doctor-header">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={doc.image} alt={doc.name} className="doctor-avatar" />
                                                <div className="doctor-info">
                                                    <h3 className="doctor-name">{doc.name}</h3>
                                                    <p className="doctor-title">{doc.title}</p>
                                                    <p className="doctor-department">{doc.department} · {doc.experience}</p>
                                                </div>
                                            </div>
                                            <div className="doctor-tags">
                                                {doc.tags.map(tag => (
                                                    <span key={tag} className="doctor-tag">{tag}</span>
                                                ))}
                                            </div>
                                            <div className="doctor-stats">
                                                <div className="doctor-stat-item">
                                                    <div className="doctor-stat-value">{doc.stats.rating}</div>
                                                    <div className="doctor-stat-label">评分</div>
                                                </div>
                                                <div className="doctor-stat-item">
                                                    <div className="doctor-stat-value">{doc.stats.consults}</div>
                                                    <div className="doctor-stat-label">问诊数</div>
                                                </div>
                                                <div className="doctor-stat-item">
                                                    <div className="doctor-stat-value">{doc.stats.approval}</div>
                                                    <div className="doctor-stat-label">好评率</div>
                                                </div>
                                            </div>
                                            <button className="consult-btn" onClick={() => consultDoctor(doc.name)}>
                                                <span className="online-indicator"></span>
                                                在线问诊
                                            </button>
                                        </div>
                                    ))}

                                    {filteredDoctors.length === 0 && (
                                        <div className="col-span-full py-12 text-center text-gray-500">
                                            <i className="fas fa-stethoscope text-4xl mb-3 text-gray-300"></i>
                                            <p>此科室暂无推荐医生</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* 问诊须知 */}
                        <div className="notice-card sticky top-24 fade-in" style={{ animationDelay: '0.4s' }}>
                            <h3 className="notice-title">
                                <i className="fas fa-info-circle text-blue-500"></i>
                                问诊须知
                            </h3>
                            <ul className="notice-list">
                                <li className="notice-item">
                                    <div className="notice-icon"><i className="fas fa-clock"></i></div>
                                    <div className="notice-content">
                                        <h4>响应时间</h4>
                                        <p>医生通常在30分钟内回复，如遇高峰期可能稍有延迟</p>
                                    </div>
                                </li>
                                <li className="notice-item">
                                    <div className="notice-icon"><i className="fas fa-file-medical-alt"></i></div>
                                    <div className="notice-content">
                                        <h4>准备资料</h4>
                                        <p>建议提前准备好病历、检查报告等相关资料</p>
                                    </div>
                                </li>
                                <li className="notice-item">
                                    <div className="notice-icon"><i className="fas fa-comments"></i></div>
                                    <div className="notice-content">
                                        <h4>沟通方式</h4>
                                        <p>支持文字、语音、图片多种方式与医生沟通</p>
                                    </div>
                                </li>
                                <li className="notice-item">
                                    <div className="notice-icon"><i className="fas fa-shield-alt"></i></div>
                                    <div className="notice-content">
                                        <h4>隐私保护</h4>
                                        <p>所有问诊记录严格保密，保护您的个人隐私</p>
                                    </div>
                                </li>
                                <li className="notice-item">
                                    <div className="notice-icon"><i className="fas fa-exclamation-triangle text-amber-500"></i></div>
                                    <div className="notice-content">
                                        <h4>温馨提示</h4>
                                        <p>在线问诊不能替代线下面诊，紧急情况请及时就医</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
