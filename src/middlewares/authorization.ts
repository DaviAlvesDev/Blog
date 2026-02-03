import type { Request, Response, NextFunction, RequestHandler } from "express"
import { UnauthorizedUserError, UserNotLoggedError } from "../errors/user-erros.js"

export function authorize(allowedRoles = ['admin']): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.headers['x-user-role'] as string || ''
        if (!role) throw new UserNotLoggedError()

        if (!allowedRoles.includes(role)) throw new UnauthorizedUserError()

        if (role === 'admin') return next()

        if (!allowedRoles.includes('owner')) return next()

        const userID = req.headers['x-user-id'] as string || ''
        const { id } = req.params
        if (Number(id) !== Number(userID)) throw new UnauthorizedUserError()

        return next()
    }
}