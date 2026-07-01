import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import PageLayout from './PageLayout'

const posts = [
    { title: 'Top 10 Web Application Vulnerabilities in 2025', date: 'Jun 15, 2025', tag: 'VAPT', desc: 'An updated look at the most critical web application security flaws we encounter during penetration testing engagements.' },
    { title: 'Building a 24/7 SOC on a Startup Budget', date: 'May 28, 2025', tag: 'SOC', desc: 'How growing companies can implement effective security monitoring without enterprise-level budgets.' },
    { title: 'AWS IAM Misconfigurations We See Every Week', date: 'May 10, 2025', tag: 'Cloud', desc: 'Common Amazon IAM policy mistakes that expose your infrastructure — and how to fix them.' },
    { title: 'API Security: Beyond OWASP Top 10', date: 'Apr 22, 2025', tag: 'API', desc: 'Advanced API vulnerabilities that standard scanners miss — business logic flaws, mass assignment, and BOLA.' },
    { title: 'From Pen Test to Production: Closing the Loop', date: 'Apr 5, 2025', tag: 'Process', desc: 'Why most organizations fail to remediate findings and how to build an effective vulnerability management program.' },
    { title: 'MITRE ATT&CK Mapping for Red Team Reports', date: 'Mar 18, 2025', tag: 'Red Team', desc: 'How we map every red team technique to MITRE ATT&CK for actionable threat intelligence.' },
]

export default function Blog() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-5 sm:px-6 py-16 md:py-24">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <FileText size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Security Blog</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                        Insights & <span className="gradient-text">Research</span>
                    </h1>
                    <p className="max-w-2xl mb-12 text-base" style={{ color: 'var(--color-text-soft)' }}>
                        Security insights, vulnerability research, and practical guides from our engineering team.
                    </p>

                    <div className="space-y-4">
                        {posts.map((post, i) => (
                            <motion.a
                                key={post.title}
                                href="/"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="glass rounded-2xl p-6 block transition-all hover:shadow-lg group"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-0.5 rounded text-xs font-semibold"
                                        style={{ background: '#EA580C15', color: '#EA580C' }}>{post.tag}</span>
                                    <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{post.date}</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-2 group-hover:text-[#EA580C] transition-colors" style={{ color: 'var(--color-text)' }}>
                                    {post.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>{post.desc}</p>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    )
}
