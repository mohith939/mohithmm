# Millet Mithai Frontend MIME/404 Asset Fix - IMPLEMENTATION PLAN

## Status: [IN PROGRESS]

### ORIGINAL STEPS:
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
- Ensure vercel-new.json used, clean SPA routes → FIXED with proper static asset routes

### Step 5: [DONE] Build and test
- `npm run build` ✓ dist/assets clean (relative paths)
- Local preview: `npx serve -s dist` running ✓

### Step 6: [TODO] Deploy and verify
- `vercel --prod`
- Test live site network tab: confirm assets load with JS MIME

### NEW IMPLEMENTATION STEPS:

**Step A: [DONE] Update vercel.json**
- Added routes prioritizing /assets/* (static files first, correct MIME: application/javascript)
- Removed vercel-new.json

**Step B: [DONE] Build & Local Test**
- `npm run build` → dist/assets/index-BJUTeMJF.js (498KB) generated ✓
- `npx serve -s dist` → running on http://localhost:[port] ✓
- Verify Network tab: JS MIME confirmed (test http://localhost:[port]/assets/index-BJUTeMJF.js → 200 application/javascript)

**Step C: [TODO] Deploy**
- `vercel --prod`
- Test live: Network tab confirms fix

**Step D: [TODO] Update TODO.md**
- Mark completed steps [DONE]

*Run `npm run build` after config changes. Check Vercel dashboard env vars for VITE_GAS_URL.*

