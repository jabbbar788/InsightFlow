import { COLORS, cannedQuestions, getRAGResponse, initialTickets, tabs } from './data';
import { useRef, useState } from 'react';

import ChatPanel from './components/ChatPanel';
import DashboardPanel from './components/DashboardPanel';
import DocsPanel from './components/DocsPanel';
import Header from './components/Header';
import Tabs from './components/Tabs';
import TicketsPanel from './components/TicketsPanel';

function App() {
  const [tab, setTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "👋 Hi! I'm InsightFlow AI. Ask me anything — I'll retrieve answers from your company knowledge base.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [docs, setDocs] = useState([
    { name: 'refund_policy.pdf', size: '124 KB', status: 'indexed', chunks: 38 },
    { name: 'api_documentation.pdf', size: '890 KB', status: 'indexed', chunks: 214 },
    { name: 'billing_faq.pdf', size: '67 KB', status: 'indexed', chunks: 22 },
    { name: 'account_faq.pdf', size: '45 KB', status: 'indexed', chunks: 17 },
  ]);
  const [tickets, setTickets] = useState(initialTickets);
  const [uploadMsg, setUploadMsg] = useState('');
  const fileRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      role: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const resp = getRAGResponse(userMsg.text);
      setMessages((prev) => [...prev, { role: 'bot', text: resp, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDoc = { name: file.name, size: `${Math.round(file.size / 1024)} KB`, status: 'processing', chunks: 0 };
    setDocs((prev) => [newDoc, ...prev]);
    setUploadMsg(`Uploading "${file.name}"...`);

    setTimeout(() => {
      setDocs((prev) => prev.map((doc) => (doc.name === file.name ? { ...doc, status: 'indexed', chunks: Math.floor(Math.random() * 80) + 20 } : doc)));
      setUploadMsg(`✅ "${file.name}" indexed successfully!`);
      setTimeout(() => setUploadMsg(''), 3000);
    }, 2000);
  };

  const resolveTicket = (id) => {
    setTickets((prev) => prev.map((ticket) => (ticket.id === id ? { ...ticket, status: 'resolved' } : ticket)));
  };

  return (
    <div className="app-shell" style={{ color: COLORS.text, background: COLORS.grayLight }}>
      <Header />
      <Tabs tabs={tabs} activeTab={tab} onChange={setTab} />
      <main className="page-container">
        {tab === 'chat' && (
          <ChatPanel
            messages={messages}
            input={input}
            onInputChange={(e) => setInput(e.target.value)}
            onSend={sendMessage}
            setInput={setInput}
            typing={typing}
            cannedQuestions={cannedQuestions}
            docs={docs}
          />
        )}
        {tab === 'dashboard' && <DashboardPanel />}
        {tab === 'docs' && <DocsPanel docs={docs} onUpload={handleUpload} uploadMsg={uploadMsg} fileRef={fileRef} />}
        {tab === 'tickets' && <TicketsPanel tickets={tickets} onResolve={resolveTicket} />}
      </main>
    </div>
  );
}

export default App;
