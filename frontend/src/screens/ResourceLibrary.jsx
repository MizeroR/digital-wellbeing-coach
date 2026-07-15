import { useLocation, useNavigate } from 'react-router-dom'

const GUIDE_TABS = [
  { label: '📚 Learn', path: '/interventions/education' },
  { label: '🎨 Create', path: '/interventions/creative' },
  { label: '🧘 Relax', path: '/interventions/relaxation' },
  { label: '👥 Connect', path: '/interventions/social' },
]

export default function ResourceLibrary() {
  const { state } = useLocation()
  const navigate  = useNavigate()
  const recommendations = state?.recommendations || []

  return (
    <div style={s.page} className="fade-in">
      <div style={s.card}>

        {/* Header */}
        <button onClick={() => navigate(-1)} style={s.backBtn} aria-label="Go back">
          ← Back to results
        </button>
        <h1 style={s.title}>Activity guides</h1>
        <p style={s.subtitle}>
          Choose a category to explore activities and resources for university students in Kigali.
        </p>

        {/* Emergency banner */}
        <div style={s.emergencyBanner}>
          <span style={{ fontSize: '18px', flexShrink: 0 }}>🆘</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '600', fontSize: '13px', color: '#7f1d1d' }}>
              If you need immediate support
            </div>
            <div style={{ fontSize: '12px', color: '#991b1b', marginTop: '2px' }}>
              Rwanda Mental Health Help Line: <strong>116</strong> (free, 24/7)
            </div>
          </div>
          <a href="tel:116" style={s.callBtn}>Call 116</a>
        </div>

        {/* Guide category cards */}
        <div style={s.guideGrid}>
          {GUIDE_TABS.map(tab => (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path, { state })}
              style={s.guideCard}
              aria-label={tab.label}
            >
              <span style={{ fontSize: '22px' }}>{tab.label.split(' ')[0]}</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#2E4057' }}>
                {tab.label.split(' ').slice(1).join(' ')}
              </span>
              <span style={{ fontSize: '12px', color: '#1B6CA8', marginTop: 'auto' }}>Explore →</span>
            </button>
          ))}
        </div>

        {/* Flat resource list (if recommendations passed via state) */}
        {recommendations.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <p style={s.sectionLabel}>All resources from your assessment</p>
            <div style={s.grid}>
              {recommendations.map((rec, i) => (
                <SimpleCard key={i} rec={rec} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

function SimpleCard({ rec }) {
  return (
    <div style={{
      border: '1px solid #E8EAF0', borderRadius: '12px', padding: '14px',
      background: '#fff', display: 'flex', flexDirection: 'column', gap: '6px',
    }}>
      <div style={{ fontWeight: '700', fontSize: '14px', color: '#2E4057' }}>{rec.title}</div>
      <p style={{
        fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: 0,
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {rec.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
        <span style={{ padding: '2px 8px', borderRadius: '10px', background: '#f3f4f6', color: '#6b7280', fontSize: '11px' }}>
          {rec.type}
        </span>
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
  card: { width: '100%', maxWidth: '720px', height: 'fit-content' },
  backBtn: {
    background: 'none', border: 'none', color: '#9ca3af',
    fontSize: '13px', cursor: 'pointer', padding: '0',
    marginBottom: '12px', fontFamily: 'inherit', display: 'block',
  },
  title: { fontSize: '24px', fontWeight: '700', color: '#2E4057', marginBottom: '6px' },
  subtitle: { fontSize: '13px', color: '#6b7280', marginBottom: '20px' },
  emergencyBanner: {
    padding: '12px 16px', background: '#fee2e2',
    border: '1px solid #fca5a5', borderRadius: '8px',
    display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px',
  },
  callBtn: {
    padding: '6px 14px', background: '#C0392B', color: '#fff',
    borderRadius: '20px', fontSize: '12px', fontWeight: '600',
    textDecoration: 'none', flexShrink: 0,
  },
  guideGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '12px',
  },
  guideCard: {
    border: '1px solid #E8EAF0', borderRadius: '12px', padding: '20px 16px',
    background: '#fff', display: 'flex', flexDirection: 'column',
    alignItems: 'flex-start', gap: '6px', cursor: 'pointer',
    fontFamily: 'inherit', textAlign: 'left', minHeight: '110px',
    transition: 'box-shadow 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
  sectionLabel: {
    fontSize: '12px', fontWeight: '700', color: '#9ca3af',
    textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px',
  },
}
