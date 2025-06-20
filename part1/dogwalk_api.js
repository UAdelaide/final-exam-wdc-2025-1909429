const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');


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
            SELECT u.username AS walker_username,
        COUNT(r.rating_id) AS total_ratings,
        ROUND(AVG(r.rating), 1) AS average_rating,
        (SELECT COUNT(*)
            FROM WalkRequests wr
            JOIN WalkApplications wa2 ON wr.request_id = wa2.request_id
            WHERE wa2.walker_id = u.user_id AND wr.status = 'completed' AND  wa2.status='accepted') AS completed_walks
        FROM Users u
        LEFT JOIN WalkRatings r ON r.walker_id = u.user_id
        WHERE u.role = 'walker'
        GROUP BY u.user_id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
});
module.exports = router;
