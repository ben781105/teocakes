import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Section from "../components/layout/section";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | TeoCakes</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Section className="bg-cream">
        <div className="max-w-xl mx-auto text-center py-12">
          <p className="font-script text-brick text-2xl lg:text-3xl mb-2">
            Nothing baking here
          </p>
          <h1 className="text-espresso font-medium mb-3">
            We couldn't find that page
          </h1>
          <p className="text-brown mb-8">
            The page you're looking for may have moved, or the link might have a
            typo in it. Our cakes are still where you left them.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/menu"
              className="text-base px-6 py-3 rounded-lg font-medium bg-brick text-cream  hover:shadow-xl hover:bg-brick-hover hover:-translate-y-0.5 transition-all duration-300 shadow-md"
            >
              Browse the menu
            </Link>
            <Link
              to="/"
              className="text-base border font-medium shadow-md  border-espresso text-espresso px-6 py-3 rounded-lg  hover:bg-espresso hover:text-cream hover:-translate-y-0.5 transition-all duration-300"
            >
              Back home
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

export default NotFound;
