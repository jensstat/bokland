// src/lib/middleware.js
import jwt from 'jsonwebtoken';

const secretKey = process.env.VITE_JWT_SECRET; // Load the secret from environment variables

export function verifyToken(token) {
    if (!token) {
        console.error("No token provided");
        throw new Error('No token provided');
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Use the same secret for verification
        return decoded;  // Return user data if needed
    } catch (err) {
        console.error("Token verification failed:", err.message); // Log specific error message
        throw new Error('Invalid token');
    }
}
