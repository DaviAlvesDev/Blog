import { Router } from "express"
import { deleteUser, getUserByID, getUsers, patchUser, postUser } from "../controllers/user-controller.js"

const userRouter = Router()

userRouter.get('/all', getUsers)

userRouter.get('/profile/:id', getUserByID)

userRouter.post('/register', postUser)

userRouter.patch('/update/:id', patchUser)

userRouter.delete('/delete/:id', deleteUser)

export default userRouter