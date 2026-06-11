'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TG_BOT_TOKEN = process.env.NEXT_PUBLIC_TG_BOT_TOKEN || ''
const TG_CHAT_ID   = process.env.NEXT_PUBLIC_TG_CHAT_ID   || ''

export default function DemoForm() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', phone: '', company: '', city: '', orders: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    const msg = `🔔 <b>Yangi Demo Ariza!</b>\n👤 <b>Ism:</b> ${form.name}\n📱 <b>Telefon:</b> ${form.phone}\n🏢 <b>Kompaniya:</b> ${form.company || '—'}\n📍 <b>Shahar:</b> ${form.city || '—'}\n📦 <b>Buyurtmalar:</b> ${form.orders || '—'}\n🌐 <b>Manba:</b> tartibcrm.uz\n⏰ <b>Sana:</b> ${new Date().toLocaleString('uz-UZ')}`
    try {
      if (TG_BOT_TOKEN && TG_CHAT_ID) {
        await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TG_CHAT_ID, text: msg, parse_mode: 'HTML' })
        })
      }
    } catch { }
    setLoading(false); setDone(true)
  }

  const steps = [
    { label: 'Ism Familiya *', key: 'name', ph: 'Azimjon Mamutaliyev', icon: '👤', type: 'text' },
    { label: 'Telefon *', key: 'phone', ph: '+998 90 000 00 00', icon: '📱', type: 'tel' },
    { label: 'Kompaniya', key: 'company', ph: 'Gilam yuvish markazi', icon: '🏢', type: 'text' },
  ]

  return (
    <section id="demo" aria-label="Demo olish" style={{
      padding: '96px 5%',
      background: 'linear-gradient(135deg,rgba(0,255,179,0.02),rgba(167,139,250,0.02))',
      borderTop: '1px solid rgba(0,255,179,0.06)',
      position: 'relative', zIndex: 2,
    }}>
      {/* Decorative rings */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', border: '1px solid rgba(0,255,179,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', border: '1px solid rgba(167,139,250,0.02)', pointerEvents: 'none' }} />

      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', maxWidth: 1060, margin: '0 auto' }} className="demo-grid">

        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -36 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', borderRadius: 99, background: 'rgba(0,255,179,0.06)', border: '1px solid rgba(0,255,179,0.18)', fontSize: 11, fontWeight: 600, color: '#00FFB3', marginBottom: 20, letterSpacing: 2, textTransform: 'uppercase' }}>
            🚀 Bepul demo
          </div>
          <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 16, lineHeight: 1.1 }}>
            Sehxingizni<br />
            <span style={{ background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              bugun tartibga soling
            </span>
          </h2>
          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, marginBottom: 28 }}>
            14 kunlik bepul sinov. Karta kerak emas. 1 soat ichida tizim sozlanadi.
          </p>
          {['14 kunlik bepul trial', 'Karta talab qilinmaydi', '1 soat ichida sozlanadi', '7/24 texnik yordam', 'Ma\'lumotlaringiz xavfsiz'].map((b, i) => (
            <motion.div key={b} initial={{ opacity: 0, x: -18 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.06 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: 14, color: '#666' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,255,179,0.08)', border: '1px solid rgba(0,255,179,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: '#00FFB3' }}>✓</div>
              {b}
            </motion.div>
          ))}
        </motion.div>

        {/* Right */}
        <motion.div initial={{ opacity: 0, x: 36 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
          <div style={{ background: '#0d0d14', border: '1px solid #1a1a2e', borderRadius: 20, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Progress */}
                  <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
                    {steps.map((_, i) => (
                      <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= step ? '#00FFB3' : '#1a1a2e', transition: 'background 0.3s' }} />
                    ))}
                  </div>

                  <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, letterSpacing: '-0.5px' }}>Demo so'rash</div>
                  <div style={{ fontSize: 13, color: '#555', marginBottom: 24 }}>24 soat ichida bog'lanamiz ✅</div>

                  <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {steps.map((f, i) => (
                      <div key={f.key}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{f.label}</div>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#111', border: `1px solid ${i <= step ? 'rgba(0,255,179,0.2)' : '#1a1a2e'}`, borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.3s' }}
                          onFocus={e => { e.currentTarget.style.borderColor = '#00FFB3'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,255,179,0.08)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = i <= step ? 'rgba(0,255,179,0.2)' : '#1a1a2e'; e.currentTarget.style.boxShadow = 'none' }}>
                          <span style={{ padding: '0 12px', color: '#444', fontSize: 14 }}>{f.icon}</span>
                          <input type={f.type} placeholder={f.ph} required={f.key === 'name' || f.key === 'phone'} value={form[f.key]} onChange={set(f.key)} onFocus={() => setStep(Math.max(step, i))}
                            style={{ flex: 1, padding: '13px 12px 13px 0', background: 'none', border: 'none', outline: 'none', color: '#f1f5f9', fontSize: 14, fontFamily: 'inherit' }} />
                        </div>
                      </div>
                    ))}

                    {/* City */}
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Shahar</div>
                      <div style={{ display: 'flex', alignItems: 'center', background: '#111', border: '1px solid #1a1a2e', borderRadius: 10, overflow: 'hidden' }}>
                        <span style={{ padding: '0 12px', color: '#444', fontSize: 14 }}>📍</span>
                        <select value={form.city} onChange={set('city')}
                          style={{ flex: 1, padding: '13px 12px 13px 0', background: 'none', border: 'none', outline: 'none', color: form.city ? '#f1f5f9' : '#444', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer' }}>
                          <option value="">— Tanlang —</option>
                          {["Toshkent", "Samarqand", "Buxoro", "Namangan", "Andijon", "Farg'ona", "Qarshi", "Boshqa"].map(c => (
                            <option key={c} value={c} style={{ background: '#0d0d14' }}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <motion.button type="submit" disabled={loading}
                      whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,255,179,0.4)' }}
                      whileTap={{ scale: 0.98 }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', background: 'linear-gradient(135deg,#00FFB3,#00cc8e)', color: '#000', boxShadow: '0 4px 20px rgba(0,255,179,0.3)', opacity: loading ? 0.7 : 1 }}>
                      {loading
                        ? <><div style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Yuborilmoqda...</>
                        : <>🚀 Demo so'rash</>}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '24px 0' }}>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}
                    style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,255,179,0.08)', border: '2px solid #00FFB3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px' }}>
                    ✓
                  </motion.div>
                  <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.5px' }}>Arizangiz qabul qilindi!</div>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 20 }}>
                    Tez orada siz bilan bog'lanamiz.<br />O'rtacha kutish: <strong style={{ color: '#f1f5f9' }}>1–3 soat</strong>
                  </p>
                  <div style={{ padding: 14, background: 'rgba(0,255,179,0.04)', border: '1px solid rgba(0,255,179,0.1)', borderRadius: 10, fontSize: 13, color: '#555' }}>
                    📱 {form.phone} raqamiga WhatsApp orqali murojaat qilinadi
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  )
}
