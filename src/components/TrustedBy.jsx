import { motion } from 'framer-motion'

const companies = [
    'Accenture', 'Deloitte', 'Wipro', 'Infosys', 'TCS', 'HCL',
    'Cognizant', 'Capgemini', 'IBM', 'Oracle', 'SAP', 'Microsoft',
    'AWS', 'Google Cloud', 'Salesforce', 'ServiceNow', 'Palo Alto',
    'CrowdStrike', 'Fortinet', 'Check Point'
]

function Logo({ name }) {
    return (
        <div className="flex-shrink-0 flex items-center justify-center px-8 py-4 glass rounded-xl border border-white/5 hover:border-cyan-400/20 transition-colors group">
            <span className="text-gray-500 group-hover:text-gray-300 font-semibold text-sm tracking-wide transition-colors whitespace-nowrap">
                {name}
            </span>
        </div>
    )
}

export default function TrustedBy() {
    const doubled = [...companies, ...companies]

    return (
        <section className="py-20 overflow-hidden bg-[#030712] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] pointer-events-none z-10" />

            <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm text-gray-500 uppercase tracking-widest"
                >
                    Trusted by startups, enterprises and growing businesses
                </motion.p>
            </div>

            {/* Marquee Row 1 */}
            <div className="relative flex overflow-hidden">
                <div className="flex animate-marquee gap-4">
                    {doubled.map((name, i) => (
                        <Logo key={`a-${i}`} name={name} />
                    ))}
                </div>
            </div>

            {/* Marquee Row 2 - reversed */}
            <div className="relative flex overflow-hidden mt-4">
                <div className="flex gap-4" style={{ animation: 'marquee 40s linear infinite reverse' }}>
                    {[...doubled].reverse().map((name, i) => (
                        <Logo key={`b-${i}`} name={name} />
                    ))}
                </div>
            </div>
        </section>
    )
}
