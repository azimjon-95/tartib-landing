'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TABS = [
  { id:'dashboard', label:'Dashboard',    icon:'◈' },
  { id:'orders',    label:'Buyurtmalar',  icon:'◎' },
  { id:'delivery',  label:'Yetkazish',    icon:'🗺' },
  { id:'finance',   label:'Moliya',       icon:'⬡' },
  { id:'staff',     label:'Xodimlar',     icon:'⬟' },
  { id:'settings',  label:'Sozlamalar',   icon:'△' },
]

const SCREENS = {
  dashboard: {
    color:'#00FFB3',
    title:'Bosh sahifa — to\'liq ko\'rinish',
    desc:'Bugungi buyurtmalar, kirim, chiqim, ishchilar holati — hammasini bir ekranda ko\'ring.',
    kpis:[
      {l:'Bugungi sotuv',   v:'124.5M', c:'#00FFB3'},
      {l:'Yangi buyurtma',  v:'47',     c:'#A78BFA'},
      {l:'Yetkazishda',     v:'12',     c:'#38BDF8'},
      {l:'Oylik foyda',     v:'48.2M',  c:'#4ADE80'},
    ],
    rows:[
      {id:'#1042',name:'Azimjon M.',   sum:'2,400,000', status:'Yuvishda',  sc:'#38BDF8'},
      {id:'#1041',name:'Malika T.',    sum:'1,850,000', status:'Tayyor',    sc:'#4ADE80'},
      {id:'#1040',name:'Sardor K.',    sum:'5,600,000', status:'Yetkazishda',sc:'#FB923C'},
      {id:'#1039',name:'Dilnoza Y.',   sum:'900,000',   status:'Yangi',     sc:'#A78BFA'},
      {id:'#1038',name:'Bobur E.',     sum:'3,200,000', status:'Tayyor',    sc:'#4ADE80'},
    ],
  },
  orders: {
    color:'#A78BFA',
    title:'Buyurtmalar — Kanban board',
    desc:'Har bir buyurtma bosqichini drag-and-drop bilan boshqaring. Statuslar avtomatik yangilanadi.',
    kanban:[
      {col:'Yangi',      color:'#A78BFA', cards:['#1042 — Azimjon','#1048 — Nilufar']},
      {col:'Qabul',      color:'#38BDF8', cards:['#1041 — Bobur']},
      {col:'Yuvishda',   color:'#FB923C', cards:['#1039 — Sardor','#1037 — Malika']},
      {col:'Quritishda', color:'#00FFB3', cards:['#1035 — Jasur']},
      {col:'Tayyor',     color:'#4ADE80', cards:['#1031 ✅','#1030 ✅']},
    ],
  },
  delivery: {
    color:'#38BDF8',
    title:'Yetkazib berish — real vaqt xarita',
    desc:'Shafyorlar Toshkent ko\'chalari bo\'ylab. Har buyurtma real vaqtda kuzatiladi.',
    drivers:[
      {name:'Sardor',  order:'#1042', status:'Yo\'lda',    color:'#00FFB3', pct:65},
      {name:'Javlon',  order:'#1034', status:'Yetkazdi',   color:'#4ADE80', pct:100},
      {name:'Bahodir', order:'#1035', status:'Qaytmoqda',  color:'#A78BFA', pct:80},
      {name:'Nodir',   order:'#1048', status:'Yo\'lda',    color:'#38BDF8', pct:30},
    ],
  },
  finance: {
    color:'#4ADE80',
    title:"Moliya — kirim-chiqim nazorat",
    desc:'Har kunlik, haftalik, oylik moliyaviy hisobot. Qarzdor mijozlar, xarajatlar tahlili.',
    finance:[
      {l:'Oylik kirim',   v:'284.5M', c:'#4ADE80',  pct:85},
      {l:'Xarajatlar',    v:'96.2M',  c:'#F87171',  pct:34},
      {l:'Sof foyda',     v:'188.3M', c:'#00FFB3',  pct:66},
      {l:'Qarzdorlik',    v:'12.4M',  c:'#FB923C',  pct:10},
    ],
  },
  staff: {
    color:'#FB923C',
    title:'Xodimlar — maosh va davomat',
    desc:'Kv.m bo\'yicha avtomatik maosh hisoblash. Avans, jarima, bonus — to\'liq nazorat.',
    staff:[
      {name:'Azimjon M.', role:'Usta',    salary:'1,200,000', days:22, pct:92},
      {name:'Bobur K.',   role:'Yordamchi',salary:'900,000', days:20, pct:83},
      {name:'Sardor',     role:'Shafyor',  salary:'1,400,000',days:24, pct:100},
      {name:'Malika T.',  role:'Qabul',    salary:'800,000', days:21, pct:88},
    ],
  },
  settings: {
    color:'#F472B6',
    title:'Sozlamalar — tizim konfiguratsiya',
    desc:'Telegram bot, narxlar, filiallar, foydalanuvchi rollari — hamma narsa sozlanadi.',
    settings:[
      {label:'Telegram Bot',       val:'@tartib_bot',    on:true},
      {label:'SMS Xabarnoma',      val:'Aktiv',          on:true},
      {label:'Avtomatik hisobot',  val:'Har dushanba',   on:true},
      {label:'Zaxira nusxa',       val:'Har kuni 02:00', on:true},
      {label:'Ko\'p filial rejim',  val:'3 ta filial',    on:true},
    ],
  },
}

export default function Screenshots() {
  const [active, setActive] = useState('dashboard')
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.1 })
  const sc = SCREENS[active]

  return (
    <section id="screenshots" style={{padding:'96px 5%',background:'#050508',borderTop:'1px solid rgba(0,255,179,0.06)',position:'relative',zIndex:2}}>
      <div ref={ref} style={{maxWidth:1100,margin:'0 auto'}}>

        <div style={{textAlign:'center',marginBottom:48}}>
          <motion.div initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
            style={{display:'inline-flex',alignItems:'center',gap:6,padding:'4px 14px',borderRadius:99,background:'rgba(0,255,179,0.06)',border:'1px solid rgba(0,255,179,0.18)',fontSize:11,fontWeight:600,color:'#00FFB3',marginBottom:16,letterSpacing:2,textTransform:'uppercase'}}>
            ◈ Tizim sahifalari
          </motion.div>
          <motion.h2 initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1}}
            style={{fontSize:'clamp(26px,4vw,48px)',fontWeight:900,letterSpacing:'-1.5px',marginBottom:14,lineHeight:1.1}}>
            Har bir sahifa maqsadga<br/>
            <span style={{background:'linear-gradient(135deg,#00FFB3,#A78BFA)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>mo'ljallangan</span>
          </motion.h2>
        </div>

        {/* Tab buttons */}
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.2}}
          style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center',marginBottom:32}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setActive(t.id)}
              style={{display:'flex',alignItems:'center',gap:6,padding:'8px 18px',borderRadius:10,border:`1px solid ${active===t.id?SCREENS[t.id].color+'66':'rgba(255,255,255,0.06)'}`,background:active===t.id?`${SCREENS[t.id].color}12`:'transparent',color:active===t.id?SCREENS[t.id].color:'#555',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all 0.2s'}}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </motion.div>

        {/* Screen content */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.35}}
            style={{background:'rgba(8,12,24,0.98)',border:`1px solid ${sc.color}22`,borderRadius:16,overflow:'hidden',boxShadow:`0 0 40px ${sc.color}08,0 20px 60px rgba(0,0,0,0.5)`}}>

            {/* Browser bar */}
            <div style={{background:'#060a14',borderBottom:`1px solid ${sc.color}15`,padding:'10px 16px',display:'flex',alignItems:'center',gap:10}}>
              <div style={{display:'flex',gap:5}}>
                {['#ff5f57','#febc2e','#28c840'].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:'50%',background:c,opacity:0.8}}/>)}
              </div>
              <div style={{flex:1,background:'#0c1420',borderRadius:5,padding:'4px 12px',fontSize:10,color:'#444',fontFamily:'monospace'}}>
                app.tartibcrm.uz/{active}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:sc.color}}>
                <div style={{width:5,height:5,borderRadius:'50%',background:'#4ADE80',boxShadow:'0 0 5px #4ADE80'}}/>
                LIVE
              </div>
            </div>

            {/* Content */}
            <div style={{display:'grid',gridTemplateColumns:'180px 1fr',minHeight:340}}>
              {/* Sidebar */}
              <div style={{background:'#050810',borderRight:`1px solid ${sc.color}10`,padding:'16px 0'}}>
                <div style={{padding:'0 14px 14px',marginBottom:10,borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:7}}>
                    <div style={{width:26,height:26,borderRadius:6,background:'linear-gradient(135deg,#00FFB3,#A78BFA)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:13,color:'#000'}}>T</div>
                    <div>
                      <div style={{fontSize:11,fontWeight:800,color:'#fff'}}>TartibCRM</div>
                      <div style={{fontSize:8,color:'#00FFB3',opacity:0.7}}>v2.4 · Online</div>
                    </div>
                  </div>
                </div>
                {TABS.map(t=>(
                  <div key={t.id} onClick={()=>setActive(t.id)}
                    style={{padding:'8px 14px',fontSize:11,cursor:'pointer',color:active===t.id?sc.color:'#444',background:active===t.id?`${sc.color}0a`:'transparent',borderLeft:`2px solid ${active===t.id?sc.color:'transparent'}`,marginBottom:2,display:'flex',alignItems:'center',gap:7,transition:'all 0.2s'}}>
                    <span style={{fontSize:13}}>{t.icon}</span>{t.label}
                  </div>
                ))}
              </div>

              {/* Main panel */}
              <div style={{padding:20,overflowY:'auto'}}>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:14,fontWeight:800,color:'#f1f5f9',marginBottom:4}}>{sc.title}</div>
                  <div style={{fontSize:12,color:'#555',lineHeight:1.6}}>{sc.desc}</div>
                </div>

                {/* Dashboard */}
                {active==='dashboard' && sc.kpis && (<>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
                    {sc.kpis.map((k,i)=>(
                      <div key={i} style={{background:`${k.c}0c`,border:`1px solid ${k.c}1a`,borderRadius:8,padding:'10px 12px'}}>
                        <div style={{fontSize:16,fontWeight:800,color:k.c,fontFamily:'monospace'}}>{k.v}</div>
                        <div style={{fontSize:9,color:'#444',marginTop:2}}>{k.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:'#0a1020',borderRadius:8,border:'1px solid rgba(0,255,179,0.06)'}}>
                    <div style={{padding:'10px 14px',borderBottom:'1px solid rgba(0,255,179,0.06)',fontSize:10,color:'#555',fontWeight:700}}>So'nggi buyurtmalar</div>
                    {sc.rows.map((r,i)=>(
                      <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 14px',borderBottom:'1px solid rgba(255,255,255,0.02)'}}>
                        <div style={{display:'flex',gap:10,alignItems:'center'}}>
                          <span style={{fontSize:10,color:'#333',fontFamily:'monospace'}}>{r.id}</span>
                          <span style={{fontSize:11,color:'#ccc'}}>{r.name}</span>
                        </div>
                        <div style={{display:'flex',gap:12,alignItems:'center'}}>
                          <span style={{fontSize:11,color:'#00FFB3',fontFamily:'monospace'}}>{r.sum}</span>
                          <span style={{fontSize:9,padding:'2px 7px',borderRadius:4,background:`${r.sc}15`,color:r.sc,fontWeight:700}}>{r.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>)}

                {/* Kanban */}
                {active==='orders' && sc.kanban && (
                  <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4}}>
                    {sc.kanban.map((col,i)=>(
                      <div key={i} style={{minWidth:130,background:'rgba(255,255,255,0.02)',borderRadius:8,padding:'10px 8px',border:`1px solid ${col.color}18`,flexShrink:0}}>
                        <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:8}}>
                          <div style={{width:6,height:6,borderRadius:'50%',background:col.color}}/>
                          <span style={{fontSize:9,fontWeight:800,color:col.color,textTransform:'uppercase'}}>{col.col}</span>
                        </div>
                        {col.cards.map((c,j)=>(
                          <div key={j} style={{background:'rgba(15,25,45,0.9)',borderRadius:5,padding:'6px 8px',marginBottom:5,borderLeft:`2px solid ${col.color}`,fontSize:9.5,color:'#aaa'}}>{c}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Delivery */}
                {active==='delivery' && sc.drivers && sc.drivers.map((d,i)=>(
                  <div key={i} style={{background:'#0a1020',borderRadius:8,padding:'12px 14px',marginBottom:8,border:`1px solid ${d.color}15`}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                      <div>
                        <span style={{fontSize:12,fontWeight:700,color:'#e2e8f0'}}>{d.name}</span>
                        <span style={{fontSize:10,color:'#444',marginLeft:8}}>{d.order}</span>
                      </div>
                      <span style={{fontSize:10,color:d.color,fontWeight:700}}>{d.status}</span>
                    </div>
                    <div style={{height:4,background:'rgba(255,255,255,0.05)',borderRadius:99,overflow:'hidden'}}>
                      <div style={{width:`${d.pct}%`,height:'100%',background:`linear-gradient(90deg,${d.color},${d.color}99)`,borderRadius:99,transition:'width 1s ease'}}/>
                    </div>
                  </div>
                ))}

                {/* Finance */}
                {active==='finance' && sc.finance && sc.finance.map((f,i)=>(
                  <div key={i} style={{background:'#0a1020',borderRadius:8,padding:'12px 14px',marginBottom:8,border:`1px solid ${f.c}15`}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                      <span style={{fontSize:12,color:'#888'}}>{f.l}</span>
                      <span style={{fontSize:14,fontWeight:800,color:f.c,fontFamily:'monospace'}}>{f.v}</span>
                    </div>
                    <div style={{height:3,background:'rgba(255,255,255,0.05)',borderRadius:99,overflow:'hidden'}}>
                      <div style={{width:`${f.pct}%`,height:'100%',background:f.c,borderRadius:99}}/>
                    </div>
                  </div>
                ))}

                {/* Staff */}
                {active==='staff' && sc.staff && sc.staff.map((s,i)=>(
                  <div key={i} style={{background:'#0a1020',borderRadius:8,padding:'12px 14px',marginBottom:8,border:'1px solid rgba(251,146,60,0.1)'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                      <div>
                        <span style={{fontSize:12,fontWeight:700,color:'#e2e8f0'}}>{s.name}</span>
                        <span style={{fontSize:10,color:'#444',marginLeft:8}}>{s.role}</span>
                      </div>
                      <span style={{fontSize:12,color:'#00FFB3',fontFamily:'monospace'}}>{s.salary}</span>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{flex:1,height:3,background:'rgba(255,255,255,0.05)',borderRadius:99,overflow:'hidden'}}>
                        <div style={{width:`${s.pct}%`,height:'100%',background:'linear-gradient(90deg,#FB923C,#FB923C88)',borderRadius:99}}/>
                      </div>
                      <span style={{fontSize:9,color:'#555'}}>{s.days} kun</span>
                    </div>
                  </div>
                ))}

                {/* Settings */}
                {active==='settings' && sc.settings && sc.settings.map((s,i)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#0a1020',borderRadius:8,padding:'12px 14px',marginBottom:8,border:'1px solid rgba(244,114,182,0.08)'}}>
                    <div>
                      <div style={{fontSize:12,color:'#e2e8f0',fontWeight:600}}>{s.label}</div>
                      <div style={{fontSize:10,color:'#444',marginTop:2}}>{s.val}</div>
                    </div>
                    <div style={{width:36,height:20,borderRadius:10,background:'#00FFB3',position:'relative',flexShrink:0}}>
                      <div style={{position:'absolute',right:3,top:3,width:14,height:14,borderRadius:'50%',background:'#000'}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
