import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-5 z-40 w-13 h-13 rounded-full bg-brick text-cream shadow-lg flex items-center justify-center  transition-all duration-300 "
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}

export default ScrollToTopButton;
