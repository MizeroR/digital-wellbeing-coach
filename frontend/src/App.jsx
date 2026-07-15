import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import ScrollToTop from './components/ScrollToTop'
import LandingPage from './screens/LandingPage'
import ConsentScreen from './screens/ConsentScreen'
import AssessmentForm from './screens/AssessmentForm'
import ResultsDashboard from './screens/ResultsDashboard'
import ResourceLibrary from './screens/ResourceLibrary'
import EducationPage from './screens/interventions/EducationPage'
import CreativePage from './screens/interventions/CreativePage'
import RelaxationPage from './screens/interventions/RelaxationPage'
import SocialPage from './screens/interventions/SocialPage'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <NavBar />
        <ScrollToTop />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/consent" element={<ConsentScreen />} />
            <Route path="/assessment" element={<AssessmentForm />} />
            <Route path="/results" element={<ResultsDashboard />} />
            <Route path="/resources" element={<ResourceLibrary />} />
            <Route path="/interventions/education" element={<EducationPage />} />
            <Route path="/interventions/creative" element={<CreativePage />} />
            <Route path="/interventions/relaxation" element={<RelaxationPage />} />
            <Route path="/interventions/social" element={<SocialPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
