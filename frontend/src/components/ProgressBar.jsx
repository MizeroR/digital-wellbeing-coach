const STEPS = ['Consent', 'Your profile', 'Screen behaviour', 'SAS-SV questions', 'Results']

export default function ProgressBar({ currentStep }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px', overflowX: 'auto' }}>
      {STEPS.map((label, i) => {
        const step = i + 1
        const isActive = step === currentStep
        const isDone = step < currentStep
        const labelColor = isActive ? '#1B6CA8' : isDone ? '#2E4057' : '#9ca3af'
        const labelWeight = isActive ? '600' : '400'
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: isDone || isActive ? '#1B6CA8' : '#e5e7eb',
                color: isDone || isActive ? '#fff' : '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: '700',
                flexShrink: 0,
              }}>
                {isDone ? '✓' : step}
              </div>
              <span
                className="step-label-full"
                style={{
                  fontSize: '10px',
                  color: labelColor,
                  fontWeight: labelWeight,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  maxWidth: '64px',
                  lineHeight: '1.2',
                }}
              >
                {label}
              </span>
              <span
                className="step-label-short"
                style={{
                  fontSize: '10px',
                  color: labelColor,
                  fontWeight: labelWeight,
                  textAlign: 'center',
                  lineHeight: '1.2',
                  padding: '3px 8px',
                }}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                height: '1px',
                background: isDone ? '#1B6CA8' : '#e5e7eb',
                flex: 1,
                marginBottom: '18px',
                flexShrink: 0,
                minWidth: '8px',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
