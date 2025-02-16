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
  it('Deve exibir a contagem do valor e quantidade do carrinho vazio ao iniciar a aplicação', () => {
    // const { container } = render(<SampleApp />);
    // logRoles(container)
    render(<SampleApp />);
    const total = screen.getByText(/R\$ 0,00 \(0 itens\)/)
    expect(total).toBeInTheDocument()
  });
  it('Deve adicionar um item 2x ao carrinho e exibir a quantidade e valor correto', () => {
    render(<SampleApp />);
    const itemName = "Espresso pequeno";
    const itemPrice = 5;
    let itemCount = 0;
    let totalPrice = 0;
 
    const elem = screen.getByText(new RegExp(itemName, "i"));

    fireEvent.click(elem);
    itemCount += 1;
    totalPrice += itemPrice;

    let total = screen.getByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} item\\)`));
    expect(total).toBeInTheDocument();

    fireEvent.click(elem);
    itemCount += 1;
    totalPrice += itemPrice;

    total = screen.getByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} itens\\)`));
    expect(total).toBeInTheDocument();
  });
  it('Deve adicionar dois itens diferentes ao carrinho e exibir a quantidade e valor correto', () => {
    render(<SampleApp />);
    const itemName = "Espresso pequeno";
    const itemPrice = 5;
    let itemCount = 0;
    let totalPrice = 0;

    const elem = screen.getByText(new RegExp(itemName, "i"));

    fireEvent.click(elem);
    itemCount += 1;
    totalPrice += itemPrice;

    let total = screen.getByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} item\\)`)); 
    expect(total).toBeInTheDocument();

    const itemName2 = "Pão na chapa com requeijão";
    const itemPrice2 = 8.5;

    const elem2 = screen.getByText(new RegExp(itemName2, "i"));
    fireEvent.click(elem2);
    itemCount += 1;
    totalPrice += itemPrice2;
    let total2 = screen.getByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} itens\\)`));
    expect(total2).toBeInTheDocument();
  });

  it('Deve adicionar dez itens, com dois tipos diferentes ao carrinho e exibir a quantidade e valor correto', () => {
    render(<SampleApp />);
    const itemName = "Espresso pequeno";
    const itemPrice = 5;
    let itemCount = 0;
    let totalPrice = 0;

    const elem = screen.getByText(new RegExp(itemName, "i"));

    for(let i = 0; i < 5; i++) {
      fireEvent.click(elem);
      itemCount += 1;
      totalPrice += itemPrice;
    }

    let total = screen.getByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} itens\\)`)); 
    expect(total).toBeInTheDocument();

    const itemName2 = "Pão na chapa com requeijão";
    const itemPrice2 = 8.5;

    for(let i = 0; i < 5; i++) {
      const elem2 = screen.getByText(new RegExp(itemName2, "i"));
      fireEvent.click(elem2);
      itemCount += 1;
      totalPrice += itemPrice2;
    }
    let total2 = screen.getByText(new RegExp(`R\\$ ${totalPrice.toFixed(2).replace('.', ',')} \\(${itemCount} itens\\)`));
    expect(total2).toBeInTheDocument();
  });
})