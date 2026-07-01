import { motion } from 'framer-motion'
import { useRef } from 'react'
import {
    Crosshair, Search, Bug, Zap, KeyRound, FileText,
    Globe, Code2, Network, ChevronRight, Shield,
    Terminal, Lock, CheckCircle, Server, Container
} from 'lucide-react'

const ORANGE = '#EA580C'
const RUST = '#B45309'
const AMBER = '#F59E0B'

const phases = [
    {
        icon: Crosshair, label: 'Scoping & Planning', color: ORANGE,
        desc: 'Define targets, rules of engagement, and testing boundaries with the client before any assessment begins.',
    },
    {
        icon: Search, label: 'Reconnaissance', color: RUST,
        desc: 'Passive and active information gathering — DNS, open ports, subdomains, technologies, and exposed assets.',
    },
    {
        icon: Bug, label: 'Vulnerability Assessment', color: AMBER,
        desc: 'Automated scanning combined with manual analysis to enumerate and validate vulnerabilities without false positives.',
    },
    {
        icon: Zap, label: 'Exploitation', color: ORANGE,
        desc: 'Controlled, safe exploitation of confirmed vulnerabilities to demonstrate real-world impact and attack depth.',
    },
    {
        icon: KeyRound, label: 'Post-Exploitation', color: RUST,
        desc: 'Privilege escalation, lateral movement, and data access analysis — understanding what an attacker can truly reach.',
    },
    {
        icon: FileText, label: 'Reporting & Remediation', color: AMBER,
        desc: 'Detailed technical + executive reports with CVSS scores, POC evidence, and actionable remediation steps.',
    },
]

const whatWeTest = [
    {
        title: 'Web Application VAPT',
        features: ['OWASP Top 10 coverage', 'Authentication & session testing', 'Business logic flaws', 'Injection vulnerabilities', 'Access control (BOLA/BFLA)'],
        icon: Globe, color: ORANGE,
    },
    {
        title: 'API Security Testing',
        features: ['REST & GraphQL APIs', 'OWASP API Top 10', 'Mass assignment testing', 'Auth & rate limit bypass', 'Endpoint discovery (ffuf)'],
        icon: Code2, color: RUST,
    },
    {
        title: 'Network VAPT',
        features: ['Internal & external testing', 'Port & service enumeration', 'Firewall & ACL bypass', 'Active Directory assessment', 'Nessus-based scanning'],
        icon: Network, color: AMBER,
    },
]

const tools = [
    'Burp Suite Pro', 'Metasploit', 'Nessus', 'Nuclei', 'Nmap', 'ffuf',
    'SQLMap', 'Nikto', 'Wireshark', 'Hydra', 'OWASP ZAP', 'BloodHound',
]

const reportFeatures = [
    'Executive summary',
    'CVSS severity scores',
    'Proof of concept (POC)',
    'Screenshots & evidence',
    'Remediation steps',
    'Re-test support',
]

export default function Process() {
    const reportRef = useRef(null)

    return (
        <section id="process" className="py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="absolute inset-0 cyber-grid opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(180, 83, 9, 0.05)' }} />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">

                {/* ─── METHODOLOGY ─── */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Shield size={12} style={{ color: ORANGE }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Our Methodology</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-text)' }}>
                        How We Conduct VAPT
                    </h2>
                    <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-text-soft)' }}>
                        A structured, industry-standard approach to identifying and remediating vulnerabilities across your digital infrastructure — from scoping to final report.
                    </p>
                </motion.div>

                {/* Phase Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                    {phases.map((phase, i) => {
                        const Icon = phase.icon
                        return (
                            <motion.div
                                key={phase.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ delay: i * 0.07 }}
                                className="glass rounded-2xl p-6 group transition-all hover:shadow-lg hover:scale-[1.01]"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                        style={{ background: `${phase.color}18`, border: `1px solid ${phase.color}30` }}
                                    >
                                        <Icon size={18} style={{ color: phase.color }} />
                                    </div>
                                    <div>
                                        <span className="text-xs block" style={{ color: 'var(--color-text-faint)' }}>Phase</span>
                                        <span className="text-xs font-mono" style={{ color: 'var(--color-text-faint)' }}>0{i + 1}</span>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-lg mb-2" style={{ color: phase.color }}>{phase.label}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>{phase.desc}</p>
                            </motion.div>
                        )
                    })}
                </div>

                {/* ─── WHAT WE TEST ─── */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: 'var(--color-text)' }}>
                        VAPT Services
                    </h3>
                    <p className="text-center mb-10 max-w-xl mx-auto" style={{ color: 'var(--color-text-soft)' }}>
                        Comprehensive coverage across your entire attack surface — web, API, and network infrastructure.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                        {whatWeTest.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="glass rounded-2xl p-6 group transition-all hover:shadow-lg"
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                                        style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                                        <Icon size={20} style={{ color: item.color }} />
                                    </div>
                                    <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>{item.title}</h4>
                                    <ul className="space-y-2">
                                        {item.features.map((f) => (
                                            <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-soft)' }}>
                                                <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* ─── TOOLS + REPORT side by side ─── */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Tools */}
                    <motion.div
                        className="glass rounded-2xl p-6 md:p-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: `${ORANGE}18`, border: `1px solid ${ORANGE}30` }}>
                                <Terminal size={18} style={{ color: ORANGE }} />
                            </div>
                            <div>
                                <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>Tools We Use</h3>
                                <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Industry-standard, battle-tested</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tools.map((tool, i) => (
                                <motion.span
                                    key={tool}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.03 }}
                                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
                                    style={{
                                        background: `${[ORANGE, RUST, AMBER][i % 3]}12`,
                                        color: [ORANGE, RUST, AMBER][i % 3],
                                        border: `1px solid ${[ORANGE, RUST, AMBER][i % 3]}25`,
                                    }}
                                >
                                    {tool}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Report Deliverables */}
                    <motion.div
                        ref={reportRef}
                        className="glass rounded-2xl p-6 md:p-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: `${RUST}18`, border: `1px solid ${RUST}30` }}>
                                <Lock size={18} style={{ color: RUST }} />
                            </div>
                            <div>
                                <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>What You Get in the Report</h3>
                                <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Every engagement ends with a structured report</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-soft)' }}>
                            Professional VAPT Report — ready for compliance, remediation teams & management.
                            Covers both technical depth and executive summary.
                        </p>
                        <ul className="space-y-3">
                            {reportFeatures.map((feat, i) => (
                                <motion.li
                                    key={feat}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-3 text-sm"
                                    style={{ color: 'var(--color-text)' }}
                                >
                                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${RUST}15`, border: `1px solid ${RUST}30` }}>
                                        <CheckCircle size={12} style={{ color: RUST }} />
                                    </div>
                                    {feat}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
