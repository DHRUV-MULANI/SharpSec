import { useState, Suspense } from 'react'
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
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import DownloadModal from './components/DownloadModal'

export default function App() {
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  return (
    <div className="bg-[#030712] min-h-screen">
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero onDownloadReport={() => setShowDownloadModal(true)} />
        <TrustedBy />
        <Services />
        <AttackSimulation />
        <WhyUs />
        <Process />
        <Reports onDownloadReport={() => setShowDownloadModal(true)} />
        <Dashboard />
        <Testimonials />
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
  )
}
