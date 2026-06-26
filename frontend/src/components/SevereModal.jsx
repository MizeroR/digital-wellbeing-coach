export default function SevereModal({ onConfirm }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '32px 28px',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{
          width: '52px',
          height: '52px',
          background: '#fee2e2',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '26px',
        }}>
          ⚠️
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#991b1b', marginBottom: '12px' }}>
          Important notice
        </h2>

        <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.65', marginBottom: '14px' }}>
          Based on your answers, your usage pattern shows signs of{' '}
          <strong>severe dependency</strong>. This tool is not a substitute for professional help.
        </p>

        <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.65', marginBottom: '24px' }}>
          Please consider reaching out:<br />
          <strong>Rwanda Mental Health Help Line: 116</strong> (free, 24/7)<br />
          <strong>Ndera Hospital:</strong> +250 781 447 928
        </p>

        <button
          onClick={onConfirm}
          style={{
            background: '#1B6CA8',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '11px 24px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            fontFamily: 'inherit',
          }}
        >
          I understand
        </button>
      </div>
    </div>
  )
}
