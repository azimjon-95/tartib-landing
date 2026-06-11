import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = "Tartib CRM — O'zbekiston №1 Gilam Yuvish ERP"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        background: '#050508',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,255,179,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,179,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
        }}/>

        {/* Left glow */}
        <div style={{ position:'absolute', top:-100, left:-100, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,255,179,0.12) 0%, transparent 65%)', display:'flex' }}/>
        {/* Right glow */}
        <div style={{ position:'absolute', bottom:-100, right:-100, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 65%)', display:'flex' }}/>

        {/* Main content */}
        <div style={{ position:'relative', zIndex:1, padding:'56px 72px', display:'flex', flexDirection:'column', height:'100%' }}>

          {/* Logo row */}
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:52 }}>
            <div style={{
              width:56, height:56, borderRadius:14,
              background:'linear-gradient(135deg, #00FFB3, #A78BFA)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:26, fontWeight:900, color:'#000',
            }}>T</div>
            <div style={{ display:'flex', flexDirection:'column' }}>
              <div style={{ fontSize:28, fontWeight:800, color:'#f1f5f9', display:'flex' }}>
                <span>Tartib</span>
                <span style={{ color:'#00FFB3' }}>CRM</span>
              </div>
              <div style={{ fontSize:11, color:'rgba(0,255,179,0.7)', letterSpacing:3, textTransform:'uppercase' }}>
                GILAM YUVISH ERP
              </div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', maxWidth:680 }}>
            <div style={{ fontSize:62, fontWeight:900, color:'#f1f5f9', lineHeight:1.05, marginBottom:16, display:'flex', flexDirection:'column' }}>
              <span>Gilam yuvish sehxingizni</span>
              <span style={{ background:'linear-gradient(135deg, #00FFB3, #38BDF8, #A78BFA)', backgroundClip:'text', color:'transparent' }}>
                raqamli tartibga soling.
              </span>
            </div>
            <div style={{ fontSize:22, color:'rgba(148,163,184,0.85)', lineHeight:1.6, marginBottom:40 }}>
              Buyurtmalar · Shafyorlar · Maosh · Moliya — bitta tizimda
            </div>

            {/* Stats */}
            <div style={{ display:'flex', gap:48 }}>
              {[['12,847+','Foydalanuvchi'],['50,000+','Buyurtma'],['99.9%','Uptime']].map(([v,l]) => (
                <div key={l} style={{ display:'flex', flexDirection:'column' }}>
                  <span style={{ fontSize:30, fontWeight:900, color:'#00FFB3' }}>{v}</span>
                  <span style={{ fontSize:14, color:'rgba(100,116,139,0.9)', marginTop:2 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{
            display:'flex', alignItems:'center', gap:12, marginTop:32,
            background:'rgba(0,255,179,0.08)', border:'1px solid rgba(0,255,179,0.3)',
            borderRadius:99, padding:'10px 28px', width:'fit-content',
          }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#00FFB3' }}/>
            <span style={{ fontSize:16, fontWeight:700, color:'#00FFB3' }}>
              tartibcrm.uz — 14 kun bepul sinov
            </span>
          </div>
        </div>

        {/* Right side: CRM card */}
        <div style={{
          position:'absolute', right:64, top:'50%',
          transform:'translateY(-50%)',
          width:340, background:'rgba(7,11,20,0.96)',
          border:'1px solid rgba(0,255,179,0.18)',
          borderRadius:20, overflow:'hidden',
          display:'flex', flexDirection:'column',
          boxShadow:'0 24px 60px rgba(0,0,0,0.5)',
        }}>
          {/* Panel header */}
          <div style={{ background:'rgba(0,255,179,0.06)', borderBottom:'1px solid rgba(0,255,179,0.08)', padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:22, height:22, borderRadius:6, background:'linear-gradient(135deg,#00FFB3,#A78BFA)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900, color:'#000' }}>T</div>
              <span style={{ fontSize:12, fontWeight:800, color:'#fff' }}>TartibCRM</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#00FFB3' }}/>
              <span style={{ fontSize:9, color:'#00FFB3', fontWeight:700 }}>LIVE</span>
            </div>
          </div>
          {/* KPIs */}
          <div style={{ padding:14, display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ display:'flex', gap:8 }}>
              {[['47','Faol buyurtma','#00FFB3'],['12.4M','Kirim','#A78BFA']].map(([v,l,c])=>(
                <div key={l} style={{ flex:1, background:`${c}15`, border:`1px solid ${c}25`, borderRadius:10, padding:'8px 10px', display:'flex', flexDirection:'column' }}>
                  <span style={{ fontSize:18, fontWeight:900, color:c }}>{v}</span>
                  <span style={{ fontSize:9, color:'rgba(100,116,139,0.8)', marginTop:2 }}>{l}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {[['8/12','Ishchida','#38BDF8'],['6','Yetkazishda','#FB923C']].map(([v,l,c])=>(
                <div key={l} style={{ flex:1, background:`${c}15`, border:`1px solid ${c}25`, borderRadius:10, padding:'8px 10px', display:'flex', flexDirection:'column' }}>
                  <span style={{ fontSize:18, fontWeight:900, color:c }}>{v}</span>
                  <span style={{ fontSize:9, color:'rgba(100,116,139,0.8)', marginTop:2 }}>{l}</span>
                </div>
              ))}
            </div>
            {/* Orders */}
            {[['#1042','Azimjon M.','Yuvishda','#38BDF8'],['#1041','Malika T.','Tayyor','#4ADE80'],['#1040','Sardor K.','Yetkazishda','#FB923C']].map(([id,nm,st,c])=>(
              <div key={id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(255,255,255,0.02)', borderRadius:8, padding:'6px 10px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', background:c }}/>
                  <span style={{ fontSize:10, color:'#e2e8f0', fontWeight:600 }}>{nm}</span>
                </div>
                <span style={{ fontSize:9, color:c, fontWeight:700 }}>{st}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
