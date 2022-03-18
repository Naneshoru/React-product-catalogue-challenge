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
            ],
            'salgados': [
              {
                "id": "4cc21cb1-55f6-419d-874f-1bafda4e42c5",
                "name": "Pão na chapa com requeijão",
                "imageUrl": "./images/4cc21cb1-55f6-419d-874f-1bafda4e42c5.jpg",
                "price": "8.5",
                "categoryName": "Salgados"
              }
            ]
          }
        },  
      },
      getCategoriesList: jest.fn().mockImplementation(() => ["bebidas-quentes", 'salgados'])
    };
  });

  it('should show the correct cart value and quantity after the click to add one item to cart', () => {
    render(<MockCatalogPageComponent />);
    
    const productGridElement = screen.getByText(/Espresso pequeno/i);

    userEvent.click(productGridElement);

    const footerElement = screen.getByText(/R\$[\s\S]*(item|itens)/);
   
    expect(footerElement).toHaveTextContent(`R$ 5,00 (1 item)`);
  })

  it('should show the correct cart value and quantity after the click to add two items to cart', () => {
    render(<MockCatalogPageComponent />);
    
    const productGridElement = screen.getByText(/Espresso pequeno/i);
    const anotherProductGridElement = screen.getByText(/Pão na chapa com requeijão/i);

    userEvent.click(productGridElement);
    userEvent.click(anotherProductGridElement);

    const footerElement = screen.getByText(/R\$[\s\S]*(item|itens)/)
   
    expect(footerElement).toHaveTextContent(`R$ 13,50 (2 itens)`)
  })
});