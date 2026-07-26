import About from "@/features/marketing/components/about"
import FAQs from "@/features/marketing/components/faqs"
import HeroSection from "@/features/marketing/components/hero-section"
import Popular from "@/components/ui/popular"
import Testimonials from "@/features/marketing/components/testimonials"

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