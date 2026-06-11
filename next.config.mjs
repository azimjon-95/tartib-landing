/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  // Google Fonts ni build vaqtida optimizatsiya qilmasin
  optimizeFonts: false,
}
export default nextConfig
