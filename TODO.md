# Millet Mithai Fix 404 Errors - Task Progress

## Step 1: ✅ Fix Image Paths [COMPLETE - products.json recreated with %20 paths]
- Edit src/products.json: Replace all image path spaces ' ' with '%20'
- e.g. "/Browntop Millet Front.jpeg" → "/Browntop%20Millet%20Front.jpeg"
- Test: Visit /products, images load.

## Step 2: ✅ Backend /gas Proxy [RUNNING on :3001, proxy chain working]
- Dev: Backend running on :3001 (proxy to GAS: https://script.google.com/macros/s/AKfycbz51BT_AkEuCx4kXt2aLg_N3T8ggTa8266CwfMoowMYa_IR5hAlRdRPXqq24f4pxCTV/exec)
- Vite dev proxies /gas → backend → GAS exec URL.
- Production: Deploy backend to milletmithai.in/api or subdomain, update vite proxy if needed.
- Test: POST /gas from Checkout.

## Step 3: ✅ Test Order Flow [Ready - run npm run dev]
- Add to cart → Checkout → Place Order (COD) → Success toast + orderId.
- TrackOrder → Enter phone → See orders.

## Step 4: Production Deploy [PENDING]
- Deploy Vite to milletmithai.in
- Deploy backend (Render/Heroku/Vercel) with same GAS proxy.
- Or direct GAS_URL in frontend env (skip backend).

## Step 5: GAS Improvements [OPTIONAL]
- script.gs: Fix duplicate status cols, parameterize SHEET_ID/email.

**Next Action:** Proceed with Step 1 edits?
