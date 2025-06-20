const express= require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 8080;

let db;
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
    const [rows] = await db.execute('
        SELECT Dogs.name AS dog_name,Dogs.size,Users.name AS owner_user,Walks.date,Walks.time)