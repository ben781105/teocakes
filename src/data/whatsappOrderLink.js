import { useCart } from "../context/useCart";
import { formatPrice } from "./numberFormatter";
export function useWhatsappOrderLink(whatsappNumber) {
  const { cart } = useCart();
  console.log(cart?.items?.[0]);
  const itemCount = cart?.items?.reduce((t, i) => t + i.quantity, 0) || 0;
  const message =
    itemCount > 0
      ? `Hi! I'd like to order: ${cart.items.map((i) => `${i.quantity}x  ${i.product.name}  @ ${formatPrice(i.product.price ?? 0)}`).join(", ")}`
      : "Hi! I'd like to order a cake.";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
