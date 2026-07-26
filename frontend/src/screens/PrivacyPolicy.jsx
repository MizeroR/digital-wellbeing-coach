import { Link } from 'react-router-dom'

function Eyebrow({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', marginBottom: 6 }}>
      {children}
    </div>
  )
}

function NumberedItem({ n, children }) {
  return (
    <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 10, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--color-accent-light)', color: 'var(--color-accent)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {n}
      </div>
      <p style={{ fontSize: 14, color: 'var(--color-text-primary)', margin: 0 }}>{children}</p>
    </div>
  )
}

export default function PrivacyPolicy() {
  return (
    <div className="fade-in" style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px 96px' }}>
      <Link to="/" style={{ fontSize: 13, color: 'var(--color-text-tertiary)', textDecoration: 'none' }}>
        ← Back to home
      </Link>

      <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)', margin: '16px 0 6px' }}>
        Privacy policy and terms of use
      </h1>
      <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', margin: '0 0 24px' }}>
        How Digital Wellbeing Coach handles your data, and what this tool is (and isn't).
      </p>
      <div style={{ borderBottom: '1px solid var(--color-border)', marginBottom: 24 }} />

      <div style={{ display: 'inline-block', background: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 999, marginBottom: 32 }}>
        Research pilot, not a commercial product
      </div>

      <section style={{ marginBottom: 28 }}>
        <Eyebrow>What this is</Eyebrow>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>A research tool, not a diagnosis</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Digital Wellbeing Coach is a final-year capstone project at African Leadership University, built to help
          students in Kigali understand patterns in their smartphone use. It is a research prototype, not a licensed
          medical device, and does not diagnose any condition. This project operates under ethical clearance from
          ALU's Research Ethics Committee, Approval Code M26-BSE-001.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <Eyebrow>What we collect</Eyebrow>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 10px' }}>Your data, specifically</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <NumberedItem n={1}>Your answers to the 10 SAS-SV questions about your smartphone habits.</NumberedItem>
          <NumberedItem n={2}>Basic demographics: age, gender, and university.</NumberedItem>
          <NumberedItem n={3}>General usage descriptors, like roughly how many hours a day you're on your phone.</NumberedItem>
        </div>
        <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', margin: '10px 2px 0' }}>
          We do not collect your name, email address, phone number, or any other direct identifier.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <Eyebrow>Why we collect it</Eyebrow>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>How your answers are used</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Your responses calculate your risk score and the recommendations on your results page. In fully anonymised,
          aggregate form, they also contribute to pilot findings shared with the Rwanda Biomedical Centre to help
          inform digital wellbeing support for Rwandan students more broadly. Your individual answers are never
          shared outside the research team.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <Eyebrow>How it's protected</Eyebrow>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>Keeping your answers anonymous</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Your session isn't linked to your name or any identifying detail. Database access is restricted through
          row-level security, and the research team accesses records through a controlled key rather than open access.
        </p>
      </section>

      <section style={{ marginBottom: 28, background: 'var(--color-accent-light)', borderRadius: 10, padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: 6 }}>
          A tradeoff worth knowing
        </div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>Anonymity means we can't follow up</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-primary)', lineHeight: 1.6, margin: 0 }}>
          Because your assessment isn't linked to anything that identifies you, a Severe result can't be followed up
          on directly. That's a deliberate choice: anonymity is part of what makes it safe to answer honestly. It
          also means the responsibility to seek support sits with you, which is why every result page points to real,
          locally available help.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <Eyebrow>Your rights</Eyebrow>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 10px' }}>What you're entitled to</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <NumberedItem n={1}>Taking part is entirely voluntary. No reward is offered for participating.</NumberedItem>
          <NumberedItem n={2}>You can stop at any point before submitting. Nothing saves until you finish.</NumberedItem>
          <NumberedItem n={3}>You can ask questions about this research at any time.</NumberedItem>
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <Eyebrow>Retention</Eyebrow>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>How long we keep it</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Individual assessment records are retained only through the end of the REC approval period
            (11 December 2026), after which they are deleted from the production database. Aggregate,
            anonymised statistics derived from the pilot may be retained indefinitely for academic and
            research reporting purposes.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <Eyebrow>Not a medical tool</Eyebrow>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>This isn't a substitute for professional help</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Digital Wellbeing Coach doesn't diagnose smartphone addiction and isn't a replacement for advice from a
          qualified professional. If your result is High or Severe, please reach out to a real support service,
          starting with Rwanda's Mental Health Help Line (116) or the resources on your results page.
        </p>
      </section>

      <section>
        <Eyebrow>Questions</Eyebrow>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>Contact</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          This project is developed by Reine Mizero at African Leadership University under REC
          Approval Code M26-BSE-001. For questions about how your data is handled, contact
          r.mizero@alustudent.com.
        </p>
      </section>
    </div>
  )
}