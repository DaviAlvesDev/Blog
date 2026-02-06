import { CreatePostError, DeletePostError, PostNotFoundError, UpdatePostError } from '../errors/post-errors.js';
import { UserNotFoundError } from '../errors/user-errors.js';
import * as postRepository from '../repository/post-repository.js'
import { findUserByID } from '../repository/user-repository.js';
import type { CreatePostDTO, Post } from '../types/post-interface.js';

export async function viewPosts(): Promise<Post[]> {
    const posts = await postRepository.findAllPosts()
    if (posts.length === 0) throw new PostNotFoundError()

    return posts
}

export async function viewPostByID(id: number): Promise<Post> {
    const post = await postRepository.findPostByID(id)
    if (!post) throw new PostNotFoundError()

    return post
}

export async function viewPostsByOwner(ownerID: number): Promise<Post[]> {
    const posts = await postRepository.findPostsByUser(ownerID)
    if (posts.length === 0) throw new PostNotFoundError()

    return posts
}

export async function createPost(data: CreatePostDTO): Promise<Post> {
    const owner = await findUserByID(data.user_id)
    if (!owner) throw new UserNotFoundError()

    const createdPost = await postRepository.createPost(data)
    if (!createdPost) throw new CreatePostError()

    return createdPost
}

export async function updatePost(id: number, content: string): Promise<Post> {
    const oldPost = await postRepository.findPostByID(id)
    if (!oldPost) throw new PostNotFoundError()

    const newPost = await postRepository.updatePost(id, content)
    if (!newPost) throw new UpdatePostError()

    return newPost
}

export async function deletePost(id: number): Promise<Post> {
    const oldPost = await postRepository.findPostByID(id)
    if (!oldPost) throw new PostNotFoundError()

    const deletedPost = await postRepository.deletePost(id)
    if (!deletedPost) throw new DeletePostError()

    return deletedPost
}