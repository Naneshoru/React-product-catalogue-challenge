import CatalogPage from "./Catalog";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CatalogContext } from "../models/Catalog";
import { CartProvider } from "../models/Cart";

let catalogValue;
const MockCatalogPageComponent = () => (
  // Mockando apenas o contexto do catalog
  <CatalogContext.Provider value={ catalogValue }> 
    <CartProvider >
      <CatalogPage />
    </CartProvider>
  </CatalogContext.Provider>
)

describe('Catalog Page', () => {
  beforeEach(() => {
    catalogValue = { 
      catalog: { 
        products: {
          categories: {
            'bebidas-quentes': [ 
              {
                "id": "6400c151-2bd6-4446-b0a5-4f1e33954051",
                "name": "Espresso pequeno",
                "imageUrl": "./images/6400c151-2bd6-4446-b0a5-4f1e33954051.jpg",
                "price": "5",
                "categoryName": "Bebidas quentes"
              }
            ]
          }
        },  
      },
      getCategoriesList: jest.fn().mockImplementation(() => ["bebidas-quentes"])
    };
  });

  it.only('should show the correct cart value and quantities after the click to add to cart', async () => {
    render(<MockCatalogPageComponent />);
    
    const productGridElement = screen.getByText(/Espresso pequeno/i)

    userEvent.click(productGridElement);

    const footerElement = screen.getByText(/R\$[\s\S]*(item|itens)/)
   
    expect(footerElement).toHaveTextContent(`R$ 5,00 (1 itens)`)
  })
});