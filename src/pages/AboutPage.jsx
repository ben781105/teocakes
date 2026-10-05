import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check } from "lucide-react";
import Container from "../components/layout/container";
import Section from "../components/layout/section";
import { getCategories } from "../services/categoryService";
import { useWhatsappOrderLink } from "../data/whatsappOrderLink";
import aboutImage from "../assets/about.webp";

// TODO: replace with real figures before launch
const stats = [
  { value: "[X]+", label: "Cakes baked" },
  { value: "[X]", label: "Years baking" },
  { value: "[X]+", label: "Happy customers" },
];

const process = [
  {
    title: "Made to order",
    body: "Nothing sits on a shelf. Every cake is baked after you order it, so it reaches you fresh on the day you need it.",
  },
  {
    title: "Real ingredients",
    body: "Real butter, fresh eggs, proper chocolate. We bake from scratch rather than from a packet mix, and you can taste the difference.",
  },
  {
    title: "Your design, your way",
    body: "Flavours, colours, a message piped on top. Tell us what you are celebrating and we will build the cake around it.",
  },
];

const reasons = [
  {
    title: "One baker, start to finish",
    body: "Your cake is made by the same person who takes your order, so nothing gets lost along the way.",
  },
  {
    title: "Order in a chat",
    body: "No accounts, no checkout forms. Message us on WhatsApp and we will confirm your design, price and pickup time directly.",
  },
  {
    title: "Fresh for your date",
    body: "We bake around your celebration, not our schedule. Give us a day or two of notice and your cake will be ready when you need it.",
  },
];

function AboutPage() {
  const [categories, setCategories] = useState([]);
  const whatsappOrderLink = useWhatsappOrderLink("256746326666");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => console.error("error fetching categories", err));
  }, []);

  return (
    <>
      <Helmet>
        <title>About TeoCakes — Home Bakery in Entebbe</title>
        <meta
          name="description"
          content="TeoCakes is a home bakery in Entebbe making handmade birthday, wedding and custom cakes to order. Baked from scratch, one cake at a time."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-espresso py-16 md:py-24">
        <Container fullWidth>
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-script text-brick text-2xl lg:text-3xl mb-3">
              Our story
            </p>
            <h1 className="text-cream font-medium mb-4">
              Handmade cakes, baked one at a time
            </h1>
            <p className="text-cream/80">
              TeoCakes is a small home bakery in Entebbe. Every cake is made to
              order, from scratch, for the people celebrating something.
            </p>
          </div>
        </Container>
      </section>

      {/* Who we are */}
      <Section className="bg-cream">
        <div className="max-w-6xl mx-auto">
          <p className="font-script text-brick text-2xl lg:text-3xl mb-6">
            Who we are
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex flex-col gap-4">
              <h2>A home bakery built on one thing: good cake</h2>
              <p>
                TeoCakes started in a home kitchen in Entebbe and has stayed
                there. [PLACEHOLDER: a few lines on how Teo started baking, what
                drew her to it, and roughly when.]
              </p>
              <p>
                We bake birthday cakes, wedding cakes and custom designs for
                celebrations across Entebbe and the surrounding area. Every
                order is handled personally, from the first WhatsApp message to
                the moment you collect your cake.
              </p>
            </div>

            <div className="aspect-square rounded-3xl overflow-hidden">
              <img
                src={aboutImage}
                alt="Freshly baked cakes at TeoCakes"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12 max-w-xl">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-cream-dark rounded-xl px-4 py-5 text-center"
              >
                <p className="font-heading text-espresso text-2xl md:text-3xl font-medium">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wide mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How every cake is made */}
      <Section className="bg-cream-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="font-script text-brick text-2xl lg:text-3xl mb-2">
              How we bake
            </p>
            <h2>What goes into every cake</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {process.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-cream rounded-xl p-6"
              >
                <h3 className="mb-2">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What we bake */}
      <Section className="bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="font-script text-brick text-2xl lg:text-3xl mb-2">
              Our range
            </p>
            <h2>What we bake</h2>
            <p className="mt-3">
              From a simple vanilla sponge to a tiered wedding cake, every one
              made to order.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/${category.slug}`}
                className="bg-white border border-cream-dark rounded-xl px-4 py-5 text-center hover:border-brick hover:-translate-y-0.5 transition-all duration-300"
              >
                <p className="font-heading font-medium text-espresso">
                  {category.name}
                </p>
                {category.product_count > 0 && (
                  <p className="text-xs mt-1">
                    {category.product_count} cake
                    {category.product_count === 1 ? "" : "s"}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Why customers choose us */}
      <Section className="bg-cream-dark">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="aspect-4/3 rounded-3xl overflow-hidden order-last md:order-first">
              <img
                src={aboutImage}
                alt="A cake being finished by hand"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="font-script text-brick text-2xl lg:text-3xl mb-2">
                Why us
              </p>
              <h2 className="mb-6">Why customers come back</h2>

              <div className="flex flex-col gap-5">
                {reasons.map((reason) => (
                  <div key={reason.title} className="flex gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-brick flex items-center justify-center">
                      <Check
                        className="w-4 h-4 text-cream"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="mb-1">{reason.title}</h3>
                      <p className="text-sm">{reason.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-espresso py-16 md:py-24">
        <Container fullWidth>
          <div className="max-w-xl mx-auto text-center">
            <p className="font-script text-brick text-2xl lg:text-3xl mb-2">
              Ready when you are
            </p>
            <h2 className="text-cream mb-3">
              Let us bake your next celebration
            </h2>
            <p className="text-cream/80 mb-8">
              Browse the menu for something ready-made, or message us and we
              will design a cake around your occasion.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                to="/menu"
                className="bg-brick text-cream px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-xl hover:bg-brick-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                Browse the menu
              </Link>
              <a
                href={whatsappOrderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cream/40 text-cream px-6 py-3 rounded-lg font-medium hover:bg-cream hover:text-espresso hover:-translate-y-0.5 transition-all duration-300"
              >
                Order on WhatsApp
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default AboutPage;
