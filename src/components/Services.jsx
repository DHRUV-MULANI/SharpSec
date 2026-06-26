import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Globe, Smartphone, Code2, Cloud, Network, Wifi,
    Server, Settings, FileCode, Target, Mail, Shield,
    Lock, CreditCard, Eye, Database, ChevronDown
} from 'lucide-react'

const services = [
    {
        icon: Globe, title: 'Web Application VAPT', color: '#00D4FF',
        short: 'Comprehensive web security testing following OWASP Top 10 and beyond.',
        details: 'Full black-box, grey-box and white-box testing. SQL injection, XSS, CSRF, IDOR, broken auth, business logic flaws, and 150+ vulnerability checks. Detailed proof-of-concept for every finding.',
        tags: ['OWASP Top 10', 'SANS 25', 'CVSSv3']
    },
    {
        icon: Smartphone, title: 'Mobile Application VAPT', color: '#7C3AED',
        short: 'iOS and Android security testing — static, dynamic, and network analysis.',
        details: 'OWASP MASVS-compliant testing covering insecure data storage, improper auth, code tampering, reverse engineering, traffic interception, and backend API testing.',
        tags: ['iOS', 'Android', 'OWASP MASVS']
    },
    {
        icon: Code2, title: 'API Security Testing', color: '#00FFC8',
        short: 'REST, GraphQL, SOAP — full API attack surface coverage.',
        details: 'Authentication bypass, authorization flaws, excessive data exposure, injection flaws, rate limiting issues, schema validation, and mass assignment vulnerabilities tested systematically.',
        tags: ['REST', 'GraphQL', 'SOAP', 'gRPC']
    },
    {
        icon: Cloud, title: 'Cloud Security Assessment', color: '#00D4FF',
        short: 'AWS, Azure, GCP misconfiguration review and hardening.',
        details: 'IAM policy review, S3/Blob/GCS exposure, VPC security, Kubernetes hardening, serverless security, secrets management, logging/monitoring gaps, and CIS benchmark compliance.',
        tags: ['AWS', 'Azure', 'GCP', 'CIS Benchmark']
    },
    {
        icon: Network, title: 'Network Penetration Testing', color: '#7C3AED',
        short: 'Internal and external network penetration testing.',
        details: 'Network enumeration, service exploitation, man-in-the-middle attacks, firewall bypass, VPN security, segmentation testing, and lateral movement simulation.',
        tags: ['Internal', 'External', 'Segmentation']
    },
    {
        icon: Wifi, title: 'Wireless Security Assessment', color: '#00FFC8',
        short: 'Wi-Fi network security testing and rogue AP detection.',
        details: 'WPA2/WPA3 testing, evil twin attacks, PMKID cracking, captive portal bypasses, enterprise Wi-Fi (802.1x) testing, rogue access point detection.',
        tags: ['WPA2', 'WPA3', '802.1x']
    },
    {
        icon: Server, title: 'Infrastructure Assessment', color: '#00D4FF',
        short: 'Server hardening review and vulnerability scanning.',
        details: 'OS hardening, patch management gaps, exposed services, privilege escalation paths, default credentials, configuration drift, and compliance mapping.',
        tags: ['CIS Benchmark', 'NIST', 'ISO 27001']
    },
    {
        icon: Settings, title: 'Configuration Review', color: '#7C3AED',
        short: 'Secure baseline configuration audits for all platforms.',
        details: 'Firewall rule review, router/switch hardening, database configuration, web server hardening (Apache/Nginx/IIS), application server tuning.',
        tags: ['Firewall', 'Database', 'Web Server']
    },
    {
        icon: FileCode, title: 'Source Code Review', color: '#00FFC8',
        short: 'Manual + automated SAST for your entire codebase.',
        details: 'Line-by-line manual code review combined with automated SAST tooling. Covers hardcoded secrets, SQL injection, crypto issues, dependency vulnerabilities, and logic flaws.',
        tags: ['SAST', 'DAST', 'SCA']
    },
    {
        icon: Target, title: 'Red Team Assessment', color: '#00D4FF',
        short: 'Full adversary simulation — people, process, technology.',
        details: 'Multi-vector attack simulation targeting physical, digital, and human elements. MITRE ATT&CK-mapped TTPs, C2 infrastructure, persistence, exfiltration simulation.',
        tags: ['MITRE ATT&CK', 'APT Simulation', 'C2']
    },
    {
        icon: Mail, title: 'Phishing Simulation', color: '#7C3AED',
        short: 'Realistic phishing campaigns to test employee awareness.',
        details: 'Spear phishing, vishing, smishing campaigns with detailed analytics. Employee click rates, credential harvesting awareness, training recommendations, and repeat testing.',
        tags: ['Email', 'SMS', 'Voice']
    },
    {
        icon: Shield, title: 'ISO 27001 Readiness', color: '#00FFC8',
        short: 'Gap assessment and remediation roadmap for ISO 27001.',
        details: 'Full ISMS gap analysis, risk assessment, policy review, control mapping, and implementation roadmap. Prepare for certification audits with confidence.',
        tags: ['Gap Analysis', 'Risk Assessment', 'ISMS']
    },
    {
        icon: Lock, title: 'SOC 2 Readiness', color: '#00D4FF',
        short: 'SOC 2 Type I & II preparation and evidence collection.',
        details: 'Trust Service Criteria mapping, control implementation guidance, evidence collection framework, vendor assessment, and auditor liaison support.',
        tags: ['Type I', 'Type II', 'TSC']
    },
    {
        icon: CreditCard, title: 'PCI DSS Assessment', color: '#7C3AED',
        short: 'Cardholder data environment scoping and compliance.',
        details: 'CDE scoping, SAQ guidance, network segmentation validation, penetration testing per PCI DSS requirement 11.3, and remediation support.',
        tags: ['PCI DSS v4.0', 'SAQ', 'QSA']
    },
    {
        icon: Eye, title: 'External Attack Surface', color: '#00FFC8',
        short: 'Discover your exposed assets before attackers do.',
        details: 'Subdomain enumeration, exposed services discovery, leaked credentials, dark web monitoring, SSL certificate analysis, and continuous attack surface monitoring.',
        tags: ['OSINT', 'Recon', 'ASM']
    },
    {
        icon: Database, title: 'Active Directory Review', color: '#00D4FF',
        short: 'AD misconfiguration, privilege escalation, and BloodHound analysis.',
        details: 'BloodHound/SharpHound enumeration, Kerberoasting, AS-REP roasting, pass-the-hash, DCSync, ACL abuse, GPO misconfigurations, and tier-0 asset protection.',
        tags: ['BloodHound', 'Kerberos', 'LDAP']
    },
]

function ServiceCard({ service, index }) {
    const [expanded, setExpanded] = useState(false)
    const Icon = service.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="group relative"
        >
            <div
                className="glass rounded-2xl p-6 h-full cursor-pointer transition-all duration-300 hover:border-white/10"
                style={{
                    borderColor: expanded ? `${service.color}30` : 'transparent',
                    border: '1px solid',
                }}
                onClick={() => setExpanded(!expanded)}
            >
                {/* Glow effect */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${service.color}08 0%, transparent 70%)`
                    }}
                />

                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300"
                    style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}
                >
                    <Icon size={22} style={{ color: service.color }} />
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                </h3>

                {/* Short desc */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.short}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{ background: `${service.color}10`, color: service.color }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Expand button */}
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-cyan-400 transition-colors">
                    <span>{expanded ? 'Show less' : 'Learn more'}</span>
                    <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-4 border-t border-white/5">
                                <p className="text-sm text-gray-400 leading-relaxed">{service.details}</p>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 mt-4 text-sm font-medium transition-colors"
                                    style={{ color: service.color }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Get a Quote <ChevronDown size={12} className="-rotate-90" />
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default function Services() {
    return (
        <section id="services" className="py-24 bg-[#030712] relative">
            {/* Background */}
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-cyan-400/20 mb-6">
                        <Shield size={12} className="text-cyan-400" />
                        <span className="text-xs text-cyan-400 uppercase tracking-widest">Security Services</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Comprehensive Security<br />
                        <span className="gradient-text">Testing & Compliance</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        From web apps to cloud infrastructure, we cover every attack surface
                        with manual expertise and cutting-edge tooling.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {services.map((service, i) => (
                        <ServiceCard key={service.title} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
