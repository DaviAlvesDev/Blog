import * as userRepository from '../repository/user-repository.js'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import type { CreateUserDTO, User } from '../types/user-interface.js'
import { CreateUserError, DeleteUserError, InvalidEmailError, UpdateUserError, UserNotFoundError } from '../errors/user-erros.js'
import validateEmail from '../utils/validate-email.js'

export async function searchUsers(id: number = 0): Promise<User[] | User> {
    if (id === 0) {
        const users = await userRepository.findAllUsers()
        if (!users || users.length === 0) throw new UserNotFoundError()
        return users
    }

    const user = await userRepository.findUser(id)
    if (!user) throw new UserNotFoundError()
    return user
}

export async function registerNewUser(email: string, password: string): Promise<User> {
    if (!validateEmail(email)) throw new InvalidEmailError()

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser: CreateUserDTO = {
        email,
        password: hashedPassword,
        role: 'user'
    }

    const createdUser = await userRepository.createUser(newUser)
    if (!createdUser) throw new CreateUserError()
    return createdUser
}

export async function updateUserData(id: number, { email = '', password = '' }): Promise<User> {
    const user = await userRepository.findUser(id)
    if (!user) throw new UserNotFoundError()

    if (email && !validateEmail(email)) {
        throw new InvalidEmailError()
    }
    let hashedPassword: string | undefined
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10)
    }

    const newUser: CreateUserDTO = {
        email: email ? email : user.email,
        password: hashedPassword ? hashedPassword : user.password,
        role: user.role,
    }

    const updatedUser = await userRepository.updateUser(id, newUser)
    if (!updatedUser) throw new UpdateUserError()
    return updatedUser
}

export async function deleteUserData(id: number): Promise<User> {
    const user = await userRepository.findUser(id)
    if (!user) throw new UserNotFoundError()

    const deletedUser = await userRepository.deleteUser(id)
    if (!deletedUser) throw new DeleteUserError()
    return deletedUser
}