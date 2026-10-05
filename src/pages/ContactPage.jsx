import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import Container from "../components/layout/container";
import Section from "../components/layout/section";

// TODO: replace placeholders with real details before launch
const WHATSAPP_NUMBER = "256746326666";
const DISPLAY_PHONE = "+256 746 326 666";
const EMAIL = "hello@teocakes.com";

const occasions = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Graduation",
  "Baby shower",
  "Corporate / event",
  "Just because",
];

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    occasion: "",
    date: "",
    details: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [`Hi! My name is ${form.name || "there"}.`];
    if (form.occasion) lines.push(`Occasion: ${form.occasion}`);
    if (form.date) lines.push(`Needed by: ${form.date}`);
    if (form.details) lines.push(`\n${form.details}`);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const inputClass =
    "w-full border border-cream-dark rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brick transition-colors";
  const labelClass =
    "text-xs uppercase tracking-wide font-medium text-espresso mb-2 block";

  return (
    <>
      <Helmet>
        <title>Contact TeoCakes — Order a Cake in Entebbe</title>
        <meta
          name="description"
          content="Get in touch with TeoCakes. Message us on WhatsApp to order a handmade birthday, wedding or custom cake in Entebbe."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-espresso py-16 md:py-24">
        <Container fullWidth>
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-script text-brick text-2xl lg:text-3xl mb-3">
              Get in touch
            </p>
            <h1 className="text-cream font-medium mb-4">
              Let us bake something for you
            </h1>
            <p className="text-cream/80">
              Tell us what you are celebrating and we will come back with a
              design, a price and a pickup time. Most messages are answered the
              same day.
            </p>
          </div>
        </Container>
      </section>

      <Section className="bg-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-6 md:gap-8">
          {/* Left column — details */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-white border border-cream-dark rounded-2xl p-6">
              <h2 className="text-xl mb-5 pb-4 border-b border-cream-dark">
                Contact details
              </h2>

              <ul className="flex flex-col gap-5">
                <li className="flex gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-cream flex items-center justify-center">
                    <MessageCircle
                      className="w-4 h-4 text-brick"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className={labelClass}>WhatsApp</p>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-espresso hover:text-brick transition-colors"
                    >
                      Chat with us
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    <p className="text-xs mt-0.5">
                      The fastest way to reach us
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-cream flex items-center justify-center">
                    <Phone className="w-4 h-4 text-brick" aria-hidden="true" />
                  </div>
                  <div>
                    <p className={labelClass}>Phone</p>
                    <a
                      href={`tel:+${WHATSAPP_NUMBER}`}
                      className="text-sm text-espresso hover:text-brick transition-colors"
                    >
                      {DISPLAY_PHONE}
                    </a>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-cream flex items-center justify-center">
                    <Mail className="w-4 h-4 text-brick" aria-hidden="true" />
                  </div>
                  <div>
                    <p className={labelClass}>Email</p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-sm text-espresso hover:text-brick transition-colors break-all"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-cream flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-brick" aria-hidden="true" />
                  </div>
                  <div>
                    <p className={labelClass}>Pickup</p>
                    <p className="text-sm text-espresso">Entebbe, Uganda</p>
                    <p className="text-xs mt-0.5">
                      We are a home bakery. We share the exact pickup point once
                      your order is confirmed.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-cream flex items-center justify-center">
                    <Clock className="w-4 h-4 text-brick" aria-hidden="true" />
                  </div>
                  <div>
                    <p className={labelClass}>Ordering hours</p>
                    <p className="text-sm text-espresso">
                      [PLACEHOLDER] Mon – Sat, 8:00 AM – 7:00 PM
                    </p>
                    <p className="text-xs mt-0.5">
                      [PLACEHOLDER] Please allow 24–48 hours notice for most
                      cakes.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-cream-dark rounded-2xl p-6">
              <h2 className="text-xl mb-3">Follow along</h2>
              <p className="text-sm mb-5">
                New cakes, seasonal flavours and a look behind the kitchen.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com"
                  aria-label="Follow TeoCakes on Instagram"
                  className="w-10 h-10 rounded-full bg-cream flex items-center justify-center hover:bg-brick group transition-colors duration-300"
                >
                  <FaInstagram
                    className="w-5 h-5 text-brick group-hover:text-cream transition-colors duration-300"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="https://www.facebook.com"
                  aria-label="Follow TeoCakes on Facebook"
                  className="w-10 h-10 rounded-full bg-cream flex items-center justify-center hover:bg-brick group transition-colors duration-300"
                >
                  <FaFacebook
                    className="w-5 h-5 text-brick group-hover:text-cream transition-colors duration-300"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="https://www.tiktok.com"
                  aria-label="Follow TeoCakes on TikTok"
                  className="w-10 h-10 rounded-full bg-cream flex items-center justify-center hover:bg-brick group transition-colors duration-300"
                >
                  <FaTiktok
                    className="w-5 h-5 text-brick group-hover:text-cream transition-colors duration-300"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="https://www.x.com"
                  aria-label="Follow TeoCakes on X"
                  className="w-10 h-10 rounded-full bg-cream flex items-center justify-center hover:bg-brick group transition-colors duration-300"
                >
                  <FaXTwitter
                    className="w-5 h-5 text-brick group-hover:text-cream transition-colors duration-300"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div className="md:col-span-3">
            <div className="bg-white border border-cream-dark rounded-2xl p-6 md:p-8">
              <h2 className="text-xl mb-2">Tell us about your cake</h2>
              <p className="text-sm mb-6">
                Fill this in and it opens WhatsApp with your details already
                written out. You just hit send.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah"
                    className={inputClass}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="occasion" className={labelClass}>
                      Occasion
                    </label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={form.occasion}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select an occasion</option>
                      {occasions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="date" className={labelClass}>
                      Needed by
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="details" className={labelClass}>
                    What are you after?
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={5}
                    value={form.details}
                    onChange={handleChange}
                    placeholder="Flavour, size, colours, a message to pipe on top, or anything else you have in mind."
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brick text-cream py-3 rounded-lg font-medium shadow-md hover:shadow-xl hover:bg-brick-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  Continue on WhatsApp
                  <span className="sr-only">(opens in a new tab)</span>
                </button>

                <p className="text-xs text-center">
                  Prefer to browse first?{" "}
                  <Link to="/menu" className="text-brick hover:underline">
                    See the menu
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/custom-order"
                    className="text-brick hover:underline"
                  >
                    request a custom cake
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export default ContactPage;
