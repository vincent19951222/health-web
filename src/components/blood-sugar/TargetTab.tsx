"use client";

import { useState } from "react";

interface TargetRow {
    id: number;
    period: string;
    recommendation: string;
    min: string;
    max: string;
}

export default function TargetTab() {
    const [isEditMode, setIsEditMode] = useState(false);

    const [targets, setTargets] = useState<TargetRow[]>([
        { id: 1, period: "空腹", recommendation: "4.4-7.0", min: "4.4", max: "7.0" },
        { id: 2, period: "餐前", recommendation: "4.0-7.8", min: "4.0", max: "7.8" },
        { id: 3, period: "餐后", recommendation: "4.0-10.0", min: "4.0", max: "10.0" },
        { id: 4, period: "睡前", recommendation: "4.0-10.0", min: "4.0", max: "10.0" },
        { id: 5, period: "凌晨", recommendation: "4.0-10.0", min: "4.0", max: "10.0" },
    ]);

    const handleInputChange = (id: number, field: "min" | "max", value: string) => {
        setTargets(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const toggleEditMode = () => setIsEditMode(!isEditMode);

    const saveTargets = () => {
        setIsEditMode(false);
        alert("血糖目标设置已保存！");
    };

    return (
        <div className="tab-content active fade-in">
            <div className="target-card">
                <div className="target-header">
                    <h4 className="target-title">血糖目标设置</h4>
                    <button onClick={toggleEditMode} className="header-btn header-btn-primary">
                        {isEditMode ? (
                            <><i className="fas fa-times"></i> 取消修改</>
                        ) : (
                            <><i className="fas fa-edit"></i> 修改目标</>
                        )}
                    </button>
                </div>
                <table className="target-table">
                    <thead>
                        <tr>
                            <th>时间段</th>
                            <th>推荐值 (mmol/L)</th>
                            <th>我的目标 (mmol/L)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {targets.map(row => (
                            <tr key={row.id}>
                                <td><strong>{row.period}</strong></td>
                                <td>{row.recommendation}</td>
                                <td className="target-value">
                                    {!isEditMode ? (
                                        <span>{row.min}-{row.max}</span>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                className="target-input"
                                                value={row.min}
                                                onChange={(e) => handleInputChange(row.id, "min", e.target.value)}
                                            /> -
                                            <input
                                                type="text"
                                                className="target-input"
                                                value={row.max}
                                                onChange={(e) => handleInputChange(row.id, "max", e.target.value)}
                                                style={{ marginLeft: '4px' }}
                                            />
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEditMode && (
                    <div style={{ padding: "20px 24px", borderTop: "1px solid var(--gray-100)" }}>
                        <button onClick={saveTargets} className="header-btn header-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                            <i className="fas fa-save"></i>
                            保存目标设置
                        </button>
                    </div>
                )}
                <div className="target-notice">
                    <h4><i className="fas fa-info-circle" style={{ color: "var(--primary-500)" }}></i> 温馨提示</h4>
                    <p>1、血糖推荐值是根据您填写的年龄、身高、体重、糖尿病类型等情况，智能分析得出，个人信息越精准，推荐值越符合您的个体需求。</p>
                    <p>2、血糖控制需要根据自身情况合理设置，谨防过高或过低。如不确定，请咨询您的健康管理师。</p>
                    <p>3、以上数据内容仅供参考，不作为诊断治疗依据。</p>
                </div>
            </div>
        </div>
    );
}
