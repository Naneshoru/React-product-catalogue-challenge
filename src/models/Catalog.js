import React, { createContext, useContext } from "react";

import ExampleCatalog from "../assets/ExampleCatalog.json";

import { textToVariableName } from "../utils/Functions"

export const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const categorize = (products) => {
    let productsInCategories = {};
    
    products.forEach((product) => {
      const category = textToVariableName(product.categoryName);
      productsInCategories[category] = productsInCategories[category] || []
      productsInCategories[category].push(product);
    })

    return productsInCategories;
  }

  const catalog = {
    products: { categories: categorize(ExampleCatalog.products) },
  };

  const getCategoriesList = () => 
    Object.keys(catalog.products.categories);
    
  return (
    <CatalogContext.Provider value={{ catalog, getCategoriesList }}>
      {children}
    </CatalogContext.Provider>
  );
};

export function useCatalog() {
  return useContext(CatalogContext);
}
