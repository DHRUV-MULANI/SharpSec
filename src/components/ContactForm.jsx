import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { EMAILJS_CONFIG } from '../utils/emailjs'

const industries = [
    'Technology', 'Financial Services', 'Healthcare', 'E-Commerce',
    'Manufacturing', 'Government', 'Education', 'Retail', 'Other',
]
const services = [
    'Web Application VAPT', 'Mobile App VAPT', 'API Security Testing',
    'Cloud Security', 'Network Pentest', 'Red Team Assessment',
    'ISO 27001', 'SOC 2', 'PCI DSS', 'Source Code Review', 'Other',
]
const employees = ['1–10', '11–50', '51–200', '201–500', '500–1000', '1000+']
const budgets = ['< $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Open to Discussion']
const timelines = ['ASAP', '1–2 weeks', '1 month', '2–3 months', 'Flexible']
const countries = [
    'United States', 'United Kingdom', 'India', 'UAE', 'Singapore',
    'Australia', 'Canada', 'Germany', 'Other',
]

function InputField({ label, type = 'text', name, value, onChange, required, placeholder }) {
    return (
        <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium" htmlFor={name}>
                {label} {required && <span className="text-cyan-400">*</span>}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete="off"
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600
                   border border-white/5 focus:border-cyan-400/40 focus:outline-none
                   focus:ring-1 focus:ring-cyan-400/20 transition-all"
                style={{ background: 'rgba(17,24,39,0.7)' }}
            />
        </div>
    )
}

function SelectField({ label, name, value, onChange, options, required }) {
    return (
        <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium" htmlFor={name}>
                {label} {required && <span className="text-cyan-400">*</span>}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 rounded-xl text-white text-sm
                   border border-white/5 focus:border-cyan-400/40 focus:outline-none
                   transition-all appearance-none"
                style={{ background: 'rgba(17,24,39,0.7)' }}
            >
                <option value="" className="bg-gray-900">Select…</option>
                {options.map((o) => (
                    <option key={o} value={o} className="bg-gray-900">{o}</option>
                ))}
            </select>
        </div>
    )
}

const EMPTY = {
    name: '', company: '', email: '', phone: '', website: '',
    country: '', employees: '', industry: '', service: '',
    budget: '', timeline: '', message: '',
    needNda: false, urgent: false, needSample: false,
}

export default function ContactForm() {
    const [form, setForm] = useState(EMPTY)
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('')
    const formRef = useRef(null)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')

        // Build the template params that match your EmailJS template variables
        const templateParams = {
            from_name: form.name,
            company: form.company,
            reply_to: form.email,       // EmailJS "Reply To" — clicking reply goes to client
            phone: form.phone || '—',
            website: form.website || '—',
            country: form.country || '—',
            employees: form.employees || '—',
            industry: form.industry || '—',
            service: form.service || '—',
            budget: form.budget || '—',
            timeline: form.timeline || '—',
            need_nda: form.needNda ? 'Yes' : 'No',
            urgent: form.urgent ? 'Yes' : 'No',
            need_sample: form.needSample ? 'Yes' : 'No',
            message: form.message || '—',
            sent_at: new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
        }

        try {
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams,
                {
                    publicKey: EMAILJS_CONFIG.publicKey,
                    privateKey: EMAILJS_CONFIG.privateKey,
                },
            )
            setStatus('success')
            setForm(EMPTY)
        } catch (err) {
            console.error('EmailJS error:', err)
            setErrorMsg(
                err?.text ||
                'Could not send the email. Please try again or email us directly at security@cipherguard.io'
            )
            setStatus('error')
        }
    }

    return (
        <section id="contact" className="py-24 bg-[#030712] relative overflow-hidden">
            {/* Decorative glows */}
            <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-cyan-400/20 mb-6">
                        <Send size={12} className="text-cyan-400" />
                        <span className="text-xs text-cyan-400 uppercase tracking-widest">Get Started</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Ready to Secure<br />
                        <span className="gradient-text">Your Business?</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Fill out the form below and our security team will reach out within&nbsp;24&nbsp;hours
                        to discuss your requirements and provide a custom quote.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-strong rounded-3xl p-6 md:p-10 border border-white/5"
                >
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            /* ── Success state ── */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-16"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', bounce: 0.5 }}
                                    className="w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400/30
                             flex items-center justify-center mx-auto mb-6"
                                >
                                    <CheckCircle size={36} className="text-cyan-400" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                    We've received your enquiry and will reply to&nbsp;
                                    <span className="text-cyan-400">{form.email || 'you'}</span> within 24&nbsp;hours.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="px-6 py-3 glass rounded-xl text-cyan-400 border border-cyan-400/20
                             hover:border-cyan-400/40 transition-all text-sm"
                                >
                                    Submit Another Request
                                </button>
                            </motion.div>
                        ) : (
                            /* ── Form ── */
                            <motion.form
                                key="form"
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {/* Row 1 */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" />
                                    <InputField label="Company" name="company" value={form.company} onChange={handleChange} required placeholder="Acme Corp" />
                                </div>

                                {/* Row 2 */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" />
                                    <InputField label="Phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                                </div>

                                {/* Row 3 */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <InputField label="Website" name="website" value={form.website} onChange={handleChange} placeholder="https://company.com" />
                                    <SelectField label="Country" name="country" value={form.country} onChange={handleChange} options={countries} />
                                </div>

                                {/* Row 4 */}
                                <div className="grid md:grid-cols-3 gap-4">
                                    <SelectField label="Company Size" name="employees" value={form.employees} onChange={handleChange} options={employees} />
                                    <SelectField label="Industry" name="industry" value={form.industry} onChange={handleChange} options={industries} required />
                                    <SelectField label="Service Required" name="service" value={form.service} onChange={handleChange} options={services} required />
                                </div>

                                {/* Row 5 */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <SelectField label="Budget Range" name="budget" value={form.budget} onChange={handleChange} options={budgets} />
                                    <SelectField label="Timeline" name="timeline" value={form.timeline} onChange={handleChange} options={timelines} />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1.5 font-medium" htmlFor="message">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Tell us about your security requirements, current challenges, specific concerns…"
                                        className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600
                               border border-white/5 focus:border-cyan-400/40 focus:outline-none
                               transition-all resize-none"
                                        style={{ background: 'rgba(17,24,39,0.7)' }}
                                    />
                                </div>

                                {/* Checkboxes */}
                                <div className="flex flex-wrap gap-6">
                                    {[
                                        { name: 'needNda', label: 'Need NDA before discussion' },
                                        { name: 'urgent', label: 'Urgent assessment required' },
                                        { name: 'needSample', label: 'Request sample report' },
                                    ].map((cb) => (
                                        <label key={cb.name} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative w-5 h-5">
                                                <input
                                                    type="checkbox"
                                                    name={cb.name}
                                                    checked={form[cb.name]}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                <div
                                                    className={`w-5 h-5 rounded border transition-all flex items-center justify-center
                            ${form[cb.name]
                                                            ? 'bg-cyan-400/20 border-cyan-400'
                                                            : 'border-white/20 hover:border-white/40'
                                                        }`}
                                                >
                                                    {form[cb.name] && (
                                                        <svg width="10" height="8" viewBox="0 0 10 8">
                                                            <path d="M1 4L4 7L9 1" stroke="#00D4FF" strokeWidth="2" fill="none" strokeLinecap="round" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                                {cb.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                {/* Error banner */}
                                {status === 'error' && (
                                    <div className="flex items-start gap-2 text-red-400 text-sm p-3 glass rounded-xl border border-red-400/20">
                                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl
                             font-semibold text-white relative overflow-hidden group disabled:opacity-70"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500
                                  opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {status === 'loading' ? (
                                        <Loader size={18} className="relative animate-spin" />
                                    ) : (
                                        <>
                                            <span className="relative">Send Message</span>
                                            <Send size={16} className="relative transition-transform group-hover:translate-x-0.5" />
                                        </>
                                    )}
                                </motion.button>

                                <p className="text-center text-xs text-gray-600">
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
