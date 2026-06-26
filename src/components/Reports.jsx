import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, X, Download, Eye, Lock, Shield, Smartphone, Cloud } from 'lucide-react'

const reports = [
    {
        id: 'web',
        title: 'Web Application VAPT Report',
        subtitle: 'Enterprise Grade',
        icon: FileText,
        color: '#00D4FF',
        gradient: 'from-cyan-500/20 to-blue-600/10',
        pages: 47,
        preview: [
            {
                page: 'Executive Summary',
                content: `This report presents the findings of a comprehensive Web Application Vulnerability Assessment and Penetration Test conducted on [Client] web application.

OVERALL RISK RATING: CRITICAL

Total Vulnerabilities: 23
• Critical: 4
• High: 8  
• Medium: 7
• Low: 4

Key Findings:
1. SQL Injection - Admin Authentication Bypass (CVSS: 9.8)
2. Broken Access Control - IDOR on User Profile (CVSS: 8.1)
3. XSS - Stored in Comment Module (CVSS: 7.5)
4. SSRF - Internal Network Access (CVSS: 7.2)

This engagement was conducted in accordance with OWASP Testing Guide v4.2 and PTES.`,
                unlocked: true
            },
            {
                page: 'Risk Matrix',
                content: 'RESTRICTED — Sample report only',
                unlocked: false
            },
            {
                page: 'Vulnerability Details',
                content: 'RESTRICTED — Full report available after assessment',
                unlocked: false
            },
            {
                page: 'OWASP Mapping',
                content: 'RESTRICTED — Purchase assessment to unlock',
                unlocked: false
            }
        ]
    },
    {
        id: 'mobile',
        title: 'Mobile Application Security Report',
        subtitle: 'iOS & Android',
        icon: Smartphone,
        color: '#7C3AED',
        gradient: 'from-purple-500/20 to-purple-800/10',
        pages: 38,
        preview: [
            {
                page: 'Executive Summary',
                content: `MOBILE APPLICATION SECURITY ASSESSMENT
Platform: Android 14 / iOS 17
Testing Standard: OWASP MASVS v2.0

RISK RATING: HIGH

Findings Summary:
• Critical: 2
• High: 5
• Medium: 9
• Low: 6

Critical Findings:
1. Insecure Data Storage - Plaintext credentials in SharedPreferences
2. Improper Certificate Validation - TLS pinning bypass

MASVS Compliance: MASVS-STORAGE, MASVS-NETWORK, MASVS-AUTH`,
                unlocked: true
            },
            {
                page: 'Dynamic Analysis',
                content: 'RESTRICTED — Sample report only',
                unlocked: false
            },
            {
                page: 'MITRE ATT&CK Mobile',
                content: 'RESTRICTED — Full report available',
                unlocked: false
            }
        ]
    },
    {
        id: 'cloud',
        title: 'Cloud Security Assessment',
        subtitle: 'AWS Infrastructure',
        icon: Cloud,
        color: '#00FFC8',
        gradient: 'from-emerald-500/20 to-teal-600/10',
        pages: 52,
        preview: [
            {
                page: 'Executive Summary',
                content: `CLOUD SECURITY ASSESSMENT REPORT
Provider: Amazon Web Services (AWS)
Scope: Production Environment
Benchmark: CIS AWS Foundations v1.5

OVERALL POSTURE: POOR

Control Failures: 47/200 (23.5%)
Critical Misconfigurations: 8

Top Issues:
1. S3 Buckets - Public read access enabled (3 buckets)
2. IAM - Wildcard permissions on 12 roles  
3. Security Groups - SSH open to 0.0.0.0/0
4. CloudTrail - Logging disabled in 3 regions
5. RDS - No encryption at rest`,
                unlocked: true
            },
            {
                page: 'IAM Deep Dive',
                content: 'RESTRICTED — Sample report only',
                unlocked: false
            },
            {
                page: 'Remediation Roadmap',
                content: 'RESTRICTED — Full report available',
                unlocked: false
            }
        ]
    }
]

function ReportModal({ report, onClose, onDownload }) {
    const [activePage, setActivePage] = useState(0)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative glass-strong rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: `${report.color}15` }}
                        >
                            <report.icon size={20} style={{ color: report.color }} />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">{report.title}</h3>
                            <p className="text-xs text-gray-500">{report.pages} pages — Confidential</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Page tabs */}
                <div className="flex gap-2 p-4 border-b border-white/5 overflow-x-auto">
                    {report.preview.map((page, i) => (
                        <button
                            key={i}
                            onClick={() => setActivePage(i)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activePage === i ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                }`}
                            style={activePage === i ? { background: `${report.color}20`, color: report.color } : {}}
                        >
                            {!page.unlocked && <Lock size={10} />}
                            {page.page}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-64 relative">
                    {report.preview[activePage].unlocked ? (
                        <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                            {report.preview[activePage].content}
                        </pre>
                    ) : (
                        <div className="relative">
                            <div className="blur-sm text-sm text-gray-500 font-mono select-none">
                                {`Finding ID: CVE-2024-XXXX\nCVSS Score: 9.8 (Critical)\n\nVulnerability Description:\nA critical SQL injection vulnerability was discovered in the authentication endpoint...\n\nProof of Concept:\nPayload: admin' OR '1'='1'; --\n\nBusiness Impact:\nComplete authentication bypass allowing unauthorized access to all user accounts...\n\nRemediation:\n1. Implement parameterized queries\n2. Apply input validation\n3. Deploy WAF rule...`}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="glass-strong rounded-2xl p-6 text-center border border-white/10">
                                    <Lock size={24} className="text-gray-400 mx-auto mb-3" />
                                    <p className="text-white font-semibold mb-1">Sample Report Only</p>
                                    <p className="text-gray-400 text-sm mb-4">Request a free consultation to see a full report</p>
                                    <a
                                        href="#contact"
                                        className="px-4 py-2 text-sm font-semibold rounded-xl text-white inline-block"
                                        style={{ background: report.color + '30', border: `1px solid ${report.color}40` }}
                                        onClick={onClose}
                                    >
                                        Request Full Report
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Shield size={12} />
                        <span>Confidential — For authorized use only</span>
                    </div>
                    <button
                        onClick={onDownload}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                        style={{ background: `linear-gradient(135deg, ${report.color}, #7C3AED)` }}
                    >
                        <Download size={14} />
                        Download Sample
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Reports({ onDownloadReport }) {
    const [activeModal, setActiveModal] = useState(null)

    return (
        <section id="reports" className="py-24 bg-[#030712] relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-15" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/4 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-cyan-400/20 mb-6">
                        <FileText size={12} className="text-cyan-400" />
                        <span className="text-xs text-cyan-400 uppercase tracking-widest">Sample Reports</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        World-Class Deliverables<br />
                        <span className="gradient-text">That Drive Action</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our reports are designed for both technical teams and C-suite executives.
                        Clear, actionable, and beautifully formatted.
                    </p>
                </motion.div>

                {/* Report Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {reports.map((report, i) => {
                        const Icon = report.icon
                        return (
                            <motion.div
                                key={report.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -8, rotateY: 3, rotateX: -2 }}
                                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                                className="group cursor-pointer"
                                onClick={() => setActiveModal(report)}
                            >
                                <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all h-full">
                                    {/* Report cover */}
                                    <div className={`relative h-56 bg-gradient-to-br ${report.gradient} flex items-center justify-center`}>
                                        {/* Background elements */}
                                        <div className="absolute inset-0 cyber-grid opacity-20" />
                                        <div
                                            className="absolute top-4 right-4 text-xs px-2 py-1 rounded font-mono"
                                            style={{ background: `${report.color}20`, color: report.color }}
                                        >
                                            CONFIDENTIAL
                                        </div>

                                        {/* Report visual */}
                                        <div className="relative">
                                            <div className="w-24 h-32 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center gap-3 group-hover:scale-105 transition-transform">
                                                <Icon size={28} style={{ color: report.color }} />
                                                <div className="space-y-1.5 w-16">
                                                    <div className="h-1 bg-white/20 rounded-full" />
                                                    <div className="h-1 bg-white/10 rounded-full w-3/4" />
                                                    <div className="h-1 bg-white/10 rounded-full w-1/2" />
                                                    <div className="h-1 bg-white/20 rounded-full mt-2" />
                                                    <div className="h-1 bg-white/10 rounded-full" />
                                                </div>
                                            </div>

                                            {/* Page flip shadow */}
                                            <div
                                                className="absolute -bottom-2 -right-2 w-24 h-32 rounded-lg opacity-30"
                                                style={{ background: `${report.color}20` }}
                                            />
                                        </div>

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                                            <div className="flex items-center gap-2 text-white font-semibold">
                                                <Eye size={16} />
                                                Preview Report
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card info */}
                                    <div className="p-5">
                                        <h3 className="text-white font-semibold mb-1">{report.title}</h3>
                                        <p className="text-gray-500 text-sm mb-4">{report.subtitle} · {report.pages} pages</p>

                                        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                                            {['Executive Summary', 'Risk Matrix', 'CVSS Scores', 'OWASP Mapping', 'MITRE ATT&CK', 'Remediation'].map((item) => (
                                                <div key={item} className="flex items-center gap-1.5 text-gray-500">
                                                    <div className="w-1 h-1 rounded-full" style={{ background: report.color }} />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            className="w-full py-2.5 rounded-xl text-sm font-medium transition-all text-white"
                                            style={{ background: `${report.color}15`, border: `1px solid ${report.color}25` }}
                                            onClick={(e) => { e.stopPropagation(); setActiveModal(report) }}
                                        >
                                            View Preview
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <button
                        onClick={onDownloadReport}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all glow-blue"
                    >
                        <Download size={18} />
                        Download Sample Report
                    </button>
                    <p className="text-gray-600 text-sm mt-3">Free — no credit card required</p>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {activeModal && (
                    <ReportModal
                        report={activeModal}
                        onClose={() => setActiveModal(null)}
                        onDownload={() => { setActiveModal(null); onDownloadReport() }}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}
