export default function NavBar() {
  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 20px',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ fontSize: '15px', fontWeight: '700', color: '#2E4057', letterSpacing: '-0.3px' }}>
        Digital<span style={{ fontWeight: '400', color: '#1B6CA8' }}>WellbeingCoach</span>
      </div>
      <div style={{
        fontSize: '11px',
        color: '#6b7280',
        background: '#f3f4f6',
        padding: '3px 10px',
        borderRadius: '20px',
        border: '1px solid #e5e7eb',
      }}>
        Not a medical diagnosis
      </div>
    </nav>
  )
}
