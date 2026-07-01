import { motion } from 'framer-motion'
import { FileText, Globe, Smartphone, Cloud } from 'lucide-react'
import { useState } from 'react'
import PageLayout from './PageLayout'

const reports = [
    {
        title: 'Web Application VAPT Report',
        desc: 'Comprehensive web application security assessment report with executive summary, vulnerability details, and remediation guidance.',
        icon: Globe, pages: 47, color: '#EA580C',
        content: `WEB APPLICATION VAPT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━

Overall Risk Rating: CRITICAL
Testing Standard: OWASP Testing Guide v4.2

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

Report includes executive summary, risk matrix,
CVSS scoring, proof-of-concept evidence,
screenshots, and step-by-step remediation.`
    },
    {
        title: 'Mobile Application Security Report',
        desc: 'iOS & Android mobile security assessment following OWASP MASVS v2.0 standards.',
        icon: Smartphone, pages: 38, color: '#B45309',
        content: `MOBILE APPLICATION SECURITY REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Platform: Android 14 / iOS 17
Testing Standard: OWASP MASVS v2.0

Overall Risk Rating: HIGH

Findings Summary:
  • Critical: 2
  • High: 5
  • Medium: 9
  • Low: 6

Critical Findings:
1. Insecure Data Storage - Plaintext credentials
2. Improper Certificate Validation - TLS bypass

Report covers static analysis, dynamic analysis,
network traffic analysis, and MITRE ATT&CK mapping.`
    },
    {
        title: 'Cloud Security Assessment Report',
        desc: 'AWS/Azure/GCP security posture assessment with CIS benchmark compliance mapping.',
        icon: Cloud, pages: 52, color: '#F59E0B',
        content: `CLOUD SECURITY ASSESSMENT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Provider: Amazon Web Services
Scope: Production Environment
Benchmark: CIS AWS Foundations v1.5

Overall Posture: POOR

Control Failures: 47/200 (23.5%)
Critical Misconfigurations: 8

Top Issues:
1. S3 Buckets - Public read access (3 buckets)
2. IAM - Wildcard permissions on 12 roles
3. Security Groups - SSH open to 0.0.0.0/0
4. CloudTrail - Logging disabled in 3 regions
5. RDS - No encryption at rest

Report includes IAM deep dive, compliance mapping,
and full remediation roadmap.`
    },
]

export default function SampleReports() {
    const [selected, setSelected] = useState(null)

    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <FileText size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Sample Reports</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                        Report <span className="gradient-text">Deliverables</span>
                    </h1>
                    <p className="max-w-2xl mb-12 text-base" style={{ color: 'var(--color-text-soft)' }}>
                        See the quality and depth of our security assessment reports. Every engagement delivers structured, actionable documentation.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {reports.map((r, i) => {
                            const Icon = r.icon
                            return (
                                <motion.div
                                    key={r.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="glass rounded-2xl p-6 cursor-pointer transition-all hover:shadow-lg"
                                    onClick={() => setSelected(selected === i ? null : i)}
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                        style={{ background: `${r.color}18`, border: `1px solid ${r.color}30` }}>
                                        <Icon size={22} style={{ color: r.color }} />
                                    </div>
                                    <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{r.title}</h3>
                                    <p className="text-xs mb-3" style={{ color: 'var(--color-text-faint)' }}>{r.pages} pages</p>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>{r.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>

                    {selected !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass rounded-2xl p-6 md:p-8"
                            style={{ background: '#1A0F06', border: '1px solid rgba(234,88,12,0.2)' }}
                        >
                            <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap"
                                style={{ color: 'rgba(251,247,240,0.75)' }}>
                                {reports[selected].content}
                            </pre>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </PageLayout>
    )
}
