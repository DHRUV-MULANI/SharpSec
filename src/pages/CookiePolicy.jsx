import { motion } from 'framer-motion'
import { Cookie, Lock } from 'lucide-react'
import PageLayout from './PageLayout'

const cookieTypes = [
    {
        title: 'Essential Cookies',
        required: true,
        desc: 'Required for the website to function properly. Cannot be disabled.',
        cookies: [
            { name: 'session_id', desc: 'Maintains your session state', duration: 'Session' },
            { name: 'csrf_token', desc: 'Prevents cross-site request forgery attacks', duration: 'Session' },
            { name: 'cookie_consent', desc: 'Stores your cookie preferences', duration: '1 year' },
        ],
    },
    {
        title: 'Analytics Cookies',
        required: false,
        desc: 'Help us understand how visitors interact with our website. Data is anonymized.',
        cookies: [
            { name: '_ga', desc: 'Google Analytics — distinguishes unique visitors', duration: '2 years' },
            { name: '_ga_*', desc: 'Google Analytics — maintains session state', duration: '2 years' },
        ],
    },
    {
        title: 'Functional Cookies',
        required: false,
        desc: 'Enable enhanced functionality and personalization.',
        cookies: [
            { name: 'theme_preference', desc: 'Remembers your display preference', duration: '1 year' },
        ],
    },
]

export default function CookiePolicy() {
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
                        Cookie Policy
                    </h1>
                    <p className="text-sm mb-12" style={{ color: 'var(--color-text-faint)' }}>Last updated: June 2025</p>

                    <div className="space-y-4 mb-8">
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>
                            Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience and understand how our site is used.
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>
                            You can manage cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {cookieTypes.map((category) => (
                            <div key={category.title} className="glass rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>{category.title}</h2>
                                    {category.required ? (
                                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                            style={{ background: '#F59E0B20', color: '#F59E0B' }}>Required</span>
                                    ) : (
                                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                            style={{ background: '#EA580C15', color: '#EA580C' }}>Optional</span>
                                    )}
                                </div>
                                <p className="text-sm mb-4" style={{ color: 'var(--color-text-soft)' }}>{category.desc}</p>
                                <div className="space-y-3">
                                    {category.cookies.map((cookie) => (
                                        <div key={cookie.name} className="flex items-start gap-3 p-3 rounded-xl"
                                            style={{ background: 'var(--color-card-tint)' }}>
                                            <Cookie size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#EA580C' }} />
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <code className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>{cookie.name}</code>
                                                    <span className="text-[10px]" style={{ color: 'var(--color-text-faint)' }}>{cookie.duration}</span>
                                                </div>
                                                <p className="text-xs" style={{ color: 'var(--color-text-soft)' }}>{cookie.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass rounded-2xl p-6 mt-6">
                        <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>Managing Cookies</h2>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>
                            To manage or delete cookies, go to your browser settings. Most browsers allow you to:
                        </p>
                        <ul className="mt-3 space-y-1.5">
                            {['View and delete existing cookies', 'Block cookies from specific or all websites', 'Set preferences for certain types of cookies', 'Block third-party cookies while allowing first-party'].map((item) => (
                                <li key={item} className="text-sm flex gap-2" style={{ color: 'var(--color-text-soft)' }}>
                                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#EA580C' }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
