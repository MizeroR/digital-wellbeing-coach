export default function ExplanationCard({ number, text }) {
  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      padding: '14px',
      background: '#F8FAFC',
      borderRadius: '8px',
      border: '1px solid #E2E8F0',
    }}>
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: '#EFF6FF',
        color: '#2563EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: '700',
        flexShrink: 0,
      }}>
        {number}
      </div>
      <p style={{ margin: 0, fontSize: '14px', color: '#1E293B', lineHeight: '1.55' }}>{text}</p>
    </div>
  )
}
