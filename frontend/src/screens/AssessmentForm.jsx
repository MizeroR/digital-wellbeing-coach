import { useState, useMemo } from 'react'
import { predict } from '../api'
import ProgressBar from '../components/ProgressBar'

const HOURS_OPTIONS = [
  { value: '',      label: 'Select...' },
  { value: '0-1hr', label: 'Rarely — I barely use it' },
  { value: '1-2hrs',label: 'A little — maybe 1–2 hours' },
  { value: '2-4hrs',label: 'Quite a bit — several hours a day' },
  { value: '4-6hrs',label: 'A lot — most of my free time' },
  { value: '6+hrs', label: 'Almost constantly' },
]

const HOUR_VALUES = {
  '0-1hr': 0.5, '1-2hrs': 1.5, '2-4hrs': 3, '4-6hrs': 5, '6+hrs': 7,
}

const APP_ROWS = [
  { key: 'socialMedia', icon: '📱', name: 'Social media',  sub: 'Instagram, Facebook, TikTok' },
  { key: 'gaming',      icon: '🎮', name: 'Gaming',        sub: 'Mobile, console, online gaming' },
  { key: 'streaming',   icon: '📺', name: 'Streaming',     sub: 'Netflix, YouTube, other video' },
  { key: 'messaging',   icon: '💬', name: 'Messaging',     sub: 'WhatsApp, Telegram, SMS' },
  { key: 'other',       icon: '⚡', name: 'Other apps',    sub: 'Browsing, shopping, listening' },
]

const SAS_QUESTIONS = [
  { id: 'Q1',  text: 'Missing planned work due to smartphone use' },
  { id: 'Q2',  text: 'Hard to concentrate in class or while working due to smartphone use' },
  { id: 'Q3',  text: 'Feeling pain in wrists or neck while using a smartphone' },
  { id: 'Q4',  text: "Won't be able to stand not having a smartphone" },
  { id: 'Q5',  text: 'Feeling impatient and fretful when not holding my smartphone' },
  { id: 'Q6',  text: 'Having my smartphone on my mind even when not using it' },
  { id: 'Q7',  text: 'I will never give up my smartphone even when my daily life is greatly affected by it' },
  { id: 'Q8',  text: 'Constantly checking my smartphone so as not to miss conversations on social media' },
  { id: 'Q9',  text: 'Using my smartphone longer than I had intended' },
  { id: 'Q10', text: 'The people around me tell me that I use my smartphone too much' },
]

function buildPayload(form) {
  const hours = {
    socialMedia: HOUR_VALUES[form.socialMedia] || 0,
    gaming:      HOUR_VALUES[form.gaming]      || 0,
    streaming:   HOUR_VALUES[form.streaming]   || 0,
    messaging:   HOUR_VALUES[form.messaging]   || 0,
    other:       HOUR_VALUES[form.other]       || 0,
  }
  const total = Object.values(hours).reduce((s, h) => s + h, 0)
  const usageDuration = total <= 3 ? 1 : total <= 6 ? 2 : total <= 9 ? 3 : 4

  const maxKey = Object.entries(hours).reduce((a, b) => b[1] > a[1] ? b : a)[0]
  const ACCESS_MAP = { socialMedia: 3, gaming: 2, streaming: 5, messaging: 5, other: 5 }

  return {
    gender:            form.gender === 'Male' ? 'M' : 'F',
    age:               parseInt(form.age),
    usage_duration:    usageDuration,
    social_media_usage: hours.socialMedia >= 1 ? 1 : 0,
    frequent_access:   ACCESS_MAP[maxKey] || 5,
    Q1:  parseInt(form.Q1),  Q2:  parseInt(form.Q2),
    Q3:  parseInt(form.Q3),  Q4:  parseInt(form.Q4),
    Q5:  parseInt(form.Q5),  Q6:  parseInt(form.Q6),
    Q7:  parseInt(form.Q7),  Q8:  parseInt(form.Q8),
    Q9:  parseInt(form.Q9),  Q10: parseInt(form.Q10),
  }
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: `1.5px solid ${value === opt.value ? '#1B6CA8' : '#d1d5db'}`,
            background: value === opt.value ? '#1B6CA8' : '#fff',
            color: value === opt.value ? '#fff' : '#6b7280',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: value === opt.value ? '500' : '400',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default function AssessmentForm({ onResults }) {
  const [form, setForm] = useState({
    age: '', gender: '', university: '', enrolled: '',
    socialMedia: '', gaming: '', streaming: '', messaging: '', other: '',
    unlockFreq: '', lateNight: '',
    Q1: '', Q2: '', Q3: '', Q4: '', Q5: '',
    Q6: '', Q7: '', Q8: '', Q9: '', Q10: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const currentStep = useMemo(() => {
    if (!form.age || !form.gender) return 2
    if (!form.socialMedia) return 3
    return 4
  }, [form.age, form.gender, form.socialMedia])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const missing = [
      'age', 'gender',
      'socialMedia', 'gaming', 'streaming', 'messaging', 'other',
      'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10',
    ].filter(k => !form[k])

    if (missing.length > 0) {
      setError('Please complete all required fields (*) before submitting.')
      return
    }

    setLoading(true)
    try {
      const data = await predict(buildPayload(form))
      onResults(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <ProgressBar currentStep={currentStep} />

        <h1 style={s.title}>Tell us about yourself</h1>
        <p style={s.subtitle}>
          Your answers are completely anonymous. No name, email, or student ID is collected.
          This takes approximately 10 minutes.
        </p>

        <form onSubmit={handleSubmit}>
          {/* ── SECTION A ── */}
          <div style={s.divider} />
          <p style={s.sectionLabel}>Section A — Demographics</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <Field label="Age *">
              <select style={s.select} value={form.age} onChange={e => set('age', e.target.value)}>
                <option value="">Select age</option>
                {Array.from({ length: 8 }, (_, i) => 18 + i).map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </Field>
            <Field label="Gender *">
              <select style={s.select} value={form.gender} onChange={e => set('gender', e.target.value)}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </Field>
          </div>

          <Field label="University">
            <select style={s.select} value={form.university} onChange={e => set('university', e.target.value)}>
              <option value="">Select university</option>
              <option value="ALU">African Leadership University (ALU)</option>
              <option value="AUCA">Adventist University of Central Africa (AUCA)</option>
              <option value="UR">University of Rwanda</option>
              <option value="Other">Other</option>
            </select>
          </Field>

          <Field label="Are you currently enrolled as a student?">
            <select style={s.select} value={form.enrolled} onChange={e => set('enrolled', e.target.value)}>
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </Field>

          {/* ── SECTION B ── */}
          <div style={s.divider} />
          <p style={s.sectionLabel}>Section B — Daily Smartphone Usage</p>
          <p style={s.helper}>
            Over the past two weeks, how many hours per day do you spend on each type of app?
          </p>

          <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.55', marginBottom: '16px' }}>
            Think about yesterday specifically — not an average day. A typical lecture is 1.5 hours. A typical meal is 30 minutes. Use those as reference points when estimating your usage below.
          </p>

          {APP_ROWS.map(app => (
            <div key={app.key} style={s.appRow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                <span style={s.appIcon}>{app.icon}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#2E4057' }}>
                    {app.name} *
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{app.sub}</div>
                </div>
              </div>
              <select
                style={{ ...s.select, width: 'auto', minWidth: '108px' }}
                value={form[app.key]}
                onChange={e => set(app.key, e.target.value)}
              >
                {HOURS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          ))}

          <div style={{ marginTop: '20px' }}>
            <p style={s.fieldLabel}>How often do you check your phone?</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.55', marginTop: '4px', marginBottom: '0' }}>
              Include times you pick it up just to look, even without a specific reason.
            </p>
            <RadioGroup
              options={[
                { value: '<20',   label: 'Occasionally — only when I need something' },
                { value: '20-49', label: 'Regularly — I check it throughout the day' },
                { value: '50-79', label: 'Constantly — even when I am not expecting anything' },
                { value: '80+',   label: 'I cannot go more than a few minutes without checking' },
              ]}
              value={form.unlockFreq}
              onChange={v => set('unlockFreq', v)}
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <p style={s.fieldLabel}>Do you regularly use your smartphone after 11 pm?</p>
            <RadioGroup
              options={[
                { value: 'yes',       label: 'Yes, most nights' },
                { value: 'sometimes', label: 'Sometimes' },
                { value: 'rarely',    label: 'Rarely or never' },
              ]}
              value={form.lateNight}
              onChange={v => set('lateNight', v)}
            />
          </div>

          {/* ── SECTION C ── */}
          <div style={s.divider} />
          <p style={s.sectionLabel}>Section C — Smartphone Addiction Scale (SAS-SV)</p>
          <p style={s.helper}>
            For each statement below, select the number that best describes how much you agree.{' '}
            <strong>1 = Strongly disagree, 6 = Strongly agree</strong>
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>
            <span>Strongly disagree</span>
            <span>Strongly agree</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {SAS_QUESTIONS.map((q, i) => (
              <div key={q.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '9px 8px',
                borderRadius: '4px',
                background: i % 2 === 0 ? '#fafafa' : '#fff',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    color: '#6b7280',
                    background: '#f3f4f6',
                    padding: '2px 5px',
                    borderRadius: '3px',
                    flexShrink: 0,
                    marginTop: '2px',
                    letterSpacing: '0.3px',
                  }}>
                    {q.id}
                  </span>
                  <span style={{ fontSize: '13px', color: '#374151', lineHeight: '1.4' }}>{q.text}</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <label key={n} style={{ cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name={q.id}
                        value={n}
                        checked={form[q.id] === String(n)}
                        onChange={() => set(q.id, String(n))}
                        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                      />
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: `2px solid ${form[q.id] === String(n) ? '#1B6CA8' : '#d1d5db'}`,
                        background: form[q.id] === String(n) ? '#1B6CA8' : '#fff',
                        color: form[q.id] === String(n) ? '#fff' : '#9ca3af',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '600',
                      }}>
                        {n}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '6px',
              color: '#991b1b',
              fontSize: '13px',
            }}>
              {error}
            </div>
          )}

          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '20px', textAlign: 'center', lineHeight: '1.5' }}>
            By submitting you confirm you have read the consent information and agreed to share your answers anonymously.
          </p>

          <button type="submit" disabled={loading} style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Analysing your results…' : 'Get my results →'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>{label}</label>
      {children}
    </div>
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
    border: '1px dashed #1B6CA8',
    borderRadius: '6px',
    padding: '24px',
    width: '100%',
    maxWidth: '560px',
    height: 'fit-content',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#2E4057',
    marginBottom: '8px',
    lineHeight: '1.3',
  },
  subtitle: {
    fontSize: '13px',
    color: '#6b7280',
    lineHeight: '1.55',
    marginBottom: '4px',
  },
  divider: {
    borderTop: '1px dashed #1B6CA8',
    margin: '24px 0 16px',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#1B6CA8',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  helper: {
    fontSize: '13px',
    color: '#6b7280',
    lineHeight: '1.55',
    marginBottom: '16px',
  },
  fieldLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0',
  },
  select: {
    width: '100%',
    padding: '8px 30px 8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    background: `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`,
    fontSize: '14px',
    color: '#2E4057',
    appearance: 'none',
    cursor: 'pointer',
  },
  appRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  appIcon: {
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#eff6ff',
    borderRadius: '7px',
    fontSize: '17px',
    flexShrink: 0,
  },
  submitBtn: {
    width: '100%',
    padding: '13px',
    background: '#2E4057',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    fontFamily: 'inherit',
    letterSpacing: '0.2px',
  },
}
