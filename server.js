const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Helper function to read products from db.json
const getProductsData = () => {
  const filePath = path.join(__dirname, 'db.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
};

// GET /products - Get all products
app.get('/products', (req, res) => {
  try {
    const products = getProductsData();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products data' });
  }
});

// GET /products/:id - Get product by ID
app.get('/products/:id', (req, res) => {
  try {
    const products = getProductsData();
    const productId = parseInt(req.params.id, 10);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
