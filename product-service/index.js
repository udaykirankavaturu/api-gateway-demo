const express = require('express');
const app = express();
const PORT = 3000;

app.get('/products', (req, res) => {
  res.json([
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' }
  ]);
});

app.listen(PORT, () => {
  console.log('product-service running on port ' + PORT);
});