import { COLORS } from '../data';

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="tabs-row">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={activeTab === tab.id ? 'tab-button active' : 'tab-button'}
          style={activeTab === tab.id ? { color: COLORS.primary, borderBottomColor: COLORS.primary } : { color: COLORS.gray }}
        >
          <span>{tab.icon}</span> {tab.label}
        </button>
      ))}
    </div>
  );
}
