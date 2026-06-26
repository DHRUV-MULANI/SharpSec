import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
    {
        q: 'What is a VAPT and how is it different from a vulnerability scan?',
        a: "A Vulnerability Assessment and Penetration Test (VAPT) combines automated scanning with expert manual testing. A vulnerability scan only identifies potential weaknesses using automated tools — it misses ~40% of vulnerabilities. VAPT adds manual exploitation to confirm and demonstrate the real-world impact of each finding."
    },
    {
        q: 'How long does a typical security assessment take?',
        a: 'Timelines vary by scope: Web App VAPT typically takes 5–10 business days, Mobile App VAPT 5–7 days, Cloud Security Assessment 3–5 days, Network Pentest 5–7 days, and Red Team Assessments 2–4 weeks. We provide a detailed timeline during the scoping phase.'
    },
    {
        q: 'Will the testing affect our production environment?',
        a: "We follow a 'do no harm' testing philosophy. We discuss risk tolerance during scoping and can perform testing in staging environments or during off-peak hours. Destructive exploitation (like deleting data) is never performed without explicit written permission. We also carry professional indemnity insurance."
    },
    {
        q: 'What certifications do your engineers hold?',
        a: "Our team collectively holds OSCP, OSCE, OSEP, CREST CRT, CEH, CISSP, CISM, CCSP, AWS Security Specialty, and various vendor-specific certifications. Every engagement is led by a senior engineer with minimum 5 years of offensive security experience."
    },
    {
        q: 'What is included in the final report?',
        a: "Our reports include: Executive Summary, Risk Matrix, full vulnerability details with CVSS scores, OWASP and MITRE ATT&CK mapping, proof-of-concept screenshots, business impact analysis, step-by-step remediation guidance, and a remediation priority roadmap. We also provide a free retest within 30 days."
    },
    {
        q: 'Do you sign an NDA before the assessment?',
        a: "Absolutely. We sign a mutual NDA before any engagement commences. Confidentiality of your systems and findings is our top priority. All data collected during the assessment is securely deleted after the final report delivery."
    },
    {
        q: 'What compliance frameworks do you map findings to?',
        a: "We map findings to OWASP Top 10, SANS/CWE Top 25, MITRE ATT&CK, CVE/CVSS, ISO 27001, PCI DSS, NIST Cybersecurity Framework, SOC 2, and GDPR as relevant. This makes our reports useful for both technical teams and compliance/audit purposes."
    },
    {
        q: 'How much does a security assessment cost?',
        a: "Pricing depends on scope, complexity, and timeline. Web App VAPT starts from $2,500 for small applications. Enterprise engagements and compliance assessments are quoted based on scope. We offer volume discounts for multi-application programs and annual contracts. Contact us for a custom quote."
    },
]

export default function FAQ() {
    const [open, setOpen] = useState(null)

    return (
        <section id="faq" className="py-24 bg-[#030712] relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-15" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-3xl" />

            <div className="max-w-3xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-cyan-400/20 mb-6">
                        <HelpCircle size={12} className="text-cyan-400" />
                        <span className="text-xs text-cyan-400 uppercase tracking-widest">FAQ</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Common Questions<br />
                        <span className="gradient-text">Answered</span>
                    </h2>
                </motion.div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                            className="glass rounded-2xl overflow-hidden border border-transparent hover:border-white/5 transition-all"
                            style={open === i ? { borderColor: 'rgba(0,212,255,0.15)' } : {}}
                        >
                            <button
                                className="w-full flex items-center justify-between p-5 text-left"
                                onClick={() => setOpen(open === i ? null : i)}
                                aria-expanded={open === i}
                            >
                                <span className={`font-medium text-sm md:text-base transition-colors ${open === i ? 'text-cyan-400' : 'text-white'}`}>
                                    {faq.q}
                                </span>
                                <ChevronDown
                                    size={18}
                                    className={`text-gray-400 flex-shrink-0 ml-4 transition-transform duration-300 ${open === i ? 'rotate-180 text-cyan-400' : ''}`}
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-500 mb-4">Still have questions?</p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-cyan-400 border border-cyan-400/20 hover:border-cyan-400/40 transition-all text-sm font-medium"
                    >
                        Talk to a Security Expert
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
