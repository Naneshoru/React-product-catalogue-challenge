import { fireEvent, render, screen } from "@testing-library/react";
import CatalogPage from "./Catalog";
import { CatalogProvider } from "../models/Catalog";
import { CartProvider } from "../models/Cart";

const SampleApp = () => (
  <CatalogProvider>
    <CartProvider>
      <CatalogPage />
    </CartProvider>
  </CatalogProvider>
)

describe('Testar o funcionamento do carrinho e adição de itens', () => {
  it('Deve exibir a contagem do valor e quantidade do carrinho vazio ao iniciar a aplicação', async () => {
    // const { container } = render(<SampleApp />);
    // logRoles(container)
    render(<SampleApp />);
    const total = await screen.findByText(/R\$ 0,00 \(0 itens\)/)
    expect(total).toBeInTheDocument()
  });
  it('Deve adicionar um item 2x ao carrinho e exibir a quantidade e valor correto', async () => {
    render(<SampleApp />);
    const itemName = "Espresso pequeno";
    const itemPrice = 5;
    let itemCount = 0;
    let totalPrice = 0;
 
    const elem = await screen.findByText(new RegExp(itemName, "i"));

    fireEvent.click(elem);
    itemCount += 1;
    totalPrice += itemPrice;

    let total = await screen.findByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} item\\)`));
    expect(total).toBeInTheDocument();

    fireEvent.click(elem);
    itemCount += 1;
    totalPrice += itemPrice;

    total = await screen.findByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} itens\\)`));
    expect(total).toBeInTheDocument();
  });
  it('Deve adicionar dois itens diferentes ao carrinho e exibir a quantidade e valor correto', async () => {
    render(<SampleApp />);
    const itemName = "Espresso pequeno";
    const itemPrice = 5;
    let itemCount = 0;
    let totalPrice = 0;

    const elem = await screen.findByText(new RegExp(itemName, "i"));

    fireEvent.click(elem);
    itemCount += 1;
    totalPrice += itemPrice;

    let total = await screen.findByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} item\\)`)); 
    expect(total).toBeInTheDocument();

    const itemName2 = "Pão na chapa com requeijão";
    const itemPrice2 = 8.5;

    const elem2 = await screen.findByText(new RegExp(itemName2, "i"));
    fireEvent.click(elem2);
    itemCount += 1;
    totalPrice += itemPrice2;
    let total2 = await screen.findByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} itens\\)`));
    expect(total2).toBeInTheDocument();
  });

  it('Deve adicionar dez itens, com dois tipos diferentes ao carrinho e exibir a quantidade e valor correto', async () => {
    render(<SampleApp />);
    const itemName = "Espresso pequeno";
    const itemPrice = 5;
    let itemCount = 0;
    let totalPrice = 0;

    const elem = await screen.findByText(new RegExp(itemName, "i"));

    for(let i = 0; i < 5; i++) {
      fireEvent.click(elem);
      itemCount += 1;
      totalPrice += itemPrice;
    }

    let total = await screen.findByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} itens\\)`)); 
    expect(total).toBeInTheDocument();

    const itemName2 = "Pão na chapa com requeijão";
    const itemPrice2 = 8.5;

    for(let i = 0; i < 5; i++) {
      const elem2 = await screen.findByText(new RegExp(itemName2, "i"));
      fireEvent.click(elem2);
      itemCount += 1;
      totalPrice += itemPrice2;
    }
    let total2 = await screen.findByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} itens\\)`));
    expect(total2).toBeInTheDocument();
  });

  it('Deve fazer a request para o catálogo e popular a página com as imagens', async () => {
    render(<SampleApp />)
    const elements = await screen.findAllByText(/R\$/);
    expect(elements.length).toBeGreaterThan(0);

    const element = await screen.findByText(/R\$/);
    const parentElement = element.closest('.MuiBox-root');

    expect(parentElement).toHaveStyle(`background-image: url`)

    expect(parentElement).not.toHaveStyle(`background-image: url("../assets/images/empty-image-300x240.jpg")`)

  })
})