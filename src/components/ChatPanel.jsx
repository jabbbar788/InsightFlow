import { useEffect, useRef } from 'react';

import { COLORS } from '../data';

export default function ChatPanel({ messages, input, onInputChange, onSend, setInput, typing, cannedQuestions, docs }) {
  const chatEnd = useRef(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  return (
    <div className="panel-card">
      <div className="panel-header">
        <div className="status-dot" style={{ background: COLORS.success }} />
        <span>RAG-Powered Support Agent</span>
        <span className="panel-meta">{docs.length} docs • {docs.reduce((total, doc) => total + doc.chunks, 0)} chunks indexed</span>
      </div>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'chat-row user' : 'chat-row bot'}>
            <div className={m.role === 'user' ? 'avatar user' : 'avatar bot'}>{m.role === 'bot' ? 'AI' : 'U'}</div>
            <div className={m.role === 'user' ? 'chat-bubble user' : 'chat-bubble bot'}>
              {m.text}
              <div className="chat-time">{m.time}</div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="chat-row bot">
            <div className="avatar bot">AI</div>
            <div className="chat-bubble bot typing-bubble">•••</div>
          </div>
        )}
        <div ref={chatEnd} />
      </div>
      <div className="chat-actions">
        <input
          value={input}
          onChange={onInputChange}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder="Ask about refunds, pricing, API, account..."
          className="chat-input"
        />
        <button onClick={onSend} className="primary-button">
          Send
        </button>
      </div>
      <div className="quick-actions">
        {cannedQuestions.map((q) => (
          <button key={q} onClick={() => setInput(q)} className="pill-button">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
