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

async function initializeDatabase() {
  db = await mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'DogWalkService'
  });
  console.log('Database connected');
}

app.get('/api/walks', async (req, res) => {
  try {
    const [rows] = await db.execute(`
        SELECT Dogs.name AS dog_name,Dogs.size,Users.name AS owner_username FROM Dogs
        JOIN Users ON Dogs.owner_id = Users.user_id`);
    res.json(rows);
  }catch (error) {
    res.status(500).json({ error: 'Database query failed' ,details: error.message  });
    }
);

