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
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={size * 0.12} />
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
            <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize={size * 0.14} fontWeight="bold">
                {total}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill="#6b7280" fontSize={size * 0.1}>
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
                    stroke="rgba(255,255,255,0.06)"
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
                <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize={size * 0.18} fontWeight="bold">
                    {value}
                </text>
                <text x={cx} y={cy + 10} textAnchor="middle" fill="#6b7280" fontSize={size * 0.1}>
                    /100
                </text>
            </svg>
            <span className="text-xs text-gray-500 mt-1">{label}</span>
        </div>
    )
}

function BarChart({ data }) {
    const max = Math.max(...data.map(d => d.value))

    return (
        <div className="flex items-end gap-2 h-24">
            {data.map((d, i) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500">{d.value}</span>
                    <motion.div
                        className="w-full rounded-t-md"
                        style={{ background: d.color }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(d.value / max) * 80}px` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    />
                    <span className="text-xs text-gray-600">{d.label}</span>
                </div>
            ))}
        </div>
    )
}

const vulnData = [
    { label: 'Critical', value: 4, color: '#EF4444' },
    { label: 'High', value: 11, color: '#F97316' },
    { label: 'Medium', value: 18, color: '#F59E0B' },
    { label: 'Low', value: 9, color: '#6B7280' },
]

const monthlyData = [
    { label: 'Jan', value: 12, color: '#00D4FF' },
    { label: 'Feb', value: 19, color: '#00D4FF' },
    { label: 'Mar', value: 8, color: '#00D4FF' },
    { label: 'Apr', value: 24, color: '#7C3AED' },
    { label: 'May', value: 15, color: '#00D4FF' },
    { label: 'Jun', value: 6, color: '#00FFC8' },
]

export default function Dashboard() {
    return (
        <section id="dashboard" className="py-24 bg-[#030712] relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-15" />
            <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-cyan-500/4 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-cyan-400/20 mb-6">
                        <BarChart3 size={12} className="text-cyan-400" />
                        <span className="text-xs text-cyan-400 uppercase tracking-widest">Security Dashboard</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Real-Time Security<br />
                        <span className="gradient-text">Visibility & Insights</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        After every assessment, you get access to your private security dashboard
                        with live tracking of vulnerabilities, compliance posture, and risk score.
                    </p>
                </motion.div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-strong rounded-3xl p-1 border border-white/5"
                >
                    {/* Window chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        <div className="flex-1 flex justify-center">
                            <div className="px-16 py-1 glass rounded-md text-xs text-gray-500">
                                security.cipherguard.io/dashboard
                            </div>
                        </div>
                    </div>

                    <div className="p-4 md:p-6">
                        {/* Top metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {[
                                { label: 'Risk Score', value: '67', change: '-12', good: true, icon: AlertTriangle, color: '#F59E0B' },
                                { label: 'Compliance', value: '82%', change: '+8%', good: true, icon: Shield, color: '#00FFC8' },
                                { label: 'Open Vulns', value: '42', change: '-7', good: true, icon: AlertTriangle, color: '#EF4444' },
                                { label: 'Security Posture', value: 'B+', change: 'Improving', good: true, icon: TrendingUp, color: '#00D4FF' },
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
                                            <span className="text-xs text-gray-500">{metric.label}</span>
                                            <Icon size={14} style={{ color: metric.color }} />
                                        </div>
                                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                                        <div className={`text-xs mt-1 ${metric.good ? 'text-green-400' : 'text-red-400'}`}>
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
                                <h4 className="text-sm text-gray-400 mb-4 font-medium">Vulnerability Distribution</h4>
                                <div className="flex items-center gap-4">
                                    <DonutChart segments={vulnData} size={110} />
                                    <div className="space-y-2">
                                        {vulnData.map((d) => (
                                            <div key={d.label} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                                <span className="text-xs text-gray-500">{d.label}</span>
                                                <span className="text-xs text-white ml-auto">{d.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Gauge charts */}
                            <div className="glass rounded-xl p-4">
                                <h4 className="text-sm text-gray-400 mb-4 font-medium">Compliance Scores</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    <GaugeChart value={82} label="ISO 27001" color="#00D4FF" size={80} />
                                    <GaugeChart value={71} label="PCI DSS" color="#7C3AED" size={80} />
                                    <GaugeChart value={89} label="SOC 2" color="#00FFC8" size={80} />
                                </div>
                            </div>

                            {/* Bar chart */}
                            <div className="glass rounded-xl p-4">
                                <h4 className="text-sm text-gray-400 mb-4 font-medium">Monthly Findings</h4>
                                <BarChart data={monthlyData} />
                            </div>
                        </div>

                        {/* Activity feed */}
                        <div className="glass rounded-xl p-4 mt-4">
                            <h4 className="text-sm text-gray-400 mb-3 font-medium">Recent Activity</h4>
                            <div className="space-y-2">
                                {[
                                    { text: 'Critical vulnerability patched: SQL Injection in /api/auth', time: '2h ago', color: '#00FFC8' },
                                    { text: 'High risk: Broken access control confirmed in user module', time: '5h ago', color: '#F97316' },
                                    { text: 'New assessment started: External Attack Surface Review', time: '1d ago', color: '#00D4FF' },
                                    { text: 'Compliance report generated: ISO 27001 Gap Analysis', time: '2d ago', color: '#7C3AED' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 py-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                                        <span className="text-xs text-gray-400 flex-1">{item.text}</span>
                                        <span className="text-xs text-gray-600 flex-shrink-0">{item.time}</span>
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
