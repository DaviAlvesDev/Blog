import { InvalidTokenError, LoginError } from '../errors/user-erros.js'
import * as authServices from '../services/auth-services.js'
import type { Request, Response } from 'express'

export async function login(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) throw new LoginError()

    const data = await authServices.login(email, password)

    res.json({
        ok: true,
        ...data
    })
}

export async function refreshToken(req: Request, res: Response) {
    const { refresh_token } = req.body
    if (!refresh_token) throw new InvalidTokenError()

    const data = await authServices.refreshAuth(refresh_token)

    res.json({
        ok: true,
        ...data
    })
}