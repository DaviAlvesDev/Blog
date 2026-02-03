import { Router } from "express"
import { deleteUser, getUserByID, getUsers, patchUser, postUser } from "../controllers/user-controller.js"
import { authorize } from "../middlewares/authorization.js"

const userRouter = Router()

userRouter.get('/all', authorize(['admin']), getUsers)

userRouter.get('/profile/:id', authorize(['owner', 'admin']), getUserByID)

userRouter.post('/register', postUser)

userRouter.patch('/update/:id', authorize(['owner']), patchUser)

userRouter.delete('/delete/:id', authorize(['owner', 'admin']), deleteUser)

export default userRouter