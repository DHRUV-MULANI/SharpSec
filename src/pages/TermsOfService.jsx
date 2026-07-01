import { motion } from 'framer-motion'
import { FileText, Lock } from 'lucide-react'
import PageLayout from './PageLayout'

const sections = [
    {
        title: '1. Acceptance of Terms',
        content: [
            'By accessing and using the EvoluteSec Security website and services, you agree to be bound by these Terms of Service.',
            'If you do not agree to these terms, please do not use our website or services.',
            'We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance.',
        ],
    },
    {
        title: '2. Services Description',
        content: [
            'EvoluteSec Security provides cybersecurity consulting, vulnerability assessment, penetration testing, SOC services, cloud security assessments, and compliance advisory.',
            'All services are delivered under a separate Statement of Work (SOW) and Non-Disclosure Agreement (NDA).',
            'The content on this website is for informational purposes and does not constitute a binding service offer.',
        ],
    },
    {
        title: '3. Engagement Terms',
        content: [
            'Each engagement begins with a signed SOW outlining scope, timeline, deliverables, and pricing.',
            'Client is responsible for providing necessary access, credentials, and authorization for testing.',
            'Findings are confidential and shared only with authorized client contacts.',
            'EvoluteSec does not guarantee the absence of all vulnerabilities — assessments represent a point-in-time evaluation.',
        ],
    },
    {
        title: '4. Intellectual Property',
        content: [
            'Website content, branding, and methodology are proprietary to EvoluteSec Security.',
            'Assessment reports delivered to clients are licensed for internal use only — redistribution requires written consent.',
            'Client data and systems tested remain the property of the client.',
        ],
    },
    {
        title: '5. Limitation of Liability',
        content: [
            'EvoluteSec provides professional security services with reasonable care and diligence.',
            'We are not liable for indirect, incidental, or consequential damages arising from our services.',
            'Our total liability is limited to the fees paid for the specific engagement in question.',
            'We are not responsible for security incidents that occur outside the scope of our testing or monitoring.',
        ],
    },
    {
        title: '6. Prohibited Use',
        content: [
            'You may not use this website to solicit, collect, or transmit unauthorized security assessments.',
            'You may not attempt to gain unauthorized access to our systems, probe our infrastructure, or test our defenses without explicit written authorization.',
            'You may not reproduce, distribute, or modify our content without written permission.',
        ],
    },
    {
        title: '7. Confidentiality',
        content: [
            'Both parties agree to maintain confidentiality of all engagement-related information.',
            'This obligation survives the termination of any engagement.',
            'Breach of confidentiality may result in legal action and termination of services.',
        ],
    },
    {
        title: '8. Governing Law & Dispute Resolution',
        content: [
            'These terms are governed by applicable international law.',
            'Disputes shall first be attempted to be resolved through good-faith negotiation.',
            'Unresolved disputes will be submitted to binding arbitration.',
        ],
    },
    {
        title: '9. Contact',
        content: [
            'For questions about these terms: legal@evolutesec.io',
            'EvoluteSec Security, Remote-first, Worldwide Operations',
        ],
    },
]

export default function TermsOfService() {
    return (
        <PageLayout>
            <div className="max-w-3xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Lock size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Legal</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                        Terms of Service
                    </h1>
                    <p className="text-sm mb-12" style={{ color: 'var(--color-text-faint)' }}>Last updated: June 2025</p>

                    <div className="space-y-8">
                        {sections.map((section) => (
                            <section key={section.title}>
                                <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text)' }}>{section.title}</h2>
                                <ul className="space-y-2">
                                    {section.content.map((item) => (
                                        <li key={item} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--color-text-soft)' }}>
                                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#EA580C' }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
