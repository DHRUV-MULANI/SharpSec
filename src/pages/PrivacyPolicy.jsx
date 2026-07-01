import { motion } from 'framer-motion'
import { Shield, Lock } from 'lucide-react'
import PageLayout from './PageLayout'

const sections = [
    {
        title: '1. Information We Collect',
        content: [
            'Personal Information: Name, email address, phone number, company name, and job title when you fill out contact forms, request quotes, or engage our services.',
            'Technical Data: IP address, browser type, device information, and usage data collected automatically when you visit our website.',
            'Assessment Data: During engagements, we collect technical data related to your systems under a signed NDA and Statement of Work. This data is handled under separate contractual terms.',
            'Communication Data: Records of communications between you and our team for service delivery and support purposes.',
        ],
    },
    {
        title: '2. How We Use Your Information',
        content: [
            'To deliver security assessment and consulting services as agreed.',
            'To respond to inquiries, provide quotes, and manage client relationships.',
            'To improve our website, services, and user experience.',
            'To send relevant security updates, newsletters, or service announcements (with your consent).',
            'To comply with legal obligations and protect against fraud.',
        ],
    },
    {
        title: '3. Data Sharing & Third Parties',
        content: [
            'We do not sell, rent, or trade your personal information to third parties.',
            'We may share data with trusted service providers who assist in delivering our services (hosting, email, analytics) under strict confidentiality agreements.',
            'We may disclose data when required by law, court order, or to protect our legal rights.',
            'Assessment findings and vulnerability data are shared only with authorized client contacts as defined in the engagement contract.',
        ],
    },
    {
        title: '4. Data Security',
        content: [
            'All client assessment data is encrypted at rest (AES-256) and in transit (TLS 1.3).',
            'Access to client data is restricted to authorized personnel on a need-to-know basis.',
            'We conduct regular security assessments on our own infrastructure.',
            'Client reports are delivered via encrypted channels and purged from our systems after the retention period.',
        ],
    },
    {
        title: '5. Data Retention',
        content: [
            'Client engagement data is retained for 2 years after engagement completion, then securely deleted.',
            'Website visitor data is retained for 12 months for analytics purposes.',
            'You may request deletion of your personal data at any time by contacting privacy@evolutesec.io.',
        ],
    },
    {
        title: '6. Your Rights (GDPR / CCPA)',
        content: [
            'Right to access: Request a copy of your personal data we hold.',
            'Right to rectification: Request correction of inaccurate data.',
            'Right to erasure: Request deletion of your personal data.',
            'Right to restrict processing: Request limitation of how we use your data.',
            'Right to portability: Request your data in a machine-readable format.',
            'Right to object: Opt out of marketing communications at any time.',
        ],
    },
    {
        title: '7. Cookies',
        content: [
            'We use essential cookies for website functionality and security.',
            'Analytics cookies help us understand how visitors use our site (anonymized).',
            'You can manage cookie preferences through your browser settings.',
            'See our Cookie Policy for detailed information.',
        ],
    },
    {
        title: '8. Contact',
        content: [
            'For privacy-related inquiries: privacy@evolutesec.io',
            'Data Protection Officer: dpo@evolutesec.io',
            'EvoluteSec Security, Remote-first, Worldwide Operations',
        ],
    },
]

export default function PrivacyPolicy() {
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
                        Privacy Policy
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
