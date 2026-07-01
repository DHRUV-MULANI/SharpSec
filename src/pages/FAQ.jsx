import { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, ChevronDown } from 'lucide-react'
import PageLayout from './PageLayout'

const faqs = [
    {
        q: 'What is a penetration test?',
        a: 'A penetration test (pen test) is an authorized simulated cyberattack on a computer system, performed to evaluate the security posture of an organization. Our engineers use the same techniques as real attackers to identify vulnerabilities before malicious actors can exploit them.',
    },
    {
        q: 'How long does a VAPT engagement take?',
        a: 'Typical engagements range from 5 to 15 business days depending on scope and complexity. We provide a detailed timeline during the scoping phase before any work begins.',
    },
    {
        q: 'Do you provide retests after remediation?',
        a: 'Yes — every engagement includes a free retest within 30 days. We verify that your team has successfully remediated the identified vulnerabilities before closing the engagement.',
    },
    {
        q: 'What do your reports include?',
        a: 'Every report includes an executive summary, detailed vulnerability descriptions, CVSS severity scores, proof-of-concept evidence, screenshots, and step-by-step remediation guidance. Reports are designed for both technical teams and management.',
    },
    {
        q: 'Do we need to provide credentials for testing?',
        a: 'For grey-box testing, yes — authenticated access reveals deeper vulnerabilities that external-only testing cannot find. All credentials are handled under strict NDA and securely destroyed after the engagement.',
    },
    {
        q: 'What is SOC as a Service?',
        a: 'Our SOC (Security Operations Center) service provides 24/7/365 continuous monitoring, real-time threat detection, SIEM management, threat hunting, and rapid incident response. It\'s like having an enterprise security team without the overhead.',
    },
    {
        q: 'What cloud platforms do you support?',
        a: 'We provide comprehensive security assessments for AWS, Azure, and GCP. This includes IAM policy review, misconfiguration detection, container security, CSPM automation, and DevSecOps pipeline integration.',
    },
    {
        q: 'Are your findings confidential?',
        a: 'Absolutely. All engagement data, findings, and reports are shared only with authorized client contacts under NDA. We maintain strict data handling procedures and all reports are delivered via encrypted channels.',
    },
    {
        q: 'Do you offer compliance-focused assessments?',
        a: 'Yes — we provide assessments aligned with ISO 27001, SOC 2, PCI DSS, HIPAA, and GDPR requirements. Our reports map findings to specific compliance controls and provide the evidence needed for audits.',
    },
    {
        q: 'How much does a penetration test cost?',
        a: 'Pricing depends on scope, complexity, and the type of assessment. We provide transparent, fixed-price quotes after the initial scoping consultation. Contact us for a free consultation and custom quote.',
    },
    {
        q: 'What certifications do your engineers hold?',
        a: 'Our team holds OSCP, CREST, CEH, CISSP, and CCSP certifications. Every engagement is staffed by certified senior engineers — never juniors learning on your systems.',
    },
    {
        q: 'Can you help fix the vulnerabilities you find?',
        a: 'Yes — our remediation assistance service includes working alongside your development team to implement fixes. We provide detailed remediation steps and can verify fixes during the included retest window.',
    },
]

export default function FAQPage() {
    const [open, setOpen] = useState(null)

    return (
        <PageLayout>
            <div className="max-w-3xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <HelpCircle size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>FAQ</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h1>
                    <p className="max-w-2xl mb-12 text-base" style={{ color: 'var(--color-text-soft)' }}>
                        Common questions about our security services. Can't find what you're looking for? <a href="/contact" className="font-semibold" style={{ color: '#EA580C' }}>Contact us</a>.
                    </p>

                    <div className="space-y-2">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className="glass rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpen(open === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className="font-semibold text-sm pr-4" style={{ color: 'var(--color-text)' }}>{faq.q}</span>
                                    <ChevronDown
                                        size={16}
                                        className="flex-shrink-0 transition-transform duration-300"
                                        style={{ color: '#EA580C', transform: open === i ? 'rotate(180deg)' : 'none' }}
                                    />
                                </button>
                                {open === i && (
                                    <div className="px-5 pb-5">
                                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>{faq.a}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
