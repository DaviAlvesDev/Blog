import bcrypt from 'bcrypt'
import { pool } from '../index.js'

async function seedAdmin() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        console.error("Define ADMIN_EMAIL and ADMIN_PASSWORD at .env");
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
        "INSERT INTO users (email, password, role) VALUES ($1, $2, 'admin') ON CONFLICT (email) DO NOTHING",
        [email, hashedPassword]
    );
}

seedAdmin()