import { Link } from "react-router-dom";
import Section from "./layout/section";

function About() {
  return (
    <Section id="about" className="bg-cream-dark">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-script text-brick text-2xl lg:text-3xl mb-1">
          Welcome to TeoCakes
        </p>
        <h2 className="mb-3">
          A Home Bakery In <span className="text-brick">Entebbe</span>
        </h2>
        <p className="mb-6">
          Every cake is baked from scratch, to order, by one pair of hands. Real
          butter, real ingredients, and a design built around whatever you're
          celebrating.
        </p>
        <Link
          to="/about"
          className="inline-block font-medium text-brick border-b border-brick pb-0.5 hover:text-brick-hover hover:border-brick-hover transition-colors duration-300"
        >
          Read our story &rarr;
        </Link>
      </div>
    </Section>
  );
}

export default About;
