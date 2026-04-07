function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    let data = {};
    
    // Handle POST body (from proxy)
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        throw new Error('Invalid JSON: ' + parseErr.message);
      }
    } 
    // Fallback for GET params
    else if (e && e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      data = e.parameter || {};
    }
    
    // Validate required fields
    if (!data.customerName || !data.phone || !data.items || !data.totalAmount) {
      throw new Error('Missing required fields: customerName, phone, items, totalAmount');
    }

    const SHEET_ID = '1v2UYlERrgNsSLnou-lcrlPCMxqm6CavbkJL71toYHN4';
    const ss = SpreadsheetApp.openById(SHEET_ID);
    
    // Ensure Orders sheet exists
    let ordersSheet = ss.getSheetByName('Orders');
    if (!ordersSheet) {
      ordersSheet = ss.insertSheet('Orders');
      ordersSheet.getRange(1,1,1,10).setValues([['orderId','customerName','phone','address','items','totalAmount','orderStatus','paymentStatus','createdAt','status']]);
    }
    
    // Add dropdown validation to status column if not exists
    const statusRange = ordersSheet.getRange(2, 10, 1000, 1); // Rows 2-1000
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Order Placed','Payment Pending','Payment Recieved','Confirmed','Processing','Shipped','Out for Delivery','Delivered','Cancelled','Failed'], true)
      .setAllowInvalid(false)
      .build();
    statusRange.setDataValidation(rule);
    
    // Color-coded conditional formatting
    const statusColRange = ordersSheet.getRange(2, 10, 1000, 1);
    const formats = [
      { text: 'Order Placed', bg: '#FFF3CD', fg: '#856404' },
      { text: 'Payment Pending', bg: '#FFFFCC', fg: '#DAA520' },
      { text: 'Payment Recieved', bg: '#D4EDDA', fg: '#155724' },
      { text: 'Confirmed', bg: '#D1ECF1', fg: '#0C5460' },
      { text: 'Processing', bg: '#CCE5FF', fg: '#004085' },
      { text: 'Shipped', bg: '#E2D9F3', fg: '#5C2D91' },
      { text: 'Out for Delivery', bg: '#D1ECF1', fg: '#004085' },
      { text: 'Delivered', bg: '#C3E6CB', fg: '#155724' },
      { text: 'Cancelled', bg: '#F8D7DA', fg: '#721C24' },
      { text: 'Failed', bg: '#F8D7DA', fg: '#721C24' }
    ];
    
    const rules = formats.map(f => SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(f.text)
      .setBackground(f.bg)
      .setFontColor(f.fg)
      .setRanges([statusColRange])
      .build());
    
    ordersSheet.setConditionalFormatRules(rules);
    
    // Generate sequential INV-1000
    const lastRow = ordersSheet.getLastRow();
    const nextNumber = lastRow > 1 ? (lastRow - 1 + 1000) : 1000;
    const orderId = `INV-${nextNumber}`;
    const timestamp = new Date().toISOString();
    
    ordersSheet.appendRow([
      orderId,
      data.customerName || '',
      data.phone || '',
      data.address || '',
      data.items ? data.items.map(i => `${i.name} x${i.quantity} @₹${i.price}`).join('; ') : '',
      data.totalAmount || 0,
      'Order Placed',
      'COD',
      timestamp,
      'Order Placed'
    ]);
    
    // Send notification email
    MailApp.sendEmail({
      to: 'mailtrash939@gmail.com',
      subject: 'New Order #' + orderId,
      body: 'New order from ' + (data.customerName || 'Customer') + '. Total: ₹' + (data.totalAmount || 0)
    });
    
  return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Order created', orderId: orderId}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      });
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const SHEET_ID = '1v2UYlERrgNsSLnou-lcrlPCMxqm6CavbkJL71toYHN4';
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const ordersSheet = ss.getSheetByName('Orders');
    
    if (!e.parameter.phone) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Phone required'}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      });
    }
    
    const phone = e.parameter.phone;
    const data = ordersSheet.getDataRange().getValues();
    
    const orders = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][2] == phone) { // col C (index 2) = phone
        orders.push({
          orderId: data[i][0],
          customerName: data[i][1],
          phone: data[i][2],
          address: data[i][3],
          items: data[i][4],
          totalAmount: data[i][5],
          orderStatus: data[i][6],
          paymentStatus: data[i][7],
          status: data[i][9]
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: true, orders}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      });
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      });
  }
}

function setup() {
  const SHEET_ID = '1v2UYlERrgNsSLnou-lcrlPCMxqm6CavbkJL71toYHN4';
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  if (!ss.getSheetByName('Orders')) {
    const ordersSheet = ss.insertSheet('Orders');
    ordersSheet.getRange(1,1,1,9).setValues([['orderId','customerName','phone','address','items','totalAmount','orderStatus','paymentStatus','createdAt']]);
  }
  
  console.log('Setup complete');
}
