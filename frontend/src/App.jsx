import { useState } from 'react'
import NavBar from './components/NavBar'
import AssessmentForm from './screens/AssessmentForm'
import ResultsDashboard from './screens/ResultsDashboard'
import ResourceLibrary from './screens/ResourceLibrary'

export default function App() {
  const [screen, setScreen] = useState('form')
  const [results, setResults] = useState(null)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
      <NavBar />
      <main style={{ flex: 1 }}>
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
