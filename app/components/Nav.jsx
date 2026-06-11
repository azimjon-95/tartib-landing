'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const LINKS = [
  { label: 'Imkoniyatlar', id: 'features' },
  { label: 'Qanday ishlaydi', id: 'howitworks' },
  { label: 'Xarita', id: 'map' },
  { label: 'Sahifalar', id: 'screenshots' },
  { label: 'FAQ', id: 'faq' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mob, setMob] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 5%', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(5,5,8,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,255,179,0.08)' : 'none',
          transition: 'all 0.4s',
        }}>

        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg,#00FFB3,#A78BFA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 17, color: '#000',
          }}>T</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.3px' }}>
              Tartib<span style={{ color: '#00FFB3' }}>CRM</span>
            </div>
            <div style={{ fontSize: 8, color: '#00FFB3', letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.7 }}>
              Gilam yuvish ERP
            </div>
          </div>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }} className="nav-desk">
          {LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} style={{
              color: '#666', fontSize: 14, fontWeight: 500,
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#00FFB3'}
              onMouseLeave={e => e.target.style.color = '#666'}
            >{l.label}</a>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#" className="nav-desk" style={{ color: '#666', fontSize: 14, textDecoration: 'none' }}>Kirish</a>
          <motion.a href="#demo"
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(0,255,179,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="nav-cta-desk"
            style={{
              padding: '9px 22px',
              background: 'linear-gradient(135deg,#00FFB3,#00cc8e)',
              color: '#000', borderRadius: 10, fontSize: 14, fontWeight: 700,
              boxShadow: '0 4px 16px rgba(0,255,179,0.25)',
            }}>
            Bepul demo →
          </motion.a>

          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMob(v => !v)}
            className="nav-mob-btn"
            style={{
              display: 'none', background: 'rgba(0,255,179,0.08)',
              border: '1px solid rgba(0,255,179,0.2)', color: '#00FFB3',
              cursor: 'pointer', padding: '7px 10px', borderRadius: 8, fontSize: 18,
            }}>
            {mob ? '✕' : '☰'}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mob && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
              background: 'rgba(5,5,8,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0,255,179,0.1)',
              padding: '20px 5% 24px', display: 'flex', flexDirection: 'column', gap: 4,
            }}>
            {LINKS.map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setMob(false)} style={{
                color: '#e2e8f0', fontSize: 16, fontWeight: 500, padding: '12px 0',
                borderBottom: '1px solid rgba(0,255,179,0.06)', textDecoration: 'none',
              }}>{l.label}</a>
            ))}
            <a href="#demo" onClick={() => setMob(false)} style={{
              marginTop: 12, padding: 13,
              background: 'linear-gradient(135deg,#00FFB3,#00cc8e)',
              color: '#000', borderRadius: 10, fontSize: 15, fontWeight: 700,
              textAlign: 'center', textDecoration: 'none',
            }}>🚀 Bepul demo olish</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){
          .nav-desk,.nav-cta-desk{display:none!important}
          .nav-mob-btn{display:flex!important}
        }
      `}</style>
    </>
  )
}
