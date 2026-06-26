import { motion } from 'framer-motion'
import { Shield, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

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
        'Web Application VAPT', 'Mobile App VAPT', 'API Security Testing',
        'Cloud Security', 'Network Pentest', 'Red Team Assessment',
        'ISO 27001', 'SOC 2 Readiness', 'PCI DSS Assessment'
    ],
    Company: ['About Us', 'Our Team', 'Careers', 'Blog', 'Case Studies', 'Partners'],
    Resources: ['Sample Reports', 'Security Blog', 'CVE Database', 'Tools & Scripts', 'FAQ'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Responsible Disclosure'],
}

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-[#030712] border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-10" />

            <div className="max-w-7xl mx-auto px-6 py-16 relative">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
                    {/* Brand */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
                                <Shield size={20} className="text-white" />
                            </div>
                            <div>
                                <span className="text-white font-bold text-xl">CipherGuard</span>
                                <span className="text-xs text-cyan-400 block leading-none tracking-widest uppercase">Security</span>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Enterprise-grade cybersecurity assessments, VAPT, and compliance services
                            trusted by organizations worldwide.
                        </p>

                        {/* Contact */}
                        <div className="space-y-2">
                            {[
                                { icon: Mail, text: 'security@cipherguard.io', href: 'mailto:security@cipherguard.io' },
                                { icon: Phone, text: '+1 (555) 000-1234', href: 'tel:+15550001234' },
                                { icon: MapPin, text: 'San Francisco, CA & Remote', href: '#' },
                            ].map((item) => (
                                <a
                                    key={item.text}
                                    href={item.href}
                                    className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm"
                                >
                                    <item.icon size={14} className="text-cyan-400 flex-shrink-0" />
                                    {item.text}
                                </a>
                            ))}
                        </div>

                        {/* Social */}
                        <div className="flex gap-3 mt-6">
                            {[
                                { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                                { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/10 border border-transparent transition-all"
                                >
                                    <s.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-gray-500 hover:text-gray-300 text-sm transition-colors flex items-center gap-1 group"
                                        >
                                            {link}
                                            <ArrowUpRight
                                                size={10}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5"
                                            />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {['OSCP Certified', 'CREST Member', 'ISO 27001', 'PCI SSF', 'GDPR Compliant'].map((cert) => (
                        <div key={cert} className="px-3 py-1.5 glass rounded-lg text-xs text-gray-500 border border-white/5">
                            {cert}
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
                    <p className="text-gray-600 text-sm">
                        © {year} CipherGuard Security. All rights reserved.
                    </p>
                    <p className="text-gray-700 text-xs text-center">
                        For educational and authorized security testing only. Unauthorized use prohibited.
                    </p>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                        <span className="text-xs text-gray-600">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
