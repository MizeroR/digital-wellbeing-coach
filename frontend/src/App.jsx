import { useState } from 'react'
import NavBar from './components/NavBar'
import ConsentScreen from './screens/ConsentScreen'
import AssessmentForm from './screens/AssessmentForm'
import ResultsDashboard from './screens/ResultsDashboard'
import ResourceLibrary from './screens/ResourceLibrary'

export default function App() {
  const [screen, setScreen] = useState('consent')
  const [results, setResults] = useState(null)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <NavBar />
      <main style={{ flex: 1 }}>
        {screen === 'consent' && (
          <ConsentScreen
            onConsent={() => setScreen('form')}
            onDecline={() => setScreen('declined')}
          />
        )}
        {screen === 'declined' && (
          <div style={{ minHeight: 'calc(100vh - 52px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
              <p style={{ fontSize: '32px', marginBottom: '16px' }}>🙏</p>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#2E4057', marginBottom: '10px' }}>
                Thank you for your time
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>
                Your decision not to participate is completely respected.
                You may close this tab at any time.
              </p>
              <button
                style={{ fontSize: '13px', color: '#1B6CA8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}
                onClick={() => setScreen('consent')}
              >
                Go back to consent form
              </button>
            </div>
          </div>
        )}
        {screen === 'form' && (
          <AssessmentForm
            onResults={data => {
              setResults(data)
              setScreen('results')
            }}
          />
        )}
        {screen === 'results' && results && (
          <ResultsDashboard
            results={results}
            onViewLibrary={() => setScreen('library')}
            onBack={() => setScreen('form')}
          />
        )}
        {screen === 'library' && (
          <ResourceLibrary
            recommendations={results?.recommendations || []}
            onBack={() => setScreen('results')}
          />
        )}
      </main>
    </div>
  )
}
