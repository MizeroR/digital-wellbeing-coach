import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={s.page} className="fade-in">
      <div style={s.hero}>

        <div style={s.logoMark}>
          <span style={s.logoIcon}>📱</span>
          <span style={s.logoText}>Digital<span style={{ fontWeight: '400', color: '#1B6CA8' }}>WellbeingCoach</span></span>
        </div>

        <h1 style={s.headline}>Understand your<br />smartphone habits</h1>

        <p style={s.subtitle}>
          A free, anonymous 10-minute assessment for university students in Kigali.
          Get a personalised risk report instantly.
        </p>

        <div style={s.pills}>
          {['🔒 Anonymous', '⏱ 10 minutes', '⚡ Instant results'].map(p => (
            <span key={p} style={s.pill}>{p}</span>
          ))}
        </div>

        <button
          style={s.cta}
          onClick={() => navigate('/consent')}
          aria-label="Start the assessment"
        >
          Start assessment →
        </button>

        <p style={s.disclaimer}>
          This tool is not a medical diagnosis. For support call{' '}
          <strong>116</strong> (Rwanda Mental Health Helpline, free 24/7)
        </p>
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: 'calc(100vh - 52px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 20px',
    background: '#fff',
  },
  hero: {
    width: '100%',
    maxWidth: '540px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '0',
  },
  logoMark: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '36px',
  },
  logoIcon: {
    fontSize: '28px',
  },
  logoText: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#2E4057',
    letterSpacing: '-0.3px',
  },
  headline: {
    fontSize: '40px',
    fontWeight: '800',
    color: '#2E4057',
    lineHeight: '1.2',
    marginBottom: '16px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: '1.65',
    marginBottom: '28px',
    maxWidth: '420px',
  },
  pills: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  pill: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#1B6CA8',
    background: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '20px',
    padding: '6px 14px',
  },
  cta: {
    width: '100%',
    maxWidth: '320px',
    padding: '16px',
    background: '#2E4057',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.2px',
    marginBottom: '20px',
    transition: 'background 0.15s',
  },
  disclaimer: {
    fontSize: '12px',
    color: '#9ca3af',
    lineHeight: '1.55',
    maxWidth: '340px',
  },
}
