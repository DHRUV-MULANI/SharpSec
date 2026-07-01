import { useState, useEffect, lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'
import AttackSimulation from './components/AttackSimulation'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Reports from './components/Reports'
import Dashboard from './components/Dashboard'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import DownloadModal from './components/DownloadModal'

// Pages
import About from './pages/About'
import Team from './pages/Team'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import CaseStudies from './pages/CaseStudies'
import Partners from './pages/Partners'
import SampleReports from './pages/SampleReports'
import CVEDatabase from './pages/CVEDatabase'
import ToolsAndScripts from './pages/ToolsAndScripts'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import ResponsibleDisclosure from './pages/ResponsibleDisclosure'
import FAQPage from './pages/FAQ'

export default function App() {
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <HashRouter>
      <Routes>
        {/* ─── Separate Pages ─── */}
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/sample-reports" element={<SampleReports />} />
        <Route path="/cve-database" element={<CVEDatabase />} />
        <Route path="/tools" element={<ToolsAndScripts />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/responsible-disclosure" element={<ResponsibleDisclosure />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* ─── Home Page (Landing) ─── */}
        <Route path="*" element={
          <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
            


            <ScrollProgress />
            <div className="relative z-10">
              <Navbar />
            </div>
            <main className="relative z-10">
              <Hero onDownloadReport={() => setShowDownloadModal(true)} />
              <TrustedBy />
              <Services />
              <AttackSimulation />
              <WhyUs />
              <Process />
              <Reports onDownloadReport={() => setShowDownloadModal(true)} />
              <Dashboard />
              <FAQ />
              <CTA onDownloadReport={() => setShowDownloadModal(true)} />
              <ContactForm />
            </main>
            <Footer />
            <AnimatePresence>
              {showDownloadModal && (
                <DownloadModal onClose={() => setShowDownloadModal(false)} />
              )}
            </AnimatePresence>
          </div>
        } />
      </Routes>
    </HashRouter>
  )
}
