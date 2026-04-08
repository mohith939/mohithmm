import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ProductVariant {
  sku: string;
  price: string;
  weight: string;
  originalPrice?: string;
  id: string;
}

export interface GroupedProduct extends Record<string, any> {
  variants: ProductVariant[];
}

export function groupProductsByName(products: any[]): GroupedProduct[] {


  const groups: { [name: string]: any[] } = {};

  // Group by exact name
  for (const product of products) {
    const name = product.name;
    if (!groups[name]) {
      groups[name] = [];
    }
    groups[name].push(product);
  }

  // Convert groups to grouped products (base = first, variants = all)
  return Object.entries(groups).map(([name, group]) => {
    const baseProduct = group[0];
    const base: GroupedProduct = {} as GroupedProduct;
    
    // Copy all product properties from first item
    Object.keys(baseProduct).forEach(key => {
      if (key !== 'variants') {
        (base as any)[key] = baseProduct[key];
      }
    });
    
    base.variants = group.map((p: any) => ({
      sku: p.weight?.toLowerCase().replace(/[^a-z0-9]/g, '') || p.id.split('-').pop() || 'default',
      price: p.price || '',
      weight: p.weight || 'N/A',
      originalPrice: p.originalPrice,
      id: p.id
    }));
    return base;
  });
}
