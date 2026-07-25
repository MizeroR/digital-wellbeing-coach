import { memo, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SevereModal from '../components/SevereModal'

// ── Constants ─────────────────────────────────────────────────────────────────

const RISK_COLOR = {
  Low:      '#16A34A',
  Moderate: '#D97706',
  High:     '#EA580C',
  Severe:   '#DC2626',
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

const RISK_EXPLANATION = {
  Low:      'Your usage pattern does not show signs of problematic dependency at this time.',
  Moderate: 'Some patterns in your usage are worth paying attention to before they become harder to change.',
  High:     'Your usage is affecting your daily life in measurable ways. The recommendations below can help.',
  Severe:   'Your responses suggest significant impact on your wellbeing. Please consider reaching out — you do not have to figure this out alone.',
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

const SUS_QUESTIONS = [
  'I think that I would like to use this system frequently.',
  'I found the system unnecessarily complex.',
  'I thought the system was easy to use.',
  'I think that I would need the support of a technical person to be able to use this system.',
  'I found the various functions in this system were well integrated.',
  'I thought there was too much inconsistency in this system.',
  'I would imagine that most people would learn to use this system very quickly.',
  'I found the system very cumbersome to use.',
  'I felt very confident using the system.',
  'I needed to learn a lot of things before I could get going with this system.',
]

const E1_OPTIONS = ['Yes, it felt accurate', 'Somewhat accurate', 'No, it did not feel accurate']
const E2_OPTIONS = ['Yes, very relevant', 'Somewhat relevant', 'Not relevant']
const E3_OPTIONS = ['Yes, it was clear', 'Somewhat clear', 'No, it was confusing']
const E4_OPTIONS = ['Yes', 'Maybe', 'No']

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeading({ children, subtitle }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{
        fontSize: '15px', fontWeight: '700', color: '#334155',
        margin: '0 0 6px', letterSpacing: '-0.1px',
      }}>
        {children}
      </h2>
      {subtitle && (
        <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 10px', lineHeight: '1.5' }}>
          {subtitle}
        </p>
      )}
      <div style={{ height: '1px', background: '#E2E8F0' }} />
    </div>
  )
}

function ShapCard({ number, text, importance }) {
  return (
    <div style={{
      background: '#F8FAFC', borderRadius: '8px', padding: '12px 14px',
      border: '1px solid #E2E8F0',
    }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{
          width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
          background: '#EFF6FF', color: '#2563EB',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: '700',
        }}>
          {number}
        </div>
        <p style={{ fontSize: '13px', color: '#1E293B', lineHeight: '1.5', margin: 0, flex: 1 }}>
          {text}
        </p>
      </div>
      <div style={{ height: '3px', background: '#DBEAFE', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: importance, background: '#2563EB',
          borderRadius: '2px', transition: 'width 0.8s ease',
        }} />
      </div>
    </div>
  )
}

function SusFeedbackWidget({ sessionId, riskLevel, addictionCategory }) {
  const [sus,        setSus]        = useState({})
  const [e1,         setE1]         = useState('')
  const [e1x,        setE1x]        = useState('')
  const [e2,         setE2]         = useState('')
  const [e3,         setE3]         = useState('')
  const [e4,         setE4]         = useState('')
  const [e5,         setE5]         = useState('')
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const allSusFilled = SUS_QUESTIONS.every((_, i) => sus[`D${i + 1}`] != null)
  const canSubmit    = allSusFilled && e1 && e2 && e3 && e4

  async function handleSubmit() {
    if (!canSubmit) return
    setSubmitting(true)
    const payload = {
      sus_d1: sus.D1, sus_d2: sus.D2, sus_d3: sus.D3, sus_d4: sus.D4, sus_d5: sus.D5,
      sus_d6: sus.D6, sus_d7: sus.D7, sus_d8: sus.D8, sus_d9: sus.D9, sus_d10: sus.D10,
      e1_accurate: e1, e1_explanation: e1x || null,
      e2_relevant: e2, e3_clear: e3, e4_recommend: e4, e5_suggestion: e5 || null,
      session_id: sessionId || null, risk_level: riskLevel || null,
      addiction_category: addictionCategory || null,
    }
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL || 'https://digital-wellbeing-coach.onrender.com'}/feedback`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
      )
    } catch {}
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{
        background: '#F0FDF4', border: '1px solid #BBF7D0',
        borderRadius: '12px', padding: '28px 24px', textAlign: 'center',
      }}>
        <p style={{ fontSize: '32px', margin: '0 0 12px' }}>🙏</p>
        <p style={{ fontSize: '15px', fontWeight: '700', color: '#166534', margin: '0 0 8px' }}>
          Thank you for your participation.
        </p>
        <p style={{ fontSize: '13px', color: '#16A34A', lineHeight: '1.6', margin: '0 0 16px' }}>
          Your feedback directly improves this tool for Kigali university students.
        </p>
        <p style={{ fontSize: '12px', color: '#4B7A5E', margin: 0 }}>
          Questions: r.mizero@alustudent.com | +250 784 911 041
        </p>
      </div>
    )
  }

  const startedFilling = Object.keys(sus).length > 0 || e1 || e2 || e3 || e4

  return (
    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B', margin: '0 0 6px' }}>
        How was your experience?
      </h2>
      <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 24px', lineHeight: '1.6' }}>
        You have just used the Digital Wellbeing Coach. Please rate the following statements — your feedback
        helps us improve this tool for other students in Kigali. Takes about 2 minutes.
      </p>

      {/* Scale header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 12px', background: '#EFF6FF', borderRadius: '6px', marginBottom: '4px',
        fontSize: '11px', fontWeight: '600', color: '#2563EB',
      }}>
        <span>1 = Strongly Disagree</span>
        <span>3 = Neutral</span>
        <span>5 = Strongly Agree</span>
      </div>

      {/* SUS questions */}
      <div style={{ marginBottom: '28px' }}>
        {SUS_QUESTIONS.map((q, i) => {
          const key = `D${i + 1}`
          return (
            <div key={key} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 0', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap',
            }}>
              <span style={{ flex: 1, minWidth: '180px', fontSize: '13px', color: '#1E293B', lineHeight: '1.5' }}>
                <span style={{ fontWeight: '700', color: '#94A3B8', marginRight: '6px' }}>{i + 1}.</span>
                {q}
              </span>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                {[1, 2, 3, 4, 5].map(n => {
                  const isSelected = sus[key] === n
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setSus(prev => ({ ...prev, [key]: n }))}
                      style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        border: isSelected ? 'none' : '1.5px solid #CBD5E1',
                        background: isSelected ? '#2563EB' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#94A3B8',
                        fontSize: '12px', fontWeight: '600',
                        cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
                      }}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <p style={{
        fontSize: '12px', fontWeight: '700', color: '#94A3B8',
        textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 20px',
      }}>
        A few more questions
      </p>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', margin: '0 0 10px' }}>
          1. Did the risk score feel accurate?
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {E1_OPTIONS.map(opt => (
            <button key={opt} type="button" onClick={() => setE1(opt)} style={pillStyle(e1 === opt)}>{opt}</button>
          ))}
        </div>
        {(e1 === 'Somewhat accurate' || e1 === 'No, it did not feel accurate') && (
          <input
            type="text"
            placeholder="Please briefly explain:"
            value={e1x}
            onChange={ev => setE1x(ev.target.value)}
            style={susInputStyle}
          />
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', margin: '0 0 10px' }}>
          2. Were the recommended activities relevant?
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {E2_OPTIONS.map(opt => (
            <button key={opt} type="button" onClick={() => setE2(opt)} style={pillStyle(e2 === opt)}>{opt}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', margin: '0 0 10px' }}>
          3. Did the explanation of your score make sense?
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {E3_OPTIONS.map(opt => (
            <button key={opt} type="button" onClick={() => setE3(opt)} style={pillStyle(e3 === opt)}>{opt}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', margin: '0 0 10px' }}>
          4. Would you use this tool again or recommend it?
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {E4_OPTIONS.map(opt => (
            <button key={opt} type="button" onClick={() => setE4(opt)} style={pillStyle(e4 === opt)}>{opt}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', margin: '0 0 10px' }}>
          5. Is there anything you would change or add?{' '}
          <span style={{ fontWeight: '400', color: '#94A3B8' }}>(Optional)</span>
        </p>
        <textarea
          placeholder="Your answer..."
          value={e5}
          onChange={ev => setE5(ev.target.value)}
          rows={2}
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: '6px',
            fontSize: '13px', fontFamily: 'inherit', color: '#1E293B',
            resize: 'vertical', background: '#fff',
          }}
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit || submitting}
        style={{
          padding: '11px 24px',
          background: canSubmit ? '#2563EB' : '#CBD5E1',
          color: '#FFFFFF', border: 'none', borderRadius: '8px',
          fontSize: '14px', fontWeight: '600',
          cursor: canSubmit ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit',
        }}
      >
        {submitting ? 'Submitting…' : 'Submit feedback'}
      </button>
      {!canSubmit && startedFilling && (
        <p style={{ fontSize: '12px', color: '#94A3B8', margin: '8px 0 0' }}>
          Please complete all 10 SUS questions and follow-up questions E1–E4 to submit.
        </p>
      )}
    </div>
  )
}

function pillStyle(selected) {
  return {
    padding: '8px 14px', borderRadius: '20px',
    border: selected ? 'none' : '1.5px solid #E2E8F0',
    background: selected ? '#2563EB' : '#FFFFFF',
    color: selected ? '#FFFFFF' : '#475569',
    fontSize: '13px', cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: selected ? '600' : '400',
  }
}

const susInputStyle = {
  width: '100%', boxSizing: 'border-box', marginTop: '10px',
  padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: '6px',
  fontSize: '13px', fontFamily: 'inherit', color: '#1E293B', background: '#fff',
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
          background: '#1E293B', color: '#FFFFFF', padding: '10px 20px',
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
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>
              Digital Wellbeing Coach — Assessment Report
            </div>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
              {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div style={{ height: '1px', background: '#E2E8F0', marginTop: '16px' }} />
          </div>

          {/* Nav link */}
          <div className="no-print" style={{ marginBottom: '32px' }}>
            <button style={s.navLink} onClick={() => navigate('/')} aria-label="Start a new assessment">
              ← Start a new assessment
            </button>
          </div>

          {/* ═══ SECTION 1 — YOUR RESULTS ═══ */}
          <section style={s.section}>
            <SectionHeading subtitle="Based on your answers, here is where your smartphone usage sits.">
              Your results
            </SectionHeading>

            {/* Risk badge + plain-language explanation */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{
                display: 'inline-block', padding: '8px 32px', borderRadius: '30px',
                background: riskColor, color: '#fff',
                fontSize: '20px', fontWeight: '800', letterSpacing: '-0.3px',
              }}>
                {riskLabel}
              </span>
              <p style={{
                fontSize: '13px', fontStyle: 'italic', color: '#64748B',
                margin: '10px auto 0', maxWidth: '420px', lineHeight: '1.6',
              }}>
                {RISK_EXPLANATION[results.risk_level]}
              </p>
            </div>

            {/* Score */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '56px', fontWeight: '800', color: '#1E293B', lineHeight: 1, letterSpacing: '-2px' }}>
                {results.sas_total}
                <span style={{ fontSize: '28px', fontWeight: '400', color: '#94A3B8' }}> / 60</span>
              </div>
              <div style={{
                fontSize: '11px', color: '#94A3B8', marginTop: '6px',
                fontWeight: '600', letterSpacing: '0.6px', textTransform: 'uppercase',
              }}>
                Your usage score

              </div>
            </div>

            {/* Context */}
            <p style={{
              fontSize: '14px', color: '#1E293B', lineHeight: '1.65',
              textAlign: 'center', maxWidth: '500px', margin: '0 auto 24px',
            }}>
              {RISK_CONTEXT[results.risk_level]}
            </p>

            {/* What stood out */}
            <p style={{
              fontSize: '11px', fontWeight: '700', color: '#94A3B8',
              textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px',
            }}>
              What's affecting your score
            </p>
            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5', margin: '0 0 12px' }}>
              These are the three specific habits that contributed most to your result.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(results.explanations || []).slice(0, 3).map((text, i) => (
                <ShapCard key={i} number={i + 1} text={text} importance={IMPORTANCE_WIDTHS[i]} />
              ))}
            </div>
          </section>

          {/* ═══ SECTION 2 — WHAT WE FOUND ═══ */}
          <section style={s.section}>
            <SectionHeading>What we found</SectionHeading>

            {/* Category */}
            <div style={{ marginBottom: '16px' }}>
              {results.addiction_category === 'None' ? (
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  Your usage across all app types is low. No dominant pattern was identified — this is consistent with your low overall score.
                </p>
              ) : results.risk_level === 'Low' ? (
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  Your usage does not show a dominant problematic pattern at this time.
                </p>
              ) : (
                <div>
                  <p style={{
                    fontSize: '11px', fontWeight: '700', color: '#94A3B8',
                    textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px',
                  }}>
                    Where most of your time goes
                  </p>
                  <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5', margin: '0 0 12px' }}>
                    The app category where your usage is most concentrated.
                  </p>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: '#EFF6FF', border: '1px solid #BFDBFE',
                    padding: '8px 20px', borderRadius: '24px',
                    fontSize: '15px', color: '#2563EB', fontWeight: '600',
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
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.55', marginBottom: '16px' }}>
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
              <SectionHeading subtitle="Real activities in Kigali that can help redirect the time occupied by your dominant usage pattern.">
              Things you could try
            </SectionHeading>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.55', marginBottom: '16px' }}>
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
                        border: `${isHighlighted ? '2px' : '1px'} solid ${isHighlighted ? '#2563EB' : '#E2E8F0'}`,
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
                          background: '#2563EB', color: '#fff',
                          fontSize: '10px', fontWeight: '700', padding: '3px 8px',
                          borderRadius: '10px', letterSpacing: '0.3px',
                        }}>
                          Recommended for you
                        </div>
                      )}
                      <div style={{ fontSize: '32px', lineHeight: 1 }}>{card.icon}</div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', marginBottom: '5px' }}>
                          {card.title}
                        </div>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                          {card.description}
                        </p>
                      </div>
                      <div style={{
                        marginTop: 'auto', fontSize: '13px', fontWeight: '600',
                        color: '#2563EB', display: 'flex', alignItems: 'center', gap: '4px',
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
            <SusFeedbackWidget
              sessionId={results.session_id}
              riskLevel={results.risk_level}
              addictionCategory={results.addiction_category}
            />
          </div>

          {/* Print footer */}
          <div className="print-only" style={{
            marginTop: '40px', paddingTop: '14px',
            borderTop: '1px solid #E2E8F0', fontSize: '11px', color: '#94A3B8',
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
      border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px',
      background: '#fff', display: 'flex', flexDirection: 'column', gap: '10px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '22px' }}>{icon}</span>
        <span style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B' }}>{title}</span>
      </div>
      <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', margin: 0 }}>{body}</p>
      <ol style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {steps.map((step, i) => (
          <li key={i} style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>{step}</li>
        ))}
      </ol>
      <a href={linkUrl} target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-block', alignSelf: 'flex-start',
        padding: '6px 14px', background: '#EFF6FF',
        border: '1px solid #BFDBFE', borderRadius: '6px',
        fontSize: '12px', fontWeight: '600', color: '#2563EB', textDecoration: 'none',
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
    background: 'none', border: 'none', color: '#94A3B8',
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
    background: '#2563EB', color: '#FFFFFF', border: 'none',
    borderRadius: '8px', fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  outlineBtn: {
    flex: 1, minWidth: '140px', padding: '12px 24px',
    background: '#F1F5F9', color: '#1E293B', border: '1px solid #E2E8F0',
    borderRadius: '8px', fontSize: '14px', fontWeight: '600',
    cursor: 'pointer', fontFamily: 'inherit',
  },
}
