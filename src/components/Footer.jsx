import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const LinkedinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const GithubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
)

const footerLinks = {
    Services: [
        { label: 'Web Application VAPT', to: '/#services' },
        { label: 'Mobile App VAPT', to: '/#services' },
        { label: 'API Security Testing', to: '/#services' },
        { label: 'Cloud Security', to: '/#services' },
        { label: 'Network Pentest', to: '/#services' },
        { label: 'Red Team Assessment', to: '/#services' },
        { label: 'ISO 27001', to: '/#services' },
        { label: 'SOC 2 Readiness', to: '/#services' },
        { label: 'PCI DSS Assessment', to: '/#services' },
    ],
    Company: [
        { label: 'About Us', to: '/about' },
        { label: 'Our Team', to: '/team' },
        { label: 'Careers', to: '/careers' },
        { label: 'Blog', to: '/blog' },
        { label: 'Case Studies', to: '/case-studies' },
        { label: 'Partners', to: '/partners' },
    ],
    Resources: [
        { label: 'Sample Reports', to: '/sample-reports' },
        { label: 'Security Blog', to: '/blog' },
        { label: 'CVE Database', to: '/cve-database' },
        { label: 'Tools & Scripts', to: '/tools' },
        { label: 'FAQ', to: '/faq' },
    ],
    Legal: [
        { label: 'Privacy Policy', to: '/privacy-policy' },
        { label: 'Terms of Service', to: '/terms-of-service' },
        { label: 'Cookie Policy', to: '/cookie-policy' },
        { label: 'Responsible Disclosure', to: '/responsible-disclosure' },
    ],
}

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-soft)', borderTop: '1px solid var(--color-border)' }}>
            <div className="absolute inset-0 cyber-grid opacity-20" />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 relative">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 btn-primary rounded-xl flex items-center justify-center">
                                <Shield size={20} className="text-white" />
                            </div>
                            <div>
                                <span className="font-bold text-xl" style={{ color: 'var(--color-text)' }}>EvoluteSec</span>
                                <span className="text-xs block leading-none tracking-widest uppercase" style={{ color: 'var(--color-primary-deep)' }}>Security</span>
                            </div>
                        </Link>

                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-soft)' }}>
                            Enterprise-grade cybersecurity assessments, VAPT, and compliance services
                            for ambitious teams and growing businesses.
                        </p>

                        {/* Contact */}
                        <div className="space-y-2">
                            {[
                                { icon: Mail, text: 'dhruvkumarmulani@gmail.com', href: 'mailto:dhruvkumarmulani@gmail.com' },
                                { icon: MapPin, text: 'Ahmedabad', href: null },
                            ].map((item) => (
                                <a
                                    key={item.text}
                                    href={item.href || '#'}
                                    className="flex items-center gap-2 transition-colors text-sm"
                                    style={{ color: 'var(--color-text-soft)' }}
                                >
                                    <item.icon size={14} style={{ color: 'var(--color-primary)' }} className="flex-shrink-0" />
                                    <span>{item.text}</span>
                                </a>
                            ))}
                        </div>

                        {/* Social */}
                        <div className="flex gap-3 mt-6">
                            {[
                                { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/dhruv-mulani-963x/', label: 'LinkedIn' },
                                { icon: GithubIcon, href: 'https://github.com/DHRUV-MULANI', label: 'GitHub' },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-9 h-9 glass rounded-lg flex items-center justify-center transition-all hover:shadow-md"
                                    style={{ color: 'var(--color-text-soft)' }}
                                >
                                    <s.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text)' }}>{category}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-sm transition-colors flex items-center gap-1 group"
                                            style={{ color: 'var(--color-text-soft)' }}
                                        >
                                            {link.label}
                                            <ArrowUpRight
                                                size={10}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5"
                                                style={{ color: 'var(--color-primary)' }}
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {['OSCP Certified', 'CREST Member', 'ISO 27001', 'PCI SSF', 'GDPR Compliant'].map((cert) => (
                        <div key={cert} className="px-3 py-1.5 glass rounded-lg text-xs font-medium" style={{ color: 'var(--color-text-soft)' }}>
                            {cert}
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <p className="text-sm" style={{ color: 'var(--color-text-faint)' }}>
                        © {year} EvoluteSec Security. All rights reserved.
                    </p>
                    <p className="text-xs text-center" style={{ color: 'var(--color-text-faint)' }}>
                        For educational and authorized security testing only. Unauthorized use prohibited.
                    </p>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: 'var(--color-primary)' }} />
                        <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
