import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
    { label: 'Services', href: '#services', hasDropdown: true },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Process', href: '#process' },
    { label: 'Reports', href: '#reports' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
]

const serviceDropdown = [
    'Web Application VAPT', 'Mobile App VAPT', 'API Security Testing',
    'Cloud Security', 'Network Pentest', 'Red Team Assessment',
    'ISO 27001 Readiness', 'SOC2 Readiness', 'PCI DSS Assessment'
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-3 group">
                    <div className="relative w-9 h-9">
                        <div className="absolute inset-0 btn-primary rounded-lg opacity-25 group-hover:opacity-40 transition-opacity blur-sm" />
                        <div className="relative w-9 h-9 btn-primary rounded-lg flex items-center justify-center">
                            <Shield size={18} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--color-text)' }}>CipherGuard</span>
                        <span className="text-xs block leading-none -mt-0.5 tracking-widest uppercase" style={{ color: 'var(--color-primary-deep)' }}>Security</span>
                    </div>
                </a>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <div key={link.label} className="relative group">
                            {link.hasDropdown ? (
                                <button
                                    className="flex items-center gap-1 px-4 py-2 text-sm transition-colors rounded-lg hover:bg-[rgba(234,88,12,0.08)]"
                                    style={{ color: 'var(--color-text-soft)' }}
                                    onMouseEnter={() => setDropdownOpen(true)}
                                    onMouseLeave={() => setDropdownOpen(false)}
                                >
                                    {link.label}
                                    <ChevronDown size={14} className="transition-transform group-hover:rotate-180" style={{ color: 'var(--color-primary)' }} />
                                </button>
                            ) : (
                                <a
                                    href={link.href}
                                    className="px-4 py-2 text-sm transition-colors rounded-lg hover:bg-[rgba(234,88,12,0.08)] block"
                                    style={{ color: 'var(--color-text-soft)' }}
                                    onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-deep)'}
                                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-soft)'}
                                >
                                    {link.label}
                                </a>
                            )}

                            {link.hasDropdown && (
                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-xl p-2"
                                            onMouseEnter={() => setDropdownOpen(true)}
                                            onMouseLeave={() => setDropdownOpen(false)}
                                        >
                                            {serviceDropdown.map((s) => (
                                                <a
                                                    key={s}
                                                    href="#services"
                                                    className="block px-3 py-2 text-sm rounded-lg transition-colors hover:bg-[rgba(234,88,12,0.08)]"
                                                    style={{ color: 'var(--color-text-soft)' }}
                                                >
                                                    {s}
                                                </a>
                                            ))}
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
                        className="px-4 py-2 text-sm transition-colors"
                        style={{ color: 'var(--color-text-soft)' }}
                    >
                        Get in Touch
                    </a>
                    <a
                        href="#contact"
                        className="relative px-5 py-2.5 text-sm font-semibold rounded-xl overflow-hidden text-white btn-primary"
                    >
                        <span className="relative">Book Consultation</span>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden transition-colors"
                    style={{ color: 'var(--color-text)' }}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
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
                        className="lg:hidden glass-strong border-t overflow-hidden"
                        style={{ borderColor: 'var(--color-border)' }}
                    >
                        <div className="px-5 sm:px-6 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="block px-4 py-3 rounded-xl transition-colors hover:bg-[rgba(234,88,12,0.08)]"
                                    style={{ color: 'var(--color-text)' }}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                <a
                                    href="#contact"
                                    className="block w-full text-center px-5 py-3 btn-primary rounded-xl text-white font-semibold"
                                    onClick={() => setMobileOpen(false)}
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
