# TODO: Rebuild Our Millet Categories

## What Was Done
- Removed `<ProductsSection />` from `src/pages/Index.tsx` (hidden broken landing section)
- Removed `/products` and `/products/:category` routes from `src/App.tsx`
- Deleted old files:
  - `src/components/ProductsSection.tsx`
  - `src/components/CategoryProducts.tsx`
  - `src/data/catalogs.json`
  - `src/data/catalogs-updated.json`
  - `src/data/catalogs-backup.json`
  - `src/data/catalogs-new.json`
  - `src/data/catalogs-complete.json`

## Future-Proof Architecture Plan
To ensure adding a new category never affects existing products:

1. **categories.json**: Stores only category metadata (`id`, `name`, `slug`, `image`, `description`). No product lists.
2. **products.json**: Each product has a `categoryId` field (e.g., `"categoryId": "flours"`). Adding a new category only requires adding the category to `categories.json` and tagging products — existing products stay untouched.
3. **Components**:
   - `ProductsSection.tsx` (landing grid) → reads `categories.json`
   - `CategoryProducts.tsx` (category page) → filters `products.json` by `categoryId`

## What I Need From You
1. **Category List**: Confirm final categories (Flours, Snacks, Sweets, Tiffin, Milk Mix, Icecream, Travel, Whole Millets, any new ones?)
2. **Product Data Format**: How do you want to share product details?
   - Excel / Google Sheets (I convert to JSON)
   - Plain text list
   - JSON directly
   - What fields per product? (name, category, price, weight, description, frontImage, backImage, etc.)
3. **Images**: How to provide images?
   - Upload to `public/images/categories/` and `public/images/products/` folders directly
   - Use existing folder structure (`Flour Catalog/`, `Millet Snacks Catalog/`, etc.)
   - Zip / Drive link
4. **Products Page**: Do you want a dedicated `/products` page showing all products, or only category-specific pages?

