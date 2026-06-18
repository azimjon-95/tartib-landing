'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const TABS = [
  { id:'dashboard', label:'Dashboard',   icon:'◈' },
  { id:'orders',    label:'Buyurtmalar', icon:'◎' },
  { id:'delivery',  label:'Yetkazish',   icon:'🗺' },
  { id:'finance',   label:'Moliya',      icon:'⬡' },
  { id:'staff',     label:'Xodimlar',    icon:'⬟' },
  { id:'settings',  label:'Sozlamalar',  icon:'△' },
]

const SCREENS = {
  dashboard: {
    color:'#00FFB3',
    title:"Bosh sahifa — real vaqt monitoring",
    desc:"52 ta faol buyurtma, 5 680 000 so'm kirim, 8/12 ishchi — hammasini bitta ekranda ko'ring.",
    realImage: '/images/dashboard-opt.png',
    realImageAlt: 'Tartib CRM Dashboard — real ekran',
    kpis:[
      {l:'Faol buyurtma', v:'52',          c:'#00FFB3'},
      {l:'Bugungi kirim', v:'5.6M',        c:'#A78BFA'},
      {l:'Jami balans',   v:'18.7M',       c:'#38BDF8'},
      {l:'Ishchi',        v:'8/12',        c:'#4ADE80'},
    ],
    rows:[
      {id:'#1042',name:'Azimjon M.',  sum:'2,400,000', status:'Yuvishda',   sc:'#38BDF8'},
      {id:'#1041',name:'Malika T.',   sum:'1,850,000', status:'Tayyor',     sc:'#4ADE80'},
      {id:'#1040',name:'Sardor K.',   sum:'5,600,000', status:'Yetkazishda',sc:'#FB923C'},
      {id:'#1039',name:'Dilnoza Y.',  sum:'900,000',   status:'Yangi',      sc:'#A78BFA'},
      {id:'#1038',name:'Bobur E.',    sum:'3,200,000', status:'Tayyor',     sc:'#4ADE80'},
    ],
  },
  orders: {
    color:'#A78BFA',
    title:'Buyurtmalar — Kanban board',
    desc:"Har bir buyurtma bosqichini drag-and-drop bilan boshqaring. Statuslar real vaqtda yangilanadi.",
    kanban:[
      {col:'Yangi',      color:'#A78BFA', cards:['#1042 — Azimjon M.','#1048 — Nilufar A.','#1050 — Jasur T.']},
      {col:'Qabul',      color:'#38BDF8', cards:['#1041 — Bobur K.','#1047 — Sanjar']},
      {col:'Yuvishda',   color:'#FB923C', cards:['#1039 — Sardor','#1037 — Malika']},
      {col:"Quritishda", color:'#00FFB3', cards:['#1035 — Jasur']},
      {col:'Tayyor',     color:'#4ADE80', cards:['#1031 ✅','#1030 ✅','#1029 ✅']},
    ],
  },
  delivery: {
    color:'#38BDF8',
    title:"Shofyorlaringiz nazorat ostida",
    desc:"Olib ketish, yetkazib berish, jonli xarita — shofyorlarni biriktirish va buyurtma holatini kuzatish.",
    realImage: '/images/transport-opt.jpg',
    realImageAlt: 'Tartib CRM Transport — GPS kuzatuv',
    drivers:[
      {name:'Sardor M.',  order:'#1042', status:"Yo'lda",    color:'#00FFB3', pct:65},
      {name:'Javlon K.',  order:'#1034', status:'Yetkazdi',  color:'#4ADE80', pct:100},
      {name:'Bahodir S.', order:'#1035', status:'Qaytmoqda', color:'#A78BFA', pct:80},
      {name:'Nodir T.',   order:'#1048', status:"Yo'lda",    color:'#38BDF8', pct:30},
    ],
  },
  finance: {
    color:'#4ADE80',
    title:"Moliya — kirim-chiqim nazorat",
    desc:"Har kunlik, haftalik, oylik moliyaviy hisobot. Qarzdor mijozlar va xarajatlar tahlili.",
    items:[
      {l:'Kirim',   v:'48.2M', c:'#4ADE80', pct:85},
      {l:'Chiqim',  v:'12.8M', c:'#F87171', pct:28},
      {l:'Foyda',   v:'35.4M', c:'#00FFB3', pct:72},
      {l:'Qarzdor', v:'7.4M',  c:'#FB923C', pct:18},
    ],
  },
  staff: {
    color:'#FB923C',
    title:"Xodimlar va maosh — to'liq nazorat",
    desc:"Kv.m bo'yicha avtomatik ish haqi. Avans, jarima, bonus — hammasi avtomatik hisoblanadi.",
    workers:[
      {name:'Azimjon M.', role:'Yuvuvchi', salary:'1,200,000', kvm:'142', color:'#00FFB3'},
      {name:'Bobur K.',   role:'Yuvuvchi', salary:'1,000,000', kvm:'118', color:'#38BDF8'},
      {name:'Sardor K.',  role:'Bezakchi', salary:'900,000',   kvm:'95',  color:'#A78BFA'},
      {name:'Dilnoza Y.', role:'Qabul',    salary:'800,000',   kvm:'—',   color:'#4ADE80'},
      {name:'Jasur T.',   role:'Haydovchi',salary:'750,000',   kvm:'—',   color:'#FB923C'},
    ],
  },
  settings: {
    color:'#F59E0B',
    title:"Sozlamalar — tizim konfiguratsiyasi",
    desc:"Telegram bot, SMS, narxlar, foydalanuvchi rollari va ruxsatlarini sozlang.",
    opts:[
      {icon:'🤖', label:'Telegram Bot',   val:'Ulangan ✓',    c:'#4ADE80'},
      {icon:'💬', label:'SMS Gateway',    val:'Ulangan ✓',    c:'#4ADE80'},
      {icon:'💰', label:'Narx (1 kv.m)',  val:"12,000 so'm",  c:'#F59E0B'},
      {icon:'👥', label:'Foydalanuvchi',  val:'7 ta aktiv',   c:'#38BDF8'},
      {icon:'🔒', label:'2FA himoya',     val:'Yoqilgan',     c:'#4ADE80'},
      {icon:'📊', label:'Hisobot davri',  val:'Oylik',        c:'#A78BFA'},
    ],
  },
}

/* ── Desktop real image viewer ── */
function DesktopRealImage({ src, alt, color }) {
  return (
    <div style={{
      width:'100%', maxWidth:960, margin:'0 auto',
      borderRadius:16, overflow:'hidden',
      border:`1px solid ${color}25`,
      boxShadow:`0 32px 80px rgba(0,0,0,0.7), 0 0 60px ${color}10`,
      position:'relative',
    }}>
      {/* Browser chrome */}
      <div style={{
        background:'#0d1120', padding:'10px 16px',
        display:'flex', alignItems:'center', gap:10,
        borderBottom:'1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{display:'flex',gap:6,flexShrink:0}}>
          {['#ff5f57','#febc2e','#28c840'].map(c=>(
            <div key={c} style={{width:11,height:11,borderRadius:'50%',background:c}}/>
          ))}
        </div>
        <div style={{
          flex:1, maxWidth:360, margin:'0 auto',
          background:'rgba(0,0,0,0.4)', borderRadius:8,
          padding:'4px 12px', display:'flex', alignItems:'center', gap:6,
          border:'1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{fontSize:10,color:'#4ADE80'}}>🔒</span>
          <span style={{fontSize:11,color:'#556',fontFamily:'monospace'}}>app.tartibcrm.uz/dashboard</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:5,marginLeft:'auto'}}>
          <div style={{width:6,height:6,borderRadius:'50%',background:color,boxShadow:`0 0 6px ${color}`,animation:'ping 1.4s infinite'}}/>
          <span style={{fontSize:9,color,fontWeight:700}}>LIVE</span>
        </div>
      </div>
      {/* Real screenshot */}
      <div style={{position:'relative', width:'100%'}}>
        <img
          src={src} alt={alt}
          style={{
            width:'100%', height:'auto',
            display:'block',
            maxHeight:460,
            objectFit:'cover',
            objectPosition:'top',
          }}
          loading="lazy"
        />
        {/* "Haqiqiy ekran" badge */}
        <div style={{
          position:'absolute', top:12, right:12,
          background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)',
          border:`1px solid ${color}40`,
          borderRadius:99, padding:'4px 12px',
          fontSize:10, fontWeight:700, color,
          display:'flex', alignItems:'center', gap:5,
        }}>
          <span style={{width:6,height:6,borderRadius:'50%',background:color,display:'inline-block'}}/>
          HAQIQIY EKRAN
        </div>
      </div>
    </div>
  )
}

/* ── Desktop mock content (tabs without real image) ── */
function DesktopMockContent({ id }) {
  const s = SCREENS[id]
  const sideItems = TABS

  return (
    <div style={{
      width:'100%', maxWidth:960, margin:'0 auto',
      borderRadius:16, overflow:'hidden',
      border:`1px solid ${s.color}25`,
      boxShadow:`0 32px 80px rgba(0,0,0,0.6)`,
    }}>
      <div style={{background:'#0d1120',padding:'10px 16px',display:'flex',alignItems:'center',gap:10,borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div style={{display:'flex',gap:6,flexShrink:0}}>
          {['#ff5f57','#febc2e','#28c840'].map(c=><div key={c} style={{width:11,height:11,borderRadius:'50%',background:c}}/>)}
        </div>
        <div style={{flex:1,maxWidth:360,margin:'0 auto',background:'rgba(0,0,0,0.4)',borderRadius:8,padding:'4px 12px',display:'flex',alignItems:'center',gap:6,border:'1px solid rgba(255,255,255,0.06)'}}>
          <span style={{fontSize:10,color:'#4ADE80'}}>🔒</span>
          <span style={{fontSize:11,color:'#556',fontFamily:'monospace'}}>app.tartibcrm.uz/{id}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:5,marginLeft:'auto'}}>
          <div style={{width:6,height:6,borderRadius:'50%',background:s.color,animation:'ping 1.4s infinite'}}/>
          <span style={{fontSize:9,color:s.color,fontWeight:700}}>LIVE</span>
        </div>
      </div>
      <div style={{display:'flex',height:380,fontSize:12}}>
        {/* Sidebar */}
        <div style={{width:160,background:'#050810',borderRight:'1px solid rgba(0,255,179,0.08)',display:'flex',flexDirection:'column',flexShrink:0}}>
          <div style={{padding:'12px 10px 10px',borderBottom:'1px solid rgba(0,255,179,0.06)'}}>
            <div style={{display:'flex',alignItems:'center',gap:7}}>
              <div style={{width:24,height:24,borderRadius:6,background:'linear-gradient(135deg,#00FFB3,#A78BFA)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:12,color:'#000'}}>T</div>
              <div style={{fontSize:11,fontWeight:800,color:'#fff'}}>TartibCRM</div>
            </div>
          </div>
          {sideItems.map(t=>(
            <div key={t.id} style={{padding:'8px 10px',fontSize:10,cursor:'pointer',color:t.id===id?s.color:'#445',background:t.id===id?`rgba(${id==='dashboard'?'0,255,179':'167,139,250'},0.07)`:'transparent',borderLeft:t.id===id?`2px solid ${s.color}`:'2px solid transparent',display:'flex',alignItems:'center',gap:7}}>
              <span style={{fontSize:13}}>{t.icon}</span> {t.label}
            </div>
          ))}
        </div>
        {/* Content */}
        <div style={{flex:1,background:'#070b14',overflow:'hidden',padding:'16px'}}>
          {id==='orders' && s.kanban && (
            <div style={{display:'flex',gap:8,height:'100%'}}>
              {s.kanban.map(col=>(
                <div key={col.col} style={{flex:1,background:'rgba(255,255,255,0.02)',borderRadius:10,padding:'8px 6px',border:`1px solid ${col.color}15`}}>
                  <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:6}}>
                    <div style={{width:6,height:6,borderRadius:'50%',background:col.color}}/>
                    <span style={{fontSize:8,fontWeight:800,color:col.color,textTransform:'uppercase'}}>{col.col}</span>
                  </div>
                  {col.cards.map(c=>(
                    <div key={c} style={{background:'rgba(15,25,45,0.95)',borderRadius:7,padding:'6px 7px',marginBottom:5,borderLeft:`2px solid ${col.color}`,fontSize:8,color:'#94a3b8'}}>{c}</div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {id==='finance' && s.items && (
            <div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginBottom:12}}>
                {[['↑ 48.2M','Kirim','#4ADE80'],['↓ 12.8M','Chiqim','#F87171'],['= 35.4M','Foyda','#00FFB3'],['⚠ 7.4M','Qarzdor','#FB923C']].map(([v,l,c])=>(
                  <div key={l} style={{background:`${c}0d`,border:`1px solid ${c}20`,borderRadius:10,padding:'10px 12px'}}>
                    <div style={{fontSize:16,fontWeight:900,color:c,fontFamily:'monospace'}}>{v}</div>
                    <div style={{fontSize:9,color:'#556',marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
              {s.items.map(item=>(
                <div key={item.l} style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{fontSize:10,color:'#888'}}>{item.l}</span>
                    <span style={{fontSize:11,fontWeight:800,color:item.c,fontFamily:'monospace'}}>{item.v}</span>
                  </div>
                  <div style={{height:5,background:'rgba(255,255,255,0.05)',borderRadius:99,overflow:'hidden'}}>
                    <div style={{width:`${item.pct}%`,height:'100%',background:`linear-gradient(90deg,${item.c},${item.c}88)`,borderRadius:99}}/>
                  </div>
                </div>
              ))}
            </div>
          )}
          {id==='staff' && s.workers && (
            <div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:12}}>
                {[['12','Jami xodim','#00FFB3'],['8/12','Bugun aktiv','#38BDF8'],['4.8M','Oylik fond','#A78BFA']].map(([v,l,c])=>(
                  <div key={l} style={{background:`${c}0d`,border:`1px solid ${c}20`,borderRadius:10,padding:'10px 12px'}}>
                    <div style={{fontSize:18,fontWeight:900,color:c,fontFamily:'monospace'}}>{v}</div>
                    <div style={{fontSize:9,color:'#556',marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'#0d1120',borderRadius:10,border:'1px solid rgba(0,255,179,0.06)',overflow:'hidden'}}>
                {s.workers.map(w=>(
                  <div key={w.name} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',padding:'8px 12px',borderBottom:'1px solid rgba(255,255,255,0.03)',alignItems:'center'}}>
                    <div style={{display:'flex',alignItems:'center',gap:7}}>
                      <div style={{width:22,height:22,borderRadius:'50%',background:`${w.color}18`,border:`1px solid ${w.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11}}>👤</div>
                      <span style={{fontSize:11,fontWeight:600,color:'#f1f5f9'}}>{w.name}</span>
                    </div>
                    <span style={{fontSize:9,color:'#667'}}>{w.role}</span>
                    <span style={{fontSize:10,color:'#94a3b8',fontFamily:'monospace'}}>{w.kvm}</span>
                    <span style={{fontSize:10,color:'#00FFB3',fontFamily:'monospace',fontWeight:700}}>{w.salary}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {id==='settings' && s.opts && (
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div style={{background:'#0d1120',borderRadius:10,padding:'12px',border:'1px solid rgba(0,255,179,0.06)'}}>
                {s.opts.map(o=>(
                  <div key={o.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 10px',borderRadius:8,marginBottom:5,background:'rgba(255,255,255,0.02)'}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontSize:15}}>{o.icon}</span>
                      <span style={{fontSize:10,color:'#888'}}>{o.label}</span>
                    </div>
                    <span style={{fontSize:10,color:o.c,fontWeight:700}}>{o.val}</span>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {[['Foydalanuvchi','7 ta','#38BDF8'],['Backup','Kunlik','#4ADE80'],['SSL','Faol','#4ADE80'],['2FA','Yoqilgan','#4ADE80']].map(([l,v,c])=>(
                  <div key={l} style={{background:`${c}08`,border:`1px solid ${c}18`,borderRadius:10,padding:'12px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontSize:10,color:'#888'}}>{l}</span>
                    <span style={{fontSize:12,fontWeight:800,color:c}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Mobile content ── */
function MobileContent({ id }) {
  const s = SCREENS[id]
  if (!s) return null

  // Real image tabs — mobile da to'liq ko'rinadi
  if (s.realImage) {
    return (
      <div style={{position:'relative'}}>
        <img
          src={s.realImage} alt={s.realImageAlt}
          style={{width:'100%',height:'auto',display:'block'}}
          loading="lazy"
        />
        <div style={{
          position:'absolute',top:10,right:10,
          background:'rgba(0,0,0,0.75)',backdropFilter:'blur(6px)',
          border:`1px solid ${s.color}40`,borderRadius:99,
          padding:'3px 10px',fontSize:9,fontWeight:700,color:s.color,
          display:'flex',alignItems:'center',gap:4,
        }}>
          <span style={{width:5,height:5,borderRadius:'50%',background:s.color,display:'inline-block'}}/>
          HAQIQIY EKRAN
        </div>
      </div>
    )
  }

  if (id==='orders') return (
    <div style={{padding:'12px',overflowX:'auto'}}>
      <div style={{display:'flex',gap:7,minWidth:380}}>
        {s.kanban.map(col=>(
          <div key={col.col} style={{flex:1,minWidth:68,background:'rgba(255,255,255,0.02)',borderRadius:9,padding:'7px 5px',border:`1px solid ${col.color}18`}}>
            <div style={{display:'flex',alignItems:'center',gap:3,marginBottom:5}}>
              <div style={{width:5,height:5,borderRadius:'50%',background:col.color}}/>
              <span style={{fontSize:7,fontWeight:800,color:col.color,textTransform:'uppercase'}}>{col.col}</span>
            </div>
            {col.cards.map(c=>(
              <div key={c} style={{background:'rgba(20,30,50,0.9)',borderRadius:5,padding:'4px 6px',marginBottom:4,borderLeft:`2px solid ${col.color}`,fontSize:7,color:'#aaa'}}>{c}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
  if (id==='finance') return (
    <div style={{padding:'12px'}}>
      {s.items.map(item=>(
        <div key={item.l} style={{marginBottom:12}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
            <span style={{fontSize:11,color:'#888'}}>{item.l}</span>
            <span style={{fontSize:12,fontWeight:800,color:item.c,fontFamily:'monospace'}}>{item.v} so'm</span>
          </div>
          <div style={{height:5,background:'rgba(255,255,255,0.05)',borderRadius:99,overflow:'hidden'}}>
            <div style={{width:`${item.pct}%`,height:'100%',background:`linear-gradient(90deg,${item.c},${item.c}88)`,borderRadius:99}}/>
          </div>
        </div>
      ))}
    </div>
  )
  if (id==='staff') return (
    <div style={{padding:'12px'}}>
      {s.workers.map(w=>(
        <div key={w.name} style={{display:'flex',gap:9,alignItems:'center',padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
          <div style={{width:30,height:30,borderRadius:'50%',background:`${w.color}18`,border:`1px solid ${w.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,flexShrink:0}}>👤</div>
          <div style={{flex:1}}>
            <div style={{fontSize:11,fontWeight:700,color:'#f1f5f9'}}>{w.name}</div>
            <div style={{fontSize:9,color:'#555'}}>{w.role} · {w.kvm} kv.m</div>
          </div>
          <div style={{fontSize:11,color:'#00FFB3',fontFamily:'monospace',fontWeight:700}}>{w.salary}</div>
        </div>
      ))}
    </div>
  )
  if (id==='settings') return (
    <div style={{padding:'12px'}}>
      {s.opts.map(o=>(
        <div key={o.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 10px',borderRadius:9,marginBottom:5,background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.04)'}}>
          <div style={{display:'flex',alignItems:'center',gap:7}}>
            <span style={{fontSize:15}}>{o.icon}</span>
            <span style={{fontSize:11,color:'#888'}}>{o.label}</span>
          </div>
          <span style={{fontSize:10,color:o.c,fontWeight:700}}>{o.val}</span>
        </div>
      ))}
    </div>
  )
  return null
}

export default function Screenshots() {
  const [active, setActive] = useState('dashboard')
  const [isMobile, setIsMobile] = useState(false)
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.05 })
  const s = SCREENS[active]

  useEffect(()=>{
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  },[])

  const hasRealImage = !!s.realImage

  return (
    <section id="screenshots" aria-labelledby="screenshots-heading"
      style={{padding:'80px 0',background:'linear-gradient(180deg,#050508,#07091a,#050508)',position:'relative',overflow:'hidden',zIndex:2}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:700,height:500,background:'radial-gradient(ellipse,rgba(0,255,179,0.03),transparent)',pointerEvents:'none'}}/>

      <div ref={ref} style={{maxWidth:1200,margin:'0 auto',padding:'0 20px'}}>

        {/* Header */}
        <motion.div initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}} style={{textAlign:'center',marginBottom:40}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'4px 14px',borderRadius:99,background:'rgba(0,255,179,0.06)',border:'1px solid rgba(0,255,179,0.18)',fontSize:11,fontWeight:600,color:'#00FFB3',marginBottom:16,letterSpacing:2,textTransform:'uppercase'}}>
            ◈ Tizim sahifalari
          </div>
          <h2 id="screenshots-heading" style={{fontSize:'clamp(22px,4vw,44px)',fontWeight:900,letterSpacing:'-1.5px',lineHeight:1.1,marginBottom:12}}>
            Har bir sahifa maqsadga<br/>
            <span style={{background:'linear-gradient(135deg,#00FFB3,#A78BFA)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              mo'ljallangan
            </span>
          </h2>
          <p style={{fontSize:isMobile?13:15,color:'#556',maxWidth:480,margin:'0 auto',lineHeight:1.65}}>
            Dashboard va transport — haqiqiy ekranlar. Ko'rganingiz — ishlayotgan tizim.
          </p>
        </motion.div>

        {/* Tabs */}
        <div style={{display:'flex',gap:8,marginBottom:28,overflowX:'auto',WebkitOverflowScrolling:'touch',paddingBottom:4,scrollbarWidth:'none',justifyContent:isMobile?'flex-start':'center'}}>
          {TABS.map(t=>(
            <motion.button key={t.id} onClick={()=>setActive(t.id)}
              whileTap={{scale:0.94}}
              style={{
                display:'flex',alignItems:'center',gap:7,
                padding:isMobile?'8px 14px':'10px 20px',
                borderRadius:12,
                background:active===t.id?`${SCREENS[t.id].color}14`:'rgba(255,255,255,0.03)',
                border:`1px solid ${active===t.id?SCREENS[t.id].color+'50':'rgba(255,255,255,0.06)'}`,
                color:active===t.id?SCREENS[t.id].color:'#555',
                cursor:'pointer',fontFamily:'inherit',
                fontSize:isMobile?12:13,
                fontWeight:active===t.id?700:500,
                whiteSpace:'nowrap',flexShrink:0,
                transition:'all 0.2s',
                position:'relative',
              }}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
              {/* "REAL" badge for tabs with real images */}
              {SCREENS[t.id].realImage && (
                <span style={{
                  fontSize:7,fontWeight:800,padding:'1px 5px',
                  borderRadius:4,background:SCREENS[t.id].color,
                  color:'#000',letterSpacing:0.5,
                }}>REAL</span>
              )}
            </motion.button>
          ))}
          <style>{`div::-webkit-scrollbar{display:none}`}</style>
        </div>

        {/* Preview */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{opacity:0,y:12,scale:0.99}}
            animate={{opacity:1,y:0,scale:1}}
            exit={{opacity:0,y:-12,scale:0.99}}
            transition={{duration:0.25}}>

            {/* Description */}
            <div style={{textAlign:'center',marginBottom:24,maxWidth:640,margin:'0 auto 24px'}}>
              <div style={{
                fontSize:isMobile?14:17,fontWeight:800,color:'#f1f5f9',
                marginBottom:6,letterSpacing:'-0.3px',
                display:'flex',alignItems:'center',justifyContent:'center',gap:8,flexWrap:'wrap',
              }}>
                {s.title}
                {hasRealImage && (
                  <span style={{fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:6,background:`${s.color}15`,color:s.color,border:`1px solid ${s.color}30`}}>
                    ✦ Haqiqiy ekran
                  </span>
                )}
              </div>
              <div style={{fontSize:isMobile?12:14,color:'#556',lineHeight:1.65}}>{s.desc}</div>
            </div>

            {/* ── DESKTOP ── */}
            {!isMobile && (
              hasRealImage
                ? <DesktopRealImage src={s.realImage} alt={s.realImageAlt} color={s.color}/>
                : <DesktopMockContent id={active}/>
            )}

            {/* ── MOBILE ── */}
            {isMobile && (
              <div style={{
                width:'100%',maxWidth:380,margin:'0 auto',
                background:'#0d1120',borderRadius:22,
                overflow:'hidden',
                border:`1px solid ${s.color}18`,
                boxShadow:`0 20px 60px rgba(0,0,0,0.5)`,
              }}>
                <div style={{background:'#080c18',padding:'9px 14px 7px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:7}}>
                    <div style={{width:20,height:20,borderRadius:5,background:'linear-gradient(135deg,#00FFB3,#A78BFA)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:900,color:'#000'}}>T</div>
                    <span style={{fontSize:11,fontWeight:800,color:'#f1f5f9'}}>TartibCRM</span>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:4}}>
                    <div style={{width:5,height:5,borderRadius:'50%',background:'#4ADE80',animation:'pulse 2s infinite'}}/>
                    <span style={{fontSize:9,color:'#4ADE80',fontWeight:700}}>LIVE</span>
                  </div>
                </div>
                <div style={{minHeight:200}}><MobileContent id={active}/></div>
                <div style={{background:'#060a14',borderTop:'1px solid rgba(255,255,255,0.04)',padding:'7px 0',display:'flex',justifyContent:'space-around'}}>
                  {TABS.slice(0,5).map(t=>(
                    <button key={t.id} onClick={()=>setActive(t.id)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'3px 8px',background:'none',border:'none',cursor:'pointer',color:active===t.id?SCREENS[t.id].color:'#333',transition:'color 0.2s'}}>
                      <span style={{fontSize:15}}>{t.icon}</span>
                      <span style={{fontSize:7,fontWeight:active===t.id?700:400,fontFamily:'inherit'}}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}`}</style>
    </section>
  )
}
