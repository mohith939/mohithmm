# Fix Checkout 404 Errors (/gas endpoint)
yStatus: [ ] In Progress | [x] Planning Complete

## Steps:
1. **[x] Create .env file** with GAS_URL=full Google Apps Script URL for direct calls as fallback.
2. **[x] Edit src/pages/Checkout.tsx** - Direct GAS URL hardcoded for reliable prod.
3. **[ ] Test locally** - Run backend proxy and frontend, test checkout form.
4. **[ ] Deploy backend proxy** - To Vercel/Render/etc so /gas works on milletmithai.in.
5. **[ ] Deploy frontend** - Update production site.
6. **[ ] Verify** - Test live checkout on https://milletmithai.in/checkout.
7. **[ ] Cleanup** - Remove TODO.md.

**Next step:** Create .env (provide GAS_URL from server.js proxy target).

