import { motion } from 'framer-motion'
import { Briefcase, MapPin, Zap } from 'lucide-react'
import PageLayout from './PageLayout'

const openings = [
    { title: 'Senior Penetration Tester', location: 'Remote', type: 'Full-time', desc: 'Lead web, network, and API penetration testing engagements. OSCP or equivalent required. 5+ years experience.' },
    { title: 'SOC Analyst (L2/L3)', location: 'Remote', type: 'Full-time', desc: 'Monitor SIEM alerts, perform threat hunting, and lead incident response. Splunk or Elastic certified preferred.' },
    { title: 'Cloud Security Engineer', location: 'Remote', type: 'Full-time', desc: 'AWS/Azure/GCP security assessments, CSPM implementation, and DevSecOps pipeline integration.' },
    { title: 'Red Team Operator', role: 'Remote', type: 'Contract', desc: 'Full adversary simulation engagements. MITRE ATT&CK expertise and C2 experience required.' },
]

export default function Careers() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Briefcase size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Careers</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                        Join Our <span className="gradient-text">Security Team</span>
                    </h1>
                    <p className="max-w-2xl mb-12 text-base" style={{ color: 'var(--color-text-soft)' }}>
                        We're always looking for talented security professionals. Remote-first, competitive pay, and meaningful work protecting businesses worldwide.
                    </p>

                    <div className="space-y-4">
                        {openings.map((job, i) => (
                            <motion.div
                                key={job.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="glass rounded-2xl p-6 transition-all hover:shadow-lg"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                    <h3 className="font-semibold text-lg" style={{ color: 'var(--color-text)' }}>{job.title}</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-soft)' }}>
                                            <MapPin size={12} /> {job.location}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                                            style={{ background: '#EA580C15', color: '#EA580C' }}>
                                            <Zap size={10} /> {job.type}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-soft)' }}>{job.desc}</p>
                                <a href="mailto:careers@evolutesec.io" className="text-sm font-semibold" style={{ color: '#EA580C' }}>
                                    Apply →
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    <div className="glass rounded-2xl p-8 mt-8 text-center">
                        <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text)' }}>Don't see your role?</h3>
                        <p className="text-sm mb-4" style={{ color: 'var(--color-text-soft)' }}>
                            We're always open to hearing from exceptional security talent. Send your resume to careers@evolutesec.io.
                        </p>
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
