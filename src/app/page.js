import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Workshops from '@/components/sections/Workshops'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/JsonLd'

export default function Home() {

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StepUpBhubaneswar",
    url: "https://www.stepupbhubaneswar.com",
    logo: "https://stepupbhubaneswar/logov2.png",
   
  };

  return (
    <main className="min-h-screen">
      <JsonLd data={jsonLdData} />
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