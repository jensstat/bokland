// src/routes/api/delete-book/+server.js
import { verifyToken } from '$lib/middleware';
import { query } from '$lib/utils/mysql';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { id } = await request.json();

    if (!id) {
        return json({ error: 'Book ID is required' }, { status: 400 });
    }

    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const user = verifyToken(token);
        if (!user || user.role !== 'admin') {
            return json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const result = await query(`DELETE FROM books WHERE id = ?`, [id]);
        console.log('Delete result:', result);
        return json({ success: true, result });
    } catch (error) {
        console.error('Error deleting book:', error);
        return json({ error: 'Database error' }, { status: 500 });
    }
}
