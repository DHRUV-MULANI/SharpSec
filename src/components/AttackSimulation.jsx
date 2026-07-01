import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, AlertTriangle, Shield, CheckCircle } from 'lucide-react'

const ORANGE = '#EA580C'
const RUST = '#B45309'
const AMBER = '#F59E0B'
const DEEP = '#C2410C'

const stages = [
    { id: 'recon', label: 'Reconnaissance', icon: '🔍', color: ORANGE, duration: 1200, logs: ['> Initiating passive reconnaissance...', '> OSINT gathering: LinkedIn, Shodan, VirusTotal', '> Discovered 23 subdomains via DNS enumeration', '> Technologies: Nginx 1.18, PHP 8.1, MySQL 8.0', '> Email pattern identified: firstname@company.com'] },
    { id: 'portscan', label: 'Port Scanning', icon: '📡', color: RUST, duration: 1000, logs: ['> nmap -sS -sV -O --script=default target', '> Open: 22/SSH, 80/HTTP, 443/HTTPS, 8080/HTTP-Proxy', '> Service: OpenSSH 7.4 (CVE-2023-38408 detected)', '> OS fingerprint: Ubuntu 20.04 LTS', '> 4 open ports, 2 filtered, 994 closed'] },
    { id: 'enum', label: 'Enumeration', icon: '📋', color: AMBER, duration: 1100, logs: ['> Directory brute-force: /admin, /backup, /api/v1', '> robots.txt exposes /internal-dashboard', '> API endpoints discovered: 47 routes', '> JWT tokens found — weak HMAC-SHA1 signing', '> Parameter pollution vector identified'] },
    { id: 'vuln', label: 'Vulnerability Discovery', icon: '🎯', color: DEEP, duration: 1300, logs: ['> SQL Injection: /api/users?id=1 [CRITICAL]', '> XSS reflected: /search?q= [HIGH]', '> IDOR: /api/v1/user/{id} [HIGH]', '> Broken auth: Password reset token weak [HIGH]', '> SSRF: /webhook endpoint [MEDIUM]'] },
    { id: 'exploit', label: 'Exploitation', icon: '⚡', color: DEEP, duration: 1400, logs: ['> Exploiting SQL injection via UNION attack...', '> Extracted: users table (47,832 records)', '> Password hashes: MD5 unsalted — cracking...', '> Admin credentials compromised', '> Authenticated access to admin panel obtained'] },
    { id: 'privesc', label: 'Privilege Escalation', icon: '🔑', color: DEEP, duration: 1000, logs: ['> Shell obtained via webshell upload', '> Enumerating SUID binaries...', '> CVE-2021-4034 (PwnKit) — applicable!', '> Exploiting pkexec SUID vulnerability...', '> ROOT SHELL OBTAINED — full system access'] },
    { id: 'impact', label: 'Business Impact', icon: '💥', color: AMBER, duration: 900, logs: ['> Customer PII accessible — GDPR breach risk', '> Financial data exposed — PCI DSS violation', '> Source code repository accessible', '> Infrastructure credentials leaked', '> Estimated breach cost: $2.4M'] },
    { id: 'detect', label: 'Detection', icon: '🔔', color: ORANGE, duration: 800, logs: ['> Simulating security monitoring analysis...', '> SIEM alert triggered at stage 4 (43 min delay)', '> Attack surface was exposed for 43 minutes', '> No real-time blocking occurred', '> Incident response time: >2 hours'] },
    { id: 'mitigate', label: 'Mitigation Report', icon: '🛡️', color: RUST, duration: 1000, logs: ['> Parameterized queries eliminate SQL injection', '> WAF rules deployed for XSS payloads', '> Authorization middleware for IDOR prevention', '> HSTS, CSP, X-Frame-Options headers added', '> Full remediation guide delivered ✓'] },
]

function TerminalView({ logs, active }) {
    const containerRef = useRef(null)
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [logs])

    return (
        <div className="rounded-xl overflow-hidden" style={{ background: '#1A0F06', border: `1px solid rgba(234,88,12,0.2)` }}>
            <div className="flex items-center gap-2 px-4 py-2" style={{ background: '#2A1B0E', borderBottom: '1px solid rgba(234,88,12,0.15)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: DEEP }} />
                <div className="w-2 h-2 rounded-full" style={{ background: AMBER }} />
                <div className="w-2 h-2 rounded-full" style={{ background: RUST }} />
                <span className="ml-2 font-mono text-xs" style={{ color: 'rgba(245,158,11,0.7)' }}>attack-simulation@evolutesec:~$</span>
            </div>
            <div ref={containerRef} className="p-4 font-mono text-xs h-40 overflow-auto" style={{ color: 'rgba(251,247,240,0.75)' }}>
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        style={{
                            color: log.includes('CRITICAL') ? '#EF4444' :
                                log.includes('HIGH') ? ORANGE :
                                log.includes('ROOT') || log.includes('compromised') ? '#EF4444' :
                                log.includes('✓') || log.includes('eliminated') || log.includes('deployed') ? AMBER :
                                'rgba(251,247,240,0.6)'
                        }}
                        className="mb-1"
                    >
                        {log}
                    </motion.div>
                ))}
                {active && (
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        style={{ color: ORANGE }}
                    >
                        ▊
                    </motion.span>
                )}
            </div>
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
        <section id="simulation" className="py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="absolute inset-0 cyber-grid opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(234, 88, 12, 0.05)' }} />

            <div className="max-w-5xl mx-auto px-5 sm:px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <AlertTriangle size={12} style={{ color: ORANGE }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Educational Only</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Interactive Attack <span className="gradient-text">Simulation</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-sm" style={{ color: 'var(--color-text-soft)' }}>
                        Watch how a real penetration test unfolds — from reconnaissance to mitigation.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-5 items-start">
                    {/* Compact Stages Timeline */}
                    <div className="space-y-1.5">
                        {stages.map((stage, i) => {
                            const isActive = currentStage === i
                            const isDone = completedStages.includes(i)

                            return (
                                <motion.div
                                    key={stage.id}
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.03 }}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-500"
                                    style={{
                                        background: isActive ? 'var(--color-card-tint)' : 'transparent',
                                        border: `1px solid ${isActive ? `${stage.color}35` : isDone ? 'var(--color-border)' : 'transparent'}`,
                                        opacity: (!isActive && !isDone) ? 0.45 : 1,
                                    }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 transition-all duration-300"
                                        style={{
                                            background: isDone || isActive ? `${stage.color}15` : 'rgba(74,44,18,0.05)',
                                            border: `1px solid ${isDone || isActive ? stage.color + '35' : 'var(--color-border)'}`,
                                        }}
                                    >
                                        {isDone ? (
                                            <CheckCircle size={14} style={{ color: stage.color }} />
                                        ) : (
                                            <span className="text-xs">{stage.icon}</span>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <span className="font-medium text-xs" style={{ color: isDone || isActive ? stage.color : 'var(--color-text-faint)' }}>
                                            {stage.label}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                initial={{ width: '0%' }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: stage.duration / 1000 }}
                                                className="h-0.5 rounded-full mt-1"
                                                style={{ background: stage.color }}
                                            />
                                        )}
                                    </div>

                                    <span className="text-[10px] font-mono flex-shrink-0" style={{ color: 'var(--color-text-faint)' }}>{String(i + 1).padStart(2, '0')}</span>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Terminal & Controls */}
                    <div className="space-y-3">
                        <TerminalView logs={logs} active={running} />

                        {/* Status indicator */}
                        {currentStage >= 0 && currentStage < stages.length && (
                            <motion.div
                                key={currentStage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-lg px-4 py-2.5 flex items-center gap-2"
                            >
                                <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: stages[currentStage].color }} />
                                <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>
                                    Stage {currentStage + 1}: {stages[currentStage].label}
                                </span>
                            </motion.div>
                        )}

                        {/* Complete message */}
                        {!running && completedStages.length === stages.length && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-strong rounded-xl p-5 text-center"
                                style={{ borderColor: 'rgba(234,88,12,0.25)' }}
                            >
                                <Shield size={28} style={{ color: ORANGE }} className="mx-auto mb-2" />
                                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--color-text)' }}>Simulation Complete</h3>
                                <p className="text-xs mb-3" style={{ color: 'var(--color-text-soft)' }}>
                                    We found 8 critical vulnerabilities. Proactive security testing is essential.
                                </p>
                                <a
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 btn-primary rounded-xl text-white text-sm font-semibold"
                                >
                                    Protect My Business
                                </a>
                            </motion.div>
                        )}

                        {/* Launch / Reset */}
                        {!running && completedStages.length < stages.length && (
                            <motion.button
                                onClick={runSimulation}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white relative overflow-hidden group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ background: `linear-gradient(135deg, ${DEEP}, ${ORANGE})` }}
                            >
                                <Play size={16} />
                                Launch Simulation
                            </motion.button>
                        )}

                        {!running && completedStages.length === stages.length && (
                            <button
                                onClick={() => { setCompletedStages([]); setCurrentStage(-1); setLogs([]) }}
                                className="w-full py-2.5 glass rounded-xl text-xs transition-colors"
                                style={{ color: 'var(--color-text-soft)' }}
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
