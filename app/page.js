import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import MapSection from './components/MapSection'
import Screenshots from './components/Screenshots'
import FAQ from './components/FAQ'
import DemoForm from './components/DemoForm'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <MapSection />
      <Features />
      <HowItWorks />
      <Screenshots />
      <FAQ />
      <DemoForm />
      <Footer />
    </main>
  )
}
