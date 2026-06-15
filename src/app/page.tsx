import Header from '@/components/header'
import Hero from '@/components/hero'
import Services from '@/components/services'
import GalleryPreview from '@/components/gallery-preview'
import Team from '@/components/team'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <GalleryPreview />
        <Team />
      </main>
      <Footer />
    </>
  )
}
