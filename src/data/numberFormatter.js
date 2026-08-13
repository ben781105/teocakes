export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-UG').format(Number(amount))
}