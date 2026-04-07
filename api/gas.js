const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  createProxyMiddleware({
    target: 'https://script.google.com/macros/s/AKfycby4zvKZizbhoG0LVbdcruQqOC_rSaEUIP_yLZPfqWDCqaZpbDGaMr5HKmo9l0LRQK4v4g/exec',
    changeOrigin: true,
    pathRewrite: {
      '^/api/gas': '',  // strip /api/gas
    },
    onProxyReq: (proxyReq, req, res) => {
      // Forward all headers/method/body
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).end();
        return;
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
  })(req, res);
};
