import { Component, useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, ChevronDown, Shield, Lock, Bug, Radar, KeyRound } from 'lucide-react'

const BlackHoleScene = lazy(() => import('./BlackHoleScene'))

function BlackHoleFallback() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full animate-pulse-glow">
                <div
                    className="absolute inset-0 rounded-full blur-3xl"
                    style={{ background: 'rgba(234, 88, 12, 0.22)' }}
                />
                <div
                    className="absolute inset-8 rounded-full"
                    style={{ background: 'radial-gradient(circle at 42% 38%, #F59E0B 0%, #EA580C 26%, #7C2D12 48%, #1A0F06 68%, #050201 100%)' }}
                />
                <div
                    className="absolute inset-3 rounded-full border"
                    style={{ borderColor: 'rgba(245, 158, 11, 0.42)', boxShadow: '0 0 45px rgba(234, 88, 12, 0.32)' }}
                />
            </div>
        </div>
    )
}


class HeroSceneErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error) {
        console.warn('Hero 3D scene failed, showing fallback.', error)
    }

    render() {
        if (this.state.hasError) return <BlackHoleFallback />
        return this.props.children
    }
}

/* Full phrase: "Before <word> Find the Weakness."
   The <word> cycles with a typewriter (type → hold → delete → next). */
const ROTATING = ['Attackers', 'Hackers', 'Threats', 'Breaches']

function useTypewriter(words, { typeSpeed = 90, deleteSpeed = 45, hold = 1400 } = {}) {
    const [index, setIndex] = useState(0)
    const [sub, setSub] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const current = words[index % words.length]
        let timeout

        if (!deleting && sub === current) {
            timeout = setTimeout(() => setDeleting(true), hold)
        } else if (deleting && sub === '') {
            setDeleting(false)
            setIndex((i) => (i + 1) % words.length)
        } else {
            timeout = setTimeout(() => {
                setSub((prev) =>
                    deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
                )
            }, deleting ? deleteSpeed : typeSpeed)
        }
        return () => clearTimeout(timeout)
    }, [sub, deleting, index, words, typeSpeed, deleteSpeed, hold])

    return sub
}

/* Floating security tags that orbit around the black hole visually */
const floaters = [
    { Icon: Shield, label: 'Threat Protection', angle: 'top-2 left-1/4', delay: 0, color: '#EA580C' },
    { Icon: Lock, label: 'Access Control', angle: 'top-1/3 right-2', delay: 0.4, color: '#B45309' },
    { Icon: Bug, label: 'Vuln Discovery', angle: 'bottom-10 left-0', delay: 0.8, color: '#F59E0B' },
    { Icon: Radar, label: 'Recon', angle: 'bottom-2 right-1/4', delay: 1.2, color: '#EA580C' },
    { Icon: KeyRound, label: 'Privilege', angle: 'top-1/2 left-2', delay: 1.6, color: '#B45309' },
]

export default function Hero({ onDownloadReport }) {
    const typed = useTypewriter(ROTATING)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
    }
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } }
    }

    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden pt-28 md:pt-24"
        >
            {/* Warm grid + soft glows */}
            <div className="absolute inset-0 cyber-grid opacity-40" />
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(234, 88, 12, 0.10)' }} />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(180, 83, 9, 0.08)' }} />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">

                    {/* ── LEFT: typing headline ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-6">
                            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full"
                                style={{ borderColor: 'rgba(234, 88, 12, 0.25)' }}>
                                <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: 'var(--color-primary)' }} />
                                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-primary-deep)' }}>
                                    Enterprise Security Intelligence
                                </span>
                            </div>
                        </motion.div>

                        {/* Headline with typewriter */}
                        <motion.h1 variants={itemVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
                            style={{ color: 'var(--color-text)' }}>
                            Protect Your Business Before{' '}
                            <span className="relative inline-block">
                                <span className="gradient-text">{typed}</span>
                                {/* blinking caret */}
                                <span
                                    className="inline-block w-[3px] h-[0.9em] align-middle ml-1 animate-pulse-glow"
                                    style={{ background: 'var(--color-primary)', borderRadius: 2 }}
                                />
                            </span>
                            <br />
                            Find the Weakness.
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p variants={itemVariants}
                            className="text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                            style={{ color: 'var(--color-text-soft)' }}>
                            Enterprise-grade security assessments, VAPT, compliance audits, red teaming,
                            cloud security, API testing, and secure code reviews — delivered by elite security engineers.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <a
                                href="/#contact"
                                className="group relative flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-shadow w-full sm:w-auto justify-center"
                            >
                                <div className="absolute inset-0 btn-primary" />
                                <span className="relative">Book Free Consultation</span>
                                <ArrowRight size={18} className="relative transition-transform group-hover:translate-x-1" />
                            </a>
                            <button
                                onClick={onDownloadReport}
                                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold glass transition-all duration-300 w-full sm:w-auto justify-center"
                                style={{ color: 'var(--color-text)' }}
                            >
                                <Download size={18} className="transition-transform group-hover:-translate-y-0.5" style={{ color: 'var(--color-primary)' }} />
                                Sample Report
                            </button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-x-7 gap-y-3 mt-10">
                            {[
                                { value: 'OWASP', label: 'Standards' },
                                { value: '24h', label: 'Response' },
                                { value: '100%', label: 'Manual' },
                                { value: '5–7d', label: 'Turnaround' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <div className="text-xl md:text-2xl font-bold gradient-text">{stat.value}</div>
                                    <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT: cybersecurity blackhole visual ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
                        className="relative h-[340px] sm:h-[440px] lg:h-[540px] w-full flex items-center justify-center"
                    >
                        <div className="absolute inset-0 z-10 w-full h-full">
                            <HeroSceneErrorBoundary>
                                <Suspense fallback={<BlackHoleFallback />}>
                                    <BlackHoleScene />
                                </Suspense>
                            </HeroSceneErrorBoundary>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
            >
                <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-text-faint)' }}>Scroll</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ChevronDown size={16} style={{ color: 'var(--color-primary)' }} />
                </motion.div>
            </motion.div>
        </section>
    )
}
