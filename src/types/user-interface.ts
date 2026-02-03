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

export interface LoggedUser {
    user: Pick<User, 'id' | 'email' | 'created_at'>
    access_token: string,
    refresh_token: string
}