// src/lib/server/database.js
import mysql from 'mysql2/promise';

// Retrieve the database URL from environment variables
const dbUrl = import.meta.env.VITE_DATABASE_URL;

// Function to connect to the database
export async function connectToDatabase() {
    if (!dbUrl) {
        throw new Error('Database URL not found in environment variables.');
    }

    // Create and return a new database connection
    return mysql.createConnection(dbUrl);
}
