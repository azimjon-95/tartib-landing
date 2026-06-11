export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://tartibcrm.uz/sitemap.xml',
    host: 'https://tartibcrm.uz',
  }
}
