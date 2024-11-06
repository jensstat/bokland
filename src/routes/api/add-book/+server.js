// src/routes/api/add-book/+server.js
import { verifyToken } from '$lib/middleware';
import { query } from '$lib/utils/mysql';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { title, author, year, type, genre, language, goodreads, tags, hasRead, jensrating, cover_url, series } = await request.json();

    // Validate required fields
    if (!title || !author) {
        return json({ error: 'Title and author are required' }, { status: 400 });
    }

    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const user = verifyToken(token);
        if (!user || user.role !== 'admin') {
            return json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Insert book into the database and get the new ID
        const result = await query(
            `INSERT INTO books (title, author, year, type, genre, language, goodreads, tags, hasRead, jensrating, cover_url, series)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, author, year, type, genre, language, goodreads, tags, hasRead, jensrating, cover_url, series]
        );

        const newBookId = result.insertId;
        console.log('New book ID:', newBookId); // Log the ID for debugging

        // Return the ID along with success message
        return json({ success: true, id: newBookId });
    } catch (error) {
        console.error('Error adding book:', error);
        return json({ error: 'Database error' }, { status: 500 });
    }
}
