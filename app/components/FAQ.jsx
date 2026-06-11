'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const FAQS = [
  { q:"Tartib CRM faqat gilam yuvish uchunmi?", a:"Asosan ha — tizim gilam yuvish, himchishtka va uyga xizmat ko'rsatish sehxlari uchun maxsus ishlab chiqilgan. Yetkazib berish, ishchilar maoshi, kv.m bo'yicha hisob — hammasi shu soha uchun." },
  { q:"Internet bo'lmasa ham ishlaydimi?", a:"Ha! Offline rejim mavjud. Internet uzilsa ham barcha operatsiyalar lokal saqlanadi. Aloqa tiklanishi bilan avtomatik sync bo'ladi." },
  { q:"Telegram bot bilan integratsiya qanday ishlaydi?", a:"Shafyorlar buyurtma qabul qiladi, mijozlar holat haqida xabar oladi — barchasi bot orqali avtomatik. Alohida sozlash kerak emas." },
  { q:"Nechta foydalanuvchi qo'shish mumkin?", a:"Cheklov yo'q. Admin, menejer, shafyor, ishchi — har biriga alohida rol va ruxsat darajasi beriladi." },
  { q:"Ma'lumotlar xavfsizligi qanday ta'minlanadi?", a:"JWT autentifikatsiya, 256-bit shifrlash, har harakat log qilinadi. Serverlarda kunlik backup. ISO 27001 standartiga muvofiq." },
  { q:"O'rnatish va sozlash qancha vaqt oladi?", a:"O'rtacha 1 soat. Bizning mutaxassislar sizga qo'ng'iroq qilib, onlayn sozlab berishadi. Birinchi 14 kun bepul." },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.1 })

  return (
    <section id="faq" style={{padding:'96px 5%',background:'#050508',borderTop:'1px solid rgba(0,255,179,0.06)',position:'relative',zIndex:2}}>
      <div ref={ref} style={{maxWidth:760,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:52}}>
          <motion.div initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
            style={{display:'inline-flex',alignItems:'center',gap:6,padding:'4px 14px',borderRadius:99,background:'rgba(0,255,179,0.06)',border:'1px solid rgba(0,255,179,0.18)',fontSize:11,fontWeight:600,color:'#00FFB3',marginBottom:16,letterSpacing:2,textTransform:'uppercase'}}>
            △ Savollar
          </motion.div>
          <motion.h2 initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1}}
            style={{fontSize:'clamp(26px,4vw,44px)',fontWeight:900,letterSpacing:'-1.5px',lineHeight:1.1}}>
            Ko'p so'raladigan<br/>
            <span style={{background:'linear-gradient(135deg,#00FFB3,#A78BFA)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>savollar</span>
          </motion.h2>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {FAQS.map((faq,i)=>(
            <motion.div key={i} initial={{opacity:0,y:14}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.05*i}}
              style={{background:'rgba(8,12,24,0.98)',border:`1px solid ${open===i?'rgba(0,255,179,0.25)':'rgba(255,255,255,0.04)'}`,borderRadius:12,overflow:'hidden',transition:'border-color 0.3s'}}>
              <button onClick={()=>setOpen(open===i?null:i)}
                style={{width:'100%',padding:'18px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'none',border:'none',cursor:'pointer',textAlign:'left',gap:12}}>
                <span style={{fontSize:14,fontWeight:600,color:open===i?'#f1f5f9':'#888',lineHeight:1.4,fontFamily:'inherit'}}>{faq.q}</span>
                <span style={{color:open===i?'#00FFB3':'#333',fontSize:20,flexShrink:0,transition:'transform 0.3s',transform:open===i?'rotate(45deg)':'rotate(0deg)',fontWeight:300}}>+</span>
              </button>
              <AnimatePresence>
                {open===i && (
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.28}}>
                    <div style={{padding:'0 20px 18px',fontSize:14,color:'#555',lineHeight:1.75,borderTop:'1px solid rgba(0,255,179,0.06)'}}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.4}}
          style={{textAlign:'center',marginTop:48,padding:28,background:'rgba(0,255,179,0.03)',border:'1px solid rgba(0,255,179,0.1)',borderRadius:16}}>
          <div style={{fontSize:16,fontWeight:700,marginBottom:8}}>Boshqa savollaringiz bormi?</div>
          <p style={{fontSize:14,color:'#555',marginBottom:20}}>Mutaxassislarimiz 7/24 javob berishga tayyor</p>
          <a href="#demo" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 28px',background:'linear-gradient(135deg,#00FFB3,#00cc8e)',color:'#000',borderRadius:10,fontSize:14,fontWeight:700,textDecoration:'none'}}>
            ✈️ Telegram orqali so'rash
          </a>
        </motion.div>
      </div>
    </section>
  )
}
