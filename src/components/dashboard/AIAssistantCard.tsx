import Link from 'next/link';

export default function AIAssistantCard() {
    return (
        <section className="ai-assistant-section fade-in">
            <div className="ai-card">
                <div className="ai-card-header">
                    <div className="ai-avatar">
                        <i className="fas fa-robot"></i>
                    </div>
                    <div>
                        <div className="ai-title">小优AI健康建议</div>
                        <div className="ai-subtitle">基于您的健康数据提供个性化建议</div>
                    </div>
                    <Link href="/ai-assistant" className="ai-ask-btn">
                        <i className="fas fa-comment-dots"></i>
                        问AI
                    </Link>
                </div>

                <div className="ai-content">
                    根据您近期的血糖监测数据分析，空腹血糖平均6.2mmol/L，餐后2小时血糖平均7.8mmol/L，整体控制良好。
                    建议继续保持规律监测，并注意餐后30分钟进行轻度运动。
                </div>

                <div className="ai-suggestions">
                    <Link href="/ai-assistant" className="ai-suggestion-tag">
                        <i className="fas fa-robot"></i>问AI
                    </Link>
                    <span className="ai-suggestion-tag">查看详细建议</span>
                    <span className="ai-suggestion-tag">设置测量提醒</span>
                    <span className="ai-suggestion-tag">导出健康报告</span>
                </div>
            </div>
        </section>
    );
}
