export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-UG').format(Number(amount))
}

 export const buildOrderMessage = (cart) => {
  const header = `🎂 *New Order*\n\n`

  const items = cart.items
    .map((item) => {
      const subtotal = item.quantity * item.product.price
      return `• ${item.product.name} x${item.quantity} — Ugx ${formatPrice(subtotal)}`
    })
    .join('\n')

  const footer = `\n\n*Total: Ugx ${formatPrice(cart.total)}*\n\nCart ID: ${cart.cart_id}`

  return header + items + footer
}