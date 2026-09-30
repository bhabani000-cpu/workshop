const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Helper function to read products from db.json asynchronously
const getProductsData = async () => {
  try {
    const filePath = path.join(__dirname, 'db.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.log(error);
  }
};

// GET /products - Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await getProductsData();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products data' });
  }
});

// GET /products/:id - Get product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const products = await readFileWithDelay();
    const productId =req.params.id;
    const product = products.find((p) => p.id == productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products data' });
  }
});

async function readFileWithDelay(){
    await new Promise((res,rej)=>{
        setTimeout(res,1500)
    })
    let products = await getProductsData()
    return products
}


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
