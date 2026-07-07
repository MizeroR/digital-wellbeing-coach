import { memo, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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

const RISK_CONTEXT = {
  Low:      (total) => `Your SAS score of ${total}/60 falls below the moderate threshold (27), which is consistent with balanced smartphone habits.`,
  Moderate: (total) => `Your SAS score of ${total}/60 crosses the moderate threshold (27). Some usage patterns are starting to interfere with your daily life.`,
  High:     (total) => `Your SAS score of ${total}/60 crosses the high threshold (33). Multiple behaviours are consistently affecting your academic performance or wellbeing.`,
  Severe:   (total) => `Your SAS score of ${total}/60 crosses the severe threshold (42). This level is associated with significant impact on daily functioning across multiple areas.`,
}

const RISK_NEXT_STEP = {
  Low:      'Keep this as your baseline. Retake the assessment in 3 months to track any changes in your habits.',
  Moderate: 'Try one recommendation below for one week. Small offline habits compound quickly — even 30 minutes a day makes a difference.',
  High:     'Set a screen time limit tonight (see the guide below). Then explore the Kira Art Therapy Hub for structured, professional support.',
  Severe:   'Contact the Kira Art Therapy Hub this week (kiraapp.org, +250 785 774 717) or call 116 (free, 24/7) for immediate mental health support.',
}

const CATEGORY_EMOJI = {
  'Social Media': '📱',
  'Gaming':       '🎮',
  'Streaming':    '📺',
  'General':      '⚡',
}

export default memo(function ResultsDashboard() {
  const { state } = useLocation()
  const navigate  = useNavigate()
  const results   = state?.results

  const [showModal, setShowModal] = useState(false)
  const [confirmed, setConfirmed] = useState(true)

  useEffect(() => {
    if (!results) { navigate('/', { replace: true }); return }
    if (results.risk_level === 'Severe') { setShowModal(true); setConfirmed(false) }
  }, [results, navigate])

  if (!results) return null

  const riskColor  = RISK_COLOR[results.risk_level]     || '#F4A261'
  const headline   = RISK_HEADLINE[results.risk_level]  || 'Your results are ready'
  const ctxFn      = RISK_CONTEXT[results.risk_level]   || (() => '')
  const nextStep   = RISK_NEXT_STEP[results.risk_level] || ''
  const emoji      = CATEGORY_EMOJI[results.addiction_category] || '📱'

  function handleDownload() {
    window.print()
  }

  return (
    <>
      {showModal && (
        <SevereModal onConfirm={() => { setShowModal(false); setConfirmed(true) }} />
      )}

      <div style={s.page} className="fade-in">
        <div style={s.card}>

          {/* ── Top actions ── */}
          <div style={s.topActions} className="no-print">
            <button
              style={s.startOverBtn}
              onClick={() => navigate('/')}
              aria-label="Start over — go back to landing page"
            >
              ← Start over
            </button>
            <button
              style={s.downloadBtn}
              onClick={handleDownload}
              aria-label="Download or print your report"
            >
              ↓ Download report
            </button>
          </div>

          {/* Print header (only visible when printing) */}
          <div className="print-only" style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#2E4057' }}>
              Digital Wellbeing Coach — Assessment Report
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              Generated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

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
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={s.bigScore}>{results.sas_total}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>out of 60</div>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6', margin: '14px 0 0', fontStyle: 'italic' }}>
                {ctxFn(results.sas_total)}
              </p>

              <div style={{ marginTop: '14px' }}>
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
            {results.risk_level === 'Low' ? (
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.55', margin: 0 }}>
                Your usage pattern does not show a dominant addiction category. This is consistent with your Low risk score.
              </p>
            ) : (
              <>
                <div style={s.patternBadge}>
                  <span>{emoji}</span>
                  <span style={{ fontWeight: '600', fontSize: '14px' }}>{results.addiction_category}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '10px', lineHeight: '1.55' }}>
                  Your usage is most concentrated around {results.addiction_category?.toLowerCase()} platforms.
                  The recommendations below are tailored to redirect this pattern toward constructive alternatives
                  that occupy the same motivational space.
                </p>
              </>
            )}

            {/* Actionable next step */}
            <div style={s.nextStepBox}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#1B6CA8', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 6px' }}>
                Your next step
              </p>
              <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6', margin: 0 }}>
                {nextStep}
              </p>
            </div>
          </div>

          {/* ── Screen Time Guidance ── */}
          <div style={s.section}>
            <p style={s.sectionLabel}>Set screen time limits on your phone</p>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.55', marginBottom: '14px' }}>
              Built-in screen time tools can help you act on your results immediately. Choose your device:
            </p>
            <div style={s.screenTimeGrid}>
              <ScreenTimeCard
                icon="🍎"
                title="iPhone"
                steps={[
                  'Open Settings → Screen Time',
                  'Tap "App Limits" to set daily limits per category',
                  'Use "Downtime" to schedule phone-free hours',
                  'Enable "Communication Limits" for night-time focus',
                ]}
              />
              <ScreenTimeCard
                icon="🤖"
                title="Android"
                steps={[
                  'Open Settings → Digital Wellbeing',
                  'Tap "Dashboard" to see per-app usage',
                  'Tap any app → "Set timer" to limit daily use',
                  'Enable "Bedtime mode" to grey the screen at night',
                ]}
              />
              <ScreenTimeCard
                icon="📊"
                title="Albo"
                steps={[
                  'Download the Albo app from your app store',
                  'Link your usage data to see daily patterns',
                  'Set personal goals and weekly check-ins',
                  'Review your streak progress every morning',
                ]}
              />
            </div>
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
          <div style={s.section} className="no-print">
            <FeedbackWidget riskLevel={results.risk_level} />
          </div>

          {/* ── Actions ── */}
          <div style={s.actions} className="no-print">
            <button
              style={s.primaryBtn}
              onClick={() => navigate('/resources', { state: { recommendations: results.recommendations } })}
              aria-label="View full resource library"
            >
              View full resource library
            </button>
            <button
              style={s.secondaryBtn}
              onClick={() => navigate('/assessment')}
              aria-label="Retake the assessment"
            >
              ← Retake assessment
            </button>
          </div>

          {/* Print footer */}
          <div className="print-only" style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', fontSize: '11px', color: '#9ca3af' }}>
            Digital Wellbeing Coach — digitalwellbeingcoach.vercel.app — Not a medical diagnosis.
            For support: Rwanda Mental Health Helpline 116 (free, 24/7).
          </div>

        </div>
      </div>
    </>
  )
})

function ScreenTimeCard({ icon, title, steps }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb', borderRadius: '8px', padding: '14px',
      background: '#fafafa',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <span style={{ fontSize: '20px' }}>{icon}</span>
        <span style={{ fontSize: '13px', fontWeight: '700', color: '#2E4057' }}>{title}</span>
      </div>
      <ol style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {steps.map((step, i) => (
          <li key={i} style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.45' }}>{step}</li>
        ))}
      </ol>
    </div>
  )
}

function FeedbackWidget({ riskLevel }) {
  const [hovered, setHovered]   = useState(null)
  const [selected, setSelected] = useState(null)
  const [comment, setComment]   = useState('')
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
        <p style={{ fontSize: '13px', color: '#16a34a', margin: 0 }}>Your response helps improve this tool for future students.</p>
      </div>
    )
  }

  const LABELS = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very good', 5: 'Excellent' }
  const active  = hovered ?? selected

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
      <p style={{ fontSize: '13px', fontWeight: '600', color: '#2E4057', margin: '0 0 4px' }}>
        Help improve this tool
      </p>
      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px' }}>
        How useful did you find your results? This takes under a minute.
      </p>
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
      {selected && (
        <>
          <textarea
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px',
              fontSize: '13px', fontFamily: 'inherit', color: '#374151',
              resize: 'vertical', minHeight: '72px', marginTop: '8px', background: '#fff',
            }}
            placeholder="Any comments? (optional)"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              marginTop: '10px', padding: '9px 20px', background: '#2E4057',
              color: '#fff', border: 'none', borderRadius: '6px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
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
    padding: '32px 20px 64px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '720px',
    height: 'fit-content',
  },
  topActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  startOverBtn: {
    background: 'none', border: 'none',
    color: '#6b7280', fontSize: '13px',
    cursor: 'pointer', fontFamily: 'inherit',
    padding: '0',
  },
  downloadBtn: {
    background: '#fff', border: '1px solid #e5e7eb',
    color: '#374151', fontSize: '12px', fontWeight: '500',
    cursor: 'pointer', fontFamily: 'inherit',
    padding: '6px 14px', borderRadius: '6px',
  },
  riskSection: {
    padding: '0 0 28px',
    borderBottom: '1px solid #e5e7eb',
  },
  headline: {
    fontSize: '20px', fontWeight: '700', color: '#2E4057',
    marginTop: '10px', lineHeight: '1.3',
  },
  subtext: {
    fontSize: '13px', color: '#6b7280',
    marginTop: '8px', lineHeight: '1.55',
  },
  bigScore: {
    fontSize: '30px', fontWeight: '700', color: '#2E4057',
    lineHeight: '1',
  },
  track: {
    height: '6px', background: '#e5e7eb',
    borderRadius: '3px', overflow: 'hidden',
  },
  fill: {
    height: '100%', borderRadius: '3px', transition: 'width 0.9s ease',
  },
  section: {
    padding: '24px 0', borderTop: '1px solid #e5e7eb',
  },
  sectionLabel: {
    fontSize: '11px', fontWeight: '700', color: '#1B6CA8',
    letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '12px',
  },
  patternBadge: {
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    background: '#f0f9ff', border: '1px solid #bae6fd',
    padding: '7px 16px', borderRadius: '20px',
    fontSize: '14px', color: '#0369a1',
  },
  nextStepBox: {
    marginTop: '16px', padding: '14px 16px',
    background: '#eff6ff', border: '1px solid #bfdbfe',
    borderRadius: '8px',
  },
  screenTimeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
  },
  recGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px',
  },
  actions: {
    paddingTop: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  primaryBtn: {
    padding: '12px', background: '#2E4057', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  secondaryBtn: {
    padding: '10px', background: '#fff', color: '#6b7280',
    border: '1px solid #e5e7eb', borderRadius: '8px',
    fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
  },
}
