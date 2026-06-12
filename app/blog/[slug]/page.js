import Link from 'next/link'
import { notFound } from 'next/navigation'
import { POSTS, getPost, getRelatedPosts } from '../posts'

export async function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const post = getPost(params.slug)
  if (!post) return {}
  const BASE = 'https://tartibcrm.uz'
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${BASE}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    other: {
      'article:published_time': post.date,
      'article:author': post.author,
      'article:tag': post.tags.join(','),
    },
  }
}

function renderMarkdown(text) {
  if (!text) return []
  const lines = text.trim().split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Table
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const headers = line.split('|').filter(c => c.trim()).map(c => c.trim())
      i += 2
      const rows = []
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(lines[i].split('|').filter(c => c.trim()).map(c => c.trim()))
        i++
      }
      elements.push(
        <div key={i} style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,255,179,0.2)' }}>
                {headers.map((h, j) => <th key={j} style={{ textAlign: 'left', padding: '8px 12px', color: '#00FFB3', fontWeight: 700, fontSize: 12 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {row.map((cell, ci) => <td key={ci} style={{ padding: '8px 12px', color: '#94a3b8', fontSize: 13 }}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 12, marginTop: 36, letterSpacing: '-0.5px', lineHeight: 1.3 }}>{line.slice(3)}</h2>)
      i++; continue
    }
    // H3
    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} style={{ fontSize: 17, fontWeight: 700, color: '#e2e8f0', marginBottom: 10, marginTop: 24, letterSpacing: '-0.2px' }}>{line.slice(4)}</h3>)
      i++; continue
    }
    // Bullet
    if (line.startsWith('- ')) {
      const bullets = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        bullets.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={i} style={{ marginBottom: 20, paddingLeft: 0, listStyle: 'none' }}>
          {bullets.map((b, bi) => (
            <li key={bi} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#94a3b8', fontSize: 15, lineHeight: 1.65 }}>
              <span style={{ color: '#00FFB3', flexShrink: 0, marginTop: 2 }}>→</span>
              <span dangerouslySetInnerHTML={{ __html: b.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#f1f5f9;font-weight:700">$1</strong>') }} />
            </li>
          ))}
        </ul>
      )
      continue
    }
    // Checkmarks ✅
    if (line.startsWith('✅')) {
      const checks = []
      while (i < lines.length && lines[i].startsWith('✅')) {
        checks.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={i} style={{ marginBottom: 20, paddingLeft: 0, listStyle: 'none' }}>
          {checks.map((c, ci) => (
            <li key={ci} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#94a3b8', fontSize: 15, lineHeight: 1.65 }}>
              <span style={{ color: '#4ADE80', flexShrink: 0 }}>✓</span>
              <span dangerouslySetInnerHTML={{ __html: c.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#f1f5f9;font-weight:700">$1</strong>') }} />
            </li>
          ))}
        </ul>
      )
      continue
    }
    // Empty line
    if (!line.trim()) { i++; continue }
    // Bold inline
    const html = line.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#f1f5f9;font-weight:700">$1</strong>')
    elements.push(<p key={i} style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.75, marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: html }} />)
    i++
  }
  return elements
}

export default function BlogPost({ params }) {
  const post = getPost(params.slug)
  if (!post) notFound()
  const related = getRelatedPosts(post.relatedSlugs)
  const BASE = 'https://tartibcrm.uz'

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": { "@type": "Organization", "name": post.author },
    "publisher": { "@type": "Organization", "name": "Tartib CRM", "url": BASE },
    "datePublished": post.date,
    "dateModified": post.date,
    "url": `${BASE}/blog/${post.slug}`,
    "keywords": post.tags.join(', '),
    "inLanguage": "uz-UZ",
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug}` },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050508', color: '#f1f5f9' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,255,179,0.08)', padding: '0 5%', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#000' }}>T</div>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9' }}>Tartib<span style={{ color: '#00FFB3' }}>CRM</span></span>
        </Link>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/blog" style={{ color: '#666', fontSize: 14, textDecoration: 'none' }}>← Blog</Link>
          <Link href="/#demo" style={{ padding: '8px 18px', background: 'linear-gradient(135deg,#00FFB3,#00cc8e)', color: '#000', borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Bepul demo</Link>
        </div>
      </nav>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '88px 20px 80px' }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" style={{ marginBottom: 24, fontSize: 12, color: '#445', display: 'flex', gap: 6, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#445', textDecoration: 'none' }}>Bosh sahifa</Link>
          <span>›</span>
          <Link href="/blog" style={{ color: '#445', textDecoration: 'none' }}>Blog</Link>
          <span>›</span>
          <span style={{ color: '#666' }}>{post.category}</span>
        </nav>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: 'rgba(0,255,179,0.08)', color: '#00FFB3', border: '1px solid rgba(0,255,179,0.2)', textTransform: 'uppercase', letterSpacing: 1 }}>{post.category}</span>
          <span style={{ fontSize: 12, color: '#445' }}>{post.dateFormatted}</span>
          <span style={{ fontSize: 12, color: '#445' }}>·</span>
          <span style={{ fontSize: 12, color: '#445' }}>{post.readTime} daqiqa o'qish</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 20, color: '#f1f5f9' }}>{post.title}</h1>

        {/* Excerpt */}
        <p style={{ fontSize: 17, color: '#667', lineHeight: 1.7, marginBottom: 32, borderLeft: '3px solid rgba(0,255,179,0.4)', paddingLeft: 16 }}>{post.excerpt}</p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 40, flexWrap: 'wrap' }}>
          {post.tags.map(t => (
            <span key={t} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', color: '#556', border: '1px solid rgba(255,255,255,0.06)' }}>{t}</span>
          ))}
        </div>

        {/* Content */}
        <article style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 40, marginBottom: 40 }}>
          {renderMarkdown(post.content)}
        </article>

        {/* Author */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '20px', background: 'rgba(0,255,179,0.04)', borderRadius: 14, border: '1px solid rgba(0,255,179,0.1)', marginBottom: 40 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#00FFB3,#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#000', flexShrink: 0 }}>T</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginBottom: 3 }}>{post.author}</div>
            <div style={{ fontSize: 12, color: '#556', lineHeight: 1.5 }}>Gilam yuvish va himchishtka sehxlari uchun CRM/ERP mutaxassislari</div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: '#f1f5f9', letterSpacing: '-0.3px' }}>Qo'shimcha maqolalar</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: 'none', display: 'block', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, transition: 'border-color 0.2s' }}
                  
                  >
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#00FFB3', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{r.category}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', lineHeight: 1.4, marginBottom: 8 }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: '#00FFB3', fontWeight: 600 }}>O'qish →</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: 48, textAlign: 'center', padding: '36px 24px', background: 'linear-gradient(135deg, rgba(0,255,179,0.06), rgba(167,139,250,0.04))', border: '1px solid rgba(0,255,179,0.15)', borderRadius: 18 }}>
          <div style={{ fontSize: 11, color: '#00FFB3', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>🚀 Tartib CRM</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 10, letterSpacing: '-0.5px' }}>Sehxingizni bugun tartibga soling</h2>
          <p style={{ fontSize: 13, color: '#556', marginBottom: 20 }}>14 kunlik bepul sinov · Karta talab qilinmaydi</p>
          <Link href="/#demo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: 'linear-gradient(135deg,#00FFB3,#00cc8e)', color: '#000', borderRadius: 11, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            Bepul demo olish →
          </Link>
        </div>
      </main>
    </div>
  )
}
