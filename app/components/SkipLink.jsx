'use client'
export default function SkipLink() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        style={{ position:'absolute',top:-100,left:16,zIndex:9999,padding:'8px 16px',background:'#00FFB3',color:'#000',borderRadius:8,fontWeight:700,fontSize:14,textDecoration:'none',transition:'top 0.2s' }}
        onFocus={e => e.target.style.top='16px'}
        onBlur={e => e.target.style.top='-100px'}
      >
        Asosiy kontentga o'tish
      </a>
    </>
  )
}
