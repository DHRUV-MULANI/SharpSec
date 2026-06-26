import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { X, Download, CheckCircle, Loader, FileText } from 'lucide-react'
import { EMAILJS_CONFIG } from '../utils/emailjs'

// Use a SECOND template for the download request — or reuse the same one.
// If you want to reuse the same template, just keep EMAILJS_CONFIG.templateId.
// To use a separate "sample report request" template, set VITE_EMAILJS_TEMPLATE_DOWNLOAD_ID.
const DOWNLOAD_TEMPLATE =
    import.meta.env.VITE_EMAILJS_TEMPLATE_DOWNLOAD_ID || EMAILJS_CONFIG.templateId

const industries = ['Technology', 'Financial Services', 'Healthcare', 'E-Commerce', 'Other']
const services = ['Web Application VAPT', 'Mobile App VAPT', 'Cloud Security', 'Network Pentest', 'Red Team', 'Compliance', 'Other']

const EMPTY = { name: '', company: '', email: '', phone: '', website: '', industry: '', service: '', message: '' }

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
            company: form.company,
            reply_to: form.email,
            phone: form.phone || '—',
            website: form.website || '—',
            industry: form.industry || '—',
            service: form.service || '—',
            message: form.message || '—',
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
                {
                    publicKey: EMAILJS_CONFIG.publicKey,
                    privateKey: EMAILJS_CONFIG.privateKey,
                },
            )
            setStatus('success')

            // Trigger the PDF download
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
            setErrorMsg(
                err?.text || 'Could not send. Please email us at security@cipherguard.io'
            )
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
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', bounce: 0.2 }}
                className="relative glass-strong rounded-3xl w-full max-w-lg border border-white/5 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20
                            flex items-center justify-center">
                            <FileText size={18} className="text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Download Sample Report</h3>
                            <p className="text-xs text-gray-500">Free — no spam, ever</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            /* ── Success ── */
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
                                    className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/30
                             flex items-center justify-center mx-auto mb-4"
                                >
                                    <CheckCircle size={28} className="text-cyan-400" />
                                </motion.div>
                                <h4 className="text-white font-bold text-lg mb-2">Download Starting…</h4>
                                <p className="text-gray-400 text-sm">
                                    Your sample report is downloading. We've also sent you a copy to&nbsp;
                                    <span className="text-cyan-400">{form.email}</span>.
                                </p>
                            </motion.div>
                        ) : (
                            /* ── Form ── */
                            <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: 'Full Name', name: 'name', required: true },
                                        { label: 'Company', name: 'company', required: true },
                                    ].map((f) => (
                                        <div key={f.name}>
                                            <label className="block text-xs text-gray-400 mb-1" htmlFor={f.name}>
                                                {f.label} {f.required && <span className="text-cyan-400">*</span>}
                                            </label>
                                            <input
                                                id={f.name}
                                                type="text"
                                                name={f.name}
                                                value={form[f.name]}
                                                onChange={handleChange}
                                                required={f.required}
                                                className="w-full px-3 py-2.5 rounded-xl text-white text-sm
                                   border border-white/5 focus:border-cyan-400/30 focus:outline-none
                                   transition-all"
                                                style={{ background: 'rgba(17,24,39,0.8)' }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1" htmlFor="dl-email">
                                        Email <span className="text-cyan-400">*</span>
                                    </label>
                                    <input
                                        id="dl-email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="you@company.com"
                                        className="w-full px-3 py-2.5 rounded-xl text-white text-sm
                               border border-white/5 focus:border-cyan-400/30 focus:outline-none
                               transition-all"
                                        style={{ background: 'rgba(17,24,39,0.8)' }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1" htmlFor="dl-phone">Phone</label>
                                        <input
                                            id="dl-phone"
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="+1 555 000 0000"
                                            className="w-full px-3 py-2.5 rounded-xl text-white text-sm
                                 border border-white/5 focus:border-cyan-400/30 focus:outline-none transition-all"
                                            style={{ background: 'rgba(17,24,39,0.8)' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1" htmlFor="dl-website">Website</label>
                                        <input
                                            id="dl-website"
                                            type="text"
                                            name="website"
                                            value={form.website}
                                            onChange={handleChange}
                                            placeholder="https://…"
                                            className="w-full px-3 py-2.5 rounded-xl text-white text-sm
                                 border border-white/5 focus:border-cyan-400/30 focus:outline-none transition-all"
                                            style={{ background: 'rgba(17,24,39,0.8)' }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1" htmlFor="dl-industry">Industry</label>
                                        <select
                                            id="dl-industry"
                                            name="industry"
                                            value={form.industry}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 rounded-xl text-white text-sm
                                 border border-white/5 focus:border-cyan-400/30 focus:outline-none transition-all"
                                            style={{ background: 'rgba(17,24,39,0.8)' }}
                                        >
                                            <option value="">Select…</option>
                                            {industries.map((i) => <option key={i} value={i} className="bg-gray-900">{i}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1" htmlFor="dl-service">Service Interested</label>
                                        <select
                                            id="dl-service"
                                            name="service"
                                            value={form.service}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 rounded-xl text-white text-sm
                                 border border-white/5 focus:border-cyan-400/30 focus:outline-none transition-all"
                                            style={{ background: 'rgba(17,24,39,0.8)' }}
                                        >
                                            <option value="">Select…</option>
                                            {services.map((s) => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-400 mb-1" htmlFor="dl-message">Message (optional)</label>
                                    <textarea
                                        id="dl-message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="Any specific requirements or questions…"
                                        className="w-full px-3 py-2.5 rounded-xl text-white text-sm
                               border border-white/5 focus:border-cyan-400/30 focus:outline-none
                               transition-all resize-none"
                                        style={{ background: 'rgba(17,24,39,0.8)' }}
                                    />
                                </div>

                                {/* Error */}
                                {status === 'error' && (
                                    <div className="flex items-start gap-2 text-red-400 text-sm p-3 glass
                                  rounded-xl border border-red-400/20">
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                             font-semibold text-white relative overflow-hidden group disabled:opacity-70"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500
                                  opacity-0 group-hover:opacity-100 transition-opacity" />
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
