const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/dogs', async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT dog_

    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}