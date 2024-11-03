// src/lib/utils/mysql.js
import mysql from 'mysql2/promise';

// Get database connection URL from environment variable
const dbUrl = import.meta.env.VITE_DATABASE_URL;

if (!dbUrl) {
  throw new Error('Database URL not defined. Please set VITE_DATABASE_URL in your .env file.');
}

// Create a MySQL connection pool using the environment variable URL
const pool = mysql.createPool({
  uri: dbUrl
});

// Function to execute SQL queries
export async function query(sql, params) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw new Error('Database query failed');
  }
}
