import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(null);

  const getItemsQuantity = () => 
    items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  const getItemTotal = () => 
    items?.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0) ?? 0; 

  const addToCart = (product) => {
    setItems(prev => {
      if (prev) {
        const productFound = prev.find((item) => item.name === product.name)
        if (productFound) {
          return prev.map((item) => {
            if (item.name === product.name) {
              return { ...item, quantity: item.quantity + 1 }
            }
            return item
          })
        } else {
          return [...prev, { ...product, quantity: 1 }]
        }
      }

      return [{ ...product, quantity: 1 }]
    });
  }

  return (
    <CartContext.Provider
      value={{ cart: { items, total: getItemTotal() }, addToCart, getItemsQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
