import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Shield } from 'lucide-react'

export default function CTA({ onDownloadReport }) {
    return (
        <section className="py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="absolute inset-0 cyber-grid opacity-30" />

            {/* Gradient orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] flex">
                <div className="w-1/2 h-full rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(234, 88, 12, 0.10)' }} />
                <div className="w-1/2 h-full rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(180, 83, 9, 0.10)' }} />
            </div>

            <div className="max-w-5xl mx-auto px-5 sm:px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-strong rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(234,88,12,0.06), transparent, rgba(180,83,9,0.06))' }} />

                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-32 h-32 rounded-br-3xl"
                        style={{ background: 'linear-gradient(135deg, rgba(234,88,12,0.12), transparent)' }} />
                    <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-3xl"
                        style={{ background: 'linear-gradient(315deg, rgba(180,83,9,0.12), transparent)' }} />

                    <div className="relative">
                        {/* Icon */}
                        <motion.div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                            style={{ background: 'rgba(234,88,12,0.12)', border: '1px solid rgba(234,88,12,0.25)' }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        >
                            <Shield size={28} style={{ color: 'var(--color-primary)' }} />
                        </motion.div>

                        {/* Headline */}
                        <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight" style={{ color: 'var(--color-text)' }}>
                            Ready to Secure<br />
                            <span className="gradient-text">Your Business?</span>
                        </h2>

                        <p className="text-base md:text-lg max-w-2xl mx-auto mb-10" style={{ color: 'var(--color-text-soft)' }}>
                            Partner with engineers who treat your security like their own.
                            Get a free consultation and a custom security roadmap — no pressure, no jargon.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="/#contact"
                                className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white relative overflow-hidden w-full sm:w-auto justify-center"
                            >
                                <div className="absolute inset-0 btn-primary" />
                                <Calendar size={18} className="relative" />
                                <span className="relative">Book Consultation</span>
                                <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-1" />
                            </a>

                            <button
                                onClick={onDownloadReport}
                                className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold glass transition-all w-full sm:w-auto justify-center"
                                style={{ color: 'var(--color-text)' }}
                            >
                                <Shield size={18} style={{ color: 'var(--color-primary)' }} />
                                Download Sample Report
                            </button>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-10 text-sm" style={{ color: 'var(--color-text-soft)' }}>
                            {['Free Initial Consultation', 'NDA on Request', 'Results in 5–7 Days', 'Free Retest Included'].map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
