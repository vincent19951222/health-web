"use client";

import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/ai-chat-main.css";

// Types for messages
type MessageType = "user" | "ai";
interface Message {
    id: string;
    type: MessageType;
    content: React.ReactNode;
    time: string;
}

export default function AiChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const getCurrentTime = () => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
        const text = inputValue.trim();
        if (!text) return;

        // Add User Message
        const userMsg: Message = {
            id: Date.now().toString(),
            type: "user",
            content: text,
            time: getCurrentTime(),
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }

        // Show AI Typing
        setIsTyping(true);

        // Simulate AI Reply
        setTimeout(() => {
            setIsTyping(false);
            const aiReplyContent = generateAIResponse(text);
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                type: "ai",
                content: aiReplyContent,
                time: getCurrentTime(),
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1500);
    };

    const sendQuickQuestion = (question: string) => {
        setInputValue(question);
        // Force state update then send
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.value = question;
            }
            // Directly invoke action by bypassing standard ref read
            const userMsg: Message = {
                id: Date.now().toString(),
                type: "user",
                content: question,
                time: getCurrentTime(),
            };
            setMessages(prev => [...prev, userMsg]);
            setInputValue("");

            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                const aiMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    type: "ai",
                    content: generateAIResponse(question),
                    time: getCurrentTime(),
                };
                setMessages(prev => [...prev, aiMsg]);
            }, 1500);
        }, 0);
    };

    const generateAIResponse = (text: string) => {
        if (text.includes('血糖')) {
            return (
                <>
                    <p>您好！关于血糖值的问题，我来为您解答：</p>
                    <ul style={{ margin: '12px 0', paddingLeft: '20px', listStyleType: 'disc' }}>
                        <li><strong>空腹血糖</strong>：正常值应小于6.1mmol/L</li>
                        <li><strong>餐后2小时血糖</strong>：正常值应小于7.8mmol/L</li>
                        <li><strong>糖化血红蛋白</strong>：正常值应小于6.5%</li>
                    </ul>
                    <p>建议您定期监测血糖，保持健康的生活方式。如有疑问，请咨询您的主治医生。</p>
                </>
            );
        } else if (text.includes('水果') || text.includes('饮食')) {
            return (
                <>
                    <p>糖尿病患者可以选择低糖水果，以下是一些推荐：</p>
                    <ul style={{ margin: '12px 0', paddingLeft: '20px', listStyleType: 'disc' }}>
                        <li><strong>推荐</strong>：苹果、柚子、草莓、蓝莓、猕猴桃</li>
                        <li><strong>适量</strong>：橙子、梨、桃子</li>
                        <li><strong>避免</strong>：葡萄、香蕉、荔枝、龙眼</li>
                    </ul>
                    <p>建议在两餐之间食用，每天控制在200g以内。</p>
                </>
            );
        } else {
            return (
                <>
                    <p>感谢您的咨询！我是您的AI健康助手，我会尽力为您提供专业的健康建议。</p>
                    <p>请问您还有其他问题吗？</p>
                </>
            );
        }
    };

    const newChat = () => {
        setMessages([]);
        setInputValue("");
    };

    return (
        <DashboardLayout hideHeader>
            {/* The main AI Chat Wrapper */}
            <div className={`ai-chat-page ai-main-wrapper ${isHistoryOpen ? 'history-open' : ''}`}>

                {/* Custom sticky sub-header over Dashboard default */}
                <header className="ai-header">
                    <div className="header-left">
                        <h1 className="page-title">优唐AI助手</h1>
                    </div>
                    <div className="header-right" style={{ display: 'flex', gap: '12px' }}>
                        <button className="header-btn header-btn-primary bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition" onClick={newChat}>
                            <i className="fas fa-plus mr-2"></i>
                            新建对话
                        </button>
                        <button className="header-btn header-btn-secondary bg-gray-100 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-200 transition" onClick={() => setIsHistoryOpen(true)}>
                            <i className="fas fa-history mr-2"></i>
                            历史记录
                        </button>
                    </div>
                </header>

                <div className="chat-container">
                    {messages.length === 0 && (
                        <>
                            {/* 欢迎消息卡片 */}
                            <div className="welcome-card fade-in">
                                <div className="welcome-avatar">
                                    <i className="fas fa-robot"></i>
                                </div>
                                <h2 className="welcome-title">👋 您好！我是您的AI健康助手</h2>
                                <p className="welcome-desc">
                                    我可以为您提供专业的健康管理建议，包括血糖数据解读、个性化饮食方案、
                                    运动指导、用药提醒等服务。请随时向我咨询您的健康问题。
                                </p>
                                <div className="welcome-features">
                                    <div className="feature-tag blood">
                                        <i className="fas fa-tint"></i>
                                        <span>血糖解读</span>
                                    </div>
                                    <div className="feature-tag food">
                                        <i className="fas fa-apple-alt"></i>
                                        <span>饮食建议</span>
                                    </div>
                                    <div className="feature-tag exercise">
                                        <i className="fas fa-running"></i>
                                        <span>运动指导</span>
                                    </div>
                                    <div className="feature-tag medicine">
                                        <i className="fas fa-pills"></i>
                                        <span>用药咨询</span>
                                    </div>
                                    <div className="feature-tag emotion">
                                        <i className="fas fa-heart"></i>
                                        <span>心理支持</span>
                                    </div>
                                </div>
                            </div>

                            {/* 快捷问题 */}
                            <div className="quick-questions fade-in" style={{ animationDelay: '0.1s' }}>
                                <div className="quick-questions-title">
                                    <i className="fas fa-lightbulb"></i>
                                    常见问题，点击快速咨询
                                </div>
                                <div className="quick-questions-grid">
                                    <button className="quick-question-btn purple" onClick={() => sendQuickQuestion('我的血糖值7.8mmol/L正常吗？')}>
                                        <i className="fas fa-tint"></i>
                                        <span>血糖值7.8mmol/L正常吗？</span>
                                    </button>
                                    <button className="quick-question-btn green" onClick={() => sendQuickQuestion('糖尿病患者适合吃什么水果？')}>
                                        <i className="fas fa-apple-alt"></i>
                                        <span>糖尿病患者适合吃什么水果？</span>
                                    </button>
                                    <button className="quick-question-btn blue" onClick={() => sendQuickQuestion('什么运动适合糖尿病患者？')}>
                                        <i className="fas fa-running"></i>
                                        <span>什么运动适合糖尿病患者？</span>
                                    </button>
                                    <button className="quick-question-btn red" onClick={() => sendQuickQuestion('胰岛素注射有什么注意事项？')}>
                                        <i className="fas fa-syringe"></i>
                                        <span>胰岛素注射有什么注意事项？</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Messages List Context */}
                    <div className="messages-container">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message fade-in ${msg.type}`}>
                                <div className="message-avatar">
                                    {msg.type === "ai" ? <i className="fas fa-robot"></i> : "张"}
                                </div>
                                <div className="message-content">
                                    {msg.content}
                                    {msg.type === "ai" && (
                                        <div className="message-meta">
                                            <span className="message-time">{msg.time}</span>
                                            <div className="message-actions">
                                                <button className="message-action-btn">
                                                    <i className="fas fa-thumbs-up"></i> 有用
                                                </button>
                                                <button className="message-action-btn">
                                                    <i className="fas fa-copy"></i> 复制
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {msg.type === "user" && <span className="message-time text-xs ml-2 text-white/70 block mt-2 text-right">{msg.time}</span>}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="typing-indicator active">
                                <div className="typing-dots">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                                <span style={{ fontSize: '14px', color: 'var(--gray-500)', marginLeft: '8px' }}>AI正在思考...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Fixed Bottom Input Area */}
                <div className="input-area">
                    <div className="input-wrapper">
                        <div className="input-container">
                            <div className="input-actions-left">
                                <button className="input-action-btn" title="语音输入">
                                    <i className="fas fa-microphone"></i>
                                </button>
                                <button className="input-action-btn" title="上传图片">
                                    <i className="fas fa-image"></i>
                                </button>
                            </div>
                            <textarea
                                className="message-input"
                                ref={textareaRef}
                                value={inputValue}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                placeholder="请输入您的健康问题..."
                                rows={1}
                                maxLength={500}
                            />
                            <button
                                className="send-btn"
                                disabled={!inputValue.trim()}
                                onClick={sendMessage}
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div className="input-hint">
                            <i className="fas fa-info-circle mr-1"></i>
                            内容由AI生成，仅供参考，如有不适请及时就医
                        </div>
                    </div>
                </div>

                {/* Right Overlays and Panel */}
                <div
                    className={`history-overlay ${isHistoryOpen ? 'active' : ''}`}
                    onClick={() => setIsHistoryOpen(false)}
                ></div>

                <aside className={`history-panel ${isHistoryOpen ? 'open' : ''}`}>
                    <div className="history-panel-header">
                        <h3 className="history-panel-title">历史会话</h3>
                        <button className="history-panel-close" onClick={() => setIsHistoryOpen(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="history-panel-content">
                        {/* 今天 */}
                        <div className="history-date-group">
                            <div className="history-date-label">今天</div>
                            <div className="history-item active" onClick={() => setIsHistoryOpen(false)}>
                                <div className="history-item-title">血糖值咨询</div>
                                <div className="history-item-preview">我的血糖值7.8mmol/L正常吗？</div>
                                <div className="history-item-time">10:30</div>
                            </div>
                            <div className="history-item" onClick={() => setIsHistoryOpen(false)}>
                                <div className="history-item-title">饮食建议咨询</div>
                                <div className="history-item-preview">糖尿病患者可以吃哪些水果？</div>
                                <div className="history-item-time">09:15</div>
                            </div>
                        </div>

                        {/* 昨天 */}
                        <div className="history-date-group">
                            <div className="history-date-label">昨天</div>
                            <div className="history-item" onClick={() => setIsHistoryOpen(false)}>
                                <div className="history-item-title">运动方案咨询</div>
                                <div className="history-item-preview">什么运动适合糖尿病患者？需要注意什么？</div>
                                <div className="history-item-time">18:42</div>
                            </div>
                            <div className="history-item" onClick={() => setIsHistoryOpen(false)}>
                                <div className="history-item-title">用药咨询</div>
                                <div className="history-item-preview">胰岛素注射前需要注意什么？</div>
                                <div className="history-item-time">14:20</div>
                            </div>
                        </div>

                        {/* 更早 */}
                        <div className="history-date-group">
                            <div className="history-date-label">更早</div>
                            <div className="history-item" onClick={() => setIsHistoryOpen(false)}>
                                <div className="history-item-title">健康报告解读</div>
                                <div className="history-item-preview">请帮我解读一下最近的体检报告</div>
                                <div className="history-item-time">2月25日</div>
                            </div>
                            <div className="history-item" onClick={() => setIsHistoryOpen(false)}>
                                <div className="history-item-title">血糖趋势分析</div>
                                <div className="history-item-preview">最近一周的血糖数据怎么样？</div>
                                <div className="history-item-time">2月23日</div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </DashboardLayout>
    );
}
