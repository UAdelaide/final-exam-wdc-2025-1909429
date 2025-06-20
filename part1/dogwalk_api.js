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
            `SELECT d.id, d.name, d.breed, d.age, d.owner_id, u.name AS owner_name`