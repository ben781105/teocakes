import api from "../api/axios"

const CART_ID_KEY = "cart_id"

export const getCartId = () => {
  let cartId = localStorage.getItem(CART_ID_KEY)
  if (!cartId) {
    cartId = crypto.randomUUID()
    localStorage.setItem(CART_ID_KEY, cartId)
  }
  return cartId
}

export const getCart = async () => {
  const cartId = getCartId()
  const response = await api.get(`/cart/${cartId}/`)
    console.log("fetched cart", response.data)
  return response.data
}

export const addToCart = async (productId, quantity = 1) => {
  const cartId = getCartId()
  const response = await api.post(`/cart/${cartId}/add/`, {
    product_id: productId,
    quantity
  })
  console.log(response.data)
  return response.data
}

export const updateCartItem = async (itemId, quantity) => {
  const cartId = getCartId()
  const response = await api.patch(`/cart/${cartId}/items/${itemId}/`, {
    quantity
  })
  return response.data
}

export const removeCartItem = async (itemId) => {
  const cartId = getCartId()
  const response = await api.delete(`/cart/${cartId}/items/${itemId}/`)
  return response.data
}

export const setCartPhone = async (phoneNumber) => {
  const cartId = getCartId()
  const response = await api.patch(`/cart/${cartId}/set-phone/`, {
    phone_number: phoneNumber
  })
  return response.data
}

export const recoverCartByPhone = async (phoneNumber) => {
  const response = await api.get(`/cart/by-phone/`, {
    params: { phone: phoneNumber }
  })
 
  localStorage.setItem(CART_ID_KEY, response.data.cart_id)
  return response.data
}