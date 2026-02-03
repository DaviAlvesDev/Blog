import { InvalidNewUserDataError, InvalidUpdateUserDataError, InvalidUserIDError, LoginError, UserNotFoundError } from '../errors/user-erros.js'
import * as authServices from '../services/auth-services.js'
import * as userServices from '../services/user-services.js'
import type { Request, Response } from 'express'

export async function getUsers(req: Request, res: Response) {
    const users = await userServices.searchUsers()

    res.json({
        ok: true,
        data: users
    })
}

export async function getUserByID(req: Request, res: Response) {
    const { id } = req.params
    const userID = Number(id) || undefined
    if (!userID) throw new InvalidUserIDError()

    const user = await userServices.searchUsers(userID)

    res.json({
        ok: true,
        data: user
    })
}

export async function postUser(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) throw new InvalidNewUserDataError()

    const createdUser = await userServices.registerNewUser(email, password)
    res.status(201)
        .json({
            ok: true,
            data: createdUser
        })
}

export async function patchUser(req: Request, res: Response) {
    const { id } = req.params
    const userID = Number(id) || undefined
    if (!userID) throw new InvalidUserIDError()

    const { email, password } = req.body
    if (!email && !password) throw new InvalidUpdateUserDataError()

    const newData = {
        email,
        password
    }

    const updatedUser = await userServices.updateUserData(userID, newData)
    res.json({
        ok: true,
        data: updatedUser
    })
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params
    const userID = Number(id) || undefined
    if (!userID) throw new InvalidUserIDError()

    const deletedUser = await userServices.deleteUserData(userID)
    res.json({
        ok: true,
        data: deletedUser
    })
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) throw new LoginError()

    const data = await authServices.login(email, password)

    res.json({
        ok: true,
        ...data
    })
}