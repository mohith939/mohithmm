const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(204).end();
    return;
  }

  createProxyMiddleware({
    target: 'https://script.google.com/macros/s/AKfycby4zvKZizbhoG0LVbdcruQqOC_rSaEUIP_yLZPfqWDCqaZpbDGaMr5HKmo9l0LRQK4v4g/exec',
    changeOrigin: true,
    pathRewrite: { '^/api/gas': '' },
    // Preserve method and body for POST
    method: 'POST', // Default to POST but allow others
    onProxyReq: (proxyReq, req) => {
      // Preserve original method
      proxyReq.method = req.method;
      // Forward raw body for GAS
      if (req.method === 'POST' && req.body) {
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.write(JSON.stringify(req.body));
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    },
    // Handle query params for GET
    preserveQueryParams: true
  })(req, res);
};
