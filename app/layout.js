import './globals.css'

const BASE_URL = 'https://tartibcrm.uz'

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Tartib CRM — O'zbekiston №1 CRM | Gilam Yuvish ERP Tizimi",
    template: "%s | Tartib CRM",
  },

  description: "O'zbekistondagi gilam yuvish va himchishtka sehxlari uchun #1 professional CRM/ERP. Buyurtmalar, GPS kuzatuv, ishchilar maoshi va moliyaviy hisobotlar — bitta tizimda. 14 kun bepul sinab ko'ring.",

  // keywords olib tashlandi — Google hisobga olmaydi, faqat kontent ichida natural ishlatiladi
  authors: [{ name: 'Tartib CRM', url: BASE_URL }],
  creator: 'Tartib CRM',
  publisher: 'Tartib CRM',

  // Canonical URL
  alternates: {
    canonical: BASE_URL,
    languages: {
      'uz-UZ': BASE_URL,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: BASE_URL,
    title: "Tartib CRM — Gilam Yuvish Sehxi uchun #1 ERP",
    description: "Buyurtmalar, shafyorlar, ishchilar, maosh va moliya — barchasini bitta tizimda boshqaring. 14 kun bepul sinov, karta shart emas.",
    siteName: 'Tartib CRM',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: "Tartib CRM — O'zbekiston №1 Gilam Yuvish ERP Dashboard",
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: "Tartib CRM — Gilam Yuvish Sehxi uchun #1 ERP",
    description: "Buyurtmalar, shafyorlar, maosh va moliya — bitta tizimda. 14 kun bepul.",
    images: ['/opengraph-image'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    // Google Search Console tasdiqlash kodi (keyinchalik qo'shiladi)
    // google: 'your-verification-code',
  },
}

export const viewport = {
  themeColor: '#050508',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // accessibility uchun 1 emas 5 — foydalanuvchi zoom qila olsin
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
          precedence="default"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              // 1. Organization
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Tartib CRM",
                "url": BASE_URL,
                "logo": `${BASE_URL}/favicon.ico`,
                "description": "O'zbekistondagi gilam yuvish va himchishtka sehxlari uchun #1 professional CRM/ERP tizimi.",
                "foundingLocation": {
                  "@type": "Place",
                  "name": "Toshkent, O'zbekiston"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+998901234567",
                  "contactType": "customer support",
                  "availableLanguage": ["Uzbek", "Russian"]
                },
                "sameAs": ["https://t.me/tartib_crm"]
              },
              // 2. SoftwareApplication
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Tartib CRM",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web, iOS, Android",
                "url": BASE_URL,
                "description": "Gilam yuvish va himchishtka sehxlari uchun CRM/ERP tizimi. Buyurtmalar boshqaruvi, GPS kuzatuv, maosh hisoblash, moliya nazorati.",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "UZS",
                  "description": "14 kunlik bepul sinov"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "ratingCount": "847",
                  "bestRating": "5"
                },
                "featureList": [
                  "Buyurtmalar boshqaruvi",
                  "GPS kuzatuv",
                  "Ishchilar maoshi",
                  "Moliya nazorati",
                  "Telegram bot integratsiyasi",
                  "Offline rejim"
                ]
              },
              // 3. FAQPage
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Tartib CRM faqat gilam yuvish uchunmi?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Asosan ha — tizim gilam yuvish, himchishtka va uyga xizmat ko'rsatish sehxlari uchun maxsus ishlab chiqilgan. Yetkazib berish, ishchilar maoshi, kv.m bo'yicha hisob — hammasi shu soha uchun."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Internet bo'lmasa ham ishlaydimi?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Ha! Offline rejim mavjud. Internet uzilsa ham barcha operatsiyalar lokal saqlanadi. Aloqa tiklanishi bilan avtomatik sync bo'ladi."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Telegram bot bilan integratsiya qanday ishlaydi?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Shafyorlar buyurtma qabul qiladi, mijozlar holat haqida xabar oladi — barchasi bot orqali avtomatik. Alohida sozlash kerak emas."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "O'rnatish va sozlash qancha vaqt oladi?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "O'rtacha 1 soat. Bizning mutaxassislar sizga qo'ng'iroq qilib, onlayn sozlab berishadi. Birinchi 14 kun bepul."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Ma'lumotlar xavfsizligi qanday ta'minlanadi?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "JWT autentifikatsiya, 256-bit shifrlash, har harakat log qilinadi. Serverlarda kunlik backup."
                    }
                  }
                ]
              },
              // 4. WebSite (sitelinks searchbox uchun)
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Tartib CRM",
                "url": BASE_URL,
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": `${BASE_URL}/?q={search_term_string}`,
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
