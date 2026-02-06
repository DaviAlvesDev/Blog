import { Router } from "express"
import { deleteUser, getUserByID, getUsers, patchUser, postUser } from "../controllers/user-controller.js"
import { authorize } from "../middlewares/authorization.js"
import { auth } from "../middlewares/auth.js"

const userRouter = Router()

userRouter.get('/all', auth, authorize(['admin']), getUsers)

userRouter.get('/profile/:id', auth, authorize(['owner', 'admin']), getUserByID)

userRouter.post('/register', postUser)

userRouter.patch('/update/:id', auth, authorize(['owner']), patchUser)

userRouter.delete('/delete/:id', auth, authorize(['owner', 'admin']), deleteUser)

export default userRouter