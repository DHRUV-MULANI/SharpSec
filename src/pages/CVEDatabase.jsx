import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Search } from 'lucide-react'
import PageLayout from './PageLayout'

const cves = [
    { id: 'CVE-2024-3094', severity: 'Critical', cvss: '10.0', desc: 'XZ Utils backdoor — malicious code injected into xz/liblzma supply chain affecting SSH authentication.', affected: 'OpenSSH via xz-utils 5.6.0/5.6.1', status: 'Patched' },
    { id: 'CVE-2024-21762', severity: 'Critical', cvss: '9.8', desc: 'Out-of-bound write vulnerability in FortiOS SSL VPN daemon.', affected: 'FortiGate SSL VPN 7.4.0-7.4.2', status: 'Patched' },
    { id: 'CVE-2024-0006', severity: 'High', cvss: '8.8', desc: 'Improper neutralization of special elements in SQL commands in Progress MOVEit Transfer web application.', affected: 'MOVEit Transfer 2023.0-2023.1', status: 'Patched' },
    { id: 'CVE-2023-44487', severity: 'High', cvss: '7.5', desc: 'HTTP/2 Rapid Reset attack — application-layer DDoS exploiting stream multiplexing.', affected: 'All HTTP/2 implementations', status: 'Mitigated' },
    { id: 'CVE-2023-38408', severity: 'High', cvss: '8.1', desc: 'OpenSSH agent forwarding allows tricking ssh-agent into signing attacker-specified data.', affected: 'OpenSSH 9.5 and earlier', status: 'Patched' },
    { id: 'CVE-2023-46604', severity: 'Critical', cvss: '10.0', desc: 'Apache ActiveMQ remote code execution via OpenWire protocol deserialization.', affected: 'Apache ActiveMQ 5.15.0-5.15.15', status: 'Patched' },
    { id: 'CVE-2023-4911', severity: 'High', cvss: '7.8', desc: 'glibc buffer overflow in ld.so processing of GLIBC_TUNABLES environment variable.', affected: 'glibc 2.34-2.38', status: 'Patched' },
    { id: 'CVE-2023-22515', severity: 'Critical', cvss: '10.0', desc: 'Broken access control in Atlassian Confluence Data Center and Server.', affected: 'Confluence 8.0.0-8.5.3', status: 'Patched' },
]

const severityColor = { Critical: '#EF4444', High: '#EA580C', Medium: '#F59E0B', Low: '#22C55E' }

export default function CVEDatabase() {
    const [search, setSearch] = useState('')
    const filtered = cves.filter(c =>
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.desc.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Database size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>CVE Database</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                        CVE <span className="gradient-text">Reference</span>
                    </h1>
                    <p className="max-w-2xl mb-8 text-base" style={{ color: 'var(--color-text-soft)' }}>
                        Notable CVEs from our research and assessments. Search by ID or keyword.
                    </p>

                    <div className="relative mb-8">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-faint)' }} />
                        <input
                            type="text"
                            placeholder="Search CVEs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm glass outline-none"
                            style={{ color: 'var(--color-text)', background: 'var(--color-card-tint)' }}
                        />
                    </div>

                    <div className="space-y-3">
                        {filtered.map((cve, i) => (
                            <motion.div
                                key={cve.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className="glass rounded-xl p-5 transition-all hover:shadow-lg"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-3">
                                        <code className="font-mono font-bold" style={{ color: 'var(--color-text)' }}>{cve.id}</code>
                                        <span className="px-2 py-0.5 rounded text-xs font-bold"
                                            style={{ background: `${severityColor[cve.severity]}20`, color: severityColor[cve.severity] }}>
                                            {cve.severity}
                                        </span>
                                        <span className="text-xs font-mono" style={{ color: 'var(--color-text-faint)' }}>CVSS: {cve.cvss}</span>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-full"
                                        style={{ background: '#22C55E15', color: '#22C55E' }}>{cve.status}</span>
                                </div>
                                <p className="text-sm leading-relaxed mb-1" style={{ color: 'var(--color-text-soft)' }}>{cve.desc}</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Affected: {cve.affected}</p>
                            </motion.div>
                        ))}
                        {filtered.length === 0 && (
                            <p className="text-center py-8 text-sm" style={{ color: 'var(--color-text-faint)' }}>No CVEs found matching "{search}"</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
