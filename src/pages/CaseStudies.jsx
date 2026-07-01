import { motion } from 'framer-motion'
import { Trophy, Shield, TrendingUp } from 'lucide-react'
import PageLayout from './PageLayout'

const cases = [
    {
        title: 'Fintech Platform — Critical Authentication Bypass',
        industry: 'Financial Services',
        desc: 'Discovered SQL injection and broken authentication vulnerabilities that could have compromised 200K+ customer records. Full remediation completed in 5 days.',
        results: ['23 critical vulnerabilities found', '200K+ records protected', '5-day turnaround'],
    },
    {
        title: 'SaaS Provider — AWS Infrastructure Overhaul',
        industry: 'Cloud / SaaS',
        desc: 'Comprehensive AWS security assessment revealing 47 IAM misconfigurations, exposed S3 buckets, and missing encryption. Full hardening roadmap delivered.',
        results: ['47 misconfigs identified', '85% risk reduction achieved', '48-hour setup completed'],
    },
    {
        title: 'Healthcare Network — SOC Implementation',
        industry: 'Healthcare',
        desc: 'Built and deployed a 24/7 SOC from scratch including SIEM, log aggregation, alert triage workflows, and incident response playbooks.',
        results: ['MTTD reduced to <5 min', 'MTTR reduced to <15 min', 'HIPAA compliance achieved'],
    },
    {
        title: 'E-Commerce — Red Team Engagement',
        industry: 'E-Commerce',
        desc: 'Full adversary simulation combining social engineering, network penetration, and web application exploitation. Identified a critical supply chain attack path.',
        results: ['APT-style attack simulated', 'Supply chain risk identified', 'Zero false positives'],
    },
]

export default function CaseStudies() {
    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Trophy size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Case Studies</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                        Real Results, <span className="gradient-text">Real Impact</span>
                    </h1>
                    <p className="max-w-2xl mb-12 text-base" style={{ color: 'var(--color-text-soft)' }}>
                        How we've helped organizations identify and eliminate critical security risks.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {cases.map((c, i) => (
                            <motion.div
                                key={c.title}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="glass rounded-2xl p-6 transition-all hover:shadow-lg"
                            >
                                <span className="px-2 py-0.5 rounded text-xs font-semibold mb-3 inline-block"
                                    style={{ background: '#EA580C15', color: '#EA580C' }}>{c.industry}</span>
                                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text)' }}>{c.title}</h3>
                                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-soft)' }}>{c.desc}</p>
                                <ul className="space-y-1.5">
                                    {c.results.map((r) => (
                                        <li key={r} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-soft)' }}>
                                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#EA580C' }} />
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
