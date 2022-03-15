import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const getItemsQuantity = () => 
    items.reduce((acc, item) => acc + item.quantity, 0);

  const getItemTotal = () => 
    items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  const addToCart = (product) => {
    const filteredItems = items.filter(item => item.name !== product.name);
  
    product.quantity = product.quantity + 1 || 1;
    setItems([...filteredItems, product]);
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
