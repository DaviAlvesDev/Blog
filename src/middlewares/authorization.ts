import type { Request, Response, NextFunction } from "express"
import { UnauthorizedUserError, UserNotLoggedError } from "../errors/user-erros.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function authorize(allowedRoles = ['admin']) {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.headers['x-user-role'] as string || ''
        if (!role) throw new UserNotLoggedError()

        if (!allowedRoles.includes(role)) throw new UnauthorizedUserError()

        next()
    }
}