import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MessageSquare, Crosshair, Calendar, Shield, CheckCircle, FileText, RotateCcw, Flag } from 'lucide-react'

const steps = [
    {
        icon: MessageSquare, label: 'Consultation', color: '#00D4FF',
        desc: 'Free 30-min call to understand your security needs, scope, and business context.'
    },
    {
        icon: Crosshair, label: 'Scoping', color: '#7C3AED',
        desc: 'Define the target systems, testing boundaries, rules of engagement, and success criteria.'
    },
    {
        icon: Calendar, label: 'Planning', color: '#00FFC8',
        desc: 'Detailed test plan, NDA signing, methodology selection, and team assignment.'
    },
    {
        icon: Shield, label: 'Assessment', color: '#00D4FF',
        desc: 'Expert security engineers execute the engagement using manual + automated testing.'
    },
    {
        icon: CheckCircle, label: 'Validation', color: '#7C3AED',
        desc: 'All findings validated manually to eliminate false positives. CVSS scoring applied.'
    },
    {
        icon: FileText, label: 'Professional Report', color: '#00FFC8',
        desc: 'Comprehensive report with executive summary, technical details, POC, and remediation guidance.'
    },
    {
        icon: RotateCcw, label: 'Retesting', color: '#00D4FF',
        desc: 'Free retest within 30 days to verify remediation of all identified vulnerabilities.'
    },
    {
        icon: Flag, label: 'Closure', color: '#7C3AED',
        desc: 'Final attestation letter, compliance certificates, and debrief call with your team.'
    },
]

export default function Process() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })

    return (
        <section id="process" className="py-24 bg-[#030712] relative overflow-hidden" ref={containerRef}>
            <div className="absolute inset-0 cyber-grid opacity-15" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/4 rounded-full blur-3xl" />

            <div className="max-w-5xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-purple-400/20 mb-6">
                        <Flag size={12} className="text-purple-400" />
                        <span className="text-xs text-purple-400 uppercase tracking-widest">Our Process</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        From Consultation<br />
                        <span className="gradient-text">to Certification</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A battle-tested 8-step process that ensures thorough coverage,
                        clear communication, and measurable results.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2 hidden md:block" />

                    {/* Animated progress line */}
                    <motion.div
                        className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-600 origin-top hidden md:block -translate-x-1/2"
                        style={{ height: useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']) }}
                    />

                    <div className="space-y-8 md:space-y-0">
                        {steps.map((step, i) => {
                            const Icon = step.icon
                            const isLeft = i % 2 === 0

                            return (
                                <motion.div
                                    key={step.label}
                                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                                        } flex-row gap-4 md:gap-0`}
                                >
                                    {/* Card */}
                                    <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                        <div className="glass rounded-2xl p-5 group hover:border-white/10 border border-transparent transition-all hover:scale-[1.02]">
                                            <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                                                <div
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 md:hidden"
                                                    style={{ background: `${step.color}15` }}
                                                >
                                                    <Icon size={14} style={{ color: step.color }} />
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-600 block">{String(i + 1).padStart(2, '0')}</span>
                                                    <h3 className="text-white font-semibold" style={{ color: step.color }}>{step.label}</h3>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>

                                    {/* Center dot */}
                                    <motion.div
                                        className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl flex items-center justify-center z-10 hidden md:flex"
                                        style={{ background: `${step.color}15`, border: `2px solid ${step.color}40` }}
                                        whileInView={{ scale: [0.5, 1.2, 1] }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Icon size={16} style={{ color: step.color }} />
                                    </motion.div>

                                    {/* Empty space for alternating */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
