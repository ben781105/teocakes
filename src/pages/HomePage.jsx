import Hero from '../components/hero'
import Favourites from '../components/favourites'
import About from '../components/about'
import Menu from '../components/menu'
import HowItWorks from '../components/howitworks'
import Testimonials from '../components/testimonials'
import CallToAction from '../components/calltoaction'
function Home() {
  return (
    <main>
      <Hero />
      <Favourites />
      <About />
      <Menu/>
      <HowItWorks />
      <Testimonials/>
      <CallToAction />
    </main>
  )
}

export default Home