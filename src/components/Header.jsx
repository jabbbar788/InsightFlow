import { COLORS } from '../data';

export default function Header() {
  return (
    <div className="header-bar" style={{ background: COLORS.primary }}>
      <div className="brand-chip">IF</div>
      <span className="brand-name">InsightFlow AI</span>
      <span className="brand-status">● Live</span>
    </div>
  );
}
