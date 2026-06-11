'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const LiveDot = () => (
  <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
    <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#00FFB3', opacity: 0.5, animation: 'ping 1.4s cubic-bezier(0,0,.2,1) infinite' }} />
    <span style={{ position: 'relative', borderRadius: '50%', width: 8, height: 8, background: '#00FFB3' }} />
  </span>
)

function GlitchText({ text }) {
  const [g, setG] = useState(false)
  useEffect(() => {
    const t = setInterval(() => { setG(true); setTimeout(() => setG(false), 180) }, 3500 + Math.random() * 2000)
    return () => clearInterval(t)
  }, [])
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{text}</span>
      {g && <>
        <span aria-hidden style={{ position: 'absolute', left: 2, top: 0, width: '100%', background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'glitch1 0.18s steps(1) forwards', opacity: 0.6 }}>{text}</span>
        <span aria-hidden style={{ position: 'absolute', left: -2, top: 0, width: '100%', background: 'linear-gradient(135deg,#A78BFA,#38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'glitch2 0.18s steps(1) forwards', opacity: 0.5 }}>{text}</span>
      </>}
    </span>
  )
}

const KPI = [
  { label: 'Faol buyurtma', value: '47', change: '+12%', color: '#00FFB3' },
  { label: 'Bugungi kirim', value: '12.4M', change: '+8%', color: '#A78BFA' },
  { label: 'Ishchida', value: '8/12', change: '', color: '#38BDF8' },
  { label: 'Yetkazishda', value: '6', change: '-2', color: '#FB923C' },
]
const KANBAN = [
  { label: 'Yangi', color: '#00FFB3', cards: [{ id: '#1042', name: 'Azimjon M.' }, { id: '#1043', name: 'Malika T.' }] },
  { label: 'Yuvishda', color: '#38BDF8', cards: [{ id: '#1039', name: 'Bobur K.' }] },
  { label: 'Quritishda', color: '#FB923C', cards: [{ id: '#1037', name: 'Dilnoza' }, { id: '#1036', name: 'Jahon' }] },
  { label: 'Bezakda', color: '#A78BFA', cards: [{ id: '#1033', name: 'Sardor' }] },
  { label: 'Tayyor', color: '#4ADE80', cards: [{ id: '#1031', name: '✅ Done' }] },
]
const CHART_VALS = [42, 58, 51, 73, 65, 88, 79, 95, 87, 112, 108, 134]
const MONTHS = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const [liveIdx, setLiveIdx] = useState(0)
  const [barTick, setBarTick] = useState(0)
  const ORDERS = [
    { id: '#TRT-8821', client: 'Dilnoza Yusupova', amount: '4,200,000', status: 'Yetkazildi', statusC: '#4ADE80' },
    { id: '#TRT-8820', client: 'Bobur Ergashev', amount: '1,850,000', status: "Yo'lda", statusC: '#38BDF8' },
    { id: '#TRT-8819', client: 'Malika Nazarova', amount: '7,600,000', status: 'Jarayonda', statusC: '#FB923C' },
  ]
  const tabs = ['Dashboard', 'Buyurtmalar', 'Moliya', 'Xodimlar']
  useEffect(() => {
    const t1 = setInterval(() => setLiveIdx(p => (p + 1) % ORDERS.length), 3200)
    const t2 = setInterval(() => setBarTick(p => p + 1), 1800)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])
  const maxC = Math.max(...CHART_VALS)
  return (
    <div style={{ width: '100%', height: '100%', background: '#070b14', display: 'flex', overflow: 'hidden', fontSize: 11 }}>
      <div style={{ width: 120, background: '#050810', borderRight: '1px solid rgba(0,255,179,0.08)', padding: '10px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 10px 10px', marginBottom: 8, borderBottom: '1px solid rgba(0,255,179,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, color: '#000' }}>T</div>
            <div>
              <div style={{ fontSize: 9, fontWeight: 800, color: '#fff' }}>TartibCRM</div>
              <div style={{ fontSize: 7, color: '#00FFB3', opacity: 0.7 }}>Enterprise</div>
            </div>
          </div>
        </div>
        {tabs.map((t, i) => (
          <div key={i} onClick={() => setActiveTab(i)} style={{ padding: '7px 10px', fontSize: 9, cursor: 'pointer', color: activeTab === i ? '#00FFB3' : '#555', background: activeTab === i ? 'rgba(0,255,179,0.06)' : 'transparent', borderLeft: activeTab === i ? '2px solid #00FFB3' : '2px solid transparent', marginBottom: 1 }}>
            {['◈ ', '◎ ', '⬡ ', '⬟ '][i]}{t}
          </div>
        ))}
        <div style={{ padding: '12px 10px 0' }}>
          <div style={{ fontSize: 7, color: '#333', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 1 }}>Server</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 5px #4ADE80', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 8, color: '#4ADE80' }}>99.9% online</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '10px 12px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{tabs[activeTab]}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <LiveDot /><span style={{ fontSize: 8, color: '#00FFB3', fontWeight: 700 }}>LIVE</span>
            <span style={{ fontSize: 8, color: '#333' }}>|</span>
            <span style={{ fontSize: 8, color: '#555' }}>app.tartibcrm.uz</span>
          </div>
        </div>
        {activeTab === 0 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5, marginBottom: 8 }}>
              {KPI.map((k, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 + 0.3 }}
                  style={{ background: `${k.color}0f`, border: `1px solid ${k.color}20`, borderRadius: 6, padding: '6px 7px' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: k.color, fontFamily: 'monospace' }}>{k.value}</div>
                  <div style={{ fontSize: 7, color: '#555', marginTop: 1 }}>{k.label}</div>
                  {k.change && <div style={{ fontSize: 7, color: '#4ADE80', marginTop: 2 }}>{k.change} ↑</div>}
                </motion.div>
              ))}
            </div>
            <div style={{ background: '#0d1120', borderRadius: 7, padding: '8px 10px', marginBottom: 7, border: '1px solid rgba(0,255,179,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 8, color: '#777', fontWeight: 600 }}>Yillik sotuv (mln so'm)</span>
                <span style={{ fontSize: 7, color: '#00FFB3' }}>2024 · Real vaqt</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60 }}>
                {CHART_VALS.map((v, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: '100%', height: `${(v / maxC) * 52}px`, minHeight: 3, background: i === barTick % 12 ? 'linear-gradient(180deg,#00FFB3,#00cc8e)' : 'linear-gradient(180deg,#1a3040,#0f1f2e)', borderRadius: '2px 2px 0 0', transition: 'background 0.5s' }} />
                    <span style={{ fontSize: 5.5, color: '#333' }}>{MONTHS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#0d1120', borderRadius: 7, padding: '7px 10px', border: '1px solid rgba(0,255,179,0.06)' }}>
              <div style={{ fontSize: 8, color: '#555', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
                <LiveDot /> So'nggi buyurtma
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={liveIdx} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>{ORDERS[liveIdx].client}</div>
                    <div style={{ fontSize: 8, color: '#555' }}>{ORDERS[liveIdx].id}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: '#00FFB3', fontFamily: 'monospace' }}>{ORDERS[liveIdx].amount}</div>
                    <div style={{ fontSize: 7, color: ORDERS[liveIdx].statusC, fontWeight: 700 }}>{ORDERS[liveIdx].status}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div style={{ display: 'flex', gap: 4, height: 'calc(100% - 32px)', overflow: 'hidden' }}>
            {KANBAN.map((col, ci) => (
              <div key={ci} style={{ flex: 1, background: 'rgba(255,255,255,.02)', borderRadius: 5, padding: '5px 4px', border: `1px solid ${col.color}12` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 4 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: col.color }} />
                  <span style={{ fontSize: 6, fontWeight: 800, color: col.color, textTransform: 'uppercase' }}>{col.label}</span>
                </div>
                {col.cards.map((c, ri) => (
                  <motion.div key={c.id} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ci * 0.05 + ri * 0.04 + 0.4 }}
                    style={{ background: 'rgba(20,35,60,.9)', borderRadius: 3, padding: '3px 5px', marginBottom: 3, borderLeft: `2px solid ${col.color}` }}>
                    <div style={{ fontSize: 6, fontWeight: 700, color: col.color }}>{c.id}</div>
                    <div style={{ fontSize: 6, color: '#aaa' }}>{c.name}</div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 5, marginBottom: 8 }}>
              {[['↑ 48.2M', 'Kirim', '#4ADE80'], ['↓ 12.8M', 'Chiqim', '#F87171'], ['= 35.4M', 'Foyda', '#00FFB3']].map(([v, l, c]) => (
                <div key={l} style={{ background: `${c}0f`, border: `1px solid ${c}20`, borderRadius: 7, padding: '7px', textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: c }}>{v}</div>
                  <div style={{ fontSize: 7, color: '#555' }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0d1120', borderRadius: 7, padding: '8px 10px', border: '1px solid rgba(0,255,179,0.06)' }}>
              <div style={{ fontSize: 8, color: '#777', marginBottom: 7, fontWeight: 600 }}>💳 Qarzdor mijozlar</div>
              {[['Azimjon M.', '250,000'], ['Malika T.', '180,000'], ['Bobur K.', '90,000']].map(([n, v]) => (
                <div key={n} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 9, borderBottom: '1px solid rgba(0,255,179,0.05)', paddingBottom: 4 }}>
                  <span style={{ color: '#ccc' }}>{n}</span>
                  <span style={{ color: '#F87171', fontWeight: 700 }}>{v} so'm</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            {[['Azimjon M.', '1,200,000', '92%', '#00FFB3'], ['Bobur K.', '1,000,000', '50%', '#FB923C'], ['Sardor K.', '900,000', '100%', '#4ADE80']].map(([n, sal, pct, c]) => (
              <div key={n} style={{ background: '#0d1120', borderRadius: 7, padding: '8px 10px', marginBottom: 6, border: '1px solid rgba(0,255,179,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#fff' }}>{n}</span>
                  <span style={{ fontSize: 10, color: c, fontFamily: 'monospace' }}>{sal}</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: pct, height: '100%', background: `linear-gradient(90deg,${c},${c}aa)`, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function MacBook() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 600), setTimeout(() => setPhase(2), 1700), setTimeout(() => setPhase(3), 2500)]
    return () => t.forEach(clearTimeout)
  }, [])
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 860, margin: '0 auto', perspective: 1400 }}>
      <motion.div animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.5 }} transition={{ duration: 1.4, delay: 0.3 }}
        style={{ position: 'absolute', bottom: -60, left: '5%', right: '5%', height: 100, background: 'radial-gradient(ellipse,rgba(0,255,179,0.25) 0%,transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none', zIndex: 0 }} />
      <motion.div animate={{ rotateX: phase >= 1 ? 0 : -112 }} transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d', position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'linear-gradient(160deg,#2c2c2c,#1a1a1a)', borderRadius: '18px 18px 0 0', border: '1.5px solid #3a3a3a', borderBottom: 'none', padding: '18px 14px 0', boxShadow: '0 -12px 48px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.04)' }}>
          <div style={{ height: 28, background: '#1c1c1e', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6, borderBottom: '1px solid #111' }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <div style={{ flex: 1, margin: '0 8px', background: '#111', borderRadius: 4, height: 15, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
              <span style={{ fontSize: 8, color: '#444', fontFamily: 'monospace' }}>🔒  app.tartibcrm.uz/dashboard</span>
            </div>
          </div>
          <div style={{ background: '#070b14', overflow: 'hidden', aspectRatio: '16/9', position: 'relative', minHeight: 200 }}>
            {phase >= 3 && <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(0,255,179,0.15),transparent)', animation: 'scanline 5s linear infinite', pointerEvents: 'none', zIndex: 10 }} />}
            <AnimatePresence>
              {phase >= 3 ? (
                <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ width: '100%', height: '100%' }}>
                  <Dashboard />
                </motion.div>
              ) : phase === 2 ? (
                <motion.div key="boot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#070b14' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    style={{ width: 24, height: 24, border: '2.5px solid rgba(0,255,179,0.15)', borderTopColor: '#00FFB3', borderRadius: '50%' }} />
                </motion.div>
              ) : (
                <div key="off" style={{ width: '100%', height: '100%', background: '#000' }} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ scaleX: 0.85 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ background: 'linear-gradient(to bottom,#2c2c2c,#222)', height: 12, borderRadius: '0 0 3px 3px', border: '1.5px solid #3a3a3a', borderTop: 'none', boxShadow: '0 8px 28px rgba(0,0,0,0.5)' }} />
        <div style={{ background: 'linear-gradient(to bottom,#222,#1a1a1a)', height: 6, borderRadius: '0 0 8px 8px', border: '1.5px solid #333', borderTop: 'none', margin: '0 2%' }} />
      </motion.div>
    </div>
  )
}

/* Mobile CRM preview card — shown instead of MacBook on phones */
function MobilePreview() {
  const [tab, setTab] = useState(0)
  const [live, setLive] = useState(0)
  const ORDERS = [
    { id: '#1042', name: 'Azimjon M.', sum: '2,400,000', status: 'Yuvishda', c: '#38BDF8' },
    { id: '#1041', name: 'Malika T.', sum: '1,850,000', status: 'Tayyor', c: '#4ADE80' },
    { id: '#1040', name: 'Sardor K.', sum: '5,600,000', status: 'Yetkazishda', c: '#FB923C' },
  ]
  useEffect(() => {
    const t = setInterval(() => setLive(p => (p + 1) % ORDERS.length), 2800)
    return () => clearInterval(t)
  }, [])
  const TABS = ['Dashboard', 'Buyurtmalar', 'Moliya']
  return (
    <motion.div initial={{ opacity: 0, y: 32, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
      style={{ width: '100%', maxWidth: 360, margin: '0 auto', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,255,179,0.15)', boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,179,0.08)' }}>
      {/* Phone header bar */}
      <div style={{ background: '#0d1120', padding: '10px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,255,179,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#000' }}>T</div>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>TartibCRM</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <LiveDot />
          <span style={{ fontSize: 9, color: '#00FFB3', fontWeight: 700 }}>LIVE</span>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', background: '#080c18', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            flex: 1, padding: '9px 4px', fontSize: 10, fontWeight: tab === i ? 700 : 500,
            color: tab === i ? '#00FFB3' : '#444',
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            borderBottom: tab === i ? '2px solid #00FFB3' : '2px solid transparent',
            transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>
      {/* Content */}
      <div style={{ background: '#070b14', padding: '14px', minHeight: 200 }}>
        {tab === 0 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {KPI.map((k, i) => (
                <div key={i} style={{ background: `${k.color}0d`, border: `1px solid ${k.color}20`, borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: k.color, fontFamily: 'monospace' }}>{k.value}</div>
                  <div style={{ fontSize: 9, color: '#555', marginTop: 2 }}>{k.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0d1120', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(0,255,179,0.06)' }}>
              <div style={{ fontSize: 9, color: '#555', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}><LiveDot /> So'nggi buyurtma</div>
              <AnimatePresence mode="wait">
                <motion.div key={live} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>{ORDERS[live].name}</div>
                    <div style={{ fontSize: 9, color: '#555' }}>{ORDERS[live].id}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: '#00FFB3', fontFamily: 'monospace' }}>{ORDERS[live].sum}</div>
                    <div style={{ fontSize: 9, color: ORDERS[live].c, fontWeight: 700 }}>{ORDERS[live].status}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
        {tab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ORDERS.map((o, i) => (
              <motion.div key={o.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#0d1120', borderRadius: 10, padding: '10px 12px', border: `1px solid ${o.c}18` }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: o.c, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9' }}>{o.name}</div>
                  <div style={{ fontSize: 9, color: '#555' }}>{o.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#00FFB3', fontFamily: 'monospace', textAlign: 'right' }}>{o.sum}</div>
                  <div style={{ fontSize: 9, color: o.c, textAlign: 'right', fontWeight: 600 }}>{o.status}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {tab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['↑ Kirim', "48.2M so'm", '#4ADE80'], ['↓ Chiqim', "12.8M so'm", '#F87171'], ['= Foyda', "35.4M so'm", '#00FFB3']].map(([l, v, c]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `${c}08`, border: `1px solid ${c}18`, borderRadius: 10, padding: '12px 14px' }}>
                <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>{l}</span>
                <span style={{ fontSize: 14, fontWeight: 900, color: c, fontFamily: 'monospace' }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Counter({ end, suffix = '', duration = 2 }) {
  const [val, setVal] = useState(0)
  const [el, setEl] = useState(null)
  useEffect(() => {
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      const s = Date.now()
      const tick = () => {
        const p = Math.min((Date.now() - s) / (duration * 1000), 1)
        setVal(Math.round(end * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      obs.disconnect()
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [el, end, duration])
  return <span ref={setEl}>{val.toLocaleString()}{suffix}</span>
}

export default function Hero() {
  const { scrollY } = useScroll()
  const yT = useTransform(scrollY, [0, 500], [0, -50])
  const opT = useTransform(scrollY, [0, 400], [1, 0.3])

  const [particles] = useState(() => Array.from({ length: 24 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5, speed: Math.random() * 0.2 + 0.06,
    color: i % 3 === 0 ? '#00FFB3' : i % 3 === 1 ? '#A78BFA' : '#38BDF8',
    opacity: Math.random() * 0.3 + 0.06,
  })))
  const [pts, setPts] = useState(particles)
  useEffect(() => {
    let raf
    const tick = () => {
      setPts(p => p.map(pt => ({ ...pt, y: pt.y - pt.speed < -2 ? 102 : pt.y - pt.speed })))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  useEffect(() => {
    const fn = e => setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <section className="hero-section" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '88px 5% 60px', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {pts.map(p => (
          <div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: p.color, opacity: p.opacity }} />
        ))}
      </div>

      {/* Mouse glow (desktop only) */}
      <div className="mouse-glow" style={{ position: 'fixed', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle,rgba(0,255,179,0.05) 0%,transparent 70%)`, transform: `translate(${mouse.x}vw,${mouse.y}vh) translate(-50%,-50%)`, pointerEvents: 'none', zIndex: 1, transition: 'transform 0.12s ease' }} />

      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, 3, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: 700, height: 700, top: -300, left: -200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,255,179,0.07) 0%,transparent 65%)', filter: 'blur(60px)' }} />
        <motion.div animate={{ scale: [1.05, 1, 1.05], rotate: [0, -4, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{ position: 'absolute', width: 600, height: 600, bottom: -200, right: -150, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.06) 0%,transparent 65%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,255,179,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,179,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)' }} />
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(0,255,179,0.2),transparent)', animation: 'scanline 7s linear infinite', pointerEvents: 'none', zIndex: 1 }} />

      {/* Content */}
      <motion.div style={{ y: yT, opacity: opT, position: 'relative', zIndex: 2, width: '100%' }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 99, marginBottom: 22, background: 'rgba(0,255,179,0.06)', border: '1px solid rgba(0,255,179,0.2)', fontSize: 11, fontWeight: 600, color: '#00FFB3', backdropFilter: 'blur(8px)' }}>
          <LiveDot />
          <span>O'ZBEKISTON №1 CRM · 12,847+ KOMPANIYA</span>
        </motion.div>

        {/* H1 */}
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="hero-h1"
          style={{ fontSize: 'clamp(32px,6.5vw,82px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-2px', marginBottom: 18, position: 'relative' }}>
          Gilam yuvish sehxingizni<br />
          <GlitchText text="raqamli tartibga" />
          <br />
          <span style={{ color: '#f1f5f9' }}>soling.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="hero-sub"
          style={{ fontSize: 'clamp(14px,1.9vw,18px)', color: '#666', maxWidth: 520, margin: '0 auto 30px', lineHeight: 1.75 }}>
          Buyurtmalar, shafyorlar, ishchilar, maosh va moliya —<br className="hide-mobile" />
          barchasini bitta tizimda boshqaring. Real vaqtda.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="hero-cta"
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28, maxWidth: 420, margin: '0 auto 28px' }}>
          <motion.a href="#demo" whileTap={{ scale: 0.96 }}
            style={{ padding: '14px 28px', background: 'linear-gradient(135deg,#00FFB3,#00cc8e)', color: '#000', borderRadius: 12, fontSize: 15, fontWeight: 700, boxShadow: '0 4px 20px rgba(0,255,179,0.3)', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
            ⚡ Bepul demo olish
          </motion.a>
          <motion.a href="#screenshots" whileTap={{ scale: 0.96 }}
            style={{ padding: '14px 24px', background: 'rgba(255,255,255,0.04)', color: '#888', borderRadius: 12, fontSize: 15, fontWeight: 600, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
            ▶ Ko'rish
          </motion.a>
        </motion.div>

        {/* Badges */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="hero-badges"
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 52 }}>
          {["14 daqiqada sozlash", "30 kun bepul sinov", "Karta talab yo'q"].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#555' }}>
              <span style={{ color: '#00FFB3' }}>✓</span> {t}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* MacBook — desktop */}
      <motion.div className="mac-section" style={{ width: '100%', position: 'relative', zIndex: 2 }}
        initial={{ opacity: 0, y: 60, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5 }}>
        <MacBook />
      </motion.div>

      {/* Mobile preview — phone only */}
      <div className="mob-preview" style={{ display: 'none', width: '100%', position: 'relative', zIndex: 2 }}>
        <MobilePreview />
      </div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
        className="hero-stats"
        style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', marginTop: 56, position: 'relative', zIndex: 2 }}>
        {[{ end: 12847, suffix: '+', label: 'Foydalanuvchi' }, { end: 50000, suffix: '+', label: 'Buyurtma' }, { end: 99, suffix: '%', label: 'Uptime' }].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div className="hero-stat-val" style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-1px', background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              <Counter end={s.end} suffix={s.suffix} />
            </div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(transparent,#050508)', pointerEvents: 'none', zIndex: 3 }} />

      <style>{`
        @keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}
        @keyframes scanline{0%{top:-4px}100%{top:110%}}
        @keyframes glitch1{0%,100%{clip-path:inset(0 0 95% 0)}20%{clip-path:inset(25% 0 55% 0)}50%{clip-path:inset(65% 0 15% 0)}}
        @keyframes glitch2{0%,100%{clip-path:inset(0 0 95% 0)}30%{clip-path:inset(45% 0 35% 0)}65%{clip-path:inset(10% 0 75% 0)}}
        @media(max-width:768px){
          .hide-mobile{display:none}
          .mob-preview{display:block!important}
          .mac-section{display:none!important}
          .mouse-glow{display:none}
          .hero-section{padding:76px 16px 40px!important}
          .hero-cta{flex-direction:column!important;gap:10px!important;max-width:100%!important}
          .hero-cta a{flex:none!important;width:100%!important}
          .hero-badges{flex-direction:column!important;align-items:center!important;gap:6px!important}
          .hero-stats{margin-top:32px!important;gap:20px!important}
        }
      `}</style>
    </section>
  )
}
