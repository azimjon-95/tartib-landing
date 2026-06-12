'use client'
import { useState, useEffect } from 'react'
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
      {col:'Quritishda', color:'#00FFB3', cards:['#1035 — Jasur']},
      {col:'Tayyor',     color:'#4ADE80', cards:['#1031 ✅','#1030 ✅','#1029 ✅']},
    ],
  },
  delivery: {
    color:'#38BDF8',
    title:"Yetkazib berish — real vaqt xarita",
    desc:"Shafyorlar O'zbekiston bo'ylab harakatlanadi. Har shahar va tumanda real vaqt kuzatuv.",
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
      {l:'Qarzdor', v:'2.3M',  c:'#FB923C', pct:12},
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

/* ─── Desktop: Browser mockup kontent ─── */
function DesktopContent({ id }) {
  const s = SCREENS[id]
  if (!s) return null
  const sideItems = TABS

  return (
    <div style={{ display:'flex', height:'100%', fontSize:12 }}>
      {/* Sidebar */}
      <div style={{ width:180, background:'#050810', borderRight:'1px solid rgba(0,255,179,0.08)', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'16px 14px 12px', borderBottom:'1px solid rgba(0,255,179,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:7, background:'linear-gradient(135deg,#00FFB3,#A78BFA)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:13, color:'#000' }}>T</div>
            <div>
              <div style={{ fontSize:11, fontWeight:800, color:'#fff' }}>TartibCRM</div>
              <div style={{ fontSize:8, color:'#00FFB3', opacity:0.7 }}>Enterprise</div>
            </div>
          </div>
        </div>
        {sideItems.map(t => (
          <div key={t.id} style={{ padding:'9px 14px', fontSize:11, cursor:'pointer', color: t.id===id?'#00FFB3':'#445', background: t.id===id?'rgba(0,255,179,0.07)':'transparent', borderLeft: t.id===id?'2px solid #00FFB3':'2px solid transparent', display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:14 }}>{t.icon}</span> {t.label}
          </div>
        ))}
        <div style={{ marginTop:'auto', padding:'14px', borderTop:'1px solid rgba(0,255,179,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#4ADE80', boxShadow:'0 0 5px #4ADE80', animation:'pulse 2s infinite' }}/>
            <span style={{ fontSize:9, color:'#4ADE80' }}>99.9% online</span>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div style={{ flex:1, background:'#070b14', overflow:'hidden', display:'flex', flexDirection:'column' }}>
        {/* Top bar */}
        <div style={{ height:44, borderBottom:'1px solid rgba(255,255,255,0.04)', display:'flex', alignItems:'center', padding:'0 20px', justifyContent:'space-between', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#f1f5f9' }}>{s.title}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#00FFB3', animation:'ping 1.4s infinite' }}/>
              <span style={{ fontSize:9, color:'#00FFB3', fontWeight:700 }}>LIVE</span>
            </div>
            <div style={{ width:28, height:28, borderRadius:'50%', background:'rgba(0,255,179,0.1)', border:'1px solid rgba(0,255,179,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'#00FFB3', fontWeight:800 }}>A</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:'18px 20px', overflow:'hidden' }}>
          {id === 'dashboard' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:18 }}>
                {s.kpis.map(k => (
                  <div key={k.l} style={{ background:`${k.c}0d`, border:`1px solid ${k.c}20`, borderRadius:12, padding:'14px 16px' }}>
                    <div style={{ fontSize:22, fontWeight:900, color:k.c, fontFamily:'monospace', letterSpacing:'-1px' }}>{k.v}</div>
                    <div style={{ fontSize:10, color:'#556', marginTop:4 }}>{k.l}</div>
                    <div style={{ fontSize:9, color:'#4ADE80', marginTop:3 }}>↑ +12%</div>
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:12 }}>
                <div style={{ background:'#0d1120', borderRadius:12, padding:'14px 16px', border:'1px solid rgba(0,255,179,0.06)' }}>
                  <div style={{ fontSize:11, color:'#556', marginBottom:12, fontWeight:700 }}>So'nggi buyurtmalar</div>
                  {s.rows.map(r => (
                    <div key={r.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:6, height:6, borderRadius:'50%', background:r.sc, flexShrink:0 }}/>
                        <div>
                          <div style={{ fontSize:12, fontWeight:600, color:'#e2e8f0' }}>{r.name}</div>
                          <div style={{ fontSize:9, color:'#445' }}>{r.id}</div>
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontSize:11, color:'#00FFB3', fontFamily:'monospace' }}>{r.sum}</div>
                        <div style={{ fontSize:9, color:r.sc, fontWeight:700 }}>{r.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background:'#0d1120', borderRadius:12, padding:'14px 16px', border:'1px solid rgba(0,255,179,0.06)' }}>
                  <div style={{ fontSize:11, color:'#556', marginBottom:12, fontWeight:700 }}>Oylik sotuv</div>
                  <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:100 }}>
                    {[42,58,51,73,65,88,79,95,87,112,108,134].map((v,i) => (
                      <div key={i} style={{ flex:1, height:`${(v/134)*90}px`, background: i===11?'linear-gradient(180deg,#00FFB3,#00cc8e)':'rgba(0,255,179,0.12)', borderRadius:'2px 2px 0 0', minWidth:4 }}/>
                    ))}
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:8, color:'#334' }}>
                    <span>Yan</span><span>Apr</span><span>Iyl</span><span>Okt</span><span>Dek</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {id === 'orders' && (
            <div>
              <div style={{ display:'flex', gap:10, height:240 }}>
                {s.kanban.map(col => (
                  <div key={col.col} style={{ flex:1, background:'rgba(255,255,255,0.02)', borderRadius:12, padding:'10px 8px', border:`1px solid ${col.color}15` }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:col.color }}/>
                      <span style={{ fontSize:9, fontWeight:800, color:col.color, textTransform:'uppercase' }}>{col.col}</span>
                      <span style={{ marginLeft:'auto', fontSize:9, color:'#334', background:'rgba(255,255,255,0.04)', borderRadius:99, padding:'1px 6px' }}>{col.cards.length}</span>
                    </div>
                    {col.cards.map(c => (
                      <div key={c} style={{ background:'rgba(15,25,45,0.95)', borderRadius:8, padding:'7px 8px', marginBottom:6, borderLeft:`2px solid ${col.color}`, fontSize:9, color:'#94a3b8' }}>{c}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {id === 'delivery' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div style={{ background:'#0d1120', borderRadius:12, padding:'14px 16px', border:'1px solid rgba(0,255,179,0.06)' }}>
                <div style={{ fontSize:11, color:'#556', marginBottom:14, fontWeight:700 }}>Faol shafyorlar</div>
                {s.drivers.map(d => (
                  <div key={d.name} style={{ marginBottom:14 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:30, height:30, borderRadius:'50%', background:`${d.color}18`, border:`1px solid ${d.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🚗</div>
                        <div>
                          <div style={{ fontSize:12, fontWeight:700, color:'#f1f5f9' }}>{d.name}</div>
                          <div style={{ fontSize:9, color:'#445' }}>{d.order}</div>
                        </div>
                      </div>
                      <div style={{ fontSize:10, color:d.color, fontWeight:700, alignSelf:'center' }}>{d.status}</div>
                    </div>
                    <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:99, overflow:'hidden' }}>
                      <div style={{ width:`${d.pct}%`, height:'100%', background:`linear-gradient(90deg,${d.color},${d.color}88)`, borderRadius:99 }}/>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background:'#0d1120', borderRadius:12, border:'1px solid rgba(0,255,179,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:40, marginBottom:8 }}>🗺</div>
                  <div style={{ fontSize:11, color:'#00FFB3', fontWeight:700 }}>Real vaqt GPS</div>
                  <div style={{ fontSize:10, color:'#445', marginTop:4 }}>4 shafyor online</div>
                  <div style={{ display:'flex', gap:6, justifyContent:'center', marginTop:12 }}>
                    {['#00FFB3','#4ADE80','#A78BFA','#38BDF8'].map(c => (
                      <div key={c} style={{ width:8, height:8, borderRadius:'50%', background:c, boxShadow:`0 0 5px ${c}`, animation:'pulse 2s infinite' }}/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {id === 'finance' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                  {[['↑ 48.2M','Kirim','#4ADE80'],['↓ 12.8M','Chiqim','#F87171'],['= 35.4M','Foyda','#00FFB3'],['⚠ 2.3M','Qarzdor','#FB923C']].map(([v,l,c]) => (
                    <div key={l} style={{ background:`${c}0d`, border:`1px solid ${c}20`, borderRadius:12, padding:'12px 14px' }}>
                      <div style={{ fontSize:18, fontWeight:900, color:c, fontFamily:'monospace' }}>{v}</div>
                      <div style={{ fontSize:9, color:'#556', marginTop:3 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:'#0d1120', borderRadius:12, padding:'14px 16px', border:'1px solid rgba(0,255,179,0.06)' }}>
                  <div style={{ fontSize:11, color:'#556', fontWeight:700, marginBottom:12 }}>Oylik tahlil</div>
                  {s.items.map(item => (
                    <div key={item.l} style={{ marginBottom:12 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                        <span style={{ fontSize:11, color:'#888' }}>{item.l}</span>
                        <span style={{ fontSize:12, fontWeight:800, color:item.c, fontFamily:'monospace' }}>{item.v} so'm</span>
                      </div>
                      <div style={{ height:6, background:'rgba(255,255,255,0.05)', borderRadius:99, overflow:'hidden' }}>
                        <div style={{ width:`${item.pct}%`, height:'100%', background:`linear-gradient(90deg,${item.c},${item.c}77)`, borderRadius:99 }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background:'#0d1120', borderRadius:12, padding:'14px 16px', border:'1px solid rgba(0,255,179,0.06)' }}>
                <div style={{ fontSize:11, color:'#556', fontWeight:700, marginBottom:12 }}>Qarzdor mijozlar</div>
                {[['Azimjon M.','250,000','#F87171'],['Malika T.','180,000','#FB923C'],['Bobur K.','90,000','#F87171'],['Sardor U.','60,000','#FB923C'],['Dilnoza Y.','45,000','#F87171']].map(([n,v,c]) => (
                  <div key={n} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ width:26, height:26, borderRadius:'50%', background:'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11 }}>👤</div>
                      <span style={{ fontSize:12, color:'#ccc' }}>{n}</span>
                    </div>
                    <span style={{ fontSize:11, color:c, fontWeight:700, fontFamily:'monospace' }}>{v} so'm</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {id === 'staff' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:14 }}>
                {[['12','Jami xodim','#00FFB3'],['8/12','Bugun aktiv','#38BDF8'],['4.8M','Oylik fond','#A78BFA']].map(([v,l,c]) => (
                  <div key={l} style={{ background:`${c}0d`, border:`1px solid ${c}20`, borderRadius:12, padding:'12px 14px' }}>
                    <div style={{ fontSize:22, fontWeight:900, color:c, fontFamily:'monospace' }}>{v}</div>
                    <div style={{ fontSize:9, color:'#556', marginTop:4 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:'#0d1120', borderRadius:12, border:'1px solid rgba(0,255,179,0.06)', overflow:'hidden' }}>
                <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'8px 16px', borderBottom:'1px solid rgba(255,255,255,0.04)', fontSize:9, color:'#445', fontWeight:700, textTransform:'uppercase', letterSpacing:1 }}>
                  <span>Xodim</span><span>Rol</span><span>Kv.m</span><span>Maosh</span>
                </div>
                {s.workers.map(w => (
                  <div key={w.name} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,0.03)', alignItems:'center' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ width:28, height:28, borderRadius:'50%', background:`${w.color}18`, border:`1px solid ${w.color}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>👤</div>
                      <span style={{ fontSize:12, fontWeight:600, color:'#f1f5f9' }}>{w.name}</span>
                    </div>
                    <span style={{ fontSize:10, color:'#667' }}>{w.role}</span>
                    <span style={{ fontSize:11, color:'#94a3b8', fontFamily:'monospace' }}>{w.kvm}</span>
                    <span style={{ fontSize:11, color:'#00FFB3', fontFamily:'monospace', fontWeight:700 }}>{w.salary}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {id === 'settings' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div style={{ background:'#0d1120', borderRadius:12, padding:'14px 16px', border:'1px solid rgba(0,255,179,0.06)' }}>
                <div style={{ fontSize:11, color:'#556', fontWeight:700, marginBottom:12 }}>Integratsiyalar</div>
                {s.opts.map(o => (
                  <div key={o.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 12px', borderRadius:10, marginBottom:6, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ fontSize:18 }}>{o.icon}</span>
                      <span style={{ fontSize:12, color:'#888' }}>{o.label}</span>
                    </div>
                    <span style={{ fontSize:11, color:o.c, fontWeight:700 }}>{o.val}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[['Foydalanuvchilar','7 ta','#38BDF8'],['Backup','Kunlik','#4ADE80'],['SSL','Faol','#4ADE80'],['2FA','Yoqilgan','#4ADE80']].map(([l,v,c])=>(
                  <div key={l} style={{ background:`${c}08`, border:`1px solid ${c}18`, borderRadius:12, padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:12, color:'#888' }}>{l}</span>
                    <span style={{ fontSize:13, fontWeight:800, color:c }}>{v}</span>
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

/* ─── Mobile: Phone frame kontent ─── */
function MobileContent({ id }) {
  const s = SCREENS[id]
  if (!s) return null

  if (id === 'dashboard') return (
    <div style={{padding:'12px'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
        {s.kpis.map(k=>(
          <div key={k.l} style={{background:`${k.c}0d`,border:`1px solid ${k.c}20`,borderRadius:10,padding:'10px 12px'}}>
            <div style={{fontSize:17,fontWeight:900,color:k.c,fontFamily:'monospace'}}>{k.v}</div>
            <div style={{fontSize:9,color:'#555',marginTop:2}}>{k.l}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:10,color:'#555',marginBottom:8,fontWeight:600}}>So'nggi buyurtmalar</div>
      {s.rows.slice(0,4).map(r=>(
        <div key={r.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
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

  if (id === 'delivery') return (
    <div style={{padding:'12px'}}>
      {s.drivers.map(d=>(
        <div key={d.name} style={{marginBottom:11}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
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

  if (id === 'staff') return (
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

  if (id === 'settings') return (
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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
        </motion.div>

        {/* Tabs */}
        <div style={{display:'flex',gap:8,marginBottom:28,overflowX:'auto',WebkitOverflowScrolling:'touch',paddingBottom:4,scrollbarWidth:'none',justifyContent: isMobile?'flex-start':'center'}}>
          {TABS.map(t=>(
            <motion.button key={t.id} onClick={()=>setActive(t.id)}
              whileTap={{scale:0.94}}
              style={{
                display:'flex',alignItems:'center',gap:7,
                padding: isMobile?'8px 14px':'10px 20px',
                borderRadius:12,
                background:active===t.id?`${SCREENS[t.id].color}14`:'rgba(255,255,255,0.03)',
                border:`1px solid ${active===t.id?SCREENS[t.id].color+'50':'rgba(255,255,255,0.06)'}`,
                color:active===t.id?SCREENS[t.id].color:'#555',
                cursor:'pointer',fontFamily:'inherit',
                fontSize: isMobile?12:13,
                fontWeight:active===t.id?700:500,
                whiteSpace:'nowrap',flexShrink:0,
                transition:'all 0.2s',
              }}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </motion.button>
          ))}
          <style>{`div::-webkit-scrollbar{display:none}`}</style>
        </div>

        {/* Preview area */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{opacity:0,y:16,scale:0.99}}
            animate={{opacity:1,y:0,scale:1}}
            exit={{opacity:0,y:-12,scale:0.99}}
            transition={{duration:0.3}}>

            {/* Description */}
            <div style={{textAlign:'center',marginBottom:24,maxWidth:600,margin:'0 auto 24px'}}>
              <div style={{fontSize:isMobile?14:17,fontWeight:800,color:'#f1f5f9',marginBottom:6,letterSpacing:'-0.3px'}}>{s.title}</div>
              <div style={{fontSize:isMobile?12:14,color:'#556',lineHeight:1.65}}>{s.desc}</div>
            </div>

            {/* ── DESKTOP: Browser/Laptop mockup ── */}
            {!isMobile && (
              <div style={{
                width:'100%', maxWidth:960, margin:'0 auto', className:'browser-mockup',
                borderRadius:16, overflow:'hidden',
                border:'1px solid rgba(0,255,179,0.12)',
                boxShadow:`0 32px 80px rgba(0,0,0,0.6), 0 0 60px ${s.color}08`,
              }}>
                {/* Browser chrome bar */}
                <div style={{
                  background:'#0d1120', padding:'10px 16px',
                  display:'flex', alignItems:'center', gap:10,
                  borderBottom:'1px solid rgba(255,255,255,0.05)',
                }}>
                  {/* Traffic lights */}
                  <div style={{display:'flex',gap:6,flexShrink:0}}>
                    {['#ff5f57','#febc2e','#28c840'].map(c=>(
                      <div key={c} style={{width:11,height:11,borderRadius:'50%',background:c}}/>
                    ))}
                  </div>
                  {/* URL bar */}
                  <div style={{
                    flex:1, maxWidth:360, margin:'0 auto',
                    background:'rgba(0,0,0,0.4)', borderRadius:8,
                    padding:'4px 12px', display:'flex', alignItems:'center', gap:6,
                    border:'1px solid rgba(255,255,255,0.06)',
                  }}>
                    <span style={{fontSize:10,color:'#4ADE80'}}>🔒</span>
                    <span style={{fontSize:11,color:'#556',fontFamily:'monospace'}}>app.tartibcrm.uz/dashboard</span>
                  </div>
                  {/* Live badge */}
                  <div style={{display:'flex',alignItems:'center',gap:5,marginLeft:'auto'}}>
                    <div style={{width:6,height:6,borderRadius:'50%',background:'#00FFB3',animation:'ping 1.4s infinite'}}/>
                    <span style={{fontSize:9,color:'#00FFB3',fontWeight:700}}>LIVE</span>
                  </div>
                </div>
                {/* App content */}
                <div style={{height:400, overflow:'hidden'}}>
                  <DesktopContent id={active} />
                </div>
              </div>
            )}

            {/* ── MOBILE: Phone frame ── */}
            {isMobile && (
              <div style={{
                width:'100%', maxWidth:360, margin:'0 auto',
                background:'#0d1120', borderRadius:22,
                overflow:'hidden',
                border:'1px solid rgba(0,255,179,0.12)',
                boxShadow:`0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${s.color}10`,
              }}>
                {/* Phone top bar */}
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
                <div style={{minHeight:240}}><MobileContent id={active}/></div>
                {/* Bottom nav */}
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

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}
      `}</style>
    </section>
  )
}
