import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{
        width: 180, height: 180,
        background: '#050508',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 140, height: 140, borderRadius: 36,
          background: 'linear-gradient(135deg, #00FFB3, #A78BFA)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 72, color: '#000',
          fontFamily: 'system-ui',
          boxShadow: '0 8px 32px rgba(0,255,179,0.4)',
        }}>
          T
        </div>
      </div>
    ),
    { ...size }
  )
}
