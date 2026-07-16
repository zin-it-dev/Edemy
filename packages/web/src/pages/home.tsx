import About from "@/components/ui/about"
import FAQs from "@/components/ui/faqs"
import HeroSection from "@/components/ui/hero-section"
import Popular from "@/components/ui/popular"
import Testimonials from "@/components/ui/testimonials"

const Home = () => {
  return (
    <>
      <HeroSection />
      <About />
      <Popular />
      <FAQs />
      <Testimonials />
    </>
  )
}

export default Home