import {query} from '$lib/utils/mysql.js';
import {json} from '@sveltejs/kit';

export async function POST({request}) {
    const {bookId, hasRead} = await request.json();

    try {
        await query('UPDATE Books SET hasRead = ? WHERE id = ?', [hasRead, bookId]);
        return json({status: 'success', message: 'Read status updated successfully'});
    } catch {
        console.error('Error updating read status');
        return json({status: 'error', message: 'Failed to update read status'});
    }
}
