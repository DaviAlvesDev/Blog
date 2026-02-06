import { AppError } from "./app-error.js"

export class InvalidEmailError extends AppError {
    constructor() {
        super('Invalid email', 400)
    }
}

export class CreateUserError extends AppError {
    constructor() {
        super('An error occurred while registering the user, try again later', 500)
    }
}

export class UpdateUserError extends AppError {
    constructor() {
        super('An error occurred while updating the user data, try again later', 500)
    }
}

export class DeleteUserError extends AppError {
    constructor() {
        super('An error occurred while deleting the user data, try again later', 500)
    }
}

export class UserNotFoundError extends AppError {
    constructor() {
        super('The searched user does not exists or was already deleted', 404)
    }
}

export class InvalidUserIDError extends AppError {
    constructor() {
        super('Please search for a valid ID', 400)
    }
}

export class InvalidNewUserDataError extends AppError {
    constructor() {
        super('Please send both "email" and "password" to post a new user', 400)
    }
}

export class InvalidUpdateUserDataError extends AppError {
    constructor() {
        super('Please send either "email" or "password" to update the user data', 400)
    }
}

export class LoginError extends AppError {
    constructor() {
        super('Either email or password is invalid', 401)
    }
}

export class UserNotLoggedError extends AppError {
    constructor() {
        super('The user needs to be logged in to pass', 401)
    }
}

export class InvalidTokenError extends AppError {
    constructor() {
        super('The token is invalid or was not sended', 401)
    }
}

export class UnauthorizedUserError extends AppError {
    constructor() {
        super('You cannot access this route', 403)
    }
}