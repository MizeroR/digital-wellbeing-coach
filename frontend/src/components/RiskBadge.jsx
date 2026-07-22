const COLORS = {
  Low:      { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  Moderate: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
  High:     { bg: '#FFF7ED', text: '#C2410C', border: '#FDBA74' },
  Severe:   { bg: '#FEF2F2', text: '#B91C1C', border: '#FCA5A5' },
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
