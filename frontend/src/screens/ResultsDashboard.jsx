import { useState } from 'react'
import RiskBadge from '../components/RiskBadge'
import ExplanationCard from '../components/ExplanationCard'
import RecommendationCard from '../components/RecommendationCard'
import SevereModal from '../components/SevereModal'

const RISK_COLOR = {
  Low:      '#27AE60',
  Moderate: '#F4A261',
  High:     '#E76F51',
  Severe:   '#C0392B',
}

const RISK_HEADLINE = {
  Low:      'Your usage pattern appears healthy',
  Moderate: 'Your usage pattern shows some risk factors',
  High:     'Your usage pattern suggests elevated risk',
  Severe:   'Your usage pattern indicates severe dependency',
}

const CATEGORY_EMOJI = {
  'Social Media': '📱',
  'Gaming':       '🎮',
  'Streaming':    '📺',
  'General':      '⚡',
}

export default function ResultsDashboard({ results, onViewLibrary, onBack }) {
  const [showModal, setShowModal] = useState(results.risk_level === 'Severe')
  const [confirmed, setConfirmed] = useState(results.risk_level !== 'Severe')

  const riskColor = RISK_COLOR[results.risk_level] || '#F4A261'
  const headline  = RISK_HEADLINE[results.risk_level] || 'Your results are ready'
  const emoji     = CATEGORY_EMOJI[results.addiction_category] || '📱'

  return (
    <>
      {showModal && (
        <SevereModal onConfirm={() => { setShowModal(false); setConfirmed(true) }} />
      )}

      <div style={s.page}>
        <div style={s.card}>
          {/* ── Risk header ── */}
          <div style={s.riskSection}>
            <div style={{ borderLeft: `4px solid ${riskColor}`, paddingLeft: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <RiskBadge level={results.risk_level} />
                  <h1 style={s.headline}>{headline}</h1>
                  <p style={s.subtext}>
                    This is a starting point for reflection — not a verdict. The three factors below are what is driving your result.
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={s.bigPercent}>{results.sas_total}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>out of 60</div>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '5px' }}>
                  <span>SAS Score</span>
                  <span>{results.sas_total} / 60</span>
                </div>
                <div style={s.track}>
                  <div style={{ ...s.fill, width: `${(results.sas_total / 60) * 100}%`, background: riskColor }} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Explanations ── */}
          <div style={s.section}>
            <p style={s.sectionLabel}>
              Why your score is {results.risk_level?.toLowerCase()} — Top 3 contributing factors
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(results.explanations || []).map((exp, i) => (
                <ExplanationCard key={i} number={i + 1} text={exp} />
              ))}
            </div>
          </div>

          {/* ── Dominant pattern ── */}
          <div style={s.section}>
            <p style={s.sectionLabel}>Your dominant usage pattern</p>
            <div style={s.patternBadge}>
              <span>{emoji}</span>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>{results.addiction_category}</span>
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '10px', lineHeight: '1.55' }}>
              Your usage is most concentrated around {results.addiction_category?.toLowerCase()} platforms.
              The recommendations below are tailored to redirect this pattern toward constructive alternatives
              that occupy the same motivational space.
            </p>
          </div>

          {/* ── Recommendations ── */}
          {confirmed && (results.recommendations || []).length > 0 && (
            <div style={s.section}>
              <p style={s.sectionLabel}>Recommended for you — Kigali</p>
              <div style={s.recGrid}>
                {results.recommendations.map((rec, i) => (
                  <RecommendationCard key={i} rec={rec} />
                ))}
              </div>
            </div>
          )}

          {/* ── Feedback ── */}
          <div style={s.section}>
            <FeedbackWidget riskLevel={results.risk_level} />
          </div>

          {/* ── Actions ── */}
          <div style={s.actions}>
            <button style={s.primaryBtn} onClick={onViewLibrary}>
              View full resource library
            </button>
            <button style={s.secondaryBtn} onClick={onBack}>
              ← Retake assessment
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

function FeedbackWidget({ riskLevel }) {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit() {
    setSubmitted(true)
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'https://digital-wellbeing-coach.onrender.com'}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: selected, comment, riskLevel }),
      })
    } catch {}
  }

  if (submitted) {
    return (
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '22px', margin: '0 0 8px' }}>🙏</p>
        <p style={{ fontSize: '14px', fontWeight: '600', color: '#166534', margin: '0 0 4px' }}>Thank you for your feedback!</p>
        <p style={{ fontSize: '13px', color: '#4ade80', margin: 0, color: '#16a34a' }}>Your response helps improve this tool for future students.</p>
      </div>
    )
  }

  const LABELS = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very good', 5: 'Excellent' }
  const active = hovered ?? selected

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
      <p style={{ fontSize: '13px', fontWeight: '600', color: '#2E4057', margin: '0 0 4px' }}>
        Help improve this tool
      </p>
      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px' }}>
        How useful did you find your results? This takes under a minute.
      </p>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px' }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => setSelected(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
              fontSize: '28px', lineHeight: 1,
              filter: n <= (active ?? 0) ? 'none' : 'grayscale(1) opacity(0.35)',
              transform: n <= (active ?? 0) ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.1s, filter 0.1s',
            }}
          >
            ⭐
          </button>
        ))}
        {active && (
          <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '6px' }}>
            {LABELS[active]}
          </span>
        )}
      </div>

      {/* Comment */}
      {selected && (
        <>
          <textarea
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px',
              fontSize: '13px', fontFamily: 'inherit', color: '#374151',
              resize: 'vertical', minHeight: '72px', marginTop: '8px',
              background: '#fff',
            }}
            placeholder="Any comments? (optional)"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              marginTop: '10px',
              padding: '9px 20px',
              background: '#2E4057',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Submit feedback
          </button>
        </>
      )}
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
    maxWidth: '720px',
    height: 'fit-content',
  },
  riskSection: {
    padding: '0 0 28px',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  },
  headline: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2E4057',
    marginTop: '10px',
    lineHeight: '1.3',
  },
  subtext: {
    fontSize: '13px',
    color: '#6b7280',
    marginTop: '8px',
    lineHeight: '1.55',
  },
  bigPercent: {
    fontSize: '30px',
    fontWeight: '700',
    color: '#2E4057',
    flexShrink: 0,
    lineHeight: '1',
  },
  track: {
    height: '6px',
    background: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.9s ease',
  },
  section: {
    padding: '24px 0',
    borderTop: '1px solid #e5e7eb',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#1B6CA8',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  patternBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    background: '#f0f9ff',
    border: '1px solid #bae6fd',
    padding: '7px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#0369a1',
  },
  recGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px',
  },
  feedbackBox: {
    background: '#f8fafc',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
  },
  actions: {
    padding: '4px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  primaryBtn: {
    padding: '12px',
    background: '#2E4057',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  secondaryBtn: {
    padding: '10px',
    background: '#fff',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
}
