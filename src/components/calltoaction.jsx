import Section from "./layout/section";
import { useWhatsappOrderLink } from "../data/whatsappOrderLink";
import { FaWhatsapp } from "react-icons/fa6";

function CallToAction() {
  const whatsappOrderLink = useWhatsappOrderLink("256746326666");

  return (
    <Section>
      <div className="relative border bg-espresso rounded-3xl z-10 h-full flex flex-col items-center justify-center text-center px-6 py-9">
        <p className=" font-script text-brick text-2xl  lg:text-3xl font-medium tracking-wide mb-3">
          Ordering made simple
        </p>
        <h2 className="text-cream">Order your cake directly on WhatsApp</h2>
        <p className="text-cream mt-3 max-w-md">
          No sign-ups, no waiting. Message us your order and we'll confirm
          availability, pricing, and pickup details right away.
        </p>

        <a
          href={whatsappOrderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2  bg-brick text-cream hover:text-white hover:bg-brick-hover px-6 py-3 rounded-lg font-medium hover:-translate-y-0.5 transition-all duration-300 hover:shadow-xl"
        >
          <FaWhatsapp className="w-5 h-5" />
          Order on WhatsApp
        </a>
      </div>
    </Section>
  );
}

export default CallToAction;
