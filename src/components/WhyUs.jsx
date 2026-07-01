import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Award, Clock, Target, FileCheck } from 'lucide-react'

const ORANGE = '#EA580C'
const RUST = '#B45309'
const AMBER = '#F59E0B'

const stats = [
    { value: 100, suffix: '%', label: 'Manual Testing', icon: Shield, color: ORANGE },
    { value: 24, suffix: 'h', label: 'Initial Response', icon: Clock, color: RUST },
    { value: 30, suffix: 'd', label: 'Free Retest Window', icon: Zap, color: AMBER },
    { value: 5, suffix: '+ yrs', label: 'Engineer Experience', icon: Award, color: ORANGE },
    { value: 2, suffix: 'x', label: 'Manual + Automated', icon: Target, color: RUST },
    { value: 0, suffix: '', label: 'False Positives Shipped', icon: FileCheck, color: AMBER },
]

const differentiators = [
    {
        title: 'Manual + Automated Testing',
        desc: 'Every engagement combines expert manual testing with best-in-class tooling. Automated tools miss a significant share of vulnerabilities — our manual experts catch what scanners cannot.',
        icon: Shield, color: ORANGE
    },
    {
        title: 'Business-Context Reports',
        desc: 'We translate technical vulnerabilities into business risk language. Every finding includes CVSS score, business impact, and step-by-step remediation.',
        icon: FileCheck, color: AMBER
    },
    {
        title: 'Free Retest Included',
        desc: 'Every engagement includes a free retest within 30 days. We verify your team has fixed the vulnerabilities before closing the engagement.',
        icon: Zap, color: ORANGE
    },
]

function CountUp({ target, suffix, duration = 1800 }) {
    const [count, setCount] = useState(0)
    const [started, setStarted] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [started])

    useEffect(() => {
        if (!started) return
        let startTime = null
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(ease * target))
            if (progress < 1) requestAnimationFrame(animate)
            else setCount(target)
        }
        requestAnimationFrame(animate)
    }, [started, target, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

export default function WhyUs() {
    return (
        <section id="why-us" className="py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="absolute inset-0 cyber-grid opacity-40" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(234, 88, 12, 0.06)' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(180, 83, 9, 0.06)' }} />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Award size={12} style={{ color: ORANGE }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Why Choose Us</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Security Excellence<br />
                        <span className="gradient-text">By the Numbers</span>
                    </h2>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-16">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="glass rounded-2xl p-5 sm:p-6 text-center group transition-all hover:shadow-lg"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                                    style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}30` }}
                                >
                                    <Icon size={18} style={{ color: stat.color }} />
                                </div>
                                <div className="text-3xl md:text-5xl font-bold mb-2" style={{ color: stat.color }}>
                                    <CountUp target={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="text-sm" style={{ color: 'var(--color-text-soft)' }}>{stat.label}</p>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Differentiators */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    {differentiators.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-2xl p-6 flex gap-4 group transition-all hover:shadow-lg"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 transition-transform group-hover:scale-110"
                                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                                >
                                    <Icon size={22} style={{ color: item.color }} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{item.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-soft)' }}>{item.desc}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
