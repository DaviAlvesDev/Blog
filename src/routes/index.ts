import { Router } from "express"
import userRouter from "./users.js"
import { auth } from "../middlewares/auth.js"

const router = Router()

router.use('/users', auth, userRouter)

export default router

