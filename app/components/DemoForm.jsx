'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TG_BOT_TOKEN = process.env.NEXT_PUBLIC_TG_BOT_TOKEN || ''
const TG_CHAT_ID   = process.env.NEXT_PUBLIC_TG_CHAT_ID   || ''

export default function DemoForm() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.1 })
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name:'', phone:'', company:'', city:'' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    const msg = `🔔 <b>Yangi Demo Ariza!</b>\n👤 <b>Ism:</b> ${form.name}\n📱 <b>Telefon:</b> ${form.phone}\n🏢 <b>Kompaniya:</b> ${form.company||'—'}\n📍 <b>Shahar:</b> ${form.city||'—'}\n🌐 <b>Manba:</b> tartibcrm.uz\n⏰ <b>Sana:</b> ${new Date().toLocaleString('uz-UZ')}`
    try {
      if (TG_BOT_TOKEN && TG_CHAT_ID) {
        await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ chat_id:TG_CHAT_ID, text:msg, parse_mode:'HTML' })
        })
      }
    } catch {}
    setLoading(false); setDone(true)
  }

  const fields = [
    { label:'Ism Familiya *', key:'name', ph:'Azimjon Mamutaliyev', icon:'👤', type:'text' },
    { label:'Telefon *',      key:'phone', ph:'+998 90 000 00 00',   icon:'📱', type:'tel' },
    { label:'Kompaniya',      key:'company', ph:'Gilam yuvish markazi', icon:'🏢', type:'text' },
  ]

  return (
    <section id="demo" aria-labelledby="demo-heading" style={{
      padding:'80px 16px',
      background:'linear-gradient(135deg,rgba(0,255,179,0.02),rgba(167,139,250,0.02))',
      borderTop:'1px solid rgba(0,255,179,0.06)',
      position:'relative', zIndex:2,
    }}>
      <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:600,height:600,borderRadius:'50%',border:'1px solid rgba(0,255,179,0.04)',pointerEvents:'none'}}/>

      <div ref={ref} className="demo-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:52,alignItems:'center',maxWidth:1000,margin:'0 auto'}}>

        {/* Left — value props */}
        <motion.div className="demo-left-hide" initial={{opacity:0,x:-32}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.7}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'4px 14px',borderRadius:99,background:'rgba(0,255,179,0.06)',border:'1px solid rgba(0,255,179,0.18)',fontSize:11,fontWeight:600,color:'#00FFB3',marginBottom:20,letterSpacing:2,textTransform:'uppercase'}}>
            🚀 Bepul demo
          </div>
          <h2 id="demo-heading" style={{fontSize:'clamp(24px,3.5vw,40px)',fontWeight:900,letterSpacing:'-1px',marginBottom:14,lineHeight:1.1}}>
            Sehxingizni<br/>
            <span style={{background:'linear-gradient(135deg,#00FFB3,#A78BFA)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              bugun tartibga soling
            </span>
          </h2>
          <p style={{fontSize:14,color:'#555',lineHeight:1.7,marginBottom:24}}>
            14 kunlik bepul sinov. Karta kerak emas. 1 soat ichida tizim sozlanadi.
          </p>
          {["14 kunlik bepul trial","Karta talab qilinmaydi","1 soat ichida sozlanadi","7/24 texnik yordam","Ma'lumotlaringiz xavfsiz"].map((b,i) => (
            <motion.div key={b} initial={{opacity:0,x:-16}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.3+i*0.06}}
              style={{display:'flex',alignItems:'center',gap:10,marginBottom:11,fontSize:14,color:'#666'}}>
              <div style={{width:20,height:20,borderRadius:'50%',background:'rgba(0,255,179,0.08)',border:'1px solid rgba(0,255,179,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:10,color:'#00FFB3'}}>✓</div>
              {b}
            </motion.div>
          ))}
        </motion.div>

        {/* Right — form */}
        <motion.div initial={{opacity:0,x:32}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.7,delay:0.15}}>
          <div className="demo-form-card" style={{background:'#0d0d14',border:'1px solid #1a1a2e',borderRadius:20,padding:28,boxShadow:'0 20px 60px rgba(0,0,0,0.4)'}}>
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  {/* Progress */}
                  <div style={{display:'flex',gap:4,marginBottom:22}}>
                    {fields.map((_,i) => (
                      <div key={i} style={{height:3,flex:1,borderRadius:2,background:i<=step?'#00FFB3':'#1a1a2e',transition:'background 0.3s'}}/>
                    ))}
                  </div>
                  <div style={{fontSize:18,fontWeight:800,marginBottom:4,letterSpacing:'-0.4px'}}>Demo so'rash</div>
                  <div style={{fontSize:13,color:'#555',marginBottom:22}}>24 soat ichida bog'lanamiz ✅</div>

                  <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:12}}>
                    {fields.map((f,i) => (
                      <div key={f.key}>
                        <div style={{fontSize:10,fontWeight:700,color:'#444',textTransform:'uppercase',letterSpacing:1,marginBottom:6}}>{f.label}</div>
                        <div style={{display:'flex',alignItems:'center',background:'#111',border:`1px solid ${i<=step?'rgba(0,255,179,0.2)':'#1a1a2e'}`,borderRadius:12,overflow:'hidden',transition:'border-color 0.3s'}}
                          onFocus={e=>{e.currentTarget.style.borderColor='#00FFB3';e.currentTarget.style.boxShadow='0 0 0 3px rgba(0,255,179,0.08)'}}
                          onBlur={e=>{e.currentTarget.style.borderColor=i<=step?'rgba(0,255,179,0.2)':'#1a1a2e';e.currentTarget.style.boxShadow='none'}}>
                          <span style={{padding:'0 12px',color:'#444',fontSize:16}}>{f.icon}</span>
                          <input type={f.type} placeholder={f.ph} required={f.key==='name'||f.key==='phone'}
                            value={form[f.key]} onChange={set(f.key)} onFocus={()=>setStep(Math.max(step,i))}
                            style={{flex:1,padding:'14px 12px 14px 0',background:'none',border:'none',outline:'none',color:'#f1f5f9',fontSize:15,fontFamily:'inherit',minWidth:0}}/>
                        </div>
                      </div>
                    ))}

                    {/* City */}
                    <div>
                      <div style={{fontSize:10,fontWeight:700,color:'#444',textTransform:'uppercase',letterSpacing:1,marginBottom:6}}>Shahar</div>
                      <div style={{display:'flex',alignItems:'center',background:'#111',border:'1px solid #1a1a2e',borderRadius:12,overflow:'hidden'}}>
                        <span style={{padding:'0 12px',color:'#444',fontSize:16}}>📍</span>
                        <select value={form.city} onChange={set('city')} style={{flex:1,padding:'14px 12px 14px 0',background:'none',border:'none',outline:'none',color:form.city?'#f1f5f9':'#444',fontSize:15,fontFamily:'inherit',cursor:'pointer'}}>
                          <option value="">— Tanlang —</option>
                          {["Toshkent","Samarqand","Buxoro","Namangan","Andijon","Farg'ona","Qarshi","Boshqa"].map(c=>(
                            <option key={c} value={c} style={{background:'#0d0d14'}}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <motion.button type="submit" disabled={loading} whileTap={{scale:0.97}}
                      style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'15px',borderRadius:12,border:'none',cursor:'pointer',fontSize:16,fontWeight:700,fontFamily:'inherit',background:'linear-gradient(135deg,#00FFB3,#00cc8e)',color:'#000',boxShadow:'0 4px 20px rgba(0,255,179,0.3)',opacity:loading?0.7:1,marginTop:4}}>
                      {loading
                        ? <><div style={{width:16,height:16,border:'2px solid rgba(0,0,0,0.3)',borderTopColor:'#000',borderRadius:'50%',animation:'spin 0.7s linear infinite'}}/> Yuborilmoqda...</>
                        : <>🚀 Demo so'rash</>}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="done" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} style={{textAlign:'center',padding:'24px 0'}}>
                  <motion.div animate={{scale:[1,1.2,1]}} transition={{duration:0.5}}
                    style={{width:64,height:64,borderRadius:'50%',background:'rgba(0,255,179,0.08)',border:'2px solid #00FFB3',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,margin:'0 auto 20px'}}>
                    ✓
                  </motion.div>
                  <div style={{fontSize:20,fontWeight:800,marginBottom:10,letterSpacing:'-0.5px'}}>Arizangiz qabul qilindi!</div>
                  <p style={{fontSize:14,color:'#555',lineHeight:1.7,marginBottom:20}}>
                    Tez orada siz bilan bog'lanamiz.<br/>O'rtacha kutish: <strong style={{color:'#f1f5f9'}}>1–3 soat</strong>
                  </p>
                  <div style={{padding:14,background:'rgba(0,255,179,0.04)',border:'1px solid rgba(0,255,179,0.1)',borderRadius:12,fontSize:13,color:'#555'}}>
                    📱 {form.phone} raqamiga WhatsApp orqali murojaat qilinadi
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:768px){
          .demo-grid{grid-template-columns:1fr!important;gap:0!important}
          .demo-left-hide{display:none!important}
          .demo-form-card{border-radius:16px!important;padding:20px 16px!important}
        }
      `}</style>
    </section>
  )
}
