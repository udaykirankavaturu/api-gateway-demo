const express = require('express');
const app = express();
const PORT = 3000;

app.get('/orders', (req, res) => {
  res.json([
    { id: 1, name: 'Order A' },
    { id: 2, name: 'Order B' }
  ]);
});

app.listen(PORT, () => {
  console.log('order-service running on port ' + PORT);
});