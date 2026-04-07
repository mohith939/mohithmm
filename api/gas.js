const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');

  const proxy = createProxyMiddleware({
    target: 'https://script.google.com/macros/s/AKfycby4zvKZizbhoG0LVbdcruQqOC_rSaEUIP_yLZPfqWDCqaZpbDGaMr5HKmo9l0LRQK4v4g/exec',
    changeOrigin: true,
    pathRewrite: {'^/api/gas': ''},
    onProxyReq: (proxyReq, req, res) => {
      // Copy all headers
      Object.keys(req.headers).forEach(key => {
        proxyReq.setHeader(key, req.headers[key]);
      });
      // Preserve method (GET/POST)
      proxyReq.method = req.method;
      // Handle POST body - read raw body and forward
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', () => {
          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.setHeader('Content-Length', Buffer.byteLength(body));
          proxyReq.write(body);
        });
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).json({ error: 'Proxy error' });
    }
  });

  proxy(req, res);
};
