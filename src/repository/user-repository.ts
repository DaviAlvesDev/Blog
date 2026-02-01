import { pool } from "../db/index.js"
import type { User, CreateUserDTO } from "../types/user-interface.js"

export async function findUser(id: number): Promise<User | undefined> {
    const query = 'SELECT * FROM users WHERE id = $1;'
    const result = await pool.query(query, [id])
    return result.rows[0]
}

export async function createUser(data: CreateUserDTO): Promise<User | undefined> {
    const query = `
        INSERT INTO users (email, password, role) 
        VALUES ($1, $2, $3) 
        ON CONFLICT (email) DO NOTHING 
        RETURNING *;
    `
    const values = [data.email, data.password, data.role || 'user']
    const result = await pool.query(query, values)
    return result.rows[0]
}

export async function updateUser(id: number, data: CreateUserDTO): Promise<User | undefined> {
    const query = `
        UPDATE users 
        SET email = $1, password = $2, role = $3 
        WHERE id = $4 
        RETURNING *;
    `
    const values = [data.email, data.password, data.role, id]
    const result = await pool.query(query, values)
    return result.rows[0]
}

export async function deleteUser(id: number): Promise<User | undefined> {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *;'
    const result = await pool.query(query, [id])
    return result.rows[0]
}