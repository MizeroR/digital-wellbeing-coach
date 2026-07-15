import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SLIDES = [
  {
    title: 'Before you start',
    content: [
      'This tool was built by Reine Mizero, a final-year Software Engineering student at African Leadership University (ALU), as a capstone research project.',
      'It assesses your smartphone usage patterns using a research-backed questionnaire about smartphone habits and gives you a personalised report.',
      'The study has been approved by the ALU Research Ethics Committee.',
    ],
  },
  {
    title: 'Your privacy',
    content: [
      'This assessment is completely anonymous. No name, email, student ID, or phone number is collected at any point.',
      'Your responses are stored securely on an encrypted database and used only for this research.',
      'Your anonymous data may appear in academic publications in aggregated form only.',
      'Participation is voluntary. You can stop at any time.',
    ],
  },
  {
    title: 'What you get',
    content: [
      'Your usage score out of 60 and what it means (All good / Worth watching / Time to act / Get support).',
      'A plain-language explanation of which specific behaviours are driving your score.',
      'Personalised activity recommendations relevant to students in Kigali.',
      'The assessment takes approximately 10 minutes.',
    ],
  },
]

export default function ConsentScreen() {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [declined, setDeclined] = useState(false)

  const isLast = slide === SLIDES.length - 1

  if (declined) {
    return (
      <div style={s.page} className="fade-in">
        <div style={s.container}>
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ fontSize: '40px', marginBottom: '16px' }}>🙏</p>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#2E4057', marginBottom: '10px' }}>
              Thank you for your time
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>
              Your decision not to participate is completely respected.
              You may close this tab at any time.
            </p>
            <button
              style={{ fontSize: '13px', color: '#1B6CA8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}
              onClick={() => setDeclined(false)}
            >
              Go back to consent
            </button>
          </div>
        </div>
      </div>
    )
  }

  const current = SLIDES[slide]

  return (
    <div style={s.page} className="fade-in">
      <div style={s.container}>

        {/* Dot indicator */}
        <div style={s.dots}>
          {SLIDES.map((_, i) => (
            <div key={i} style={{ ...s.dot, background: i === slide ? '#2E4057' : '#d1d5db' }} />
          ))}
        </div>

        {/* Title block */}
        <div style={s.titleBlock}>
          <p style={s.label}>CONSENT FOR PARTICIPATION — {slide + 1} of {SLIDES.length}</p>
          <h1 style={s.topic}>{current.title}</h1>
        </div>

        {/* Content */}
        <div style={s.contentList}>
          {current.content.map((text, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', paddingBottom: '14px' }}>
              <span style={{ color: '#1B6CA8', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>—</span>
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>

        <div style={s.divider} />

        {/* Checkbox on last slide */}
        {isLast && (
          <label style={s.checkRow} aria-label="I understand and agree to participate voluntarily">
            <div
              style={{
                ...s.checkbox,
                background: agreed ? '#2E4057' : '#fff',
                borderColor: agreed ? '#2E4057' : '#d1d5db',
              }}
              onClick={() => setAgreed(a => !a)}
            >
              {agreed && <span style={{ color: '#fff', fontSize: '12px', fontWeight: '700' }}>✓</span>}
            </div>
            <span
              style={{ fontSize: '14px', color: '#374151', cursor: 'pointer', lineHeight: '1.5' }}
              onClick={() => setAgreed(a => !a)}
            >
              I understand and agree to participate voluntarily
            </span>
          </label>
        )}

        {/* Navigation */}
        <div style={s.actions}>
          {isLast ? (
            <>
              <button
                style={{
                  ...s.primaryBtn,
                  opacity: agreed ? 1 : 0.4,
                  cursor: agreed ? 'pointer' : 'not-allowed',
                }}
                disabled={!agreed}
                onClick={() => navigate('/assessment')}
                aria-label="I agree, start assessment"
              >
                I agree, start assessment →
              </button>
              <button
                style={s.declineBtn}
                onClick={() => setDeclined(true)}
                aria-label="Decline participation"
              >
                I do not wish to participate
              </button>
            </>
          ) : (
            <button
              style={s.primaryBtn}
              onClick={() => setSlide(sl => sl + 1)}
              aria-label="Next slide"
            >
              Next →
            </button>
          )}

          {slide > 0 && (
            <button
              style={s.backBtn}
              onClick={() => setSlide(sl => sl - 1)}
              aria-label="Go back to previous slide"
            >
              ← Back
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: 'calc(100vh - 52px)',
    padding: '48px 20px 72px',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '680px',
  },
  dots: {
    display: 'flex',
    gap: '6px',
    marginBottom: '28px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'background 0.2s',
  },
  titleBlock: {
    marginBottom: '24px',
    paddingBottom: '20px',
    borderBottom: '2px solid #2E4057',
  },
  label: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#1B6CA8',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    margin: '0 0 10px',
  },
  topic: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#2E4057',
    lineHeight: '1.3',
    margin: 0,
  },
  contentList: {
    margin: '20px 0 0',
  },
  divider: {
    borderTop: '1px solid #e5e7eb',
    margin: '24px 0',
  },
  checkRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: '2px solid #d1d5db',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
    cursor: 'pointer',
    marginTop: '2px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  primaryBtn: {
    width: '100%',
    padding: '14px',
    background: '#2E4057',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  declineBtn: {
    width: '100%',
    padding: '11px',
    background: '#fff',
    color: '#9ca3af',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    padding: '4px 0',
    alignSelf: 'flex-start',
  },
}
