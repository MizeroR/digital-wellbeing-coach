export default function ExplanationCard({ number, text }) {
  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      padding: '14px',
      background: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
    }}>
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: '#1B6CA8',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: '700',
        flexShrink: 0,
      }}>
        {number}
      </div>
      <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: '1.55' }}>{text}</p>
    </div>
  )
}
