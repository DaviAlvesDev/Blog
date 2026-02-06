import { Router } from "express"
import { deleteMyPost, deletePost, getAllPosts, getMyPosts, getPostByID, getPostsByUser, patchPost, postNewPost } from "../controllers/post-controller.js"
import { authorize } from "../middlewares/authorization.js"
import { auth } from "../middlewares/auth.js"

const postsRouter = Router()

postsRouter.get('/', getAllPosts)

postsRouter.get('/user', auth, getMyPosts)

postsRouter.get('/:id', getPostByID)

postsRouter.get('/user/:id', getPostsByUser)

postsRouter.post('/create', auth, postNewPost)

postsRouter.patch('/update/:id', auth, patchPost)

postsRouter.delete('/delete/:id', auth, deleteMyPost)

postsRouter.delete('/del/:id', auth, authorize(['admin']), deletePost)

export default postsRouter