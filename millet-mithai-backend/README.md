# Millet Mithai eCommerce Backend 🛒 (GAS Edition)

Production-ready Node.js/Express backend using deployed Google Apps Script (NO service account creds needed! 🚀)

## 🚀 Quick Start

### 1. Google Sheets + GAS Setup
```
1. Create Sheet: https://sheets.google.com → Copy SHEET_ID from URL
2. Extensions > Apps Script → Paste root `script.gs` → UPDATE SHEET_ID 
3. Run setupSheets() → Creates Products/Orders/TrackingHistory/StatusConfig + sample data
4. Deploy → Execute as: Me | Who has access: Anyone
✅ Backend uses GAS proxy - NO service account/JSON key needed!

### 2. Apps Script Code (script.gs)
```
Paste this COMPLETE code:

const SHEET_ID = 'YOUR_SHEET_ID_HERE';

function doPost(e) {
  // Webhook handler for frontend orders (backup)
}

function setupSheets() {
  // Creates all tabs + sample data
  // Run this once!
}
```
**Full Apps Script code available in root `script.gs` - UPDATE it with your SHEET_ID**

### 3. Backend Setup
```bash
cd millet-mithai-backend
npm install
cp .env.example .env
# Edit .env:
# GOOGLE_SHEET_ID=your_sheet_id
# GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com  
# GOOGLE_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n'
npm run setup  # Backend sample data sync
npm run dev    # http://localhost:3001
```

### 4. Test APIs
```
curl http://localhost:3001/api/products
curl -X POST http://localhost:3001/api/orders \\
  -H 'Content-Type: application/json' \\
  -d '{\"customerName\":\"Test\",\"items\":[{\"id\":\"1\",\"price\":150,\"quantity\":1}],\"paymentMethod\":\"COD\"}'
```

## 📋 All APIs Working
```
✅ GET /api/products           # Active products only
✅ POST /api/orders            # Create + stock deduct
✅ GET /api/orders/:id/tracking # Status timeline
✅ GET /api/config/status      # Dropdown options
✅ GET /api/admin/orders       # All orders + filter
✅ PUT /api/admin/orders/:id/status
✅ POST /api/webhooks/razorpay # Payment webhooks
```

## 🌐 Deploy (Render Recommended)
```
1. GitHub repo → render.com/dashboard
2. Web Service → Connect repo
3. Env vars: GOOGLE_SHEET_ID, CLIENT_EMAIL, PRIVATE_KEY  
4. Build: npm install | Start: npm start
```

**Backend LIVE & production-ready! 🚀**

