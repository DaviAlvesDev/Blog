export class AppError extends Error {
    public readonly statusCode: number
    public readonly internalLog: Error
    constructor(msg: string, statusCode: number, error: Error) {
        super(msg)
        this.statusCode = statusCode
        this.name = 'AppError'
        this.internalLog = error
    }
}