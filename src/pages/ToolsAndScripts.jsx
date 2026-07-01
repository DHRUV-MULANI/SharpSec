import { motion } from 'framer-motion'
import { Terminal, ExternalLink } from 'lucide-react'
import PageLayout from './PageLayout'

const tools = [
    { name: 'Burp Suite Pro', category: 'Web', desc: 'Industry-leading web application security testing platform. Interception proxy, scanner, and extensibility framework.', url: 'https://portswigger.net/burp' },
    { name: 'Metasploit', category: 'Exploitation', desc: 'Penetration testing framework with thousands of exploits, payloads, and post-exploitation modules.', url: 'https://www.metasploit.com' },
    { name: 'Nessus', category: 'Scanning', desc: 'Vulnerability scanner for identifying misconfigurations, missing patches, and compliance gaps.', url: 'https://www.tenable.com/products/nessus' },
    { name: 'Nuclei', category: 'Scanning', desc: 'Fast template-based vulnerability scanner with community-driven YAML templates for known CVEs.', url: 'https://github.com/projectdiscovery/nuclei' },
    { name: 'Nmap', category: 'Recon', desc: 'Network discovery and security auditing tool for port scanning, OS detection, and service enumeration.', url: 'https://nmap.org' },
    { name: 'ffuf', category: 'Web', desc: 'Fast web fuzzer for directory/file discovery, parameter fuzzing, and virtual host enumeration.', url: 'https://github.com/ffuf/ffuf' },
    { name: 'SQLMap', category: 'Web', desc: 'Automated SQL injection detection and exploitation tool supporting multiple database types.', url: 'https://sqlmap.org' },
    { name: 'Nikto', category: 'Scanning', desc: 'Web server scanner that checks for dangerous files, outdated software, and server misconfigurations.', url: 'https://github.com/sullo/nikto' },
    { name: 'Wireshark', category: 'Network', desc: 'Network protocol analyzer for traffic inspection, packet capture, and real-time analysis.', url: 'https://www.wireshark.org' },
    { name: 'Hydra', category: 'Brute Force', desc: 'Online password cracking tool supporting dozens of protocols including SSH, HTTP, FTP, and more.', url: 'https://github.com/vanhauser-thc/thc-hydra' },
    { name: 'OWASP ZAP', category: 'Web', desc: 'Free web application security scanner maintained by OWASP. Automated and manual testing capabilities.', url: 'https://www.zaproxy.org' },
    { name: 'BloodHound', category: 'AD', desc: 'Active Directory reconnaissance tool using graph theory to identify attack paths and privilege escalation chains.', url: 'https://github.com/BloodHoundAD/BloodHound' },
]

export default function ToolsAndScripts() {
    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Terminal size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Tools & Scripts</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                        Our <span className="gradient-text">Security Toolkit</span>
                    </h1>
                    <p className="max-w-2xl mb-12 text-base" style={{ color: 'var(--color-text-soft)' }}>
                        Industry-standard, battle-tested tools that power our assessments — from reconnaissance to exploitation.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tools.map((tool, i) => (
                            <motion.a
                                key={tool.name}
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="glass rounded-2xl p-5 transition-all hover:shadow-lg group block"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-sm group-hover:text-[#EA580C] transition-colors" style={{ color: 'var(--color-text)' }}>
                                        {tool.name}
                                    </h3>
                                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#EA580C' }} />
                                </div>
                                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold inline-block mb-3"
                                    style={{ background: '#EA580C12', color: '#EA580C' }}>{tool.category}</span>
                                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>{tool.desc}</p>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
