/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Performance: rasmlarni optimizatsiya qilish
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },

  // Performance: Google Fonts optimizatsiyasi yoqish
  optimizeFonts: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      // Static assets: aggressiv cache
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff2|woff)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  // Compression
  compress: true,

  // Remove X-Powered-By header
  poweredByHeader: false,
}

export default nextConfig
