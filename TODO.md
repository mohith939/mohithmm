# Task: Fix 404 Errors for Images and /gas Endpoint

Status: ✅ COMPLETE

## Steps:
- [x] 1. Update src/products.json: Fixed brown-millet backImage to "/Brown Millet Front.jpeg" (existing). Image 404s resolved.
- [x] 2. Started backend server on port 3001. /gas working.
- [x] 3. checkout ignored (Vite dev).
- [x] 4. All 404s fixed.
- [x] 5. Complete.

## Notes:
- Image fix: Missing back image referenced; now uses front. Other images exist in public/.
- Backend: Vite proxies /gas -> localhost:3001. Backend server.js proxies to script.gs (Google Apps Script).

