import { useState } from 'react'

export default function ConsentScreen({ onConsent, onDecline }) {
  const [participation, setParticipation] = useState('')

  function handleParticipationChoice(choice) {
    setParticipation(choice)
    if (choice === 'decline') {
      onDecline()
    }
  }

  return (
    <div style={s.page}>
      <div style={s.container}>

        {/* ── Title ── */}
        <div style={s.titleBlock}>
          <p style={s.label}>CONSENT FOR PARTICIPATION</p>
          <h1 style={s.topic}>
            Smartphone Addiction Risk Prediction and Digital Wellbeing Among University Students in Kigali
          </h1>
        </div>

        {/* ── Intro ── */}
        <p style={s.body}>
          You are invited to participate in a research study conducted by <strong>Reine Mizero</strong>, a student researcher
          from the African Leadership University. This study is part of research pertaining to her final year Capstone
          Project/Research. Miss Reine will be interviewing and observing people who are impacted or work in the area of
          students aged 18–25 in Kigali about their smartphone usage patterns and experiences with a web-based digital
          wellbeing tool.
        </p>
        <p style={s.body}>
          You are being asked to participate in the project because you are a currently enrolled university student in Kigali
          who owns a smartphone. Please read the information below and ask questions about anything you do not understand
          before deciding to participate in the study:
        </p>

        {/* ── Terms ── */}
        <div style={s.termsList}>
          <Term>
            <strong>Participation is voluntary:</strong> You have the right to withdraw from this project at any stage and
            are under no obligation to take part. You have the right to refuse to answer any questions.
          </Term>
          <Term>
            <strong>Compensation:</strong> You understand you will not be compensated for participation unless you need to
            be refunded for expenditure incurred in the process of participating in the study.
          </Term>
          <Term>
            <strong>Academic research and publications:</strong> Your responses will be used solely for education and
            research purposes, which may be used in academic publications. This report will be available to you if you
            desire for comment prior to finalisation so as to allow your response to be included in any published work.
          </Term>
          <Term>
            <strong>Privacy:</strong> All responses collected through this tool are completely anonymous. No name, email
            address, student ID, or any other identifying information is stored. Your identity will remain confidential
            at all stages of the research.
          </Term>
          <Term>
            <strong>Interviews:</strong> In the instance where a one-on-one interview is requested to delve deeper into
            your perspective, you understand that you do not have to participate. If you do agree, you can decide whether
            or not to have the interview recorded (audio and/or visual).
          </Term>
        </div>

        <div style={s.divider} />

        {/* ── Participation Permission ── */}
        <div style={{ marginBottom: '24px' }}>
          <p style={s.sectionTitle}>Participation Permission</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
            <RadioRow
              label="I agree to participate in the study."
              checked={participation === 'agree'}
              onChange={() => handleParticipationChoice('agree')}
            />
            <RadioRow
              label="I do not agree to participate."
              checked={participation === 'decline'}
              onChange={() => handleParticipationChoice('decline')}
            />
          </div>
        </div>

        {/* ── Actions ── */}
        <div style={s.actions}>
          <button
            style={{
              ...s.primaryBtn,
              opacity: participation === 'agree' ? 1 : 0.4,
              cursor: participation === 'agree' ? 'pointer' : 'not-allowed',
            }}
            disabled={participation !== 'agree'}
            onClick={onConsent}
          >
            Proceed to assessment →
          </button>
          {participation !== 'agree' && (
            <p style={s.hint}>Select "I agree to participate" above to proceed.</p>
          )}
        </div>

      </div>
    </div>
  )
}

function Term({ children }) {
  return (
    <div style={{ display: 'flex', gap: '10px', paddingBottom: '12px' }}>
      <span style={{ color: '#1B6CA8', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>—</span>
      <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.65', margin: 0 }}>{children}</p>
    </div>
  )
}

function RadioRow({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
        border: `2px solid ${checked ? '#1B6CA8' : '#d1d5db'}`,
        background: checked ? '#1B6CA8' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
      </div>
      <input type="radio" checked={checked} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0 }} />
      <span style={{ fontSize: '14px', color: '#374151' }}>{label}</span>
    </label>
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
  titleBlock: {
    marginBottom: '28px',
    paddingBottom: '24px',
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
    fontSize: '22px',
    fontWeight: '700',
    color: '#2E4057',
    lineHeight: '1.35',
    margin: 0,
  },
  body: {
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.7',
    margin: '0 0 16px',
  },
  termsList: {
    margin: '20px 0 0',
  },
  divider: {
    borderTop: '1px solid #e5e7eb',
    margin: '28px 0',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#2E4057',
    margin: '0 0 12px',
  },
  actions: {
    marginTop: '8px',
    paddingTop: '24px',
    borderTop: '1px solid #e5e7eb',
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
  hint: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#9ca3af',
    margin: '10px 0 0',
  },
}
