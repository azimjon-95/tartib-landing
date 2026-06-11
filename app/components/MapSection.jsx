'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const W = 900
const H = 540

const VX = [0, 145, 277, 419, 541, 677, 900]
const HY = [0, 95, 181, 293, 385, 540]

/* ── Binolar ── */
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

/* ── Mini binolar ── */
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
  // Park
  {x:434,y:104,w:100,h:62,fill:'#0a1e0c'},{x:692,y:104,w:210,h:62,fill:'#0a1e0c'},
  // Row 2-5 mini blocks
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

/* ── Marshrutlar ── */
const ROUTES = [
  {
    id:'sardor',name:'Sardor',order:'#1042',customer:'Azimjon M.',
    color:'#00FFB3',status:'Olib kelishda',type:'van',
    pts:[[419,95],[419,181],[277,181],[145,181],[145,293],[277,293],[419,293],[419,385]],
  },
  {
    id:'javlon',name:'Javlon',order:'#1034',customer:'Nilufar A.',
    color:'#FF6B35',status:'Yetkazmoqda',type:'truck',
    pts:[[900,293],[677,293],[541,293],[419,293],[419,181],[419,95],[277,95],[145,95]],
  },
  {
    id:'bahodir',name:'Bahodir',order:'#1035',customer:'Dilnoza S.',
    color:'#A78BFA',status:'Qaytmoqda',type:'car',
    pts:[[145,385],[277,385],[419,385],[541,385],[541,293],[541,181],[677,181],[677,95],[900,95]],
  },
  {
    id:'nodir',name:'Nodir',order:'#1048',customer:'Sherzod B.',
    color:'#38BDF8',status:'Yetkazmoqda',type:'van',
    pts:[[0,95],[145,95],[277,95],[277,181],[277,293],[277,385],[419,385],[541,385],[677,385],[677,293],[677,181]],
  },
]

const PINS = [
  {x:419,y:385,id:'#1042',type:'pickup', color:'#00FFB3'},
  {x:145,y:95, id:'#1034',type:'delivery',color:'#FF6B35'},
  {x:900,y:95, id:'#1035',type:'done',   color:'#4ADE80'},
  {x:277,y:181,id:'#1038',type:'delivery',color:'#FF6B35'},
  {x:541,y:181,id:'#1031',type:'done',   color:'#4ADE80'},
]

const METRO = [
  {x:145,y:293,name:'Chilonzor'},
  {x:277,y:293,name:"Mirzo Ulug'bek"},
  {x:419,y:293,name:'Amir Temur'},
  {x:541,y:293,name:'Shayxontohur'},
]

function lerp(a,b,t){return a+(b-a)*t}
function segLen([x1,y1],[x2,y2]){return Math.hypot(x2-x1,y2-y1)}

function getPosOnRoute(pts,progress){
  const lens=pts.slice(1).map((p,i)=>segLen(pts[i],p))
  const total=lens.reduce((a,b)=>a+b,0)
  let target=total*Math.min(progress,0.9999)
  for(let i=0;i<lens.length;i++){
    if(target<=lens[i]){
      const t=target/lens[i]
      return{
        x:lerp(pts[i][0],pts[i+1][0],t),
        y:lerp(pts[i][1],pts[i+1][1],t),
        angle:Math.atan2(pts[i+1][1]-pts[i][1],pts[i+1][0]-pts[i][0])*180/Math.PI,
      }
    }
    target-=lens[i]
  }
  return{x:pts[pts.length-1][0],y:pts[pts.length-1][1],angle:0}
}

function getTrail(pts,progress){
  const lens=pts.slice(1).map((p,i)=>segLen(pts[i],p))
  const total=lens.reduce((a,b)=>a+b,0)
  let target=total*progress
  const out=[[...pts[0]]]
  for(let i=0;i<lens.length;i++){
    if(target<=lens[i]){
      const t=target/lens[i]
      out.push([lerp(pts[i][0],pts[i+1][0],t),lerp(pts[i][1],pts[i+1][1],t)])
      break
    }
    target-=lens[i]
    out.push([...pts[i+1]])
  }
  return out.map(p=>p.join(',')).join(' ')
}

/* ── Real mashina SVG (top-view) ── */
function CarSvg({color,type}){
  if(type==='truck'){
    return(
      <g>
        {/* Soya */}
        <ellipse cx="1" cy="4" rx="13" ry="5" fill="rgba(0,0,0,0.3)"/>
        {/* Yuk qism (orqa) */}
        <rect x="-12" y="-7" width="14" height="14" rx="1.5"
          fill={color} opacity="0.75" stroke={color} strokeWidth="0.3"/>
        {/* Yuk konteyner detallar */}
        <line x1="-10" y1="-7" x2="-10" y2="7" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8"/>
        <line x1="-6"  y1="-7" x2="-6"  y2="7" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8"/>
        <line x1="-2"  y1="-7" x2="-2"  y2="7" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8"/>
        {/* Kabina (old) */}
        <rect x="2" y="-6" width="11" height="12" rx="2"
          fill={color} stroke={color} strokeWidth="0.4"/>
        {/* Kabina shisha */}
        <rect x="4" y="-4.5" width="7" height="5" rx="1"
          fill="rgba(180,230,255,0.35)"/>
        {/* Old chiroqlar */}
        <rect x="12" y="-5" width="2.5" height="3" rx="0.8" fill="#ffe090" opacity="0.9"/>
        <rect x="12" y="2"  width="2.5" height="3" rx="0.8" fill="#ffe090" opacity="0.9"/>
        {/* Orqa chiroqlar */}
        <rect x="-13.5" y="-6" width="2" height="3" rx="0.5" fill="#ff4444" opacity="0.85"/>
        <rect x="-13.5" y="3"  width="2" height="3" rx="0.5" fill="#ff4444" opacity="0.85"/>
        {/* G'ildiraklar */}
        <ellipse cx="-9" cy="-7.5" rx="3" ry="1.8" fill="#111" stroke="#333" strokeWidth="0.5"/>
        <ellipse cx="-9" cy="7.5"  rx="3" ry="1.8" fill="#111" stroke="#333" strokeWidth="0.5"/>
        <ellipse cx="7"  cy="-7"   rx="2.5" ry="1.6" fill="#111" stroke="#333" strokeWidth="0.5"/>
        <ellipse cx="7"  cy="7"    rx="2.5" ry="1.6" fill="#111" stroke="#333" strokeWidth="0.5"/>
      </g>
    )
  }
  if(type==='van'){
    return(
      <g>
        <ellipse cx="0" cy="3.5" rx="11" ry="4.5" fill="rgba(0,0,0,0.3)"/>
        {/* Van tana */}
        <rect x="-10" y="-6" width="20" height="12" rx="2.5"
          fill={color} stroke={color} strokeWidth="0.3"/>
        {/* Yuk qism orqa */}
        <rect x="-10" y="-5.5" width="11" height="11" rx="1.5"
          fill={color} opacity="0.7"/>
        <line x1="-6" y1="-5.5" x2="-6" y2="5.5" stroke="rgba(0,0,0,0.15)" strokeWidth="0.7"/>
        <line x1="-2" y1="-5.5" x2="-2" y2="5.5" stroke="rgba(0,0,0,0.15)" strokeWidth="0.7"/>
        {/* Old shisha */}
        <rect x="2" y="-4.5" width="6.5" height="5" rx="1.2" fill="rgba(180,230,255,0.35)"/>
        {/* Yon derazalar */}
        <rect x="-9" y="-4" width="3.5" height="4" rx="0.8" fill="rgba(180,230,255,0.2)"/>
        {/* Old chiroq */}
        <rect x="9.5" y="-5" width="2.5" height="2.5" rx="0.7" fill="#ffe090" opacity="0.9"/>
        <rect x="9.5" y="2.5" width="2.5" height="2.5" rx="0.7" fill="#ffe090" opacity="0.9"/>
        {/* Orqa chiroq */}
        <rect x="-12" y="-5" width="2" height="2.5" rx="0.5" fill="#ff4444" opacity="0.85"/>
        <rect x="-12" y="2.5" width="2" height="2.5" rx="0.5" fill="#ff4444" opacity="0.85"/>
        {/* G'ildiraklar */}
        <ellipse cx="-6" cy="-7" rx="2.8" ry="1.7" fill="#111" stroke="#333" strokeWidth="0.5"/>
        <ellipse cx="-6" cy="7"  rx="2.8" ry="1.7" fill="#111" stroke="#333" strokeWidth="0.5"/>
        <ellipse cx="5"  cy="-6.5" rx="2.4" ry="1.5" fill="#111" stroke="#333" strokeWidth="0.5"/>
        <ellipse cx="5"  cy="6.5"  rx="2.4" ry="1.5" fill="#111" stroke="#333" strokeWidth="0.5"/>
      </g>
    )
  }
  // car
  return(
    <g>
      <ellipse cx="0" cy="3" rx="9" ry="4" fill="rgba(0,0,0,0.3)"/>
      {/* Tana */}
      <rect x="-9" y="-5.5" width="18" height="11" rx="3" fill={color}/>
      {/* Tom */}
      <rect x="-5.5" y="-4.2" width="11" height="8.4" rx="2.2" fill={color} opacity="0.72"/>
      {/* Old shisha */}
      <path d="M-5.5,-4.2 L-1,-3.5 L-1,3.5 L-5.5,4.2" fill="rgba(180,230,255,0.32)" rx="1"/>
      {/* Orqa shisha */}
      <path d="M5.5,-4.2 L1,-3.5 L1,3.5 L5.5,4.2" fill="rgba(180,230,255,0.25)" rx="1"/>
      {/* Yon derazalar */}
      <rect x="-5" y="-3.2" width="3.8" height="6.4" rx="0.8" fill="rgba(180,230,255,0.2)"/>
      <rect x="1.2" y="-3.2" width="3.8" height="6.4" rx="0.8" fill="rgba(180,230,255,0.18)"/>
      {/* Old chiroq */}
      <rect x="8" y="-4.5" width="2.5" height="2.5" rx="0.8" fill="#ffe090" opacity="0.92"/>
      <rect x="8" y="2"    width="2.5" height="2.5" rx="0.8" fill="#ffe090" opacity="0.92"/>
      {/* Orqa chiroq */}
      <rect x="-10.5" y="-4.5" width="2" height="2.5" rx="0.5" fill="#ff4444" opacity="0.85"/>
      <rect x="-10.5" y="2"    width="2" height="2.5" rx="0.5" fill="#ff4444" opacity="0.85"/>
      {/* G'ildiraklar */}
      <ellipse cx="-5.5" cy="-6.5" rx="2.5" ry="1.5" fill="#111" stroke="#333" strokeWidth="0.5"/>
      <ellipse cx="-5.5" cy="6.5"  rx="2.5" ry="1.5" fill="#111" stroke="#333" strokeWidth="0.5"/>
      <ellipse cx="5"    cy="-6"   rx="2.2" ry="1.4" fill="#111" stroke="#333" strokeWidth="0.5"/>
      <ellipse cx="5"    cy="6"    rx="2.2" ry="1.4" fill="#111" stroke="#333" strokeWidth="0.5"/>
    </g>
  )
}

/* ── Headlight beam ── */
function HeadlightBeam({color}){
  return(
    <g opacity="0.35">
      <polygon points="12,0 22,-6 22,6" fill="#ffe090"/>
    </g>
  )
}

function ToshkentMap(){
  const [progs,setProgs]=useState(()=>ROUTES.map((_,i)=>i*0.24))
  const rafRef=useRef(null)
  const lastRef=useRef(Date.now())
  const [tip,setTip]=useState(null)
  const [zoom,setZoom]=useState(1)
  const [pan,setPan]=useState({x:0,y:0})
  const dragging=useRef(false)
  const dragStart=useRef({x:0,y:0,px:0,py:0})

  useEffect(()=>{
    // Juda sekin — real yuk mashina tezligi
    const SPEEDS=[0.000055,0.000048,0.000052,0.000060]
    const tick=()=>{
      const now=Date.now()
      const dt=Math.min(now-lastRef.current,50)
      lastRef.current=now
      setProgs(prev=>prev.map((p,i)=>{
        let n=p+SPEEDS[i]*dt
        if(n>=1)n=0
        return n
      }))
      rafRef.current=requestAnimationFrame(tick)
    }
    rafRef.current=requestAnimationFrame(tick)
    return()=>cancelAnimationFrame(rafRef.current)
  },[])

  const onWheel=useCallback(e=>{
    e.preventDefault()
    setZoom(z=>Math.min(Math.max(z*(e.deltaY>0?0.92:1.09),0.6),4))
  },[])
  const onMDown=useCallback(e=>{
    dragging.current=true
    dragStart.current={x:e.clientX,y:e.clientY,px:pan.x,py:pan.y}
  },[pan])
  const onMMove=useCallback(e=>{
    if(!dragging.current)return
    setPan({x:dragStart.current.px+(e.clientX-dragStart.current.x),y:dragStart.current.py+(e.clientY-dragStart.current.y)})
  },[])
  const onMUp=useCallback(()=>{dragging.current=false},[])

  // Touch support
  const touchStart=useRef(null)
  const onTStart=useCallback(e=>{
    if(e.touches.length===1){
      dragging.current=true
      dragStart.current={x:e.touches[0].clientX,y:e.touches[0].clientY,px:pan.x,py:pan.y}
    }
  },[pan])
  const onTMove=useCallback(e=>{
    if(!dragging.current||e.touches.length!==1)return
    e.preventDefault()
    setPan({x:dragStart.current.px+(e.touches[0].clientX-dragStart.current.x),y:dragStart.current.py+(e.touches[0].clientY-dragStart.current.y)})
  },[])
  const onTEnd=useCallback(()=>{dragging.current=false},[])

  const cx=W/2,cy=H/2

  return(
    <div
      style={{position:'relative',borderRadius:14,overflow:'hidden',background:'#060c16',
        border:'1px solid rgba(0,255,179,0.1)',
        boxShadow:'inset 0 0 60px rgba(0,10,30,0.8),0 24px 64px rgba(0,0,0,0.7)',
        cursor:dragging.current?'grabbing':'grab',userSelect:'none',touchAction:'none'}}
      onWheel={onWheel} onMouseDown={onMDown} onMouseMove={onMMove}
      onMouseUp={onMUp} onMouseLeave={onMUp}
      onTouchStart={onTStart} onTouchMove={onTMove} onTouchEnd={onTEnd}>

      {/* Top bar */}
      <div style={{position:'absolute',top:0,left:0,right:0,zIndex:30,
        background:'linear-gradient(to bottom,rgba(4,8,18,0.92),transparent)',
        padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',pointerEvents:'none'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:7,height:7,borderRadius:'50%',background:'#4ADE80',
            boxShadow:'0 0 8px #4ADE80',animation:'lb 2s infinite'}}/>
          <span style={{fontSize:11,color:'#4ADE80',fontWeight:800,letterSpacing:1.5,textTransform:'uppercase'}}>Live · Toshkent</span>
        </div>
        <div style={{display:'flex',gap:6,pointerEvents:'all'}}>
          {['+','−'].map((s,i)=>(
            <button key={s} onClick={()=>setZoom(z=>i===0?Math.min(z*1.25,4):Math.max(z*0.8,0.6))}
              style={{width:27,height:27,borderRadius:7,background:'rgba(0,255,179,0.07)',
                border:'1px solid rgba(0,255,179,0.18)',color:'#00FFB3',cursor:'pointer',
                fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,lineHeight:1}}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{display:'block'}}>
        <defs>
          <filter id="rf" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3"/>
          </filter>
          {ROUTES.map(r=>(
            <filter key={r.id} id={`cg_${r.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feFlood floodColor={r.color} floodOpacity="0.45" result="c"/>
              <feComposite in="c" in2="b" operator="in" result="g"/>
              <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          ))}
          <clipPath id="mc"><rect width={W} height={H}/></clipPath>
        </defs>

        <g clipPath="url(#mc)">
          <g transform={`translate(${cx+pan.x},${cy+pan.y}) scale(${zoom}) translate(${-cx},${-cy})`}>

            {/* Zamin */}
            <rect width={W} height={H} fill="#07101e"/>

            {/* Kvartalar */}
            {BLOCKS.map((b,i)=>(
              <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h}
                fill="#081526" stroke="#0b1d30" strokeWidth="0.5"/>
            ))}

            {/* Mini binolar */}
            {BLDS.map((b,i)=>(
              <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="1.5"
                fill={b.fill||'#0c1e32'} stroke="#102035" strokeWidth="0.4"/>
            ))}

            {/* Ko'cha asosi */}
            {HY.slice(1,-1).map(y=>(
              <rect key={`hb${y}`} x={0} y={y-7} width={W} height={14} fill="#05090f"/>
            ))}
            {VX.slice(1,-1).map(x=>(
              <rect key={`vb${x}`} x={x-7} y={0} width={14} height={H} fill="#05090f"/>
            ))}

            {/* Ko'cha rangi */}
            {HY.slice(1,-1).map(y=>(
              <rect key={`hr${y}`} x={0} y={y-5} width={W} height={10} fill="#0a1828"/>
            ))}
            {VX.slice(1,-1).map(x=>(
              <rect key={`vr${x}`} x={x-5} y={0} width={10} height={H} fill="#0a1828"/>
            ))}

            {/* Lane markings */}
            {HY.slice(1,-1).map(y=>(
              <line key={`hl${y}`} x1={0} y1={y} x2={W} y2={y}
                stroke="#0f2a42" strokeWidth="0.6" strokeDasharray="14 10"/>
            ))}
            {VX.slice(1,-1).map(x=>(
              <line key={`vl${x}`} x1={x} y1={0} x2={x} y2={H}
                stroke="#0f2a42" strokeWidth="0.6" strokeDasharray="14 10"/>
            ))}

            {/* Ko'cha glow */}
            {HY.slice(1,-1).map(y=>(
              <rect key={`hg${y}`} x={0} y={y-9} width={W} height={18}
                fill="rgba(15,60,120,0.04)" filter="url(#rf)"/>
            ))}
            {VX.slice(1,-1).map(x=>(
              <rect key={`vg${x}`} x={x-9} y={0} width={18} height={H}
                fill="rgba(15,60,120,0.04)" filter="url(#rf)"/>
            ))}

            {/* Chorrahalar */}
            {HY.slice(1,-1).flatMap(y=>
              VX.slice(1,-1).map(x=>(
                <rect key={`ij${x}${y}`} x={x-5} y={y-5} width={10} height={10} fill="#0c1e30"/>
              ))
            )}
            {HY.slice(1,-1).flatMap(y=>
              VX.slice(1,-1).map(x=>(
                <circle key={`ic${x}${y}`} cx={x} cy={y} r="2.2"
                  fill="#111e2e" stroke="#1a3a58" strokeWidth="0.7"/>
              ))
            )}

            {/* Ko'cha nomlari */}
            {[
              {x:20,y:HY[1]-3,t:"Beruniy ko'chasi"},
              {x:20,y:HY[2]-3,t:"Amir Temur ko'chasi"},
              {x:20,y:HY[3]-3,t:"Mustaqillik shoh yo'li"},
              {x:20,y:HY[4]-3,t:"Navoiy ko'chasi"},
            ].map((l,i)=>(
              <text key={i} x={l.x} y={l.y} fontSize="7.5" fill="rgba(80,150,220,0.38)"
                fontFamily="Inter,sans-serif" fontWeight="500">{l.t}</text>
            ))}
            {[
              {x:VX[1]+3,y:16,t:'Chilonzor'},
              {x:VX[2]+3,y:16,t:"Mirzo Ulug'bek"},
              {x:VX[3]+3,y:16,t:'Yunusobod'},
              {x:VX[4]+3,y:16,t:'Shayxontohur'},
              {x:VX[5]+3,y:16,t:'Sergeli'},
            ].map((l,i)=>(
              <text key={i} x={l.x} y={l.y} fontSize="7" fill="rgba(80,150,220,0.32)"
                fontFamily="Inter,sans-serif"
                transform={`rotate(-90,${l.x},${l.y})`}>{l.t}</text>
            ))}

            {/* Metro */}
            {METRO.map((m,i)=>(
              <g key={i}>
                <circle cx={m.x} cy={m.y} r="8" fill="#0d0a20" stroke="#6644cc" strokeWidth="1.5"/>
                <text x={m.x} y={m.y+0.5} textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fill="#9966ff" fontWeight="800" fontFamily="Inter,sans-serif">M</text>
                <text x={m.x} y={m.y+18} textAnchor="middle"
                  fontSize="6.5" fill="rgba(120,90,200,0.45)" fontFamily="Inter,sans-serif">{m.name}</text>
              </g>
            ))}

            {/* Route trail */}
            {ROUTES.map((r,i)=>(
              <polyline key={r.id+'_tr'}
                points={getTrail(r.pts,progs[i])}
                fill="none" stroke={r.color}
                strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
                opacity="0.55"/>
            ))}

            {/* Route dashed */}
            {ROUTES.map(r=>(
              <polyline key={r.id+'_fp'}
                points={r.pts.map(p=>p.join(',')).join(' ')}
                fill="none" stroke={r.color}
                strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="5 6" opacity="0.1"/>
            ))}

            {/* Pinlar */}
            {PINS.map((p,i)=>{
              const ico={pickup:'📥',delivery:'📦',done:'✅'}[p.type]
              return(
                <g key={i} onClick={()=>setTip(tip?.id===p.id?null:p)} style={{cursor:'pointer'}}>
                  <circle cx={p.x} cy={p.y} r="13" fill={p.color+'15'} stroke={p.color} strokeWidth="1.5"/>
                  <text x={p.x} y={p.y+1} textAnchor="middle" dominantBaseline="middle" fontSize="10">{ico}</text>
                  <rect x={p.x-20} y={p.y-27} width="40" height="16" rx="5"
                    fill="rgba(4,8,18,0.94)" stroke={p.color} strokeWidth="1"/>
                  <text x={p.x} y={p.y-15} textAnchor="middle" dominantBaseline="middle"
                    fontSize="7.5" fill={p.color} fontWeight="800" fontFamily="Inter,sans-serif">{p.id}</text>
                </g>
              )
            })}

            {/* MASHINALAR */}
            {ROUTES.map((r,i)=>{
              const pos=getPosOnRoute(r.pts,progs[i])
              return(
                <g key={r.id}
                  transform={`translate(${pos.x},${pos.y})`}
                  onClick={()=>setTip(tip?.id===r.id?null:{...r,...pos,isCar:true})}
                  style={{cursor:'pointer'}}>

                  {/* Outer glow */}
                  <circle r="20" fill="none" stroke={r.color} strokeWidth="0.6" opacity="0.12"/>
                  <circle r="15" fill={r.color+'14'} stroke={r.color} strokeWidth="1.8"
                    filter={`url(#cg_${r.id})`}/>

                  {/* Mashina (angle bilan) */}
                  <g transform={`rotate(${pos.angle})`}>
                    <CarSvg color={r.color} type={r.type}/>
                    {/* Headlight beam */}
                    <HeadlightBeam color={r.color}/>
                  </g>

                  {/* Online dot */}
                  <circle cx="14" cy="-14" r="4" fill="#4ADE80" stroke="#04080e" strokeWidth="1.5"/>

                  {/* Label */}
                  <g transform="translate(0,32)">
                    <rect x="-34" y="-9" width="68" height="17" rx="5.5"
                      fill="rgba(4,8,20,0.95)" stroke={r.color} strokeWidth="1.2"/>
                    <text textAnchor="middle" y="3.5" fontSize="8" fill={r.color}
                      fontWeight="800" fontFamily="Inter,sans-serif">
                      {r.name} · {r.order}
                    </text>
                  </g>
                </g>
              )
            })}

            {/* Tooltip */}
            {tip&&(()=>{
              const tx=Math.min(Math.max((tip.x||0),10),W-185)
              const ty=Math.max((tip.y||0)-85,10)
              return(
                <g transform={`translate(${tx},${ty})`}>
                  <rect x="-5" y="-5" width="180" height={tip.isCar?82:62} rx="10"
                    fill="rgba(4,8,20,0.97)" stroke={tip.color||'#00FFB3'} strokeWidth="1.3"/>
                  {tip.isCar?(<>
                    <text x="12" y="17" fontSize="12" fill={tip.color} fontWeight="800" fontFamily="Inter,sans-serif">{tip.name}</text>
                    <text x="12" y="33" fontSize="9"  fill="#666" fontFamily="Inter,sans-serif">{tip.order} · {tip.customer}</text>
                    <text x="12" y="49" fontSize="9"  fill="#4ADE80" fontFamily="Inter,sans-serif">{tip.status}</text>
                    <text x="12" y="65" fontSize="8"  fill="#444" fontFamily="Inter,sans-serif">Tezlik: ~{22+Math.floor(progs[ROUTES.findIndex(r=>r.id===tip.id)]*18)} km/h</text>
                  </>):(<>
                    <text x="12" y="17" fontSize="12" fill={tip.color} fontWeight="800" fontFamily="Inter,sans-serif">{tip.id}</text>
                    <text x="12" y="33" fontSize="9"  fill="#666" fontFamily="Inter,sans-serif">{{pickup:'Olib kelish',delivery:'Yetkazish',done:'Tayyor'}[tip.type]}</text>
                    <text x="12" y="49" fontSize="8"  fill="#444" fontFamily="Inter,sans-serif">Chilonzor tumani</text>
                  </>)}
                  <text x="165" y="14" fontSize="15" fill="#333" fontFamily="sans-serif"
                    style={{cursor:'pointer'}} onClick={()=>setTip(null)}>×</text>
                </g>
              )
            })()}

          </g>
        </g>

        {/* Compass */}
        <g transform={`translate(${W-28},34)`}>
          <circle r="20" fill="rgba(4,8,20,0.88)" stroke="rgba(0,255,179,0.18)" strokeWidth="1"/>
          {[['N',0,-13,'#00FFB3',9],['S',0,15,'#555',7.5],['E',13,2,'#555',7.5],['W',-13,2,'#555',7.5]].map(([l,dx,dy,c,fs])=>(
            <text key={l} x={dx} y={dy} textAnchor="middle" dominantBaseline="middle"
              fontSize={fs} fill={c} fontWeight={l==='N'?'800':'400'} fontFamily="Inter,sans-serif">{l}</text>
          ))}
          <polygon points="0,-14 -2.5,-5 2.5,-5" fill="#00FFB3" opacity="0.9"/>
          <polygon points="0,14 -2.5,5 2.5,5" fill="#333"/>
        </g>

        {/* Scale */}
        <g transform="translate(16,522)">
          <rect width="100" height="5" rx="2" fill="#0f2030"/>
          <rect width="50"  height="5" rx="2" fill="#38BDF8" opacity="0.7"/>
          {[['0',0],['500m',44],['1km',90]].map(([l,x])=>(
            <text key={l} x={x} y="14" fontSize="7.5" fill="#3a5a70" fontFamily="Inter,sans-serif">{l}</text>
          ))}
        </g>
        <text x="10" y={H-4} fontSize="7" fill="rgba(255,255,255,0.06)" fontFamily="Inter,sans-serif">© Tartib CRM</text>
      </svg>

      <div style={{position:'absolute',bottom:0,left:0,right:0,height:36,
        background:'linear-gradient(transparent,rgba(4,8,18,0.5))',pointerEvents:'none'}}/>
    </div>
  )
}

export default function MapSection(){
  const [ref,inView]=useInView({triggerOnce:true,threshold:0.05})

  return(
    <section id="map" style={{padding:'80px 5%',background:'#050508',
      borderTop:'1px solid rgba(0,255,179,0.06)',position:'relative',zIndex:2}}>
      <div style={{position:'absolute',top:'40%',left:'35%',width:500,height:400,
        background:'radial-gradient(ellipse,rgba(0,255,179,0.02) 0%,transparent 70%)',
        filter:'blur(60px)',pointerEvents:'none'}}/>

      <div ref={ref} style={{maxWidth:1200,margin:'0 auto'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:36}}>
          <motion.div initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
            style={{display:'inline-flex',alignItems:'center',gap:8,padding:'5px 16px',
              borderRadius:99,background:'rgba(0,255,179,0.06)',border:'1px solid rgba(0,255,179,0.18)',
              fontSize:11,fontWeight:600,color:'#00FFB3',marginBottom:16,letterSpacing:2,textTransform:'uppercase'}}>
            <span style={{width:7,height:7,borderRadius:'50%',background:'#00FFB3',
              boxShadow:'0 0 6px #00FFB3',display:'inline-block',animation:'lb 2s infinite'}}/>
            Real vaqtli kuzatuv
          </motion.div>
          <motion.h2 initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1}}
            style={{fontSize:'clamp(24px,4vw,48px)',fontWeight:900,letterSpacing:'-1.5px',marginBottom:12,lineHeight:1.1}}>
            Shafyorlar Toshkent ko'chalari<br/>
            <span style={{background:'linear-gradient(135deg,#00FFB3,#38BDF8)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              bo'ylab harakatlanadi
            </span>
          </motion.h2>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.2}}
            style={{fontSize:15,color:'#555',maxWidth:460,margin:'0 auto',lineHeight:1.7}}>
            Har bir mashina faqat ko'cha bo'ylab — admin panelda real nazorat
          </motion.p>
        </div>

        {/* Layout */}
        <motion.div initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:0.8,delay:0.3}}
          className="map-layout4">

          <ToshkentMap/>

          {/* Side panel */}
          <div style={{display:'flex',flexDirection:'column',gap:10}}>

            <div style={{background:'rgba(7,11,22,0.96)',border:'1px solid rgba(0,255,179,0.07)',borderRadius:14,padding:16}}>
              <div style={{fontSize:9,fontWeight:800,color:'#00FFB3',textTransform:'uppercase',letterSpacing:2,marginBottom:14}}>Live holat</div>
              {[
                {icon:'🚗',label:'Online shafyorlar',val:ROUTES.length,color:'#4ADE80'},
                {icon:'📥',label:'Olib kelish',      val:3,            color:'#00FFB3'},
                {icon:'📦',label:'Yetkazilmoqda',    val:2,            color:'#FF6B35'},
                {icon:'✅',label:'Bugun tugallandi', val:12,           color:'#A78BFA'},
              ].map((s,i)=>(
                <motion.div key={s.label}
                  animate={{opacity:[1,0.65,1]}}
                  transition={{duration:3+i*0.8,repeat:Infinity,delay:i*0.7}}
                  style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10,fontSize:12}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,color:'#555'}}>
                    <span style={{fontSize:14}}>{s.icon}</span>{s.label}
                  </div>
                  <span style={{fontWeight:800,color:s.color,fontSize:16}}>{s.val}</span>
                </motion.div>
              ))}
            </div>

            <div style={{background:'rgba(7,11,22,0.96)',border:'1px solid rgba(0,255,179,0.07)',borderRadius:14,padding:16}}>
              <div style={{fontSize:9,fontWeight:800,color:'#00FFB3',textTransform:'uppercase',letterSpacing:2,marginBottom:14}}>Faol shafyorlar</div>
              {ROUTES.map((r,idx)=>(
                <motion.div key={r.id} whileHover={{x:3}}
                  style={{display:'flex',alignItems:'center',gap:10,marginBottom:10,
                    padding:'8px 10px',borderRadius:10,border:`1px solid ${r.color}15`,background:`${r.color}06`}}>
                  <div style={{width:36,height:36,borderRadius:'50%',background:`${r.color}15`,
                    border:`2px solid ${r.color}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>
                    {['🚚','🚛','🚕','🚐'][idx]}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:'#e2e8f0'}}>{r.name}</div>
                    <div style={{fontSize:10,color:'#555'}}>{r.order} · {r.customer}</div>
                    <div style={{fontSize:10,color:r.color,marginTop:1}}>{r.status}</div>
                  </div>
                  <motion.div
                    animate={{opacity:[1,0.15,1],scale:[1,1.5,1]}}
                    transition={{duration:2,repeat:Infinity,delay:idx*0.5}}
                    style={{width:8,height:8,borderRadius:'50%',background:'#4ADE80',flexShrink:0}}/>
                </motion.div>
              ))}
            </div>

            <div style={{background:'rgba(7,11,22,0.96)',border:'1px solid rgba(0,255,179,0.07)',borderRadius:14,padding:16}}>
              <div style={{fontSize:9,fontWeight:800,color:'#00FFB3',textTransform:'uppercase',letterSpacing:2,marginBottom:12}}>Statistika</div>
              {[
                {label:"Kunlik yetkazma",value:"1,293",color:"#00FFB3"},
                {label:"O'rtacha vaqt",  value:"2.4 soat",color:"#38BDF8"},
                {label:"Muvaffaqiyat",   value:"99.1%",   color:"#4ADE80"},
                {label:"Umumiy masofa",  value:"348 km",  color:"#A78BFA"},
              ].map(s=>(
                <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <span style={{fontSize:11,color:'#444'}}>{s.label}</span>
                  <span style={{fontSize:13,fontWeight:800,color:s.color,fontFamily:'monospace'}}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .map-layout4{display:grid;grid-template-columns:1fr 268px;gap:16px;align-items:start}
        @media(max-width:900px){.map-layout4{grid-template-columns:1fr!important}}
        @keyframes lb{0%,100%{box-shadow:0 0 5px #4ADE80}50%{box-shadow:0 0 14px #4ADE80}}
      `}</style>
    </section>
  )
}
