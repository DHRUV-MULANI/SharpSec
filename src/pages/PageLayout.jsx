import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => { window.scrollTo(0, 0) }, [pathname])
    return null
}

export default function PageLayout({ children }) {
    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
            <ScrollToTop />
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
        </div>
    )
}
