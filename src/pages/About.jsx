import { motion } from 'framer-motion'
import { Shield, Target, Globe, Users } from 'lucide-react'
import PageLayout from './PageLayout'

export default function About() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Shield size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>About Us</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                        Protecting Businesses <span className="gradient-text">Since Day One</span>
                    </h1>
                    <div className="space-y-6 text-base leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>
                        <p>
                            EvoluteSec Security was founded with a single mission: to make enterprise-grade cybersecurity accessible to ambitious teams and growing businesses worldwide.
                        </p>
                        <p>
                            We are a remote-first team of certified security engineers, penetration testers, and compliance consultants. Our engineers hold OSCP, CREST, CEH, CISSP and CCSP certifications, bringing years of hands-on experience from both offensive security and defense.
                        </p>
                        <p>
                            Every engagement is led by senior engineers — not juniors learning on your systems. We combine manual expertise with industry-standard tooling to deliver thorough, actionable security assessments that drive real risk reduction.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="grid sm:grid-cols-2 gap-6 mt-12">
                        {[
                            { icon: Target, title: 'Mission-Driven', desc: 'We exist to close the gap between attacker capability and defender readiness.' },
                            { icon: Globe, title: 'Global Reach', desc: 'Remote-first team serving clients across industries and geographies worldwide.' },
                            { icon: Shield, title: 'Integrity First', desc: 'Transparent reporting, zero inflated findings, and honest risk assessments.' },
                            { icon: Users, title: 'Client Partnership', desc: 'We work alongside your team — from discovery to remediation and beyond.' },
                        ].map((v, i) => (
                            <div key={v.title} className="glass rounded-2xl p-6">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                    style={{ background: '#EA580C18', border: '1px solid #EA580C30' }}>
                                    <v.icon size={18} style={{ color: '#EA580C' }} />
                                </div>
                                <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{v.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
