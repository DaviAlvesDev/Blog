import { Router } from "express"
import { deleteUser, getUserByID, getUsers, loginUser, patchUser, postUser } from "../controllers/user-controller.js"

const userRouter = Router()

userRouter.get('/all', getUsers)

userRouter.get('/profile/:id', getUserByID)

userRouter.post('/register', postUser)

userRouter.post('/login', loginUser)

userRouter.patch('/update/:id', patchUser)

userRouter.delete('/delete/:id', deleteUser)

export default userRouter