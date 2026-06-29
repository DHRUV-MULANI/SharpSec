import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, X, Download, Eye, Lock, Shield, Smartphone, Cloud } from 'lucide-react'

const reports = [
    {
        id: 'web',
        title: 'Web Application VAPT Report',
        subtitle: 'Enterprise Grade',
        icon: FileText,
        color: '#EA580C',
        gradient: 'linear-gradient(135deg, rgba(234,88,12,0.18), rgba(180,83,9,0.08))',
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
        color: '#B45309',
        gradient: 'linear-gradient(135deg, rgba(180,83,9,0.18), rgba(146,64,14,0.08))',
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
        color: '#F59E0B',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(217,119,6,0.08))',
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
                className="relative glass-strong rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 sm:p-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-3 min-w-0">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${report.color}18` }}
                        >
                            <report.icon size={20} style={{ color: report.color }} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-semibold truncate" style={{ color: 'var(--color-text)' }}>{report.title}</h3>
                            <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{report.pages} pages — Confidential</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="transition-colors flex-shrink-0 ml-2" style={{ color: 'var(--color-text-soft)' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Page tabs */}
                <div className="flex gap-2 p-4 overflow-x-auto" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    {report.preview.map((page, i) => (
                        <button
                            key={i}
                            onClick={() => setActivePage(i)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all"
                            style={activePage === i
                                ? { background: `${report.color}1f`, color: report.color }
                                : { color: 'var(--color-text-faint)' }}
                        >
                            {!page.unlocked && <Lock size={10} />}
                            {page.page}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 overflow-y-auto max-h-[50vh] relative">
                    {report.preview[activePage].unlocked ? (
                        <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--color-text-soft)' }}>
                            {report.preview[activePage].content}
                        </pre>
                    ) : (
                        <div className="relative">
                            <div className="blur-sm text-sm font-mono select-none" style={{ color: 'var(--color-text-faint)' }}>
                                {`Finding ID: CVE-2024-XXXX\nCVSS Score: 9.8 (Critical)\n\nVulnerability Description:\nA critical SQL injection vulnerability was discovered in the authentication endpoint...\n\nProof of Concept:\nPayload: admin' OR '1'='1'; --\n\nBusiness Impact:\nComplete authentication bypass allowing unauthorized access to all user accounts...\n\nRemediation:\n1. Implement parameterized queries\n2. Apply input validation\n3. Deploy WAF rule...`}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="glass-strong rounded-2xl p-6 text-center" style={{ borderColor: 'var(--color-border)' }}>
                                    <Lock size={24} className="mx-auto mb-3" style={{ color: 'var(--color-text-faint)' }} />
                                    <p className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Sample Report Only</p>
                                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-soft)' }}>Request a free consultation to see a full report</p>
                                    <a
                                        href="#contact"
                                        className="px-4 py-2 text-sm font-semibold rounded-xl text-white inline-block btn-primary"
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
                <div className="p-5 sm:p-6 flex items-center justify-between gap-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-faint)' }}>
                        <Shield size={12} />
                        <span className="hidden sm:inline">Confidential — For authorized use only</span>
                        <span className="sm:hidden">Confidential</span>
                    </div>
                    <button
                        onClick={onDownload}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary flex-shrink-0"
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
        <section id="reports" className="py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
            <div className="absolute inset-0 cyber-grid opacity-30" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(234, 88, 12, 0.05)' }} />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <FileText size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Sample Reports</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-text)' }}>
                        World-Class Deliverables<br />
                        <span className="gradient-text">That Drive Action</span>
                    </h2>
                    <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-text-soft)' }}>
                        Our reports are designed for both technical teams and C-suite executives.
                        Clear, actionable, and beautifully formatted.
                    </p>
                </motion.div>

                {/* Report Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
                    {reports.map((report, i) => {
                        const Icon = report.icon
                        return (
                            <motion.div
                                key={report.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                whileHover={{ y: -6 }}
                                className="group cursor-pointer"
                                onClick={() => setActiveModal(report)}
                            >
                                <div className="glass rounded-2xl overflow-hidden transition-all hover:shadow-xl h-full">
                                    {/* Report cover */}
                                    <div className="relative h-48 flex items-center justify-center" style={{ background: report.gradient }}>
                                        <div className="absolute inset-0 cyber-grid opacity-30" />
                                        <div
                                            className="absolute top-4 right-4 text-xs px-2 py-1 rounded font-mono font-semibold"
                                            style={{ background: `${report.color}25`, color: report.color }}
                                        >
                                            CONFIDENTIAL
                                        </div>

                                        {/* Report visual */}
                                        <div className="relative">
                                            <div className="w-24 h-32 rounded-lg flex flex-col items-center justify-center gap-3 group-hover:scale-105 transition-transform"
                                                style={{ background: '#FFFFFF', border: `1px solid ${report.color}40`, boxShadow: 'var(--shadow-soft)' }}>
                                                <Icon size={28} style={{ color: report.color }} />
                                                <div className="space-y-1.5 w-16">
                                                    <div className="h-1 rounded-full" style={{ background: `${report.color}40` }} />
                                                    <div className="h-1 rounded-full w-3/4" style={{ background: 'var(--color-border)' }} />
                                                    <div className="h-1 rounded-full w-1/2" style={{ background: 'var(--color-border)' }} />
                                                    <div className="h-1 rounded-full mt-2" style={{ background: `${report.color}30` }} />
                                                    <div className="h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
                                                </div>
                                            </div>
                                            <div
                                                className="absolute -bottom-2 -right-2 w-24 h-32 rounded-lg opacity-25"
                                                style={{ background: `${report.color}30` }}
                                            />
                                        </div>

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{ background: 'rgba(42, 27, 14, 0.55)', backdropFilter: 'blur(4px)' }}>
                                            <div className="flex items-center gap-2 text-white font-semibold">
                                                <Eye size={16} />
                                                Preview Report
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card info */}
                                    <div className="p-5">
                                        <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{report.title}</h3>
                                        <p className="text-sm mb-4" style={{ color: 'var(--color-text-faint)' }}>{report.subtitle} · {report.pages} pages</p>

                                        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                                            {['Executive Summary', 'Risk Matrix', 'CVSS Scores', 'OWASP Mapping', 'MITRE ATT&CK', 'Remediation'].map((item) => (
                                                <div key={item} className="flex items-center gap-1.5" style={{ color: 'var(--color-text-soft)' }}>
                                                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: report.color }} />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                                            style={{ color: report.color, background: `${report.color}12`, border: `1px solid ${report.color}30` }}
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
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white btn-primary transition-shadow"
                    >
                        <Download size={18} />
                        Download Sample Report
                    </button>
                    <p className="text-sm mt-3" style={{ color: 'var(--color-text-faint)' }}>Free — no credit card required</p>
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
