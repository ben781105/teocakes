import { useEffect, useState, useCallback, useMemo } from "react";
import {
  getCart,
  addToCart,
  removeCartItem,
  updateCartItem,
  setCartPhone,
} from "../services/cartService";
import { CartContext } from "./cartContext";

function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addItem = useCallback(async (productId, quantity = 1, options = {}) => {
    try {
      const updatedCart = await addToCart(productId, quantity, options);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  }, []);

  const removeItem = useCallback(async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  }, []);

  const updateItem = useCallback(async (productId, quantity) => {
    try {
      const updatedCart = await updateCartItem(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  }, []);

  const confirmPhone = useCallback(async (phoneNumber) => {
    try {
      const response = await setCartPhone(phoneNumber);
      setCart(response.cart);
      return response.order;
    } catch (error) {
      console.error("Error setting cart phone:", error);
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      loading,
      addItem,
      removeItem,
      updateItem,
      confirmPhone,
    }),
    [cart, loading, addItem, removeItem, updateItem, confirmPhone],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
