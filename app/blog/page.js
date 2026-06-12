import Link from 'next/link'
import { POSTS } from './posts'

export const metadata = {
  title: "Blog — Gilam Yuvish va Himchishtka Sehxi uchun Maslahatlar",
  description: "Gilam yuvish biznesini boshqarish, CRM tizimlar, avtomatlashtirish va sehx samaradorligi haqida professional maqolalar.",
  alternates: { canonical: 'https://tartibcrm.uz/blog' },
  openGraph: {
    title: "Tartib CRM Blog — Gilam Yuvish Sehxi Maslahatlar",
    description: "Gilam yuvish biznesini boshqarish, CRM va avtomatlashtirish haqida professional maqolalar.",
    url: 'https://tartibcrm.uz/blog',
    type: 'website',
  },
}

const CATS = ['Barchasi', 'Biznes boshqaruv', 'Texnologiya', 'Avtomatlashtirish', "Dasturiy ta'minot"]

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#050508', color: '#f1f5f9' }}>
      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,255,179,0.08)', padding: '0 5%', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#000' }}>T</div>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9' }}>Tartib<span style={{ color: '#00FFB3' }}>CRM</span></span>
        </Link>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#666', fontSize: 14, textDecoration: 'none' }}>← Bosh sahifa</Link>
          <Link href="#demo" style={{ padding: '8px 18px', background: 'linear-gradient(135deg,#00FFB3,#00cc8e)', color: '#000', borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Bepul demo</Link>
        </div>
      </nav>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 20px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', borderRadius: 99, background: 'rgba(0,255,179,0.06)', border: '1px solid rgba(0,255,179,0.2)', fontSize: 11, fontWeight: 700, color: '#00FFB3', marginBottom: 16, letterSpacing: 2, textTransform: 'uppercase' }}>
            ✦ Blog
          </div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 14, lineHeight: 1.1 }}>
            Gilam yuvish biznesini{' '}
            <span style={{ background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              rivojlantirish
            </span>
          </h1>
          <p style={{ fontSize: 16, color: '#555', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Sehx boshqaruvi, CRM tizimlar va avtomatlashtirish haqida professional maqolalar
          </p>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
          {CATS.map((cat, i) => (
            <div key={cat} style={{ padding: '7px 16px', borderRadius: 99, background: i === 0 ? 'rgba(0,255,179,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === 0 ? 'rgba(0,255,179,0.4)' : 'rgba(255,255,255,0.07)'}`, fontSize: 13, color: i === 0 ? '#00FFB3' : '#555', cursor: 'pointer' }}>
              {cat}
            </div>
          ))}
        </div>

        {/* Featured post */}
        <Link href={`/blog/${POSTS[0].slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }}>
          <article className="blog-featured" style={{ background: 'linear-gradient(135deg, rgba(0,255,179,0.06), rgba(167,139,250,0.04))', border: '1px solid rgba(0,255,179,0.15)', borderRadius: 20, padding: '32px 36px', position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s, transform 0.2s' }}
            
            >
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: 'radial-gradient(ellipse at 80% 50%, rgba(0,255,179,0.06), transparent)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ background: '#00FFB3', color: '#000', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: 1 }}>⭐ Featured</span>
              <span style={{ fontSize: 11, color: '#555' }}>{POSTS[0].category} · {POSTS[0].readTime} daqiqa</span>
            </div>
            <h2 style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 800, color: '#f1f5f9', marginBottom: 12, lineHeight: 1.3, letterSpacing: '-0.5px' }}>{POSTS[0].title}</h2>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 20, maxWidth: 600 }}>{POSTS[0].excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {POSTS[0].tags.slice(0, 3).map(t => (
                  <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: 'rgba(0,255,179,0.08)', color: '#00FFB3', border: '1px solid rgba(0,255,179,0.2)' }}>{t}</span>
                ))}
              </div>
              <span style={{ color: '#00FFB3', fontSize: 13, fontWeight: 600, marginLeft: 'auto' }}>O'qish → </span>
            </div>
          </article>
        </Link>

        {/* Post grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {POSTS.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article className="blog-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '22px 22px', height: '100%', transition: 'border-color 0.2s, transform 0.2s', display: 'flex', flexDirection: 'column' }}
                
                >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 99, background: 'rgba(167,139,250,0.1)', color: '#A78BFA', border: '1px solid rgba(167,139,250,0.2)', textTransform: 'uppercase', letterSpacing: 1 }}>{post.category}</span>
                  <span style={{ fontSize: 11, color: '#445' }}>{post.readTime} daqiqa</span>
                </div>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 10, lineHeight: 1.4, flex: 1 }}>{post.title}</h2>
                <p style={{ fontSize: 13, color: '#556', lineHeight: 1.65, marginBottom: 16 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 12, marginTop: 'auto' }}>
                  <span style={{ fontSize: 11, color: '#445' }}>{post.dateFormatted}</span>
                  <span style={{ fontSize: 12, color: '#00FFB3', fontWeight: 600 }}>O'qish →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 64, textAlign: 'center', padding: '40px 20px', background: 'linear-gradient(135deg, rgba(0,255,179,0.05), rgba(167,139,250,0.04))', border: '1px solid rgba(0,255,179,0.12)', borderRadius: 20 }}>
          <div style={{ fontSize: 13, color: '#00FFB3', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>🚀 Tartib CRM</div>
          <h2 style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 900, marginBottom: 12, letterSpacing: '-0.5px' }}>Sehxingizni bugun tartibga soling</h2>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 24 }}>14 kunlik bepul sinov · Karta talab qilinmaydi · 1 soatda sozlanadi</p>
          <Link href="/#demo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'linear-gradient(135deg,#00FFB3,#00cc8e)', color: '#000', borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,255,179,0.3)' }}>
            Bepul demo olish →
          </Link>
        </div>
      </main>

      <style>{`
        @media(max-width:640px){
          article{padding:18px 16px!important}
        }
      `}</style>
    </div>
  )
}
// CSS added via globals
