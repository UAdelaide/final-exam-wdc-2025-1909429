const express= require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 8080;

let db;
async function initializeDatabase() {
  db = await mysql.createConnection({
    host: 'localhost