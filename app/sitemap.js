export default function sitemap() {
  const base = 'https://tartibcrm.uz'
  const now = new Date()

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Anchor linklar sitemap ga kirmaydi — Google indexlamaydi
    // Alohida sahifalar bo'lganda qo'shiladi
  ]
}
