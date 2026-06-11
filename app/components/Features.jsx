'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const FEATS = [
  { icon:'◈', title:'Buyurtmalar boshqaruvi', text:"7 bosqichli Kanban. Gilam qabul qilinishidan topshirilishigacha real vaqtda kuzatiladi.", color:'#00FFB3', delay:0 },
  { icon:'◎', title:'Transport & GPS xarita',  text:"Shafyorlar Toshkent ko'chalari bo'ylab real vaqtda harakatlanadi. Buyurtmalar kartada.", color:'#38BDF8', delay:0.06 },
  { icon:'⬟', title:'Ishchilar va maosh',      text:"Kv.m bo'yicha avtomatik hisoblash. Avans, oylik, jarima, bonus — to'liq nazorat.", color:'#A78BFA', delay:0.12 },
  { icon:'⬡', title:'Moliya nazorati',         text:"Kirim, chiqim, foyda. Oylik PDF va Excel hisobotlar. Qarzdor mijozlar ro'yxati.", color:'#FB923C', delay:0.18 },
  { icon:'△', title:'Telegram Bot',            text:"Shafyorga buyurtma, mijozga holat — avtomatik xabar. Davomat bot orqali.", color:'#4ADE80', delay:0.24 },
  { icon:'◇', title:'Offline rejim',           text:"Internet uzilsa ham ishlaydi. Aloqa tiklananda barcha ma'lumotlar sync bo'ladi.", color:'#F472B6', delay:0.30 },
  { icon:'▽', title:'Uyga borib xizmat',       text:"Mijoz manziliga borib xizmat. Ishchilar % taqsimoti avtomatik hisoblanadi.", color:'#38BDF8', delay:0.36 },
  { icon:'◉', title:'Xavfsizlik',              text:"JWT, RBAC, brute force himoya. Har harakat log qilinadi. 256-bit shifrlash.", color:'#4ADE80', delay:0.42 },
  { icon:'⊕', title:'Yuqori tezlik',           text:"Redis cache. 1000+ foydalanuvchi bir vaqtda — sekinlamasdan ishlaydi.", color:'#00FFB3', delay:0.48 },
]

function Card({ feat }) {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.1 })
  return (
    <motion.article ref={ref}
      initial={{opacity:0,y:24}}
      animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:0.6,delay:feat.delay,ease:[.16,1,.3,1]}}
      whileHover={{y:-4,borderColor:`${feat.color}55`,boxShadow:`0 12px 36px ${feat.color}10`}}
      whileTap={{scale:0.98}}
      style={{
        background:'rgba(255,255,255,0.01)',border:'1px solid #1a1a2e',
        borderRadius:16,padding:'20px 18px',cursor:'default',
        transition:'border-color 0.3s,box-shadow 0.3s',
      }}>
      <motion.div whileHover={{scale:1.1,rotate:6}}
        style={{width:44,height:44,borderRadius:12,marginBottom:14,background:`${feat.color}10`,color:feat.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,border:`1px solid ${feat.color}18`}}>
        {feat.icon}
      </motion.div>
      <h3 style={{fontSize:14,fontWeight:700,marginBottom:7,color:'#f1f5f9'}}>{feat.title}</h3>
      <p style={{fontSize:13,color:'#555',lineHeight:1.7}}>{feat.text}</p>
      <div style={{marginTop:14,fontSize:12,color:feat.color,display:'flex',alignItems:'center',gap:4}}>Ko'proq <span>→</span></div>
    </motion.article>
  )
}

export default function Features() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.1 })
  return (
    <section id="features" aria-labelledby="features-heading" style={{padding:'80px 16px',position:'relative',zIndex:2}}>
      <div style={{position:'absolute',top:'30%',left:'50%',transform:'translate(-50%,-50%)',width:600,height:400,background:'radial-gradient(ellipse,rgba(0,255,179,0.03) 0%,transparent 70%)',pointerEvents:'none',filter:'blur(40px)'}}/>
      <div style={{maxWidth:1100,margin:'0 auto',position:'relative'}}>
        <motion.header ref={ref} style={{textAlign:'center',marginBottom:48}}>
          <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}}
            style={{display:'inline-flex',alignItems:'center',gap:6,padding:'4px 14px',borderRadius:99,background:'rgba(0,255,179,0.06)',border:'1px solid rgba(0,255,179,0.18)',fontSize:11,fontWeight:600,color:'#00FFB3',marginBottom:14,letterSpacing:2,textTransform:'uppercase'}}>
            ✦ Imkoniyatlar
          </motion.div>
          <motion.h2 id="features-heading" initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1}}
            style={{fontSize:'clamp(22px,4vw,44px)',fontWeight:900,marginBottom:12,letterSpacing:'-1.5px',lineHeight:1.1}}>
            Gilam yuvish biznesiga kerak<br/>
            <span style={{background:'linear-gradient(135deg,#00FFB3,#A78BFA)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              hamma narsa bir tizimda
            </span>
          </motion.h2>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.2}}
            style={{fontSize:15,color:'#555',maxWidth:440,margin:'0 auto',lineHeight:1.7}}>
            Himchishtka va gilam yuvish sehxlari uchun maxsus ishlab chiqilgan professional CRM/ERP
          </motion.p>
        </motion.header>
        <div className="features-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:14}}>
          {FEATS.map(f => <Card key={f.title} feat={f}/>)}
        </div>
      </div>
    </section>
  )
}
