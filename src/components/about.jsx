import aboutImage from "../assets/about.jpg";
import Section from "./layout/section";
import { Link } from "react-router-dom";
function About() {
  return (
    <Section id="about " className="bg-cream-dark">
      <div className="relative flex flex-col gap-10 md:gap-15 md:flex-row ">
        <div className="w-full aspect-square">
          <img
            src={aboutImage}
            alt="About TeoCakes"
            className="object-cover w-full h-full rounded-3xl border-7 border-white shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-script text-brick text-2xl  lg:text-3xl ">
            Welcome to TeoCakes
          </p>
          <h2>
            Cakes baked with passion, made for your <span>celebration</span>
          </h2>
          <p>
            At TeoCakes, every cake starts from scratch with real butter and
            real ingredients. We blend traditional baking techniques with fresh,
            creative flavors to craft cakes that feel personal and made just for
            you. Birthdays, weddings, or a reason you just made up, we bake it
            like it matters.
          </p>
          <Link
            to="/menu"
            className="w-[45%] sm:w-[30%] border text-center py-3  rounded-lg mt-5 font-medium bg-brick text-cream shadow-md hover:shadow-xl hover:bg-brick-hover hover:-translate-y-0.5 transition-all duration-300"
          >
            Explore our menu
          </Link>
        </div>
      </div>
    </Section>
  );
}
export default About;
