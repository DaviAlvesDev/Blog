import { Router } from "express"
import userRouter from "./users.js"
import authRouter from "./auth.js"
import postsRouter from "./posts.js"
import { auth } from "../middlewares/auth.js"

const router = Router()

router.use('/users', userRouter)

router.use('/auth', authRouter)

router.use('/posts', postsRouter)

export default router

