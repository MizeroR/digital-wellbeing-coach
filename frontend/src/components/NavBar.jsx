export default function NavBar() {
  return (
    <nav style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      padding: '0 20px',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', letterSpacing: '-0.3px' }}>
        Digital<span style={{ fontWeight: '400', color: '#2563EB' }}>WellbeingCoach</span>
      </div>
      <div className="nav-badge" style={{
        fontSize: '11px', color: '#64748B', background: '#F1F5F9',
        padding: '3px 10px', borderRadius: '20px', border: '1px solid #E2E8F0',
        whiteSpace: 'nowrap',
      }}>
        This is not a medical tool
      </div>
    </nav>
  )
}
