import { memo, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SevereModal from '../components/SevereModal'

// ── Constants ─────────────────────────────────────────────────────────────────

const RISK_COLOR = {
  Low:      '#27AE60',
  Moderate: '#F4A261',
  High:     '#E76F51',
  Severe:   '#C0392B',
}

const RISK_DISPLAY = {
  Low:      'All good',
  Moderate: 'Worth watching',
  High:     'Time to act',
  Severe:   'Get support',
}

const RISK_CONTEXT = {
  Low:      'Your habits look healthy right now. Keep it up and check back in a month.',
  Moderate: 'Some of your habits are worth paying attention to. Small changes now can make a big difference.',
  High:     'Your usage is affecting your daily life. The activities below can help you build healthier habits.',
  Severe:   "Your responses suggest your smartphone use is significantly impacting your wellbeing. You don't have to figure this out alone — support is available.",
}

const RISK_NEXT_STEP = {
  Low:      "You're doing well. Check back in a month to track any changes.",
  Moderate: "Pick one activity below and try it just once this week. That's all.",
  High:     'Choose one activity from the list below and commit to trying it before this weekend.',
  Severe:   "Please consider speaking to someone. Call 116 — it's free, 24/7, and confidential. The activities below can also help.",
}

const CATEGORY_EMOJI = {
  'Social Media': '📱',
  'Gaming':       '🎮',
  'Streaming':    '📺',
  'General':      '📊',
}

const RECOMMENDED_INTERVENTION = {
  'Social Media': 'social',
  'Gaming':       'education',
  'Streaming':    'creative',
  'General':      'relaxation',
}

const INTERVENTION_CARDS = [
  {
    key:         'education',
    icon:        '📚',
    title:       'Learn something new',
    description: 'Courses, books, and skills that give your time real value.',
    path:        '/interventions/education',
  },
  {
    key:         'creative',
    icon:        '🎨',
    title:       'Make something',
    description: 'Hands-on activities that keep your mind and hands busy.',
    path:        '/interventions/creative',
  },
  {
    key:         'relaxation',
    icon:        '🧘',
    title:       'Rest and reset',
    description: 'Tools and resources to help you recharge properly.',
    path:        '/interventions/relaxation',
  },
  {
    key:         'social',
    icon:        '👥',
    title:       'Connect in real life',
    description: 'Real people, real places, real conversations in Kigali.',
    path:        '/interventions/social',
  },
]

const IMPORTANCE_WIDTHS = ['100%', '65%', '40%']

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeading({ children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{
        fontSize: '15px', fontWeight: '700', color: '#2E4057',
        margin: '0 0 10px', letterSpacing: '-0.1px',
      }}>
        {children}
      </h2>
      <div style={{ height: '1px', background: '#e5e7eb' }} />
    </div>
  )
}

function ShapCard({ number, text, importance, riskColor }) {
  return (
    <div style={{
      background: '#F8F9FA', borderRadius: '8px', padding: '12px 14px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{
          width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
          background: riskColor, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: '700',
        }}>
          {number}
        </div>
        <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.5', margin: 0, flex: 1 }}>
          {text}
        </p>
      </div>
      <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: importance, background: riskColor,
          borderRadius: '2px', transition: 'width 0.8s ease',
        }} />
      </div>
    </div>
  )
}

function FeedbackWidget({ riskLevel }) {
  const [hovered,   setHovered]   = useState(null)
  const [selected,  setSelected]  = useState(null)
  const [comment,   setComment]   = useState('')
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
      <div style={{
        background: '#f0fdf4', border: '1px solid #bbf7d0',
        borderRadius: '8px', padding: '20px', textAlign: 'center',
      }}>
        <p style={{ fontSize: '22px', margin: '0 0 8px' }}>🙏</p>
        <p style={{ fontSize: '14px', fontWeight: '600', color: '#166534', margin: '0 0 4px' }}>Thank you!</p>
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
        How useful did you find your results?
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
          <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '6px' }}>{LABELS[active]}</span>
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

// ── Main component ─────────────────────────────────────────────────────────────

export default memo(function ResultsDashboard() {
  const { state } = useLocation()
  const navigate  = useNavigate()
  const results   = state?.results

  const [showModal, setShowModal] = useState(false)
  const [confirmed, setConfirmed] = useState(true)
  const [toast,     setToast]     = useState(false)

  useEffect(() => {
    if (!results) { navigate('/', { replace: true }); return }
    if (results.risk_level === 'Severe') { setShowModal(true); setConfirmed(false) }
  }, [results, navigate])

  if (!results) return null

  const riskColor  = RISK_COLOR[results.risk_level]    || '#F4A261'
  const riskLabel  = RISK_DISPLAY[results.risk_level]  || results.risk_level
  const recommended = RECOMMENDED_INTERVENTION[results.addiction_category] || null

  function handleShare() {
    navigator.clipboard.writeText(window.location.origin).catch(() => {})
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  function goToIntervention(path) {
    navigate(path, { state: { results } })
  }

  return (
    <>
      {showModal && (
        <SevereModal onConfirm={() => { setShowModal(false); setConfirmed(true) }} />
      )}

      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          background: '#2E4057', color: '#fff', padding: '10px 20px',
          borderRadius: '8px', fontSize: '13px', fontWeight: '500',
          zIndex: 999, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}>
          Link copied to clipboard ✓
        </div>
      )}

      <div style={s.page} className="fade-in">
        <div style={s.card}>

          {/* Print-only header */}
          <div className="print-only" style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#2E4057' }}>
              Digital Wellbeing Coach — Assessment Report
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div style={{ height: '1px', background: '#e5e7eb', marginTop: '16px' }} />
          </div>

          {/* Nav link */}
          <div className="no-print" style={{ marginBottom: '32px' }}>
            <button style={s.navLink} onClick={() => navigate('/')} aria-label="Start a new assessment">
              ← Start a new assessment
            </button>
          </div>

          {/* ═══ SECTION 1 — YOUR RESULTS ═══ */}
          <section style={s.section}>
            <SectionHeading>Your results</SectionHeading>

            {/* Risk badge */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{
                display: 'inline-block', padding: '8px 32px', borderRadius: '30px',
                background: riskColor, color: '#fff',
                fontSize: '20px', fontWeight: '800', letterSpacing: '-0.3px',
              }}>
                {riskLabel}
              </span>
            </div>

            {/* Score */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '56px', fontWeight: '800', color: '#2E4057', lineHeight: 1, letterSpacing: '-2px' }}>
                {results.sas_total}
                <span style={{ fontSize: '28px', fontWeight: '400', color: '#9ca3af' }}> / 60</span>
              </div>
              <div style={{
                fontSize: '11px', color: '#9ca3af', marginTop: '6px',
                fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase',
              }}>
                Your usage score
              </div>
            </div>

            {/* Context */}
            <p style={{
              fontSize: '14px', color: '#374151', lineHeight: '1.65',
              textAlign: 'center', maxWidth: '500px', margin: '0 auto 24px',
            }}>
              {RISK_CONTEXT[results.risk_level]}
            </p>

            {/* What stood out */}
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.5' }}>
              Here is what stood out most in your answers:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(results.explanations || []).slice(0, 3).map((text, i) => (
                <ShapCard key={i} number={i + 1} text={text} importance={IMPORTANCE_WIDTHS[i]} riskColor={riskColor} />
              ))}
            </div>
          </section>

          {/* ═══ SECTION 2 — WHAT WE FOUND ═══ */}
          <section style={s.section}>
            <SectionHeading>What we found</SectionHeading>

            {/* Category */}
            <div style={{ marginBottom: '16px' }}>
              {results.addiction_category === 'None' ? (
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>
                  Your usage across all app types is low. No dominant pattern was identified — this is consistent with your low overall score.
                </p>
              ) : results.risk_level === 'Low' ? (
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>
                  Your usage does not show a dominant problematic pattern at this time.
                </p>
              ) : (
                <div>
                  <p style={{
                    fontSize: '11px', fontWeight: '700', color: '#9ca3af',
                    textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px',
                  }}>
                    Where most of your time goes
                  </p>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: '#f0f9ff', border: '1px solid #bae6fd',
                    padding: '8px 20px', borderRadius: '24px',
                    fontSize: '15px', color: '#0369a1', fontWeight: '600',
                  }}>
                    <span>{CATEGORY_EMOJI[results.addiction_category] || '📊'}</span>
                    <span>{results.addiction_category}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Next step */}
            <div style={{
              background: '#fffbeb', border: '1px solid #fde68a',
              borderRadius: '10px', padding: '14px 16px',
              display: 'flex', gap: '12px', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '20px', flexShrink: 0, lineHeight: 1, marginTop: '2px' }}>💡</span>
              <div>
                <p style={{
                  fontSize: '11px', fontWeight: '700', color: '#92400e',
                  margin: '0 0 5px', textTransform: 'uppercase', letterSpacing: '0.4px',
                }}>
                  Your next step
                </p>
                <p style={{ fontSize: '13px', color: '#78350f', lineHeight: '1.6', margin: 0 }}>
                  {RISK_NEXT_STEP[results.risk_level]}
                </p>
              </div>
            </div>
          </section>

          {/* ═══ SECTION 3 — TRACK YOUR SCREEN TIME (no-print) ═══ */}
          <section style={s.section} className="no-print">
            <SectionHeading>Track your screen time</SectionHeading>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.55', marginBottom: '16px' }}>
              Both iPhone and Android have free built-in tools to track exactly how long you spend on each app.
            </p>
            <div style={s.twoCol}>
              <MonitorCard
                icon="🍎"
                title="iPhone — Screen Time"
                body="Built into every iPhone. See your daily and weekly usage per app, and set limits."
                steps={['Open Settings', 'Tap Screen Time', 'Tap Turn On Screen Time', 'View your app usage reports']}
                linkLabel="Open iPhone guide →"
                linkUrl="https://support.apple.com/en-us/111928"
              />
              <MonitorCard
                icon="🤖"
                title="Android — Digital Wellbeing"
                body="Pre-installed on most Android phones (Android 9+). Tracks usage and lets you set app timers."
                steps={['Open Settings', 'Search Digital Wellbeing', 'View your dashboard', 'Set timers for specific apps']}
                linkLabel="Open Android guide →"
                linkUrl="https://wellbeing.google/"
              />
            </div>
          </section>

          {/* ═══ SECTION 4 — THINGS YOU COULD TRY ═══ */}
          {confirmed && (
            <section style={s.section}>
              <SectionHeading>Things you could try</SectionHeading>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.55', marginBottom: '16px' }}>
                Four areas where small changes tend to make the biggest difference.
                {recommended && ' The highlighted one is based on your usage pattern.'}
              </p>
              <div style={s.interventionGrid}>
                {INTERVENTION_CARDS.map(card => {
                  const isHighlighted = card.key === recommended && results.risk_level !== 'Low'
                  return (
                    <div
                      key={card.key}
                      style={{
                        position: 'relative',
                        border: `${isHighlighted ? '2px' : '1px'} solid ${isHighlighted ? '#1B6CA8' : '#E8EAF0'}`,
                        borderRadius: '12px', padding: '20px',
                        background: '#fff',
                        boxShadow: isHighlighted ? '0 4px 16px rgba(27,108,168,0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
                        display: 'flex', flexDirection: 'column', gap: '10px',
                        cursor: 'pointer', transition: 'box-shadow 0.15s',
                      }}
                      onClick={() => goToIntervention(card.path)}
                    >
                      {isHighlighted && (
                        <div style={{
                          position: 'absolute', top: '12px', right: '12px',
                          background: '#1B6CA8', color: '#fff',
                          fontSize: '10px', fontWeight: '700', padding: '3px 8px',
                          borderRadius: '10px', letterSpacing: '0.3px',
                        }}>
                          Recommended for you
                        </div>
                      )}
                      <div style={{ fontSize: '32px', lineHeight: 1 }}>{card.icon}</div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#2E4057', marginBottom: '5px' }}>
                          {card.title}
                        </div>
                        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                          {card.description}
                        </p>
                      </div>
                      <div style={{
                        marginTop: 'auto', fontSize: '13px', fontWeight: '600',
                        color: '#1B6CA8', display: 'flex', alignItems: 'center', gap: '4px',
                      }}>
                        Explore →
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* ═══ SECTION 5 — YOUR REPORT (no-print) ═══ */}
          <section style={s.section} className="no-print">
            <SectionHeading>Your report</SectionHeading>
            <div style={s.reportBtns}>
              <button style={s.primaryBtn} onClick={() => window.print()} aria-label="Download my report">
                Download my report
              </button>
              <button style={s.outlineBtn} onClick={handleShare} aria-label="Share this tool">
                Share this tool
              </button>
            </div>
          </section>

          {/* Feedback (no-print) */}
          <div style={{ paddingBottom: '48px' }} className="no-print">
            <FeedbackWidget riskLevel={results.risk_level} />
          </div>

          {/* Print footer */}
          <div className="print-only" style={{
            marginTop: '40px', paddingTop: '14px',
            borderTop: '1px solid #e5e7eb', fontSize: '11px', color: '#9ca3af',
          }}>
            Generated by Digital Wellbeing Coach | Not a medical tool | For support call 116 (Rwanda, free 24/7)
          </div>

        </div>
      </div>
    </>
  )
})

function MonitorCard({ icon, title, body, steps, linkLabel, linkUrl }) {
  return (
    <div style={{
      border: '1px solid #E8EAF0', borderRadius: '12px', padding: '16px',
      background: '#fff', display: 'flex', flexDirection: 'column', gap: '10px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '22px' }}>{icon}</span>
        <span style={{ fontSize: '14px', fontWeight: '700', color: '#2E4057' }}>{title}</span>
      </div>
      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>{body}</p>
      <ol style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {steps.map((step, i) => (
          <li key={i} style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.4' }}>{step}</li>
        ))}
      </ol>
      <a href={linkUrl} target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-block', alignSelf: 'flex-start',
        padding: '6px 14px', background: '#eff6ff',
        border: '1px solid #bfdbfe', borderRadius: '6px',
        fontSize: '12px', fontWeight: '600', color: '#1B6CA8', textDecoration: 'none',
      }}>
        {linkLabel}
      </a>
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
  navLink: {
    background: 'none', border: 'none', color: '#9ca3af',
    fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', padding: 0,
  },
  section: { marginBottom: '40px' },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '12px',
  },
  interventionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '12px',
  },
  reportBtns: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  primaryBtn: {
    flex: 1, minWidth: '140px', padding: '12px 24px',
    background: '#2E4057', color: '#fff', border: 'none',
    borderRadius: '8px', fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  outlineBtn: {
    flex: 1, minWidth: '140px', padding: '12px 24px',
    background: '#fff', color: '#2E4057', border: '1.5px solid #2E4057',
    borderRadius: '8px', fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
}
