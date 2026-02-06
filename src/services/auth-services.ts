import bcrypt from 'bcrypt'
import * as userRepository from '../repository/user-repository.js'
import type { LoggedUser } from '../types/user-interface.js'
import validateEmail from '../utils/validate-email.js'
import { InvalidTokenError, LoginError, UserNotFoundError } from '../errors/user-errors.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function login(email: string, password: string): Promise<LoggedUser> {
    if (!validateEmail(email)) throw new LoginError()
    const user = await userRepository.findUserByEmail(email)
    if (!user) throw new LoginError()

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) throw new LoginError()

    const accessSecret = process.env.ACCESS_SECRET
    const refreshSecret = process.env.REFRESH_SECRET

    if (!accessSecret || !refreshSecret) throw new Error('Configure ACCESS_SECRET and REFRESH_SECRET in your .env')

    const accessToken = jwt.sign({ id: user.id, role: user.role }, accessSecret, { expiresIn: '15m' })

    const refreshToken = jwt.sign({ id: user.id }, refreshSecret, { expiresIn: '7d' })

    const userData = {
        id: user.id,
        email: user.email,
        created_at: user.created_at
    }

    const loggedUser: LoggedUser = {
        user: userData,
        access_token: accessToken,
        refresh_token: refreshToken
    }

    return loggedUser
}

export async function refreshAuth(refreshToken: string) {
    const accessSecret = process.env.ACCESS_SECRET
    const refreshSecret = process.env.REFRESH_SECRET

    if (!accessSecret || !refreshSecret) throw new Error('Configure ACCESS_SECRET and REFRESH_SECRET in your .env')

    try {
        const decoded = jwt.verify(refreshToken, refreshSecret) as { id: number }

        const user = await userRepository.findUserByID(decoded.id)
        if (!user) throw new UserNotFoundError()

        const accessToken = jwt.sign({ id: user.id, role: user.role }, accessSecret, { expiresIn: '15m' })

        const newRefreshToken = jwt.sign({ id: user.id }, refreshSecret, { expiresIn: '7d' })

        const userData = {
            id: user.id,
            email: user.email,
            created_at: user.created_at
        }

        const loggedUser: LoggedUser = {
            user: userData,
            access_token: accessToken,
            refresh_token: newRefreshToken
        }

        return loggedUser
    } catch (err) {
        throw new InvalidTokenError()
    }

}