'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const W = 900
const H = 540

const VX = [0, 145, 277, 419, 541, 677, 900]
const HY = [0, 95, 181, 293, 385, 540]

const BLOCKS = [
  {x:0,y:0,w:138,h:88},{x:152,y:0,w:118,h:88},{x:284,y:0,w:128,h:88},
  {x:426,y:0,w:108,h:88},{x:548,y:0,w:122,h:88},{x:684,y:0,w:216,h:88},
  {x:0,y:102,w:138,h:72},{x:152,y:102,w:118,h:72},{x:284,y:102,w:128,h:72},
  {x:426,y:102,w:108,h:72},{x:548,y:102,w:122,h:72},{x:684,y:102,w:216,h:72},
  {x:0,y:188,w:138,h:98},{x:152,y:188,w:118,h:98},{x:284,y:188,w:128,h:98},
  {x:426,y:188,w:108,h:98},{x:548,y:188,w:122,h:98},{x:684,y:188,w:216,h:98},
  {x:0,y:300,w:138,h:78},{x:152,y:300,w:118,h:78},{x:284,y:300,w:128,h:78},
  {x:426,y:300,w:108,h:78},{x:548,y:300,w:122,h:78},{x:684,y:300,w:216,h:78},
  {x:0,y:392,w:138,h:148},{x:152,y:392,w:118,h:148},{x:284,y:392,w:128,h:148},
  {x:426,y:392,w:108,h:148},{x:548,y:392,w:122,h:148},{x:684,y:392,w:216,h:148},
]

const BLDS = [
  {x:8,y:8,w:42,h:30},{x:58,y:8,w:36,h:30},{x:98,y:8,w:34,h:30},
  {x:8,y:46,w:58,h:36},{x:72,y:46,w:58,h:36},
  {x:160,y:8,w:46,h:32},{x:214,y:8,w:48,h:32},
  {x:160,y:48,w:44,h:36},{x:212,y:48,w:50,h:36},
  {x:292,y:8,w:56,h:36},{x:356,y:8,w:48,h:36},
  {x:292,y:52,w:50,h:32},{x:350,y:52,w:54,h:32},
  {x:434,y:6,w:44,h:32},{x:486,y:6,w:42,h:32},
  {x:434,y:46,w:92,h:36},
  {x:556,y:6,w:52,h:34},{x:616,y:6,w:48,h:34},
  {x:556,y:48,w:46,h:36},{x:610,y:48,w:50,h:36},
  {x:692,y:6,w:65,h:40},{x:765,y:6,w:131,h:40},
  {x:692,y:54,w:60,h:32},{x:758,y:54,w:134,h:32},
  {x:434,y:104,w:100,h:62,fill:'#0a1e0c'},{x:692,y:104,w:210,h:62,fill:'#0a1e0c'},
  {x:8,y:110,w:56,h:26},{x:72,y:110,w:58,h:26},{x:8,y:144,w:120,h:28},
  {x:160,y:108,w:50,h:30},{x:218,y:108,w:46,h:30},{x:160,y:146,w:100,h:26},
  {x:292,y:106,w:60,h:32},{x:360,y:106,w:44,h:32},{x:292,y:146,w:52,h:26},{x:352,y:146,w:52,h:26},
  {x:556,y:104,w:52,h:32},{x:616,y:104,w:48,h:32},{x:556,y:144,w:102,h:28},
  {x:8,y:196,w:56,h:42},{x:72,y:196,w:58,h:42},{x:8,y:246,w:56,h:40},{x:72,y:246,w:58,h:40},
  {x:160,y:194,w:50,h:46},{x:218,y:194,w:46,h:46},{x:160,y:248,w:100,h:38},
  {x:292,y:192,w:60,h:50},{x:360,y:192,w:44,h:50},{x:292,y:250,w:52,h:36},{x:352,y:250,w:52,h:36},
  {x:434,y:196,w:46,h:46},{x:488,y:196,w:42,h:46},{x:434,y:250,w:42,h:38},{x:484,y:250,w:46,h:38},
  {x:556,y:192,w:52,h:50},{x:616,y:192,w:48,h:50},{x:556,y:250,w:46,h:45},{x:610,y:250,w:50,h:45},
  {x:692,y:190,w:65,h:52},{x:765,y:190,w:131,h:52},{x:692,y:250,w:60,h:40},{x:758,y:250,w:134,h:40},
  {x:8,y:308,w:56,h:34},{x:72,y:308,w:58,h:34},{x:8,y:350,w:120,h:38},
  {x:160,y:306,w:50,h:36},{x:218,y:306,w:46,h:36},{x:160,y:350,w:100,h:38},
  {x:292,y:304,w:60,h:38},{x:360,y:304,w:44,h:38},{x:292,y:350,w:52,h:37},{x:352,y:350,w:52,h:37},
  {x:434,y:302,w:46,h:40},{x:488,y:302,w:42,h:40},{x:434,y:350,w:42,h:38},{x:484,y:350,w:46,h:38},
  {x:556,y:300,w:52,h:42},{x:616,y:300,w:48,h:42},{x:556,y:350,w:102,h:37},
  {x:692,y:302,w:65,h:44},{x:765,y:302,w:131,h:44},{x:692,y:354,w:60,h:34},{x:758,y:354,w:134,h:34},
  {x:8,y:400,w:56,h:52},{x:72,y:400,w:58,h:52},{x:8,y:460,w:120,h:72},
  {x:160,y:398,w:100,h:54},{x:160,y:460,w:50,h:72},{x:218,y:460,w:46,h:72},
  {x:292,y:396,w:60,h:58},{x:360,y:396,w:44,h:58},{x:292,y:462,w:52,h:70},{x:352,y:462,w:52,h:70},
  {x:434,y:394,w:90,h:58},{x:434,y:460,w:42,h:72},{x:484,y:460,w:46,h:72},
  {x:556,y:392,w:102,h:60},{x:556,y:460,w:52,h:72},{x:616,y:460,w:48,h:72},
  {x:692,y:394,w:210,h:52},{x:692,y:454,w:60,h:78},{x:758,y:454,w:134,h:78},
]

const ROUTES = [
  { id:'sardor',name:'Sardor',order:'#1042',customer:'Azimjon M.', color:'#00FFB3',status:'Olib kelishda',type:'van', pts:[[419,95],[419,181],[277,181],[145,181],[145,293],[277,293],[419,293],[419,385]] },
  { id:'javlon',name:'Javlon',order:'#1034',customer:'Nilufar A.', color:'#FF6B35',status:'Yetkazmoqda',type:'truck', pts:[[900,293],[677,293],[541,293],[419,293],[419,181],[419,95],[277,95],[145,95]] },
  { id:'bahodir',name:'Bahodir',order:'#1035',customer:'Dilnoza S.', color:'#A78BFA',status:'Qaytmoqda',type:'car', pts:[[145,385],[277,385],[419,385],[541,385],[541,293],[541,181],[677,181],[677,95],[900,95]] },
  { id:'nodir',name:'Nodir',order:'#1048',customer:'Sherzod B.', color:'#38BDF8',status:'Yetkazmoqda',type:'van', pts:[[0,95],[145,95],[277,95],[277,181],[277,293],[277,385],[419,385],[541,385],[677,385],[677,293],[677,181]] },
]

const PINS = [
  {x:419,y:385,id:'#1042',type:'pickup', color:'#00FFB3'},
  {x:145,y:95, id:'#1034',type:'delivery',color:'#FF6B35'},
  {x:900,y:95, id:'#1035',type:'done',   color:'#4ADE80'},
  {x:277,y:181,id:'#1038',type:'delivery',color:'#FF6B35'},
  {x:541,y:181,id:'#1031',type:'done',   color:'#4ADE80'},
]

const METRO = [
  {x:145,y:293,name:'Chilonzor'},{x:277,y:293,name:'Mirzo Ulug\'bek'},
  {x:419,y:293,name:'Amir Temur'},{x:541,y:293,name:'Shayxontohur'},
]

const STREET_LABELS = [
  {x:419,y:50,label:"Amir Temur ko'chasi",angle:0},
  {x:145,y:240,label:"Beruniy ko'chasi",angle:90},
  {x:677,y:240,label:"Navoiy ko'chasi",angle:90},
  {x:419,y:340,label:"Mustaqillik shoh yo'li",angle:0},
]

const ZONES = ['Chilonzor','Mirzo Ulug\'bek','Yunusobod','Shayxontohur','Sergeli','M']

function lerp(a,b,t){ return a+(b-a)*t }
function ptOnRoute(pts,t){
  const total=pts.length-1
  const seg=Math.min(Math.floor(t*total),total-1)
  const lt=(t*total)-seg
  const [ax,ay]=pts[seg]
  const [bx,by]=pts[seg+1]
  return [lerp(ax,bx,lt),lerp(ay,by,lt)]
}

export default function MapSection() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.1 })
  const rafRef = useRef(null)
  const startRef = useRef(null)
  const [positions, setPositions] = useState(ROUTES.map((_,i)=>({ t:(i*0.25)%1, x:0, y:0 })))
  const [activeRoute, setActiveRoute] = useState(null)
  const [tick, setTick] = useState(0)

  useEffect(()=>{
    if(!inView) return
    startRef.current=performance.now()
    const animate=(now)=>{
      const elapsed=(now-(startRef.current||now))/1000
      setPositions(ROUTES.map((r,i)=>{
        const speed=0.04+i*0.008
        const t=((elapsed*speed+(i*0.25))%1)
        const [x,y]=ptOnRoute(r.pts,t)
        return {t,x,y}
      }))
      setTick(p=>p+1)
      rafRef.current=requestAnimationFrame(animate)
    }
    rafRef.current=requestAnimationFrame(animate)
    return ()=>{ if(rafRef.current) cancelAnimationFrame(rafRef.current) }
  },[inView])

  const routeToSvgPath=(pts)=>{
    return pts.map((p,i)=>`${i===0?'M':'L'}${p[0]},${p[1]}`).join(' ')
  }

  const stats=[
    {label:'Online shafyorlar',value:'4',icon:'🚗'},
    {label:'Olib kelish',value:'3',icon:'📥'},
    {label:'Yetkazilmoqda',value:'2',icon:'📦'},
    {label:'Bugun tugallandi',value:'12',icon:'✅'},
  ]

  return (
    <section id="map" style={{padding:'72px 0',background:'#050508',borderTop:'1px solid rgba(0,255,179,0.06)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'40%',left:'35%',width:500,height:400,background:'radial-gradient(ellipse,rgba(0,255,179,0.04),transparent)',filter:'blur(60px)',pointerEvents:'none'}}/>

      <div ref={ref} style={{maxWidth:1200,margin:'0 auto',padding:'0 20px'}}>
        {/* Header */}
        <div style={{textAlign:'center',marginBottom:40}}>
          <motion.div initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
            style={{display:'inline-flex',alignItems:'center',gap:8,padding:'5px 16px',borderRadius:99,background:'rgba(0,255,179,0.06)',border:'1px solid rgba(0,255,179,0.2)',fontSize:11,fontWeight:700,color:'#00FFB3',marginBottom:16,letterSpacing:2,textTransform:'uppercase'}}>
            <span style={{width:7,height:7,borderRadius:'50%',background:'#00FFB3',boxShadow:'0 0 6px #00FFB3',display:'inline-block',animation:'pulse 1.5s infinite'}}/>
            Real vaqtli kuzatuv
          </motion.div>
          <motion.h2 initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1}}
            style={{fontSize:'clamp(22px,4vw,44px)',fontWeight:900,letterSpacing:'-1.5px',lineHeight:1.1,marginBottom:12}}>
            Shafyorlar Toshkent ko'chalari<br/>
            <span style={{background:'linear-gradient(135deg,#00FFB3,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>bo'ylab harakatlanadi</span>
          </motion.h2>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.2}}
            style={{fontSize:15,color:'#555',maxWidth:460,margin:'0 auto',lineHeight:1.7}}>
            Har bir mashina faqat ko'cha bo'ylab — admin panelda real nazorat
          </motion.p>
        </div>

        {/* Map + sidebar layout */}
        <div className="map-layout4" style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:16,alignItems:'start'}}>

          {/* Map */}
          <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.3}}
            style={{background:'rgba(7,11,22,0.96)',border:'1px solid rgba(0,255,179,0.1)',borderRadius:16,overflow:'hidden',position:'relative'}}>

            {/* Map topbar */}
            <div style={{padding:'10px 16px',borderBottom:'1px solid rgba(0,255,179,0.07)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(5,8,16,0.8)'}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:7,height:7,borderRadius:'50%',background:'#4ADE80',boxShadow:'0 0 6px #4ADE80',animation:'pulse 1.5s infinite'}}/>
                <span style={{fontSize:12,fontWeight:700,color:'#f1f5f9'}}>Live · Toshkent</span>
              </div>
              <div style={{display:'flex',gap:6}}>
                {['+','−'].map(s=>(
                  <button key={s} style={{width:27,height:27,borderRadius:7,background:'rgba(0,255,179,0.07)',border:'1px solid rgba(0,255,179,0.15)',color:'#00FFB3',cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>{s}</button>
                ))}
              </div>
            </div>

            {/* SVG map — scrollable on mobile */}
            <div style={{overflowX:'auto',WebkitOverflowScrolling:'touch',cursor:'grab'}}>
              <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{display:'block',minWidth:320}}>
                {/* Base */}
                <rect width={W} height={H} fill="#070d1c"/>
                {/* Block fills */}
                {BLOCKS.map((b,i)=>(
                  <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.fill||'#0a1220'} rx={0}/>
                ))}
                {/* Roads */}
                {VX.map((x,i)=><line key={`v${i}`} x1={x} y1={0} x2={x} y2={H} stroke="#0d1830" strokeWidth={i===0||i===VX.length-1?0:14}/>)}
                {HY.map((y,i)=><line key={`h${i}`} x1={0} y1={y} x2={W} y2={y} stroke="#0d1830" strokeWidth={i===0||i===HY.length-1?0:14}/>)}
                {VX.slice(1,-1).map((x,i)=><line key={`vc${i}`} x1={x} y1={0} x2={x} y2={H} stroke="#111e35" strokeWidth={1} strokeDasharray="6 8"/>)}
                {HY.slice(1,-1).map((y,i)=><line key={`hc${i}`} x1={0} y1={y} x2={W} y2={y} stroke="#111e35" strokeWidth={1} strokeDasharray="6 8"/>)}
                {/* Buildings */}
                {BLDS.map((b,i)=>(
                  <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.fill||'#0e1a2e'} rx={2} stroke="#131f35" strokeWidth={0.5}/>
                ))}
                {/* Metro */}
                {METRO.map((m,i)=>(
                  <g key={i}>
                    <circle cx={m.x} cy={m.y} r={9} fill="#0a1a40" stroke="#1d4ed8" strokeWidth={1.5}/>
                    <text x={m.x} y={m.y+4} textAnchor="middle" fontSize={7} fill="#60a5fa" fontWeight="700">M</text>
                    <text x={m.x} y={m.y+20} textAnchor="middle" fontSize={6} fill="#334155">{m.name}</text>
                  </g>
                ))}
                {/* Street labels */}
                {STREET_LABELS.map((s,i)=>(
                  <text key={i} x={s.x} y={s.y} textAnchor="middle" fontSize={7.5} fill="#1e2d45" fontWeight="600"
                    transform={s.angle?`rotate(${s.angle},${s.x},${s.y})`:undefined}>{s.label}</text>
                ))}
                {/* Route trails */}
                {ROUTES.map(r=>(
                  <path key={r.id} d={routeToSvgPath(r.pts)} fill="none" stroke={r.color} strokeWidth={2} strokeOpacity={activeRoute===r.id?0.7:0.18} strokeDasharray="6 6"/>
                ))}
                {/* Pins */}
                {PINS.map((p,i)=>(
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={10} fill={p.color+'22'} stroke={p.color} strokeWidth={1.5}/>
                    <text x={p.x} y={p.y+4} textAnchor="middle" fontSize={9}>{p.type==='pickup'?'📥':p.type==='done'?'✅':'📦'}</text>
                    <text x={p.x} y={p.y-14} textAnchor="middle" fontSize={7.5} fill={p.color} fontWeight="700">{p.id}</text>
                  </g>
                ))}
                {/* Moving vehicles */}
                {ROUTES.map((r,i)=>{
                  const pos=positions[i]
                  if(!pos||!pos.x) return null
                  const nx=i*0.001
                  const isActive=activeRoute===r.id
                  return (
                    <g key={r.id} style={{cursor:'pointer'}} onClick={()=>setActiveRoute(v=>v===r.id?null:r.id)}>
                      <circle cx={pos.x} cy={pos.y} r={isActive?14:10} fill={r.color+'30'} stroke={r.color} strokeWidth={isActive?2:1.5}/>
                      <text x={pos.x} y={pos.y+4} textAnchor="middle" fontSize={isActive?11:9}>
                        {r.type==='van'?'🚚':r.type==='truck'?'🚛':'🚕'}
                      </text>
                      {isActive&&(
                        <text x={pos.x} y={pos.y-18} textAnchor="middle" fontSize={7.5} fill={r.color} fontWeight="800">{r.name}</text>
                      )}
                      <circle cx={pos.x} cy={pos.y} r={isActive?20:14} fill="none" stroke={r.color} strokeWidth={1} strokeOpacity={0.3} style={{animation:'ping 1.5s ease-out infinite'}}/>
                    </g>
                  )
                })}
                {/* Compass */}
                <g transform={`translate(${W-36},${H-52})`}>
                  <circle cx={0} cy={0} r={18} fill="rgba(5,8,16,0.9)" stroke="rgba(0,255,179,0.15)" strokeWidth={1}/>
                  {[['N',-12],['S',16],['E',5],['W',-5]].map(([d,offset],i)=>(
                    <text key={d} x={i<2?0:offset} y={i<2?offset:4} textAnchor="middle" fontSize={7} fill={d==='N'?'#00FFB3':'#334155'} fontWeight="700">{d}</text>
                  ))}
                </g>
                {/* Scale */}
                <g transform={`translate(16,${H-24})`}>
                  <line x1={0} y1={0} x2={60} y2={0} stroke="#1e3050" strokeWidth={2}/>
                  <line x1={0} y1={-4} x2={0} y2={4} stroke="#1e3050" strokeWidth={1.5}/>
                  <line x1={60} y1={-4} x2={60} y2={4} stroke="#1e3050" strokeWidth={1.5}/>
                  <text x={30} y={-6} textAnchor="middle" fontSize={7} fill="#334155">500m</text>
                  <text x={90} y={4} textAnchor="middle" fontSize={7} fill="#334155">1km</text>
                  <text x={16} y={12} textAnchor="middle" fontSize={6} fill="#1e3050">© Tartib CRM</text>
                </g>
              </svg>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {/* Stats grid */}
            <motion.div initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.4}}
              style={{background:'rgba(7,11,22,0.96)',border:'1px solid rgba(0,255,179,0.07)',borderRadius:14,padding:14}}>
              <div style={{fontSize:11,fontWeight:700,color:'#00FFB3',letterSpacing:1,textTransform:'uppercase',marginBottom:10}}>Live holat</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {stats.map(s=>(
                  <div key={s.label} style={{background:'rgba(0,255,179,0.04)',borderRadius:10,padding:'8px 10px',border:'1px solid rgba(0,255,179,0.08)'}}>
                    <div style={{fontSize:10,marginBottom:4}}>{s.icon}</div>
                    <div style={{fontSize:18,fontWeight:900,color:'#00FFB3',lineHeight:1}}>{s.value}</div>
                    <div style={{fontSize:9,color:'#445',marginTop:3,lineHeight:1.3}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Active drivers */}
            <motion.div initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.5}}
              style={{background:'rgba(7,11,22,0.96)',border:'1px solid rgba(0,255,179,0.07)',borderRadius:14,padding:14}}>
              <div style={{fontSize:11,fontWeight:700,color:'#00FFB3',letterSpacing:1,textTransform:'uppercase',marginBottom:10}}>Faol shafyorlar</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {ROUTES.map((r,i)=>(
                  <div key={r.id} onClick={()=>setActiveRoute(v=>v===r.id?null:r.id)}
                    style={{display:'flex',alignItems:'center',gap:10,padding:'8px 10px',borderRadius:10,cursor:'pointer',
                      background:activeRoute===r.id?`${r.color}0f`:'rgba(255,255,255,0.02)',
                      border:`1px solid ${activeRoute===r.id?r.color+'40':'rgba(255,255,255,0.04)'}`,
                      transition:'all 0.2s'}}>
                    <div style={{width:32,height:32,borderRadius:'50%',background:`${r.color}18`,border:`1px solid ${r.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>
                      {r.type==='van'?'🚚':r.type==='truck'?'🚛':'🚕'}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:12,fontWeight:700,color:'#f1f5f9'}}>{r.name}</div>
                      <div style={{fontSize:9,color:'#555',marginTop:1}}>{r.order} · {r.customer}</div>
                    </div>
                    <div style={{width:7,height:7,borderRadius:'50%',background:r.color,flexShrink:0,boxShadow:`0 0 5px ${r.color}`}}/>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Today stats */}
            <motion.div initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.6}}
              style={{background:'rgba(7,11,22,0.96)',border:'1px solid rgba(0,255,179,0.07)',borderRadius:14,padding:14}}>
              <div style={{fontSize:11,fontWeight:700,color:'#00FFB3',letterSpacing:1,textTransform:'uppercase',marginBottom:10}}>Statistika</div>
              {[['Kunlik yetkazma','1,293'],["O'rtacha vaqt",'2.4 soat'],['Muvaffaqiyat','99.1%'],['Umumiy masofa','348 km']].map(([l,v])=>(
                <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8,fontSize:11}}>
                  <span style={{color:'#555'}}>{l}</span>
                  <span style={{color:'#f1f5f9',fontWeight:700,fontFamily:'monospace'}}>{v}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes ping{75%,100%{transform:scale(2);opacity:0}}
        @media(max-width:768px){
          .map-layout4{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}
