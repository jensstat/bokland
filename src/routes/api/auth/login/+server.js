import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '$lib/utils/mysql';

const secretKey = process.env.VITE_JWT_SECRET;
console.log('JWT Secret Key:', process.env.VITE_JWT_SECRET);


export async function POST({ request }) {
    const { username, password } = await request.json();

    try {
        // Check if user exists
        const [user] = await query('SELECT * FROM users WHERE username = ?', [username]);
        if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        // Generate JWT if password is correct
        const token = jwt.sign({ userId: user.id, role: 'admin' }, secretKey, { expiresIn: '2h' });
        return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
        console.error('Error in login:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
