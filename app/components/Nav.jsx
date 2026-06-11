'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mob ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mob])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 20px', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled || mob ? 'rgba(5,5,8,0.97)' : 'transparent',
          backdropFilter: scrolled || mob ? 'blur(24px)' : 'none',
          borderBottom: scrolled || mob ? '1px solid rgba(0,255,179,0.08)' : 'none',
          transition: 'all 0.3s',
          /* safe area for iPhone notch */
          paddingTop: 'max(0px, env(safe-area-inset-top))',
        }}>

        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0, textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg,#00FFB3,#A78BFA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 16, color: '#000', flexShrink: 0,
          }}>T</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
              Tartib<span style={{ color: '#00FFB3' }}>CRM</span>
            </div>
            <div style={{ fontSize: 7, color: '#00FFB3', letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.7 }}>
              Gilam yuvish ERP
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nav-desk">
          {LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} style={{ color: '#666', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#00FFB3'}
              onMouseLeave={e => e.target.style.color = '#666'}>
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="#" className="nav-desk" style={{ color: '#666', fontSize: 14, textDecoration: 'none' }}>Kirish</a>
          <motion.a href="#demo" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="nav-cta-desk"
            style={{ padding: '9px 20px', background: 'linear-gradient(135deg,#00FFB3,#00cc8e)', color: '#000', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            Bepul demo →
          </motion.a>

          {/* Mobile: demo button + hamburger */}
          <motion.a href="#demo" whileTap={{ scale: 0.94 }}
            className="nav-mob-btn"
            style={{
              display: 'none', padding: '8px 14px',
              background: 'linear-gradient(135deg,#00FFB3,#00cc8e)',
              color: '#000', borderRadius: 8, fontSize: 13, fontWeight: 700,
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
            Demo
          </motion.a>

          <motion.button whileTap={{ scale: 0.88 }} onClick={() => setMob(v => !v)}
            className="nav-mob-btn"
            aria-label="Menu"
            style={{
              display: 'none',
              width: 38, height: 38,
              background: mob ? 'rgba(0,255,179,0.12)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(0,255,179,0.2)',
              color: '#00FFB3', cursor: 'pointer',
              borderRadius: 10, fontSize: 17,
              alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
            {mob ? '✕' : '☰'}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mob && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: 60, left: 0, right: 0, bottom: 0, zIndex: 998,
              background: 'rgba(5,5,8,0.99)', backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              paddingBottom: 'env(safe-area-inset-bottom, 20px)',
            }}>
            <div style={{ flex: 1, padding: '12px 20px 0', overflowY: 'auto' }}>
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.id} href={`#${l.id}`}
                  onClick={() => setMob(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    color: '#e2e8f0', fontSize: 17, fontWeight: 600,
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    textDecoration: 'none',
                  }}>
                  {l.label}
                  <span style={{ color: '#00FFB3', fontSize: 14 }}>→</span>
                </motion.a>
              ))}
            </div>

            <div style={{ padding: '20px' }}>
              <a href="#demo" onClick={() => setMob(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '16px', width: '100%',
                background: 'linear-gradient(135deg,#00FFB3,#00cc8e)',
                color: '#000', borderRadius: 14, fontSize: 16, fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0,255,179,0.3)',
              }}>
                🚀 Bepul demo olish
              </a>
              <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: '#333' }}>
                Karta talab yo'q · 14 kun bepul
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desk, .nav-cta-desk { display: none !important }
          .nav-mob-btn { display: flex !important }
        }
      `}</style>
    </>
  )
}
