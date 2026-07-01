import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
    {
        label: 'Services',
        href: '#services',
        dropdown: [
            { label: 'Web Application VAPT', href: '#services' },
            { label: 'Mobile App VAPT', href: '#services' },
            { label: 'API Security Testing', href: '#services' },
            { label: 'Cloud Security', href: '#services' },
            { label: 'Red Team Assessment', href: '#services' },
            { label: 'Compliance (SOC 2, ISO)', href: '#services' }
        ]
    },
    {
        label: 'Company',
        href: '/about',
        dropdown: [
            { label: 'About Us', href: '/about' },
            { label: 'Our Team', href: '/team' },
            { label: 'Careers', href: '/careers' },
            { label: 'Partners', href: '/partners' }
        ]
    },
    {
        label: 'Resources',
        href: '/blog',
        dropdown: [
            { label: 'Security Blog', href: '/blog' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'Free Tools', href: '/tools' },
            { label: 'CVE Database', href: '/cve-database' }
        ]
    },
    {
        label: 'Reports',
        href: '/sample-reports',
        dropdown: [
            { label: 'Sample Reports', href: '/sample-reports' },
            { label: 'Request Audit', href: '#reports' }
        ]
    },
    { label: 'FAQ', href: '/faq' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    const scrollToSection = (href, behavior = 'smooth') => {
        const el = document.querySelector(href)
        if (!el) return false

        const y = el.getBoundingClientRect().top + window.scrollY - 96
        window.scrollTo({ top: Math.max(y, 0), behavior })
        return true
    }

    const scrollToSectionWhenReady = (href) => {
        const delays = [0, 150, 450, 900, 1400]
        const timers = delays.map((delay, index) => window.setTimeout(() => {
            scrollToSection(href, index === 0 ? 'smooth' : 'auto')
        }, delay))
        return () => timers.forEach(window.clearTimeout)
    }

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    useEffect(() => {
        const target = location.state?.scrollTo
        if (!target) return

        const timeout = window.setTimeout(() => {
            scrollToSectionWhenReady(target)
            navigate(location.pathname, { replace: true, state: null })
        }, 100)

        return () => window.clearTimeout(timeout)
    }, [location.pathname, location.state, navigate])

    const handleNavClick = (href) => {
        setMobileOpen(false)
        setActiveDropdown(null)
        
        if (href.startsWith('#')) {
            if (!scrollToSection(href)) {
                navigate('/', { state: { scrollTo: href } })
            }
        } else {
            navigate(href)
        }
    }

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong py-3 shadow-md' : 'py-5 bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group" onClick={() => { setMobileOpen(false); setActiveDropdown(null) }}>
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-[var(--color-primary)] opacity-40 animate-ping" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute inset-1 rounded-full border border-[var(--color-primary)] opacity-60 animate-spin" style={{ animationDuration: '8s' }}></div>
                        <div className="absolute inset-2 rounded-full border-2 border-[var(--color-primary-deep)] animate-spin-reverse" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
                        <div className="absolute w-2 h-2 rounded-full bg-[var(--color-primary)]"></div>
                    </div>
                    <div>
                        <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--color-text)' }}>EvoluteSec</span>
                        <span className="text-xs block leading-none -mt-0.5 tracking-widest uppercase" style={{ color: 'var(--color-primary-deep)' }}>Security</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-2">
                    {navLinks.map((link, idx) => (
                        <div 
                            key={link.label} 
                            className="relative group"
                            onMouseEnter={() => setActiveDropdown(idx)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            {link.dropdown ? (
                                <a
                                    href={link.href}
                                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all rounded-xl hover:bg-[rgba(234,88,12,0.1)] hover:text-[var(--color-primary)] cursor-pointer"
                                    style={{ color: 'var(--color-text-soft)' }}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                                >
                                    {link.label}
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === idx ? 'rotate-180' : ''}`} style={{ color: 'var(--color-primary)' }} />
                                </a>
                            ) : (
                                <a
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium transition-all rounded-xl hover:bg-[rgba(234,88,12,0.1)] hover:text-[var(--color-primary)] block cursor-pointer"
                                    style={{ color: 'var(--color-text-soft)' }}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                                >
                                    {link.label}
                                </a>
                            )}

                            {link.dropdown && (
                                <AnimatePresence>
                                    {activeDropdown === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-xl p-3 shadow-xl border border-[var(--color-border)]"
                                        >
                                            <div className="flex flex-col gap-1">
                                                {link.dropdown.map((sublink) => (
                                                    <a
                                                        key={sublink.label}
                                                        href={sublink.href}
                                                        onClick={(e) => { e.preventDefault(); handleNavClick(sublink.href) }}
                                                        className="block w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors hover:bg-[rgba(234,88,12,0.08)] hover:text-[var(--color-primary)] font-medium"
                                                        style={{ color: 'var(--color-text-soft)' }}
                                                    >
                                                        {sublink.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                        className="px-4 py-2 text-sm font-medium transition-colors hover:text-[var(--color-primary)]"
                        style={{ color: 'var(--color-text-soft)' }}
                    >
                        Get in Touch
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                        className="relative px-5 py-2.5 text-sm font-semibold rounded-xl overflow-hidden text-white btn-primary inline-block text-center shadow-lg hover:shadow-xl transition-shadow"
                    >
                        Book Consultation
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden transition-colors p-2 -mr-2 rounded-lg hover:bg-[rgba(234,88,12,0.1)]"
                    style={{ color: 'var(--color-text)' }}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-navigation"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        id="mobile-navigation"
                        className="lg:hidden glass-strong border-t overflow-hidden shadow-2xl"
                        style={{ borderColor: 'var(--color-border)' }}
                    >
                        <div className="px-5 sm:px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
                            {navLinks.map((link, idx) => (
                                <div key={link.label} className="space-y-2">
                                    <div 
                                        className="flex items-center justify-between px-2 py-1 cursor-pointer"
                                        onClick={() => { 
                                            if (link.dropdown) {
                                                setActiveDropdown(activeDropdown === idx ? null : idx)
                                            } else {
                                                handleNavClick(link.href)
                                            }
                                        }}
                                    >
                                        <span className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>{link.label}</span>
                                        {link.dropdown && (
                                            <ChevronDown size={18} className={`transition-transform duration-300 ${activeDropdown === idx ? 'rotate-180' : ''}`} style={{ color: 'var(--color-primary)' }} />
                                        )}
                                    </div>
                                    
                                    {/* Mobile Dropdown items */}
                                    {link.dropdown && activeDropdown === idx && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="pl-4 space-y-1 border-l-2 ml-2"
                                            style={{ borderColor: 'var(--color-border)' }}
                                        >
                                            {link.dropdown.map(sublink => (
                                                <a
                                                    key={sublink.label}
                                                    href={sublink.href}
                                                    onClick={(e) => { e.preventDefault(); handleNavClick(sublink.href) }}
                                                    className="block w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium hover:text-[var(--color-primary)] hover:bg-[rgba(234,88,12,0.05)]"
                                                    style={{ color: 'var(--color-text-soft)' }}
                                                >
                                                    {sublink.label}
                                                </a>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-6 mt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                <a
                                    href="#contact"
                                    onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                                    className="block w-full text-center px-5 py-4 btn-primary rounded-xl text-white font-bold text-lg shadow-lg"
                                >
                                    Book Free Consultation
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
