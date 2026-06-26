import { useState } from 'react'
import RecommendationCard from '../components/RecommendationCard'

const FILTERS = ['All', 'Social Media', 'Gaming', 'Streaming', 'General', 'Free only']

export default function ResourceLibrary({ recommendations, onBack }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = (recommendations || []).filter(rec => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Free only') return rec.cost === 'Free'
    return rec.type === activeFilter
  })

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* ── Header ── */}
        <div style={{ marginBottom: '4px' }}>
          <button onClick={onBack} style={s.backBtn}>← Back to results</button>
          <h1 style={s.title}>Resource Library</h1>
          <p style={s.subtitle}>Real activities and resources for university students in Kigali</p>
        </div>

        {/* ── Emergency banner ── */}
        <div style={{ marginBottom: '16px' }}>
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
        </div>

        {/* ── Filters ── */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '5px 13px',
                borderRadius: '20px',
                border: `1px solid ${activeFilter === f ? '#2E4057' : '#e5e7eb'}`,
                background: activeFilter === f ? '#2E4057' : '#fff',
                color: activeFilter === f ? '#fff' : '#6b7280',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: '500',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div style={s.grid}>
          {filtered.length > 0 ? (
            filtered.map((rec, i) => <RecommendationCard key={i} rec={rec} />)
          ) : (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#9ca3af', padding: '32px 0', fontSize: '14px' }}>
              No resources match this filter.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: 'calc(100vh - 52px)',
    padding: '40px 20px 64px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '900px',
    height: 'fit-content',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    fontSize: '13px',
    cursor: 'pointer',
    padding: '0',
    marginBottom: '12px',
    fontFamily: 'inherit',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2E4057',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '20px',
  },
  emergencyBanner: {
    padding: '12px 16px',
    background: '#fee2e2',
    border: '1px solid #fca5a5',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  callBtn: {
    padding: '6px 14px',
    background: '#C0392B',
    color: '#fff',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textDecoration: 'none',
    flexShrink: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px',
  },
}
