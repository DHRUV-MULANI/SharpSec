import { motion } from 'framer-motion'

/* Real client partners we work with */
const companies = [
    { name: 'SarthiBus', tag: 'Transport' },
    { name: 'Ramdoot Restros', tag: 'Hospitality' },
    { name: 'NexaCloud', tag: 'SaaS' },
    { name: 'DataVault', tag: 'FinTech' },
    { name: 'OrbitPay', tag: 'Payments' },
    { name: 'MediSecure', tag: 'HealthTech' },
]

function Logo({ name, tag }) {
    const initials = name
        .replace(/[^A-Za-z0-9 ]/g, '')
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return (
        <div className="flex-shrink-0 flex items-center gap-3 px-6 py-4 glass rounded-xl transition-all group hover:shadow-md">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0 btn-primary">
                {initials}
            </div>
            <div className="flex flex-col leading-tight">
                <span className="font-semibold text-sm tracking-tight transition-colors" style={{ color: 'var(--color-text)' }}>
                    {name}
                </span>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-faint)' }}>
                    {tag}
                </span>
            </div>
        </div>
    )
}

export default function TrustedBy() {
    const doubled = [...companies, ...companies]

    return (
        <section className="py-16 overflow-hidden relative" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(234,88,12,0.03)] to-transparent pointer-events-none z-10" />
            {/* fade masks left/right */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to right, var(--color-bg), transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-20 pointer-events-none"
                style={{ background: 'linear-gradient(to left, var(--color-bg), transparent)' }} />

            <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm uppercase tracking-widest"
                    style={{ color: 'var(--color-text-faint)' }}
                >
                    Securing ambitious teams & growing businesses
                </motion.p>
            </div>

            {/* Marquee Row 1 */}
            <div className="relative flex overflow-hidden">
                <div className="flex animate-marquee gap-4">
                    {doubled.map((c, i) => (
                        <Logo key={`a-${i}`} name={c.name} tag={c.tag} />
                    ))}
                </div>
            </div>

            {/* Marquee Row 2 - reversed */}
            <div className="relative flex overflow-hidden mt-4">
                <div className="flex gap-4" style={{ animation: 'marquee 40s linear infinite reverse' }}>
                    {[...doubled].reverse().map((c, i) => (
                        <Logo key={`b-${i}`} name={c.name} tag={c.tag} />
                    ))}
                </div>
            </div>
        </section>
    )
}
