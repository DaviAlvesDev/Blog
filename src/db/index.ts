import { Pool } from "pg"
import "dotenv/config"
import fs from 'fs'
import path from 'path'

const DATABASE_URL = process.env.DATABASE_URL

export const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 30000,
    max: 10,
})

export async function migrate() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS migrations(
        id SERIAL PRIMARY KEY,
        file TEXT NOT NULL
        );
        `
        await pool.query(query)

        const migrationsPath = path.resolve(process.cwd(), 'src', 'db', 'migrations')
        const files = fs.readdirSync(migrationsPath, 'utf-8')
        const { rows } = await pool.query('SELECT file FROM migrations;')
        const executedMigrations = rows.map(r => r.file)

        for (const file of files) {
            if (!executedMigrations.includes(file)) {
                const filePath = path.join(migrationsPath, file)
                const sql = fs.readFileSync(filePath, 'utf-8')

                await pool.query('BEGIN')
                await pool.query(sql)
                await pool.query('INSERT INTO migrations (file) VALUES ($1);', [file])
                await pool.query('COMMIT')

                console.log('Migration:', file)
            }
        }

        console.log('No migrations to be executed...')
    } catch (error) {
        await pool.query('ROLLBACK')
        console.error('Error while executing migrations:', error)
    }
}
