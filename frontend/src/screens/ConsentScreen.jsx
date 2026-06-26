import { useState } from 'react'

export default function ConsentScreen({ onConsent, onDecline }) {
  const [participation, setParticipation] = useState('')
  const [identityDisclosure, setIdentityDisclosure] = useState([])
  const [recordingPermission, setRecordingPermission] = useState('')
  const [participantName, setParticipantName] = useState('')

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  function toggleIdentity(val) {
    if (val === 'None') {
      setIdentityDisclosure(['None'])
      return
    }
    setIdentityDisclosure(prev => {
      const without = prev.filter(v => v !== 'None')
      return without.includes(val) ? without.filter(v => v !== val) : [...without, val]
    })
  }

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
            <strong>Privacy:</strong> We would like permission to indicate your name and position/title in any publications
            where direct quotations or references to information you provide are used. If you do not grant permission, only
            the name of your department or organisation and a generic position title will be used. Your name and actual
            position title will remain confidential.
          </Term>
          <Term>
            <strong>Interviews:</strong> In the instance where a one-on-one interview is requested to delve deeper into
            your perspective, you understand that you do not have to participate. If you do agree, you can decide whether
            or not to have the interview recorded (audio and/or visual).
          </Term>
        </div>

        <div style={s.divider} />

        {/* ── Participation Permission ── */}
        <Section title="Participation Permission">
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
        </Section>

        {/* ── Identity Disclosure ── */}
        <Section title="Identity Disclosure: In the event of publications, I give permission to indicate:">
          {['My name', 'My position title', 'Phone (mobile) number', 'None'].map(opt => (
            <CheckRow
              key={opt}
              label={opt}
              checked={identityDisclosure.includes(opt)}
              onChange={() => toggleIdentity(opt)}
            />
          ))}
        </Section>

        {/* ── Recording Permission ── */}
        <Section title="Interviews — Recording Permission (audio-visual)">
          <RadioRow
            label="I give permission to be recorded"
            checked={recordingPermission === 'yes'}
            onChange={() => setRecordingPermission('yes')}
          />
          <RadioRow
            label="I do not give permission to be recorded"
            checked={recordingPermission === 'no'}
            onChange={() => setRecordingPermission('no')}
          />
        </Section>

        <div style={s.divider} />

        {/* ── Signature block ── */}
        <p style={s.body}>
          By proceeding, you are indicating that you understand the procedures described above, your questions have been
          answered to your satisfaction, and that you have seen and approved the information on this form.
        </p>

        <div style={s.sigGrid}>
          <Field label="Participant Name (Optional)">
            <input
              style={s.input}
              type="text"
              placeholder="Enter your name (optional)"
              value={participantName}
              onChange={e => setParticipantName(e.target.value)}
            />
          </Field>
          <Field label="Date">
            <input style={{ ...s.input, background: '#f9fafb', color: '#6b7280' }} readOnly value={dateStr} />
          </Field>
          <Field label="Time">
            <input style={{ ...s.input, background: '#f9fafb', color: '#6b7280' }} readOnly value={timeStr} />
          </Field>
        </div>

        {/* ── Actions ── */}
        <div style={s.actions}>
          <button
            style={{ ...s.primaryBtn, opacity: participation === 'agree' ? 1 : 0.4, cursor: participation === 'agree' ? 'pointer' : 'not-allowed' }}
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

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <p style={s.sectionTitle}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
        {children}
      </div>
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

function CheckRow({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
      <div style={{
        width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
        border: `2px solid ${checked ? '#1B6CA8' : '#d1d5db'}`,
        background: checked ? '#1B6CA8' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <span style={{ color: '#fff', fontSize: '11px', fontWeight: '700', lineHeight: 1 }}>✓</span>}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0 }} />
      <span style={{ fontSize: '14px', color: '#374151' }}>{label}</span>
    </label>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
        {label}
      </label>
      {children}
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
    paddingLeft: '0',
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
  sigGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '12px',
    margin: '20px 0 0',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#2E4057',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box',
  },
  actions: {
    marginTop: '32px',
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
