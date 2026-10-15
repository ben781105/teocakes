import Hero from "../components/hero";
import Favourites from "../components/favourites";
import About from "../components/about";
import HowItWorks from "../components/howitworks";
import Testimonials from "../components/testimonials";
import CallToAction from "../components/calltoaction";
import Marquee from "../components/marquee";
import CategorySection from "../components/categorysection";
import TikTokSection from "../components/tiktoksection";
function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <CategorySection />
      <About />
      <TikTokSection />
      <Favourites />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </main>
  );
}

export default Home;
