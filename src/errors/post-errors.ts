import { AppError } from "./app-error.js"


export class PostNotFoundError extends AppError {
    constructor() {
        super('There are no posts with this ID or owner', 404)
    }
}

export class CreatePostError extends AppError {
    constructor() {
        super('An error occurred while creating your post, try again later', 500)
    }
}

export class UpdatePostError extends AppError {
    constructor() {
        super('An error occurred while updating your post data, try again later', 500)
    }
}

export class DeletePostError extends AppError {
    constructor() {
        super('An error occurred while deleting your post data, try again later', 500)
    }
}

export class InvalidPostIDError extends AppError {
    constructor() {
        super('Please search for a valid ID', 400)
    }
}

export class InvalidNewPostDataError extends AppError {
    constructor() {
        super('Please provide a content to create or update a post', 400)
    }
}