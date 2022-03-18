export function sortByField(array, field) {
  array.sort((a, b) => {
    const x = a[field].toString().toLowerCase() || '';
    const y = b[field].toString().toLowerCase() || '';
    
    return x > y ? 1 : x < y ? -1 : 0;
  });
}

export function textToVariableName(text) {
  return text.toString().toLowerCase().replace(' ', '-')
}

export function variableNameToText(variableName) {
  return (variableName.charAt(0).toUpperCase() + variableName.substr(1).toLowerCase()).replace('-', ' ')
}

export function removeZerosCurrency(value) {
  return value.replace(/,00|.00/,  '')
}

export function formatCurrency(value) {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`
}

export function itemOrItens(quantity) {
  return quantity === 1 ? 'item' : 'itens';
}