import './globals.css'

export const metadata = {
  title: "Tartib CRM — O'zbekiston №1 CRM Tizimi | Gilam Yuvish ERP",
  description: "Gilam yuvish va himchishtka sehxlari uchun professional CRM. Buyurtmalar, shafyorlar, maosh va moliya — bitta tizimda. 12,847+ kompaniya ishlatmoqda.",
  keywords: ["CRM Uzbekistan", "gilam yuvish", "himchishtka", "O'zbekiston CRM", "ERP tizim"],
  authors: [{ name: "Tartib CRM" }],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://tartibcrm.uz",
    title: "Tartib CRM — Gilam Yuvish Sehxi uchun #1 ERP",
    description: "Buyurtmalar, shafyorlar, ishchilar, maosh va moliya — barchasini bitta tizimda boshqaring.",
    siteName: "Tartib CRM",
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
          precedence="default"
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
