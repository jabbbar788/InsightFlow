import { COLORS } from '../data';

const statusColor = (s) => (s === 'open' ? COLORS.danger : s === 'resolved' ? COLORS.success : COLORS.warning);
const statusBg = (s) => (s === 'open' ? COLORS.dangerLight : s === 'resolved' ? COLORS.successLight : COLORS.warningLight);
const prioColor = (p) => (p === 'high' ? COLORS.danger : p === 'medium' ? COLORS.warning : COLORS.gray);

export default function TicketsPanel({ tickets, onResolve }) {
  const summary = [
    { label: 'Open', count: tickets.filter((t) => t.status === 'open').length, color: COLORS.danger },
    { label: 'Deflected by AI', count: tickets.filter((t) => t.status === 'deflected').length, color: COLORS.warning },
    { label: 'Resolved', count: tickets.filter((t) => t.status === 'resolved').length, color: COLORS.success },
  ];

  return (
    <div className="tickets-grid">
      <div className="stats-grid">
        {summary.map((item) => (
          <div key={item.label} className="stat-card">
            <div className="stat-value" style={{ color: item.color }}>{item.count}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="panel-card tickets-list-card">
        {tickets.map((ticket, i) => (
          <div key={ticket.id} className="ticket-row">
            <div className="ticket-id">{ticket.id}</div>
            <div className="ticket-content">
              <div className="ticket-issue">{ticket.issue}</div>
              <div className="ticket-meta">{ticket.user} · {ticket.time}</div>
            </div>
            <span className="ticket-status" style={{ background: statusBg(ticket.status), color: statusColor(ticket.status) }}>
              {ticket.status}
            </span>
            <span className="ticket-priority" style={{ color: prioColor(ticket.priority) }}>{ticket.priority}</span>
            {ticket.status === 'open' && (
              <button onClick={() => onResolve(ticket.id)} className="resolve-button">
                Resolve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
