import products from '../products.json';

interface Product {
  id: string;
  weight: string;
  // other fields...
}

export function parseWeight(weightStr: string): number {
  const match = weightStr.match(/(\\d+(?:\\.\\d+)?)/);
  if (!match) return 0.5; // default 0.5kg
  const num = parseFloat(match[1]);
  const unitMatch = weightStr.match(/g|kg/i);
  if (unitMatch && unitMatch[0].toLowerCase() === 'g') {
    return num / 1000;
  }
  return num;
}

export function getProductWeight(productId: string): number {
  const product = (products as Product[]).find(p => p.id === productId);
  if (!product?.weight) return 0;
  return parseWeight(product.weight);
}

export function normalizeState(state: string): string {
  return state.toLowerCase().trim().replace(/\\s+/g, ' ');
}

export function calculateShipping(totalWeightKg: number, state: string): number {
  const normState = normalizeState(state);
  
  if (totalWeightKg >= 5) {
    return 250;
  } else if (totalWeightKg > 3.1) {
    return 200;
  } else if (totalWeightKg >= 1.1) { // 1.1 to 3kg
    if (['telangana', 'maharashtra', 'karnataka'].some(s => normState.includes(s))) {
      return 130;
    }
    return 150;
  } else { // <1kg (assume <=1)
    if (normState.includes('andhra pradesh') || normState.includes('ap')) {
      return 110;
    } else if (['telangana', 'maharashtra'].some(s => normState.includes(s))) {
      return 130;
    }
    return 130; // other states
  }
}

// Test helper
export function getExampleShipping(weight: number, state: string): string {
  return `₹${calculateShipping(weight, state)}`;
}

