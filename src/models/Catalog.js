import React, { createContext, useContext, useState } from "react";
import { textToVariableName } from "../utils/Functions";
import ExampleCatalog from '../assets/ExampleCatalog.json'

export const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const [catalog, setCatalog] = useState(null);
  function categorize(products) {
    let productsInCategories = {};
    
    products.forEach((product) => {
      const category = textToVariableName(product.categoryName);
      productsInCategories[category] = productsInCategories[category] || []
      productsInCategories[category].push(product);
    });
  
    return productsInCategories;
  }
  
  const getCatalog = async () => {
    try {
      console.log('Fake Fetching catalog...');
      // const response = await fetch('/catalog');
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      
      const data = {
        products: { categories: categorize(ExampleCatalog.products) },
      }

      setTimeout(() => 
        new Promise((res, rej) => 
          res(data)).then((res) => setCatalog(res))
      , 1000)
    } catch (error) {
      console.error('Failed to fetch catalog:', error);
    }
  };

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
