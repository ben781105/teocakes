import { useCart } from "../context/useCart";

export function useWhatsappOrderLink(whatsappNumber) {
  const { cart } = useCart();
  const itemCount = cart?.items?.reduce((t, i) => t + i.quantity, 0) || 0;
  const message =
    itemCount > 0
      ? `Hi! I'd like to order: ${cart.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}`
      : "Hi! I'd like to order a cake.";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
