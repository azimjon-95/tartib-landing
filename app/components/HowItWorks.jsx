'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const STEPS = [
  {
    num: '01', emoji: '📥', title: 'Buyurtma qabul qilish',
    text: "Dispecher buyurtmani tizimga kiritadi. Shafyorga Telegram orqali avtomatik xabar ketadi. Mijozga tasdiq SMS yuboriladi.",
    color: '#3B82F6', glow: 'rgba(59,130,246,0.6)',
    detail: ['Dispecher → tizim', 'Shafyor TG xabari', 'Mijoz SMS tasdiq'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M3 10h22" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9 15h10M9 19h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="21" cy="8" r="3.5" fill="#3B82F6"/>
        <path d="M20 8l.8.8 1.4-1.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    num: '02', emoji: '🚗', title: 'Olib kelish',
    text: "Shafyor GPS bilan kuzatiladi. Ko'chalar bo'ylab real vaqt xaritasida ko'rinadi. Gilam qabul bo'lganda bot orqali tasdiqlanadi.",
    color: '#06B6D4', glow: 'rgba(6,182,212,0.6)',
    detail: ['GPS kuzatuv', 'Real vaqt xarita', 'Bot tasdiq'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 16l2-7h14l2 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="3" y="16" width="22" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <circle cx="9" cy="22" r="2" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <circle cx="19" cy="22" r="2" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <path d="M17 9l3 4" stroke="#06B6D4" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="17" cy="7" r="2.5" fill="#06B6D4" opacity=".9"/>
      </svg>
    )
  },
  {
    num: '03', emoji: '🫧', title: 'Yuvish & Quritish',
    text: "Ishchi biriktiriladi. Razmerlar (kv.m) kiritiladi. Ish haqi avtomatik hisob-kitob qilinadi. Balans yoziladi.",
    color: '#10B981', glow: 'rgba(16,185,129,0.6)',
    detail: ['Ishchi biriktirish', 'Kv.m kiritish', 'Maosh hisob'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 20c0-5 4-10 8-10s8 5 8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <circle cx="10" cy="8" r="1.5" fill="#10B981"/>
        <circle cx="14" cy="6" r="1.5" fill="#10B981" opacity=".7"/>
        <circle cx="18" cy="8" r="1.5" fill="#10B981" opacity=".5"/>
        <path d="M6 23h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    num: '04', emoji: '✨', title: 'Bezak',
    text: "Gilam bezatiladi. Bezak tugagandan so'ng yetkazib berish topshirig'i AVTOMATIK yaratiladi va shafyorga topshiriladi.",
    color: '#F59E0B', glow: 'rgba(245,158,11,0.6)',
    detail: ['Gilam bezak', 'Avtomatik topshiriq', 'Shafyor tayinlash'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4l2.5 5 5.5.8-4 3.9.9 5.5L14 16.8l-4.9 2.4.9-5.5L6 9.8l5.5-.8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none"/>
        <circle cx="21" cy="21" r="4" fill="#F59E0B" opacity=".2"/>
        <path d="M19.5 21h3M21 19.5v3" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    num: '05', emoji: '🚚', title: "Yetkazish & To'lov",
    text: "Shafyor yetkazadi, mijozdan pul oladi. Moliya bo'limiga avtomatik kirim yoziladi. Hisobot tayyor.",
    color: '#8B5CF6', glow: 'rgba(139,92,246,0.6)',
    detail: ["Yetkazib berish", "Pul olish", "Moliya kirim"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M3 17V9a2 2 0 012-2h12v10H3z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
        <path d="M17 11h4l4 4v2h-8V11z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
        <circle cx="8" cy="21" r="2" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <circle cx="20" cy="21" r="2" stroke="currentColor" strokeWidth="1.6" fill="none"/>
        <path d="M10 13h4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
]

/* ── 3D Floating Card ── */
function StepCard({ step, i, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -10, y: dx * 10 })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.04 : isActive ? 1.02 : 1,
          z: hovered ? 40 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          position: 'relative',
          borderRadius: 20,
          padding: '24px 22px',
          background: isActive || hovered
            ? `linear-gradient(135deg, rgba(${step.color.slice(1).match(/../g).map(h=>parseInt(h,16)).join(',')},0.12), rgba(0,0,0,0.4))`
            : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isActive || hovered ? step.color + '60' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: isActive || hovered
            ? `0 20px 60px ${step.glow.replace('0.6','0.25')}, 0 0 0 1px ${step.color}30, inset 0 1px 0 rgba(255,255,255,0.08)`
            : '0 4px 24px rgba(0,0,0,0.3)',
          transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer line on top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${step.color}80, transparent)`,
          opacity: isActive || hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }} />

        {/* 3D depth layer (pseudo depth) */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 20,
          background: `radial-gradient(ellipse at 30% 20%, ${step.color}08, transparent 60%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, position: 'relative' }}>
          {/* Number + Icon stack */}
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {/* 3D number badge */}
            <motion.div
              animate={isActive || hovered ? { rotateY: [0, 360] } : {}}
              transition={{ duration: 0.6 }}
              style={{
                width: 52, height: 52, borderRadius: 14,
                background: `linear-gradient(135deg, ${step.color}, ${step.color}99)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#000', fontWeight: 900, fontSize: 13, letterSpacing: 1,
                boxShadow: `0 8px 20px ${step.glow.replace('0.6','0.4')}, inset 0 1px 0 rgba(255,255,255,0.3)`,
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* shine */}
              <div style={{
                position: 'absolute', top: -10, left: -10, width: 30, height: 70,
                background: 'rgba(255,255,255,0.25)', transform: 'rotate(25deg)',
                borderRadius: 4,
              }} />
              <span style={{ position: 'relative', zIndex: 1 }}>{step.num}</span>
            </motion.div>

            {/* Icon circle */}
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `${step.color}12`,
              border: `1px solid ${step.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: step.color,
            }}>
              {step.icon}
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, paddingTop: 2 }}>
            <h3 style={{
              fontSize: 16, fontWeight: 800, marginBottom: 8,
              color: isActive || hovered ? '#fff' : '#e2e8f0',
              letterSpacing: '-0.3px', transition: 'color 0.2s',
            }}>{step.title}</h3>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, marginBottom: 12 }}>{step.text}</p>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {step.detail.map((d, di) => (
                <motion.span key={d}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.1 + di * 0.05 + 0.4 }}
                  style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                    padding: '3px 9px', borderRadius: 99,
                    background: `${step.color}12`,
                    border: `1px solid ${step.color}30`,
                    color: step.color,
                  }}>
                  {d}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Active indicator bar */}
        <motion.div
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${step.color}, ${step.color}66)`,
            transformOrigin: 'left',
            borderRadius: '0 0 20px 20px',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ── Central 3D flow visualizer ── */
function FlowVisualizer({ activeStep }) {
  const step = STEPS[activeStep]
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 1200)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      position: 'sticky', top: 120,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 0,
    }}>
      {/* 3D Tube connector */}
      <div style={{ position: 'relative', width: 80, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Main tube */}
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 4, transform: 'translateX(-50%)',
          background: 'linear-gradient(to bottom, #1e293b, #1e293b)',
          borderRadius: 99,
        }} />

        {/* Animated energy flow */}
        {[0, 1, 2].map(j => (
          <motion.div key={j}
            animate={{ y: ['0%', '500px'], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.5, repeat: Infinity, ease: 'linear',
              delay: j * 0.8,
            }}
            style={{
              position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)',
              width: 4, height: 60, borderRadius: 99,
              background: `linear-gradient(to bottom, transparent, ${step.color}, transparent)`,
            }}
          />
        ))}

        {/* Step nodes */}
        {STEPS.map((s, i) => {
          const isActive = i === activeStep
          const isPast = i < activeStep
          const pct = i / (STEPS.length - 1)
          return (
            <div key={i} style={{
              position: 'absolute', left: '50%', top: `${pct * 92}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isActive ? 10 : 5,
            }}>
              <motion.div
                animate={{
                  scale: isActive ? [1, 1.15, 1] : 1,
                  boxShadow: isActive
                    ? [`0 0 0px ${s.glow}`, `0 0 24px ${s.glow}`, `0 0 0px ${s.glow}`]
                    : `0 0 0px transparent`,
                }}
                transition={{ duration: 1.8, repeat: isActive ? Infinity : 0 }}
                style={{
                  width: isActive ? 22 : 14,
                  height: isActive ? 22 : 14,
                  borderRadius: '50%',
                  background: isPast || isActive
                    ? `linear-gradient(135deg, ${s.color}, ${s.color}bb)`
                    : '#1e293b',
                  border: `2px solid ${isPast || isActive ? s.color : '#334155'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.4s',
                  cursor: 'default',
                }}>
                {isPast && <span style={{ fontSize: 7, color: '#000', fontWeight: 900 }}>✓</span>}
                {isActive && (
                  <motion.div
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{
                      position: 'absolute', inset: -4, borderRadius: '50%',
                      border: `2px solid ${s.color}`,
                    }}
                  />
                )}
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Active step detail card (bottom) */}
      <AnimatePresence mode="wait">
        <motion.div key={activeStep}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          style={{
            width: 160, padding: '14px 16px', borderRadius: 14,
            background: 'rgba(5,5,8,0.9)',
            border: `1px solid ${step.color}40`,
            boxShadow: `0 8px 32px ${step.glow.replace('0.6','0.2')}`,
            textAlign: 'center',
          }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>{step.emoji}</div>
          <div style={{ fontSize: 10, fontWeight: 800, color: step.color, letterSpacing: 1, textTransform: 'uppercase' }}>
            {step.num} / 05
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4, lineHeight: 1.5 }}>
            {step.title}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const sectionRef = useRef(null)

  // Auto-cycle steps
  useEffect(() => {
    const t = setInterval(() => setActiveStep(p => (p + 1) % STEPS.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="howitworks" ref={sectionRef} aria-label="Qanday ishlaydi" style={{
      padding: '100px 5% 120px',
      background: 'linear-gradient(180deg, #050508 0%, #070b14 40%, #050508 100%)',
      borderTop: '1px solid rgba(59,130,246,0.08)',
      borderBottom: '1px solid rgba(59,130,246,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Ambient background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.04), transparent)',
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div ref={headerRef} style={{ textAlign: 'center', marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 18px', borderRadius: 99, marginBottom: 20,
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.25)',
              fontSize: 11, fontWeight: 700, color: '#3B82F6',
              letterSpacing: 2, textTransform: 'uppercase',
            }}>
            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
              🔄
            </motion.span>
            Qanday ishlaydi
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 900,
              letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16,
            }}>
            Gilam yuvish buyurtmasi{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              5 bosqichda
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 15, color: '#475569', maxWidth: 480, margin: '0 auto' }}>
            Qabul qilishdan tortib yetkazib berishgacha — har bir qadam avtomatlashtirilgan
          </motion.p>
        </motion.div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: '0 32px', alignItems: 'start' }}>

          {/* Left column — steps 1,2,3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {STEPS.slice(0, 3).map((s, i) => (
              <StepCard key={s.num} step={s} i={i} isActive={activeStep === i} onClick={() => setActiveStep(i)} />
            ))}
          </div>

          {/* Center — flow tube */}
          <FlowVisualizer activeStep={activeStep} />

          {/* Right column — steps 4,5 + progress */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Spacer to align steps 4,5 with their tube position */}
            <div style={{ height: 140 }} />
            {STEPS.slice(3).map((s, i) => (
              <StepCard key={s.num} step={s} i={i + 3} isActive={activeStep === i + 3} onClick={() => setActiveStep(i + 3)} />
            ))}

            {/* Progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                marginTop: 8, padding: '16px 20px', borderRadius: 16,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
              <div style={{ fontSize: 10, color: '#475569', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
                Jarayon holati
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {STEPS.map((s, i) => (
                  <motion.div key={i}
                    onClick={() => setActiveStep(i)}
                    whileHover={{ scaleY: 1.2 }}
                    animate={{
                      background: i === activeStep
                        ? `linear-gradient(to top, ${s.color}, ${s.color}aa)`
                        : i < activeStep
                          ? `linear-gradient(to top, ${s.color}60, ${s.color}30)`
                          : 'rgba(255,255,255,0.05)',
                    }}
                    style={{
                      flex: 1, height: 32, borderRadius: 6, cursor: 'pointer',
                      position: 'relative', overflow: 'hidden',
                    }}>
                    {i === activeStep && (
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                          position: 'absolute', inset: 0,
                          background: `radial-gradient(ellipse at 50% 100%, ${s.color}80, transparent)`,
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 10, color: '#334155' }}>Yangi</span>
                <span style={{ fontSize: 10, color: STEPS[activeStep].color, fontWeight: 700 }}>
                  {STEPS[activeStep].title}
                </span>
                <span style={{ fontSize: 10, color: '#334155' }}>Tayyor</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile layout override */}
      <style>{`
        @media (max-width: 768px) {
          #howitworks .hiw-grid {
            grid-template-columns: 1fr !important;
          }
          #howitworks .hiw-tube {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
