const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://milletmithai.in', 'https://milletmithai.in'],
  credentials: true
}));
app.use(express.json());

// Proxy /gas to GAS
app.use('/gas', createProxyMiddleware({
  target: 'https://script.google.com/macros/s/AKfycbz51BT_AkEuCx4kXt2aLg_N3T8ggTa8266CwfMoowMYa_IR5hAlRdRPXqq24f4pxCTV/exec',
  changeOrigin: true,
  secure: true,
  pathRewrite: {'^/gas' : ''},
  onProxyReq: (proxyReq, req, res) => {
    // Forward all methods/headers/body
  }
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend proxy running on port ${PORT}`);
});
