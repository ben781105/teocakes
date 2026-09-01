export const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-UG").format(Number(amount));
};

export const buildOrderMessage = (order) => {
  const header = `🎂 *New Order*\n\n`;

  const items = order.items
    .map((item) => {
      return `• ${item.product_name} x${item.quantity} — Ugx ${formatPrice(item.subtotal)}`;
    })
    .join("\n");

  const footer = `\n\n*Total: Ugx ${formatPrice(order.total)}*\n\nOrder ID: ${order.order_id}`;

  return header + items + footer;
};
