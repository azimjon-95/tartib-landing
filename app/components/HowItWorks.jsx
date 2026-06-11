'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const STEPS = [
  {
    num: '01', emoji: '📥', title: 'Buyurtma qabul qilish',
    text: "Dispecher buyurtmani tizimga kiritadi. Shafyorga Telegram orqali avtomatik xabar ketadi. Mijozga tasdiq SMS yuboriladi.",
    color: '#3B82F6', glow: 'rgba(59,130,246,0.5)',
    detail: ['Dispecher → tizim', 'Shafyor TG xabari', 'Mijoz SMS tasdiq'],
  },
  {
    num: '02', emoji: '🚗', title: 'Olib kelish',
    text: "Shafyor GPS bilan kuzatiladi. Ko'chalar bo'ylab real vaqt xaritasida ko'rinadi. Gilam qabul bo'lganda bot orqali tasdiqlanadi.",
    color: '#06B6D4', glow: 'rgba(6,182,212,0.5)',
    detail: ['GPS kuzatuv', 'Real vaqt xarita', 'Bot tasdiq'],
  },
  {
    num: '03', emoji: '🫧', title: 'Yuvish & Quritish',
    text: "Ishchi biriktiriladi. Razmerlar (kv.m) kiritiladi. Ish haqi avtomatik hisob-kitob qilinadi. Balans yoziladi.",
    color: '#10B981', glow: 'rgba(16,185,129,0.5)',
    detail: ['Ishchi biriktirish', 'Kv.m kiritish', 'Maosh hisob'],
  },
  {
    num: '04', emoji: '✨', title: 'Bezak',
    text: "Gilam bezatiladi. Bezak tugagandan so'ng yetkazib berish topshirig'i AVTOMATIK yaratiladi va shafyorga topshiriladi.",
    color: '#F59E0B', glow: 'rgba(245,158,11,0.5)',
    detail: ['Gilam bezak', 'Avtomatik topshiriq', 'Shafyor tayinlash'],
  },
  {
    num: '05', emoji: '🚚', title: "Yetkazish & To'lov",
    text: "Shafyor yetkazadi, mijozdan pul oladi. Moliya bo'limiga avtomatik kirim yoziladi. Hisobot tayyor.",
    color: '#8B5CF6', glow: 'rgba(139,92,246,0.5)',
    detail: ['Yetkazib berish', 'Pul olish', 'Moliya kirim'],
  },
]

/* ── Single step row (mobile timeline style) ── */
function StepRow({ step, i, isActive, onClick }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const isLast = i === STEPS.length - 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      style={{ display: 'flex', gap: 0, cursor: 'pointer', position: 'relative' }}
    >
      {/* Left: number + connector line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 56, flexShrink: 0 }}>
        {/* Number badge */}
        <motion.div
          animate={isActive ? { scale: [1, 1.08, 1], boxShadow: [`0 0 0px ${step.color}`, `0 0 18px ${step.glow}`, `0 0 0px ${step.color}`] } : {}}
          transition={{ duration: 1.6, repeat: isActive ? Infinity : 0 }}
          style={{
            width: 44, height: 44, borderRadius: 13, flexShrink: 0,
            background: isActive
              ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)`
              : `linear-gradient(135deg, ${step.color}22, ${step.color}11)`,
            border: `1.5px solid ${isActive ? step.color : step.color + '40'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, transition: 'all 0.3s',
            position: 'relative', overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {/* shine */}
          <div style={{ position: 'absolute', top: -8, left: -8, width: 24, height: 56, background: 'rgba(255,255,255,0.18)', transform: 'rotate(25deg)', borderRadius: 3 }} />
          <span style={{ position: 'relative', zIndex: 1 }}>{step.emoji}</span>
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <div style={{ width: 2, flex: 1, minHeight: 24, marginTop: 4,
            background: `linear-gradient(to bottom, ${step.color}60, ${STEPS[i+1].color}30)`,
            borderRadius: 99,
          }} />
        )}
      </div>

      {/* Right: content card */}
      <motion.div
        animate={{
          background: isActive
            ? `linear-gradient(135deg, ${step.color}10, rgba(0,0,0,0.3))`
            : 'rgba(255,255,255,0.02)',
          borderColor: isActive ? step.color + '50' : 'rgba(255,255,255,0.06)',
        }}
        style={{
          flex: 1, borderRadius: 16, padding: '14px 16px',
          border: '1px solid rgba(255,255,255,0.06)',
          marginBottom: isLast ? 0 : 12, marginLeft: 12,
          position: 'relative', overflow: 'hidden',
          transition: 'border-color 0.3s, background 0.3s',
        }}
      >
        {/* Active glow top line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
          opacity: isActive ? 1 : 0, transition: 'opacity 0.3s',
          borderRadius: '16px 16px 0 0',
        }} />

        {/* Step num label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{
            fontSize: 9, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase',
            color: step.color, opacity: 0.9,
          }}>
            Qadam {step.num}
          </span>
          {isActive && (
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: step.color }}
            />
          )}
        </div>

        <h3 style={{
          fontSize: 15, fontWeight: 800, marginBottom: 7,
          color: isActive ? '#fff' : '#cbd5e1',
          letterSpacing: '-0.3px', lineHeight: 1.3,
        }}>
          {step.title}
        </h3>

        <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65, marginBottom: 10 }}>
          {step.text}
        </p>

        {/* Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {step.detail.map((d) => (
            <span key={d} style={{
              fontSize: 10, fontWeight: 700,
              padding: '3px 9px', borderRadius: 99,
              background: `${step.color}12`,
              border: `1px solid ${step.color}30`,
              color: step.color, letterSpacing: 0.3,
            }}>
              {d}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Desktop 3D card (unchanged) ── */
function StepCard3D({ step, i, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setTilt({ x: ((e.clientY - cy) / (rect.height / 2)) * -8, y: ((e.clientX - cx) / (rect.width / 2)) * 8 })
  }

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div ref={cardRef} onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.03 : isActive ? 1.015 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{
          transformStyle: 'preserve-3d', cursor: 'pointer', position: 'relative',
          borderRadius: 20, padding: '22px 20px',
          background: isActive || hovered
            ? `linear-gradient(135deg, ${step.color}12, rgba(0,0,0,0.45))`
            : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isActive || hovered ? step.color + '55' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: isActive || hovered
            ? `0 16px 48px ${step.glow.replace('0.5', '0.2')}, inset 0 1px 0 rgba(255,255,255,0.07)`
            : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${step.color}80, transparent)`,
          opacity: isActive || hovered ? 1 : 0, transition: 'opacity 0.3s' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, position: 'relative' }}>
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <motion.div
              animate={isActive || hovered ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.6 }}
              style={{
                width: 48, height: 48, borderRadius: 13,
                background: `linear-gradient(135deg, ${step.color}, ${step.color}99)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#000', fontWeight: 900, fontSize: 12, letterSpacing: 1,
                boxShadow: `0 6px 18px ${step.glow.replace('0.5', '0.35')}, inset 0 1px 0 rgba(255,255,255,0.3)`,
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: -8, left: -8, width: 26, height: 60, background: 'rgba(255,255,255,0.2)', transform: 'rotate(25deg)', borderRadius: 3 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>{step.num}</span>
            </motion.div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${step.color}12`, border: `1px solid ${step.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              {step.emoji}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 7, color: isActive || hovered ? '#fff' : '#e2e8f0', letterSpacing: '-0.3px' }}>
              {step.title}
            </h3>
            <p style={{ fontSize: 12, color: '#556', lineHeight: 1.65, marginBottom: 10 }}>{step.text}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {step.detail.map(d => (
                <span key={d} style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: `${step.color}12`, border: `1px solid ${step.color}30`, color: step.color }}>
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <motion.div animate={{ scaleX: isActive ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, ${step.color}, ${step.color}55)`,
            transformOrigin: 'left', borderRadius: '0 0 20px 20px' }} />
      </motion.div>
    </motion.div>
  )
}

/* ── Desktop flow tube ── */
function FlowTube({ activeStep }) {
  const step = STEPS[activeStep]
  return (
    <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <div style={{ position: 'relative', width: 80, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.04)', borderRadius: 99 }} />
        {[0, 1, 2].map(j => (
          <motion.div key={j}
            animate={{ y: ['-10px', '500px'], opacity: [0, 0.8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: j * 0.75 }}
            style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 3, height: 50, borderRadius: 99, background: `linear-gradient(to bottom, transparent, ${step.color}, transparent)` }}
          />
        ))}
        {STEPS.map((s, i) => {
          const isActive = i === activeStep
          const isPast = i < activeStep
          return (
            <div key={i} style={{ position: 'absolute', left: '50%', top: `${(i / (STEPS.length - 1)) * 91}%`, transform: 'translate(-50%, -50%)', zIndex: isActive ? 10 : 5 }}>
              <motion.div
                animate={{ scale: isActive ? [1, 1.2, 1] : 1, boxShadow: isActive ? [`0 0 0px ${s.color}`, `0 0 20px ${s.glow}`, `0 0 0px ${s.color}`] : 'none' }}
                transition={{ duration: 1.8, repeat: isActive ? Infinity : 0 }}
                style={{
                  width: isActive ? 20 : 13, height: isActive ? 20 : 13, borderRadius: '50%',
                  background: isPast || isActive ? `linear-gradient(135deg, ${s.color}, ${s.color}bb)` : '#1e293b',
                  border: `2px solid ${isPast || isActive ? s.color : '#334155'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.4s',
                }}>
                {isPast && <span style={{ fontSize: 6, color: '#000', fontWeight: 900 }}>✓</span>}
                {isActive && <motion.div animate={{ scale: [1, 2.8], opacity: [0.5, 0] }} transition={{ duration: 1.1, repeat: Infinity }} style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `1.5px solid ${s.color}` }} />}
              </motion.div>
            </div>
          )
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={activeStep}
          initial={{ opacity: 0, y: 12, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.94 }}
          transition={{ duration: 0.35 }}
          style={{ width: 156, padding: '12px 14px', borderRadius: 14, background: 'rgba(5,5,8,0.92)', border: `1px solid ${step.color}40`, boxShadow: `0 8px 28px ${step.glow.replace('0.5', '0.18')}`, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 5 }}>{step.emoji}</div>
          <div style={{ fontSize: 9, fontWeight: 800, color: step.color, letterSpacing: 1, textTransform: 'uppercase' }}>{step.num} / 05</div>
          <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 3, lineHeight: 1.4 }}>{step.title}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveStep(p => (p + 1) % STEPS.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="howitworks" aria-label="Qanday ishlaydi" style={{
      padding: isMobile ? '64px 16px 72px' : '96px 5% 112px',
      background: 'linear-gradient(180deg, #050508 0%, #070b14 40%, #050508 100%)',
      borderTop: '1px solid rgba(59,130,246,0.08)',
      borderBottom: '1px solid rgba(59,130,246,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* bg decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.04), transparent)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%)' }} />

      <div style={{ maxWidth: isMobile ? '100%' : 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div ref={headerRef} style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
          <motion.div initial={{ opacity: 0, y: -16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 99, marginBottom: 16, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)', fontSize: 11, fontWeight: 700, color: '#3B82F6', letterSpacing: 2, textTransform: 'uppercase' }}>
            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>🔄</motion.span>
            Qanday ishlaydi
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontSize: isMobile ? 26 : 'clamp(28px,4.5vw,50px)', fontWeight: 900, letterSpacing: '-1.2px', lineHeight: 1.1, marginBottom: 12 }}>
            Gilam yuvish buyurtmasi{' '}
            <span style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              5 bosqichda
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            style={{ fontSize: isMobile ? 13 : 15, color: '#475569', maxWidth: 440, margin: '0 auto', lineHeight: 1.65 }}>
            Qabul qilishdan tortib yetkazib berishgacha — har bir qadam avtomatlashtirilgan
          </motion.p>
        </motion.div>

        {/* ── MOBILE: vertical timeline ── */}
        {isMobile && (
          <div>
            {STEPS.map((s, i) => (
              <StepRow key={s.num} step={s} i={i} isActive={activeStep === i} onClick={() => setActiveStep(i)} />
            ))}

            {/* Progress dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
              {STEPS.map((s, i) => (
                <motion.div key={i} onClick={() => setActiveStep(i)}
                  animate={{ width: i === activeStep ? 24 : 8, background: i === activeStep ? s.color : '#1e293b' }}
                  transition={{ duration: 0.3 }}
                  style={{ height: 8, borderRadius: 99, cursor: 'pointer', border: `1px solid ${i === activeStep ? s.color : '#334155'}` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── DESKTOP: 3-column grid ── */}
        {!isMobile && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: '0 28px', alignItems: 'start' }}>
            {/* Left: steps 1-3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {STEPS.slice(0, 3).map((s, i) => (
                <StepCard3D key={s.num} step={s} i={i} isActive={activeStep === i} onClick={() => setActiveStep(i)} />
              ))}
            </div>
            {/* Center tube */}
            <FlowTube activeStep={activeStep} />
            {/* Right: steps 4-5 + progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ height: 120 }} />
              {STEPS.slice(3).map((s, i) => (
                <StepCard3D key={s.num} step={s} i={i + 3} isActive={activeStep === i + 3} onClick={() => setActiveStep(i + 3)} />
              ))}
              {/* Progress bar */}
              <div style={{ marginTop: 8, padding: '14px 18px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 9, color: '#475569', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Jarayon holati</div>
                <div style={{ display: 'flex', gap: 5 }}>
                  {STEPS.map((s, i) => (
                    <motion.div key={i} onClick={() => setActiveStep(i)}
                      whileHover={{ scaleY: 1.15 }}
                      animate={{ background: i === activeStep ? `linear-gradient(to top, ${s.color}, ${s.color}aa)` : i < activeStep ? `${s.color}50` : 'rgba(255,255,255,0.05)' }}
                      style={{ flex: 1, height: 28, borderRadius: 5, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
                  <span style={{ fontSize: 9, color: '#334155' }}>Yangi</span>
                  <span style={{ fontSize: 9, color: STEPS[activeStep].color, fontWeight: 700 }}>{STEPS[activeStep].title}</span>
                  <span style={{ fontSize: 9, color: '#334155' }}>Tayyor</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
