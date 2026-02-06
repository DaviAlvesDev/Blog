import type { Request, Response, NextFunction, RequestHandler } from "express"
import { UnauthorizedUserError, UserNotLoggedError } from "../errors/user-errors.js"

export function authorize(allowedRoles = ['admin']): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const role = req.headers['x-user-role'] as string || ''
        if (!role) throw new UserNotLoggedError()

        if (!allowedRoles.includes(role)) throw new UnauthorizedUserError()

        return next()
    }
}