import type { Request, Response, NextFunction } from "express"
import { InvalidTokenError } from "../errors/user-erros.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function auth(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers['authorization']
    const token = authHeaders?.split(' ')[1]
    if (!token) throw new InvalidTokenError()

    const secretKey = process.env.ACCESS_SECRET
    if (!secretKey) throw new Error('Configure ACCESS_SECRET in your .env')
    try {
        const decoded = jwt.verify(token, secretKey) as { id: number, role: string }

        req.headers['x-user-id'] = String(decoded.id)
        req.headers['x-user-role'] = decoded.role

        return next()
    } catch (err) {
        throw new InvalidTokenError()
    }
}