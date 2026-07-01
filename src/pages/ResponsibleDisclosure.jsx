import { motion } from 'framer-motion'
import { Shield, Lock, AlertTriangle, Mail, ExternalLink } from 'lucide-react'
import PageLayout from './PageLayout'

export default function ResponsibleDisclosure() {
    return (
        <PageLayout>
            <div className="max-w-3xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <AlertTriangle size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Security</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                        Responsible <span className="gradient-text">Disclosure Policy</span>
                    </h1>
                    <p className="text-sm mb-12" style={{ color: 'var(--color-text-faint)' }}>Last updated: June 2025</p>

                    <div className="glass rounded-2xl p-6 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: '#EA580C18', border: '1px solid #EA580C30' }}>
                                <Mail size={18} style={{ color: '#EA580C' }} />
                            </div>
                            <div>
                                <h2 className="font-semibold" style={{ color: 'var(--color-text)' }}>Report a Vulnerability</h2>
                                <p className="text-sm" style={{ color: 'var(--color-text-soft)' }}>security@evolutesec.io</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>
                            We appreciate the efforts of security researchers who help keep our services secure. If you discover a vulnerability in any of our systems, please report it responsibly.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>What We Ask</h2>
                            <ul className="space-y-2">
                                {[
                                    'Report vulnerabilities to security@evolutesec.io before any public disclosure.',
                                    'Provide sufficient detail to reproduce the issue — steps, affected URLs, and proof-of-concept.',
                                    'Do not access, modify, or delete data belonging to other users.',
                                    'Do not degrade service performance or availability during testing.',
                                    'Do not use automated vulnerability scanners without prior authorization.',
                                    'Allow us reasonable time (90 days) to address the vulnerability before disclosure.',
                                ].map((item) => (
                                    <li key={item} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--color-text-soft)' }}>
                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#EA580C' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>What We Commit To</h2>
                            <ul className="space-y-2">
                                {[
                                    'Acknowledge receipt of your report within 48 hours.',
                                    'Keep you updated on remediation progress.',
                                    'Resolve confirmed vulnerabilities in a timely manner.',
                                    'Credit researchers in our security advisories (with consent).',
                                    'Not pursue legal action against researchers who follow this policy.',
                                ].map((item) => (
                                    <li key={item} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--color-text-soft)' }}>
                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#22C55E' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Out of Scope</h2>
                            <ul className="space-y-2">
                                {[
                                    'Social engineering attacks on our staff.',
                                    'Physical security breaches.',
                                    'Denial of service attacks.',
                                    'Third-party services and integrations (report directly to them).',
                                    'Issues already reported or publicly known.',
                                ].map((item) => (
                                    <li key={item} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--color-text-soft)' }}>
                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: 'var(--color-text-faint)' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Safe Harbor</h2>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>
                                If you follow this policy in good faith, EvoluteSec Security will not pursue legal action against you. We consider responsible disclosure activities as authorized testing and will treat researchers as partners in our security efforts.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
