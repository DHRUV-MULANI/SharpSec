import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Terminal, AlertTriangle, Shield, CheckCircle } from 'lucide-react'

const stages = [
    {
        id: 'recon', label: 'Reconnaissance', icon: '🔍', color: '#00D4FF',
        duration: 1200,
        logs: [
            '> Initiating passive reconnaissance...',
            '> OSINT gathering: LinkedIn, Shodan, VirusTotal',
            '> Discovered 23 subdomains via DNS enumeration',
            '> Technologies: Nginx 1.18, PHP 8.1, MySQL 8.0',
            '> Email pattern identified: firstname@company.com',
        ]
    },
    {
        id: 'portscan', label: 'Port Scanning', icon: '📡', color: '#7C3AED',
        duration: 1000,
        logs: [
            '> nmap -sS -sV -O --script=default target',
            '> Open: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy',
            '> Service: OpenSSH 7.4 (CVE-2023-38408 detected)',
            '> OS fingerprint: Ubuntu 20.04 LTS',
            '> 4 open ports, 2 filtered, 994 closed',
        ]
    },
    {
        id: 'enum', label: 'Enumeration', icon: '📋', color: '#00FFC8',
        duration: 1100,
        logs: [
            '> Directory brute-force: /admin, /backup, /api/v1',
            '> robots.txt exposes /internal-dashboard',
            '> API endpoints discovered: 47 routes',
            '> JWT tokens found — weak HMAC-SHA1 signing',
            '> Parameter pollution vector identified',
        ]
    },
    {
        id: 'vuln', label: 'Vulnerability Discovery', icon: '🎯', color: '#FF6B35',
        duration: 1300,
        logs: [
            '> SQL Injection: /api/users?id=1 [CRITICAL]',
            '> XSS reflected: /search?q= [HIGH]',
            '> IDOR: /api/v1/user/{id} [HIGH]',
            '> Broken auth: Password reset token weak [HIGH]',
            '> SSRF: /webhook endpoint [MEDIUM]',
        ]
    },
    {
        id: 'exploit', label: 'Exploitation', icon: '⚡', color: '#EF4444',
        duration: 1400,
        logs: [
            '> Exploiting SQL injection via UNION attack...',
            '> Extracted: users table (47,832 records)',
            '> Password hashes: MD5 unsalted — cracking...',
            '> Admin credentials compromised',
            '> Authenticated access to admin panel obtained',
        ]
    },
    {
        id: 'privesc', label: 'Privilege Escalation', icon: '🔑', color: '#EF4444',
        duration: 1000,
        logs: [
            '> Shell obtained via webshell upload',
            '> Enumerating SUID binaries...',
            '> CVE-2021-4034 (PwnKit) — applicable!',
            '> Exploiting pkexec SUID vulnerability...',
            '> ROOT SHELL OBTAINED — full system access',
        ]
    },
    {
        id: 'impact', label: 'Business Impact', icon: '💥', color: '#F59E0B',
        duration: 900,
        logs: [
            '> Customer PII accessible — GDPR breach risk',
            '> Financial data exposed — PCI DSS violation',
            '> Source code repository accessible',
            '> Infrastructure credentials leaked',
            '> Estimated breach cost: $2.4M',
        ]
    },
    {
        id: 'detect', label: 'Detection', icon: '🔔', color: '#00D4FF',
        duration: 800,
        logs: [
            '> Simulating security monitoring analysis...',
            '> SIEM alert triggered at stage 4 (43 min delay)',
            '> Attack surface was exposed for 43 minutes',
            '> No real-time blocking occurred',
            '> Incident response time: >2 hours',
        ]
    },
    {
        id: 'mitigate', label: 'Mitigation Report', icon: '🛡️', color: '#00FFC8',
        duration: 1000,
        logs: [
            '> Parameterized queries eliminate SQL injection',
            '> WAF rules deployed for XSS payloads',
            '> Authorization middleware for IDOR prevention',
            '> HSTS, CSP, X-Frame-Options headers added',
            '> Full remediation guide delivered ✓',
        ]
    },
]

function Terminal_({ logs, active }) {
    const endRef = useRef(null)
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [logs])

    return (
        <div className="glass-strong rounded-xl p-4 font-mono text-xs h-48 overflow-auto">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-gray-500 text-xs ml-2">attack-simulation@cipherguard:~$</span>
            </div>
            {logs.map((log, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className={`mb-1 ${log.includes('CRITICAL') ? 'text-red-400' :
                            log.includes('HIGH') ? 'text-orange-400' :
                                log.includes('ROOT') || log.includes('compromised') ? 'text-red-400' :
                                    log.includes('✓') || log.includes('eliminated') || log.includes('deployed') ? 'text-green-400' :
                                        'text-gray-400'
                        }`}
                >
                    {log}
                </motion.div>
            ))}
            {active && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-cyan-400"
                >
                    ▊
                </motion.span>
            )}
            <div ref={endRef} />
        </div>
    )
}

export default function AttackSimulation() {
    const [running, setRunning] = useState(false)
    const [currentStage, setCurrentStage] = useState(-1)
    const [completedStages, setCompletedStages] = useState([])
    const [logs, setLogs] = useState([])

    const runSimulation = async () => {
        if (running) return
        setRunning(true)
        setCurrentStage(-1)
        setCompletedStages([])
        setLogs([])

        for (let i = 0; i < stages.length; i++) {
            setCurrentStage(i)
            setLogs([])

            // Add logs one by one
            for (let j = 0; j < stages[i].logs.length; j++) {
                await new Promise(r => setTimeout(r, stages[i].duration / stages[i].logs.length))
                setLogs(prev => [...prev, stages[i].logs[j]])
            }

            await new Promise(r => setTimeout(r, 400))
            setCompletedStages(prev => [...prev, i])
        }

        setCurrentStage(-1)
        setRunning(false)
    }

    return (
        <section id="simulation" className="py-24 bg-[#030712] relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/3 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-orange-400/20 mb-6">
                        <AlertTriangle size={12} className="text-orange-400" />
                        <span className="text-xs text-orange-400 uppercase tracking-widest">Educational Only</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Interactive Attack<br />
                        <span className="gradient-text">Simulation</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Watch how a real penetration test unfolds — from reconnaissance to mitigation.
                        This is exactly what we do to protect your business.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Stages Timeline */}
                    <div className="space-y-3">
                        {stages.map((stage, i) => {
                            const isActive = currentStage === i
                            const isDone = completedStages.includes(i)
                            const isPending = !isActive && !isDone

                            return (
                                <motion.div
                                    key={stage.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 }}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${isActive
                                            ? 'glass border-white/15 shadow-lg'
                                            : isDone
                                                ? 'glass border-white/5'
                                                : 'border-transparent opacity-50'
                                        }`}
                                    style={isActive ? { borderColor: `${stage.color}40`, boxShadow: `0 0 20px ${stage.color}10` } : {}}
                                >
                                    {/* Step number/icon */}
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300"
                                        style={{
                                            background: isDone || isActive ? `${stage.color}15` : 'rgba(255,255,255,0.03)',
                                            border: `1px solid ${isDone || isActive ? stage.color + '30' : 'rgba(255,255,255,0.05)'}`,
                                        }}
                                    >
                                        {isDone ? (
                                            <CheckCircle size={16} style={{ color: stage.color }} />
                                        ) : isActive ? (
                                            <motion.span
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                            >
                                                {stage.icon}
                                            </motion.span>
                                        ) : (
                                            <span className="text-sm">{stage.icon}</span>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="font-semibold text-sm"
                                                style={{ color: isDone || isActive ? stage.color : '#6b7280' }}
                                            >
                                                {stage.label}
                                            </span>
                                            <span className="text-xs text-gray-600">{String(i + 1).padStart(2, '0')}</span>
                                        </div>
                                        {isActive && (
                                            <motion.div
                                                initial={{ width: '0%' }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: stage.duration / 1000 }}
                                                className="h-0.5 rounded-full mt-2"
                                                style={{ background: stage.color }}
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Terminal & Controls */}
                    <div className="sticky top-24 space-y-4">
                        <Terminal_ logs={logs} active={running} />

                        {currentStage >= 0 && currentStage < stages.length && (
                            <motion.div
                                key={currentStage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-xl p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-2 h-2 rounded-full animate-pulse-glow"
                                        style={{ background: stages[currentStage].color }}
                                    />
                                    <span className="text-sm font-semibold text-white">
                                        Stage {currentStage + 1}: {stages[currentStage].label}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-auto">Running...</span>
                                </div>
                            </motion.div>
                        )}

                        {!running && completedStages.length === stages.length && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-strong rounded-xl p-6 text-center border border-cyan-400/20"
                            >
                                <Shield size={32} className="text-cyan-400 mx-auto mb-3" />
                                <h3 className="text-white font-bold text-lg mb-2">Simulation Complete</h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    We found 8 critical vulnerabilities. This is why proactive security testing is essential.
                                </p>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-white text-sm font-semibold"
                                >
                                    Protect My Business
                                </a>
                            </motion.div>
                        )}

                        {!running && completedStages.length < stages.length && (
                            <motion.button
                                onClick={runSimulation}
                                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-white relative overflow-hidden group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500" />
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Play size={18} className="relative" />
                                <span className="relative">Launch Simulation</span>
                            </motion.button>
                        )}

                        {!running && completedStages.length === stages.length && (
                            <button
                                onClick={() => { setCompletedStages([]); setCurrentStage(-1); setLogs([]) }}
                                className="w-full py-3 glass rounded-xl text-gray-400 text-sm hover:text-white transition-colors border border-white/5"
                            >
                                Reset Simulation
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
