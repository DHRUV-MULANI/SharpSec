import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { X, Download, CheckCircle, Loader, FileText } from 'lucide-react'
import { EMAILJS_CONFIG } from '../utils/emailjs'

const DOWNLOAD_TEMPLATE =
    import.meta.env.VITE_EMAILJS_TEMPLATE_DOWNLOAD_ID || EMAILJS_CONFIG.templateId

const services = ['Web Application VAPT', 'Mobile App VAPT', 'Cloud Security', 'Network Pentest', 'Red Team', 'Compliance', 'Other']

const EMPTY = { name: '', company: '', email: '', service: '' }

export default function DownloadModal({ onClose }) {
    const [form, setForm] = useState(EMPTY)
    const [status, setStatus] = useState('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')

        const templateParams = {
            from_name: form.name,
            company: form.company || '—',
            reply_to: form.email,
            phone: '—',
            website: '—',
            industry: '—',
            service: form.service || '—',
            message: '—',
            need_nda: 'No',
            urgent: 'No',
            need_sample: 'Yes — Download request',
            employees: '—',
            country: '—',
            budget: '—',
            timeline: '—',
            sent_at: new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
        }

        try {
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                DOWNLOAD_TEMPLATE,
                templateParams,
                { publicKey: EMAILJS_CONFIG.publicKey, privateKey: EMAILJS_CONFIG.privateKey },
            )
            setStatus('success')

            setTimeout(() => {
                const link = document.createElement('a')
                link.href = '/sample-report.pdf'
                link.download = 'CipherGuard-Sample-Report.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                setTimeout(onClose, 2500)
            }, 800)
        } catch (err) {
            console.error('EmailJS error:', err)
            setErrorMsg(err?.text || 'Could not send. Please email security@cipherguard.io')
            setStatus('error')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0" style={{ background: 'rgba(42, 27, 14, 0.6)', backdropFilter: 'blur(6px)' }} />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', bounce: 0.2 }}
                className="relative glass-strong rounded-3xl w-full max-w-md overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 sm:p-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'rgba(234,88,12,0.12)', border: '1px solid rgba(234,88,12,0.25)' }}>
                            <FileText size={18} style={{ color: '#EA580C' }} />
                        </div>
                        <div>
                            <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>Download Sample Report</h3>
                            <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Free — no spam, ever</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ color: 'var(--color-text-soft)' }}>
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5 sm:p-6">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                    style={{ background: 'rgba(234,88,12,0.12)', border: '1px solid rgba(234,88,12,0.3)' }}
                                >
                                    <CheckCircle size={28} style={{ color: '#EA580C' }} />
                                </motion.div>
                                <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--color-text)' }}>Download Starting…</h4>
                                <p className="text-sm" style={{ color: 'var(--color-text-soft)' }}>
                                    Your sample report is downloading. We've also sent a copy to&nbsp;
                                    <span style={{ color: 'var(--color-primary)' }}>{form.email}</span>.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: 'Full Name', name: 'name', required: true },
                                        { label: 'Company', name: 'company', required: false },
                                    ].map((f) => (
                                        <div key={f.name}>
                                            <label className="block text-xs font-medium mb-1" htmlFor={`dl-${f.name}`} style={{ color: 'var(--color-text-soft)' }}>
                                                {f.label} {f.required && <span style={{ color: 'var(--color-primary)' }}>*</span>}
                                            </label>
                                            <input
                                                id={`dl-${f.name}`}
                                                type="text"
                                                name={f.name}
                                                value={form[f.name]}
                                                onChange={handleChange}
                                                required={f.required}
                                                className="w-full px-3 py-2.5 rounded-xl text-sm transition-all"
                                                style={{
                                                    color: 'var(--color-text)',
                                                    background: 'var(--color-bg)',
                                                    border: '1px solid var(--color-border-strong)',
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium mb-1" htmlFor="dl-email" style={{ color: 'var(--color-text-soft)' }}>
                                        Email <span style={{ color: 'var(--color-primary)' }}>*</span>
                                    </label>
                                    <input
                                        id="dl-email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="you@company.com"
                                        className="w-full px-3 py-2.5 rounded-xl text-sm transition-all"
                                        style={{
                                            color: 'var(--color-text)',
                                            background: 'var(--color-bg)',
                                            border: '1px solid var(--color-border-strong)',
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium mb-1" htmlFor="dl-service" style={{ color: 'var(--color-text-soft)' }}>Service Interested</label>
                                    <select
                                        id="dl-service"
                                        name="service"
                                        value={form.service}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2.5 rounded-xl text-sm transition-all appearance-none"
                                        style={{
                                            color: 'var(--color-text)',
                                            background: 'var(--color-bg)',
                                            border: '1px solid var(--color-border-strong)',
                                        }}
                                    >
                                        <option value="">Select…</option>
                                        {services.map((s) => <option key={s} value={s} style={{ background: '#FBF7F0' }}>{s}</option>)}
                                    </select>
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-start gap-2 text-sm p-3 glass rounded-xl" style={{ color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' }}>
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white relative overflow-hidden group disabled:opacity-70"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div className="absolute inset-0 btn-primary" />
                                    <span className="absolute inset-0 btn-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {status === 'loading' ? (
                                        <Loader size={16} className="relative animate-spin" />
                                    ) : (
                                        <>
                                            <span className="relative">Download Sample Report</span>
                                            <Download size={16} className="relative" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    )
}
