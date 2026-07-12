'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const TG_BOT_TOKEN = process.env.NEXT_PUBLIC_TG_BOT_TOKEN || ''
const TG_CHAT_ID   = process.env.NEXT_PUBLIC_TG_CHAT_ID   || ''

const CITIES = ['Toshkent','Samarqand','Buxoro','Namangan','Andijon',"Farg'ona",'Qarshi','Nukus','Termiz','Jizzax','Sirdaryo','Boshqa']

const FEATURES = [
  { id:'orders',   label:'Buyurtmalar',  icon:'📋' },
  { id:'gps',      label:'GPS kuzatuv',  icon:'🗺' },
  { id:'salary',   label:'Maosh hisob',  icon:'💰' },
  { id:'finance',  label:'Moliya',       icon:'📊' },
  { id:'telegram', label:'Telegram bot', icon:'✈️' },
  { id:'offline',  label:'Offline rejim',icon:'📡' },
  { id:'report',   label:'Hisobotlar',   icon:'📈' },
  { id:'uyga',     label:'Uyga xizmat',  icon:'🏠' },
]

const SIZES = [
  { id:'micro', label:'1–3',   sub:'shafyor', icon:'🚗' },
  { id:'small', label:'4–10',  sub:'shafyor', icon:'🚙' },
  { id:'med',   label:'11–30', sub:'shafyor', icon:'🚌' },
  { id:'large', label:'30+',   sub:'shafyor', icon:'🚛' },
]

const REVIEWS = [
  { name:'Jasur T.',   city:'Toshkent',   text:"Buyurtma boshqaruvi 10x tezlashdi. Ajoyib tizim!", stars:5 },
  { name:'Dilnoza M.', city:'Samarqand',  text:"Shofyorlar TG bot orqali hammani bilishadi. Qo'ng'iroq kamaydi.", stars:5 },
  { name:'Bobur K.',   city:"Farg'ona",   text:"Maosh hisoblashda xatoliklardan qutuldik.", stars:5 },
]

/* ── Live dot ── */
const Dot = ({ color = '#00FFB3', size = 8 }) => (
  <span style={{ position:'relative', display:'inline-flex', width:size, height:size, flexShrink:0 }}>
    <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:color, opacity:0.4, animation:'ping 1.5s ease-out infinite' }} />
    <span style={{ position:'relative', display:'inline-block', width:size, height:size, borderRadius:'50%', background:color }} />
  </span>
)

/* ── Step progress bar ── */
function Steps({ step }) {
  const steps = [
    { n:1, label:'Aloqa',   icon:'👤' },
    { n:2, label:'Sehx',    icon:'🏭' },
    { n:3, label:'Ehtiyoj', icon:'⚡' },
  ]
  return (
    <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:32 }}>
      {steps.map((s, i) => {
        const done   = step > s.n
        const active = step === s.n
        const color  = done ? '#00FFB3' : active ? '#00FFB3' : '#1e293b'
        const textC  = active ? '#00FFB3' : done ? '#4ade80' : '#475569'
        return (
          <div key={s.n} style={{ display:'flex', alignItems:'center', flex: i < steps.length-1 ? 1 : 'none', minWidth:0 }}>
            {/* Circle */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, flexShrink:0 }}>
              <motion.div
                animate={{
                  background: active ? 'linear-gradient(135deg,#00FFB3,#A78BFA)' : done ? '#00FFB3' : 'rgba(255,255,255,0.05)',
                  boxShadow:  active ? '0 0 20px rgba(0,255,179,0.45)' : 'none',
                  scale: active ? 1.12 : 1,
                }}
                transition={{ duration:0.35 }}
                style={{
                  width:42, height:42, borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:18,
                  border: `2px solid ${active ? '#00FFB3' : done ? '#00FFB3' : 'rgba(255,255,255,0.1)'}`,
                  position:'relative',
                }}>
                {done ? <span style={{ fontSize:16, color:'#000', fontWeight:900 }}>✓</span> : s.icon}
                {active && (
                  <motion.div
                    animate={{ scale:[1,1.8], opacity:[0.6,0] }}
                    transition={{ duration:1.2, repeat:Infinity }}
                    style={{ position:'absolute', inset:-5, borderRadius:'50%', border:'2px solid #00FFB3' }}
                  />
                )}
              </motion.div>
              <span style={{ fontSize:10, fontWeight:700, color:textC, textTransform:'uppercase', letterSpacing:0.8, whiteSpace:'nowrap' }}>
                {s.label}
              </span>
            </div>
            {/* Connector */}
            {i < steps.length-1 && (
              <div style={{ flex:1, height:2, margin:'0 8px', marginBottom:20, background:'rgba(255,255,255,0.06)', borderRadius:99, overflow:'hidden', position:'relative' }}>
                <motion.div
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
                  style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,#00FFB3,#A78BFA)', borderRadius:99 }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Input ── */
function Input({ label, required, error, icon, hint, children }) {
  return (
    <div style={{ marginBottom:18 }}>
      {label && (
        <div style={{ fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:1.2, marginBottom:8 }}>
          {label}{required && <span style={{ color:'#00FFB3', marginLeft:3 }}>*</span>}
        </div>
      )}
      {children}
      {error && (
        <motion.p initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }}
          style={{ fontSize:12, color:'#f87171', marginTop:6, display:'flex', alignItems:'center', gap:5 }}>
          ⚠ {error}
        </motion.p>
      )}
      {hint && !error && <p style={{ fontSize:12, color:'#334155', marginTop:5 }}>{hint}</p>}
    </div>
  )
}

function TextField({ value, onChange, placeholder, type='text', icon }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{
      display:'flex', alignItems:'center',
      background:'rgba(255,255,255,0.04)',
      border:`1.5px solid ${focused ? '#00FFB3' : 'rgba(255,255,255,0.09)'}`,
      borderRadius:14, overflow:'hidden',
      boxShadow: focused ? '0 0 0 3px rgba(0,255,179,0.1)' : 'none',
      transition:'border-color 0.2s, box-shadow 0.2s',
    }}>
      {icon && <span style={{ padding:'0 14px', fontSize:18, opacity:0.5, flexShrink:0 }}>{icon}</span>}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          flex:1, padding: icon ? '14px 14px 14px 0' : '14px 16px',
          background:'none', border:'none', outline:'none',
          color:'#f1f5f9', fontSize:15, fontFamily:'inherit',
        }}
      />
    </div>
  )
}

function SelectField({ value, onChange, children }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{
      display:'flex', alignItems:'center',
      background:'rgba(255,255,255,0.04)',
      border:`1.5px solid ${focused ? '#00FFB3' : 'rgba(255,255,255,0.09)'}`,
      borderRadius:14, overflow:'hidden',
      boxShadow: focused ? '0 0 0 3px rgba(0,255,179,0.1)' : 'none',
      transition:'border-color 0.2s, box-shadow 0.2s',
    }}>
      <span style={{ padding:'0 14px', fontSize:18, opacity:0.5, flexShrink:0 }}>📍</span>
      <select value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          flex:1, padding:'14px 14px 14px 0',
          background:'transparent', border:'none', outline:'none',
          color: value ? '#f1f5f9' : '#475569',
          fontSize:15, fontFamily:'inherit', cursor:'pointer',
          appearance:'none',
        }}>
        {children}
      </select>
      <span style={{ paddingRight:14, color:'#475569', pointerEvents:'none' }}>▾</span>
    </div>
  )
}

/* ── Success ── */
function Success({ name, phone }) {
  return (
    <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
      transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
      style={{ textAlign:'center', padding:'48px 16px' }}>
      {/* Animated checkmark */}
      <div style={{ position:'relative', width:100, height:100, margin:'0 auto 28px' }}>
        <motion.div animate={{ rotate:360 }} transition={{ duration:3, repeat:Infinity, ease:'linear' }}
          style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid transparent', borderTopColor:'#00FFB3', borderRightColor:'#A78BFA' }} />
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
          transition={{ delay:0.2, type:'spring', stiffness:220, damping:15 }}
          style={{ position:'absolute', inset:8, borderRadius:'50%', background:'rgba(0,255,179,0.08)', border:'1px solid rgba(0,255,179,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36 }}>
          ✅
        </motion.div>
      </div>

      <motion.h2 initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
        style={{ fontSize:26, fontWeight:900, marginBottom:10, letterSpacing:'-0.5px' }}>
        Ariza qabul qilindi!
      </motion.h2>
      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
        style={{ fontSize:14, color:'#64748b', lineHeight:1.7, marginBottom:28, maxWidth:320, margin:'0 auto 28px' }}>
        <strong style={{ color:'#f1f5f9' }}>{phone}</strong> raqamiga<br/>
        <strong style={{ color:'#00FFB3' }}>1–3 soat</strong> ichida bog'lanamiz
      </motion.p>

      {/* Timeline */}
      <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
        style={{ background:'rgba(0,255,179,0.04)', border:'1px solid rgba(0,255,179,0.12)', borderRadius:16, padding:'20px', marginBottom:24, textAlign:'left' }}>
        {[
          ['1','Menejer qo\'ng\'iroq qiladi','1–3 soat'],
          ['2','Demo hisobni sozlaymiz','Onlayn, 1 soat'],
          ['3','14 kun bepul ishlating','Karta shart emas'],
        ].map(([n,t,s]) => (
          <div key={n} style={{ display:'flex', gap:12, alignItems:'center', padding:'10px 0', borderBottom: n!=='3'?'1px solid rgba(255,255,255,0.04)':'none' }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#00FFB3,#A78BFA)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:900, color:'#000', flexShrink:0 }}>{n}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#f1f5f9' }}>{t}</div>
              <div style={{ fontSize:11, color:'#475569' }}>{s}</div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65 }}
        style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
        <Link href="/" style={{ padding:'12px 22px', background:'rgba(255,255,255,0.05)', color:'#94a3b8', borderRadius:12, fontSize:14, fontWeight:600, textDecoration:'none', border:'1px solid rgba(255,255,255,0.08)' }}>
          ← Bosh sahifa
        </Link>
        <a href="https://t.me/tartib_crm" rel="noopener noreferrer"
          style={{ padding:'12px 22px', background:'linear-gradient(135deg,#00FFB3,#00cc8e)', color:'#000', borderRadius:12, fontSize:14, fontWeight:800, textDecoration:'none' }}>
          ✈️ Telegramda yozish
        </a>
      </motion.div>
    </motion.div>
  )
}

/* ════ MAIN ════ */
export default function DemoPage() {
  const [step, setStep]     = useState(1)
  const [done, setDone]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [reviewIdx, setReviewIdx] = useState(0)
  const topRef = useRef(null)

  const [form, setForm] = useState({
    name:'', phone:'', company:'',
    city:'', size:'',
    features:[], comment:'',
  })

  const s = k => v => setForm(p => ({ ...p, [k]:v }))
  const se = k => e => s(k)(e.target.value)
  const toggleFeat = id => setForm(p => ({
    ...p, features: p.features.includes(id)
      ? p.features.filter(f=>f!==id)
      : [...p.features, id],
  }))

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(p => (p+1)%REVIEWS.length), 4000)
    return () => clearInterval(t)
  }, [])

  const validate = () => {
    const e = {}
    if (step===1) {
      if (!form.name.trim())  e.name  = 'Ism kiriting'
      if (!form.phone.trim()) e.phone = 'Telefon kiriting'
      else if (!/^\+?[\d\s\-()]{9,15}$/.test(form.phone)) e.phone = "To'g'ri raqam kiriting"
    }
    if (step===2) {
      if (!form.city) e.city = 'Shahar tanlang'
      if (!form.size) e.size = 'Hajm tanlang'
    }
    setErrors(e)
    return !Object.keys(e).length
  }

  const next = () => {
    if (!validate()) return
    setStep(p=>p+1)
    setTimeout(() => topRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 80)
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true)
    const featLabels = form.features.map(id => FEATURES.find(f=>f.id===id)?.label).filter(Boolean).join(', ')
    const sizeLabel  = SIZES.find(s=>s.id===form.size)?.label+' '+SIZES.find(s=>s.id===form.size)?.sub || form.size
    const msg = `🔥 <b>Yangi Demo So'rovi!</b>

👤 <b>Ism:</b> ${form.name}
📱 <b>Telefon:</b> ${form.phone}
🏢 <b>Kompaniya:</b> ${form.company||'—'}
📍 <b>Shahar:</b> ${form.city}
🚗 <b>Hajm:</b> ${sizeLabel}
⚡ <b>Imkoniyatlar:</b> ${featLabels||'—'}
💬 <b>Izoh:</b> ${form.comment||'—'}
🌐 <b>Manba:</b> tartibcrm.uz/demo
⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}`
    try {
      if (TG_BOT_TOKEN && TG_CHAT_ID) {
        await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ chat_id:TG_CHAT_ID, text:msg, parse_mode:'HTML' }),
        })
      }
    } catch {}
    setLoading(false)
    setDone(true)
    topRef.current?.scrollIntoView({ behavior:'smooth', block:'start' })
  }

  const ACCENT = '#00FFB3'

  const slideIn  = { initial:{opacity:0,x:32}, animate:{opacity:1,x:0}, exit:{opacity:0,x:-32}, transition:{duration:0.3,ease:[0.16,1,0.3,1]} }

  return (
    <div style={{ minHeight:'100vh', background:'#050508', color:'#f1f5f9', fontFamily:"'Inter',system-ui,sans-serif" }}>
      <style>{`
        @keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        *{box-sizing:border-box}
        input,select,textarea{font-family:inherit}
        input::placeholder,textarea::placeholder{color:#334155}
        select option{background:#0d1120;color:#f1f5f9}
        .chip:hover{border-color:rgba(0,255,179,0.45)!important;background:rgba(0,255,179,0.09)!important}
        .sz-card:hover{border-color:rgba(0,255,179,0.35)!important}
        @media(min-width:900px){
          .page-grid{display:grid!important;grid-template-columns:1fr 360px!important;gap:28px!important;align-items:start!important}
          .sidebar{display:block!important}
        }
      `}</style>

      {/* Ambient background */}
      <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
        <div style={{ position:'absolute', top:-200, left:-200, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,179,0.07) 0%,transparent 65%)', filter:'blur(40px)' }} />
        <div style={{ position:'absolute', bottom:-200, right:-200, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(167,139,250,0.06) 0%,transparent 65%)', filter:'blur(40px)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,255,179,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,179,0.025) 1px,transparent 1px)', backgroundSize:'52px 52px', maskImage:'radial-gradient(ellipse 80% 80% at 50% 40%,black,transparent)' }} />
      </div>

      {/* ── NAV ── */}
      <nav style={{
        position:'sticky', top:0, zIndex:100,
        background:'rgba(5,5,8,0.88)', backdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(0,255,179,0.08)',
        padding:'0 20px', height:56,
        display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none' }}>
          <div style={{ width:30, height:30, borderRadius:8, background:'linear-gradient(135deg,#00FFB3,#A78BFA)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:15, color:'#000' }}>T</div>
          <span style={{ fontSize:15, fontWeight:800, color:'#f1f5f9' }}>Tartib<span style={{ color:ACCENT }}>CRM</span></span>
        </Link>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 12px', background:'rgba(0,255,179,0.07)', border:'1px solid rgba(0,255,179,0.2)', borderRadius:99, fontSize:11, fontWeight:700, color:ACCENT }}>
            <Dot size={6}/> 14 kun bepul
          </div>
          <Link href="/" style={{ fontSize:13, color:'#475569', textDecoration:'none', padding:'5px 10px', borderRadius:8, border:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.03)' }}>
            ← Orqaga
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div ref={topRef} style={{ position:'relative', zIndex:1, textAlign:'center', padding:'48px 20px 36px' }}>
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
          style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 16px', borderRadius:99, background:'rgba(0,255,179,0.07)', border:'1px solid rgba(0,255,179,0.22)', fontSize:11, fontWeight:700, color:ACCENT, marginBottom:16, letterSpacing:2, textTransform:'uppercase' }}>
          <Dot size={6}/> Bepul Demo Olish
        </motion.div>
        <motion.h1 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ fontSize:'clamp(26px,5vw,48px)', fontWeight:900, letterSpacing:'-1px', lineHeight:1.12, marginBottom:12 }}>
          Sehxingizni{' '}
          <span style={{ background:'linear-gradient(135deg,#00FFB3,#38BDF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            14 kun bepul
          </span>{' '}sinang
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          style={{ fontSize:14, color:'#64748b', lineHeight:1.65 }}>
          Karta shart emas &nbsp;·&nbsp; 1 soatda sozlanadi &nbsp;·&nbsp; 7/24 yordam
        </motion.p>
      </div>

      {/* ── GRID ── */}
      <div style={{ maxWidth:1060, margin:'0 auto', padding:'0 16px 80px', position:'relative', zIndex:1 }}>
        <div className="page-grid" style={{ display:'block' }}>

          {/* ── FORM CARD ── */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.15 }}
            style={{
              background:'rgba(8,12,22,0.96)',
              border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:22, overflow:'hidden',
              boxShadow:'0 24px 64px rgba(0,0,0,0.5)',
              position:'relative',
            }}>

            {/* Rainbow top border */}
            <div style={{ height:2, background:'linear-gradient(90deg,#00FFB3,#38BDF8,#A78BFA,#00FFB3)', backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }} />
            <style>{`@keyframes shimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}`}</style>

            <div style={{ padding: '28px 24px 32px' }}>
              {done ? (
                <Success name={form.name} phone={form.phone} />
              ) : (
                <>
                  <Steps step={step}/>

                  <AnimatePresence mode="wait">

                    {/* ─── STEP 1 ─── */}
                    {step===1 && (
                      <motion.div key="s1" {...slideIn}>
                        <div style={{ marginBottom:24 }}>
                          <h2 style={{ fontSize:20, fontWeight:800, marginBottom:4, letterSpacing:'-0.3px' }}>Siz haqingizda</h2>
                          <p style={{ fontSize:13, color:'#475569' }}>Tez orada bog'lanishimiz uchun</p>
                        </div>

                        <Input label="Ism Familiya" required error={errors.name}>
                          <TextField icon="👤" value={form.name} onChange={se('name')} placeholder="Azimjon Mamutaliyev"/>
                        </Input>
                        <Input label="Telefon" required error={errors.phone} hint="WhatsApp yoki oddiy raqam">
                          <TextField icon="📱" value={form.phone} onChange={se('phone')} placeholder="+998 90 000 00 00" type="tel"/>
                        </Input>
                        <Input label="Kompaniya">
                          <TextField icon="🏢" value={form.company} onChange={se('company')} placeholder="Gilam yuvish markazi"/>
                        </Input>

                        <motion.button whileTap={{ scale:0.97 }} onClick={next}
                          style={{ width:'100%', padding:'15px', background:'linear-gradient(135deg,#00FFB3,#00cc8e)', color:'#000', borderRadius:14, border:'none', fontSize:16, fontWeight:800, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 8px 24px rgba(0,255,179,0.28)', display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:4 }}>
                          Davom etish <span style={{ fontSize:18 }}>→</span>
                        </motion.button>
                        <p style={{ textAlign:'center', marginTop:14, fontSize:12, color:'#1e3a5f' }}>🔒 Spam yuborilmaydi · Ma'lumotlar xavfsiz</p>
                      </motion.div>
                    )}

                    {/* ─── STEP 2 ─── */}
                    {step===2 && (
                      <motion.div key="s2" {...slideIn}>
                        <div style={{ marginBottom:24 }}>
                          <h2 style={{ fontSize:20, fontWeight:800, marginBottom:4, letterSpacing:'-0.3px' }}>Sehxingiz haqida</h2>
                          <p style={{ fontSize:13, color:'#475569' }}>Tizimni sizga moslaymiz</p>
                        </div>

                        <Input label="Shahar" required error={errors.city}>
                          <SelectField value={form.city} onChange={e => { s('city')(e.target.value); setErrors(p=>({...p,city:null})) }}>
                            <option value="">— Tanlang —</option>
                            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </SelectField>
                        </Input>

                        <Input label="Nechta shafyor?" required error={errors.size}>
                          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:9 }}>
                            {SIZES.map(sz => {
                              const sel = form.size===sz.id
                              return (
                                <div key={sz.id} className="sz-card"
                                  onClick={() => { s('size')(sz.id); setErrors(p=>({...p,size:null})) }}
                                  style={{
                                    padding:'14px 8px', borderRadius:14, cursor:'pointer', textAlign:'center',
                                    background: sel ? 'rgba(0,255,179,0.09)' : 'rgba(255,255,255,0.02)',
                                    border:`1.5px solid ${sel ? ACCENT+'70' : 'rgba(255,255,255,0.08)'}`,
                                    transition:'all 0.2s',
                                  }}>
                                  <div style={{ fontSize:22, marginBottom:5 }}>{sz.icon}</div>
                                  <div style={{ fontSize:13, fontWeight:800, color: sel?ACCENT:'#94a3b8', lineHeight:1.2 }}>{sz.label}</div>
                                  <div style={{ fontSize:10, color:'#475569', marginTop:2 }}>{sz.sub}</div>
                                </div>
                              )
                            })}
                          </div>
                        </Input>

                        <div style={{ display:'flex', gap:10, marginTop:8 }}>
                          <button onClick={() => setStep(1)}
                            style={{ flex:1, padding:'14px', background:'rgba(255,255,255,0.04)', color:'#64748b', borderRadius:14, border:'1px solid rgba(255,255,255,0.08)', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                            ← Orqaga
                          </button>
                          <motion.button whileTap={{ scale:0.97 }} onClick={next}
                            style={{ flex:2, padding:'14px', background:'linear-gradient(135deg,#00FFB3,#00cc8e)', color:'#000', borderRadius:14, border:'none', fontSize:15, fontWeight:800, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 8px 24px rgba(0,255,179,0.28)', display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
                            Davom etish →
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* ─── STEP 3 ─── */}
                    {step===3 && (
                      <motion.div key="s3" {...slideIn}>
                        <div style={{ marginBottom:24 }}>
                          <h2 style={{ fontSize:20, fontWeight:800, marginBottom:4, letterSpacing:'-0.3px' }}>Nima kerak?</h2>
                          <p style={{ fontSize:13, color:'#475569' }}>Birini yoki bir nechtasini tanlang</p>
                        </div>

                        <Input label="Imkoniyatlar">
                          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                            {FEATURES.map(f => {
                              const sel = form.features.includes(f.id)
                              return (
                                <div key={f.id} className="chip"
                                  onClick={() => toggleFeat(f.id)}
                                  style={{
                                    display:'flex', alignItems:'center', gap:9, padding:'11px 14px',
                                    borderRadius:12, cursor:'pointer',
                                    background: sel ? 'rgba(0,255,179,0.09)' : 'rgba(255,255,255,0.02)',
                                    border:`1.5px solid ${sel ? ACCENT+'60' : 'rgba(255,255,255,0.07)'}`,
                                    transition:'all 0.2s',
                                  }}>
                                  <span style={{ fontSize:16, flexShrink:0 }}>{f.icon}</span>
                                  <span style={{ fontSize:12, fontWeight:600, color: sel?'#f1f5f9':'#64748b', flex:1, lineHeight:1.3 }}>{f.label}</span>
                                  {sel && <span style={{ color:ACCENT, fontSize:12, flexShrink:0 }}>✓</span>}
                                </div>
                              )
                            })}
                          </div>
                        </Input>

                        <Input label="Qo'shimcha izoh">
                          <textarea value={form.comment} onChange={se('comment')}
                            placeholder="Sehxingiz haqida ma'lumot..." rows={3}
                            style={{
                              width:'100%', padding:'13px 16px', background:'rgba(255,255,255,0.04)',
                              border:'1.5px solid rgba(255,255,255,0.09)', borderRadius:14, outline:'none',
                              color:'#f1f5f9', fontSize:14, resize:'none', fontFamily:'inherit',
                              transition:'border-color 0.2s',
                            }}
                            onFocus={e=>e.target.style.borderColor='#00FFB3'}
                            onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.09)'}
                          />
                        </Input>

                        {/* Summary pill */}
                        <div style={{ background:'rgba(0,255,179,0.04)', border:'1px solid rgba(0,255,179,0.12)', borderRadius:12, padding:'12px 16px', marginBottom:16, fontSize:13, color:'#64748b', lineHeight:1.7 }}>
                          <span style={{ fontWeight:700, color:ACCENT, fontSize:11, letterSpacing:1, textTransform:'uppercase' }}>Ariza xulosasi · </span>
                          <span style={{ color:'#f1f5f9' }}>{form.name}</span> ·{' '}
                          <span style={{ color:'#f1f5f9' }}>{form.city}</span> ·{' '}
                          <span style={{ color:'#f1f5f9' }}>{SIZES.find(sz=>sz.id===form.size)?.label} {SIZES.find(sz=>sz.id===form.size)?.sub}</span>
                        </div>

                        <div style={{ display:'flex', gap:10 }}>
                          <button onClick={() => setStep(2)}
                            style={{ flex:1, padding:'14px', background:'rgba(255,255,255,0.04)', color:'#64748b', borderRadius:14, border:'1px solid rgba(255,255,255,0.08)', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                            ← Orqaga
                          </button>
                          <motion.button whileTap={{ scale:0.97 }} onClick={submit} disabled={loading}
                            style={{ flex:2, padding:'14px', background: loading?'rgba(0,255,179,0.25)':'linear-gradient(135deg,#00FFB3,#00cc8e)', color:'#000', borderRadius:14, border:'none', fontSize:15, fontWeight:800, cursor: loading?'not-allowed':'pointer', fontFamily:'inherit', boxShadow: loading?'none':'0 8px 24px rgba(0,255,179,0.28)', display:'flex', alignItems:'center', justifyContent:'center', gap:9 }}>
                            {loading
                              ? <><motion.div animate={{ rotate:360 }} transition={{ duration:0.8, repeat:Infinity, ease:'linear' }} style={{ width:17, height:17, border:'2.5px solid rgba(0,0,0,0.2)', borderTopColor:'#000', borderRadius:'50%' }}/> Yuborilmoqda...</>
                              : <>🚀 Demo so'rovini yuborish</>}
                          </motion.button>
                        </div>
                        <p style={{ textAlign:'center', marginTop:12, fontSize:11, color:'#1e293b' }}>
                          Yuborish bilan foydalanish shartlariga rozilik bildirasiz
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>

          {/* ── SIDEBAR ── */}
          <div className="sidebar" style={{ display:'none', position:'sticky', top:72 }}>
            {/* Stats */}
            <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 }}
              style={{ background:'rgba(8,12,22,0.96)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, padding:'22px', marginBottom:16 }}>
              <div style={{ fontSize:11, fontWeight:700, color:ACCENT, letterSpacing:2, textTransform:'uppercase', marginBottom:18 }}>Hozirgi holat</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                {[['12,847+','Kompaniya'],['50,000+','Buyurtma'],['99.9%','Uptime'],['< 1 soat','Sozlash']].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontSize:22, fontWeight:900, color:ACCENT, fontFamily:'monospace', letterSpacing:'-0.5px' }}>{v}</div>
                    <div style={{ fontSize:11, color:'#445', marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Review */}
            <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4 }}
              style={{ background:'rgba(8,12,22,0.96)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, padding:'22px', marginBottom:16, overflow:'hidden' }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#475569', letterSpacing:2, textTransform:'uppercase', marginBottom:16 }}>Mijozlar fikri</div>
              <AnimatePresence mode="wait">
                <motion.div key={reviewIdx} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.35 }}>
                  <div style={{ display:'flex', gap:2, marginBottom:10 }}>{'★★★★★'.split('').map((s,i)=><span key={i} style={{ color:'#F59E0B', fontSize:13 }}>{s}</span>)}</div>
                  <p style={{ fontSize:13, color:'#94a3b8', lineHeight:1.7, marginBottom:12, fontStyle:'italic' }}>"{REVIEWS[reviewIdx].text}"</p>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:'#f1f5f9' }}>{REVIEWS[reviewIdx].name}</div>
                      <div style={{ fontSize:11, color:'#475569' }}>{REVIEWS[reviewIdx].city}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div style={{ display:'flex', gap:5, marginTop:14, justifyContent:'center' }}>
                {REVIEWS.map((_,i)=>(
                  <div key={i} onClick={()=>setReviewIdx(i)} style={{ width:i===reviewIdx?18:6, height:6, borderRadius:99, background:i===reviewIdx?ACCENT:'rgba(255,255,255,0.1)', cursor:'pointer', transition:'all 0.3s' }}/>
                ))}
              </div>
            </motion.div>

            {/* Features included */}
            <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5 }}
              style={{ background:'rgba(8,12,22,0.96)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, padding:'22px' }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#475569', letterSpacing:2, textTransform:'uppercase', marginBottom:14 }}>Nima kiritilgan</div>
              {[
                ['⚡','1 soatda sozlanadi'],
                ['🔒',"Ma'lumotlar xavfsiz"],
                ['📱','iOS va Android'],
                ['🤖','Telegram bot bepul'],
                ['📞','7/24 yordam'],
                ['🔄','Offline ishlaydi'],
              ].map(([icon,text]) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'#94a3b8', marginBottom:11 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:'rgba(0,255,179,0.07)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{icon}</div>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}
