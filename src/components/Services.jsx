import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield, Globe, Smartphone, Code2, Network, Target,
    Users, Activity, Search, Brain, FileWarning, Server,
    Cloud, Lock, Container, GitBranch, CheckCircle,
    Monitor, Radar, Clock, AlertTriangle, BarChart3,
    ChevronRight, ArrowRight
} from 'lucide-react'

const tabs = [
    { id: 'assessment', label: 'Assessment', icon: Shield, color: '#EA580C' },
    { id: 'monitoring', label: 'Monitoring', icon: Monitor, color: '#B45309' },
    { id: 'cloud', label: 'Cloud', icon: Cloud, color: '#F59E0B' },
]

const services = {
    assessment: {
        title: 'Vulnerability Assessment & Penetration Testing',
        desc: 'Our certified ethical hackers simulate real-world cyberattacks to identify vulnerabilities in your web applications, mobile apps, APIs, and network infrastructure before malicious actors can exploit them.',
        features: [
            { label: 'Web Application VAPT', icon: Globe },
            { label: 'Network Pen Testing', icon: Network },
            { label: 'Mobile App Security', icon: Smartphone },
            { label: 'API Security Testing', icon: Code2 },
            { label: 'Social Engineering', icon: Users },
            { label: 'Red Team Exercises', icon: Target },
            { label: 'Source Code Review', icon: Code2 },
            { label: 'Cloud Config Audit', icon: Cloud },
        ],
        cta: 'Get a VAPT Quote',
        stats: [
            { value: '47+', label: 'Average Vulnerabilities Found' },
            { value: '99.7%', label: 'Critical CVEs Patched' },
            { value: '5 Days', label: 'Report Delivery Time' },
            { value: '15+', label: 'Certified Testers (OSCP/CEH)' },
            { value: '98%', label: 'Client Satisfaction' },
        ],
    },
    monitoring: {
        title: 'SOC as a Service',
        desc: 'Our 24/7 Security Operations Center acts as an extension of your team, providing continuous monitoring, real-time threat detection, and rapid incident response powered by advanced SIEM technology and AI.',
        features: [
            { label: '24/7/365 Monitoring', icon: Monitor },
            { label: 'SIEM Management', icon: Server },
            { label: 'Threat Hunting', icon: Search },
            { label: 'Incident Response', icon: AlertTriangle },
            { label: 'Log Management', icon: FileWarning },
            { label: 'Alert Triage', icon: Radar },
            { label: 'Digital Forensics', icon: Brain },
            { label: 'Monthly Reports', icon: BarChart3 },
        ],
        cta: 'Start SOC Trial',
        stats: [
            { value: '< 5 Min', label: 'Mean Time to Detect (MTTD)' },
            { value: '< 15 Min', label: 'Mean Time to Respond (MTTR)' },
            { value: '1M+', label: 'Daily Threats Analyzed' },
            { value: '< 0.01%', label: 'False Positive Rate' },
            { value: '99.99%', label: 'Uptime Guarantee' },
        ],
    },
    cloud: {
        title: 'Cloud Security Posture Management',
        desc: 'Secure your cloud environments across AWS, Azure, and GCP with comprehensive security posture assessments, misconfiguration detection, identity management hardening, and continuous compliance monitoring.',
        features: [
            { label: 'AWS Security Review', icon: Cloud },
            { label: 'Azure Security Center', icon: Shield },
            { label: 'GCP Security Audit', icon: Lock },
            { label: 'IAM Hardening', icon: Lock },
            { label: 'Container Security', icon: Container },
            { label: 'Kubernetes Security', icon: Server },
            { label: 'CSPM Automation', icon: Activity },
            { label: 'DevSecOps Pipeline', icon: GitBranch },
        ],
        cta: 'Secure Your Cloud',
        stats: [
            { value: '500+', label: 'Cloud Misconfigs Detected' },
            { value: '1,200+', label: 'Compliance Checks' },
            { value: '3 Major', label: 'Supported Cloud Platforms' },
            { value: '85%', label: 'Risk Reduction' },
            { value: '48 Hours', label: 'Avg Setup Time' },
        ],
    },
}

function StatCard({ stat, color }) {
    return (
        <div
            className="rounded-xl p-4 text-center transition-all hover:scale-[1.02]"
            style={{ background: `${color}0D`, border: `1px solid ${color}20` }}
        >
            <div className="text-2xl font-bold mb-1" style={{ color }}>{stat.value}</div>
            <div className="text-xs leading-tight" style={{ color: 'var(--color-text-soft)' }}>{stat.label}</div>
        </div>
    )
}

export default function Services() {
    const [activeTab, setActiveTab] = useState('assessment')
    const current = services[activeTab]
    const color = tabs.find(t => t.id === activeTab)?.color

    return (
        <section id="services" className="py-20 md:py-24 relative" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
            <div className="absolute inset-0 cyber-grid opacity-30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(234, 88, 12, 0.05)' }} />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Shield size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Our Security Services</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Comprehensive, Enterprise-Grade<br />
                        <span className="gradient-text">Cybersecurity Solutions</span>
                    </h2>
                    <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-text-soft)' }}>
                        Designed to protect your business from every angle.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-12">
                    {tabs.map((tab) => {
                        const TabIcon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                style={isActive
                                    ? { background: `${tab.color}18`, color: tab.color, border: `1px solid ${tab.color}40` }
                                    : { background: 'transparent', color: 'var(--color-text-faint)', border: `1px solid var(--color-border)` }
                                }
                            >
                                <TabIcon size={16} />
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className="grid lg:grid-cols-2 gap-8 lg:gap-12"
                    >
                        {/* Left: Title + Description + Features */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                                {current.title}
                            </h3>
                            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-text-soft)' }}>
                                {current.desc}
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {current.features.map((feat, i) => {
                                    const FeatIcon = feat.icon
                                    return (
                                        <motion.div
                                            key={feat.label}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="flex items-center gap-2.5"
                                        >
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                                            >
                                                <FeatIcon size={14} style={{ color }} />
                                            </div>
                                            <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{feat.label}</span>
                                        </motion.div>
                                    )
                                })}
                            </div>

                            <a
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white btn-primary transition-shadow"
                            >
                                {current.cta} <ArrowRight size={16} />
                            </a>
                        </div>

                        {/* Right: Stats */}
                        <div>
                            <div className="grid grid-cols-2 gap-3">
                                {current.stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.06 }}
                                    >
                                        <StatCard stat={stat} color={color} />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Trust badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-4 glass rounded-xl p-4 flex items-center gap-3"
                                style={{ borderColor: `${color}25` }}
                            >
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${color}15` }}>
                                    <CheckCircle size={20} style={{ color }} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                                        Industry-Standard Methodology
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--color-text-soft)' }}>
                                        OWASP, PTES, NIST, MITRE ATT&CK aligned
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}
