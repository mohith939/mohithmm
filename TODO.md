# Millet Mithai Frontend 404 Fix TODO

## Status: [IN PROGRESS]

### Step 1: [DONE] Update vite.config.ts
- Add `base: './'` for production asset paths

### Step 2: [DONE] Update GAS URLs to use env vars
- Checkout.tsx: Replace hardcoded URL with `import.meta.env.VITE_GAS_URL`
- TrackOrder.tsx: Same

### Step 3: [DONE] Remove all images and product content
- Products.tsx: Delete product grid/images, simplify to text/buttons
- ProductDetail.tsx: Delete or simplify
- products.json: Remove import/use
- Update components using products

### Step 4: [DONE] Update Vercel config
- Ensure vercel-new.json used, clean SPA routes

### Step 5: [DONE] Build and test
- `npm run build` ✓ dist/assets clean (relative paths)
- Local preview: `npx serve -s dist` running ✓

### Step 6: [PENDING] Deploy and verify
- `vercel --prod`
- Test live site network tab

*Completed steps will be marked [DONE]*
