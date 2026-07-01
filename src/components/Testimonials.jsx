import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
    {
        name: 'Rajesh Kumar', title: 'CISO', company: 'FinTech Solutions Ltd', initials: 'RK',
        color: '#00D4FF',
        text: "EvoluteSec's web application VAPT was the most thorough assessment we've ever had. They found a critical SQL injection that three previous firms missed. The report was exceptional — our board actually understood the business risk for once.",
        rating: 5, industry: 'Financial Services'
    },
    {
        name: 'Sarah Chen', title: 'CTO', company: 'HealthTech Platform', initials: 'SC',
        color: '#7C3AED',
        text: "We needed ISO 27001 certification in 6 months. EvoluteSec's gap analysis and remediation roadmap made it possible. Their team was available at every step. We passed the certification audit on the first attempt.",
        rating: 5, industry: 'Healthcare Technology'
    },
    {
        name: 'Mohammed Al-Rashid', title: 'VP Engineering', company: 'E-Commerce Giant', initials: 'MA',
        color: '#00FFC8',
        text: "The red team assessment was eye-opening. They got into our production environment through a phishing email in under 2 hours. The experience changed how our entire organization thinks about security. Absolute professionals.",
        rating: 5, industry: 'E-Commerce'
    },
    {
        name: 'Priya Sharma', title: 'Security Lead', company: 'SaaS Platform Inc', initials: 'PS',
        color: '#00D4FF',
        text: "We've worked with EvoluteSec for 3 years across 12 engagements. Their cloud security assessment found misconfigurations that could have cost us millions in data breach fines. The free retest service is incredibly valuable.",
        rating: 5, industry: 'SaaS'
    },
    {
        name: 'David Okonkwo', title: 'Head of IT', company: 'Insurance Group', initials: 'DO',
        color: '#7C3AED',
        text: "The PCI DSS assessment was delivered ahead of schedule with zero surprises. Their team understood our complex legacy environment perfectly. The remediation guidance was practical and prioritized by business impact.",
        rating: 5, industry: 'Insurance'
    },
]

export default function Testimonials() {
    const [current, setCurrent] = useState(0)

    const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
    const next = () => setCurrent((c) => (c + 1) % testimonials.length)

    return (
        <section id="testimonials" className="py-24 bg-[#030712] relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-15" />
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-600/4 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-purple-400/20 mb-6">
                        <Star size={12} className="text-purple-400" />
                        <span className="text-xs text-purple-400 uppercase tracking-widest">Client Stories</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Trusted by Security<br />
                        <span className="gradient-text">Leaders Worldwide</span>
                    </h2>
                </motion.div>

                {/* Main testimonial */}
                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="glass-strong rounded-3xl p-8 md:p-12 border border-white/5 relative"
                        >
                            {/* Quote icon */}
                            <Quote
                                size={40}
                                className="absolute top-8 right-8 opacity-10"
                                style={{ color: testimonials[current].color }}
                            />

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 relative">
                                "{testimonials[current].text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                                    style={{ background: `linear-gradient(135deg, ${testimonials[current].color}, #7C3AED)` }}
                                >
                                    {testimonials[current].initials}
                                </div>
                                <div>
                                    <div className="text-white font-semibold">{testimonials[current].name}</div>
                                    <div className="text-sm text-gray-400">{testimonials[current].title}, {testimonials[current].company}</div>
                                </div>
                                <div className="ml-auto text-right hidden sm:block">
                                    <div className="text-xs text-gray-600 uppercase tracking-widest">{testimonials[current].industry}</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8">
                        <button
                            onClick={prev}
                            className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors hover:border-white/10 border border-transparent"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className="w-2 h-2 rounded-full transition-all duration-300"
                                    style={{
                                        background: i === current ? '#00D4FF' : 'rgba(255,255,255,0.2)',
                                        width: i === current ? '24px' : '8px'
                                    }}
                                    aria-label={`Testimonial ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors hover:border-white/10 border border-transparent"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Thumbnail strip */}
                <div className="flex justify-center gap-3 mt-8 flex-wrap">
                    {testimonials.map((t, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`flex items-center gap-2 px-3 py-2 glass rounded-xl border transition-all text-xs ${i === current ? 'border-cyan-400/30 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            <div
                                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                style={{ background: `linear-gradient(135deg, ${t.color}, #7C3AED)` }}
                            >
                                {t.initials}
                            </div>
                            {t.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
