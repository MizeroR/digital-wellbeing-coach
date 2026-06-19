const COST_STYLE = {
  Free:       { bg: '#d1fae5', text: '#065f46' },
  Varies:     { bg: '#fff7ed', text: '#92400e' },
  'Low cost': { bg: '#f3f4f6', text: '#374151' },
}

function AccessLink({ value }) {
  if (!value) return null
  if (value.startsWith('@')) {
    return (
      <span style={{ fontSize: '12px', color: '#6b7280' }}>{value}</span>
    )
  }
  const href = value.startsWith('http') ? value : `https://${value}`
  const display = value.replace(/^https?:\/\//, '')
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontSize: '12px', color: '#1B6CA8', textDecoration: 'none' }}
    >
      → {display}
    </a>
  )
}

export default function RecommendationCard({ rec }) {
  const costStyle = COST_STYLE[rec.cost] || COST_STYLE['Low cost']
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#2E4057', lineHeight: '1.4' }}>
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

      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>
        {rec.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {rec.type && (
          <span style={{
            fontSize: '11px',
            background: '#eff6ff',
            color: '#1e40af',
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
