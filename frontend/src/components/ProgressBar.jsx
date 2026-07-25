const STEPS = ['Consent', 'Your profile', 'Screen behaviour', 'Habit questions', 'Results']

export default function ProgressBar({ currentStep }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px', overflowX: 'auto' }}>
      {STEPS.map((label, i) => {
        const step = i + 1
        const isActive = step === currentStep
        const isDone = step < currentStep
        const labelColor = isActive ? '#2563EB' : isDone ? '#1E293B' : '#94A3B8'
        const labelWeight = isActive ? '600' : '400'
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: isDone || isActive ? '#2563EB' : '#E2E8F0',
                color: isDone || isActive ? '#FFFFFF' : '#94A3B8',
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
                background: isDone ? '#2563EB' : '#E2E8F0',
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
