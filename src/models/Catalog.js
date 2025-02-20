import React, { createContext, useContext, useState, useEffect } from "react";
import { textToVariableName } from "../utils/Functions";
import ExampleCatalog2 from '../assets/ExampleCatalog2.json'

export const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const [catalog, setCatalog] = useState(null);

  const getCatalog = async () => {
    try {
      console.log('Fetching catalog...');
      const response = await fetch('/catalog');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = {
        products: { categories: categorize(ExampleCatalog2.products) },
      }
      setCatalog(data);
    } catch (error) {
      console.error('Failed to fetch catalog:', error);
    }
  };

  useEffect(() => {
    getCatalog();
  }, []);

  const getCategoriesList = () => 
    catalog?.products?.categories &&
    Object.keys(catalog?.products?.categories);
    
  return (
    <CatalogContext.Provider value={{ catalog, getCatalog, getCategoriesList }}>
      {children}
    </CatalogContext.Provider>
  );
};

export function useCatalog() {
  return useContext(CatalogContext);
}

export default function categorize(products) {
  let productsInCategories = {};
  
  products.forEach((product) => {
    const category = textToVariableName(product.categoryName);
    productsInCategories[category] = productsInCategories[category] || []
    productsInCategories[category].push(product);
  });

  return productsInCategories;
}
