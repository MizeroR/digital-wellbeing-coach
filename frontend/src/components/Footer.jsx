import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', padding: '20px 24px', textAlign: 'center' }}>
      <Link to="/privacy" style={{ fontSize: 13, color: 'var(--color-text-tertiary)', textDecoration: 'none' }}>
        Privacy Policy & Terms of Use
      </Link>
    </footer>
  )
}