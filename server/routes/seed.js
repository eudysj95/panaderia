const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');
const Material = require('../models/Material');
const Config = require('../models/Config');
const auth = require('../middleware/auth');

const SEED_DATA_DIR = path.join(__dirname, '..', 'seed', 'data');

// Helper: map data file to category
const FILE_CATEGORY_MAP = {
  dataPanes: 'panes',
  dataViveres: 'viveres',
  dataMayor: 'mayor',
};

// POST /api/seed — run seed logic (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const results = { products: 0, materials: 0, config: false };

    // Seed products from each data file
    for (const [fileName, category] of Object.entries(FILE_CATEGORY_MAP)) {
      const filePath = path.join(SEED_DATA_DIR, `${fileName}.json`);
      if (!fs.existsSync(filePath)) {
        console.warn(`Seed file not found: ${filePath}`);
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
        results.products++;
      }
    }

    // Seed materials from dataMateriaPrima.json
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
        results.materials++;
      }
    }

    // Seed default config if none exists
    const existingConfig = await Config.findOne();
    if (!existingConfig) {
      await Config.create({ exchangeRate: 175 });
      results.config = true;
    }

    res.json({
      message: 'Seed completed successfully',
      results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
