// src/context/CartContext.jsx

import {useEffect, useState } from 'react'
import { getCart, addToCart,removeCartItem,updateCartItem ,setCartPhone,recoverCartByPhone} from '../services/cartService'
import {CartContext} from './cartContext'
 
function CartProvider({ children }) {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

 
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart()
        setCart(data)
      } catch (error) {
        console.error('Error fetching cart:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

 
  const addItem = async (productId, quantity = 1) => {
    try {
      const updatedCart = await addToCart(productId, quantity)

      setCart(updatedCart)

      return updatedCart
    } catch (error) {
      console.error('Error adding item to cart:', error)
      throw error
    }
  }

  const removeItem = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId)

      setCart(updatedCart)

      return updatedCart
    } catch (error) {
      console.error('Error removing item from cart:', error)
      throw error
    }
  }

  const updateItem = async (productId, quantity) => {
  try {
    const updatedCart = await updateCartItem(productId, quantity)
    setCart(updatedCart)
    return updatedCart
  } catch (error) {
    console.error('Error updating cart item:', error)
    throw error
  }
}

 const confirmPhone = async (phoneNumber) => {
    try {
      const updatedCart = await setCartPhone(phoneNumber)
      setCart(updatedCart)
      return updatedCart
    } catch (error) {
      console.error('Error setting cart phone:', error)
      throw error
    }
  }

 const recoverCart = async (phoneNumber) => {
    try {
      const recoveredCart = await recoverCartByPhone(phoneNumber)
      setCart(recoveredCart)
      return recoveredCart
    } catch (error) {
      console.error('Error recovering cart:', error)
      throw error
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        removeItem,
        updateItem,
        confirmPhone,
        recoverCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider