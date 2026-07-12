import DemoPage from './DemoPage'

export const metadata = {
  title: "Demo olish — Tartib CRM ni 14 kun bepul sinang",
  description: "Tartib CRM demo so'rovi. 14 kunlik bepul sinov, karta shart emas. 1 soat ichida sozlanadi.",
  alternates: { canonical: 'https://tartibcrm.uz/demo' },
  openGraph: {
    title: "Tartib CRM — Bepul Demo Olish",
    description: "14 kunlik bepul sinov. Gilam yuvish sehxingizni raqamli tartibga soling.",
    url: 'https://tartibcrm.uz/demo',
  },
}

export default function Page() {
  return <DemoPage />
}
