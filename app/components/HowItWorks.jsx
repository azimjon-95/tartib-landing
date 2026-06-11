'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const STEPS = [
  { emoji:'📥', title:'Buyurtma qabul qilish', color:'#3B82F6',
    text:'Dispecher kiritadi → Shafyorga TG avtomatik. Mijozga tasdiq SMS yuboriladi.' },
  { emoji:'🚗', title:'Olib kelish',           color:'#06B6D4',
    text:'Shafyor GPS bilan kuzatiladi. Gilam qabul bo\'lganda bot orqali tasdiqlanadi.' },
  { emoji:'🫧', title:'Yuvish & Quritish',     color:'#22c55e',
    text:'Ishchi biriktiriladi. Razmerlar kiritiladi. Balans avtomatik yoziladi.' },
  { emoji:'✨', title:'Bezak',                 color:'#f97316',
    text:'Bezak tugaganda yetkazib berish topshirig\'i AVTOMATIK yaratiladi.' },
  { emoji:'🚚', title:'Yetkazish & To\'lov',   color:'#8b5cf6',
    text:'Shafyor yetkazadi, pul oladi. Moliya bo\'limiga avtomatik kirim yoziladi.' },
]

function StepItem({ step, i }) {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.2 })
  return (
    <motion.div ref={ref}
      initial={{opacity:0,x:-36}}
      animate={inView?{opacity:1,x:0}:{}}
      transition={{duration:.6,delay:i*.07,ease:[.16,1,.3,1]}}
      style={{display:'flex',gap:22,paddingBottom:32,position:'relative'}}>
      <motion.div whileHover={{scale:1.12}}
        style={{width:52,height:52,borderRadius:'50%',flexShrink:0,
          background:`linear-gradient(135deg,${step.color},${step.color}bb)`,
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:20,boxShadow:`0 0 20px ${step.color}45`,position:'relative',zIndex:1}}>
        {step.emoji}
      </motion.div>
      <div style={{paddingTop:7}}>
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:5,color:'#f1f5f9'}}>{step.title}</h3>
        <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.65}}>{step.text}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.1 })
  return (
    <section id="howitworks" aria-label="Qanday ishlaydi"
      style={{background:'#0b1a3e',borderTop:'1px solid rgba(59,130,246,.12)',
        borderBottom:'1px solid rgba(59,130,246,.12)',padding:'88px 5%'}}>
      <div style={{maxWidth:780,margin:'0 auto'}}>
        <motion.header ref={ref} style={{textAlign:'center',marginBottom:52}}>
          <motion.div initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
            style={{display:'inline-flex',alignItems:'center',gap:6,padding:'4px 13px',
              borderRadius:99,background:'rgba(59,130,246,.1)',border:'1px solid rgba(59,130,246,.2)',
              fontSize:12,fontWeight:600,color:'#3B82F6',marginBottom:14}}>
            🔄 Qanday ishlaydi
          </motion.div>
          <motion.h2 initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
            transition={{delay:.1}}
            style={{fontSize:'clamp(24px,4vw,42px)',fontWeight:900,letterSpacing:'-.8px',marginBottom:12}}>
            Gilam yuvish buyurtmasi{' '}
            <span style={{background:'linear-gradient(135deg,#3B82F6,#06B6D4)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              5 bosqichda
            </span>
          </motion.h2>
        </motion.header>
        <div style={{position:'relative'}}>
          <motion.div initial={{scaleY:0}} animate={inView?{scaleY:1}:{}}
            transition={{duration:1.1,delay:.35,ease:[.16,1,.3,1]}}
            style={{position:'absolute',left:26,top:0,bottom:0,width:2,
              background:'linear-gradient(to bottom,#3B82F6,#06B6D4)',
              transformOrigin:'top center',opacity:.35}}/>
          {STEPS.map((s,i)=><StepItem key={s.title} step={s} i={i}/>)}
        </div>
      </div>
    </section>
  )
}
