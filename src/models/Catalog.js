import React, { createContext, useContext } from "react";

import ExampleCatalog from "../assets/ExampleCatalog.json";

import { textToVariableName } from "../utils/Functions"

export const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const categorize = (products) => {
    let productsInCategories = {};
    
    products.forEach((product) => {
      const newField = textToVariableName(product.categoryName);
      productsInCategories[newField] = productsInCategories[newField] || []
      productsInCategories[newField].push(product);
    })

    return productsInCategories;
  }

  const catalog = {
    products: { categories: categorize(ExampleCatalog.products) },
  };

  return (
    <CatalogContext.Provider value={{ catalog }}>
      {children}
    </CatalogContext.Provider>
  );
};

export function useCatalog() {
  return useContext(CatalogContext);
}
