import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Award, Clock, Users, FileCheck } from 'lucide-react'

const stats = [
    { value: 99, suffix: '%', label: 'Client Satisfaction', icon: Award, color: '#00D4FF' },
    { value: 500, suffix: '+', label: 'Security Assessments', icon: Shield, color: '#7C3AED' },
    { value: 1000, suffix: '+', label: 'Critical Vulnerabilities Fixed', icon: Zap, color: '#00FFC8' },
    { value: 24, suffix: 'h', label: 'Initial Response Time', icon: Clock, color: '#00D4FF' },
    { value: 150, suffix: '+', label: 'Enterprise Clients', icon: Users, color: '#7C3AED' },
    { value: 50, suffix: '+', label: 'Compliance Reports', icon: FileCheck, color: '#00FFC8' },
]

const differentiators = [
    {
        title: 'Manual + Automated Testing',
        desc: 'Every engagement combines expert manual testing with best-in-class tooling. Automated tools miss 40% of vulnerabilities — our manual experts catch everything.',
        icon: Shield, color: '#00D4FF'
    },
    {
        title: 'CREST & OSCP Certified Engineers',
        desc: 'Our team holds OSCP, CREST, CEH, CISSP, and CCSP certifications. You get senior engineers on every engagement — not juniors.',
        icon: Award, color: '#7C3AED'
    },
    {
        title: 'Business-Context Reports',
        desc: 'We translate technical vulnerabilities into business risk language. Every finding includes CVSS score, business impact, and step-by-step remediation.',
        icon: FileCheck, color: '#00FFC8'
    },
    {
        title: 'Free Retest Included',
        desc: 'Every engagement includes a free retest within 30 days. We verify your team has fixed the vulnerabilities before closing the engagement.',
        icon: Zap, color: '#00D4FF'
    },
]

function CountUp({ target, suffix, duration = 2000 }) {
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
        }
        requestAnimationFrame(animate)
    }, [started, target, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

export default function WhyUs() {
    return (
        <section id="why-us" className="py-24 bg-[#030712] relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-15" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-cyan-400/20 mb-6">
                        <Award size={12} className="text-cyan-400" />
                        <span className="text-xs text-cyan-400 uppercase tracking-widest">Why Choose Us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Security Excellence<br />
                        <span className="gradient-text">By the Numbers</span>
                    </h2>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-2xl p-6 text-center group hover:border-white/10 border border-transparent transition-all"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                                    style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}
                                >
                                    <Icon size={18} style={{ color: stat.color }} />
                                </div>
                                <div
                                    className="text-4xl md:text-5xl font-bold mb-2"
                                    style={{ color: stat.color }}
                                >
                                    <CountUp target={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Differentiators */}
                <div className="grid md:grid-cols-2 gap-6">
                    {differentiators.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-2xl p-6 flex gap-4 group hover:border-white/10 border border-transparent transition-all"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 transition-transform group-hover:scale-110"
                                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                                >
                                    <Icon size={22} style={{ color: item.color }} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
