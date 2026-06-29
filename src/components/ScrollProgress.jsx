import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-0.5 z-[60] origin-left"
            style={{
                scaleX: scrollYProgress,
                background: 'linear-gradient(90deg, #EA580C, #B45309, #F59E0B)'
            }}
        />
    )
}
