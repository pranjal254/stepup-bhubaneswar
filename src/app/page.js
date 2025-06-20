import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Workshops from '@/components/sections/Workshops'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Workshops />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}