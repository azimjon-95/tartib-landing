'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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
    title:"Bosh sahifa — to'liq ko'rinish",
    desc:"Bugungi buyurtmalar, kirim, chiqim, ishchilar holati — hammasini bir ekranda ko'ring.",
    kpis:[
      {l:'Bugungi sotuv',  v:'124.5M', c:'#00FFB3'},
      {l:'Yangi buyurtma', v:'47',     c:'#A78BFA'},
      {l:'Yetkazishda',    v:'12',     c:'#38BDF8'},
      {l:'Oylik foyda',    v:'48.2M',  c:'#4ADE80'},
    ],
    rows:[
      {id:'#1042',name:'Azimjon M.',   sum:'2,400,000', status:'Yuvishda',   sc:'#38BDF8'},
      {id:'#1041',name:'Malika T.',    sum:'1,850,000', status:'Tayyor',     sc:'#4ADE80'},
      {id:'#1040',name:'Sardor K.',    sum:'5,600,000', status:'Yetkazishda',sc:'#FB923C'},
      {id:'#1039',name:'Dilnoza Y.',   sum:'900,000',   status:'Yangi',      sc:'#A78BFA'},
    ],
  },
  orders: {
    color:'#A78BFA',
    title:'Buyurtmalar — Kanban board',
    desc:"Har bir buyurtma bosqichini drag-and-drop bilan boshqaring. Statuslar avtomatik yangilanadi.",
    kanban:[
      {col:'Yangi',      color:'#A78BFA', cards:['#1042 — Azimjon','#1048 — Nilufar']},
      {col:'Qabul',      color:'#38BDF8', cards:['#1041 — Bobur']},
      {col:'Yuvishda',   color:'#FB923C', cards:['#1039 — Sardor','#1037 — Malika']},
      {col:"Quritishda", color:'#00FFB3', cards:['#1035 — Jasur']},
      {col:'Tayyor',     color:'#4ADE80', cards:['#1031 ✅','#1030 ✅']},
    ],
  },
  delivery: {
    color:'#38BDF8',
    title:"Yetkazib berish — real vaqt xarita",
    desc:"Shafyorlar Toshkent ko'chalari bo'ylab. Har buyurtma real vaqtda kuzatiladi.",
    drivers:[
      {name:'Sardor',  order:'#1042', status:"Yo'lda",    color:'#00FFB3', pct:65},
      {name:'Javlon',  order:'#1034', status:'Yetkazdi',  color:'#4ADE80', pct:100},
      {name:'Bahodir', order:'#1035', status:'Qaytmoqda', color:'#A78BFA', pct:80},
      {name:'Nodir',   order:'#1048', status:"Yo'lda",    color:'#38BDF8', pct:30},
    ],
  },
  finance: {
    color:'#4ADE80',
    title:"Moliya — kirim-chiqim nazorat",
    desc:"Har kunlik, haftalik, oylik moliyaviy hisobot. Qarzdor mijozlar, xarajatlar tahlili.",
    items:[
      {l:'Kirim',   v:'48.2M', c:'#4ADE80', pct:85},
      {l:'Chiqim',  v:'12.8M', c:'#F87171', pct:28},
      {l:'Foyda',   v:'35.4M', c:'#00FFB3', pct:72},
      {l:'Qarzdor', v:'2.3M',  c:'#FB923C', pct:12},
    ],
  },
  staff: {
    color:'#FB923C',
    title:"Xodimlar va maosh — to'liq nazorat",
    desc:"Kv.m bo'yicha avtomatik ish haqi. Avans, jarima, bonus — hammasi avtomatik.",
    workers:[
      {name:'Azimjon M.', role:'Yuvuvchi', salary:'1,200,000', kvm:'142', color:'#00FFB3'},
      {name:'Bobur K.',   role:'Yuvuvchi', salary:'1,000,000', kvm:'118', color:'#38BDF8'},
      {name:'Sardor K.',  role:'Bezakchi', salary:'900,000',   kvm:'95',  color:'#A78BFA'},
      {name:'Dilnoza Y.', role:'Qabul',    salary:'800,000',   kvm:'—',   color:'#4ADE80'},
    ],
  },
  settings: {
    color:'#F59E0B',
    title:"Sozlamalar — tizim konfiguratsiyasi",
    desc:"Telegram bot, SMS, narxlar, rollar, ruxsatlar — barchasini sozlang.",
    opts:[
      {icon:'🤖', label:'Telegram Bot',   val:'Ulangan ✓',  c:'#4ADE80'},
      {icon:'💬', label:'SMS Gateway',    val:"Ulangan ✓",  c:'#4ADE80'},
      {icon:'💰', label:'Narx (1 kv.m)',  val:'12,000 so\'m', c:'#F59E0B'},
      {icon:'👥', label:'Foydalanuvchi',  val:'7 ta aktiv', c:'#38BDF8'},
      {icon:'🔒', label:'2FA himoya',     val:"Yoqilgan",   c:'#4ADE80'},
      {icon:'📊', label:'Hisobot davri',  val:'Oylik',      c:'#A78BFA'},
    ],
  },
}

function ScreenContent({ id }) {
  const s = SCREENS[id]
  if (!s) return null

  if (id === 'dashboard') return (
    <div style={{padding:'14px'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
        {s.kpis.map(k=>(
          <div key={k.l} style={{background:`${k.c}0d`,border:`1px solid ${k.c}20`,borderRadius:10,padding:'10px 12px'}}>
            <div style={{fontSize:18,fontWeight:900,color:k.c,fontFamily:'monospace'}}>{k.v}</div>
            <div style={{fontSize:9,color:'#555',marginTop:2}}>{k.l}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:10,color:'#555',marginBottom:8,fontWeight:600}}>So'nggi buyurtmalar</div>
      {s.rows.map(r=>(
        <div key={r.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:'#f1f5f9'}}>{r.name}</div>
            <div style={{fontSize:9,color:'#555'}}>{r.id}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:11,color:'#00FFB3',fontFamily:'monospace'}}>{r.sum}</div>
            <div style={{fontSize:9,color:r.sc,fontWeight:600}}>{r.status}</div>
          </div>
        </div>
      ))}
    </div>
  )

  if (id === 'orders') return (
    <div style={{padding:'14px',overflowX:'auto'}}>
      <div style={{display:'flex',gap:8,minWidth:400}}>
        {s.kanban.map(col=>(
          <div key={col.col} style={{flex:1,minWidth:72,background:'rgba(255,255,255,0.02)',borderRadius:10,padding:'8px 6px',border:`1px solid ${col.color}18`}}>
            <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:6}}>
              <div style={{width:5,height:5,borderRadius:'50%',background:col.color}}/>
              <span style={{fontSize:8,fontWeight:800,color:col.color,textTransform:'uppercase'}}>{col.col}</span>
            </div>
            {col.cards.map(c=>(
              <div key={c} style={{background:'rgba(20,30,50,0.9)',borderRadius:6,padding:'5px 6px',marginBottom:5,borderLeft:`2px solid ${col.color}`,fontSize:8,color:'#aaa'}}>{c}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  if (id === 'delivery') return (
    <div style={{padding:'14px'}}>
      {s.drivers.map(d=>(
        <div key={d.name} style={{marginBottom:12}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
            <div style={{display:'flex',alignItems:'center',gap:7}}>
              <div style={{width:26,height:26,borderRadius:'50%',background:`${d.color}18`,border:`1px solid ${d.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>🚗</div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:'#f1f5f9'}}>{d.name}</div>
                <div style={{fontSize:9,color:'#555'}}>{d.order}</div>
              </div>
            </div>
            <div style={{fontSize:9,color:d.color,fontWeight:700,alignSelf:'center'}}>{d.status}</div>
          </div>
          <div style={{height:3,background:'rgba(255,255,255,0.06)',borderRadius:99,overflow:'hidden'}}>
            <div style={{width:`${d.pct}%`,height:'100%',background:`linear-gradient(90deg,${d.color},${d.color}88)`,borderRadius:99}}/>
          </div>
        </div>
      ))}
    </div>
  )

  if (id === 'finance') return (
    <div style={{padding:'14px'}}>
      {s.items.map(item=>(
        <div key={item.l} style={{marginBottom:14}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
            <span style={{fontSize:11,color:'#888'}}>{item.l}</span>
            <span style={{fontSize:13,fontWeight:800,color:item.c,fontFamily:'monospace'}}>{item.v} so'm</span>
          </div>
          <div style={{height:6,background:'rgba(255,255,255,0.05)',borderRadius:99,overflow:'hidden'}}>
            <div style={{width:`${item.pct}%`,height:'100%',background:`linear-gradient(90deg,${item.c},${item.c}88)`,borderRadius:99}}/>
          </div>
        </div>
      ))}
    </div>
  )

  if (id === 'staff') return (
    <div style={{padding:'14px'}}>
      {s.workers.map(w=>(
        <div key={w.name} style={{display:'flex',gap:10,alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
          <div style={{width:32,height:32,borderRadius:'50%',background:`${w.color}18`,border:`1px solid ${w.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>👤</div>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:700,color:'#f1f5f9'}}>{w.name}</div>
            <div style={{fontSize:9,color:'#555'}}>{w.role} · {w.kvm} kv.m</div>
          </div>
          <div style={{fontSize:11,color:'#00FFB3',fontFamily:'monospace',fontWeight:700}}>{w.salary}</div>
        </div>
      ))}
    </div>
  )

  if (id === 'settings') return (
    <div style={{padding:'14px'}}>
      {s.opts.map(o=>(
        <div key={o.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 10px',borderRadius:10,marginBottom:6,background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.04)'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:15}}>{o.icon}</span>
            <span style={{fontSize:12,color:'#888'}}>{o.label}</span>
          </div>
          <span style={{fontSize:11,color:o.c,fontWeight:700}}>{o.val}</span>
        </div>
      ))}
    </div>
  )

  return null
}

export default function Screenshots() {
  const [active, setActive] = useState('dashboard')
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.1 })
  const s = SCREENS[active]

  return (
    <section id="screenshots" aria-labelledby="screenshots-heading" style={{padding:'80px 0',background:'linear-gradient(180deg,#050508,#07091a,#050508)',position:'relative',overflow:'hidden',zIndex:2}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:400,background:'radial-gradient(ellipse,rgba(0,255,179,0.03),transparent)',pointerEvents:'none'}}/>

      <div ref={ref} style={{maxWidth:1100,margin:'0 auto',padding:'0 16px'}}>
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
        </motion.div>

        {/* Tabs — horizontally scrollable on mobile */}
        <div className="screenshots-tabs" style={{display:'flex',gap:8,marginBottom:24,overflowX:'auto',WebkitOverflowScrolling:'touch',paddingBottom:4,scrollbarWidth:'none'}}>
          {TABS.map(t=>(
            <motion.button key={t.id} onClick={()=>setActive(t.id)}
              className="screenshots-tab"
              whileTap={{scale:0.94}}
              style={{
                display:'flex',alignItems:'center',gap:7,
                padding:'9px 16px',borderRadius:12,
                background:active===t.id?`${SCREENS[t.id].color}14`:'rgba(255,255,255,0.03)',
                border:`1px solid ${active===t.id?SCREENS[t.id].color+'50':'rgba(255,255,255,0.06)'}`,
                color:active===t.id?SCREENS[t.id].color:'#555',
                cursor:'pointer',fontFamily:'inherit',
                fontSize:13,fontWeight:active===t.id?700:500,
                whiteSpace:'nowrap',flexShrink:0,
                transition:'all 0.2s',
              }}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </motion.button>
          ))}
          <style>{`.screenshots-tabs::-webkit-scrollbar{display:none}`}</style>
        </div>

        {/* Phone mockup */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{opacity:0,y:12}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-12}}
            transition={{duration:0.25}}
            style={{display:'flex',flexDirection:'column',gap:16,alignItems:'center'}}>

            {/* Description */}
            <div style={{textAlign:'center',maxWidth:540}}>
              <div style={{fontSize:16,fontWeight:800,color:'#f1f5f9',marginBottom:6,letterSpacing:'-0.3px'}}>{s.title}</div>
              <div style={{fontSize:13,color:'#555',lineHeight:1.65}}>{s.desc}</div>
            </div>

            {/* Phone frame */}
            <div style={{
              width:'100%',maxWidth:360,
              background:'#0d1120',
              borderRadius:24,
              overflow:'hidden',
              border:'1px solid rgba(0,255,179,0.12)',
              boxShadow:`0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${s.color}10`,
            }}>
              {/* Phone top bar */}
              <div style={{background:'#080c18',padding:'10px 16px 8px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <div style={{display:'flex',alignItems:'center',gap:7}}>
                  <div style={{width:22,height:22,borderRadius:6,background:'linear-gradient(135deg,#00FFB3,#A78BFA)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:900,color:'#000'}}>T</div>
                  <div>
                    <div style={{fontSize:11,fontWeight:800,color:'#f1f5f9',lineHeight:1.1}}>TartibCRM</div>
                    <div style={{fontSize:8,color:'#555'}}>app.tartibcrm.uz</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:4}}>
                  <div style={{width:6,height:6,borderRadius:'50%',background:'#4ADE80',boxShadow:'0 0 5px #4ADE80',animation:'pulse 2s infinite'}}/>
                  <span style={{fontSize:9,color:'#4ADE80',fontWeight:700}}>LIVE</span>
                </div>
              </div>
              {/* Content */}
              <div style={{minHeight:260}}>
                <ScreenContent id={active} />
              </div>
              {/* Bottom nav bar */}
              <div style={{background:'#060a14',borderTop:'1px solid rgba(255,255,255,0.04)',padding:'8px 0',display:'flex',justifyContent:'space-around'}}>
                {TABS.slice(0,5).map(t=>(
                  <button key={t.id} onClick={()=>setActive(t.id)} style={{
                    display:'flex',flexDirection:'column',alignItems:'center',gap:2,
                    padding:'4px 8px',background:'none',border:'none',cursor:'pointer',
                    color:active===t.id?SCREENS[t.id].color:'#333',transition:'color 0.2s',
                  }}>
                    <span style={{fontSize:16}}>{t.icon}</span>
                    <span style={{fontSize:7,fontWeight:active===t.id?700:400,fontFamily:'inherit'}}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </section>
  )
}
