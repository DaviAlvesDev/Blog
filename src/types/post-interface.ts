export interface Post {
    id: number,
    content: string,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

export interface CreatePostDTO {
    content: string,
    user_id: number,
}