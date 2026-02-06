import { Router } from "express"
import { deleteUser, getUserByID, getUsers, patchUser, postUser, getProfile, patchProfile, deleteProfile } from "../controllers/user-controller.js"
import { authorize } from "../middlewares/authorization.js"
import { auth } from "../middlewares/auth.js"

const userRouter = Router()

userRouter.get('/all', auth, authorize(['admin']), getUsers)

userRouter.post('/register', postUser)

userRouter.get('/profile', auth, getProfile)

userRouter.patch('/update', auth, patchProfile)

userRouter.delete('/delete', auth, deleteProfile)


userRouter.get('/profile/:id', auth, authorize(['admin']), getUserByID)

userRouter.patch('/update/:id', auth, patchUser)

userRouter.delete('/delete/:id', auth, authorize(['admin']), deleteUser)

export default userRouter