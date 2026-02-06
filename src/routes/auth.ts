import { Router } from "express"
import { login, refreshToken } from "../controllers/auth-controller.js"

const authRouter = Router()

authRouter.post('/login', login)

authRouter.post('/refresh', refreshToken)

export default authRouter