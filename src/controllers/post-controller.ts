import { InvalidNewPostDataError, InvalidPostIDError } from '../errors/post-errors.js'
import { InvalidUserIDError, UserNotLoggedError } from '../errors/user-errors.js'
import * as postServices from '../services/post-services.js'
import type { Request, Response } from 'express'
import type { CreatePostDTO } from '../types/post-interface.js'

export async function getAllPosts(req: Request, res: Response) {
    const posts = await postServices.viewPosts()
    res.json({
        ok: true,
        posts
    })
}

export async function getMyPosts(req: Request, res: Response) {
    const userID = Number(req.headers['x-user-id'])
    if (!userID) throw new UserNotLoggedError()

    const posts = await postServices.viewPostsByOwner(userID)
    res.json({
        ok: true,
        posts
    })
}

export async function getPostsByUser(req: Request, res: Response) {
    const { id } = req.params
    if (!Number(id)) throw new InvalidUserIDError()

    const posts = await postServices.viewPostsByOwner(Number(id))
    res.json({
        ok: true,
        posts
    })
}

export async function getPostByID(req: Request, res: Response) {
    const { id } = req.params
    if (!Number(id)) throw new InvalidPostIDError()

    const post = await postServices.viewPostByID(Number(id))
    res.json({
        ok: true,
        post
    })
}

export async function postNewPost(req: Request, res: Response) {
    const userID = Number(req.headers['x-user-id'])
    if (!userID) throw new UserNotLoggedError()

    const { content } = req.body
    if (!content) throw new InvalidNewPostDataError()

    const data: CreatePostDTO = {
        content,
        user_id: userID
    }

    const post = await postServices.createPost(data)
    res.json({
        ok: true,
        post
    })
}

export async function patchPost(req: Request, res: Response) {
    const userID = Number(req.headers['x-user-id'])
    if (!userID) throw new UserNotLoggedError()

    const { id } = req.params
    if (!Number(id)) throw new InvalidPostIDError()

    const { content } = req.body
    if (!content) throw new InvalidNewPostDataError()

    const post = await postServices.updatePost(Number(id), content)
    res.json({
        ok: true,
        post
    })
}

export async function deleteMyPost(req: Request, res: Response) {
    const userID = Number(req.headers['x-user-id'])
    if (!userID) throw new UserNotLoggedError()

    const { id } = req.params
    if (!Number(id)) throw new InvalidPostIDError()

    const post = await postServices.deletePost(Number(id))
    res.json({
        ok: true,
        post
    })
}

export async function deletePost(req: Request, res: Response) {
    const { id } = req.params
    if (!Number(id)) throw new InvalidPostIDError()

    const post = await postServices.deletePost(Number(id))
    res.json({
        ok: true,
        post
    })
}