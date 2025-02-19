import { formatCurrency, itemOrItens, removeZerosCurrency, sortByField } from "./Functions";

describe('Teste das funções utilitárias', () => {
  it('Deve ordenar um array de objetos por um campo específico', () => {
    const array = [
      { id: 1, name: 'B' },
      { id: 2, name: 'A' },
      { id: 3, name: 'C' }
    ];

    const sortedArray = sortByField(array, 'name');

    expect(sortedArray).toEqual([
      { id: 2, name: 'A' },
      { id: 1, name: 'B' },
      { id: 3, name: 'C' }
    ]);
  })

  it('Deve formatar um valor monetário', () => {
    const value = 10;

    expect(formatCurrency(value)).toBe('R$ 10,00');
  })

  it('Deve remover os zeros decimais de um valor monetário', () => {
    const value = 'R$ 10,00';

    expect(removeZerosCurrency(value)).toBe('R$ 10');
  })

  it ('Deve retornar o texto apropriado para a quantidade de itens', () => {
    expect(itemOrItens(0)).toBe('itens');
    expect(itemOrItens(1)).toBe('item');
    expect(itemOrItens(2)).toBe('itens');
  })
})