
import bcrypt from 'bcrypt';
import { query } from '$lib/utils/mysql';

const adminUsername = 'admin';
const adminPassword = 'mittSterkePassord';
const saltRounds = 10;

/**
 * API endpoint to create an admin user with a hashed password.
 * This should only be used once for initial setup and then removed or secured.
 */
export async function POST() {
    try {
        // Check if an admin user already exists
        const existingUser = await query('SELECT * FROM users WHERE username = ?', [adminUsername]);
        if (existingUser.length > 0) {
            return new Response(JSON.stringify({ error: 'Admin user already exists' }), { status: 409 });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

        // Insert the admin user
        await query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [adminUsername, passwordHash]);

        return new Response(JSON.stringify({ message: 'Admin user created successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error creating admin user:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
