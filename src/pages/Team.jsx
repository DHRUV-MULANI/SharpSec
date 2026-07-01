import { motion } from 'framer-motion'
import { Shield, Users } from 'lucide-react'
import PageLayout from './PageLayout'

const team = [
    { name: 'Lead Pentester', role: 'OSCP, CREST CRT', desc: '7+ years in offensive security. Specializes in web application and network penetration testing.' },
    { name: 'Senior Security Engineer', role: 'CISSP, CCSP', desc: 'Cloud security architect with deep expertise in AWS, Azure, and GCP posture management.' },
    { name: 'Red Team Lead', role: 'OSCP, CEH', desc: 'Full-spectrum adversary simulation expert. MITRE ATT&CK and C2 operations specialist.' },
    { name: 'Compliance Consultant', role: 'CISSP, ISO 27001 LA', desc: 'Helps organizations achieve and maintain ISO 27001, SOC 2, PCI DSS compliance.' },
    { name: 'SOC Analyst Lead', role: 'CEH, Splunk Certified', desc: '24/7 SOC operations lead with expertise in SIEM, threat hunting, and incident response.' },
    { name: 'API Security Specialist', role: 'OSCP, Burp Certified', desc: 'Deep expertise in REST, GraphQL, and microservice security testing.' },
]

export default function Team() {
    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Users size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Our Team</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                        Meet Our <span className="gradient-text">Security Experts</span>
                    </h1>
                    <p className="max-w-2xl mb-12 text-base" style={{ color: 'var(--color-text-soft)' }}>
                        Every engagement is staffed by certified senior engineers. No juniors, no outsourcing.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="glass rounded-2xl p-6 group transition-all hover:shadow-lg"
                            >
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                                    style={{ background: '#EA580C18', border: '1px solid #EA580C30' }}>
                                    <Shield size={24} style={{ color: '#EA580C' }} />
                                </div>
                                <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--color-text)' }}>{member.name}</h3>
                                <p className="text-xs font-semibold mb-3" style={{ color: '#B45309' }}>{member.role}</p>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>{member.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
