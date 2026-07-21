const COST_STYLE = {
  Free:       { bg: '#D1FAE5', text: '#065F46' },
  Varies:     { bg: '#FFF7ED', text: '#92400E' },
  'Low cost': { bg: '#F1F5F9', text: '#1E293B' },
}

function AccessLink({ value }) {
  if (!value) return null
  if (value.startsWith('@')) {
    return (
      <span style={{ fontSize: '12px', color: '#475569' }}>{value}</span>
    )
  }
  const href = value.startsWith('http') ? value : `https://${value}`
  const display = value.replace(/^https?:\/\//, '')
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontSize: '12px', color: '#2563EB', textDecoration: 'none' }}
    >
      → {display}
    </a>
  )
}

export default function RecommendationCard({ rec }) {
  const costStyle = COST_STYLE[rec.cost] || COST_STYLE['Low cost']
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '10px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', lineHeight: '1.4' }}>
          {rec.title}
        </div>
        <span style={{
          fontSize: '11px',
          background: costStyle.bg,
          color: costStyle.text,
          padding: '2px 8px',
          borderRadius: '20px',
          flexShrink: 0,
          fontWeight: '500',
        }}>
          {rec.cost}
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
        {rec.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {rec.type && (
          <span style={{
            fontSize: '11px',
            background: '#EFF6FF',
            color: '#2563EB',
            padding: '2px 8px',
            borderRadius: '20px',
          }}>
            {rec.type}
          </span>
        )}
        <AccessLink value={rec.how_to_access} />
      </div>
    </div>
  )
}
