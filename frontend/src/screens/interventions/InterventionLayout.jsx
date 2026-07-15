import { useNavigate } from 'react-router-dom'

// ── Shared sub-components ─────────────────────────────────────────────────────

export function CostBadge({ cost }) {
  let bg, color, label
  if (!cost)                          { bg = '#f3f4f6'; color = '#9ca3af'; label = '—' }
  else if (cost === 'Free')           { bg = '#dcfce7'; color = '#16a34a'; label = 'Free' }
  else if (cost === 'Low cost')       { bg = '#fef3c7'; color = '#d97706'; label = 'Low cost' }
  else if (cost === 'Varies')         { bg = '#f3f4f6'; color = '#6b7280'; label = 'Varies' }
  else if (cost.startsWith('Free /')) { bg = '#fef3c7'; color = '#d97706'; label = cost }
  else                                { bg = '#f3f4f6'; color = '#6b7280'; label = cost }
  return (
    <span style={{
      padding: '2px 8px', borderRadius: '10px', background: bg, color,
      fontSize: '11px', fontWeight: '600',
    }}>
      {label}
    </span>
  )
}

export function AccessText({ text }) {
  if (!text) return null
  const callMatch = text.match(/^Call\s+(\d+)/)
  const urlMatch  = text.match(/[\w.-]+\.(com|org|app|net|io|inc)(\/[^\s,]*)?/i)
  const igMatch   = text.match(/@([\w.]+)/)

  const linkStyle = {
    fontSize: '12px', color: '#1B6CA8', textDecoration: 'underline',
    display: 'inline', wordBreak: 'break-word',
  }

  if (callMatch) {
    return (
      <a href={`tel:${callMatch[1]}`} style={{ ...linkStyle, textDecoration: 'none' }}>
        📞 {text}
      </a>
    )
  }
  if (urlMatch) {
    const raw  = urlMatch[0]
    const href = raw.startsWith('http') ? raw : `https://${raw}`
    return <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{text}</a>
  }
  if (igMatch) {
    return (
      <a
        href={`https://instagram.com/${igMatch[1]}`}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
      >
        {text}
      </a>
    )
  }
  return <span style={{ fontSize: '12px', color: '#6b7280' }}>{text}</span>
}

export function ResCard({ title, description, cost, access, steps, link, linkLabel }) {
  return (
    <div style={{
      border: '1px solid #E8EAF0', borderRadius: '12px', padding: '16px',
      background: '#fff', display: 'flex', flexDirection: 'column', gap: '8px',
    }}>
      <div style={{ fontWeight: '700', fontSize: '14px', color: '#2E4057' }}>{title}</div>
      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>{description}</p>
      {cost && <div><CostBadge cost={cost} /></div>}
      {steps && (
        <ol style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {steps.map((step, i) => (
            <li key={i} style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.45' }}>{step}</li>
          ))}
        </ol>
      )}
      {access && (
        <div style={{ marginTop: '2px' }}>
          <AccessText text={access} />
        </div>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block', alignSelf: 'flex-start', marginTop: '4px',
            padding: '6px 14px', background: '#eff6ff',
            border: '1px solid #bfdbfe', borderRadius: '6px',
            fontSize: '12px', fontWeight: '600', color: '#1B6CA8',
            textDecoration: 'none',
          }}
        >
          {linkLabel || 'Open guide →'}
        </a>
      )}
    </div>
  )
}

export function AlboTip({ tip }) {
  return (
    <div style={{
      marginTop: '36px', padding: '14px 16px',
      background: '#f0fdf4', border: '1px solid #bbf7d0',
      borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '18px', flexShrink: 0, lineHeight: 1, marginTop: '1px' }}>💾</span>
      <p style={{ fontSize: '13px', color: '#166534', lineHeight: '1.6', margin: 0 }}>{tip}</p>
    </div>
  )
}

// ── Page shell ────────────────────────────────────────────────────────────────

export default function InterventionLayout({ icon, title, why, children, alboTip }) {
  const navigate = useNavigate()

  return (
    <div style={s.page} className="fade-in">
      <div style={s.card}>

        <button
          style={s.backBtn}
          onClick={() => navigate(-1)}
          aria-label="Back to my results"
        >
          ← Back to my results
        </button>

        <div style={s.header}>
          <div style={s.iconWrap}>{icon}</div>
          <h1 style={s.title}>{title}</h1>
          <p style={s.why}>{why}</p>
        </div>

        {children}

        <AlboTip tip={alboTip} />

      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: 'calc(100vh - 52px)',
    padding: '40px 16px 64px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '720px',
    height: 'fit-content',
  },
  backBtn: {
    background: 'none', border: 'none',
    color: '#9ca3af', fontSize: '13px',
    cursor: 'pointer', fontFamily: 'inherit',
    padding: 0, marginBottom: '28px', display: 'block',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    paddingBottom: '28px',
    borderBottom: '1px solid #e5e7eb',
  },
  iconWrap: {
    fontSize: '48px', marginBottom: '14px', lineHeight: 1,
  },
  title: {
    fontSize: '24px', fontWeight: '800', color: '#2E4057',
    margin: '0 0 14px', letterSpacing: '-0.3px',
  },
  why: {
    fontSize: '14px', color: '#6b7280', lineHeight: '1.7',
    maxWidth: '560px', margin: '0 auto',
  },
}
