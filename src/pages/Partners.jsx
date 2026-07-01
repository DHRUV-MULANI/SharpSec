import { motion } from 'framer-motion'
import { Handshake } from 'lucide-react'
import PageLayout from './PageLayout'

const partners = [
    { name: 'OWASP', desc: 'Open Web Application Security Project — we follow and contribute to OWASP standards in all our assessments.' },
    { name: 'MITRE', desc: 'MITRE ATT&CK framework — our red team operations are fully mapped to ATT&CK techniques for comprehensive coverage.' },
    { name: 'CIS', desc: 'Center for Internet Security — we use CIS Benchmarks for hardening and CIS Controls for compliance assessments.' },
    { name: 'NIST', desc: 'National Institute of Standards and Technology — our methodology aligns with NIST Cybersecurity Framework.' },
]

export default function Partners() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Handshake size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Partners</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                        Our <span className="gradient-text">Technology Partners</span>
                    </h1>
                    <p className="max-w-2xl mb-12 text-base" style={{ color: 'var(--color-text-soft)' }}>
                        We work alongside industry-leading security organizations to deliver the best outcomes for our clients.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {partners.map((p, i) => (
                            <motion.div
                                key={p.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="glass rounded-2xl p-6 transition-all hover:shadow-lg"
                            >
                                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text)' }}>{p.name}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
