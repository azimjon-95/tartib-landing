import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import MapSection from './components/MapSection'
import Screenshots from './components/Screenshots'
import FAQ from './components/FAQ'
import DemoForm from './components/DemoForm'
import Footer from './components/Footer'
import SkipLink from './components/SkipLink'
import ServiceWorker from './components/ServiceWorker'

export default function HomePage() {
  return (
    <>
      <ServiceWorker />
      <SkipLink />
      <Nav />
      <main id="main-content">
        <Hero />
        <MapSection />
        <Features />
        <HowItWorks />
        <Screenshots />
        <FAQ />
        <DemoForm />
      </main>
      <Footer />
    </>
  )
}
