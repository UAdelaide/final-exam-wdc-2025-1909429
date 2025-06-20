const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const PORT = 8080;

const pool = mysql.createPool({
  socketPath: '/var/run/mysqld/mysqld.sock',
  user: 'root',
  password: 'root',
  database: 'DogWalkService'
});



router.get('/dogs', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username
            FROM Dogs
            LEFT JOIN Users ON Dogs.owner_id = Users.user_id`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/walkrequests/open', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT wr.request_id, d.name AS dog_name, wr.requested_time, wr.duration_minutes, wr.location, u.username AS owner_username
      FROM WalkRequests wr
      LEFT JOIN Dogs d ON wr.dog_id = d.dog_id
      LEFT JOIN Users u ON d.owner_id = u.user_id
      WHERE wr.status = 'open'
      `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/walkers/summary', async (req, res) => {
    try {
        const [rows] = await pool.query(`