const COLORS = {
  Low:      { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  Moderate: { bg: '#fff7ed', text: '#92400e', border: '#fdba74' },
  High:     { bg: '#fff3f0', text: '#c2410c', border: '#fb923c' },
  Severe:   { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
}

export default function RiskBadge({ level }) {
  const c = COLORS[level] || COLORS.Moderate
  return (
    <span style={{
      background: c.bg,
      color: c.text,
      border: `1px solid ${c.border}`,
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
    }}>
      {level} risk
    </span>
  )
}
