export const COLORS = {
  primary: '#4F46E5',
  primaryLight: '#EEF2FF',
  success: '#16A34A',
  successLight: '#F0FDF4',
  warning: '#D97706',
  warningLight: '#FFFBEB',
  danger: '#DC2626',
  dangerLight: '#FEF2F2',
  gray: '#6B7280',
  grayLight: '#F9FAFB',
  border: '#E5E7EB',
  text: '#111827',
  textMuted: '#6B7280',
};

export const ragResponses = {
  default: [
    {
      q: 'refund',
      a: "Per our Refund Policy (Section 3.2): You may request a full refund within 30 days of purchase. To initiate, go to Account → Billing → Request Refund. Processing takes 5–7 business days.\n\n📄 Source: refund_policy.pdf",
    },
    {
      q: 'password',
      a: "To reset your password:\n1. Click 'Forgot Password' on the login page\n2. Enter your registered email\n3. Check inbox for reset link (valid 15 mins)\n4. Set a new strong password\n\n📄 Source: account_faq.pdf",
    },
    {
      q: 'pricing',
      a: "InsightFlow AI offers three plans:\n• Starter: $29/mo — 1,000 queries\n• Growth: $99/mo — 10,000 queries\n• Enterprise: Custom pricing\n\nAll plans include 14-day free trial.\n\n📄 Source: pricing_docs.pdf",
    },
    {
      q: 'api',
      a: "Our REST API supports JSON. Authentication uses Bearer tokens. Rate limits: 100 req/min (Starter), 1,000 req/min (Growth). Full docs at docs.insightflow.ai\n\n📄 Source: api_documentation.pdf",
    },
    {
      q: 'cancel',
      a: "To cancel your subscription:\n1. Go to Settings → Billing\n2. Click 'Cancel Subscription'\n3. Select reason (optional)\n4. Confirm cancellation\n\nAccess continues until the billing period ends.\n\n📄 Source: billing_faq.pdf",
    },
  ],
  fallback:
    "I found relevant context in your knowledge base. Based on the uploaded documents, this query relates to general support procedures. I recommend checking your FAQ section or escalating to a human agent for complex issues.\n\n📄 Source: general_knowledge.pdf — Confidence: 78%",
};

export const initialTickets = [
  { id: 'TK-001', user: 'Sarah M.', issue: "Can't access dashboard after login", status: 'open', priority: 'high', time: '2 min ago' },
  { id: 'TK-002', user: 'James R.', issue: 'Billing charge discrepancy in November', status: 'resolved', priority: 'medium', time: '14 min ago' },
  { id: 'TK-003', user: 'Priya K.', issue: 'API rate limit exceeded unexpectedly', status: 'open', priority: 'high', time: '31 min ago' },
  { id: 'TK-004', user: 'Tom B.', issue: 'How to export analytics as CSV?', status: 'deflected', priority: 'low', time: '1 hr ago' },
  { id: 'TK-005', user: 'Amy L.', issue: 'Need to update payment method', status: 'resolved', priority: 'medium', time: '2 hr ago' },
];

export const analyticsData = {
  totalQueries: 12847,
  deflectionRate: '58%',
  avgResponse: '1.2s',
  csat: '4.7/5',
  accuracy: '91%',
  uptime: '99.8%',
};

export const chartBars = [65, 80, 55, 90, 72, 88, 95, 70, 85, 60, 78, 92];
export const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const tabs = [
  { id: 'chat', label: 'AI Chatbot', icon: '💬' },
  { id: 'dashboard', label: 'Analytics', icon: '📊' },
  { id: 'docs', label: 'Knowledge Base', icon: '📁' },
  { id: 'tickets', label: 'Tickets', icon: '🎫' },
];

export const cannedQuestions = [
  "What's your refund policy?",
  'How do I reset my password?',
  'Show me pricing plans',
  'API rate limits?',
];

export const projectSummary = {
  description:
    'InsightFlow AI is an AI-powered customer support and business intelligence platform that combines RAG-based document retrieval with real-time analytics to improve response accuracy, reduce support workload, and enable data-driven decisions.',
  highlights: [
    'AI-powered RAG chatbot for customer queries',
    'Document upload and indexing for knowledge base ingestion',
    'Analytics dashboard for support performance metrics',
    'Ticket automation with status tracking and resolution workflows',
  ],
};

export function getRAGResponse(input) {
  const lower = input.toLowerCase();
  const match = ragResponses.default.find((r) => lower.includes(r.q));
  return match ? match.a : ragResponses.fallback;
}
