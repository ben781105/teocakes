import { Search, PackageCheck } from "lucide-react";
import Section from "./layout/section";
import { FaWhatsapp } from "react-icons/fa6";

const steps = [
  {
    icon: Search,
    title: "Browse the menu",
    description:
      "Look through available cakes or describe the custom design you have in mind.",
  },
  {
    icon: FaWhatsapp,
    title: "Message us on WhatsApp",
    description:
      "Send your order and we'll confirm details, pricing, and pickup time with you directly.",
  },
  {
    icon: PackageCheck,
    title: "Pick up your cake",
    description:
      "Collect your cake on the agreed date, fresh and ready to celebrate.",
  },
];

function HowItWorks() {
  return (
    <Section id="howitworks" className="bg-cream-dark">
      <p className="font-script text-2xl  lg:text-3xl text-brick text-center mb-2">
        It's this simple
      </p>
      <h2 className="font-medium text-espresso text-center ">
        From order to pickup
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
        {steps.map(({ icon: Icon, title, description }, index) => (
          <div
            key={title}
            className="flex flex-col items-center text-center border border-cream bg-white rounded-xl p-6"
          >
            <div className="w-14 h-14 rounded-full bg-brick flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-cream" aria-hidden="true" />
            </div>
            <p className="font-body font-medium text-brick mb-1">
              Step {index + 1}
            </p>
            <h3 className="font-heading font-medium text-espresso mb-1">
              {title}
            </h3>
            <p className="font-body text-brown max-w-xs">{description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default HowItWorks;
