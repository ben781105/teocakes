export const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-UG").format(Number(amount));
};

export const buildOrderMessage = (order) => {
  const header = `🎂 *New Order*\n`;

  const items = order.items
    .map((item) => {
      const lines = [];
      lines.push(`*${item.product_name}*`);

      const details = [`Qty: ${item.quantity}`];
      if (item.flavour_name) details.push(`Flavour: ${item.flavour_name}`);
      lines.push(details.join("  •  "));

      if (item.custom_message) {
        lines.push(`Message on cake: "${item.custom_message}"`);
      }

      lines.push(`Ugx ${formatPrice(item.subtotal)}`);
      return lines.join("\n");
    })
    .join("\n\n");

  const shortId = order.order_id.slice(0, 8).toUpperCase();

  const footer =
    `\n\n━━━━━━━━━━━━━━━\n` +
    `*Total: Ugx ${formatPrice(order.total)}*\n` +
    `Order ref: ${shortId}`;

  return `${header}\n${items}${footer}`;
};
