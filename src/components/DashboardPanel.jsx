import { analyticsData, chartBars, chartLabels } from '../data';

const cards = [
  { label: 'Total Queries', value: analyticsData.totalQueries.toLocaleString(), icon: '💬', trend: '+12%' },
  { label: 'Deflection Rate', value: analyticsData.deflectionRate, icon: '🎯', trend: '+8%' },
  { label: 'Avg Response Time', value: analyticsData.avgResponse, icon: '⚡', trend: '-0.3s' },
  { label: 'CSAT Score', value: analyticsData.csat, icon: '⭐', trend: '+0.2' },
  { label: 'RAG Accuracy', value: analyticsData.accuracy, icon: '🎯', trend: '+3%' },
  { label: 'System Uptime', value: analyticsData.uptime, icon: '🟢', trend: 'Stable' },
];

const categories = [
  { label: 'Billing & Payments', pct: 34, count: '4,368' },
  { label: 'Account & Login', pct: 27, count: '3,469' },
  { label: 'API & Integration', pct: 22, count: '2,826' },
  { label: 'Product Features', pct: 17, count: '2,184' },
];

export default function DashboardPanel() {
  const chartMax = Math.max(...chartBars);
  const yTicks = [0, 20, 40, 60, 80, 100];

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
        <div className="chart-shell">
          <div className="chart-y-axis" aria-label="Y-axis values">
            {yTicks.map((tick) => (
              <div key={tick} className="chart-y-tick">
                <span>{tick}</span>
              </div>
            ))}
          </div>
          <div className="chart-area">
            <div className="chart-grid-lines" aria-hidden="true">
              {yTicks.map((tick) => (
                <div key={tick} className="chart-grid-line" />
              ))}
            </div>
            <div className="bar-chart">
              {chartBars.map((value, i) => {
                const barHeight = Math.max(14, Math.round((value / chartMax) * 100));
                return (
                  <div key={i} className="bar-column">
                    <div className="bar-value-label">{value}</div>
                    <div className="bar-track">
                      <div className={i === chartBars.length - 1 ? 'bar active' : 'bar'} style={{ height: `${barHeight}%` }} />
                    </div>
                    <div className="bar-label">{chartLabels[i]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="panel-card">
        <div className="panel-title">Top Query Categories</div>
        {categories.map((item) => (
          <div key={item.label} className="category-row">
            <div className="category-label-row">
              <span>{item.label}</span>
              <span className="category-meta">
                <span className="category-count">{item.count} queries</span>
                <span className="category-pct">{item.pct}%</span>
              </span>
            </div>
            <div className="category-bar-bg">
              <div className="category-bar" style={{ width: `${item.pct}%` }} />
              {[25, 50, 75].map((marker) => (
                <div key={marker} className="category-marker" style={{ left: `${marker}%` }} />
              ))}
            </div>
            <div className="category-scale">
              <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
