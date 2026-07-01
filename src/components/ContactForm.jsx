import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { EMAILJS_CONFIG } from '../utils/emailjs'

const services = [
    'Web Application VAPT', 'Mobile App VAPT', 'API Security Testing',
    'Cloud Security', 'Network Pentest', 'Red Team Assessment',
    'ISO 27001', 'SOC 2', 'PCI DSS', 'Source Code Review', 'Other',
]

const EMPTY = { name: '', email: '', service: '', message: '' }

export default function ContactForm() {
    const [form, setForm] = useState(EMPTY)
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('')
    const formRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')

        const templateParams = {
            from_name: form.name,
            company: '—',
            reply_to: form.email,
            phone: '—',
            website: '—',
            country: '—',
            employees: '—',
            industry: '—',
            service: form.service || '—',
            budget: '—',
            timeline: '—',
            need_nda: 'No',
            urgent: 'No',
            need_sample: 'No',
            message: form.message || '—',
            sent_at: new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
        }

        try {
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams,
                { publicKey: EMAILJS_CONFIG.publicKey, privateKey: EMAILJS_CONFIG.privateKey },
            )
            setStatus('success')
            setForm(EMPTY)
        } catch (err) {
            console.error('EmailJS error:', err)
            setErrorMsg(err?.text || 'Could not send. Please try again or email security@evolutesec.io')
            setStatus('error')
        }
    }

    return (
        <section id="contact" className="py-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
            <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(234, 88, 12, 0.05)' }} />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(180, 83, 9, 0.05)' }} />

            <div className="max-w-xl mx-auto px-5 sm:px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
                        style={{ borderColor: 'rgba(234,88,12,0.25)' }}>
                        <Send size={12} style={{ color: '#EA580C' }} />
                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-primary-deep)' }}>Get Started</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Ready to Secure<br />
                        <span className="gradient-text">Your Business?</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-soft)' }}>
                        Fill out the form below and our security team will reach out within&nbsp;24&nbsp;hours.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-strong rounded-3xl p-6 sm:p-8"
                >
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', bounce: 0.5 }}
                                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                                    style={{ background: 'rgba(234,88,12,0.12)', border: '1px solid rgba(234,88,12,0.3)' }}
                                >
                                    <CheckCircle size={36} style={{ color: '#EA580C' }} />
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Message Sent!</h3>
                                <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--color-text-soft)' }}>
                                    We've received your enquiry and will reply to&nbsp;
                                    <span style={{ color: 'var(--color-primary)' }}>{form.email || 'you'}</span> within 24&nbsp;hours.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="px-6 py-3 glass rounded-xl transition-all text-sm font-semibold"
                                    style={{ color: 'var(--color-primary-deep)', border: '1px solid rgba(234,88,12,0.25)' }}
                                >
                                    Submit Another Request
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                {/* Name + Email */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium mb-1.5" htmlFor="cf-name" style={{ color: 'var(--color-text-soft)' }}>
                                            Full Name <span style={{ color: 'var(--color-primary)' }}>*</span>
                                        </label>
                                        <input
                                            id="cf-name"
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Smith"
                                            className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                                            style={{
                                                color: 'var(--color-text)',
                                                background: 'var(--color-bg)',
                                                border: '1px solid var(--color-border-strong)',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium mb-1.5" htmlFor="cf-email" style={{ color: 'var(--color-text-soft)' }}>
                                            Email <span style={{ color: 'var(--color-primary)' }}>*</span>
                                        </label>
                                        <input
                                            id="cf-email"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@company.com"
                                            className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                                            style={{
                                                color: 'var(--color-text)',
                                                background: 'var(--color-bg)',
                                                border: '1px solid var(--color-border-strong)',
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Service */}
                                <div>
                                    <label className="block text-xs font-medium mb-1.5" htmlFor="cf-service" style={{ color: 'var(--color-text-soft)' }}>
                                        Service Required
                                    </label>
                                    <select
                                        id="cf-service"
                                        name="service"
                                        value={form.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl text-sm transition-all appearance-none"
                                        style={{
                                            color: 'var(--color-text)',
                                            background: 'var(--color-bg)',
                                            border: '1px solid var(--color-border-strong)',
                                        }}
                                    >
                                        <option value="">Select a service…</option>
                                        {services.map((s) => (
                                            <option key={s} value={s} style={{ background: '#FBF7F0' }}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs font-medium mb-1.5" htmlFor="cf-message" style={{ color: 'var(--color-text-soft)' }}>
                                        Message
                                    </label>
                                    <textarea
                                        id="cf-message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Tell us about your security needs, current challenges…"
                                        className="w-full px-4 py-3 rounded-xl text-sm transition-all resize-none"
                                        style={{
                                            color: 'var(--color-text)',
                                            background: 'var(--color-bg)',
                                            border: '1px solid var(--color-border-strong)',
                                        }}
                                    />
                                </div>

                                {/* Error */}
                                {status === 'error' && (
                                    <div className="flex items-start gap-2 text-sm p-3 glass rounded-xl" style={{ color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' }}>
                                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-white relative overflow-hidden group disabled:opacity-70"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div className="absolute inset-0 btn-primary" />
                                    <span className="absolute inset-0 btn-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {status === 'loading' ? (
                                        <Loader size={18} className="relative animate-spin" />
                                    ) : (
                                        <>
                                            <span className="relative">Send Message</span>
                                            <Send size={16} className="relative transition-transform group-hover:translate-x-0.5" />
                                        </>
                                    )}
                                </motion.button>

                                <p className="text-center text-xs" style={{ color: 'var(--color-text-faint)' }}>
                                    By submitting, you agree to our Privacy Policy. We never share your data.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
