# Fix 405 POST /api/gas Error

## Implementation Steps

### 1. [✅] Update api/gas.js - Enhance proxy for POST/GET/CORS
### 2. [✅] Update vercel.json - Add explicit /api/gas → api/gas.js route  
### 3. [✅] Update src/pages/Checkout.tsx - Change fetch('/api/gas') → fetch('/gas')
### 4. [✅] Update src/pages/TrackOrder.tsx - Change fetch('/api/gas?phone=') → fetch('/gas?phone=')
### 5. [✅] Update millet-mithai-backend/server.js - Ensure /gas proxy handles POST fully
### 6. [✅] Test locally: npm run dev, test checkout/track
### 7. [✅] Deploy: vercel --prod
### 8. [✅] Verify production: https://milletmithai.in checkout/track order
### 9. [✅] Mark complete ✅
