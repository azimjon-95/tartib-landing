'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid rgba(0,255,179,0.06)', padding: '56px 5% 32px', position: 'relative', zIndex: 2, background: '#050508' }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }} className="footer-grid">

          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, color: '#000' }}>T</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#f1f5f9' }}>Tartib<span style={{ color: '#00FFB3' }}>CRM</span></div>
                <div style={{ fontSize: 8, color: '#00FFB3', letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.7 }}>Gilam yuvish ERP</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, maxWidth: 260 }}>
              O'zbekistondagi gilam yuvish va himchishtka sehxlari uchun #1 professional CRM/ERP tizimi.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['✈️ Telegram', '📞 Qo\'ng\'iroq'].map((s, i) => (
                <a key={i} href={i === 0 ? 'https://t.me/tartib_crm' : 'tel:+998901234567'}
                  style={{ fontSize: 12, color: '#444', padding: '6px 12px', border: '1px solid #1a1a2e', borderRadius: 8, textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.target.style.borderColor = 'rgba(0,255,179,0.3)'; e.target.style.color = '#00FFB3' }}
                  onMouseLeave={e => { e.target.style.borderColor = '#1a1a2e'; e.target.style.color = '#444' }}>
                  {s}
                </a>
              ))}
            </div>
          </motion.div>

          {[
            { title: 'Mahsulot', links: ['Dashboard', 'Buyurtmalar', 'Transport', 'Moliya', 'Maosh'] },
            { title: 'Kompaniya', links: ['Haqimizda', 'Blog', 'Ish o\'rinlari', 'Yangiliklar'] },
            { title: 'Yordam', links: ['Hujjatlar', 'FAQ', 'Texnik yordam', 'Shartlar'] },
          ].map((col, i) => (
            <motion.div key={col.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 * (i + 1) }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#00FFB3', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>{col.title}</div>
              {col.links.map(l => (
                <a key={l} href="#" style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#f1f5f9'}
                  onMouseLeave={e => e.target.style.color = '#444'}>{l}</a>
              ))}
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,255,179,0.05)', paddingTop: 24, flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 12, color: '#333' }}>© {year} Tartib CRM. O'zbekiston. Barcha huquqlar himoyalangan.</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 4px #4ADE80', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 11, color: '#333' }}>Barcha tizimlar faol · 99.9% uptime</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:28px!important}}
        @media(max-width:480px){.footer-grid{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  )
}
