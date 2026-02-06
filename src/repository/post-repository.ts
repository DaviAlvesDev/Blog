import { pool } from "../db/index.js"
import type { Post, CreatePostDTO } from "../types/post-interface.js"

export async function findPostByID(id: number): Promise<Post | undefined> {
    const query = 'SELECT * FROM posts WHERE id = $1;'
    const result = await pool.query(query, [id])
    return result.rows[0]
}

export async function findPostsByUser(user_id: number): Promise<Post[]> {
    const query = 'SELECT * FROM posts WHERE user_id = $1;'
    const result = await pool.query(query, [user_id])
    return result.rows
}

export async function findAllPosts(): Promise<Post[]> {
    const query = 'SELECT * FROM posts;'
    const result = await pool.query(query)
    return result.rows
}

export async function createPost(data: CreatePostDTO): Promise<Post | undefined> {
    const query = `
    INSERT INTO posts (content, user_id) 
    VALUES ($1, $2)
    RETURNING *;
    `
    const values = [data.content, data.user_id]
    const result = await pool.query(query, values)
    return result.rows[0]
}

export async function updatePost(id: number, content: string): Promise<Post | undefined> {
    const query = `
    UPDATE posts
    SET content = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *;
    `
    const values = [content, id]
    const result = await pool.query(query, values)
    return result.rows[0]
}

export async function deletePost(id: number): Promise<Post | undefined> {
    const query = 'DELETE FROM posts WHERE id = $1 RETURNING *;'
    const result = await pool.query(query, [id])
    return result.rows[0]
}