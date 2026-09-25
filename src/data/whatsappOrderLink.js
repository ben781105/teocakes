import { useCart } from "../context/useCart";
export function useWhatsappOrderLink(whatsappNumber) {
  const { cart } = useCart();
  const itemCount = cart?.items?.reduce((t, i) => t + i.quantity, 0) || 0;
  const message =
    itemCount > 0
      ? `Hi! I'd like to order:\n${cart.items
          .map((i) => {
            let line = `${i.quantity}x ${i.product.name}`;
            if (i.flavour_name) line += ` (${i.flavour_name})`;
            if (i.custom_message) line += ` — message: "${i.custom_message}"`;
            return line;
          })
          .join("\n")}`
      : "Hi! I'd like to order a cake.";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
