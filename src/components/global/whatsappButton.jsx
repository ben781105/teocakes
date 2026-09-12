import { useWhatsappOrderLink } from "../../data/whatsappOrderLink";
import { FaWhatsapp } from "react-icons/fa6";
function WhatsappFloatButton() {
  const whatsappOrderLink = useWhatsappOrderLink("256746326666");

  return (
    <a
      href={whatsappOrderLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-6 left-5 z-40 w-14 h-14 rounded-full bg-green-500 text-white shadow-xl flex items-center justify-center  transition-all duration-300 animate-float_button "
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
}

export default WhatsappFloatButton;
