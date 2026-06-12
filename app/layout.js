import './globals.css'

const BASE_URL = 'https://tartibcrm.uz'

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Tartib CRM — O'zbekiston №1 CRM | Gilam Yuvish ERP Tizimi",
    template: "%s | Tartib CRM",
  },

  description: "O'zbekiston gilam yuvish va himchishtka sehxlari uchun #1 CRM/ERP. Buyurtmalar, GPS kuzatuv, maosh va moliya — bitta tizimda. 14 kun bepul.",

  authors: [{ name: 'Tartib CRM', url: BASE_URL }],
  creator: 'Tartib CRM',
  publisher: 'Tartib CRM',
  applicationName: 'Tartib CRM',

  // Canonical + hreflang
  alternates: {
    canonical: BASE_URL,
    languages: { 'uz-UZ': BASE_URL },
  },

  // PWA manifest
  manifest: '/manifest.json',

  // iOS / Apple
  appleWebApp: {
    capable: true,
    title: 'Tartib CRM',
    statusBarStyle: 'black-translucent',
    startupImage: [
      { url: '/icons/icon-512.png', media: '(device-width: 320px)' },
      { url: '/icons/icon-512.png', media: '(device-width: 375px)' },
    ],
  },

  // Icons
  icons: {
    icon: [
      { url: '/icons/icon-72.png',  sizes: '72x72',   type: 'image/png' },
      { url: '/icons/icon-96.png',  sizes: '96x96',   type: 'image/png' },
      { url: '/icons/icon-128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/icons/icon-96.png',
  },

  // OpenGraph
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: BASE_URL,
    title: "Tartib CRM — Gilam Yuvish Sehxi uchun #1 ERP",
    description: "Buyurtmalar, shafyorlar, ishchilar, maosh va moliya — barchasini bitta tizimda boshqaring. 14 kun bepul sinov, karta shart emas.",
    siteName: 'Tartib CRM',
    images: [{
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: "Tartib CRM — O'zbekiston №1 Gilam Yuvish ERP Dashboard",
    }],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: "Tartib CRM — Gilam Yuvish Sehxi uchun #1 ERP",
    description: "Buyurtmalar, shafyorlar, maosh va moliya — bitta tizimda. 14 kun bepul.",
    images: ['/opengraph-image'],
  },

  // Robots
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

  // Google Search Console verification
  // verification: { google: 'YOUR_CODE_HERE' },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#050508' },
    { media: '(prefers-color-scheme: light)', color: '#050508' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

const SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tartib CRM",
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/icons/icon-512.png`,
      "width": 512,
      "height": 512
    },
    "description": "O'zbekistondagi gilam yuvish va himchishtka sehxlari uchun #1 professional CRM/ERP tizimi.",
    "foundingLocation": { "@type": "Place", "name": "Toshkent, O'zbekiston" },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998901234567",
      "contactType": "customer support",
      "availableLanguage": ["Uzbek", "Russian"]
    },
    "sameAs": ["https://t.me/tartib_crm"]
  },
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
]

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
        {/* PWA theme color for Android Chrome */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#050508" />
        <meta name="msapplication-TileImage" content="/icons/icon-144.png" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMAS) }}
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
