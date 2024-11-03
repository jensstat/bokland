// src/routes/api/update-book/+server.js

import { query } from '$lib/utils/mysql';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { id, field, value } = await request.json();

     // Validate inputs
     if (!id || !field || value === undefined) {
        return json({ error: 'Invalid data provided' }, { status: 400 });
    }

    try {
        // Update the specific field for the given book id
        const result = await query(`UPDATE books SET ${field} = ? WHERE id = ?`, [value, id]);
        return json({ success: true, result });
    } catch (error) {
        console.error('Error updating book:', error);
        return json({ error: 'Database error' }, { status: 500 });
    }
}
