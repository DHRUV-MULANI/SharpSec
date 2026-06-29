import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Shield, TrendingUp, AlertTriangle } from 'lucide-react'

function DonutChart({ segments, size = 120 }) {
    const total = segments.reduce((a, b) => a + b.value, 0)
    let offset = 0
    const cx = size / 2, cy = size / 2
    const r = size * 0.38
    const circumference = 2 * Math.PI * r

    const paths = segments.map((seg) => {
        const pct = seg.value / total
        const dash = pct * circumference
        const gap = circumference - dash
        const rotation = (offset / total) * 360 - 90
        offset += seg.value
        return { ...seg, dash, gap, rotation }
    })

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(74,44,18,0.08)" strokeWidth={size * 0.12} />
            {paths.map((p, i) => (
                <motion.circle
                    key={p.label}
                    cx={cx} cy={cy} r={r}
                    fill="none"
                    stroke={p.color}
                    strokeWidth={size * 0.12}
                    strokeDasharray={`${p.dash} ${p.gap}`}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    whileInView={{ strokeDasharray: `${p.dash} ${p.gap}` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 1, ease: 'easeOut' }}
                    transform={`rotate(${p.rotation} ${cx} ${cy})`}
                />
            ))}
            <text x={cx} y={cy - 6} textAnchor="middle" fill="#2A1B0E" fontSize={size * 0.14} fontWeight="bold">
                {total}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill="#9C8674" fontSize={size * 0.1}>
                Issues
            </text>
        </svg>
    )
}

function GaugeChart({ value, label, color, size = 100 }) {
    const r = size * 0.38
    const cx = size / 2, cy = size * 0.6
    const circumference = Math.PI * r

    return (
        <div className="flex flex-col items-center">
            <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
                <path
                    d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                    fill="none"
                    stroke="rgba(74,44,18,0.08)"
                    strokeWidth={size * 0.1}
                    strokeLinecap="round"
                />
                <motion.path
                    d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={size * 0.1}
                    strokeLinecap="round"
                    strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    whileInView={{ strokeDasharray: `${(value / 100) * circumference} ${circumference}` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                />
                <text x={cx} y={cy - 4} textAnchor="middle" fill="#2A1B0E" fontSize={size * 0.18} fontWeight="bold">
                    {value}
                </text>
                <text x={cx} y={cy + 10} textAnchor="middle" fill="#9C8674" fontSize={size * 0.1}>
                    /100
                </text>
            </svg>
            <span className="text-xs mt-1" style={{ color: 'var(--color-text-faint)' }}>{label}</span>
        </div>
    )
}

function BarChart({ data }) {
    const max = Math.max(...data.map(d => d.value))

    return (
        <div className="flex items-end gap-2 h-24">
            {data.map((d, i) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{d.value}</span>
                    <motion.div
                        className="w-full rounded-t-md"
                        style={{ background: d.color }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(d.value / max) * 80}px` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    />
                    <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{d.label}</span>
                </div>
            ))}
        </div>
    )
}

const vulnData = [
    { label: 'Critical', value: 4, color: '#C2410C' },
    { label: 'High', value: 11, color: '#EA580C' },
    { label: 'Medium', value: 18, color: '#F59E0B' },
    { label: 'Low', value: 9, color: '#B45309' },
]

const monthlyData = [
    { label: 'Jan', value: 12, color: '#EA580C' },
    { label: 'Feb', value: 19, color: '#EA580C' },
    { label: 'Mar', value: 8, color: '#B45309' },
    { label: 'Apr', value: 24, color: '#F59E0B' },
    { label: 'May', value: 15, color: '#EA580C' },
    { label: 'Jun', value: 6, color: '#B45309' },
]

export default function Dashboard() {
    return (
        <section id="dashboard" className="py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="absolute inset-0 cyber-grid opacity-30" />
            <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(234, 88, 12, 0.05)' }} />

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
                        <BarChart3 size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Security Dashboard</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Real-Time Security<br />
                        <span className="gradient-text">Visibility & Insights</span>
                    </h2>
                    <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-text-soft)' }}>
                        After every assessment, you get access to your private security dashboard
                        with live tracking of vulnerabilities, compliance posture, and risk score.
                    </p>
                </motion.div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-strong rounded-3xl p-1"
                >
                    {/* Window chrome */}
                    <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <div className="w-3 h-3 rounded-full" style={{ background: '#C2410C' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#B45309' }} />
                        <div className="flex-1 flex justify-center">
                            <div className="px-6 sm:px-16 py-1 glass rounded-md text-xs" style={{ color: 'var(--color-text-faint)' }}>
                                security.cipherguard.io/dashboard
                            </div>
                        </div>
                    </div>

                    <div className="p-4 md:p-6">
                        {/* Top metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {[
                                { label: 'Risk Score', value: '67', change: '-12', good: true, icon: AlertTriangle, color: '#F59E0B' },
                                { label: 'Compliance', value: '82%', change: '+8%', good: true, icon: Shield, color: '#B45309' },
                                { label: 'Open Vulns', value: '42', change: '-7', good: true, icon: AlertTriangle, color: '#C2410C' },
                                { label: 'Security Posture', value: 'B+', change: 'Improving', good: true, icon: TrendingUp, color: '#EA580C' },
                            ].map((metric, i) => {
                                const Icon = metric.icon
                                return (
                                    <motion.div
                                        key={metric.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="glass rounded-xl p-4"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{metric.label}</span>
                                            <Icon size={14} style={{ color: metric.color }} />
                                        </div>
                                        <div className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{metric.value}</div>
                                        <div className="text-xs mt-1" style={{ color: metric.good ? '#16a34a' : '#dc2626' }}>
                                            {metric.change} vs last month
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Charts row */}
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Donut chart */}
                            <div className="glass rounded-xl p-4">
                                <h4 className="text-sm mb-4 font-medium" style={{ color: 'var(--color-text-soft)' }}>Vulnerability Distribution</h4>
                                <div className="flex items-center gap-4">
                                    <DonutChart segments={vulnData} size={110} />
                                    <div className="space-y-2">
                                        {vulnData.map((d) => (
                                            <div key={d.label} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                                <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{d.label}</span>
                                                <span className="text-xs ml-auto" style={{ color: 'var(--color-text)' }}>{d.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Gauge charts */}
                            <div className="glass rounded-xl p-4">
                                <h4 className="text-sm mb-4 font-medium" style={{ color: 'var(--color-text-soft)' }}>Compliance Scores</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    <GaugeChart value={82} label="ISO 27001" color="#EA580C" size={80} />
                                    <GaugeChart value={71} label="PCI DSS" color="#B45309" size={80} />
                                    <GaugeChart value={89} label="SOC 2" color="#F59E0B" size={80} />
                                </div>
                            </div>

                            {/* Bar chart */}
                            <div className="glass rounded-xl p-4">
                                <h4 className="text-sm mb-4 font-medium" style={{ color: 'var(--color-text-soft)' }}>Monthly Findings</h4>
                                <BarChart data={monthlyData} />
                            </div>
                        </div>

                        {/* Activity feed */}
                        <div className="glass rounded-xl p-4 mt-4">
                            <h4 className="text-sm mb-3 font-medium" style={{ color: 'var(--color-text-soft)' }}>Recent Activity</h4>
                            <div className="space-y-2">
                                {[
                                    { text: 'Critical vulnerability patched: SQL Injection in /api/auth', time: '2h ago', color: '#B45309' },
                                    { text: 'High risk: Broken access control confirmed in user module', time: '5h ago', color: '#EA580C' },
                                    { text: 'New assessment started: External Attack Surface Review', time: '1d ago', color: '#F59E0B' },
                                    { text: 'Compliance report generated: ISO 27001 Gap Analysis', time: '2d ago', color: '#C2410C' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 py-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                                        <span className="text-xs flex-1" style={{ color: 'var(--color-text-soft)' }}>{item.text}</span>
                                        <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-text-faint)' }}>{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
