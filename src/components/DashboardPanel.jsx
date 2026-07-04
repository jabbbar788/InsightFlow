import { COLORS, analyticsData, chartBars, chartLabels } from '../data';

const cards = [
  { label: 'Total Queries', value: analyticsData.totalQueries.toLocaleString(), icon: '💬', trend: '+12%' },
  { label: 'Deflection Rate', value: analyticsData.deflectionRate, icon: '🎯', trend: '+8%' },
  { label: 'Avg Response Time', value: analyticsData.avgResponse, icon: '⚡', trend: '-0.3s' },
  { label: 'CSAT Score', value: analyticsData.csat, icon: '⭐', trend: '+0.2' },
  { label: 'RAG Accuracy', value: analyticsData.accuracy, icon: '🎯', trend: '+3%' },
  { label: 'System Uptime', value: analyticsData.uptime, icon: '🟢', trend: 'Stable' },
];

const categories = [
  { label: 'Billing & Payments', pct: 34 },
  { label: 'Account & Login', pct: 27 },
  { label: 'API & Integration', pct: 22 },
  { label: 'Product Features', pct: 17 },
];

export default function DashboardPanel() {
  return (
    <div className="dashboard-grid">
      <div className="stats-grid">
        {cards.map((card) => (
          <div key={card.label} className="stat-card">
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-value">{card.value}</div>
            <div className="stat-label">{card.label}</div>
            <div className="stat-trend">▲ {card.trend}</div>
          </div>
        ))}
      </div>
      <div className="panel-card">
        <div className="panel-title">Monthly Query Volume</div>
        <div className="bar-chart">
          {chartBars.map((h, i) => (
            <div key={i} className="bar-column">
              <div className={i === 11 ? 'bar active' : 'bar'} style={{ height: `${h * 1.1}px` }} />
              <div className="bar-label">{chartLabels[i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="panel-card">
        <div className="panel-title">Top Query Categories</div>
        {categories.map((item) => (
          <div key={item.label} className="category-row">
            <div className="category-label-row">
              <span>{item.label}</span>
              <span className="category-pct">{item.pct}%</span>
            </div>
            <div className="category-bar-bg">
              <div className="category-bar" style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
