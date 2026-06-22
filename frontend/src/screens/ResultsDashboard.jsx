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
          <div style={{ ...s.riskSection, borderLeft: `4px solid ${riskColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <RiskBadge level={results.risk_level} />
                <h1 style={s.headline}>{headline}</h1>
                <p style={s.subtext}>
                  This is a starting point for reflection — not a verdict. The three factors below are what is driving your result.
                </p>
              </div>
              <div style={s.bigPercent}>{Math.round(results.confidence)}%</div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '5px' }}>
                <span>Model confidence</span>
                <span>{Math.round(results.confidence)}%</span>
              </div>
              <div style={s.track}>
                <div style={{ ...s.fill, width: `${results.confidence}%`, background: riskColor }} />
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

          {/* ── Feedback placeholder ── */}
          <div style={s.section}>
            <div style={s.feedbackBox}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#2E4057', marginBottom: '6px' }}>
                Help improve this tool
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>
                Please rate your experience. This takes 2 minutes and directly improves the tool for future students.
              </p>
            </div>
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

          <div style={{ textAlign: 'center', padding: '8px 24px 20px' }}>
            <a
              href="mailto:r.mizero@alustudent.com?subject=Data deletion request"
              style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'underline' }}
            >
              Request data deletion
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

const s = {
  page: {
    background: '#f5f5f5',
    minHeight: 'calc(100vh - 52px)',
    padding: '24px 16px 48px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '560px',
    height: 'fit-content',
    overflow: 'hidden',
  },
  riskSection: {
    padding: '24px',
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
    padding: '20px 24px',
    borderTop: '1px solid #f3f4f6',
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
    padding: '4px 24px 4px',
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
