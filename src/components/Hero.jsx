import { useRef, useEffect, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, ChevronDown, Play } from 'lucide-react'

const HeroScene = lazy(() => import('./HeroScene'))

const words = ['Attackers', 'Hackers', 'Threats', 'Breaches']

export default function Hero({ onDownloadReport }) {
    const mousePos = useRef({ x: 0, y: 0 })
    const scrollY = useRef(0)
    const [wordIndex, setWordIndex] = useState(0)
    const [displayWord, setDisplayWord] = useState(words[0])

    useEffect(() => {
        const handleMouse = (e) => {
            mousePos.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: -(e.clientY / window.innerHeight - 0.5) * 2
            }
        }
        const handleScroll = () => { scrollY.current = window.scrollY }
        window.addEventListener('mousemove', handleMouse)
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('mousemove', handleMouse)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        setDisplayWord(words[wordIndex])
    }, [wordIndex])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
    }
    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]">
            {/* 3D Scene */}
            <Suspense fallback={null}>
                <HeroScene mousePos={mousePos} scrollY={scrollY} />
            </Suspense>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-transparent to-[#030712]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/60 via-transparent to-[#030712]/60" />

            {/* Cyber grid overlay */}
            <div className="absolute inset-0 cyber-grid opacity-30" />

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Badge */}
                <motion.div variants={itemVariants} className="flex justify-center mb-8">
                    <div className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-cyan-400/20">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-glow" />
                        <span className="text-xs text-cyan-400 font-medium tracking-widest uppercase">
                            Enterprise Security Intelligence
                        </span>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                    <span className="text-white">Protect Your Business</span>
                    <br />
                    <span className="text-white">Before </span>
                    <span className="relative inline-block">
                        <motion.span
                            key={displayWord}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="gradient-text glow-text-blue"
                        >
                            {displayWord}
                        </motion.span>
                    </span>
                    <br />
                    <span className="text-white">Find the Weakness.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Enterprise-grade security assessments, VAPT, compliance audits, red teaming,
                    cloud security, API testing, and secure code reviews — delivered by elite security engineers.
                </motion.p>

                {/* Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#contact"
                        className="group relative flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600" />
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 glow-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative">Book Free Consultation</span>
                        <ArrowRight size={18} className="relative transition-transform group-hover:translate-x-1" />
                    </a>

                    <button
                        onClick={onDownloadReport}
                        className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-300 glass hover:text-white transition-all duration-300 border border-white/10 hover:border-cyan-400/30"
                    >
                        <Download size={18} className="transition-transform group-hover:-translate-y-0.5" />
                        Download Sample Report
                    </button>
                </motion.div>

                {/* Stats row */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-8 mt-16">
                    {[
                        { value: '500+', label: 'Assessments Done' },
                        { value: '99%', label: 'Client Satisfaction' },
                        { value: '1000+', label: 'Critical Bugs Fixed' },
                        { value: '24h', label: 'Initial Response' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ChevronDown size={16} className="text-gray-600" />
                </motion.div>
            </motion.div>

            {/* Scan line effect */}
            <div className="absolute inset-0 scan-line pointer-events-none opacity-30" />
        </section>
    )
}
