import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([
    {
      "id": "6400c151-2bd6-4446-b0a5-4f1e33954051",
      "name": "Espresso pequeno",
      "imageUrl": "./images/6400c151-2bd6-4446-b0a5-4f1e33954051.jpg",
      "price": "5",
      "categoryName": "Bebidas quentes"
    },
    {
      "id": "6a84952b-1111-43be-bc3c-0823466c0363",
      "name": "Mochaccino",
      "imageUrl": "./images/6a84952b-1111-43be-bc3c-0823466c0363.jpg",
      "price": "8",
      "categoryName": "Bebidas quentes"
    },
  ]);

  const getItemTotal = () => 
    items.reduce((acc, item) => acc + parseFloat(item.price), 0);
    console.log("TODO: should compute card total");

  const addToCart = (product) => {
    console.log("TODO: add to cart product", product);
    setItems([ ...items, product ]);
  }

  return (
    <CartContext.Provider
      value={{ cart: { items, total: getItemTotal() }, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
