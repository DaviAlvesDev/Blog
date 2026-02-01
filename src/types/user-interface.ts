export interface User {
    id: number,
    email: string,
    password: string,
    role: string,
    created_at: Date,
}

export interface CreateUserDTO {
    email: string,
    password: string,
    role: string,
}