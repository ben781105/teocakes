import Hero from "../components/hero";
import Favourites from "../components/favourites";
import About from "../components/about";
import HowItWorks from "../components/howitworks";
import Testimonials from "../components/testimonials";
import CallToAction from "../components/calltoaction";
import Marquee from "../components/marquee";
function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Favourites />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </main>
  );
}

export default Home;
