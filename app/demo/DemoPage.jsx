'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const TG_BOT_TOKEN = process.env.NEXT_PUBLIC_TG_BOT_TOKEN || ''
const TG_CHAT_ID   = process.env.NEXT_PUBLIC_TG_CHAT_ID   || ''

/* ── Step config ── */
const STEPS = [
  { id: 1, label: 'Aloqa',    icon: '👤', short: 'Kim siz?' },
  { id: 2, label: 'Sehx',     icon: '🏭', short: 'Sehxingiz' },
  { id: 3, label: 'Ehtiyoj',  icon: '⚡', short: 'Nima kerak?' },
]

const CITIES = ['Toshkent','Samarqand','Buxoro','Namangan','Andijon',"Farg'ona",'Qarshi','Nukus','Termiz','Jizzax','Sirdaryo','Boshqa']

const FEATURES = [
  { id:'orders',   label:'Buyurtmalar boshqaruvi', icon:'📋' },
  { id:'gps',      label:'GPS kuzatuv',             icon:'🗺' },
  { id:'salary',   label:'Maosh hisoblash',         icon:'💰' },
  { id:'finance',  label:'Moliya nazorati',          icon:'📊' },
  { id:'telegram', label:'Telegram bot',             icon:'✈️' },
  { id:'offline',  label:'Offline rejim',            icon:'📡' },
  { id:'report',   label:'Hisobotlar',               icon:'📈' },
  { id:'uyga',     label:'Uyga xizmat',              icon:'🏠' },
]

const SIZES = [
  { id:'micro', label:'1–3 shafyor',  icon:'🚗', desc:'Kichik sehx' },
  { id:'small', label:'4–10 shafyor', icon:'🚙', desc:"O'rta sehx" },
  { id:'med',   label:'11–30 shafyor',icon:'🚌', desc:'Yirik sehx' },
  { id:'large', label:'30+ shafyor',  icon:'🚛', desc:'Tarmoq' },
]

/* ── Floating particle ── */
function Particles() {
  const [pts] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.15 + 0.05,
      color: i % 3 === 0 ? '#00FFB3' : i % 3 === 1 ? '#A78BFA' : '#38BDF8',
      opacity: Math.random() * 0.25 + 0.05,
    }))
  )
  const [pos, setPos] = useState(pts)
  useEffect(() => {
    let raf
    const tick = () => {
      setPos(p => p.map(pt => ({ ...pt, y: pt.y - pt.speed < -2 ? 102 : pt.y - pt.speed })))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
      {pos.map(p => (
        <div key={p.id} style={{ position:'absolute', left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size, borderRadius:'50%', background:p.color, opacity:p.opacity }} />
      ))}
    </div>
  )
}

/* ── Live dot ── */
const LiveDot = () => (
  <span style={{ position:'relative', display:'inline-flex', width:8, height:8 }}>
    <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#00FFB3', opacity:0.5, animation:'ping 1.4s ease-out infinite' }} />
    <span style={{ position:'relative', borderRadius:'50%', width:8, height:8, background:'#00FFB3' }} />
  </span>
)

/* ── Step indicator ── */
function StepBar({ step }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:40 }}>
      {STEPS.map((s, i) => {
        const done = step > s.id
        const active = step === s.id
        return (
          <div key={s.id} style={{ display:'flex', alignItems:'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <motion.div
              animate={{
                background: done ? 'linear-gradient(135deg,#00FFB3,#00cc8e)' : active ? 'linear-gradient(135deg,#00FFB3,#A78BFA)' : 'rgba(255,255,255,0.06)',
                scale: active ? 1.1 : 1,
                boxShadow: active ? '0 0 20px rgba(0,255,179,0.4)' : 'none',
              }}
              transition={{ duration: 0.4 }}
              style={{
                width:44, height:44, borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize: done ? 16 : 18,
                border: active ? '2px solid rgba(0,255,179,0.6)' : done ? '2px solid #00FFB3' : '2px solid rgba(255,255,255,0.1)',
                flexShrink:0, position:'relative', zIndex:1,
              }}>
              {done ? '✓' : s.icon}
              {active && (
                <motion.div
                  animate={{ scale:[1,1.6], opacity:[0.5,0] }}
                  transition={{ duration:1.2, repeat:Infinity }}
                  style={{ position:'absolute', inset:-6, borderRadius:'50%', border:'2px solid #00FFB3' }}
                />
              )}
            </motion.div>
            <div style={{ textAlign:'center', marginTop:6, position:'absolute', top:44, left:0, width:44 }}>
              <div style={{ fontSize:9, fontWeight:700, color: active?'#00FFB3':done?'#4ADE80':'#445', textTransform:'uppercase', letterSpacing:1 }}>
                {s.label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex:1, height:2, margin:'0 4px', position:'relative', overflow:'hidden', background:'rgba(255,255,255,0.06)', borderRadius:99 }}>
                <motion.div
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
                  style={{ position:'absolute', left:0, top:0, height:'100%', background:'linear-gradient(90deg,#00FFB3,#A78BFA)', borderRadius:99 }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Input field ── */
function Field({ label, required, error, children, hint }) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ fontSize:11, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:1.2, marginBottom:8 }}>
        {label} {required && <span style={{ color:'#00FFB3' }}>*</span>}
      </div>
      {children}
      {error && (
        <motion.div initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }}
          style={{ fontSize:11, color:'#F87171', marginTop:5, display:'flex', alignItems:'center', gap:4 }}>
          ⚠ {error}
        </motion.div>
      )}
      {hint && !error && <div style={{ fontSize:11, color:'#334155', marginTop:5 }}>{hint}</div>}
    </div>
  )
}

function Input({ value, onChange, placeholder, type='text', icon, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:0,
      background:'rgba(255,255,255,0.03)',
      border:`1.5px solid ${focused ? 'rgba(0,255,179,0.5)' : 'rgba(255,255,255,0.08)'}`,
      borderRadius:14, overflow:'hidden',
      boxShadow: focused ? '0 0 0 3px rgba(0,255,179,0.08)' : 'none',
      transition:'all 0.25s',
    }}>
      {icon && (
        <span style={{ padding:'0 14px', fontSize:17, opacity:0.6, flexShrink:0 }}>{icon}</span>
      )}
      <input
        type={type} value={value} onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex:1, padding: icon ? '15px 16px 15px 0' : '15px 16px',
          background:'none', border:'none', outline:'none',
          color:'#f1f5f9', fontSize:15, fontFamily:'inherit',
        }}
        {...props}
      />
    </div>
  )
}

/* ── Social proof sidebar ── */
function SocialProof() {
  const reviews = [
    { name:'Jasur T.', city:'Toshkent', text:'Buyurtma boshqaruvi 10x tezlashdi. Dispetcher ishini 3 soatga qisqartirdik.', stars:5, time:'2 kun oldin' },
    { name:'Dilnoza M.', city:'Samarqand', text:'Shofyorlar endi qo\'ng\'iroq qilmaydi — TG bot orqali hammani bilishadi.', stars:5, time:'1 hafta oldin' },
    { name:'Bobur K.', city:"Farg'ona", text:'Maosh hisoblash xatoliklardan qutuldik. Ishchilar ham mamnun.', stars:5, time:'2 hafta oldin' },
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p+1)%reviews.length), 4000)
    return () => clearInterval(t)
  }, [])

  const feats = [
    { icon:'⚡', text:'1 soatda sozlanadi' },
    { icon:'🔒', text:"Ma'lumotlar xavfsiz" },
    { icon:'📱', text:'iOS va Android' },
    { icon:'🤖', text:'Telegram bot bepul' },
    { icon:'📞', text:'7/24 yordam' },
    { icon:'🔄', text:'Offline ishlaydi' },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      {/* Stats */}
      <div style={{
        background:'rgba(0,255,179,0.04)',
        border:'1px solid rgba(0,255,179,0.12)',
        borderRadius:20, padding:'24px',
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:'#00FFB3', letterSpacing:2, textTransform:'uppercase', marginBottom:20 }}>
          Hozirgi holat
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          {[
            ['12,847+', 'Kompaniya'],
            ['50,000+', 'Buyurtma'],
            ['99.9%',   'Uptime'],
            ['< 1 soat','Sozlash'],
          ].map(([v,l]) => (
            <div key={l}>
              <div style={{ fontSize:22, fontWeight:900, color:'#00FFB3', fontFamily:'monospace', letterSpacing:'-0.5px' }}>{v}</div>
              <div style={{ fontSize:11, color:'#445', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Review carousel */}
      <div style={{
        background:'rgba(255,255,255,0.02)',
        border:'1px solid rgba(255,255,255,0.07)',
        borderRadius:20, padding:'22px', position:'relative', overflow:'hidden',
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:'#445', letterSpacing:2, textTransform:'uppercase', marginBottom:16 }}>
          Mijozlar fikri
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-16 }}
            transition={{ duration:0.35 }}>
            <div style={{ display:'flex', gap:3, marginBottom:12 }}>
              {'★★★★★'.split('').map((s,i) => <span key={i} style={{ color:'#F59E0B', fontSize:14 }}>{s}</span>)}
            </div>
            <p style={{ fontSize:13, color:'#94a3b8', lineHeight:1.7, marginBottom:14, fontStyle:'italic' }}>
              "{reviews[idx].text}"
            </p>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'#f1f5f9' }}>{reviews[idx].name}</div>
                <div style={{ fontSize:11, color:'#445' }}>{reviews[idx].city}</div>
              </div>
              <div style={{ fontSize:10, color:'#334' }}>{reviews[idx].time}</div>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* dots */}
        <div style={{ display:'flex', gap:5, marginTop:14, justifyContent:'center' }}>
          {reviews.map((_,i) => (
            <div key={i} onClick={() => setIdx(i)}
              style={{ width:i===idx?16:6, height:6, borderRadius:99, background:i===idx?'#00FFB3':'rgba(255,255,255,0.1)', cursor:'pointer', transition:'all 0.3s' }}/>
          ))}
        </div>
      </div>

      {/* Feature list */}
      <div style={{
        background:'rgba(255,255,255,0.02)',
        border:'1px solid rgba(255,255,255,0.07)',
        borderRadius:20, padding:'22px',
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:'#445', letterSpacing:2, textTransform:'uppercase', marginBottom:16 }}>
          Nima kiritilgan
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {feats.map(f => (
            <div key={f.text} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'#94a3b8' }}>
              <div style={{ width:28, height:28, borderRadius:8, background:'rgba(0,255,179,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{f.icon}</div>
              {f.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Success screen ── */
function SuccessScreen({ form }) {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.92, y:24 }}
      animate={{ opacity:1, scale:1, y:0 }}
      transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
      style={{ textAlign:'center', padding:'48px 20px' }}>

      {/* Ring animation */}
      <div style={{ position:'relative', width:120, height:120, margin:'0 auto 32px' }}>
        <motion.div
          animate={{ rotate:360 }}
          transition={{ duration:3, repeat:Infinity, ease:'linear' }}
          style={{
            position:'absolute', inset:0, borderRadius:'50%',
            border:'2px solid transparent',
            borderTopColor:'#00FFB3', borderRightColor:'#A78BFA',
          }}
        />
        <motion.div
          initial={{ scale:0 }} animate={{ scale:1 }}
          transition={{ delay:0.3, duration:0.5, type:'spring', stiffness:200 }}
          style={{
            position:'absolute', inset:10, borderRadius:'50%',
            background:'linear-gradient(135deg,rgba(0,255,179,0.15),rgba(167,139,250,0.1))',
            border:'1px solid rgba(0,255,179,0.3)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:36,
          }}>
          ✓
        </motion.div>
      </div>

      <motion.h2 initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
        style={{ fontSize:28, fontWeight:900, marginBottom:10, letterSpacing:'-0.5px' }}>
        Arizangiz qabul qilindi!
      </motion.h2>

      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
        style={{ fontSize:15, color:'#64748b', lineHeight:1.7, marginBottom:32, maxWidth:380, margin:'0 auto 32px' }}>
        Tez orada <strong style={{ color:'#f1f5f9' }}>{form.phone}</strong> raqamingizga bog'lanamiz.
        O'rtacha kutish vaqti: <strong style={{ color:'#00FFB3' }}>1–3 soat</strong>
      </motion.p>

      {/* Steps what happens next */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}
        style={{
          background:'rgba(0,255,179,0.04)',
          border:'1px solid rgba(0,255,179,0.12)',
          borderRadius:18, padding:'24px', marginBottom:28, textAlign:'left',
        }}>
        <div style={{ fontSize:12, fontWeight:700, color:'#00FFB3', letterSpacing:1.5, textTransform:'uppercase', marginBottom:16 }}>
          Keyin nima bo'ladi?
        </div>
        {[
          ['1','Menejerimiz qo\'ng\'iroq qiladi', '1–3 soat ichida'],
          ['2','Demo hisobini sozlab beramiz', 'Onlayn, 1 soat'],
          ['3','14 kun bepul ishlatib ko\'rasiz', 'Karta shart emas'],
        ].map(([n,t,s]) => (
          <div key={n} style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:16 }}>
            <div style={{
              width:28, height:28, borderRadius:'50%',
              background:'linear-gradient(135deg,#00FFB3,#A78BFA)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:12, fontWeight:900, color:'#000', flexShrink:0,
            }}>{n}</div>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'#f1f5f9' }}>{t}</div>
              <div style={{ fontSize:12, color:'#445', marginTop:2 }}>{s}</div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}
        style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
        <Link href="/"
          style={{ padding:'12px 24px', background:'rgba(255,255,255,0.05)', color:'#94a3b8', borderRadius:12, fontSize:14, fontWeight:600, textDecoration:'none', border:'1px solid rgba(255,255,255,0.08)' }}>
          ← Bosh sahifa
        </Link>
        <a href="https://t.me/tartib_crm" rel="noopener noreferrer"
          style={{ padding:'12px 24px', background:'linear-gradient(135deg,#00FFB3,#00cc8e)', color:'#000', borderRadius:12, fontSize:14, fontWeight:700, textDecoration:'none', display:'flex', alignItems:'center', gap:7 }}>
          ✈️ Telegram orqali yozish
        </a>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════
   MAIN COMPONENT
═══════════════════════════════ */
export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  const [form, setForm] = useState({
    name:'', phone:'', company:'', city:'',
    size:'', features:[], comment:'',
  })

  const set = (k) => (v) => setForm(p => ({ ...p, [k]: v }))
  const setE = (k) => (e) => set(k)(e.target.value)
  const toggleFeat = (id) => {
    setForm(p => ({
      ...p,
      features: p.features.includes(id)
        ? p.features.filter(f => f !== id)
        : [...p.features, id],
    }))
  }

  // Validate per step
  const validate = () => {
    const e = {}
    if (step === 1) {
      if (!form.name.trim()) e.name = 'Ismingizni kiriting'
      if (!form.phone.trim()) e.phone = 'Telefon raqam kiriting'
      else if (!/^\+?[\d\s\-()]{9,15}$/.test(form.phone)) e.phone = "To'g'ri raqam kiriting"
    }
    if (step === 2) {
      if (!form.city) e.city = 'Shaharni tanlang'
      if (!form.size) e.size = 'Sehx hajmini tanlang'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate()) return
    setStep(s => s + 1)
    setTimeout(() => formRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 100)
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true)

    const featLabels = form.features.map(id => FEATURES.find(f=>f.id===id)?.label).filter(Boolean).join(', ')
    const sizeLabel  = SIZES.find(s=>s.id===form.size)?.label || form.size

    const msg = `🔥 <b>Yangi Demo So'rovi!</b>

👤 <b>Ism:</b> ${form.name}
📱 <b>Telefon:</b> ${form.phone}
🏢 <b>Kompaniya:</b> ${form.company||'—'}
📍 <b>Shahar:</b> ${form.city}
🚗 <b>Hajm:</b> ${sizeLabel}
⚡ <b>Kerak imkoniyatlar:</b> ${featLabels||'—'}
💬 <b>Izoh:</b> ${form.comment||'—'}

🌐 <b>Manba:</b> tartibcrm.uz/demo
⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}`

    try {
      if (TG_BOT_TOKEN && TG_CHAT_ID) {
        await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ chat_id:TG_CHAT_ID, text:msg, parse_mode:'HTML' }),
        })
      }
    } catch {}

    setLoading(false)
    setDone(true)
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  // Grid dots background
  const gridStyle = {
    backgroundImage: 'linear-gradient(rgba(0,255,179,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,179,0.03) 1px,transparent 1px)',
    backgroundSize: '52px 52px',
  }

  return (
    <div style={{ minHeight:'100vh', background:'#050508', color:'#f1f5f9', position:'relative' }}>
      <style>{`
        @keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes floatUp{0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
        * { box-sizing:border-box }
        input,select,textarea { font-family:inherit }
        input::placeholder { color:#334155 }
        textarea::placeholder { color:#334155 }
        select option { background:#0d1120; color:#f1f5f9 }
        .feat-chip:hover { border-color:rgba(0,255,179,0.4)!important; background:rgba(0,255,179,0.08)!important }
        .size-card:hover { border-color:rgba(0,255,179,0.3)!important; transform:translateY(-2px) }
        @media(max-width:900px){
          .demo-layout{ grid-template-columns:1fr!important }
          .demo-sidebar{ display:none!important }
        }
        @media(max-width:480px){
          .feat-grid{ grid-template-columns:1fr 1fr!important }
          .size-grid{ grid-template-columns:1fr 1fr!important }
        }
      `}</style>

      <Particles />

      {/* Grid bg */}
      <div style={{ position:'fixed', inset:0, ...gridStyle, pointerEvents:'none', zIndex:0,
        maskImage:'radial-gradient(ellipse 80% 80% at 50% 40%,black 20%,transparent 80%)' }} />

      {/* Glow orbs */}
      <div style={{ position:'fixed', top:-200, left:-200, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,179,0.07),transparent 65%)', filter:'blur(60px)', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'fixed', bottom:-200, right:-200, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(167,139,250,0.06),transparent 65%)', filter:'blur(60px)', pointerEvents:'none', zIndex:0 }} />

      {/* ── NAV ── */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        background:'rgba(5,5,8,0.9)', backdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(0,255,179,0.08)',
        padding:'0 5%', height:60,
        display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <div style={{ width:32, height:32, borderRadius:9, background:'linear-gradient(135deg,#00FFB3,#A78BFA)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:16, color:'#000' }}>T</div>
          <span style={{ fontSize:15, fontWeight:800, color:'#f1f5f9' }}>Tartib<span style={{ color:'#00FFB3' }}>CRM</span></span>
        </Link>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 12px', background:'rgba(0,255,179,0.06)', borderRadius:99, border:'1px solid rgba(0,255,179,0.2)', fontSize:11, color:'#00FFB3', fontWeight:700 }}>
            <LiveDot /> 14 kun bepul
          </div>
          <Link href="/" style={{ fontSize:13, color:'#445', textDecoration:'none' }}>← Orqaga</Link>
        </div>
      </nav>

      {/* ── HERO HEADER ── */}
      <div style={{ position:'relative', zIndex:1, paddingTop:100, paddingBottom:48, textAlign:'center', padding:'100px 20px 48px' }}>
        <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 16px', borderRadius:99, background:'rgba(0,255,179,0.07)', border:'1px solid rgba(0,255,179,0.22)', fontSize:11, fontWeight:700, color:'#00FFB3', marginBottom:18, letterSpacing:2, textTransform:'uppercase' }}>
          <LiveDot /> Bepul Demo Olish
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
          style={{ fontSize:'clamp(28px,5vw,54px)', fontWeight:900, letterSpacing:'-1.5px', lineHeight:1.1, marginBottom:14 }}>
          Sehxingizni{' '}
          <span style={{ background:'linear-gradient(135deg,#00FFB3,#38BDF8,#A78BFA)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            14 kun bepul
          </span>{' '}
          sinang
        </motion.h1>

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
          style={{ fontSize:'clamp(14px,1.8vw,17px)', color:'#64748b', maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>
          Karta talab qilinmaydi · 1 soatda sozlanadi · 7/24 yordam
        </motion.p>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="demo-layout" style={{
        display:'grid', gridTemplateColumns:'1fr 380px',
        gap:28, maxWidth:1100, margin:'0 auto',
        padding:'0 20px 80px', position:'relative', zIndex:1,
      }}>

        {/* ── FORM CARD ── */}
        <motion.div ref={formRef}
          initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.2 }}
          style={{
            background:'rgba(7,11,20,0.95)',
            border:'1px solid rgba(255,255,255,0.07)',
            borderRadius:24, padding:'36px 36px',
            backdropFilter:'blur(20px)',
            boxShadow:'0 32px 80px rgba(0,0,0,0.5)',
            position:'relative', overflow:'hidden',
          }}>

          {/* Top shimmer line */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#00FFB3,#A78BFA,transparent)' }} />

          {done ? (
            <SuccessScreen form={form} />
          ) : (
            <>
              {/* Step bar */}
              <div style={{ position:'relative', paddingBottom:32, marginBottom:12 }}>
                <StepBar step={step} />
              </div>

              <AnimatePresence mode="wait">

                {/* ── STEP 1: Contact ── */}
                {step === 1 && (
                  <motion.div key="step1"
                    initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}
                    transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}>

                    <div style={{ marginBottom:28 }}>
                      <h2 style={{ fontSize:22, fontWeight:800, marginBottom:6, letterSpacing:'-0.3px' }}>
                        Siz haqingizda
                      </h2>
                      <p style={{ fontSize:14, color:'#475569' }}>Tez orada bog'lanishimiz uchun</p>
                    </div>

                    <Field label="Ism Familiya" required error={errors.name}>
                      <Input icon="👤" value={form.name} onChange={setE('name')} placeholder="Azimjon Mamutaliyev" />
                    </Field>

                    <Field label="Telefon raqam" required error={errors.phone}
                      hint="WhatsApp yoki oddiy raqam">
                      <Input icon="📱" value={form.phone} onChange={setE('phone')} placeholder="+998 90 000 00 00" type="tel" />
                    </Field>

                    <Field label="Kompaniya nomi" error={errors.company}>
                      <Input icon="🏢" value={form.company} onChange={setE('company')} placeholder="Gilam yuvish markazi" />
                    </Field>

                    {/* CTA */}
                    <motion.button whileTap={{ scale:0.97 }} onClick={next}
                      style={{
                        width:'100%', padding:'16px', marginTop:8,
                        background:'linear-gradient(135deg,#00FFB3,#00cc8e)',
                        color:'#000', borderRadius:14, border:'none',
                        fontSize:16, fontWeight:800, cursor:'pointer',
                        fontFamily:'inherit',
                        boxShadow:'0 8px 24px rgba(0,255,179,0.3)',
                        display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                      }}>
                      Davom etish <span style={{ fontSize:18 }}>→</span>
                    </motion.button>

                    <div style={{ textAlign:'center', marginTop:16, fontSize:12, color:'#334155' }}>
                      ✓ Spam yuborilmaydi · ✓ Ma'lumotlaringiz xavfsiz
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: Business ── */}
                {step === 2 && (
                  <motion.div key="step2"
                    initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}
                    transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}>

                    <div style={{ marginBottom:28 }}>
                      <h2 style={{ fontSize:22, fontWeight:800, marginBottom:6, letterSpacing:'-0.3px' }}>
                        Sehxingiz haqida
                      </h2>
                      <p style={{ fontSize:14, color:'#475569' }}>Tizimni sizga moslaymiz</p>
                    </div>

                    {/* City */}
                    <Field label="Shahar" required error={errors.city}>
                      <div style={{
                        background:'rgba(255,255,255,0.03)',
                        border:`1.5px solid ${errors.city?'rgba(248,113,113,0.5)':'rgba(255,255,255,0.08)'}`,
                        borderRadius:14, overflow:'hidden',
                        display:'flex', alignItems:'center',
                      }}>
                        <span style={{ padding:'0 14px', fontSize:17, opacity:0.6 }}>📍</span>
                        <select value={form.city} onChange={setE('city')}
                          style={{ flex:1, padding:'15px 12px 15px 0', background:'none', border:'none', outline:'none', color: form.city?'#f1f5f9':'#334155', fontSize:15, cursor:'pointer', fontFamily:'inherit' }}>
                          <option value="">— Shaharni tanlang —</option>
                          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </Field>

                    {/* Size */}
                    <Field label="Nechta shafyor?" required error={errors.size}>
                      <div className="size-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
                        {SIZES.map(s => (
                          <div key={s.id} className="size-card"
                            onClick={() => { set('size')(s.id); setErrors(p=>({...p,size:null})) }}
                            style={{
                              padding:'14px 10px', borderRadius:14, cursor:'pointer', textAlign:'center',
                              background: form.size===s.id ? 'rgba(0,255,179,0.1)' : 'rgba(255,255,255,0.02)',
                              border:`1.5px solid ${form.size===s.id?'rgba(0,255,179,0.5)':'rgba(255,255,255,0.07)'}`,
                              transition:'all 0.2s',
                            }}>
                            <div style={{ fontSize:22, marginBottom:6 }}>{s.icon}</div>
                            <div style={{ fontSize:11, fontWeight:700, color: form.size===s.id?'#00FFB3':'#94a3b8', lineHeight:1.3 }}>{s.label}</div>
                            <div style={{ fontSize:9, color:'#334155', marginTop:3 }}>{s.desc}</div>
                          </div>
                        ))}
                      </div>
                    </Field>

                    <div style={{ display:'flex', gap:12, marginTop:8 }}>
                      <motion.button whileTap={{ scale:0.97 }} onClick={() => setStep(1)}
                        style={{ flex:1, padding:'15px', background:'rgba(255,255,255,0.04)', color:'#64748b', borderRadius:14, border:'1px solid rgba(255,255,255,0.07)', fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                        ← Orqaga
                      </motion.button>
                      <motion.button whileTap={{ scale:0.97 }} onClick={next}
                        style={{ flex:2, padding:'15px', background:'linear-gradient(135deg,#00FFB3,#00cc8e)', color:'#000', borderRadius:14, border:'none', fontSize:16, fontWeight:800, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 8px 24px rgba(0,255,179,0.3)', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                        Davom etish <span>→</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Needs ── */}
                {step === 3 && (
                  <motion.div key="step3"
                    initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}
                    transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}>

                    <div style={{ marginBottom:28 }}>
                      <h2 style={{ fontSize:22, fontWeight:800, marginBottom:6, letterSpacing:'-0.3px' }}>
                        Nima kerak?
                      </h2>
                      <p style={{ fontSize:14, color:'#475569' }}>Bir yoki bir nechtasini tanlang</p>
                    </div>

                    {/* Features */}
                    <Field label="Kerakli imkoniyatlar">
                      <div className="feat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:9 }}>
                        {FEATURES.map(f => {
                          const sel = form.features.includes(f.id)
                          return (
                            <div key={f.id} className="feat-chip"
                              onClick={() => toggleFeat(f.id)}
                              style={{
                                padding:'11px 14px', borderRadius:12, cursor:'pointer',
                                display:'flex', alignItems:'center', gap:10,
                                background: sel ? 'rgba(0,255,179,0.1)' : 'rgba(255,255,255,0.02)',
                                border:`1.5px solid ${sel?'rgba(0,255,179,0.45)':'rgba(255,255,255,0.07)'}`,
                                transition:'all 0.2s',
                              }}>
                              <span style={{ fontSize:16 }}>{f.icon}</span>
                              <span style={{ fontSize:12, fontWeight:600, color:sel?'#f1f5f9':'#64748b' }}>{f.label}</span>
                              {sel && <span style={{ marginLeft:'auto', fontSize:12, color:'#00FFB3' }}>✓</span>}
                            </div>
                          )
                        })}
                      </div>
                    </Field>

                    {/* Comment */}
                    <Field label="Qo'shimcha izoh">
                      <div style={{
                        background:'rgba(255,255,255,0.03)',
                        border:'1.5px solid rgba(255,255,255,0.08)',
                        borderRadius:14, overflow:'hidden',
                      }}>
                        <textarea
                          value={form.comment} onChange={setE('comment')}
                          placeholder="Sehxingiz haqida qo'shimcha ma'lumot..."
                          rows={3}
                          style={{
                            width:'100%', padding:'14px 16px', background:'none',
                            border:'none', outline:'none', color:'#f1f5f9',
                            fontSize:14, resize:'none', fontFamily:'inherit',
                          }}
                        />
                      </div>
                    </Field>

                    {/* Summary */}
                    <div style={{
                      background:'rgba(0,255,179,0.04)', border:'1px solid rgba(0,255,179,0.12)',
                      borderRadius:14, padding:'14px 16px', marginBottom:20, fontSize:13,
                    }}>
                      <div style={{ color:'#00FFB3', fontWeight:700, marginBottom:8, fontSize:11, textTransform:'uppercase', letterSpacing:1 }}>
                        Ariza xulosasi
                      </div>
                      <div style={{ color:'#94a3b8', lineHeight:1.8 }}>
                        <span style={{ color:'#f1f5f9' }}>{form.name}</span> ·{' '}
                        <span style={{ color:'#f1f5f9' }}>{form.phone}</span> ·{' '}
                        <span style={{ color:'#f1f5f9' }}>{form.city}</span> ·{' '}
                        <span style={{ color:'#f1f5f9' }}>{SIZES.find(s=>s.id===form.size)?.label}</span>
                      </div>
                    </div>

                    <div style={{ display:'flex', gap:12 }}>
                      <motion.button whileTap={{ scale:0.97 }} onClick={() => setStep(2)}
                        style={{ flex:1, padding:'15px', background:'rgba(255,255,255,0.04)', color:'#64748b', borderRadius:14, border:'1px solid rgba(255,255,255,0.07)', fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                        ← Orqaga
                      </motion.button>
                      <motion.button whileTap={{ scale:0.97 }} onClick={submit} disabled={loading}
                        style={{
                          flex:2, padding:'15px',
                          background: loading ? 'rgba(0,255,179,0.3)' : 'linear-gradient(135deg,#00FFB3,#00cc8e)',
                          color:'#000', borderRadius:14, border:'none',
                          fontSize:16, fontWeight:800, cursor: loading?'not-allowed':'pointer',
                          fontFamily:'inherit',
                          boxShadow: loading?'none':'0 8px 24px rgba(0,255,179,0.3)',
                          display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                        }}>
                        {loading ? (
                          <>
                            <motion.div animate={{ rotate:360 }} transition={{ duration:0.8, repeat:Infinity, ease:'linear' }}
                              style={{ width:18, height:18, border:'2.5px solid rgba(0,0,0,0.2)', borderTopColor:'#000', borderRadius:'50%' }} />
                            Yuborilmoqda...
                          </>
                        ) : (
                          <>🚀 Demo so'rovini yuborish</>
                        )}
                      </motion.button>
                    </div>

                    <div style={{ textAlign:'center', marginTop:14, fontSize:11, color:'#1e293b' }}>
                      Yuborish tugmasini bosish bilan <span style={{ color:'#334155' }}>foydalanish shartlarimizga</span> rozilik bildirasiz
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>

        {/* ── SIDEBAR ── */}
        <motion.div className="demo-sidebar"
          initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.7, delay:0.35 }}>
          <SocialProof />
        </motion.div>
      </div>
    </div>
  )
}
