// src/routes/api/update-book/+server.js

import { verifyToken } from '$lib/middleware';
import { query } from '$lib/utils/mysql';
import { json } from '@sveltejs/kit';

// Define a list of allowed fields to prevent SQL injection
const allowedFields = ['title', 'author', 'year', 'type', 'genre', 'language', 'goodreads', 'tags', 'hasRead', 'jensrating', 'series'];

export async function POST({ request }) {
    const { id, field, value } = await request.json();

    // Validate inputs
    if (!id || !field || value === undefined) {
        console.error("Invalid data provided:", { id, field, value });
        return json({ error: 'Invalid data provided' }, { status: 400 });
    }

    // Ensure the field is allowed to prevent SQL injection
    if (!allowedFields.includes(field)) {
        console.error("Invalid field name:", field);
        return json({ error: 'Invalid field name' }, { status: 400 });
    }

    // Verify token to check if the user is an authenticated admin
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            console.error("No token found");
            return json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify the token and get user data
        const user = verifyToken(token);
        if (!user) {
            console.error("Token verification failed");
            return json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (user.role !== 'admin') {
            console.error("Forbidden: Admin access required");
            return json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        // Construct the SQL query string with the column name directly interpolated
        const sql = `UPDATE books SET ${field} = ? WHERE id = ?`;
        console.log("Updating book with:", { id, field, value });

        // Execute the query with parameterized values for security
        const result = await query(sql, [value, id]);
        console.log("Update successful:", result);
        return json({ success: true, result });
    } catch (error) {
        console.error('Error verifying token or updating book:', error);
        return json({ error: 'Authentication or database error', details: error.message }, { status: 500 });
    }
}
