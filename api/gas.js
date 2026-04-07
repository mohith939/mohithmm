module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const { spawn } = require('child_process');
  const curl = spawn('curl', [
    '-X', req.method,
    '-H', 'Content-Type: application/json',
    '--data-raw', JSON.stringify(req.body || {}),
    'https://script.google.com/macros/s/AKfycby4zvKZizbhoG0LVbdcruQqOC_rSaEUIP_yLZPfqWDCqaZpbDGaMr5HKmo9l0LRQK4v4g/exec' + (req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '')
  ]);

  let responseData = '';

  curl.stdout.on('data', (data) => {
    responseData += data.toString();
  });

  curl.stderr.on('data', (data) => {
    console.error(`curl stderr: ${data}`);
  });

  curl.on('close', (code) => {
    if (code === 0) {
      res.status(200).json(JSON.parse(responseData || '{}'));
    } else {
      res.status(500).json({ error: 'GAS request failed', code });
    }
  });
};
