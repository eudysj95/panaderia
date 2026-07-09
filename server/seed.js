/**
 * Standalone seed script.
 * Run: node seed.js
 * Reads JSON data files from seed/data/ and inserts into MongoDB.
 */
require('dotenv').config();

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Product = require('./models/Product');
const Material = require('./models/Material');
const Config = require('./models/Config');

const MONGODB_URI = process.env.MONGODB_URI;
const SEED_DATA_DIR = path.join(__dirname, 'seed', 'data');

const FILE_CATEGORY_MAP = {
  dataPanes: 'panes',
  dataViveres: 'viveres',
  dataMayor: 'mayor',
};

async function seed() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI environment variable is required');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  let productCount = 0;
  let materialCount = 0;

  // Seed products
  for (const [fileName, category] of Object.entries(FILE_CATEGORY_MAP)) {
    const filePath = path.join(SEED_DATA_DIR, `${fileName}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }
    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    for (const item of rawData) {
      await Product.findOneAndUpdate(
        { nombre: item.producto, category },
        {
          nombre: item.producto,
          precio: item.precio,
          category,
          unidades: item.unidades || 1,
        },
        { upsert: true, new: true }
      );
      productCount++;
    }
  }

  // Seed materials
  const materialsPath = path.join(SEED_DATA_DIR, 'dataMateriaPrima.json');
  if (fs.existsSync(materialsPath)) {
    const materialsData = JSON.parse(fs.readFileSync(materialsPath, 'utf-8'));
    for (const item of materialsData) {
      await Material.findOneAndUpdate(
        { nombre: item.producto },
        {
          nombre: item.producto,
          precio: item.precio,
          unidad: item.unidad || 'kg',
        },
        { upsert: true, new: true }
      );
      materialCount++;
    }
  }

  // Seed default config
  const existingConfig = await Config.findOne();
  if (!existingConfig) {
    await Config.create({ exchangeRate: 175 });
    console.log('Config created with default exchange rate: 175');
  } else {
    console.log('Config already exists, skipping');
  }

  await mongoose.disconnect();
  console.log(`Seed complete: ${productCount} products, ${materialCount} materials`);
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
