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