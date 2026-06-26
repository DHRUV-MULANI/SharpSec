import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Shield } from 'lucide-react'

export default function CTA({ onDownloadReport }) {
    return (
        <section className="py-24 bg-[#030712] relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20" />

            {/* Gradient orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]">
                <div className="absolute left-0 w-1/2 h-full bg-cyan-500/8 rounded-full blur-3xl" />
                <div className="absolute right-0 w-1/2 h-full bg-purple-600/8 rounded-full blur-3xl" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-strong rounded-3xl p-8 md:p-16 text-center border border-white/5 relative overflow-hidden"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-600/5" />

                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-br-3xl" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-600/10 to-transparent rounded-tl-3xl" />

                    <div className="relative">
                        {/* Icon */}
                        <motion.div
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center mx-auto mb-6"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        >
                            <Shield size={28} className="text-cyan-400" />
                        </motion.div>

                        {/* Headline */}
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Ready to Secure<br />
                            <span className="gradient-text">Your Business?</span>
                        </h2>

                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                            Join 150+ organizations that trust CipherGuard to protect their digital assets.
                            Get a free consultation and custom security roadmap.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#contact"
                                className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600" />
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Calendar size={18} className="relative" />
                                <span className="relative">Book Consultation</span>
                                <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-1" />
                            </a>

                            <a
                                href="#contact"
                                className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-300 glass border border-white/10 hover:border-cyan-400/30 hover:text-white transition-all"
                            >
                                <Shield size={18} />
                                Request Assessment
                            </a>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-500">
                            {['Free Initial Consultation', 'NDA on Request', 'Results in 5-7 Days', 'Free Retest Included'].map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
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
